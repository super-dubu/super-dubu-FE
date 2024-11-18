import React from "react";
import styled from "styled-components";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

function MemberLogin() {
  const navigate = useNavigate();
  return (
    <div>
      <Header>
        <Logo src={logo} onClick={() => navigate("/")} />
      </Header>
      <Container>
        <LoginText>DUBU LOGIN</LoginText>
        <Login>
          <Box placeholder="ID"></Box>
          <Box placeholder="Password"></Box>
        </Login>
        <Buttons>
          <LoginButton onClick={() => navigate("/member")}>LOGIN</LoginButton>
          <JoinButton onClick={() => navigate("/member/join")}>JOIN</JoinButton>
        </Buttons>
      </Container>
    </div>
  );
}

export default MemberLogin;

const Header = styled.div`
  width: 100%;
  height: 5rem;
  /* background-color: grey; */
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

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginText = styled.div`
  color: #6a6a6a;
  font-weight: 800;
  font-size: 56px;
  margin-top: 180px;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 500px;
  height: 50px;
  gap: 2.5rem;
`;

const Box = styled.input`
  margin-top: 2rem;
  width: 500px;
  height: 50px;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #9b9b9b;
  /* text-align: center; */
  font-size: 22px;
  &::placeholder {
    color: #adadad;
    font-size: 22px;
    transform: translateY(-5px);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  /* border-radius: 20px; */
  gap: 1rem;
`;

const LoginButton = styled.button`
  background-color: #6e7d9c;
  color: white;
  border: none;
  font-size: 24px;
  font-weight: 900;
  border-radius: 15px;
  width: 505px;
  height: 70px;
`;

const JoinButton = styled.button`
  background-color: white;
  border-color: #6e7d9c;
  color: #6e7d9c;
  font-size: 24px;
  font-weight: 900;
  border-radius: 15px;
  width: 505px;
  height: 70px;
`;
