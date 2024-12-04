import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPayment } from "../Toss/confirmPayments";
import axios from "axios";
import styled from "styled-components";

const TransSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [jsonData, setJsonData] = useState({});

  const requestData = {
    orderId: query.get("orderId"),
    amount: query.get("amount"),
    paymentKey: query.get("paymentKey"),
  };

  const uploadData = async () => {
    try {
      const postData = JSON.parse(JSON.stringify(jsonData));
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/HLF/bank`,
        postData
      );
      alert("결제가 승인되었습니다.");
      
      window.location.href = '/member/mypage';
    } catch (e) {
      console.error("Error:", e);
    }
  };

  useEffect(() => {
    const confirm = async () => {
      try {
        const { response, json } = await confirmPayment(requestData);
        const updatedJson = { ...json, TokenID: "1159010100102840001" };
        setJsonData(updatedJson);
      } catch (e) {
        console.error("Error during confirmation: ", e);
      }
    };

    confirm();
  }, []);

  return (
    <Background>
      <Container>
        <Checkmark>✔</Checkmark>
        <Title>결제를 완료했어요</Title>
        <Details>
          <DetailItem>
            <Label>결제 키:</Label>
            <Value>{query.get("paymentKey")}</Value>
          </DetailItem>
          <DetailItem>
            <Label>주문 ID:</Label>
            <Value>{query.get("orderId")}</Value>
          </DetailItem>
          <DetailItem>
            <Label>결제 금액:</Label>
            <Value>₩{query.get("amount")}</Value>
          </DetailItem>
        </Details>
        <Button onClick={uploadData}>승인</Button>
      </Container>
    </Background>
  );
};

export default TransSuccess;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  text-align: center;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Checkmark = styled.div`
  font-size: 4rem;
  color: #4285f4;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #2f3131;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Details = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4285f4;
  }
`;
