import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Kmap from "../api/KakaoMap";
import room from "../../img/room.png";
import office from "../../img/officetel.png";
import apart from "../../img/apartment.png";
import house from "../../img/house.png";
import shop from "../../img/shop.png";

import GetData from "../../hooks/GetData";
import { useLocation } from "react-router-dom";
import GuestInfo from "./GuestInfo";

const getCategoryImage = (category) => {
  switch (category) {
    case "0":
      return room;
    case "1":
      return office;
    case "2":
      return apart;
    case "3":
      return house;
    case "4":
      return shop;
    default:
      return room;
  }
};

const getCategoryName = (category) => {
  switch (category) {
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

const GuestSell = () => {
  const { data: item, isLoading, isError } = GetData("/forsale/view");
  const [filteredItems, setFilteredItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    category: null,
    itemType: null,
    parking: null,
    manageFee: null,
  });
  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    if (category && item && item.data) {
      setFilters((prev) => ({
        ...prev,
        category,
      }));
    }
  }, [category, item]);

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const handleCategoryClick = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? null : cat,
    }));
    setSelectedItem(null);
  };

  useEffect(() => {
    if (!item?.data?.properties) return;

    let result = item.data.properties;

    if (filters.category !== null) {
      result = result.filter((it) => it.buildingType === filters.category);
    }
    if (filters.itemType !== null) {
      result = result.filter((it) => it.itemType === filters.itemType);
    }
    if (filters.parking !== null) {
      result = result.filter((it) => Number(it.parking) > 0);
    }
    if (filters.manageFee !== null) {
      result = result.filter((it) => Number(it.manageFee) > 0);
    }

    setFilteredItems(result);
  }, [filters, item]);

  const handleItemClick = (it) => {
    setSelectedItem(it);
  };

  if (isLoading) return <h1>로딩중입니다</h1>;
  if (isError) return <h1>에러에요 비상비상</h1>;

  const itemsToDisplay =
    filteredItems === null ? item?.data?.properties || [] : filteredItems;

  const formatPrice = (value) => {
    if (!value) return "0원";
    const num = Number(value);
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}억 ${
        num % 10000 > 0 ? `${num % 10000}만원` : ""
      }`;
    }
    return `${num}만원`;
  };

  return (
    <Container>
      <FilterBar>
        <FilterButton
          isActive={filters.itemType === "1"}
          onClick={() => toggleFilter("itemType", "1")}
        >
          월세
        </FilterButton>
        <FilterButton
          isActive={filters.parking !== null}
          onClick={() => toggleFilter("parking", true)}
        >
          주차 가능
        </FilterButton>
        <FilterButton
          isActive={filters.manageFee !== null}
          onClick={() => toggleFilter("manageFee", true)}
        >
          관리비
        </FilterButton>
      </FilterBar>
      <MainSection>
        <Sidebar>
          {["0", "1", "2", "3", "4"].map((cat) => (
            <CategoryContainer
              key={cat}
              isSelected={filters.category === cat}
              onClick={() => handleCategoryClick(cat)}
            >
              <ItemImg src={getCategoryImage(cat)} />
              <Category>{getCategoryName(cat)}</Category>
            </CategoryContainer>
          ))}
        </Sidebar>
        <Content>
          {selectedItem ? (
            <>
              <GuestInfo
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
              <MapArea>
                <Kmap
                  items={[selectedItem]}
                  onMarkerClick={(item) => setSelectedItem(item)}
                />
              </MapArea>
            </>
          ) : (
            <>
              {itemsToDisplay.length > 0 ? (
                <ItemList>
                  {itemsToDisplay.map((it) => (
                    <Item key={it.tokenID} onClick={() => handleItemClick(it)}>
                      <ItemImg src={it.image} alt="item" />
                      {it.itemType === "0" ? (
                        <ItemDetails>
                          <ItemInfo>
                            전세 {formatPrice(it.priceRental)}
                          </ItemInfo>
                          <ItemLocation>{it.buildingAddress}</ItemLocation>
                        </ItemDetails>
                      ) : (
                        <ItemDetails>
                          <ItemInfo>
                            월세 {formatPrice(it.priceRental)} /{" "}
                            {formatPrice(it.priceMonthly)}
                          </ItemInfo>
                          <ItemLocation>{it.buildingAddress}</ItemLocation>
                        </ItemDetails>
                      )}
                    </Item>
                  ))}
                </ItemList>
              ) : (
                <NoItemsMessage>해당하는 매물이 없습니다</NoItemsMessage>
              )}
              <MapArea>
                <Kmap
                  items={itemsToDisplay}
                  onMarkerClick={(item) => setSelectedItem(item)}
                />
              </MapArea>
            </>
          )}
        </Content>
      </MainSection>
    </Container>
  );
};

export default GuestSell;

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
  background-color: ${(props) => (props.isActive ? "#6e7d9c" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#5a6a8c" : "#eaeaea")};
  }
`;

const MainSection = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const Sidebar = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: #9b9b9b;
  padding: 1rem;
  height: 100vh;
  gap: 1rem;
  text-align: center;
`;

const CategoryContainer = styled.div`
  width: 90px;
  height: 100px;
  padding: 5px;
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid blue;
      border-color: #6c76a8;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      border-radius: 30px;
      color: #6c76a8;
      font-weight: bold;
    `}
`;

const Category = styled.div`
  margin-bottom: 3px;
  margin-top: 3px;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
`;

const ItemList = styled.div`
  width: 35%;
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
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  margin-left: 20px;
`;

const ItemInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemLocation = styled.div`
  font-size: 14px;
  color: #777;
`;

const NoItemsMessage = styled.div`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  width: 30%;
`;

const MapArea = styled.div`
  width: 90%;
  height: 105%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
