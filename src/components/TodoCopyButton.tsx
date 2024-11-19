import React, { useState, ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

type TodoCopyButtonProps = {
    buttonText: string;
};

export default function TodoCopyButton ({ buttonText }: TodoCopyButtonProps) {
    const [content, SetContent] = useState<string | ReactNode>(buttonText);

    const onCopyLinkEventHandler = () => {
        navigator.clipboard.writeText(buttonText);
        SetContent(<><FontAwesomeIcon icon={faCopy} /> Copied!</>);
        
        setTimeout(function() {
            SetContent(buttonText);
        }, 1000);
    }

    return (
        <>
            <button onClick={onCopyLinkEventHandler}>
                <span>{content}</span>
            </button>
        </>
    );
};