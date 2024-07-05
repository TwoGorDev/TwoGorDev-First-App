// Styles
import './Profile.css';

// Components, Icons & Images
import anonymousUserIcon from '../../../assets/images/profile-anonymous-user-icon.webp';
// import Achievements from '../../../components/achievements/Achievements';
import Loader from '../../../components/loader/Loader';

// Contexts
import { UserAuthContext } from '../../../contexts/UserAuthContext';

// Utilities & Hooks
import useDataApi from '../../../hooks/useDataApi';
import { useContext, useState } from 'react';

// Types
import { UserAuthContextType } from '../../../types/types';

export default function Profile() {
	// External logic/state
	const { user, setUser } = useContext(UserAuthContext) as UserAuthContextType;
	const { error, isPending, patchData } = useDataApi();

	// Local logic/state
	const [showEditPreview, setShowEditPreview] = useState(false);
	const [aboutText, setAboutText] = useState(user.bio);
	const [newAvatarBase64, setNewAvatarBase64] = useState('');

	const creationDate = new Date(user.created_at.slice(0, 10));
	const formattedCreationDate = creationDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const avatarImg: HTMLImageElement | null = document.querySelector('.acc-profile-box-avatar');
			// @ts-ignore
			avatarImg.src = reader.result;
			setNewAvatarBase64(String(reader.result));
		};
	};

	const updateUserData = async () => {
		// if neither user bio, nor user avatar have been changed - end the process
		if (aboutText === user.bio && newAvatarBase64 === '') {
			setShowEditPreview(false);
			return;
		}

		// update user information in the database
		const response = await patchData('/users', {
			avatarString: newAvatarBase64,
			bio: aboutText,
		});

		if (response) {
			setUser({ ...response, token: user.token });
			localStorage.setItem(
				'user',
				JSON.stringify({ ...response, token: user.token })
			);
			setNewAvatarBase64('');
			setShowEditPreview(false);
		}
	};

	return (
		<div className='acc-profile-container'>
			<h2 className='acc-profile-title'>{user.username}'s profile</h2>
			<div className='acc-profile-box'>
				<img
					className='acc-profile-box-avatar'
					src={user.avatar_url || anonymousUserIcon}
					alt='User profile image'
				/>

				{!showEditPreview ? (
					<>
						<div className='acc-profile-box-info'>
							<h3 className='acc-profile-box-username'>{user.username}</h3>
							<p className='acc-profile-box-register-date'>
								Member since {formattedCreationDate}
							</p>

							<div className='acc-profile-box-about'>
								<h4 className='acc-profile-box-about-heading'>About Me:</h4>
								<p className='acc-profile-box-about-text'>
									{user.bio ? user.bio : 'You have not filled this out yet.'}
								</p>
							</div>
						</div>
						<button
							className='edit-profile-info-btn'
							onClick={() => setShowEditPreview(true)}>
							EDIT
						</button>
					</>
				) : (
					<div className='acc-profile-edit-container'>
						<h3 className='add-new-photo-title'>Add a new photo</h3>
						<input
							className='upload-profile-pic-input'
							type='file'
							accept='image/*'
							onChange={handleFileChange}
						/>
						<h3 className='add-new-photo-title'>Tell us about yourself</h3>

						<textarea
							className='edit-about-area'
							placeholder='Tell us about yourself (up to 350 characters)'
							onChange={(e) => {
								if (e.target.value.length <= 350) {
									setAboutText(e.target.value);
								}
							}}
							value={aboutText}></textarea>
						<button
							className='acc-profile-save-changes-btn'
							onClick={updateUserData}
							disabled={isPending}
						>
							{isPending ?
								<Loader
									style={{ height: '100%', width: '100%' }}
									size={'3px'}
									color={'var(--dashboard-color)'}
								/>
							:
								'Save Changes'
							}
						</button>
						{error && <p className='error'>{error}</p>}
					</div>
				)}
			</div>
			{/* <Achievements /> */}
		</div>
	);
}
