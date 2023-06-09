import React, { useState, useEffect } from 'react';
import Navbar from '../commons/Navbar';
import Footbar from '../commons/Footbar';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTableRow = styled.tr`
  background-color: #f8f8f8;

  &:nth-child(even) {
    background-color: #f0f0f0;
  }
`;

const StyledTableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const StyledContent = styled.div`
  margin-top: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
`;

const StyledTableData = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const StyledProfileImage = styled.img`
  margin-top: 3rem;
  border-radius: 10rem;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const StyledProfileName = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const StyledFollowButtons = styled.div`
  width: 100%;
`;

const StyledButton = styled.button`
  background: #2497e4;
  border: none;
  border-radius: 10px;
  width: 150px;
  height: 50px;

  font-size: large;
  font-weight: bold;
  color: white;
  margin-right: 10px;
  margin-left: 10px;
`;

const StyledBlurredBox = styled.div`
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 30vw;
  height: 300px;

  border-radius: 30px;
  margin-top: 3rem;

  background-color: rgba(255, 255, 192, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 2px 7px 15px 8px rgba(0, 0, 0, 0.3);
`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const Mypage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUserData(user);
    }
  }, []);

  return (
    <StyledWrapper>
      <Navbar></Navbar>
      <StyledContent>
        <StyledProfileImage
          src={process.env.PUBLIC_URL + '/trainer1.jpg'}
        ></StyledProfileImage>
        {userData && (
          <>
            <StyledProfileName>
              <p style={{ marginTop: '1rem' }}>{userData.nickname}</p>
            </StyledProfileName>

            <StyledBlurredBox>
              <StyledTable>
                <tbody>
                  <StyledTableRow>
                    <StyledTableHeader>Username</StyledTableHeader>
                    <StyledTableData>{userData.username}</StyledTableData>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableHeader>Nickname</StyledTableHeader>
                    <StyledTableData>{userData.nickname}</StyledTableData>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableHeader>Age</StyledTableHeader>
                    <StyledTableData>{userData.age}</StyledTableData>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableHeader>Tel</StyledTableHeader>
                    <StyledTableData>{userData.tel}</StyledTableData>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableHeader>Email</StyledTableHeader>
                    <StyledTableData>{userData.email}</StyledTableData>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableHeader>Expert</StyledTableHeader>
                    <StyledTableData>
                      {userData.expert ? 'Yes' : 'No'}
                    </StyledTableData>
                  </StyledTableRow>
                </tbody>
              </StyledTable>
            </StyledBlurredBox>
          </>
        )}
      </StyledContent>
      <Footbar></Footbar>
    </StyledWrapper>
  );
};

export default Mypage;
