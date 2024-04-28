import { Link } from 'react-router-dom';
import { useState } from 'react';

// styles
import './ContactUs.css';

// icons
import { FaDiscord, FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';

export default function ContactUs() {
	const [emailData, setEmailData] = useState({
		name: '',
		email: '',
		message: '',
	});

  function handleChange(e) {
    setEmailData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

	return (
		<div className='acc-contact-container'>
			<h2 className='acc-contact-title'>Contact Us</h2>
			<h3 className='acc-contact-subtitle'>
				Do you have any questions? We are here to help!
			</h3>
			<div className='acc-contact-boxes'>
				<form className='acc-contact-form'>
					<label>
						Name:
						<input
							value={emailData.name}
							name='name'
							type='text'
							className='acc-contact-input'
              onChange={handleChange}
						/>
					</label>

					<label>
						Email address:
						<input
							value={emailData.email}
							name='email'
							type='text'
							className='acc-contact-input'
              onChange={handleChange}
						/>
					</label>

					<label>
						Message:
						<textarea
							value={emailData.message}
							name='message'
							className='acc-contact-input'
              onChange={handleChange}></textarea>
					</label>

					<button className='acc-contact-btn'>Send</button>
				</form>

				<div className='acc-contact-social-media-box'>
					<div className='social-media-box-shadow'></div>
					<h3 className='acc-social-media-title'>Find us on social media!</h3>
					<div className='acc-social-media-icons'>
						<Link className='acc-social-media-icon'>
							Discord <FaDiscord />
						</Link>
						<Link className='acc-social-media-icon'>
							LinkedIn <FaLinkedin />
						</Link>
						<Link className='acc-social-media-icon'>
							Instagram <FaSquareInstagram />
						</Link>
						<Link className='acc-social-media-icon'>
							Facebook <FaFacebookSquare />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
