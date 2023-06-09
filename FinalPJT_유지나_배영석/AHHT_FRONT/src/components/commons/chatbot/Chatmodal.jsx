import React, { useState } from 'react';
import styled from 'styled-components';
import Chatbot from './Chatbot';
import icon from './chatbot.png';

const ChatbotButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 10px;
  border: none;
  border-radius: 30%;
  cursor: pointer;
  width: 100px;
  height: 100px;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-family: notoSans;
  background-image: url(${icon});
  background-size: 200%;
  background-position-x: 48%;
  background-position-y: 36%;
`;

const ChatbotModal = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  margin-top: 2rem;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background-color: #c6e3fa;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  z-index: 1;
  width: 50px;
  height: 30px;
  color: black;
`;

const Chatmodal = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  const closeChatbot = () => {
    setChatbotOpen(false);
  };

  return (
    <>
      <ChatbotButton onClick={toggleChatbot}></ChatbotButton>
      {isChatbotOpen && (
        <ChatbotModal>
          <CloseButton onClick={closeChatbot}>닫기</CloseButton>
          <Chatbot />
        </ChatbotModal>
      )}
    </>
  );
};

export default Chatmodal;
