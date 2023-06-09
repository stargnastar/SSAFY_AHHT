import React, { useState, useRef, useEffect } from 'react'; // { useRef, useEffect, useState }
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar_black';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import images from '../../images';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
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
  width: 80%;

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
  color: black;
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
  object-fit: cover;
`;

const StyledModalImg = styled.img`
  width: 50%;
  border-radius: 10px;
  max-height: 50%;
  object-fit: contain;
`;

const StyledModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledModalContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  position: relative;
`;

const Trainer = () => {
  const cardContents = [
    {
      name: '괴물 트레이너 Don Lee',
      career: '(전) 스포츠협회 회장\n(현) 가리봉동 강력계 형사',
      introduction:
        '아 회원님 운동 그렇게 하시는 거 아닌데\n어제 치킨 안드셨다고?\n저는 다 아는 방법이 있어요\n회원님 자꾸 거짓말하시면 혀가 뽑히는 수가 있어?',
      image: '/trainer1.jpg',
    },
    {
      name: '파워 트레이너 Jane Smith',
      career: '(전) 국가대표 유도 선수\n(현) 세계 최고 권투 선수',
      introduction:
        '안녕하세요! 저는 Jane Smith입니다.\n열정적으로 운동을 지도하고\n귀하의 목표 달성을 도와드립니다!',
      image: '/trainer2.jpg',
    },
    {
      name: '헬스매니아 John Doe',
      career: '헬스클럽 운영자\n퍼스널 트레이너',
      introduction:
        '안녕하세요! 저는 John Doe입니다.\n다양한 운동 프로그램으로\n귀하의 건강을 도와드립니다!',
      image: process.env.PUBLIC_URL + '/trainer3.jpg',
    },
    {
      name: '요가 강사 Emma Johnson',
      career: '인증 요가 강사\n수상 경력 다수',
      introduction:
        '안녕하세요! 저는 Emma Johnson입니다.\n함께 몸과 마음을 힐링하는\n요가 시간을 가져봐요!',
      image: process.env.PUBLIC_URL + '/trainer4.jpg',
    },
    {
      name: '스포츠 트레이너 Alex Wilson',
      career: '스포츠 과학 박사\n운동 생리학 전문가',
      introduction:
        '안녕하세요! 저는 Alex Wilson입니다.\n과학적인 접근으로 최고의\n운동 효과를 제공해드립니다!',
      image: process.env.PUBLIC_URL + '/trainer5.jpg',
    },
    {
      name: '헬스 열정가 Sarah Lee',
      career: '헬스 트레이너\n다이어트 전문가',
      introduction:
        '안녕하세요! 저는 Sarah Lee입니다.\n당신의 건강과 목표를 위해\n열정적으로 도와드립니다!',
      image: process.env.PUBLIC_URL + '/trainer6.jpg',
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(cardContents[index]);
    console.log(selectedCard);
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

  const handlePrevClick = () => {
    carousel.current.scrollTo({
      left: carousel.current.scrollLeft - carousel.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const handleNextClick = () => {
    carousel.current.scrollTo({
      left: carousel.current.scrollLeft + carousel.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

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
            AHHT! Trainers
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
            NOW
          </p>
        </StyledTextLine>
        <StyledMainSection>
          <StyledImage
            src={process.env.PUBLIC_URL + '/trainer1.jpg'}
            alt="trainer"
          ></StyledImage>
          <StyledMainSectionText>
            <h1>괴물 트레이너 Don Lee</h1>
            <p>
              (전) 스포츠협회 회장<br></br>
              (현) 가리봉동 강력계 형사
            </p>
            {/* <br></br> */}
            <p
              style={{
                textAlign: 'left',
                marginLeft: '20px',
                fontSize: '18px',
                fontStyle: 'italic',
              }}
            >
              아 회원님 운동 그렇게 하시는 거 아닌데<br></br>어제 치킨
              안드셨다고?<br></br>저는 다 아는 방법이 있어요<br></br>회원님 자꾸
              거짓말하시면 혀가 뽑히는 수가 있어?{' '}
            </p>
            <StyledGreenButton onClick={() => handleCardClick(0)}>
              상담 받기
            </StyledGreenButton>
          </StyledMainSectionText>
        </StyledMainSection>
        <p
          style={{
            marginTop: '2rem',
            marginLeft: '3.5rem',
            textAlign: 'left',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          지금 상담 중
        </p>
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
            {images.map((image, index) => {
              return (
                <StyledItems
                  className="item"
                  key={index}
                  onClick={() => handleCardClick(index)}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: selectedCard === 0 ? 1.1 : 1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <StyledItemsImg src={image} alt="" />
                </StyledItems>
              );
            })}
          </StyledInnerCarousel>
        </StyledCarousel>
        <button onClick={handlePrevClick}>이전</button>
        <button onClick={handleNextClick}>다음</button>
        {selectedCard !== null && (
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              top: '15%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: "white",
              padding: '20px',
              width: '1000px',
              height: '650px',
              zIndex: '100',
              borderRadius: '30px',
              backgroundColor: 'rgba(255,255,192,0.1)',
              backdropFilter: 'blur(80px)',
              boxShadow: '2px 7px 15px 8px rgba(0,0,0,0.3)',
              border: '2px solid black',
              color: 'black',
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>트레이너 정보</h2>
            <StyledModalContent>
              <StyledModalImg
                src={`${process.env.PUBLIC_URL}${selectedCard.image}`}
                alt=""
                style={{ width: '50%' }}
              ></StyledModalImg>
              <StyledModalText>
                <h2>트레이너 : {selectedCard.name}</h2>
                <p
                  style={{
                    textAlign: 'left',
                    marginLeft: '20px',
                    fontSize: '24px',
                    marginTop: '0',
                  }}
                >
                  경력 : {selectedCard.career}
                </p>
                <p
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginLeft: '20px',
                    fontSize: '18px',
                    fontStyle: 'italic',
                    marginTop: '0',
                    marginBottom: '1rem',
                  }}
                >
                  소개 : {selectedCard.introduction}
                  <br></br>
                  <a
                    href={`https://app.gather.town/invite?token=v7IeYWhoSRKc3To7DIM8`}
                    style={{ textDecoration: 'underline', color: 'black' }}
                  >
                    상담하러 가기
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
                  bottom: '5px',
                }}
                onClick={() => setSelectedCard(null)}
              >
                Close
              </button>
            </StyledModalContent>
          </motion.div>
        )}
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Trainer;
