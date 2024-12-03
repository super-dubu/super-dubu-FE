import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import Modal from "./BookAdmin";
import getData from "../../hooks/GetData";
import { useNavigate } from "react-router-dom";
import test from "../../img/image.png";
import ContractCheck from "./ContractCheck";

function MemberMypage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: contract,
    contractLoading,
    contractError,
  } = getData("/HLF/getAllContract");

  // 예약 정보 가져오기
  const { data: booking, isLoading: bookingLoading } = getData(
    `/reservation/view/${user?.registerID}`
  );

  // 매물 정보 가져오기
  const { data: items, isLoading: itemsLoading } = getData(
    `/forsale/view?memberRegister=${user?.registerID}`
  );
  console.log(items);
 
  // items.data.properties[0].image.forEach((img, i) => {
  //   console.log(`Image ${i}:`, img);  // 각 이미지의 경로를 출력
  // });

  const completedItemIDs = contract?.data?.result
    ?.filter((item) => item.itemInfo?.status === "COMITTED") // 완료된 계약 필터링
    ?.map((item) => item.itemInfo?.itemID); // itemID만 추출

  console.log("완료된 계약 itemID:", completedItemIDs);

  // 예약 목록에서 완료된 계약 제거
  const filteredBookings = booking?.data?.reservation_list?.filter(
    (book) => !completedItemIDs?.includes(book.itemID)
  );

  // 예약 목록 정렬 함수
  const sortedBookings =
    filteredBookings?.slice().sort((a, b) => {
      const dateTimeA = new Date(a.date);
      const dateTimeB = new Date(b.date);
      return dateTimeA - dateTimeB; // 가까운 날짜/시간 순으로 정렬
    }) || [];

  // {sortedBookings ? console.log("Sorting Dates:", dateTimeA, dateTimeB) : ""};

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
  // if (bookingLoading || itemsLoading) {
  //   return <p>로딩 중...</p>;
  // }

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleCancelBooking = (bookingID) => {
    const confirmCancel = window.confirm(
      "예약 취소 알림이 예약자에게 따로 가지 않습니다. \n정말 예약을 취소하시겠습니까?"
    );
    if (confirmCancel) {
      // 예약 취소 API 요청 또는 상태 업데이트
      fetch(
        `${import.meta.env.VITE_BACK_URL}/reservation/delete/${bookingID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("예약 취소에 실패했습니다.");
          }
          // 성공적으로 삭제 후 예약 목록 갱신
          alert("예약이 성공적으로 취소되었습니다.");
          window.location.reload(); // 삭제 후 페이지 새로고침 (또는 상태 갱신)
        })
        .catch((error) => {
          console.error("예약 취소 중 오류 발생:", error);
          alert("예약 취소 중 문제가 발생했습니다.");
        });
    }
  };

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
                  <Cancle onClick={() => handleCancelBooking(book.bookID)}>
                    ✕
                  </Cancle>
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
                      <Bold>예약자 이름</Bold> {book.name}
                    </Text>
                    <Text>
                      <Bold>연락처</Bold> {book.contact}
                    </Text>
                    <Text>
                      <Bold>상담 매물 </Bold>
                      {matchedItem
                        ? matchedItem.buildingAddress
                        : "정보 없음"}{" "}
                      {matchedItem ? matchedItem.buildingName : "정보 없음"}{" "}
                      {matchedItem ? matchedItem.hosu : "정보 없음"}
                    </Text>
                    <Text>
                      <Bold>요청 사항</Bold> {book.requests}
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
                  {it.image?.map((img, i) => (
                    <Image
                      key={i}
                      // src={`${import.meta.env.BASIC_URL}${img}`}
                      src={img}
                      // alt={`image-${i}`}
                      onClick={() => openModal(img)}
                    />
                  ))}
                </ImageArea>
                <TextArea>
                  <TextContainer>
                    <Price>
                      {it.itemType === "1"
                        ? "월세 "
                        : it.itemType === "0"
                          ? "전세 "
                          : "정보 없음"}
                      {it.priceRental}
                      {it.priceMonthly ? ` / ${it.priceMonthly}` : ""}
                    </Price>
                    <Info>
                      {it.buildingAddress || "정보 없음"}{" "}
                      {it.buildingName || ""} {it.hosu || ""}
                    </Info>
                    <Info>
                      {it.area
                        ? `${(it.area / 100).toFixed(2)} ㎡`
                        : "정보 없음"}{" "}
                      {it.floorInfo ? `, ${it.floorInfo}층` : ""}{" "}
                      {it.manageFee ? `, 관리비 ${it.manageFee}만원` : ""}
                    </Info>
                    <Info>{it.body || ""}</Info>
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
  /* padding: 1rem; */
`;

const Time = styled.div`
  margin: 0.5rem 0 1rem 1rem;
  font-weight: bold;
  font-size: 18px;
`;
const Cancle = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* width: 2rem;
  height: 2rem;
  border: 1px solid #595959; */
  /* border-radius: 50%; */
  cursor: pointer;
  /* margin-left: 1rem; 왼쪽 여백 추가 */
  padding-left: 1rem;
  padding-top: 1rem;
  color: #595959;
  background-color: white;
  font-weight: bold;
  /* width: 2rem;
  height: 2rem; */
`;

const Text = styled.div`
  width: 90%;
`;

const TextContainer = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #121212;
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
  justify-content: center;
  align-items: center; /* Row의 세로 중심에 배치 */
  width: 100%;
  /* padding: 0 1rem; Row의 양쪽 여백 추가 */
`;

const Bold = styled.span`
  margin-right: 5px;
  color: #878585;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 3rem; */
  overflow-y: auto;
  /* border-style: solid;
  border-width: 1px 0 0 0;
  border-color: #b9b9b9; */
`;

const Item = styled.div`
  width: 100%;
  height: 20rem; /* 고정 높이 설정 */
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #b9b9b9;
`;

const TextArea = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 2rem 0;
  justify-content: center;
`;

const Info = styled.div``;

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
  padding: 1rem;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
