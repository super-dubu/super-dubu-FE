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

  if (isLoading) {
    return <Message>데이터 로딩 중...</Message>;
  }

  if (isError || !contract || !contract.data || !contract.data.result) {
    return <Message>데이터를 불러오는 중 오류가 발생했습니다.</Message>;
  }

  const filteredContracts = contract.data.result.filter(
    (item) => item.itemInfo.status === selectedStatus
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
                <p>건물명: {item.itemInfo.buildingName}</p>
                <p>주소: {item.itemInfo.buildingAddress}</p>
                <p>상태: {item.itemInfo.status}</p>
                <p>계약자: {item.lesseeName}</p>
                <p>계약 시작일: {item.startDate}</p>
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
  }
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #333;
`;
