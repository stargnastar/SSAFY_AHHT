import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledFootbar = styled.div`
  background: #f2f2f2;
  padding: 20px;
  text-align: center;
  width: 100vw;

  & > h1 {
    margin-bottom: 20px;
    font-size: 60px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;

    & > div {
      flex: 1;
      margin-right: 20px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;

      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
`;

const Footbar = () => {
  return (
    <StyledFootbar>
      <h1>AHHT!</h1>
      <div>
        <div>
          <h3>부가 정보</h3>
          <ul>
            <li>
              <Link to="/">회사 소개</Link>
            </li>
            <li>
              <Link to="/">이용 약관</Link>
            </li>
            <li>
              <Link to="/">개인 정보 처리 방침</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>연락처</h3>
          <p>이메일: AHHT@vernare.com</p>
          <p>전화번호: 010-4141-4141</p>
        </div>
        <div>
          <h3>팔로우</h3>
          <ul>
            <li>
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">Twitter</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>저작권 © 2023 Vernare. All rights reserved.</p>
      </div>
    </StyledFootbar>
  );
};

export default Footbar;
