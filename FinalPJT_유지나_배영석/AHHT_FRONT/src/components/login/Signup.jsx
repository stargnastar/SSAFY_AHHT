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
  margin-bottom: 6rem;
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
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
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
  width: 100px;
  height: 50px;
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

const StyledSingup = styled.button`
  background-color: #f6d365;
  border: none;
  border-radius: 10px;
  width: 360px;
  height: 50px;
  font-size: large;
  font-weight: bold;
  color: white;
  padding: 0.7rem;
`;

const StyledSelect = styled.select`
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: sans-serif;

  color: black;
  border: #2ecc71 2px solid;
  font-size: medium;
  border-radius: 9px;
  width: 360px;
  height: 54px;
  text-indent: 1rem;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [tel, setTel] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [expert, setExpert] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailCheckText, setEmailCheckText] =
    useState('중복 여부를 체크해주세요!');
  const handleExpertChange = (event) => {
    setExpert(parseInt(event.target.value, 10));
    updateFormCompletion();
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    updateFormCompletion();
  };

  const updateFormCompletion = () => {
    setIsFormComplete(
      username !== '' &&
        password !== '' &&
        isPasswordMatch &&
        nickname !== '' &&
        age !== '' &&
        tel !== '' &&
        email !== '' &&
        isEmailAvailable &&
        expert !== 0
    );
  };

  const handlePasswordMatch = () => {
    setIsPasswordMatch(password === passwordConfirmation);
    updateFormCompletion();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    updateFormCompletion();
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
    updateFormCompletion();
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailAvailable(false);
    setEmailCheckText('중복 여부를 체크해주세요!');
    updateFormCompletion();
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    updateFormCompletion();
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    updateFormCompletion();
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
    updateFormCompletion();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormComplete) {
      alert('입력이 완료되지 않았습니다. 모든 필드를 채워주세요.');
      return;

      const userData = {
        username,
        password,
        age,
        nickname,
        tel,
        email,
        expert,
      };

      try {
        const url = 'http://localhost:8080/userapi/signup';
        console.log('보내기 전' + userData);
        const response = await axios.post(url, userData);

        if (response.status === 200) {
          console.log('회원가입 성공!');
          console.log(response);
          navigate('/login');
        } else {
          console.log('회원가입 실패!');
          console.log(response);
        }
      } catch (error) {
        console.log('오류 발생:', error);
      }
    }
  };

  const handleCheckEmail = async (event) => {
    event.preventDefault();

    try {
      console.log({ email });
      const url = `http://localhost:8080/userapi/check-email/${email}`;
      setIsCheckingEmail(true);

      const response = await axios.get(url);
      if (response.status === 200) {
        setIsEmailAvailable(!response.data);
        console.log(response);
        setEmailCheckText(
          response.data ? '중복된 이메일입니다.' : '사용 가능한 이메일입니다.'
        );
      } else {
        setIsEmailAvailable(true);
        setEmailCheckText('중복 체크에 실패했습니다.');
      }

      setIsCheckingEmail(false);
    } catch (error) {
      console.log('오류 발생:', error);
      setIsEmailAvailable(true);
      setEmailCheckText('중복 체크에 실패했습니다.');
      setIsCheckingEmail(false);
    }
  };

  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledContent>
        <StyledTextSection>
          <p>
            <font color="#26c98a"> AHHT!</font>에서 <br></br>건강한 운동생활
            시작하기
          </p>
          <StyledP>
            이미 계정이 있나요? 로그인은
            <Link to="/login" style={{ textDecoration: 'none' }}>
              {' '}
              <font color="red"> 여기에서!</font>
            </Link>
          </StyledP>
        </StyledTextSection>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <StyledInput
              placeholder="이메일"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: '10px',
            }}
          >
            <p>{emailCheckText}</p>
            <StyledButton
              onClick={handleCheckEmail}
              disabled={isCheckingEmail || !email}
              style={{
                backgroundColor: isEmailAvailable ? '#5062e5' : '#26c98a',
                marginLeft: '1rem',
              }}
            >
              {isEmailAvailable ? '중복확인' : '확인완료'}
            </StyledButton>
          </div>
          <div>
            <label htmlFor="password"></label>
            <StyledInput
              placeholder="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirmation"></label>
            <StyledInput
              placeholder="비밀번호 확인"
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
            <p
              style={{
                marginTop: '0',
                marginLeft: '10px',
                textAlign: 'left',
                fontSize: 'small',
              }}
            >
              8~20자 사이의 비밀번호를 입력해주세요.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: '10px',
            }}
          >
            {isPasswordMatch && (
              <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
            )}
            {!isPasswordMatch && (
              <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
            )}
            <StyledButton
              style={{ width: '120px', marginLeft: '10px' }}
              onClick={handlePasswordMatch}
            >
              비밀번호 확인
            </StyledButton>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="username"></label>
            <StyledInput
              placeholder="이름"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="nickname"></label>
            <StyledInput
              placeholder="닉네임"
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <div>
            <label htmlFor="age"></label>
            <StyledInput
              placeholder="나이"
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div>
            <label htmlFor="tel"></label>
            <StyledInput
              placeholder="전화번호"
              type="text"
              id="tel"
              value={tel}
              onChange={handleTelChange}
            />
          </div>

          <div>
            <label htmlFor="expert"></label>
            <StyledSelect
              name="expert"
              id="expert"
              onChange={handleExpertChange}
            >
              <option>의사 혹은 트레이너이신가요?</option>
              <option value="1">의사</option>
              <option value="2">트레이너</option>
              <option value="0">일반인</option>
            </StyledSelect>
          </div>
          <StyledSingup type="submit">제출하기</StyledSingup>
        </StyledForm>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Signup;
