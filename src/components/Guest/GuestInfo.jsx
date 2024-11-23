import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GuestInfo = ({ item, onClose }) => {
  const navigate = useNavigate();
  const formatPrice = (value) => {
    if (!value) return "0원";
    const num = Number(value);
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}억 ${num % 10000 > 0 ? `${num % 10000}만원` : ""}`;
    }
    return `${num}만원`;
  };

  return (
    <ItemContainer>
      <Header>
        {item.buildingName ? (
          <span>{item.buildingName}</span>
        ) : (
          <span>{item.buildingAddress}</span>
        )}
        <ExitButton onClick={onClose}>✕</ExitButton>
      </Header>
      <ImageContainer>
        <Image src={item.image} alt="Room" />
      </ImageContainer>

      {item.buildingType === "0" ? (
        <InfoSection>
          <Title>전세 {formatPrice(item.priceRental)}</Title>
          <Subtitle>{item.buildingAddress}</Subtitle>
        </InfoSection>
      ) : (
        <InfoSection>
          <Title>
            월세 {formatPrice(item.priceRental)} /{" "}
            {formatPrice(item.priceMonthly)}
          </Title>
          <Subtitle>{item.buildingAddress}</Subtitle>
        </InfoSection>
      )}
      <InfoSection>
        <h3>가격 정보</h3>
        <InfoRow>
          <Label>월세:</Label>
          <Value>{item.priceMonthly}</Value>
        </InfoRow>
        <InfoRow>
          <Label>보증금:</Label>
          <Value>{item.priceRental}</Value>
        </InfoRow>
        <InfoRow>
          <Label>관리비:</Label>
          <Value>매월 {item.manageFee}만원 (수도, 가스 포함)</Value>
        </InfoRow>
      </InfoSection>
      <InfoSection>
        <h3>상세 정보</h3>
        <InfoRow>
          <Label> 동 / 호수 </Label>
          <Value>{item.hosu}</Value>
        </InfoRow>
        <InfoRow>
          <Label>면적:</Label>
          <Value>{Math.round(parseFloat(item.area) * 0.3025) / 100}평</Value>
        </InfoRow>
        <InfoRow>
          <Label>방 수 / 욕실 수:</Label>
          <Value>
            {item.roomCount}개 / {item.bathroom}개
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>입주 가능일:</Label>
          <Value>{item.availableDate}</Value>
        </InfoRow>
      </InfoSection>
      <InfoSection>
        <h3>공인중개인 정보</h3>
        <p>중개 사무소 정보: {item.memberOffice}</p>
        <p>중개인: {item.member}</p>
        <p>중개 등록 번호: {item.memberRegister}</p>
        <p>대표 번호: {item.memberNumber}</p>
      </InfoSection>
      <Footer>
        <Button
          onClick={() => navigate("/book", { replace: false, state: { item } })}
        >
          공인중개사 예약하기
        </Button>
      </Footer>
    </ItemContainer>
  );
};

const ExitButton = styled.div`
  cursor: pointer;
  padding: 0px 3px 0px 3px;
  border-radius: 2px;
  &:hover {
    background-color: #767676;
  }
`;

const ItemContainer = styled.div`
  width: 30%;
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
  gap: 8px;
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
