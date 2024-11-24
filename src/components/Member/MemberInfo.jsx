import styled from "styled-components";
import React from "react";

const MemberInfo = ({ item, onBack }) => {
  return (
    <CenteredContainer>
      <InfoContainer>
        <BackButton onClick={onBack}>← 목록으로</BackButton>
        <InfoContent>
          <Address>{item.buildingAddress}</Address>
          <Row>
            <Key>PNU Code</Key> <Value>{item.tokenID}</Value>
          </Row>
          <Row>
            <Key>건물 이름</Key>{" "}
            <Value>{item.buildingName || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>상세 주소</Key> <Value>{item.hosu || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>공시지가</Key> <Value>{item.buildingPrice}</Value>
          </Row>
          <Row>
            <Key>승인일자</Key> <Value>{item.confirmDate}</Value>
          </Row>
          <Row>
            <Key>면적</Key> <Value>{`${(item.area / 100)} ㎡`}</Value>
          </Row>
          <Row>
            <Key>층수</Key> <Value>{item.floorInfo}</Value>
          </Row>
          <Row>
            <Key>소유주</Key> <Value>{item.owner}</Value>
          </Row>
          <Row>
            <Key>방 개수</Key> <Value>{item.roomCount}</Value>
          </Row>
        </InfoContent>
      </InfoContainer>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 90%;
  background-color: #f7f9fc;
`;

const InfoContainer = styled.div`
  width: 35%;
  height: 100%;
  padding: 2rem;
  background-color: white;
  /* border-radius: 15px; */
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const Address = styled.div`
  text-align: center;
  margin: 2rem;
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background-color: #6e7d9c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #5a6a8c;
  }
`;

const InfoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  gap: 1rem;
`;

const Key = styled.span`
  font-weight: bold;
  color: #333;
  flex-basis: 40%;
  text-align: right;
  margin-right: 0.5rem;
`;

const Value = styled.span`
  flex-basis: 60%;
  color: #555;
`;

export default MemberInfo;
