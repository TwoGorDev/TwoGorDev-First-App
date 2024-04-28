// import { useRef } from 'react';
import { useContext, useState } from 'react';

// styles
import './Profile.css';

// images
import anonymousUserIcon from '../../../assets/images/profile-anonymous-user-icon.png';

// contexts
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function Profile() {
	const { username } = useContext(UserAuthContext);
	const [showEditPreview, setShowEditPreview] = useState(false);
	const [aboutText, setAboutText] = useState('');
	// const avatarImgRef = useRef(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const imageUrl = e.target.result;
			const avatarImg = document.querySelector('.acc-profile-box-avatar');
			avatarImg.src = imageUrl;
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className='acc-profile-container'>
			<h2 className='acc-profile-title'>{username}'s profile</h2>
			<div className='acc-profile-box'>
				<img
					className='acc-profile-box-avatar'
					// ref={avatarImgRef}
					src={anonymousUserIcon}
					alt='User profile image'
				/>

				{!showEditPreview ? (
					<>
						<div className='acc-profile-box-info'>
							<h3 className='acc-profile-box-username'>{username}</h3>
							<p className='acc-profile-box-register-date'>
								Member since May 7, 2018
							</p>

							<div className='acc-profile-box-about'>
								<h4 className='acc-profile-box-about-heading'>About Me:</h4>
								<p className='acc-profile-box-about-text'>
									{aboutText === ''
										? 'You have not filled this out yet.'
										: aboutText}
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
							onClick={() => setShowEditPreview(false)}>
							Save Changes
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
