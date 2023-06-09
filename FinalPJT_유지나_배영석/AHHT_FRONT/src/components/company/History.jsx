import React from "react";
import Navbar from "../commons/Navbar";
import Footbar from "../commons/Footbar";
import styled from "styled-components";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const StyledWrapper = styled(motion.div)`
  background: black;
  height: 6000px;
`;

const StyledCardbox = styled(motion.div)`
  margin-top: 1000px;
  color: white;
  text-align: center;
`;

const StyledTextCardBox = styled(motion.div)`
  margin-top: 1000px;
  color: white;
  text-align: center;
`;

const History = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg,#00eeee ,#0053ee)",
      "linear-gradient(135deg,#aeee00 ,#57ee00)",
    ]
  );

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <StyledWrapper style={{ background: gradient }}>
      <Navbar></Navbar>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>사업 목표 소개</h1>
      </StyledCardbox>
      <StyledTextCardBox>
        <h1>힘찬 첫 걸음, IT 기술로 인정받는 기업</h1>
      </StyledTextCardBox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>힘찬 첫 걸음, 기술로 인정받는 기업</h1>
      </StyledCardbox>
      <StyledTextCardBox>
        <h1>도전에 대한 성과</h1>
      </StyledTextCardBox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>도전에 대한 성과 사진과 함께</h1>
      </StyledCardbox>
      <StyledTextCardBox>
        <h1>일상 속에서 만나는 기업</h1>
      </StyledTextCardBox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>도전에 대한 성과</h1>
      </StyledCardbox>
      <StyledTextCardBox>
        <h1>은하계 점유율 1위</h1>
      </StyledTextCardBox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>도전에 대한 성과</h1>
      </StyledCardbox>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default History;
