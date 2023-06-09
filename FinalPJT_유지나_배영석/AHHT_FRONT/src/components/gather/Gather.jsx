import React, { useState, useEffect } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import Board from '../commons/Board';
import Chatmodal from '../commons/chatbot/Chatmodal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: black;

  margin-right: 2rem;
  margin-left: 2rem;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid black' : 'none')};
`;

const StyledGreenButton = styled.button`
  flex: 1 1 auto;

  margin-top: 1rem;
  width: 100px;
  height: 40px;

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  box-shadow: 0 0 5px grey;
  border-radius: 10px;
  border: none;
  background-color: #31c48d;

  font-weight: bold;
`;

const StyledContent = styled.div`
  margin-top: 110px;
  text-align: center;
  width: 80vw;
  margin-bottom: 4rem;
`;

const StyledTextLine = styled.div`
  height: 100px;
  width: 100vw;
`;

const StyledBoardContainer = styled.div`
  height: 500px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledBoxSection = styled.div`
  height: 300px;
  width: 90%;
  display: flex;
  justify-content: space-around;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4rem;
`;

const StyledBlurredBox = styled.div`
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 300px;
  height: 300px;
  z-index: 100;
  border-radius: 30px;

  background-color: rgba(255, 255, 192, 0.1);

  box-shadow: 2px 7px 15px 8px rgba(0, 0, 0, 0.3);
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Gather = () => {
  const [boardName, setBoardName] = useState('성공스토리');
  const [articles, setArticles] = useState([]);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('loginUser') !== null) {
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      const foodsFromLocalStorage = localStorage.getItem('dietData');
      console.log(foodsFromLocalStorage);
      if (foodsFromLocalStorage && loginUser !== null) {
        const dietData = JSON.parse(foodsFromLocalStorage);
        console.log(dietData);
        const filteredFoods = [];
        dietData.reverse().forEach((data) => {
          if (data.foods && data.userId === loginUser.id) {
            filteredFoods.push(...data.foods);
          }
        });
        setFoods(filteredFoods);
        console.log(filteredFoods);
      } else {
        setFoods([]);
      }
    }
  }, []);
  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <Chatmodal></Chatmodal>
      <StyledContent>
        <StyledTextLine style={{ marginBottom: '1rem' }}>
          <h1
            style={{
              marginTop: '20px',
              marginLeft: '3rem',
              textAlign: 'left',
              fontSize: '40px',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            Gather Together!
          </h1>
        </StyledTextLine>

        <StyledBoxSection>
          <StyledBlurredBox
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ marginBottom: '4rem' }}>
              함께 운동할 친구가 <br></br>필요하신가요?<br></br>게더타운으로
              놀러오세요!
            </h2>
            <StyledGreenButton
              style={{ position: 'absolute', bottom: '-10px' }}
            >
              함께 운동하기
            </StyledGreenButton>
          </StyledBlurredBox>
          {/* 운동 목록 */}
          <StyledBlurredBox>
            <h2>오운완 리스트</h2>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>운동</TableHeader>
                    <TableHeader>시간</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableData>푸시업</TableData>
                    <TableData>60분</TableData>
                  </tr>
                  <tr>
                    <TableData>스쿼트</TableData>
                    <TableData>40분</TableData>
                  </tr>
                  <tr>
                    <TableData>벤치프레스</TableData>
                    <TableData>50분</TableData>
                  </tr>
                </tbody>
              </Table>
            </TableContainer>
            <Link to="/todolist">
              <StyledGreenButton>운동 등록하기</StyledGreenButton>
            </Link>
          </StyledBlurredBox>
          {/* 식단 목록 */}
          <StyledBlurredBox>
            <h2>오늘의 식단</h2>

            {foods !== null && foods.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>최근 먹은 음식</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.slice(0, 3).map((food, index) => (
                      <tr key={index}>
                        <TableData>{food.name}</TableData>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>식단을 등록해주세요!</p>
            )}
            <Link to="/dietform">
              <StyledGreenButton>등록하러 가기</StyledGreenButton>
            </Link>
          </StyledBlurredBox>
        </StyledBoxSection>

        <StyledBoardContainer>
          <Board boardName="성공스토리" />
        </StyledBoardContainer>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Gather;
