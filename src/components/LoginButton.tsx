import React, { ReactNode } from 'react';

type LoginButtonProps = {
    buttonContext: ReactNode;
};

export default function LoginButton ({ buttonContext }: LoginButtonProps) {
    return (
        <button type='submit' className='form-button'>{buttonContext}</button>
    );
};