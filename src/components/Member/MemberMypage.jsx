import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import Modal from "./BookAdmin";
import getData from '../../hooks/GetData'
import { useNavigate } from "react-router-dom";

function MemberMypage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log("user", user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 예약 정보 가져오기
  const { data: booking, isLoading: bookingLoading } = getData(
    `/reservation/view/${user?.registerID}`
  );

  // 매물 정보 가져오기
  const { data: items, isLoading: itemsLoading } = getData(
    `/forsale/view?memberRegister=${user?.registerID}`
  );

  console.log("items", items);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      // tokenID(PNU) 전달
      navigate(`/member/contract/1`, {
        state: {
          itemInfo: matchedItem, // 매물 정보
          PNU: matchedItem.tokenID, // tokenID를 PNU로 전달
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

  console.log("booking",booking?.data?.reservation_list[0]);

  return (
    <div>
      {user && <Header showLogout={true} />}
      <Container>
        <SideBar openModal={openModal} />
        <Content>
          <BookingList>
            <Title>상담 예약 내역</Title>
            <BookBox>
              {booking?.data?.reservation_list.map((reservation, index) => (
                <BookContent key={index}>
                  <p>예약 날짜: {reservation.date.substring(5, 10)}</p>
                  <p>예약자 이름: {reservation.name}</p>
                  {/* <p>예약 매물 주소: {reservation.address}</p> */}
                  <p>매물 ID: {reservation.itemID}</p>
                  <ContractButton onClick={() => goToContract(reservation.itemID)}>
                    계약서 작성하기
                  </ContractButton>
                </BookContent>
              ))}
            </BookBox>
          </BookingList>
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
  flex-grow: 1;
  overflow: hidden;
`;

const BookingList = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 22rem;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #9b9b9b;
`;

const Title = styled.div`
  margin: 1.5rem 0 0 1.5rem;
  font-size: 18px;
  font-weight: bold;
  color: #121212;
`;

const BookBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem 0 0 1.5rem;
`;

const BookContent = styled.div`
  width: 17rem;
  height: 15rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  /* border-radius: 20px; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); */
  /* border: solid 1px #595959; */
`;

const SellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SellBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 4rem 0 0 3rem;
`;

const SellContent = styled.div`
  width: 30rem;
  height: 20rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.img`
  width: 8rem;
  height: 10rem;
`;

const SellInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  gap: 1rem;
`;

const InfoDetail = styled.div``;

const ContractButton = styled.button`
  
`;