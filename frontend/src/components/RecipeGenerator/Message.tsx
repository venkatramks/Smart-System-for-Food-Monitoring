import React from 'react';
import styles from './styles.module.css';

interface Props {
    message: {
        text: string;
        sender: string;
    };
}

function Message({ message }: Props) {
    return (
        <div className={`${styles.messageContainer} ${message.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}`}>
            <div className={styles.message}>
                {message.text}
            </div>
        </div>
    );
}

export default Message;
