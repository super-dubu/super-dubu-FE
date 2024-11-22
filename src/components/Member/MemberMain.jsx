import React, { useState, useContext } from "react";
import styled from "styled-components";
import Header from "../Member/MemberHeader";
import Kmap from "../api/KakaoMap.jsx";
import getData from "../../hooks/GetData.js";
import { AuthContext } from "../api/AuthContext.jsx";

function MemberMain() {
  const [activeButton, setActiveButton] = useState("전체 매물");
  const { user } = useContext(AuthContext);

  const { data: items, isLoading, isError } = getData("/HLF/getBuildings");

  // 로딩 중일 때 화면 표시
  if (isLoading || !items || !items.data || !items.data.result) {
    return (
      <LoadingContainer>
        <LoadingMessage>
          데이터를 로딩 중입니다. 잠시만 기다려주세요...
        </LoadingMessage>
      </LoadingContainer>
    );
  }

  // 에러 발생 시 화면 표시
  if (isError) {
    return (
      <ErrorContainer>
        <ErrorMessage>데이터를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </ErrorContainer>
    );
  }

  // 데이터가 준비된 후에만 화면 렌더링
  return (
    <div>
      <Header
        userName={user?.member?.agentName || "사용자"}
        showLogout={false}
      />
      <Container>
        <SideBar>
          <MenuBar>
            {["전체 매물", "예약 대기", "거래 진행중"].map((label) => (
              <MenuButton
                key={label}
                isActive={activeButton === label}
                onClick={() => setActiveButton(label)}
              >
                {label}
              </MenuButton>
            ))}
          </MenuBar>
          <SearchBar>
            <SearchInput placeholder="검색 키워드를 입력해주세요" />
            <SearchOption>
              {["인기순", "가격순", "최신순"].map((option) => (
                <Options key={option}>{option}</Options>
              ))}
            </SearchOption>
          </SearchBar>
          <ItemContainer>
            {items.data.result.map((it, index) => (
              <Item key={index}>
                <p>{it.buildingAddress || "주소 없음"}</p>
                <p>가격: {it.buildingPrice || "정보 없음"}</p>
                <p>소유주: {it.owner || "정보 없음"}</p>
              </Item>
            ))}
          </ItemContainer>
        </SideBar>
        <Kmap />
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

const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-width: 0 0 1.2px 0;
  border-color: #9b9b9b;
  width: 100%;
  height: 5rem;
`;

const MenuButton = styled.div.attrs((props) => ({
  isActive: props.isActive, // 스타일에서만 사용할 prop으로 정의
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 33.3%;
  font-weight: 700;
  border-right: 1.2px solid #9b9b9b;
  color: ${(props) => (props.isActive ? "white" : "#545454")};
  background-color: ${(props) => (props.isActive ? "#B2B0B0" : "white")};
  cursor: pointer;

  &:last-child {
    border-right: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 7rem;
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
`;

const SearchOption = styled.div`
  display: flex;
  /* margin-top: 1rem; */
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
  max-height: 40rem; /* 4개의 아이템 높이에 맞게 설정 */
  overflow-y: auto; /* 스크롤 활성화 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 스크롤바 스타일 */
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

const Item = styled.div`
  width: 90%;
  height: 10rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Loading = styled.div`
  font-size: 1.2rem;
  color: gray;
  margin: 1rem 0;
  text-align: center;
`;

const EndMessage = styled.div`
  font-size: 1.2rem;
  color: #888;
  margin: 1rem 0;
  text-align: center;
`;
