import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import Modal from "./BookAdmin";
import getData from '../../hooks/GetData'

function MemberMypage() {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("user", user);

  const booking = getData(`/reservation/view/${user?.registerID}`);
  const item = getData(`/forsale/view?memberRegister=${user?.registerID}`);
  console.log(item);
  console.log("booking", booking);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {user ? <Header showLogout={true} /> : ""}
      <Container>
        <SideBar openModal={openModal} />
        <Content>
          <BookingList>
            <Title>상담 예약 내역</Title>
            <BookBox>
              <BookContent>
                {booking?.data?.data?.reservation_list[0].date}
                예약자 이름 {booking?.data?.data?.reservation_list[0].name}

              </BookContent>
                
              <BookContent />
              <BookContent />
            </BookBox>
          </BookingList>
          <SellContainer>
            <Title>나의 매물</Title>
            <SellBox>
              <SellContent>
                <Image src={Photo} />
                <SellInfo>
                  <InfoDetail>전세 {item?.data?.data?.properties[0].priceRental}</InfoDetail>
                  <InfoDetail>주소 어디어디</InfoDetail>
                  <InfoDetail>여기는 뭐 넣을까</InfoDetail>
                </SellInfo>
              </SellContent>
              <SellContent>
                
              </SellContent>
              <SellContent />
            </SellBox>
          </SellContainer>
        </Content>
      </Container>
      {isModalOpen && <Modal onClose={closeModal} />}
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
