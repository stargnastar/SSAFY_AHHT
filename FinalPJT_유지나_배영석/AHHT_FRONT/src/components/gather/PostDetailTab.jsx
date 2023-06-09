import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PostDetailContainer = styled.div`
  padding: 20px;
`;

const PostDetailTitle = styled.h2`
  color: #333;
`;

const PostDetailContent = styled.p`
  color: #666;
`;

const PostDetailImage = styled.img`
  width: 100%;
`;

const PostDetailInfo = styled.div`
  margin-top: 10px;
`;

const PostDetailInfoItem = styled.p`
  margin: 5px 0;
`;

const PostDetailTab = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/gatherapi/gather/${postId}`
        );
        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost(null);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostDetailContainer>
      <PostDetailTitle>{post.title}</PostDetailTitle>
      <PostDetailContent>{post.content}</PostDetailContent>
      {post.fileName !== '' && (
        <PostDetailImage src={post.fileUri} alt={post.title} />
      )}
      <PostDetailInfo>
        <PostDetailInfoItem>Author: {post.author}</PostDetailInfoItem>
        <PostDetailInfoItem>Views: {post.views}</PostDetailInfoItem>
        <PostDetailInfoItem>Date: {post.date}</PostDetailInfoItem>
      </PostDetailInfo>
    </PostDetailContainer>
  );
};

export default PostDetailTab;
