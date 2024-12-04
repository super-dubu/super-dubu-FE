import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../img/logo.png";
import cryptoJs from "crypto-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PropAuth = () => {
  const ENC_KEY = import.meta.env.VITE_ENC_KEY;
  const [part1, setPart1] = useState(""); // 주민번호 앞 6자리
  const [part2, setPart2] = useState(""); // 주민번호 뒤 7자리
  const [isAuthComplete, setIsAuthComplete] = useState(false); // 인증 여부
  const [name, setName] = useState(""); // 이름
  const { hashcode } = useParams();

  // 주민등록번호 합치기
  const fullNationalID = `${part1}-${part2}`;

  // 입력값 처리
  const handleInput = (value, setter, maxLength) => {
    const filteredValue = value.replace(/\D/g, ""); // 숫자만 허용
    if (filteredValue.length <= maxLength) {
      setter(filteredValue);
    }
  };
  
  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "확인",
    });
  };

  // 인증 처리 함수
  const handleAuth = async () => {
    if (!name || part1.length !== 6 || part2.length !== 7) {
      showAlert("입력 오류", "이름과 주민등록번호를 올바르게 입력해주세요.", "error");
      return;
    }

    try {
      const hashedCode = cryptoJs
        .SHA256(name + fullNationalID + ENC_KEY)
        .toString();
      const response1 = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/HLF/auth`,
        {
          params: { name: decodeURI(name), code: hashedCode, qrID: hashcode },
        }
      );
      const response2 = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/HLF/auth`,
        {
          params: { name: decodeURI(name), code: hashedCode, qrID: hashcode },
        }
      );

      if (
        response1.data &&
        response1.data.message === "Success" &&
        response2.data &&
        response2.data.message === "Success"
      ) {
        showAlert("인증 성공", "신원 인증이 완료되었습니다.", "success");
        setIsAuthComplete(true);
      } else {
        showAlert("인증 실패", "신원 인증에 실패했습니다. 다시 시도해주세요.", "error");
      }
    } catch (error) {
      showAlert(
        "서버 오류",
        "서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
    }
  };

  return (
    <div>
      <Container>
        <Header>
          <Logo src={logo} />
        </Header>
        <InputContainer>
          <Row>
            <Label>이름</Label>
            <Input
              $large
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
            />
          </Row>
          <Row>
            <Label>주민등록번호</Label>
            <Input
              value={part1}
              onChange={(e) => handleInput(e.target.value, setPart1, 6)}
              placeholder="앞 6자리"
            />
            -
            <Input
              value={part2}
              type="password"
              onChange={(e) => handleInput(e.target.value, setPart2, 7)}
              placeholder="뒤 7자리"
            />
          </Row>
        </InputContainer>
        <Button onClick={handleAuth} disabled={isAuthComplete}>
          {isAuthComplete ? "인증완료" : "인증하기"}
        </Button>
      </Container>
    </div>
  );
};

export default PropAuth;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  border-style: solid;
  border-color: #9b9b9b;
  border-width: 0 0 1px 0;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 6rem;
  height: auto;
  margin-left: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 3rem;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Label = styled.div`
  width: 6rem;
  font-size: 16px;
  font-weight: bold;
  padding: 1rem;
  color: #595959;
  text-align: center;
`;

const Input = styled.input`
  ::placeholder {
    color: #ccc;
  }
  width: ${(props) => (props.$large ? "12rem" : "4.5rem")};
  height: 2rem;
  font-size: 1rem;
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  height: 3rem;
  width: 60%;
  background-color: #6e7d9c;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 18px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
