import React, { useState } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledWrapper = styled.div`
  height: 1200px;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  opacity: ${(props) => (props.hovered ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
  z-index: -10;
  color: black;
`;

const StyledDoctorCard = styled(motion.div)`
  height: 100vh;
  width: 20%;
  border: 1px solid black;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: pointer;
`;

const StyledCardList = styled.div`
  display: flex;
  padding-top: 80px;
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  font-size: 32px;
  color: ${(props) => (props.hovered ? 'transparent' : 'white')};
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
  color: white;
`;

const StyledModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Doctor = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const doctorData = [
    {
      name: 'James King',
      specialization: 'Dentist',
      education: '미 주립대 전문의',
      experience: '경력: 10년',
      introduction: '안녕하세요. 저는 치과 의사 James King입니다.',
      imageSrc: process.env.PUBLIC_URL + '/doctor1.jpg',
    },
    {
      name: 'Emily Lee',
      specialization: 'Internist',
      education: '예일의대',
      experience: '경력: 8년',
      introduction: '안녕하세요. 저는 내과 의사 Emily Lee입니다.',
      imageSrc: process.env.PUBLIC_URL + '/doctor2.jpg',
    },
    {
      name: 'Kyle Johnson',
      specialization: 'Surgeon',
      education: '뉴욕대 전문의',
      experience: '경력: 12년',
      introduction: '안녕하세요. 저는 외과 의사 Kyle Johnson입니다.',
      imageSrc: process.env.PUBLIC_URL + '/doctor3.jpg',
    },
    {
      name: 'Sarah Anderson',
      specialization: 'Pediatrician',
      education: '스탠포드대 전문의',
      experience: '경력: 6년',
      introduction: '안녕하세요. 저는 소아과 의사 Sarah Anderson입니다.',
      imageSrc: process.env.PUBLIC_URL + '/doctor4.jpg',
    },
    {
      name: 'David Roberts',
      specialization: 'Orthopedic',
      education: '하버드대 전문의',
      experience: '경력: 15년',
      introduction: '안녕하세요. 저는 정형외과 의사 David Roberts입니다.',
      imageSrc: process.env.PUBLIC_URL + '/doctor5.jpg',
    },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleCardHover = (index, isHovered) => {
    setHoveredCard(isHovered ? index : null);
  };

  const StyledModalImg = styled.img`
    width: 50%;
    border-radius: 10px;
    max-height: 400px;
    object-fit: contain;
  `;

  const StyledModalContent = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
    justify-content: center;
  `;

  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledCardList>
        <StyledDoctorCard
          id="doctor-card-0"
          onMouseEnter={() => handleCardHover(0, true)}
          onMouseLeave={() => handleCardHover(0, false)}
          onClick={() => handleCardClick(0)}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedCard === 0 ? 1.1 : 1,
            transition: { duration: 0.3 },
          }}
        >
          <StyledText hovered={hoveredCard === 0}>
            <p>DENTIST</p>
            <p style={{ fontSize: '20px' }}>
              James King<br></br>미 주립대 전문의
            </p>
          </StyledText>
          <StyledOverlay hovered={hoveredCard === 0} />
          <StyledImage
            style={{ objectPosition: '30%' }}
            src={process.env.PUBLIC_URL + '/doctor1.jpg'}
            alt="doctor"
          />
        </StyledDoctorCard>
        <StyledDoctorCard
          id="doctor-card-1"
          onMouseEnter={() => handleCardHover(1, true)}
          onMouseLeave={() => handleCardHover(1, false)}
          onClick={() => handleCardClick(1)}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedCard === 1 ? 1.1 : 1,
            transition: { duration: 0.3 },
          }}
        >
          <StyledText hovered={hoveredCard === 1}>
            <p>Internist</p>
            <p style={{ fontSize: '20px' }}>
              Emily Lee<br></br>예일의대
            </p>
          </StyledText>
          <StyledOverlay hovered={hoveredCard === 1} />
          <StyledImage
            style={{ objectPosition: '41%' }}
            src={process.env.PUBLIC_URL + '/doctor2.jpg'}
            alt="doctor"
          />
        </StyledDoctorCard>
        <StyledDoctorCard
          id="doctor-card-2"
          onMouseEnter={() => handleCardHover(2, true)}
          onMouseLeave={() => handleCardHover(2, false)}
          onClick={() => handleCardClick(2)}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedCard === 2 ? 1.1 : 1,
            transition: { duration: 0.3 },
          }}
        >
          <StyledText hovered={hoveredCard === 2}>
            <p>Surgeon</p>
            <p style={{ fontSize: '20px' }}>
              Kyle Johnson
              <br></br>뉴욕대 전문의
            </p>
          </StyledText>
          <StyledOverlay hovered={hoveredCard === 2} />
          <StyledImage
            style={{ objectPosition: '50% 60%' }}
            src={process.env.PUBLIC_URL + '/doctor3.jpg'}
            alt="doctor"
          />
        </StyledDoctorCard>
        <StyledDoctorCard
          id="doctor-card-3"
          onMouseEnter={() => handleCardHover(3, true)}
          onMouseLeave={() => handleCardHover(3, false)}
          onClick={() => handleCardClick(3)}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedCard === 3 ? 1.1 : 1,
            transition: { duration: 0.3 },
          }}
        >
          <StyledText hovered={hoveredCard === 3}>
            <p>Pediatrician</p>
            <p style={{ fontSize: '20px' }}>
              Sarah Anderson<br></br> 스탠포드대 전문의
            </p>
          </StyledText>
          <StyledOverlay hovered={hoveredCard === 3} />
          <StyledImage
            style={{ objectPosition: '62%' }}
            src={process.env.PUBLIC_URL + '/doctor4.jpg'}
            alt="doctor"
          />
        </StyledDoctorCard>
        <StyledDoctorCard
          id="doctor-card-4"
          onMouseEnter={() => handleCardHover(4, true)}
          onMouseLeave={() => handleCardHover(4, false)}
          onClick={() => handleCardClick(4)}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedCard === 4 ? 1.1 : 1,
            transition: { duration: 0.3 },
          }}
        >
          <StyledText hovered={hoveredCard === 4}>
            <p>Orthopedic</p>
            <p style={{ fontSize: '20px' }}>
              David Roberts<br></br>하버드대 전문의
            </p>
          </StyledText>
          <StyledOverlay hovered={hoveredCard === 4} />
          <StyledImage
            style={{ objectPosition: '48%' }}
            src={process.env.PUBLIC_URL + '/doctor5.jpg'}
            alt="doctor"
          />
        </StyledDoctorCard>
      </StyledCardList>
      {selectedCard !== null && (
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            alignItems: 'center',
            justifyContent: 'center',
            top: '15%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '1000px',
            height: '650px',
            zIndex: '100',
            borderRadius: '30px',
            border: '2px solid white',
            backgroundColor: 'rgba(255, 255, 192, 0.007)',
            backdropFilter: 'blur(50px)',
            boxShadow: '2px 7px 15px 8px rgba(126, 122, 122, 0.3)',
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 style={{ color: 'white', fontSize: '32px', marginTop: '0' }}>
            의사 프로필
          </h2>
          <StyledModalContent>
            <StyledModalImg
              src={process.env.PUBLIC_URL + `/doctor${selectedCard + 1}.jpg`}
              alt=""
              style={{ width: '50%' }}
            ></StyledModalImg>
            <StyledModalText>
              <p
                style={{
                  marginLeft: '20px',
                  fontSize: '24px',
                  marginTop: '0',
                }}
              >
                전공 : {doctorData[selectedCard].specialization}
              </p>
              <p
                style={{
                  marginLeft: '20px',
                  fontSize: '20px',
                  marginTop: '0',
                }}
              >
                의사명 : {doctorData[selectedCard].name}
              </p>
              <p
                style={{
                  marginLeft: '20px',
                  fontSize: '20px',
                  marginTop: '0',
                  textAlign: 'center',
                }}
              >
                {doctorData[selectedCard].introduction} <br></br>
                <a
                  href={`https://app.gather.town/invite?token=v7IeYWhoSRKc3To7DIM8`}
                  style={{ textDecoration: 'underline', color: 'white' }}
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
                position: 'absolute',
                bottom: '10px',
                marginBottom: '10px',
                marginTop: '10px',
              }}
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </StyledModalContent>
        </motion.div>
      )}
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Doctor;
