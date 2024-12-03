import React, { useContext, useEffect, useState } from "react";
import Header from "../MemberHeader";
import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";
import { AuthContext } from "../../api/AuthContext";
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../api/ContractContext";
import axios from "axios";
import cryptoJs from "crypto-js";

function Contract6() {
  const { user } = useContext(AuthContext);
  const userData = user ? user : { user: "" };
  const navigate = useNavigate();
  const { itemLog, setItemLog } = useContext(ContractContext);
  const [isVerified, setIsVerified] = useState(false);

  const generatedHash = cryptoJs
    .SHA256(itemLog.itemInfo.itemID + Date.now())
    .toString()
    .slice(2, 12);

    // console.log(generatedHash);

  useEffect(() => {
    // 폴링으로 인증 상태 확인
    console.log(generatedHash);
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/hlf/verifyauth`,
          {
            params: {
              qrID: generatedHash,
            },
          }
        );
        if (response?.status === 200) {
          setIsVerified(true);
          clearInterval(interval); // 폴링 중지
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
      }
    }, 3000); // 3초마다 확인

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 폴링 중지
  }, [itemLog]);

  const handleComplete = async () => {
    console.log("itemLog", itemLog);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/HLF/contract`,
        itemLog
      );
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
          {isVerified ? (
            <div>인증이 확인되었습니다</div>
          ) : (
            <QRCodeCanvas
              value={`${import.meta.env.VITE_FRONT_URL}/auth/${generatedHash}`}
              size={300}
            />
          )}
        </QRBox>
        <Title>주요 계약 사항 확인</Title>
        <AgentBox>
          <Column>
            <Row>
              <span>매물 번호</span>
              {itemLog.itemInfo.itemID}
            </Row>
            <Row>
              <span>주소</span>{" "}
              <Address>
                {`${itemLog.itemInfo.buildingAddress} ${itemLog.itemInfo.hosu}`}{" "}
              </Address>
            </Row>
            <Row>
              <span>계약 종류</span>{" "}
              {itemLog?.itemInfo?.itemType === "1"
                ? "월세"
                : itemLog?.itemInfo?.itemType === "0"
                  ? "전세"
                  : "정보 없음"}{" "}
            </Row>
            {/* <Row><span>특약</span>  {itemLog.itemInfo.body}</Row> */}
          </Column>
          <Column>
            <Row>
              <span>보증금</span> {itemLog.itemInfo.priceRental}
            </Row>
            <Row>
              <span>월세</span>{" "}
              {itemLog.itemInfo.priceMonthly
                ? itemLog.itemInfo.priceMonthly
                : "해당 없음"}
            </Row>
            <Row>
              <span>관리비</span> {itemLog.itemInfo.manageFee}
            </Row>
            <Row>
              <span>중개업자명</span> {userData.agentName}
            </Row>
          </Column>
        </AgentBox>
        <Button onClick={handleComplete} disabled={!isVerified}>
          계약 완료하기
        </Button>
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
  min-height: 15rem;
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
  width: 50%;
  padding-left: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;

const Row = styled.div`
  /* font-weight: bold; */

  span {
    color: #9b9b9b;
    display: inline-block;
    width: 5rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 40%;
  height: 4rem;
  margin: 3rem;
  border-radius: 15px;
  border-style: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#6E7D9C")};
  font-size: 20px;
  color: ${(props) => (props.disabled ? "#666" : "white")};
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const Address = styled.div`
  margin-top: 8px;
`;
