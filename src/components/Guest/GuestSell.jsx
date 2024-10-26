import styled from "styled-components";
import Kmap from "../api/KakaoMap";

import room from "../../img/room.png";
import office from "../../img/officetel.png";
import apart from "../../img/apartment.png";
import house from "../../img/house.png";
import shop from "../../img/shop.png";

const GuestSell = () => {
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
          <ItemImg src={room} />
          <Category>원/투룸</Category>
          <ItemImg src={office} />
          <Category>오피스텔</Category>
          <ItemImg src={apart} />
          <Category>아파트</Category>
          <ItemImg src={house} />
          <Category>주택/빌라</Category>
          <ItemImg src={shop} />
          <Category>상가/사무실</Category>
        </Sidebar>
        <Content>
          <ItemList>
            <Item>
              <ItemImg src="https://via.placeholder.com/150" alt="item" />
              <ItemDetails>
                <ItemInfo>월세 2000/60 원룸</ItemInfo>
                <ItemLocation>서울대입구역 근처</ItemLocation>
              </ItemDetails>
            </Item>
            <Item>
              <ItemImg src="https://via.placeholder.com/150" alt="item" />
              <ItemDetails>
                <ItemInfo>전세 1억 5천 오피스텔</ItemInfo>
                <ItemLocation>숭실대입구역 근처</ItemLocation>
              </ItemDetails>
            </Item>
            <Item>
              <ItemImg src="https://via.placeholder.com/150" alt="item" />
              <ItemDetails>
                <ItemInfo>월세 2000/60 원룸</ItemInfo>
                <ItemLocation>서울대입구역 근처</ItemLocation>
              </ItemDetails>
            </Item>
            <Item>
              <ItemImg src="https://via.placeholder.com/150" alt="item" />
              <ItemDetails>
                <ItemInfo>월세 2000/60 원룸</ItemInfo>
                <ItemLocation>서울대입구역 근처</ItemLocation>
              </ItemDetails>
            </Item>
          </ItemList>
          <MapArea>
            <Kmap />
          </MapArea>
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
  height: 100%;
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
  height: 100%;
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
  border-radius: 5px;
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
