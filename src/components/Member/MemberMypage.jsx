import React, { useContext, useState } from "react";
import Header from "../Member/MemberHeader";
import styled from "styled-components";
import SideBar from "./MemberSide";
import Photo from "../../img/image.png";
import { AuthContext } from "../api/AuthContext";
import getData from "../../hooks/GetData";
import { useNavigate } from "react-router-dom";
import test from "../../img/image.png";
import ContractCheck from "./ContractCheck";

function MemberMypage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스
  const [imageList, setImageList] = useState([]); // 이미지 리스트 상태 추가

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
  console.log("itmes",items);
 
  // items.data.properties[0].image.forEach((img, i) => {
  //   console.log(`Image ${i}:`, img);  // 각 이미지의 경로를 출력
  // });

  const completedItemIDs = contract?.data?.result
    ?.filter((item) => item.itemInfo?.status === "COMITTED") // 완료된 계약 필터링
    ?.map((item) => item.itemInfo?.itemID); // itemID만 추출

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

  const openModal = (images, index) => {
    setImageList(images); // 이미지 리스트 설정
    setCurrentImageIndex(index); // 클릭한 이미지의 인덱스 설정
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // 페이지네이션 기능
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % imageList.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length
    );
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
                {it.image?.length > 0 && (
                  <Image
                    src={`${import.meta.env.VITE_IMAGE_URL}/${it.image[0].split('uploads')[1].substring(1)}`} // 경로 잘라서 첫 번째 이미지 표시
                    onClick={() => openModal(it.image, 0)} // 첫 번째 이미지 클릭 시 모달 열기
                  />
                )}
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
      {isModalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Image
              src={`${import.meta.env.VITE_IMAGE_URL}/${imageList[currentImageIndex].split('uploads')[1].substring(1)}`}
              alt={`Image ${currentImageIndex + 1}`}
            />
            <Pagination>
              <Button onClick={goToPrevImage}>{"<"}</Button>
              <PageNumber>
                {currentImageIndex + 1} / {imageList.length}
              </PageNumber>
              <Button onClick={goToNextImage}>{">"}</Button>
            </Pagination>
            {/* <CloseButton onClick={closeModal}>X</CloseButton> */}
          </ModalContent>
        </Modal>
      )}
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

// const Image = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
// `;

// const ImageArea = styled.div`
//   flex: 4;
//   height: 90%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* overflow: hidden; 이미지를 컨테이너 안에 숨김 처리 */
//   padding: 1rem;
// `;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ImageArea = styled.div`
  /* flex: 4;
  height: 90%; */
  width: 15rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1rem;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
  cursor: pointer; /* 클릭할 수 있음을 나타내기 위해 포인터 추가 */
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
  font-size: 24px;
  cursor: pointer;
  color: #929292;
`;

const PageNumber = styled.span`
  margin: 0 15px;
  font-size: 18px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background:none;
  font-size: 24px;
  cursor: pointer;
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