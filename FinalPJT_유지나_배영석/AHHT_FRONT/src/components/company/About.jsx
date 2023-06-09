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

const About = () => {
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
        <h1>AHHT 서비스 소개</h1>
      </StyledCardbox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>회사 소개 - 박스 4개</h1>
      </StyledCardbox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>조직 구성 - 좌우로 나눠서 마우스 오버에 따라 달라지게</h1>
      </StyledCardbox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>경영 이념 - 좌우로 나눠서 리스트로</h1>
      </StyledCardbox>
      <StyledCardbox style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
        <h1>로고 소개 - 좌측엔 이미지 우측엔 설명</h1>
      </StyledCardbox>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default About;
