import React, { memo } from "react";
import styled from "styled-components";
import Kmap from "../api/KakaoMap";
import room from "../../img/room.png";
import office from "../../img/officetel.png";
import apart from "../../img/apartment.png";
import house from "../../img/house.png";
import shop from "../../img/shop.png";

import { useNavigate, useLocation } from "react-router-dom";

const GuestInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items: it } = location.state;

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
          <ItemContainer>
            <Header>
              <span>매물 {it._id}</span>
              <ExitButton onClick={() => navigate("/sell")}>✕</ExitButton>
            </Header>
            <ImageContainer>
              <Image src={it.images[0].url} alt="Room" />
            </ImageContainer>
            <InfoSection>
              <Title>
                월세 {it.price_info.deposit} / {it.price_info.monthly_rent}
              </Title>
              <Subtitle>{it.address}</Subtitle>
            </InfoSection>
            <InfoSection>
              <h3>가격 정보</h3>
              <InfoRow>
                <Label>월세:</Label>
                <Value>{it.price_info.monthly_rent}</Value>
              </InfoRow>
              <InfoRow>
                <Label>보증금:</Label>
                <Value>{it.price_info.deposit}</Value>
              </InfoRow>
              <InfoRow>
                <Label>관리비:</Label>
                <Value>
                  매월 {it.price_info.management_fee}만원 (수도, 가스 포함)
                </Value>
              </InfoRow>
            </InfoSection>
            <InfoSection>
              <h3>상세 정보</h3>
              <InfoRow>
                <Label>방 종류:</Label>
                <Value>{it.details.room_type}</Value>
              </InfoRow>
              <InfoRow>
                <Label>해당 층 / 건물 층:</Label>
                <Value>
                  {it.details.building_floors}층 / {it.details.total_floors}층
                </Value>
              </InfoRow>
              <InfoRow>
                <Label>전용 / 공급면적:</Label>
                <Value>
                  {Math.round(parseFloat(it.details.area.exclusive) * 0.3025)}평
                  / {Math.round(parseFloat(it.details.area.supply) * 0.3025)}평
                </Value>
              </InfoRow>
              <InfoRow>
                <Label>방 수 / 욕실 수:</Label>
                <Value>
                  {it.details.bathrooms}개 / {it.details.rooms}개
                </Value>
              </InfoRow>
              <InfoRow>
                <Label>최초 등록일:</Label>
                <Value>{it.details.listed_date}</Value>
              </InfoRow>
            </InfoSection>
            <InfoSection>
              <h3>공인중개인 정보</h3>
              <p>중개 사무소 정보: 두부공인중개사사무소</p>
              <p>중개인: 오채린</p>
              <p>중개 등록 번호: 123456-789123</p>
              <p>대표 번호: 010-1234-5678</p>
            </InfoSection>
            <Footer>
              <Button
                onClick={() =>
                  navigate("/book", {
                    replace: false,
                    state: { items: it },
                  })
                }
              >
                공인중개사 예약하기
              </Button>
            </Footer>
          </ItemContainer>
          <MapArea>
            <Kmap />
          </MapArea>
        </Content>
      </MainSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ExitButton = styled.div`
  cursor: pointer;
  padding: 0px 3px 0px 3px;
  border-radius: 2px;
  &:hover {
    background-color: #767676;
  }
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
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  width: 92%;
  height: 100%;
`;

const ItemContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #f5f5f5;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const InfoSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 8px; /* 각 항목 간격 */
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin: 8px 0;
  color: #777;
  font-size: 14px;
`;

const Footer = styled.div`
  padding: 16px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const ItemImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  /* object-fit: cover; */
`;

const MapArea = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between; /* 분류와 데이터 값 사이를 간격으로 정렬 */
  align-items: center; /* 수직 정렬 */
  color: #767676; /* 분류 텍스트 색상 */
  padding: 4px 0; /* 위아래 패딩 추가 */
`;

const Label = styled.span`
  font-weight: bold;
  color: #767676; /* 분류 텍스트 색상 */
`;

const Value = styled.span`
  color: #000; /* 데이터 값 텍스트 색상 */
  text-align: left; /* 왼쪽 정렬 */
`;

export default GuestInfo;
