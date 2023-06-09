import React, { useState } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import uuid from 'react-uuid';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 80px;
  text-align: center;
  width: 60vw;
  margin-bottom: 120px;
`;

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
`;

const StyledImageBox = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  background: #31c48d;
  border: none;
  border-radius: 10px;
  width: 300px;
  height: 80px;

  font-size: large;
  font-weight: bold;
  color: white;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const StyledMealButton = styled.button`
  background: ${({ selected }) => (selected ? '#31c48d' : 'grey')};
  border: none;
  border-radius: 10px;
  width: 200px;
  height: 80px;
  font-size: large;
  font-weight: bold;
  color: white;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const StyledButtonList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRank = styled.div`
  font-size: 32px;
`;

const StyledP = styled.p`
  font-weight: bold;
  text-align: left;
  margin-left: 1rem;
  font-size: 24px;
`;

const StyledInput = styled.input`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-indent: 10px;
  &::placeholder {
    color: gray;
  }
`;

const StyledSmallButton = styled.button`
  background: #31c48d;
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 60px;

  font-size: large;
  font-weight: bold;
  color: white;
`;

const StyledDeleteButton = styled.button`
  background: red;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 55px;

  font-size: large;
  font-weight: bold;
  color: white;
  margin-left: 10px;
`;

const DietForm = () => {
  const [rating, setRating] = useState(0);
  const [meal, setMeal] = useState('');
  const [kcal, setKcal] = useState(0);
  const [foods, setFoods] = useState([]);

  const handleFoodChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFoods = [...foods];
    updatedFoods[index][name] = value;
    setFoods(updatedFoods);
  };

  const handleAddFood = () => {
    const newFood = {
      id: uuid(),
      name: '',
      calories: '',
    };
    setFoods([...foods, newFood]);
  };

  const handleRemoveFood = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  };

  const renderFoodInputs = () => {
    return foods.map((food, index) => (
      <div
        key={food.id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <StyledInput
          type="text"
          name="name"
          value={food.name}
          onChange={(event) => handleFoodChange(event, index)}
          placeholder="음식명"
          style={{ margin: '0' }}
        />

        <StyledDeleteButton onClick={() => handleRemoveFood(food.id)}>
          삭제
        </StyledDeleteButton>
      </div>
    ));
  };

  const handleStarClick = (selectedRating) => {
    setRating(Number(selectedRating));
  };

  const handleMealSelect = (selectedMeal) => {
    setMeal(selectedMeal);
  };

  const handleKcalChange = (event) => {
    const value = parseInt(event.target.value);
    setKcal(value);
  };
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  const userId = loginUser.id;
  const handleFormSubmit = () => {
    console.log(userId);
    if (loginUser) {
      const formData = {
        rate: Number(rating),
        when: meal,
        cal: kcal,
        foods: foods,
        userId: userId,
      };

      console.log(formData);
      const savedData = JSON.parse(localStorage.getItem('dietData')) || [];
      savedData.push(formData);
      localStorage.setItem('dietData', JSON.stringify(savedData));
    }
  };
  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledContent>
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'left',
            marginLeft: '1rem',
          }}
        >
          #오늘의 식단
        </h1>
        <hr></hr>
        <StyledP>이번에 먹은 음식</StyledP>
        {renderFoodInputs()}
        <StyledSmallButton onClick={handleAddFood}>음식 추가</StyledSmallButton>
        <hr />

        <StyledP>내가 평가하는 식단 별점</StyledP>
        <StyledRank>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => handleStarClick(index + 1)}
            >
              {index + 1 <= rating ? '★' : '☆'}
            </span>
          ))}
          <p>별점: {rating}</p>
          <hr />
        </StyledRank>
        <StyledP>어떤 끼니로 먹었나요?</StyledP>
        <StyledRank>
          <StyledMealButton
            selected={meal === '아침'}
            onClick={() => handleMealSelect('아침')}
          >
            아침
          </StyledMealButton>
          <StyledMealButton
            selected={meal === '점심'}
            onClick={() => handleMealSelect('점심')}
          >
            점심
          </StyledMealButton>
          <StyledMealButton
            selected={meal === '저녁'}
            onClick={() => handleMealSelect('저녁')}
          >
            저녁
          </StyledMealButton>
          {meal && <p>{meal}</p>}
        </StyledRank>
        <hr />
        <StyledP>영양성분(선택)</StyledP>
        <StyledInput
          type="number"
          value={kcal}
          onChange={handleKcalChange}
          min="0"
          placeholder="열량(kcal)"
        />
        <hr />

        <StyledRank>
          <StyledMealButton>이전</StyledMealButton>
          <Link to="/gather">
            <StyledMealButton
              style={{ backgroundColor: '#31c48d' }}
              onClick={handleFormSubmit}
            >
              다음
            </StyledMealButton>
          </Link>
        </StyledRank>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default DietForm;
