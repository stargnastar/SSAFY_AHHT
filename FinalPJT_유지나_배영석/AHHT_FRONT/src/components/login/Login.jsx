import React, { useState } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 110px;
  text-align: center;
`;

const StyledTextSection = styled.div`
  margin-top: 4rem;
  height: 100px;
  width: 100%;
  border: 1px solid black;
  border: none;
  font-size: 28px;
  font-family: sans-serif;
  font-weight: bold;
  font-style: italic;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const StyledP = styled.p`
  font-size: medium;
  font-family: sans-serif;
  margin-top: 0;
  font-weight: normal;
  font-style: normal;
`;

const StyledButton = styled.button`
  background: #26c98a;
  border: none;
  border-radius: 10px;
  width: 360px;
  height: 50px;
  margin-top: 4rem;
  font-size: large;
  font-weight: bold;
  color: white;
`;

const StyledInput = styled.input`
  border-color: #61606081;
  text-indent: 1rem;
  font-size: medium;
  border-radius: 10px;
  width: 350px;
  height: 50px;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: xx-large;
  font-weight: bold;
  font-family: sans-serif;
`;

const StyledSignup = styled.button`
  background-color: #f6d365;
  border: none;
  border-radius: 10px;
  width: 360px;
  height: 50px;
  margin-top: 4rem;
  font-size: large;
  font-weight: bold;
  color: white;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginUser = {
      email,
      password,
    };

    try {
      const url = 'http://localhost:8080/userapi/login';

      const response = await axios.post(url, loginUser);

      if (response.status === 200) {
        localStorage.setItem('loginUser', JSON.stringify(response.data));

        console.log(response);
        setLoginStatus('로그인 성공. 환영합니다, ' + loginUser.name);
        navigate('/');
      } else if (response.status === 401) {
        setLoginStatus(
          '로그인 실패. 아이디 또는 비밀번호가 올바르지 않습니다.'
        );
        alert('로그인 실패. 아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        console.log(response);
        setLoginStatus('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.log('error' + error);
      console.log('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <StyledWrapper>
      <Navbar />
      <StyledContent>
        <StyledTextSection>
          <p>
            운동하다
            <font color="red"> AHHT!</font>
            하지 말고
            <br />
            <font color="#26c98a"> 건강한 운동생활</font> 시작해봐요!
          </p>
          <StyledP>
            AHHT!에 처음이신가요? <br />
            어서 등록하시고 전문가와 함께 건강한 운동생활 시작해봐요!
          </StyledP>
        </StyledTextSection>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <StyledInput
              placeholder="email"
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <StyledInput
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <StyledButton type="submit">로그인</StyledButton>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>OR</p>
          <StyledSignup style={{ marginTop: '0' }}>
            <StyledLink
              to="/signup"
              style={{
                fontSize: 'x-large',
                color: 'white',
              }}
            >
              회원가입
            </StyledLink>
          </StyledSignup>
        </StyledForm>
        <p>{loginStatus}</p>
      </StyledContent>
      <Footbar />
    </StyledWrapper>
  );
};

export default Login;
