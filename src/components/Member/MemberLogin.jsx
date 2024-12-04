import React, { useState, useContext } from "react";
import styled from "styled-components";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../api/AuthContext";
import CryptoJS from "crypto-js";

function MemberLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const { login, user, setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const ENC_KEY = import.meta.env.VITE_ENC_KEY;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password + ENC_KEY).toString();

      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/memberLogin/isValid`,
        {
          params: { id, pw: hashedPassword },
        }
      );

      if (response.data.valid) {
        alert("로그인 성공!");

        const token = response.data.token;
        localStorage.setItem("token", response);
        
        const userInfoResponse = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/memberLogin/memberInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId: id,
            },
          }
        );

        login(userInfoResponse.data.user);
        navigate("/member");
      } else {
        alert("유효하지 않은 아이디 또는 비밀번호입니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div>
      <Header>
        <Logo src={logo} onClick={() => navigate("/")} />
      </Header>
      <Container>
        <LoginText>DUBU LOGIN</LoginText>
        <Login>
          <Box
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Box
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Login>
        <Buttons>
          <LoginButton onClick={handleLogin}>LOGIN</LoginButton>
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
  height: 70px;
  line-height: auto;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #9b9b9b;
  font-size: 22px;
  outline: none;
  padding-bottom: 5px;

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
  cursor: pointer;
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
  cursor: pointer;
`;

// HLF/Auth

// const te1 = "유태석";
// const te2 = "931014-15380017";
// const hashedCode = CryptoJS.SHA256(te1 + te2 + ENC_KEY).toString();
// console.log(decodeURI(te1));
// const resdata = await axios.get(
//   `${import.meta.env.VITE_BACK_URL}/HLF/Auth`,
//   {
//     params: { name: decodeURI(te1), code: hashedCode },
//   }
// );

// console.log(resdata);
