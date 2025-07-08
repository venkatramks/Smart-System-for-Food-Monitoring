import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { useFridge } from '../../context/FridgeContext';
import styles from './styles.module.css';
import axios from 'axios';

function RecipeGenerator() {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');
    const { fridgeItems } = useFridge();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-suggest when fridge items update
    useEffect(() => {
        if (fridgeItems.length > 0) {
            const suggestion = `Suggest a recipe using items: ${fridgeItems.map(item => item.name).join(' and ')}`;
            setInputText(suggestion);
        }
    }, [fridgeItems]);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
        setInputText('');
        setLoading(true);

        try {
            const apiUrl = `http://localhost:5000/api/recipe?ingredients=${fridgeItems
                .map((item) => item.name)
                .join(',')}&query=${encodeURIComponent(inputText)}`;

            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                setMessages(prev => [...prev, { text: response.data.recipe, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { text: `Error: ${response.status}`, sender: 'bot' }]);
            }
        } catch (error: any) {
            console.error("Axios error:", error);
            setMessages(prev => [...prev, { text: `Error: ${error.message}`, sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messageList}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                {loading && <p>Loading...</p>}
            </div>
            <div className={styles.inputArea}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask for a recipe..."
                    onKeyDown={handleKeyDown}
                    className={styles.inputCylindrical}
                />
                <button onClick={sendMessage} disabled={loading}>Send</button>
            </div>
        </div>
    );
}

export default RecipeGenerator;
