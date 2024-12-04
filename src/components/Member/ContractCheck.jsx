import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../api/AuthContext";
import Header from "../Member/MemberHeader";
import GetData from "../../hooks/GetData";

const ContractCheck = () => {
  const { user } = useContext(AuthContext);
  const { data: contract, isLoading, isError } = GetData("/HLF/getAllContract");
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const getRentType = (itemType) => {
    if (itemType === "0") {
      return "전세";
    } else if (itemType === "1") {
      return "월세";
    } else {
      return "알 수 없음";
    }
  };
  
  const getBuilding = (type) => {
    switch (type) {
      case "0":
        return "원/투룸";
      case "1":
        return "오피스텔";
      case "2":
        return "아파트/빌라";
      case "3":
        return "주택";
      case "4":
        return "상가/사무실";
      default:
        return "카테고리";
    }
  };  

  const formatPrice = (value) => {
    if (!value) return "0원";
    const num = Number(value);
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}억 ${
        num % 10000 > 0 ? `${num % 10000}만원` : ""
      }`;
    }
    return `${num}만`;
  };

  const renderPrice = (item) => {
    if (item.itemInfo.itemType === "0") {
      return `${formatPrice(item.itemInfo.priceRental) || "정보 없음"}`;
    } else if (item.itemInfo.itemType === "1") {
      return `${formatPrice(item.itemInfo.priceRental) || "정보 없음"} / ${formatPrice(item.itemInfo.priceMonthly) || "정보 없음"}`;
    } else {
      return "알 수 없음";
    }
  };

  if (isLoading) {
    return <Message>데이터 로딩 중...</Message>;
  }

  if (isError || !contract || !contract.data || !contract.data.result) {
    return <Message>데이터를 불러오는 중 오류가 발생했습니다.</Message>;
  }

  const filteredContracts = contract.data.result.filter(
    (item) => item.itemInfo.status === selectedStatus && item.agentInfo.agentName === user.agentName
  );

  return (
    <>
      {user && <Header showLogout={true} />}
      <Container>
        <FilterBar>
          <FilterButton
            active={selectedStatus === "PENDING"}
            onClick={() => handleStatusChange("PENDING")}
          >
            대기중
          </FilterButton>
          <FilterButton
            active={selectedStatus === "COMMITED"}
            onClick={() => handleStatusChange("COMMITED")}
          >
            완료
          </FilterButton>
          <FilterButton
            active={selectedStatus === "CANCLED"}
            onClick={() => handleStatusChange("CANCLED")}
          >
            취소
          </FilterButton>
        </FilterBar>
        <ContractList>
          {filteredContracts.length === 0 ? (
            <Message>해당 상태의 계약이 없습니다.</Message>
          ) : (
            filteredContracts.map((item, index) => (
              <ContractItem key={index}>
                <p>
                  <span>건물명</span>{" "}
                  {item.itemInfo.buildingName || "정보 없음"}
                </p>
                <p>
                  <span>주소</span>{" "}
                  {item.itemInfo.buildingAddress || "정보 없음"}
                </p>
                <p>
                  <span>종류</span> {getBuilding(item.itemInfo.buildingType)}
                </p>
                <p>
                  <span>계약일</span> {item.tradeDate || "정보 없음"}
                </p>
                <p>
                  <span>계약금</span> {renderPrice(item)}
                </p>
                <p>
                  <span>계약 형태</span> {getRentType(item.itemInfo.itemType)}
                </p>
              </ContractItem>
            ))
          )}
        </ContractList>
      </Container>
    </>
  );
};

export default ContractCheck;

const Container = styled.div`
  padding: 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? "#6e7d9c" : "#ccc")};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#5a6a8c" : "#bbb")};
  }
`;

const ContractList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContractItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  /* background-color: #f9f9f9; */

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  span {
    color: #595959;
    margin-right: 5px;
    width: 4rem;
    display: inline-block;
    text-align: center;
  }
`;

const Message = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #333;
  margin-top: 2rem;
`;
