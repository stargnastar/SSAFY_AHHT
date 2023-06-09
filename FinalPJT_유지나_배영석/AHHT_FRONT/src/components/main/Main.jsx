import React, { useEffect } from 'react';
import Navbar from '../commons/Navbar_black';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { SectionsContainer, Section } from 'react-fullpage';
import Chatmodal from '../commons/chatbot/Chatmodal';
import mainImage1 from './main.jpg';
import doctorImg from './doctorImg.png';
import trainerImg from './trainerImg.png';
import VideoImg from './VideoImg.png';
import MapImg from './MapImg.png';
import Compass from './compass.jpg';
import HosptialDoctor from './hospitalDoctor.jpg';
import { useInView } from 'react-intersection-observer';
import Greenbox from './greenbox.png';
import Map from './Map.png';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContent = styled.div`
  margin-top: 80px;
  background: black;
`;

const StyledMotionDivBlack = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  z-index: 1;
  position: relative;
  background-image: url(${mainImage1});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledMotionDivThird = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  z-index: 1;
  position: relative;
  background-image: url(${Compass});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledMotionDivWhite = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  background: #ffffffb9;
  z-index: 0;
  position: relative;
  background-image: url(${HosptialDoctor});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledMotionDivFourth = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  background: #ffffffb9;
  z-index: 0;
  position: relative;
  background-image: url(${Greenbox});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const flash = keyframes`
  to {
    opacity: 1;
  }
`;

const flashText = keyframes`
  to {
  
    opacity: 1;
  }
`;

const StyledSpan = styled(motion.span)`
  display: block;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: right;
  color: white;
  z-index: 3;
`;

const StyledLightSpan = styled(motion.span)`
  position: relative;
  display: inline-block;
  right: 0rem;
  bottom: 0rem;

  white-space: nowrap;

  &:before {
    position: absolute;
    left: 0;
    top: -10%;
    width: 100%;
    height: 120%;

    background: #83e4bf83;
    filter: blur(10px);
    content: '';
    opacity: 0;
    animation: ${flash} 0.5s ease-out alternate infinite;
  }
`;

const H2 = styled.h2`
  font-family: sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3rem;
  line-height: 0.75;
  text-align: right;
`;

const H2Black = styled.h2`
  font-family: sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3rem;
  line-height: 0.75;
  text-align: right;
  z-index: 10;
`;

const StyledTextBox = styled(motion.div)`
  position: absolute;
  right: 10rem;
  bottom: 10rem;
  width: 70vw;
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  justify-content: center;
  z-index: 100;
`;

const StyledGreenButton = styled.button`
  flex: 1 1 auto;

  width: 240px;
  height: 70px;
  padding: 14px 22px;

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  box-shadow: 0 0 20px grey;
  border-radius: 10px;
  border: none;
  font-size: 24px;
  background-color: #31c48d;
`;

const StyledMapInnerImage = styled.img`
  width: 800px;
  height: 600px;
  position: absolute;
  bottom: 25%;
  left: 10%;
  transform: translateX(-50%, -50%);
  z-index: 6;
`;

const StyledDoctorImg = styled(motion.div)`
  background-image: url(${doctorImg});
  width: 600px;
  height: 500px;
  background-size: cover;
  position: absolute;
  bottom: 36%;
  left: 15%;
  z-index: 3;
  transform: translateX(-50%, -50%);
`;

const StyledTrainerImg = styled(motion.div)`
  background-image: url(${trainerImg});
  width: 600px;
  height: 500px;
  background-size: cover;
  position: absolute;
  bottom: 30%;
  left: 5%;
  transform: translateX(-50%, -50%);
  z-index: 2;
`;

const StyledVideoImg = styled(motion.div)`
  background-image: url(${VideoImg});
  width: 600px;
  height: 450px;
  background-size: cover;
  position: absolute;
  top: 7%;
  right: 7%;
  transform: translateX(-50%, -50%);
`;

const StyledMapImg = styled(motion.div)`
  background-image: url(${MapImg});
  width: 600px;
  height: 400px;
  background-size: cover;
  position: absolute;
  top: 10%;
  left: 10%;
  transform: translateX(-50%, -50%);
`;

const StyledRightTextBox = styled.div`
  width: 900px;
  height: 300px;
  position: absolute;
  bottom: 35%;
  right: 7%;
  transform: translateX(-50%, -50%);
  text-align: right;
  z-index: 5;
`;

let options = {
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
};

const Main = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const boxVariants = {
    out: {
      y: 600,
    },
    in: {
      y: 0,
      transition: {
        duration: 0.6,

        delayChildren: 0.5,

        staggerChildren: 0.5,
      },
    },
  };

  const iconVariants = {
    out: {
      x: -600,
    },
    in: {
      x: 0,
    },
  };

  return (
    <StyledWrapper>
      <Navbar></Navbar>

      <StyledContent>
        <SectionsContainer {...options}>
          <Section>
            <StyledMotionDivBlack>
              <StyledOverlay />
              <StyledTextBox variants={boxVariants} initial="out" animate="in">
                <H2>
                  <StyledSpan variants={iconVariants}>
                    당신의 첫 번째
                  </StyledSpan>
                  <StyledLightSpan
                    style={{ color: '#31c48d' }}
                    variants={iconVariants}
                  >
                    온라인 퍼스널 트레이너
                  </StyledLightSpan>
                  <StyledSpan variants={iconVariants}>
                    운동하다 AHHT!
                  </StyledSpan>
                </H2>
              </StyledTextBox>
            </StyledMotionDivBlack>
          </Section>
          <Section>
            <StyledMotionDivFourth>
              <StyledVideoImg></StyledVideoImg>

              <StyledMapImg></StyledMapImg>
              <div
                style={{
                  position: 'absolute',
                  transform: 'translateX(-50%, -50%)',
                  bottom: '32%',
                  left: '10%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <H2 style={{}}>오운완! 하고 나면 기록하기</H2>
                <StyledGreenButton
                  style={{
                    backgroundColor: 'white',
                    color: '#31c48d',
                    fontWeight: 'bold',
                  }}
                >
                  기록하러 가기
                </StyledGreenButton>
              </div>
              <div
                style={{
                  position: 'absolute',
                  transform: 'translateX(-50%, -50%)',
                  bottom: '31%',
                  right: '10%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <H2
                  style={{
                    color: '#31c48d',
                  }}
                >
                  운동영상 보면서 배우기!
                </H2>
                <StyledGreenButton
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  영상 보러가기
                </StyledGreenButton>
              </div>
              <StyledTextBox></StyledTextBox>
            </StyledMotionDivFourth>
          </Section>

          <Section>
            <StyledMotionDivThird>
              <StyledOverlay />

              <StyledTextBox style={{ bottom: '15rem', right: '15rem' }}>
                <H2>
                  <StyledSpan variants={iconVariants}>
                    당신이 다쳤을 때
                  </StyledSpan>
                  <StyledLightSpan
                    style={{ color: '#31c48d' }}
                    variants={iconVariants}
                  >
                    가장 빠른 지도
                  </StyledLightSpan>
                </H2>
              </StyledTextBox>
            </StyledMotionDivThird>
          </Section>
        </SectionsContainer>
      </StyledContent>
    </StyledWrapper>
  );
};

export default Main;
