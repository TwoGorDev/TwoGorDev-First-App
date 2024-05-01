// Components, Icons & Images
import Loader from "../loader/Loader";

// Utilities & Hooks
import { useContext, useState } from "react";
import useDataApi from "../../hooks/useDataApi";

// Contexts
import { UserAuthContext } from "../../contexts/UserAuthContext";

export default function UsernameChangeForm() {
  // External logic/state
  const {isPending, error: serverError, setError: setServerError, patchData } = useDataApi();
	const { user, setUser } = useContext(UserAuthContext);

  // Local logic/state
  const [usernameChangeResult, setUsernameChangeResult] = useState({
		status: '',
		message: ''
	});
  const [username, setUsername] = useState('');

  // Change username functionality
	async function handleUsernameChange(e) {
		e.preventDefault();
		setUsernameChangeResult({ status: '', message: '' });
		setServerError('');

		if (!username) {
			setUsernameChangeResult({ status: 'error', message: 'Specify new username' });
			return;
		}

		if (username === user.username) {
			setUsernameChangeResult({ status: 'error', message: "New username can't be same as current one" });
			return;
		}

    const res = await patchData('/users', {
      username
    });

		if (res) {
			setUsernameChangeResult({ status: 'success', message: 'Username changed successfully' });
			setUser({ ...res, token: user.token });
		}
	}

  return (
    <>
      <h3 className='acc-settings-subtitle'>Change Username</h3>
			<form className='acc-settings-form'>
				<label>
					New Username:
					<input
						type='text'
						name='newUsername'
						placeholder='Enter new username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</label>

				{serverError && (
					<p className="acc-settings-message-error">
						{serverError}
					</p>
				)}
				{usernameChangeResult.status && (
					<p className={`acc-settings-message-${usernameChangeResult.status}`}>
						{usernameChangeResult.message}
					</p>
				)}

				<button className='acc-change-data-btn' onClick={(e) => handleUsernameChange(e)}>
					{isPending ? 
						<Loader
							style={{ height: '100%', width: '100%' }}
							size={'3px'}
							color={'var(--dashboard-color)'}
						/>
					:
						'Change Username'
					}
				</button>
				
			</form>
    </>
  )
}