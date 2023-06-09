import React, { useState, useRef, useEffect } from 'react'; // { useRef, useEffect, useState }
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: black;
`;

const StyledContent = styled.div`
  margin-top: 110px;
  text-align: center;
  width: 80vw;
`;

const StyledTextLine = styled.div`
  height: 100px;
  width: 100vw;
`;

const StyledMainSection = styled.div`
  height: 400px;
  width: 60%;

  margin: 0 auto;
  justify-content: center;
  display: flex;
  margin-bottom: 4rem;
`;

const StyledGreenButton = styled.button`
  background: #26c98a;
  border: none;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  margin-top: 1rem;
  font-size: large;
  font-weight: bold;
  color: white;
  box-shadow: 0 0 16px white;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 20px grey;
`;

const StyledInnerCarousel = styled(motion.div)`
  display: flex;
`;

const StyledCarousel = styled(motion.div)`
  cursor: grab;
  overflow: hidden;

  width: 100%;
`;

const StyledMainSectionText = styled.div`
  width: 100%;
  height: 100%;
  font-family: NotoSansKr;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledItems = styled(motion.div)`
  min-height: 16rem;
  min-width: 20rem;
  padding: 40px;
`;

const StyledItemsImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  pointer-events: none;
  box-shadow: 0 0 20px grey;
`;

const StyledFollowButtons = styled.div`
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

const StyledInput = styled.input`
  border: 2px solid white;
  text-indent: 1rem;
  font-size: medium;
  border-radius: 10px;
  width: 200px;
  height: 30px;
`;

const StyledButton = styled.button`
  background: #26c98a;
  border: none;
  border-radius: 10px;
  width: 60px;
  height: 36px;
  margin-left: 5px;
  font-size: large;
  font-weight: bold;
  color: white;
`;

const StyledModalImg = styled.img`
  width: 50%;
  border-radius: 10px;
`;

const StyledModalContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  position: relative;
`;

const StyledModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const StyledModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Video = () => {
  useEffect(() => {
    setSearchTerm('등 운동');
    searchVideos();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const searchVideos = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            q: searchTerm,
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyC-16Rt6ZnEG01fZxOkpWVf3zr1572DiCU',
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleCardMouseMove = (e) => {
    if (!isDragging) return;
    carousel.current.scrollLeft += dragStartX - e.clientX;
    setDragStartX(e.clientX);
  };

  const handleCardMouseUp = () => {
    setIsDragging(false);
  };

  const [keyword, SetKeyword] = useState('');

  const handleInputSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    SetKeyword(e.target.value);
  };

  const [activeTab, setActiveTab] = useState('등');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchTerm(tab + '운동');
    searchVideos();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchVideos();
  };
  console.log(searchTerm);
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  console.log(videos);
  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledContent>
        <StyledTextLine style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              marginTop: '20px',
              marginLeft: '40px',
              textAlign: 'left',
              fontSize: '40px',
              color: '#31c48d',
              marginBottom: '10px',
            }}
          >
            AHHT! VIDEO
          </h1>
          <p
            style={{
              marginTop: '0',
              marginLeft: '3.5rem',
              textAlign: 'left',
              fontSize: '32px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'red',
            }}
          >
            🔥 HOT
          </p>
        </StyledTextLine>
        <h1 style={{ marginTop: '0' }}>부위별 검색</h1>
        <StyledFollowButtons>
          <StyledChooseButton
            isActive={activeTab === '등'}
            onClick={() => {
              handleTabClick('등');
            }}
          >
            등
          </StyledChooseButton>
          <StyledChooseButton
            isActive={activeTab === '가슴'}
            onClick={() => {
              handleTabClick('가슴');
            }}
          >
            가슴
          </StyledChooseButton>
          <StyledChooseButton
            isActive={activeTab === '전신'}
            onClick={() => {
              handleTabClick('전신');
            }}
          >
            전신
          </StyledChooseButton>
          <StyledChooseButton
            isActive={activeTab === '코어'}
            onClick={() => {
              handleTabClick('코어');
            }}
          >
            코어
          </StyledChooseButton>
          <StyledChooseButton
            isActive={activeTab === '유연성'}
            onClick={() => {
              handleTabClick('유연성');
            }}
          >
            유연성
          </StyledChooseButton>
        </StyledFollowButtons>

        <p
          style={{
            marginTop: '2rem',
            marginLeft: '3.5rem',
            textAlign: 'left',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          대표 영상
        </p>
        {videos.length > 0 && (
          <>
            <StyledMainSection>
              <StyledImage
                src={videos[0].snippet.thumbnails.high.url}
                alt="trainer"
              ></StyledImage>
              <StyledMainSectionText>
                <h2>{videos[0].snippet.title}</h2>
                <p>{videos[0].snippet.channelTitle}</p>
                <p
                  style={{
                    textAlign: 'left',
                    marginLeft: '20px',
                    fontSize: '18px',
                    fontStyle: 'italic',
                  }}
                >
                  {videos[0].snippet.description}
                </p>
                <StyledGreenButton>
                  {' '}
                  <a
                    href={`https://www.youtube.com/watch?v=${videos[0].id.videoId}`}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    자세히 보러가기
                  </a>
                </StyledGreenButton>
              </StyledMainSectionText>
            </StyledMainSection>
            <StyledCarousel
              ref={carousel}
              whileTap={{ cursor: 'grabbing' }}
              onMouseMove={handleCardMouseMove}
              onMouseUp={handleCardMouseUp}
            >
              <StyledInnerCarousel
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {videos.slice(1).map((video) => {
                  return (
                    <div>
                      <StyledItems
                        className="item"
                        key={video.id.videoId}
                        onClick={() => handleCardClick(video)}
                        initial={{ scale: 1 }}
                        animate={{
                          scale: selectedCard === video.id.videoId ? 1.1 : 1,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <StyledItemsImg
                          src={video.snippet.thumbnails.high.url}
                          alt=""
                        />
                      </StyledItems>
                    </div>
                  );
                })}
              </StyledInnerCarousel>
            </StyledCarousel>
            {selectedCard !== null && (
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'fixed',
                  alignItems: 'center',
                  top: '15%',
                  left: '25%',
                  transform: 'translate(-50%, -50%)',

                  padding: '20px',
                  width: '1000px',
                  height: '650px',
                  zIndex: '100',
                  borderRadius: '30px',
                  border: '2px solid black',

                  backgroundColor: 'rgba(255, 255, 192, 0.007)',

                  backdropFilter: 'blur(50px)',
                  boxShadow: '2px 7px 15px 8px rgba(126, 122, 122, 0.3)',
                }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <StyledModalContent>
                  <h2>운동 영상 정보</h2>
                  <StyledModalImg
                    src={selectedCard.snippet.thumbnails.high.url}
                    alt=""
                    style={{ width: '50%' }}
                  ></StyledModalImg>
                  <StyledModalText>
                    <h2>영상 제목 : {selectedCard.snippet.title}</h2>
                    <p
                      style={{
                        textAlign: 'left',
                        marginLeft: '20px',
                        fontSize: '24px',
                        marginTop: '0',
                      }}
                    >
                      채널명 : {selectedCard.snippet.channelTitle}
                    </p>
                    <p
                      style={{
                        display: 'block',
                        textAlign: 'left',
                        marginLeft: '20px',
                        fontSize: '18px',
                        fontStyle: 'italic',
                        marginTop: '0',
                        marginBottom: '1rem',
                      }}
                    >
                      소개 : {selectedCard.snippet.description}
                      <a
                        href={`https://www.youtube.com/watch?v=${selectedCard.id.videoId}`}
                        style={{ textDecoration: 'underline', color: 'black' }}
                      >
                        자세히 보러가기
                      </a>
                    </p>
                  </StyledModalText>
                  <button
                    style={{
                      border: 'none',
                      width: '100px',
                      height: '50px',
                      backgroundColor: '#26c98a',
                      color: 'white',
                      borderRadius: '10px',

                      fontSize: '18px',
                      position: 'absolute',
                      bottom: '5px',
                    }}
                    onClick={() => setSelectedCard(null)}
                  >
                    Close
                  </button>
                </StyledModalContent>
              </motion.div>
            )}
          </>
        )}
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Video;
