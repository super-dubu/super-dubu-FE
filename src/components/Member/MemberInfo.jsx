import styled from "styled-components";
import React from "react";

const MemberInfo = ({ item, onBack }) => {
  return (
    <CenteredContainer>
      <InfoContainer>
        <BackButton onClick={onBack}>← 목록으로</BackButton>
        <InfoContent>
          <h2>{item.buildingAddress}</h2>
          <Row>
            <Key>tokenID:</Key> <Value>{item.tokenID}</Value>
          </Row>
          <Row>
            <Key>buildingName:</Key>{" "}
            <Value>{item.buildingName || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>buildingPrice:</Key> <Value>{item.buildingPrice}</Value>
          </Row>
          <Row>
            <Key>confirmDate:</Key> <Value>{item.confirmDate}</Value>
          </Row>
          <Row>
            <Key>floorInfo:</Key> <Value>{item.floorInfo}</Value>
          </Row>
          <Row>
            <Key>hosu:</Key> <Value>{item.hosu || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>owner:</Key> <Value>{item.owner}</Value>
          </Row>
          <Row>
            <Key>roomCount:</Key> <Value>{item.roomCount}</Value>
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
  width: 30rem;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
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
