import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Header from "../Member/MemberHeader";
import Kmap from "../api/KakaoMap.jsx";
import { AuthContext } from "../api/AuthContext";
import GetData from "../../hooks/GetData";
import { axiosInstance } from "../api/axios-instance.js"

function MemberMain() {
  const [activeButton, setActiveButton] = useState("전체 매물");
  const { user } = useContext(AuthContext);

  // 초기 데이터 로드
  const { data: initialData, isLoading, isError } = GetData(`/HLF/getBuildings?page=1`);
  const [items, setItems] = useState([]); // 전체 데이터
  const [page, setPage] = useState(2); // 다음 페이지 번호
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 추가 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부

  console.log(initialData);
  // 초기 데이터 설정
  useEffect(() => {
    if (initialData?.data) {
      setItems(initialData.data);
    }
  }, [initialData]);

  // 추가 데이터 로드 함수
  const loadMoreItems = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const response = await axiosInstance.get(`/HLF/getBuildings?page=${page}`);
      const newItems = response.data;

      if (newItems.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없음을 설정
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      }
    } catch (error) {
      console.error("추가 데이터 로드 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore) {
      loadMoreItems(); // 스크롤이 끝에 도달하면 추가 데이터 로드
    }
  };

  return (
    <div> 
      {user ? <Header userName={user?.member?.agentName || "사용자"} showLogout={false} />:""}
      <Container>
        <SideBar onScroll={handleScroll}>
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
          <ItemContainer onScroll={handleScroll}>
            {items.map((data, index) => (
              <Item key={index}>
                <p>{data.buildingAddress || "주소 없음"}</p>
                <p>가격: {data.buildingPrice || "정보 없음"}</p>
                <p>소유주: {data.owner || "정보 없음"}</p>
              </Item>
            ))}
            {isLoadingMore && <Loading>로딩 중...</Loading>}
            {!hasMore && <EndMessage>더 이상 불러올 데이터가 없습니다.</EndMessage>}
          </ItemContainer>
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