import React, { useState, useEffect } from 'react';
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
  width: 60vw;
  margin-bottom: 120px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.th`
  padding: 10px;
  background: #f2f2f2;
  text-align: center;
  vertical-align: middle;
`;

const StyledTableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
`;

const StyledDeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  useEffect(() => {
    const fitnessFromLocalStorage = localStorage.getItem('fitnessData');
    console.log(fitnessFromLocalStorage);

    if (fitnessFromLocalStorage && loginUser !== null) {
      const fitData = JSON.parse(JSON.stringify(fitnessFromLocalStorage));

      console.log(fitData);
      const filteredFitnesses = [];

      fitData.forEach((data) => {
        if (data.part && data.writerId === loginUser.id) {
          filteredFitnesses.push(data);
        }
      });
      setTodos(filteredFitnesses);
      console.log(filteredFitnesses);
    } else {
      setTodos([]);
    }
  }, [loginUser.id]);

  const handleDeleteTodo = async (index) => {
    const todostemp = [...todos];
    todostemp.splice(index, 1);
    setTodos(todostemp);
    console.log(todos);
    localStorage.setItem('fitnessData', JSON.stringify(todos));
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
          오운완 List
        </h1>
        <hr></hr>
        <StyledTable>
          <thead>
            <tr>
              <StyledTableHeader>번호</StyledTableHeader>
              <StyledTableHeader>운동부위</StyledTableHeader>
              <StyledTableHeader>내용</StyledTableHeader>
              <StyledTableHeader>운동시간</StyledTableHeader>
              <StyledTableHeader>삭제</StyledTableHeader>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{todo.part}</StyledTableCell>
                <StyledTableCell>{todo.content}</StyledTableCell>
                <StyledTableCell>{todo.time}</StyledTableCell>
                <StyledTableCell>
                  <StyledDeleteButton onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </StyledDeleteButton>
                </StyledTableCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default TodoList;
