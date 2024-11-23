import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import Modal from "./BookAdmin";
import getData from "../../hooks/GetData";
import { useNavigate } from "react-router-dom";

function MemberMypage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("user mypage", user);

  // 예약 정보 가져오기
  const { data: booking, isLoading: bookingLoading } = getData(
    `/reservation/view/${user?.registerID}`
  );

  // 매물 정보 가져오기
  const { data: items, isLoading: itemsLoading } = getData(
    `/forsale/view?memberRegister=${user?.registerID}`
  );

  console.log(items);

  // 예약 목록 정렬 함수
  const sortedBookings =
    booking?.data?.reservation_list?.slice().sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB; // 가까운 날짜/시간 순으로 정렬
    }) || [];

  // Contract1으로 이동
  const goToContract = (bookItemID) => {
    console.log("in goto Contract bookItemID", bookItemID);
    try {
      // 예약된 매물의 itemID로 매물 정보 찾기
      const matchedItem = items?.data?.properties.find(
        (item) => item.itemID === bookItemID
      );
      console.log("matchedItem", matchedItem);

      if (!matchedItem) {
        alert("해당 itemID에 대한 매물 정보를 찾을 수 없습니다.");
        return;
      }

      navigate(`/member/contract/1`, {
        state: {
          itemInfo: matchedItem, // 매물 정보
        },
      });
    } catch (error) {
      console.error("Contract로 이동 중 오류 발생:", error);
      alert("매물 정보를 가져오는 중 오류가 발생했습니다.");
    }
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
              // items.data.properties에서 예약의 itemID와 매칭되는 매물 찾기
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
                        {matchedItem ? matchedItem.buildingAddress : "정보 없음"}{" "}
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
  border-color: #9B9B9B;
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
`;

const Time = styled.div`
  margin: 0.5rem 0 1rem 1rem;
  font-weight: bold;
  font-size: 18px;
`;

const Text = styled.div`
  
`;

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

