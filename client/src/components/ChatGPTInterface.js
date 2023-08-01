import React, { useState } from 'react';
import axios from 'axios';


export default function ChatGPTInterface() {
    const [prompt, setPrompt] = useState('');
    const [response, setresponse] = useState('');
    // Will need to change this as well when deploying
    const HTTP = "http://localhost:3000/chat";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${HTTP}`, { prompt })
        .then((res) => setresponse(res.data))
        .catch(err => {
            console.log(err);
        });
    };

    const handlePrompt = (e) => setPrompt(e.target.value);

    return (
        <div>
            <h1>Enter your destination for recommended activities!</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type='text' placeholder='Enter destination...' value={prompt} onChange={handlePrompt} />
                </div>
            </form>
            <div>
                <p className='text'>
                    {response ? response : 'Ready to give recommendations!'}
                </p>
            </div>
        </div>
    )
};