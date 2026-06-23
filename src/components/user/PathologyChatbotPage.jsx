import { useState } from "react";
import axios from "axios";
import { CHATBOT_URL } from "../../config";


function PathologyChatbot() {

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({
        question: "",
        response: "",
        loading: false,
    });

    // Backend URL
    const API_URL = `${CHATBOT_URL}/api/chat`;

    const handleAsk = async () => {

        if (!data.question.trim()) {

            setData((prev) => ({
                ...prev,
                response: "Please enter your question.",
            }));

            return;
        }

        setData((prev) => ({
            ...prev,
            loading: true,
            response: "",
        }));

        try {

            const response = await axios.post(API_URL, {
                question: data.question,
            });

            setData((prev) => ({
                ...prev,
                response: response.data.response,
            }));

        } catch (err) {

            setData((prev) => ({
                ...prev,
                response:
                    "❌ Error connecting to chatbot server.",
            }));
        }

        setData((prev) => ({
            ...prev,
            loading: false,
        }));
    };

    return (
        <>
            <style>{`

/* ================= WRAPPER ================= */

.chat-wrapper {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 70px;
    height: 70px;
    z-index: 999;
    cursor: pointer;
}

/* ================= BUTTON ================= */

.chat-btn {
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f6f6f8, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    transition: all 0.3s ease;
    z-index: 2;
}

/* ================= ICON ================= */

.chat-icon {
    animation: floatIcon 2.2s ease-in-out infinite;
}

@keyframes floatIcon {

    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-6px);
    }
}

/* ================= WAVES ================= */

.wave {
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(33, 86, 244, 0.35);
    animation: waveAnimation 2.5s infinite ease-out;
    z-index: 1;
}

.wave1 {
    animation-delay: 0s;
}

.wave2 {
    animation-delay: 0.7s;
}

.wave3 {
    animation-delay: 1.4s;
}

@keyframes waveAnimation {

    0% {
        transform: scale(1);
        opacity: 0.5;
    }

    70% {
        transform: scale(2.8);
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

/* ================= CHAT BOX ================= */

.chat-box {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 360px;
    max-height: 520px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.35s ease;
    z-index: 999;
}

@keyframes slideUp {

    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* ================= HEADER ================= */

.chat-header {
    background: linear-gradient(135deg, #2156f4, #6a11cb);
    color: white;
    padding: 12px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
}

/* ================= BODY ================= */

.chat-body {
    padding: 10px;
    overflow-y: auto;
    flex: 1;
    font-size: 14px;
}

/* ================= INPUT ================= */

.chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
}

.chat-input textarea {

    flex: 1;
    resize: none;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 8px;
}

.chat-input textarea:focus {

    border-color: #2156f4;
    box-shadow: 0 0 8px rgba(33, 86, 244, 0.4);
}

/* ================= BUTTON ================= */

.chat-input button {

    margin-left: 10px;
    background: #2156f4;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;
}

.chat-input button:hover {
    transform: scale(1.05);
}

            `}</style>

            {/* Floating Button */}

            <div
                className="chat-wrapper"
                onClick={() => setOpen(!open)}
            >

                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>

                <div className="chat-btn">
                    <span className="chat-icon">🙋‍♂️</span>
                </div>

            </div>

            {/* Chat Box */}

            {open && (

                <div className="chat-box">

                    <div className="chat-header">

                        MediGo AI Chatbot

                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpen(false)}
                        >
                            ✖
                        </span>

                    </div>

                    <div className="chat-body">

                        {data.loading && <p>Typing...</p>}

                        {data.response && (

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.response,
                                }}
                            />

                        )}

                    </div>

                    <div className="chat-input">

                        <textarea
                            rows="2"
                            placeholder="Ask pathology related questions only..."
                            value={data.question}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    question: e.target.value,
                                }))
                            }
                        />

                        <button onClick={handleAsk}>
                            Send
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}

export default PathologyChatbot;