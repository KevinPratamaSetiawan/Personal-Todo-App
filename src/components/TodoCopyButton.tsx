import { ReactNode, useState } from 'react';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TodoCopyButtonProps = {
    buttonText: React.ReactNode;
    copyText: string;
    floating?: boolean;
};

export default function TodoCopyButton({ buttonText, copyText, floating = false }: TodoCopyButtonProps) {
    const [content, SetContent] = useState<string | ReactNode>(buttonText);

    const onCopyLinkEventHandler = () => {
        navigator.clipboard.writeText(copyText);
        SetContent(<><FontAwesomeIcon icon={faCopy} /> Copied!</>);

        setTimeout(function () {
            SetContent(buttonText);
        }, 1000);
    }

    return (
        <>
            <button 
                onClick={onCopyLinkEventHandler} 
                className='text-start'
                style={{
                    position: floating ? 'absolute' : undefined,
                    top: floating ? '5px' : undefined,
                    right: floating ? '10px' : undefined,
                    zIndex: floating ? 2 : undefined,
                }}
            >
                <span
                    style={{
                        textAlign: 'left',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal'
                    }}>{content}</span>
            </button>
        </>
    );
};