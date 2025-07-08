import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function DateTimeDisplay() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = dateTime.toLocaleString();

    return (
        <div className={styles.dateTimeDisplay}>
            <p>{formattedDateTime}</p>
        </div>
    );
}

export default DateTimeDisplay;