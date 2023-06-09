import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BoardContainer = styled.div`
  padding: 20px;
`;

const CategorySelect = styled.select`
  margin-bottom: 20px;
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PostItem = styled.div`
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
`;

const PostTitle = styled.h2`
  color: #333;
`;

const PostContent = styled.p`
  color: #666;
`;

const PostImage = styled.img`
  width: 100%;
`;

const PostInfo = styled.div`
  margin-top: 10px;
`;

const PostInfoItem = styled.p`
  margin: 5px 0;
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
const Board = ({ boardName }) => {
  const [activeTab, setActiveTab] = useState('성공스토리');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/gatherapi/gather/board/${boardName}`
        );
        console.log(response);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
    };

    fetchArticles();
  }, [boardName]);

  const handleTabClick = async (tab) => {
    setActiveTab(tab);

    try {
      const response = await fetch(
        `http://localhost:8080/gatherapi/gather/board/${tab}`
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <BoardContainer>
      <StyledFollowButtons>
        <StyledChooseButton
          isActive={activeTab === '성공스토리'}
          onClick={() => {
            handleTabClick('성공스토리');
          }}
        >
          성공스토리
        </StyledChooseButton>
        <StyledChooseButton
          isActive={activeTab === '식단'}
          onClick={() => {
            handleTabClick('식단');
          }}
        >
          식단
        </StyledChooseButton>
        <StyledChooseButton
          isActive={activeTab === '운동'}
          onClick={() => {
            handleTabClick('운동');
          }}
        >
          운동
        </StyledChooseButton>
        <StyledChooseButton
          isActive={activeTab === '꿀팁'}
          onClick={() => {
            handleTabClick('꿀팁');
          }}
        >
          꿀팁
        </StyledChooseButton>
        <StyledChooseButton
          isActive={activeTab === '질문'}
          onClick={() => {
            handleTabClick('질문');
          }}
        >
          질문
        </StyledChooseButton>
      </StyledFollowButtons>
      <PostContainer>
        {posts &&
          posts.map((post) => (
            <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
              <div>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </div>
              <div></div>
              <PostInfo>
                <PostInfoItem>Author: {post.writerId}</PostInfoItem>
                <PostInfoItem>Views: {post.viewCnt}</PostInfoItem>
              </PostInfo>
            </PostItem>
          ))}
      </PostContainer>
    </BoardContainer>
  );
};

export default Board;
