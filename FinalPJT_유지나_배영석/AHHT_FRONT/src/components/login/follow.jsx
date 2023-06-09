import React, { useState } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
  width: 40vw;
`;

const StyledFollowButtons = styled.div`
  width: 100%;
`;

const StyledButton = styled.button`
  background: ${({ isActive }) => (isActive ? 'black' : 'transparent')};
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  font-size: large;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  margin-right: 2rem;
  margin-left: 2rem;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid white' : 'none')};
`;

const StyledBlurredBox = styled.div`
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 30vw;
  height: 300px;
  border-radius: 30px;
  margin-top: 3rem;

  background-color: rgba(255, 255, 192, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 2px 7px 15px 8px rgba(0, 0, 0, 0.3);
`;

const StyledHr = styled.hr`
  border-top: 1px solid black;
  width: 100%;
  margin-top: 0;
`;

const Follow = () => {
  const [activeTab, setActiveTab] = useState('doctor');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledContent>
        <p
          style={{
            marginBottom: '1rem',
            marginTop: '2rem',
            fontSize: '40px',
            fontWeight: 'bold',
          }}
        >
          Follow
        </p>
        <StyledHr />
        <StyledFollowButtons>
          <StyledButton
            isActive={activeTab === 'doctor'}
            onClick={() => handleTabClick('doctor')}
          >
            Doctor
          </StyledButton>
          <StyledButton
            isActive={activeTab === 'trainer'}
            onClick={() => handleTabClick('trainer')}
          >
            Trainer
          </StyledButton>
        </StyledFollowButtons>
        <StyledBlurredBox>
          {activeTab === 'doctor' && <p>Doctor Content</p>}
          {activeTab === 'trainer' && <p>Trainer Content</p>}
        </StyledBlurredBox>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Follow;
