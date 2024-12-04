import styled from "styled-components";
import React, { useState } from "react";

import daejang1 from "../../img/daejang/1.jpeg"
import daejang2 from "../../img/daejang/2.jpeg"
import daejang3 from "../../img/daejang/3.jpeg"

import deunggi1 from '../../img/deunggi/1.jpeg'
import deunggi2 from '../../img/deunggi/2.jpeg'
import deunggi3 from '../../img/deunggi/3.jpeg'
import deunggi4 from '../../img/deunggi/4.jpeg'
import deunggi5 from '../../img/deunggi/5.jpeg'

import toji1 from '../../img/toji/1.jpeg'
import toji2 from '../../img/toji/2.jpeg'

const MemberInfo = ({ item, onBack }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const images = [deunggi1, deunggi2, deunggi3, deunggi4, deunggi5, daejang1, daejang2, daejang3, toji1, toji2];

  const openModal = () => {
    setImageList(images); // 이미지 배열 설정
    setCurrentImageIndex(0); // 첫 번째 이미지로 설정
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  // 이전 이미지로 이동
  const goToPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length
    );
  };

  return (
    <div>
    <CenteredContainer>
      <InfoContainer>
        <BackButton onClick={onBack}>← 목록으로</BackButton>
        <InfoContent>
          <Address>{item.buildingAddress}</Address>
          <Row>
            <Key>PNU Code</Key> <Value>{item.tokenID}</Value>
          </Row>
          <Row>
            <Key>건물 이름</Key>{" "}
            <Value>{item.buildingName || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>상세 주소</Key> <Value>{item.hosu || "정보 없음"}</Value>
          </Row>
          <Row>
            <Key>공시지가</Key> <Value>{item.buildingPrice}</Value>
          </Row>
          <Row>
            <Key>승인일자</Key> <Value>{item.confirmDate}</Value>
          </Row>
          <Row>
            <Key>면적</Key> <Value>{`${(item.area / 100)} ㎡`}</Value>
          </Row>
          <Row>
            <Key>층수</Key> <Value>{item.floorInfo}</Value>
          </Row>
          <Row>
            <Key>소유주</Key> <Value>{item.owner}</Value>
          </Row>
          <Row>
            <Key>방 개수</Key> <Value>{item.roomCount}</Value>
          </Row>
        </InfoContent>
        <Image src={images[0]} onClick={openModal}></Image>
      </InfoContainer>
    </CenteredContainer>
    {isModalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalImage src={imageList[currentImageIndex]} alt="모달 이미지" />
            <Pagination>
              <Button onClick={goToPrevImage}>{"<"}</Button>
              <PageNumber>
                {currentImageIndex + 1} / {imageList.length}
              </PageNumber>
              <Button onClick={goToNextImage}>{">"}</Button>
            </Pagination>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  /* height: 90%; */
  background-color: #f7f9fc;
`;

const InfoContainer = styled.div`
  width: 35%;
  height: auto;
  padding: 2rem;
  background-color: white;
  /* border-radius: 15px; */
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const Address = styled.div`
  text-align: center;
  margin: 2rem;
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background-color: #6e7d9c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #5a6a8c;
  }
`;

const InfoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  gap: 1rem;
`;

const Key = styled.span`
  font-weight: bold;
  color: #333;
  flex-basis: 40%;
  text-align: right;
  margin-right: 0.5rem;
`;

const Value = styled.span`
  flex-basis: 60%;
  color: #555;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
  cursor: pointer; /* 클릭할 수 있음을 나타내기 위해 포인터 추가 */
`;

const ModalImage = styled.img`
  width: 150%;
  height: auto;
  object-fit: cover;
  /* cursor: pointer;  */
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30rem;
  height: auto;
  transform: translate(-50%, -50%);
  /* background-color: white; */
  padding: 20px;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #929292;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  font-weight: 900;
  font-size: 24px;
  cursor: pointer;
  color: #929292;
`;

const PageNumber = styled.span`
  margin: 0 15px;
  font-size: 18px;
  font-weight: bold;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* 배경을 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default MemberInfo;
