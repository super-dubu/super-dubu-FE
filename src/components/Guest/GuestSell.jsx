import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Kmap from "../api/KakaoMap";
import room from "../../img/room.png";
import office from "../../img/officetel.png";
import apart from "../../img/apartment.png";
import house from "../../img/house.png";
import shop from "../../img/shop.png";

import GetData from "../../hooks/GetData";
import { useNavigate, useLocation } from "react-router-dom";

const GuestSell = () => {
  const { data: item, isLoading, isError } = GetData("/forsale/view");
  const [filteredItems, setFilteredItems] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    if (category && item && item.data) {
      handleFilterClick(category);
    }
  }, [category, item]);

  const handleFilterClick = (category) => {
    if (!item || !item.data) return;

    let filtered;
    if (category === "원/투룸") {
      filtered = item.data.filter(
        (it) => it.details.room_type === "원룸" || it.details.room_type === "투룸"
      );
    } else {
      filtered = item.data.filter((it) => it.details.room_type === category);
    }
    setFilteredItems(filtered.length > 0 ? filtered : []);
  };

  if (isLoading) return <h1>로딩중입니다</h1>;
  if (isError) return <h1>에러에요 비상비상</h1>;
  if (!item || !item.data) return <h1>데이터가 없습니다</h1>;

  const itemsToDisplay = filteredItems === null ? item.data : filteredItems;

  return (
    <Container>
      <FilterBar>
        <FilterButton>월세</FilterButton>
        <FilterButton>주차가능</FilterButton>
        <FilterButton>반려동물</FilterButton>
        <FilterButton>추가 필터</FilterButton>
      </FilterBar>
      <MainSection>
        <Sidebar>
          <ItemImg src={room} onClick={() => handleFilterClick("원/투룸")} />
          <Category>원/투룸</Category>
          <ItemImg src={office} onClick={() => handleFilterClick("오피스텔")} />
          <Category>오피스텔</Category>
          <ItemImg src={apart} onClick={() => handleFilterClick("아파트")} />
          <Category>아파트</Category>
          <ItemImg src={house} onClick={() => handleFilterClick("주택/빌라")} />
          <Category>주택/빌라</Category>
          <ItemImg src={shop} onClick={() => handleFilterClick("상가/사무실")} />
          <Category>상가/사무실</Category>
        </Sidebar>
        <Content>
          {itemsToDisplay.length > 0 ? (
            <ItemList>
              {itemsToDisplay.map((it) => (
                <Item
                  key={it._id}
                  onClick={() =>
                    navigate(`/sell/:${it._id}`, {
                      replace: false,
                      state: { items: it },
                    })
                  }
                >
                  <ItemImg src="https://via.placeholder.com/150" alt="item" />
                  <ItemDetails>
                    <ItemInfo>
                      {it.price_info.deposit} / {it.price_info.monthly_rent}{" "}
                      {it.details.room_type}
                    </ItemInfo>
                    <ItemLocation>{it.address}</ItemLocation>
                  </ItemDetails>
                </Item>
              ))}
            </ItemList>
          ) : (
            <NoItemsMessage>해당하는 매물이 없습니다</NoItemsMessage>
          )}
          <MapArea>
            <Kmap addresses={item.data?.map((it) => it.address)} />
          </MapArea>
        </Content>
      </MainSection>
    </Container>
  );
};

export default GuestSell;

const SearchBar = styled.div`
  position: relative;
  padding: 1rem;
  width: 60%;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const NoItemsMessage = styled.div`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  width: 45%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  background-color: #f1f1f1;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`;

const MainSection = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const Sidebar = styled.div`
  width: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  padding: 1rem;
`;

const Category = styled.div`
  margin-bottom: 3px;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  width: 92%;
  height: 100%;
`;

const ItemList = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 84%;
  overflow-y: auto;
  padding: 1rem;
`;

const Item = styled.div`
  display: flex;
  background-color: #fff;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 1rem;
`;

const ItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  margin-left: 20px;
`;

const ItemInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ItemLocation = styled.div`
  font-size: 14px;
  color: #777;
`;

const MapArea = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
