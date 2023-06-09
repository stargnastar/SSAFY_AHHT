import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../../img/logo-color.svg";
import Chatmodal from "./chatbot/Chatmodal";

const colorAnimation = keyframes`
    25% { border-color: #f6d365; }
  50% { border-color: #fda085; }
  75% { border-color: #ffea00; }
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem; */
  position: fixed;
  width: 100vw;
  background-color: black;
  border-bottom: 1.5px solid #f6d365;
  z-index: 10;
  animation: ${colorAnimation} 2s infinite;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLogo = styled.div`
  /* width: 220px; */
  height: 80px;
  padding-left: 10px;
  /* padding-top: 10px; */
  padding-bottom: 10px;
  margin-right: 4rem;
`;

// const StyledLogoImg = styled.img`
//   width: 100%;
//   height: 100%;
// `;

const StyledUl = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;

  :hover {
    border-bottom: 3px solid white;
    animation: ${colorAnimation} 3s infinite;
  }
`;

const StyledLi = styled.li`
  margin-right: 3rem;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: x-large;
  font-weight: bold;
  font-family: notoSans;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2e2b2b;
  padding: 0.5rem;
  font-size: x-large;
  list-style-type: none;
`;
const DropdownContainer = styled.li`
  position: relative;
  margin-right: 3rem;
  cursor: pointer;
  color: white;
  font-size: x-large;
  font-weight: bold;
  font-family: notoSans;
`;

const StyledAuthButtons = styled.div`
  margin-left: 1rem;
`;

const StyledButton = styled.button`
  flex: 1 1 auto;
  margin-right: 20px;
  padding: 14px 22px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  border: none;
  /* background-image: linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  ); */
  /* background-image: linear-gradient(
    to right,
    #31c48d 0%,
    #6decbd 51%,
    #31c48d 100%
  ); */
  background-color: #31c48d;
`;
const StyledGreyButton = styled.button`
  flex: 1 1 auto;
  margin-right: 20px;
  padding: 14px 22px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  border: none;
  background-color: #c0c0c0;
  /* background-image: linear-gradient(
    to right,
    #c0c0c0 0%,
    #d0d0d0 51%,
    #c0c0c0 100%
  ); */
`;

const StyledLinkWrapper = styled.div`
  margin-right: auto;
`;

const StyledLoginWrapper = styled.div`
  margin-right: 3rem;
`;

const Navbar = () => {
  const [isCompanyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [isExpertMenuOpen, setExpertMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleCompanyMenu = () => {
    setCompanyMenuOpen(!isCompanyMenuOpen);
  };

  const toggleExpertMenu = () => {
    setExpertMenuOpen(!isExpertMenuOpen);
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    setIsLoggedIn(!!loginUser); // loginUser가 존재하면 true, 그렇지 않으면 false
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem("loginUser");
    setIsLoggedIn(false);
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <StyledNavbar>
      <StyledLogo>
        {/* <StyledLogoImg
          src={process.env.PUBLIC_URL + "/logo-no-background.png"}
          alt="logo"
        ></StyledLogoImg> */}
        <StyledLink to="/">
          <Logo style={{ width: 200, height: 100 }}></Logo>
        </StyledLink>
      </StyledLogo>
      <StyledLinkWrapper>
        <StyledUl>
          {/* <StyledLi>
            <StyledLink to="/">Main</StyledLink>
          </StyledLi> */}
          {/* 
          <DropdownContainer
            onMouseEnter={toggleCompanyMenu}
            onMouseLeave={toggleCompanyMenu}
          >
            Company
            {isCompanyMenuOpen && (
              <DropdownMenu>
                <StyledLi>
                  <StyledLink to="/company/about">About</StyledLink>
                </StyledLi>
                <StyledLi>
                  <StyledLink to="/company/history">History</StyledLink>
                </StyledLi>
              </DropdownMenu>
            )}
          </DropdownContainer> */}
          <DropdownContainer
            onMouseEnter={toggleExpertMenu}
            onMouseLeave={toggleExpertMenu}
          >
            Expert
            {isExpertMenuOpen && (
              <DropdownMenu>
                <StyledLi>
                  <StyledLink to="/expert/doctor">Doctor</StyledLink>
                </StyledLi>
                <StyledLi>
                  <StyledLink to="/expert/trainer">Trainer</StyledLink>
                </StyledLi>
              </DropdownMenu>
            )}
          </DropdownContainer>
          <StyledLi>
            <StyledLink to="/gather">Gather</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/map">Map</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/video">Video</StyledLink>
          </StyledLi>
        </StyledUl>
      </StyledLinkWrapper>
      <StyledLoginWrapper>
        <StyledAuthButtons>
          {isLoggedIn ? (
            <>
              <StyledGreyButton onClick={handleLogout}>
                <StyledLink
                  to="/"
                  style={{ fontSize: "x-large", color: "white" }}
                >
                  LOG OUT
                </StyledLink>
              </StyledGreyButton>
              <StyledButton>
                <StyledLink
                  to="/mypage"
                  style={{ fontSize: "x-large", color: "white" }}
                >
                  MY PAGE
                </StyledLink>
              </StyledButton>
            </>
          ) : (
            <StyledButton>
              <StyledLink
                to="/login"
                style={{ fontSize: "x-large", color: "white" }}
              >
                Get Started
              </StyledLink>
            </StyledButton>
          )}
        </StyledAuthButtons>
      </StyledLoginWrapper>
      <Chatmodal></Chatmodal>
    </StyledNavbar>
  );
};

export default Navbar;
