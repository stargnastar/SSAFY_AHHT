import React, { useState } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import MapContainer from '../commons/MapContainer';
import { motion } from 'framer-motion';
import Chatmodal from '../commons/chatbot/Chatmodal';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 80px;
  text-align: center;
  width: 80vw;
  margin-bottom: 400px;
`;

const StyledMaplist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10px;
`;

const StyledInput = styled.input`
  border-color: #61606081;
  text-indent: 1rem;
  font-size: medium;
  border-radius: 10px;
  width: 200px;
  height: 30px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background: #26c98a;
  border: none;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  margin-left: 5px;
  font-size: large;
  font-weight: bold;
  color: white;
`;

const StyledFollowButtons = styled.div`
  width: 100%;
`;

const StyledChooseButton = styled.button`
  background-color: transparent;
  border: none;

  width: 200px;
  height: 50px;
  font-size: large;
  font-weight: bold;
  margin-bottom: 1rem;

  margin-right: 2rem;
  margin-left: 2rem;

  border-bottom: ${({ isActive }) => (isActive ? '2px solid black' : 'none')};
`;

const Map = () => {
  const [keyword, SetKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    SetKeyword(e.target.value);
  };

  const [activeTab, setActiveTab] = useState('약국');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <Chatmodal></Chatmodal>
      <StyledContent>
        <h1 style={{ marginTop: '3rem' }}>약국/병원 검색</h1>
        <StyledFollowButtons>
          <StyledChooseButton
            isActive={activeTab === '약국'}
            onClick={() => handleTabClick('약국')}
          >
            약국으로 검색하기
          </StyledChooseButton>
          <StyledChooseButton
            isActive={activeTab === '병원'}
            onClick={() => handleTabClick('병원')}
          >
            병원으로 검색하기
          </StyledChooseButton>
        </StyledFollowButtons>
        <StyledMaplist>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput value={keyword} onChange={handleChange}></StyledInput>

            <StyledButton type="submit">검색</StyledButton>
          </StyledForm>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.5 }}
          >
            <MapContainer searchPlace={keyword + ' ' + activeTab} />
          </motion.div>
        </StyledMaplist>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Map;
