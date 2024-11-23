import React, { useContext } from "react";
import Header from "../MemberHeader";
import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../api/ContractContext";

function Contract6() {
  const { user } = useContext(AuthContext);
  console.log("Original user", user);
  const userData = user ? user : { user: "" };
  console.log("Processed userData:", userData);
  const navigate = useNavigate();
  const { itemLog, setItemLog } = useContext(ContractContext);

  console.log("Contract6", itemLog);

  const handleComplete = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/HLF/contract`,
        itemLog
      );
      console.log(response.data);
      alert("계약이 완료되었습니다.");
      navigate("/sandbox", { state: { it: itemLog } });
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("예약 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Title>상호 계약 확인 인증</Title>
        <Plz>*휴대폰으로 QR 코드를 스캔하여 인증한 후 계약을 완료하세요.</Plz>
        <QRBox>
          <QRCodeCanvas value={`${import.meta.env.VITE_FRONT_URL}/mobileauth`} size={300} />
        </QRBox>
        <Title>주요 계약 사항 확인</Title>
        <AgentBox>
          <Column>
            <Row>매물 번호 : {itemLog.itemInfo._id}</Row>
            <Row>
              주소 :{" "}
              {`${itemLog.itemInfo.buildingAddress} ${itemLog.itemInfo.hosu}`}{" "}
            </Row>
            <Row>
              계약 종류 :{" "}
              {itemLog?.itemInfo?.itemType === "0"
                ? "월세"
                : itemLog?.itemInfo?.itemType === "1"
                  ? "전세"
                  : "정보 없음"}{" "}
            </Row>
            <Row>특약 : {itemLog.itemInfo.body}</Row>
          </Column>
          <Column>
            <Row>보증금 : {itemLog.itemInfo.priceRental}</Row>
            <Row>월세 : {itemLog.itemInfo.priceMonthly}</Row>
            <Row>관리비 : {itemLog.itemInfo.manageFee}</Row>
            <Row>중개업자명 : {userData.agentName}</Row>
          </Column>
        </AgentBox>
        <Button onClick={handleComplete}>계약 완료하기</Button>
      </Container>
    </div>
  );
}

export default Contract6;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 2rem;
`;

const Plz = styled.p`
  color: #c75f5f;
`;

const QRBox = styled.div`
  width: 80%;
  height: 25rem;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AgentBox = styled.div`
  width: 80%;
  height: 15rem;
  border: solid 1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  margin-top: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;

const Row = styled.div`
  font-weight: bold;
`;

const Button = styled.button`
  width: 40%;
  height: 4rem;
  margin: 3rem;
  border-radius: 15px;
  border-style: none;
  background-color: #6e7d9c;
  font-size: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
