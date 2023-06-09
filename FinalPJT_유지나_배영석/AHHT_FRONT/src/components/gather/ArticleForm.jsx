import React, { useState, useEffect } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled(Form)`
  margin-top: 150px;
  max-width: 400px;
`;

const ArticleForm = () => {
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState(1);
  const [file, setFile] = useState(null);

  const saveDataToLocalStorage = (data) => {
    const saveDataToLocalStorage = (data) => {
      const savedData = JSON.parse(localStorage.getItem('articleData')) || [];
      savedData.push(data);
      localStorage.setItem('fitnessData', JSON.stringify(data));
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const formData = {
        id: 1,
        boardId,
        title,
        content,
        writerId,
        file,
      };

      // 데이터 저장
      saveDataToLocalStorage(formData);
      console.log('Article object registered:', formData);

      window.location.href = 'http://localhost:3000/gather';
    } catch (error) {
      console.error('Error registering Article object:', error);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('articleData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // 저장된 데이터를 상태로 설정
      setBoardId(parsedData.boardId);
      setTitle(parsedData.title);
      setContent(parsedData.content);
      setWriterId(parsedData.writerId);
    }
  }, []);

  return (
    <StyledWrapper>
      <Navbar />
      <Card>
        <div>
          <h2>글쓰기</h2>
          <Card></Card>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mr-3">
              <Form.Label for="title">제목</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
                className="text-muted"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label for="content">내용</Form.Label>
              <Form.Control
                type="textarea"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label for="file">첨부 파일</Form.Label>
              <Form.Control
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button color="success" type="submit">
              등록
            </Button>
          </StyledForm>
        </div>
      </Card>
      <Footbar />
    </StyledWrapper>
  );
};

export default ArticleForm;
