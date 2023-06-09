import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../img/logo-color.svg';

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem; */
  position: fixed;
  width: 100vw;
  background: white;
  border-bottom: solid 1px #31c48d;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLogo = styled.div`
  height: 80px;
  padding-left: 10px;

  padding-bottom: 10px;
  margin-right: 4rem;
`;

const StyledUl = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

const StyledLi = styled.li`
  margin-right: 3rem;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: x-large;
  font-weight: bold;
  font-family: notoSans;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: grey;
  padding: 0.5rem;
  font-size: x-large;
  list-style-type: none;
`;
const DropdownContainer = styled.li`
  position: relative;
  margin-right: 3rem;
  cursor: pointer;
  color: black;
  font-size: x-large;
  font-weight: bold;
  font-family: notoSans;
`;

const StyledAuthButtons = styled.div`
  margin-left: 1rem;
`;

const StyledGreenButton = styled.button`
  flex: 1 1 auto;
  margin-right: 20px;

  padding: 14px 22px;

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  border: none;

  background-image: linear-gradient(
    to right,
    #31c48d 0%,
    #6decbd 51%,
    #31c48d 100%
  );
`;

const StyledYellowButton = styled.button`
  flex: 1 1 auto;
  margin-right: 20px;
  padding: 14px 22px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  border: none;
  background-image: linear-gradient(
    to right,
    #c0c0c0 0%,
    #d0d0d0 51%,
    #c0c0c0 100%
  );
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
    const loginUser = localStorage.getItem('loginUser');
    setIsLoggedIn(!!loginUser);
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('loginUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <StyledNavbar>
      <StyledLogo>
        <StyledLink to="/">
          <Logo style={{ width: 200, height: 100 }}></Logo>
        </StyledLink>
      </StyledLogo>
      <StyledLinkWrapper>
        <StyledUl>
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
              <StyledYellowButton onClick={handleLogout}>
                <StyledLink
                  to="/"
                  style={{ fontSize: 'x-large', color: 'white' }}
                >
                  LOG OUT
                </StyledLink>
              </StyledYellowButton>
              <StyledGreenButton>
                <StyledLink
                  to="/mypage"
                  style={{ fontSize: 'x-large', color: 'white' }}
                >
                  MY PAGE
                </StyledLink>
              </StyledGreenButton>
            </>
          ) : (
            <StyledGreenButton>
              <StyledLink
                to="/login"
                style={{ fontSize: 'x-large', color: 'white' }}
              >
                Get Started
              </StyledLink>
            </StyledGreenButton>
          )}
        </StyledAuthButtons>
      </StyledLoginWrapper>
    </StyledNavbar>
  );
};

export default Navbar;
