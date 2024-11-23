import React, { useState, useContext } from "react";
import styled from "styled-components";
import Header from "../Member/MemberHeader";
import Kmap from "../api/KakaoMap.jsx";
import getData from "../../hooks/GetData.js";
import { AuthContext } from "../api/AuthContext.jsx";
import MemberInfo from "./MemberInfo.jsx";

function MemberMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 6;
  const { user } = useContext(AuthContext);

  const { data: items, isLoading, isError } = getData("/HLF/getBuildings");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading || !items || !items.data || !items.data.response) {
    return (
      <LoadingContainer>
        <LoadingMessage>
          데이터를 로딩 중입니다. 잠시만 기다려주세요...
        </LoadingMessage>
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </ErrorContainer>
    );
  }

  const filteredItems = items.data.response.filter((item) =>
    item.buildingAddress?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemClick = (it) => {
    setSelectedItem(it);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Header
        userName={user?.member?.agentName || "사용자"}
        showLogout={false}
      />
      <Container>
        {selectedItem ? (
          <MemberInfo item={selectedItem} onBack={handleBackToList} />
        ) : (
          <SideBar>
            <SearchBar>
              <SearchInput
                placeholder="검색 키워드를 입력해주세요"
                value={searchQuery}
                onChange={handleSearch}
              />
            </SearchBar>
            <ItemContainer>
              {totalItems === 0 ? (
                <NoItemsMessage>해당 매물이 없습니다.</NoItemsMessage>
              ) : (
                currentItems.map((it, index) => (
                  <Item key={index} onClick={() => handleItemClick(it)}>
                    <p>{it.buildingAddress || "주소 없음"}</p>
                  </Item>
                ))
              )}
            </ItemContainer>
            {totalItems > 0 && (
              <Pagination>
                <PageButton
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(-1)}
                >
                  ← 이전
                </PageButton>
                <PageNumber>
                  {currentPage} / {totalPages}
                </PageNumber>
                <PageButton
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(1)}
                >
                  다음 →
                </PageButton>
              </Pagination>
            )}
          </SideBar>
        )}
        <Kmap
          items={selectedItem ? [selectedItem] : currentItems}
          onMarkerClick={(item) => setSelectedItem(item)}
        />
      </Container>
    </div>
  );
}

export default MemberMain;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d9534f;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

const SideBar = styled.div`
  border-style: solid;
  border-width: 0 1.2px 0 0;
  border-color: #9b9b9b;
  width: 35rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  border-bottom: 1.2px solid #9b9b9b;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 2.8rem;
  border-radius: 30px;
  border: 1px solid #9b9b9b;
  outline: none;
  padding: 0 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SearchOption = styled.div`
  display: flex;
  margin: 1rem 1.5rem 0 auto;
  gap: 2rem;
`;

const Options = styled.div`
  font-weight: 700;
  color: #545454;
`;

const ItemContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-height: 35rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  scrollbar-width: thin;
  scrollbar-color: #b2b0b0 #f0f0f0;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b2b0b0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
`;

const NoItemsMessage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #545454;
  text-align: center;
  margin-top: 2rem;
`;

const Item = styled.div`
  width: 90%;
  height: 5rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  padding: 0.71rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  border: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#6e7d9c")};
  color: ${(props) => (props.disabled ? "#888" : "#fff")};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#5a6a8c")};
  }
`;

const PageNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #545454;
`;
