import { useContext, useState } from 'react';

// styles
import './Profile.css';

// images
import anonymousUserIcon from '../../../assets/images/profile-anonymous-user-icon.png';

// contexts
import { UserAuthContext } from '../../../contexts/UserAuthContext';

// hooks
import useDataApi from '../../../hooks/useDataApi';

// components
import Achievements from '../../../components/achievements/Achievements';

export default function Profile() {
	// Outside state
	const { user, setUser } = useContext(UserAuthContext);
	const { error, isPending, patchData } = useDataApi();

	// Local state
	const [showEditPreview, setShowEditPreview] = useState(false);
	const [aboutText, setAboutText] = useState(user.bio);
	const [newAvatarBase64, setNewAvatarBase64] = useState('');

	const creationDate = new Date(user.created_at.slice(0, 10));
	const formattedCreationDate = creationDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const avatarImg = document.querySelector('.acc-profile-box-avatar');
			avatarImg.src = reader.result;
			setNewAvatarBase64(reader.result);
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
							onClick={updateUserData}>
							{isPending ? 'Loading... ' : 'Save Changes'}
						</button>
						{error && <p className='error'>{error}</p>}
					</div>
				)}
			</div>
			<Achievements />
		</div>
	);
}
