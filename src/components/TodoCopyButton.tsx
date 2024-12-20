import { ReactNode, useState } from 'react';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TodoCopyButtonProps = {
    buttonText: React.ReactNode;
    copyText: string;
};

export default function TodoCopyButton({ buttonText, copyText }: TodoCopyButtonProps) {
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