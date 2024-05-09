// Styles
import './ContactUs.css';

// Components, Icons & Images
import { FaDiscord, FaLinkedin, FaSquareInstagram } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';

// Utilities & Hooks
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
	// Local logic/state
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: ''
	});
	const form = useRef(null);
	const [emailData, setEmailData] = useState({
		name: '',
		email: '',
		message: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setEmailData((prevData) => {
			return {
				...prevData,
				[e.target.name]: e.target.value,
			};
		});
	}

	const sendEmail = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validate = {
			name: '',
			email: '',
			message: ''
		};

		if (!emailData.name) validate.name = 'Name is required';
		if (!emailData.email) validate.email = 'Email is required';
		else {
			const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
			if (!emailRegex.test(emailData.email))
				validate.email = 'Email is invalid';
		}
		if (!emailData.message) validate.message = 'Message is required';

		if (Object.values(validate).length === 0) {
			emailjs
				.sendForm('service_ucm2c7h', 'template_k8hq6tt', String(form.current), {
					publicKey: 'w4kC8caQxlHg1v9sf',
				})
				.then(
					() => {
						setEmailData({
							name: '',
							email: '',
							message: '',
						});
					},
					(error) => {
						console.error(error.text);
					}
				);
		} else {
			setErrors(validate);
		}
	};

	return (
		<div className='acc-contact-container'>
			<h2 className='acc-contact-title'>Contact Us</h2>
			<h3 className='acc-contact-subtitle'>
				Do you have any questions? We are here to help!
			</h3>
			<div className='acc-contact-boxes'>
				<form className='acc-contact-form' ref={form} onSubmit={sendEmail}>
					<label>
						Name:
						<input
							value={emailData.name}
							name='name'
							type='text'
							className='acc-contact-input'
							onChange={handleChange}
						/>
						{errors.name && <p className='contact-form-error'>{errors.name}</p>}
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
						{errors.email && (
							<p className='contact-form-error'>{errors.email}</p>
						)}
					</label>

					<label>
						Message:
						<textarea
							value={emailData.message}
							name='message'
							className='acc-contact-input'
							onChange={handleChange}></textarea>
						{errors.message && (
							<p className='contact-form-error'>{errors.message}</p>
						)}
					</label>

					<button className='acc-contact-btn'>Send</button>
				</form>

				<div className='acc-contact-social-media-box'>
					<div className='social-media-box-shadow'></div>
					<h3 className='acc-social-media-title'>Find us on social media!</h3>
					<div className='acc-social-media-icons'>
						<Link to='' className='acc-social-media-icon'>
							Discord <FaDiscord />
						</Link>
						<Link to='' className='acc-social-media-icon'>
							LinkedIn <FaLinkedin />
						</Link>
						<Link to='' className='acc-social-media-icon'>
							Instagram <FaSquareInstagram />
						</Link>
						<Link to='' className='acc-social-media-icon'>
							Facebook <FaFacebookSquare />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
