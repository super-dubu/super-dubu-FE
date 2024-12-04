import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GuestInfo = ({ item, onClose }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % item.image.length); 
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item.image.length - 1 : prevIndex - 1 
    );
  };

  const formatPrice = (value) => {
    if (!value) return "0원";
    const num = Number(value);
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}억 ${num % 10000 > 0 ? `${num % 10000}만원` : ""}`;
    }
    return `${num}만원`;
  };

  return (
    <>
    <ItemContainer >
      <Header>
        {item.buildingName ? (
          <span>{item.buildingName}</span>
        ) : (
          <span>{item.buildingAddress}</span>
        )}
        <ExitButton onClick={onClose}>✕</ExitButton>
      </Header>
      <ImageContainer>
        <NavButton onClick={handlePrev} position="left">{"<"}</NavButton>
        <Image
          src={`${import.meta.env.VITE_IMAGE_URL}/${item.image[currentIndex].split('uploads')[1].substring(1)}`}
          alt="Room"
          onClick={() => setIsModalOpen(true)}
        />
        <NavButton onClick={handleNext} position="right">{">"}</NavButton>
        <ImageCounter>
          {currentIndex + 1} / {item.image.length}
        </ImageCounter>
      </ImageContainer>

      {item.itemType == "0" ? (
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
          <Label>월세</Label>
          <span>{item.priceMonthly}</span>
        </InfoRow>
        <InfoRow>
          <Label>보증금</Label>
          <Value>{item.priceRental}</Value>
        </InfoRow>
        <InfoRow>
          <Label>관리비</Label>
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
          <Label>면적</Label>
          <Value>{Math.round(parseFloat(item.area) * 0.3025) / 100}평</Value>
        </InfoRow>
        <InfoRow>
          <Label>방 수 / 욕실 수</Label>
          <Value>
            {item.roomCount}개 / {item.bathroom}개
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>입주 가능일</Label>
          <Value>{item.availableDate}</Value>
        </InfoRow>
      </InfoSection>
      <InfoSection>
        <h3>공인중개인 정보</h3>
        <p>
          <span>중개 사무소 정보</span> {item.memberOffice}
        </p>
        <p>
          <span>중개인</span> {item.member}
        </p>
        <p>
          <span>중개 등록 번호</span> {item.memberRegister}
        </p>
        <p>
          <span>대표 번호</span> {item.memberNumber}
        </p>
      </InfoSection>
      <Footer>
        <Button
          onClick={() => navigate("/book", { replace: false, state: { item } })}
        >
          공인중개사 예약하기
        </Button>
      </Footer>
    </ItemContainer>
    {isModalOpen && (
  <Modal>
    <ModalContent>
      <NavButton onClick={handlePrev} position="left">{"<"}</NavButton>
      <ModalImage
        src={`${import.meta.env.VITE_IMAGE_URL}/${item.image[currentIndex].split(
          "uploads"
        )[1].substring(1)}`}
        alt="Room"
      />
      <ImageCounter>
        {currentIndex + 1} / {item.image.length}
      </ImageCounter>
      <NavButton onClick={handleNext} position="right">{">"}</NavButton>
      <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
    </ModalContent>
  </Modal>
)}

    </>
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: #f5f5f5;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 10px;" : "right: 10px;")}
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 10px;
`;

const InfoSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #121212;

  span {
    font-weight: bold;
    margin-right: 5px;
  }
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
  padding: 15px 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: #6e7d9c;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const Label = styled.div`
  font-weight: bold;
  color: #767676;
`;

const Value = styled.span`
  color: #121212;
  text-align: left;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30rem;
  height: auto;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #929292;
`;

const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff6961;
  }
`;

export default GuestInfo;