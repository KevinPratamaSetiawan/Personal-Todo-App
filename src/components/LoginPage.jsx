import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

import LoginButton from './LoginButton';

const LoginPage = () => {
    const [password, setPassword] = React.useState('');
    const [buttonText, setButtonText] = React.useState(<FontAwesomeIcon icon={faLock} />);
    const navigate = useNavigate();

    const onPasswordChangeEventHandler = (event) => {
        setPassword(event.target.value);
    };

    const onLoginEventHandler = (event) => {
        event.preventDefault();
        document.getElementById('passwordLabel').classList.remove('input-error');
        document.getElementById('passwordLabel').classList.remove('input-false');

        console.log(sessionStorage.getItem('isAuthenticated') === 'true');
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'

        if (isAuthenticated) {
            navigate('/todo');
        } else if (!password.trim()) {
            document.getElementById('passwordLabel').classList.add('input-error');
        } else if (password.trim() !== '400391211') {
            document.getElementById('passwordLabel').classList.add('input-false');
        } else {
            sessionStorage.setItem('isAuthenticated', 'true');
            setButtonText(
                <>
                    <FontAwesomeIcon icon={faUnlock} />  Access Granted
                </>
            );
        }
    };

    return (
        <div className='login-form'>
            <img src="/white-logo.png" alt="Website Logo" />
            <form onSubmit={onLoginEventHandler}>
                <label htmlFor="password" id='passwordLabel'>Password<span>*</span></label>
                <input
                    id="password"
                    type='password'
                    value={password}
                    onChange={onPasswordChangeEventHandler}
                    placeholder='Your password here..'
                />
                <br />
                <LoginButton buttonContext={buttonText} />
            </form>
        </div>
    );
};

export default LoginPage;