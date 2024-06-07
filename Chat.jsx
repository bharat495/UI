import { useState } from 'react';
import axios from 'axios';
import { FaPlayCircle } from "react-icons/fa";
import bot_logo from "../assets/logo.webp";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";

const MyComponent = () => {
    const [responseData, setResponseData] = useState(null);
    const [msg, setMsg] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const currentTime = new Date().toISOString();
            const message = {
                content: msg,
                author: {
                    username: 'User',
                    id: '1234567890'
                }
            };

            const response = await axios.post(
                'https://ai.quivoxstudio.cloud/api/v2-02/generate-response',
                {
                    text: message.content,
                    name: message.author.username,
                    id: message.author.id,
                    location: 'USA',
                    time: currentTime,
                    mode: 'ticket management',
                    gender: 'male',
                    tone: 'supportive',
                    age: '18',
                    interest: 'helping users with tickets',
                    username: 'cipherticket7385'
                },
                {
                    headers: {
                        Authorization:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpcGhlcnRpY2tldDczODUiLCJpYXQiOjE3MTcxNjA5MjN9.PCg6vM91bM18UJW7WqwiVktslygFhI3fbvqHzMHJotI',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setResponseData(response.data);
            updateChatHistory(message.content, response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const updateChatHistory = (userMsg, botResponse) => {
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { user: userMsg, bot: botResponse }
        ]);
    };

    const handleClick = async () => {
        fetchData();
    };

    return (
        <div>
            <div className='chat-container'>
                {/* <img className='donut' src='https://framerusercontent.com/images/y2xlq1h3icZ4jgx95T5M5Jv9fhg.png?scale-down-to=512'/>
                <img className='diamond' src='https://framerusercontent.com/images/mIeiiFyiLX8guUCulp8nzYRde7s.png?scale-down-to=512' /> */}
                <img className='donut' src={shape1} />
                <img className='diamond' src={shape2} />
                
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <div className='chat user'>
                                <div style={{ color: 'white' }}>
                                    <h4 style={{color:'#16371E'}}>User</h4>
                                    <p>{chat.user}</p>
                                </div>
                                <img
                                    style={{ marginLeft: '20px', border:'3px solid #E9651A' }}
                                    src='https://plus.unsplash.com/premium_photo-1666855258034-8d2c36091ec1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
                                    alt='User Avatar'
                                />
                            </div>
                        </div>

                        <div className='chat'>
                            <img
                                style={{ marginRight: '20px', border:'3px solid #E9651A' }}
                                src={bot_logo}
                                alt='Bot Avatar'
                            />
                            <div className='bot-reply'>
                                <h4 style={{color:'#E9651A'}}>Bot Reply</h4>
                                <p>{chat.bot}</p>
                            </div>
                        </div>
                    </div>
                ))}
               <div style={{display:'flex', justifyContent:'center'}}>
                { isLoading && <div className='loader'></div>}
               </div>
            </div>
            <div className='chat-search-bar'>
                <input style={{color:'#E9651A'}} onChange={(e) => { setMsg(e.target.value) }} type='text' id='searchInput' placeholder='Type your message' />
                <button onClick={handleClick}><FaPlayCircle style={{color:'#E9651A', fontSize:'25px'}}/></button>
            </div>
        </div>
    );
};

export default MyComponent;
