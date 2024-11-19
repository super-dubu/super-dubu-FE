import React, { useState, useContext } from "react";
import Header from "../Member/MemberHeader";
import Kmap from "../api/KakaoMap.jsx";
import styled from "styled-components";
import { AuthContext } from "../api/AuthContext";
import GetData from "../../hooks/GetData"

function MemberMain() {
  const [activeButton, setActiveButton] = useState("전체 매물"); // 기본 선택된 버튼
  const { user } = useContext(AuthContext);

  const { data: item, isLoading, isError } = GetData("/HLF/getBuildings");

  console.log(user)
  console.log(item)

  return (
    <div>
      <Header userName={user.member.agentName} showLogout={false} />
      <Container>
        <SideBar>
          <MenuBar>
            <MenuButton
              isActive={activeButton === "전체 매물"}
              onClick={() => setActiveButton("전체 매물")}
            >
              전체 매물
            </MenuButton>
            <MenuButton
              isActive={activeButton === "예약 대기"}
              onClick={() => setActiveButton("예약 대기")}
            >
              예약 대기
            </MenuButton>
            <MenuButton
              isActive={activeButton === "거래 진행중"}
              onClick={() => setActiveButton("거래 진행중")}
            >
              거래 진행중
            </MenuButton>
          </MenuBar>
          <SearchBar>
            <SearchInput placeholder="검색 키워드를 입력해주세요" />
            <SearchOption>
              <Options>인기순</Options>
              <Options>가격순</Options>
              <Options>최신순</Options>
            </SearchOption>
          </SearchBar>
        </SideBar>
        <Kmap />
      </Container>
    </div>
  );
}

export default MemberMain;

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
