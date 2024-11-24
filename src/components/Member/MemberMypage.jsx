import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import Modal from "./BookAdmin";
import getData from "../../hooks/GetData";
import { useNavigate } from "react-router-dom";
import test from '../../img/image.png'
import ContractCheck from "./ContractCheck";

function MemberMypage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 예약 정보 가져오기
  const { data: booking, isLoading: bookingLoading } = getData(
    `/reservation/view/${user?.registerID}`
  );

  // 매물 정보 가져오기
  const { data: items, isLoading: itemsLoading } = getData(
    `/forsale/view?memberRegister=${user?.registerID}`
  );

  console.log("items", items);

  // 예약 목록 정렬 함수
  const sortedBookings =
    booking?.data?.reservation_list?.slice().sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB; // 가까운 날짜/시간 순으로 정렬
    }) || [];

  // Contract1으로 이동
  const goToContract = (bookItemID) => {
    const matchedItem = items?.data?.properties.find(
      (item) => item.itemID === bookItemID
    );

    if (!matchedItem) {
      alert("해당 itemID에 대한 매물 정보를 찾을 수 없습니다.");
      return;
    }

    navigate(`/member/contract/1`, {
      state: {
        itemInfo: matchedItem, // 매물 정보
      },
    });
  };

  if (bookingLoading || itemsLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      {user && <Header showLogout={true} />}
      <SideBar />
      <Container>
        <Content>
          <Title>예약 내역</Title>
          <BookContainer>
            {sortedBookings.map((book) => {
              const matchedItem = items?.data?.properties.find(
                (item) => item.itemID === book.itemID
              );

              return (
                <BookContent key={book.itemID}>
                  <Row>
                    <Time>
                      {book.date.slice(0, 10)} {book.time}
                    </Time>
                    <Button onClick={() => goToContract(book.itemID)}>
                      계약 진행하기
                    </Button>
                  </Row>
                  <TextContainer>
                    <Text>
                      예약자 이름 <Bold>{book.name}</Bold>
                    </Text>
                    <Text>
                      연락처 <Bold>{book.contact}</Bold>
                    </Text>
                    <Text>
                      상담 매물{" "}
                      <Bold>
                        {matchedItem
                          ? matchedItem.buildingAddress
                          : "정보 없음"}{" "}
                        {matchedItem ? matchedItem.buildingName : "정보 없음"}{" "}
                        {matchedItem ? matchedItem.hosu : "정보 없음"}
                      </Bold>
                    </Text>
                    <Text>
                      요청 사항 <Bold>{book.requests}</Bold>
                    </Text>
                  </TextContainer>
                </BookContent>
              );
            })}
          </BookContainer>
        </Content>
        <Content>
          <Title>나의 매물</Title>
          <ItemContainer>
            {items?.data?.properties?.map((it, index) => (
              <Item key={index}>
                <ImageArea>
                  <Image src={test} />
                </ImageArea>
                <TextArea>
                  <TextContainer>
                    <Info>{it.buildingAddress || "정보 없음"}  {it.buildingName || ""} {it.hosu || ""}</Info>
                    <Info>{it.itemType === "0" ? "월세" : it.itemType === "1" ? "전세" : "정보 없음"}</Info>
                  </TextContainer>
                </TextArea>
              </Item>
            ))}
          </ItemContainer>
        </Content>
      </Container>
    </div>
  );
}

export default MemberMypage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border-style: solid;
  border-width: 0 1px 0 0;
  border-color: #9b9b9b;
`;

const Title = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  font-weight: bold;
  color: #121212;
  font-size: 20px;
`;

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  gap: 2rem;
  overflow-y: auto;
`;

const BookContent = styled.div`
  width: 80%;
  height: auto;
  padding-bottom: 1rem;
  border-style: solid;
  border-color: #595959;
  border-width: 0 0 0 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: relative;
  margin-left: -3rem;
`;

const Time = styled.div`
  margin: 0.5rem 0 1rem 1rem;
  font-weight: bold;
  font-size: 18px;
`;

const Text = styled.div``;

const TextContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #595959;
`;

const Button = styled.button`
  height: 2rem;
  /* margin-top: 0.5rem; */
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  background-color: white;
  border: solid 1px #595959;
  border-radius: 10px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
`;

const Bold = styled.span`
  margin-left: 5px;
  color: #121212;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 2rem;
  overflow-y: auto;
`;

const Item = styled.div`
  width: 90%;
  height: 20rem; /* 고정 높이 설정 */
  border: solid 1px black;
  display: flex;
  flex-direction: row;
`;

const TextArea = styled.div`
  flex : 6;
`;


const Image = styled.img`
  width: 100%; 
  height: auto; 
  object-fit: cover;
`;

const ImageArea = styled.div`
  flex: 4;
  height: 90%; 
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; 이미지를 컨테이너 안에 숨김 처리 */
  padding: 1rem; /* 원하는 패딩 추가 */
`;

const Info = styled.div`
  margin: 1rem;
`;
