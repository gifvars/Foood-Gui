import React, { useState } from 'react';
//import React from 'react';

const MessageSender: React.FC = () => {
    const [message, setMessage] = useState('');
    const [serverMessage, setServerMessage] = useState<string>("");

    const sendMessage = async () => {
        try {
            const response = await fetch('http://localhost:4000/foood/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Något gick fel vid skickandet av meddelandet');
            }

            const result = await response.json();
            console.log('Svar från mikrotjänst:', result);
            setServerMessage(result.respons);
            alert('Meddelande skickat!' + result.respons);
        } catch (error) {
            console.error(error);
            alert(`Ett fel inträffade: ${(error as Error).message}`);
        }
    };

    return (
        <div>
            <h2>Skicka ett meddelande</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Skriv ditt meddelande här"
            />
            <button onClick={sendMessage}>Skicka</button>
            <div>
                <div>Responsmeddelandet</div>
            <p>{serverMessage}</p>
            </div>
        </div>

    );
};

export default MessageSender;
