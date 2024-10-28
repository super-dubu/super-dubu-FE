import React from "react";
import styled from "styled-components";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

function MemberHeader({ userName, showLogout }) {
  const navigate = useNavigate();

  return (
    <Header>
      <Logo src={logo} />
      <RightContainer>
        <MemberText>
          <UserName>{userName}</UserName> 님, 반갑습니다!
        </MemberText>
        {showLogout ? (
          <Logout onClick={() => navigate("/")}>Logout</Logout>
        ) : (
          <MyPage onClick={() => navigate("/member/mypage")}>My Page</MyPage>
        )}
      </RightContainer>
    </Header>
  );
}

export default MemberHeader;

const Header = styled.div`
  width: 100%;
  height: 5rem;
  border-style: solid;
  border-width: 0 0 1.2px 0;
  border-color: #9b9b9b;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding-left: 1.5rem;
  width: 130px;
  height: auto;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
  line-height: 5rem;
  gap: 2.5rem;
`;

const MemberText = styled.div`
  font-size: 18px;
  color: #adadad;
`;

const UserName = styled.span`
  color: #545454;
`;

const MyPage = styled.div`
  color: #6e7d9c;
  font-weight: 800;
  font-size: 22px;
  cursor: pointer;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cacaca;
  font-size: 15px;
  height: 25px;
  width: 80px;
  border: 1px solid #cacaca;
  cursor: pointer; /* 마우스 오버 시 포인터 변경 */
`;
