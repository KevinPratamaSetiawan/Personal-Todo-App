import React from 'react';

const LoginButton = ({ buttonContext }) => {
    return (
        <button type='submit' className='form-button'>{buttonContext}</button>
    );
};

export default LoginButton;