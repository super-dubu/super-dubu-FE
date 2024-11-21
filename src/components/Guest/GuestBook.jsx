import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const GuestBook = () => {
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { items: it } = location.state;

  const handleReservationClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const reservationData = {
      name: document.querySelector("input[placeholder='이름을 입력하세요']")
        .value,
      contact: document.querySelector("input[placeholder='010 - xxxx - xxxx']")
        .value,
      date: selectedDate ? selectedDate.toISOString() : null,
      time: selectedTime,
      requests: document.querySelector(
        "textarea[placeholder='원하는 매물의 조건 등을 남겨주세요!']"
      ).value,
      memberRegister: it.memberRegister,
      status: "PENDING",
      items: it.itemID,
    };
    console.log("예약 정보:", reservationData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/reservation/add`,
        reservationData
      );
      console.log(response.data);
      console.log(reservationData);
      alert("예약 등록이 완료되었습니다.");
      navigate("/sell");
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("예약 등록 중 오류가 발생했습니다.");
    }
    setSuccessModalOpen(true);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <>
      <FormContainer>
        <Header>
          <Title>
            공인중개인 {it.member} ( {it.memberOffice} )
          </Title>
        </Header>
        <Separator />
        <Form>
          <FormGroup>
            <Label>예약자 이름</Label>
            <Input type="text" placeholder="이름을 입력하세요" />
          </FormGroup>

          <FormGroup>
            <Label>연락처</Label>
            <Input
              type="tel"
              placeholder="010 - xxxx - xxxx"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              maxLength="17"
              onInput={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, "");
                if (value.length > 3 && value.length <= 7) {
                  value = `${value.slice(0, 3)} - ${value.slice(3)}`;
                } else if (value.length > 7) {
                  value = `${value.slice(0, 3)} - ${value.slice(
                    3,
                    7
                  )} - ${value.slice(7)}`;
                }
                e.target.value = value;
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>예약 날짜</Label>
            <InputWrapper>
              <Input
                type="text"
                value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                placeholder="YY. MM. DD"
                readOnly
              />
              <IconWrapper onClick={() => setDateModalOpen(true)}>
                📅
              </IconWrapper>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>예약 시간</Label>
            <InputWrapper>
              <Input
                type="text"
                value={selectedTime}
                placeholder="00 : 00"
                readOnly
                onClick={() => setTimeModalOpen(true)}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>요청 사항</Label>
            <TextArea placeholder="원하는 매물의 조건 등을 남겨주세요!" />
          </FormGroup>

          <Button onClick={handleReservationClick}>예약 신청하기</Button>
        </Form>
      </FormContainer>

      {isDateModalOpen && (
        <ModalOverlay onClick={() => setDateModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>날짜 선택</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setDateModalOpen(false);
              }}
              inline
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {isTimeModalOpen && (
        <ModalOverlay onClick={() => setTimeModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>시간 선택</h3>
            <TimeContainer>
              <TimeSection>
                <TimeTitle>오전</TimeTitle>
                <TimeButtonRow>
                  <TimeButton onClick={() => handleTimeClick("09 : 00")}>
                    09 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("10 : 00")}>
                    10 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("11 : 00")}>
                    11 : 00
                  </TimeButton>
                </TimeButtonRow>
              </TimeSection>
              <TimeSection>
                <TimeTitle>오후</TimeTitle>
                <TimeButtonRow>
                  <TimeButton onClick={() => handleTimeClick("13 : 00")}>
                    13 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("14 : 00")}>
                    14 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("15 : 00")}>
                    15 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("16 : 00")}>
                    16 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("17 : 00")}>
                    17 : 00
                  </TimeButton>
                </TimeButtonRow>
                <TimeButtonRow>
                  <TimeButton onClick={() => handleTimeClick("18 : 00")}>
                    18 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("19 : 00")}>
                    19 : 00
                  </TimeButton>
                  <TimeButton onClick={() => handleTimeClick("20 : 00")}>
                    20 : 00
                  </TimeButton>
                </TimeButtonRow>
              </TimeSection>
            </TimeContainer>
            <ConfirmButton onClick={() => setTimeModalOpen(false)}>
              선택 완료
            </ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {isSuccessModalOpen && (
        <ModalOverlay onClick={() => setSuccessModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>예약 성공</h3>
            <p>예약이 성공적으로 신청되었습니다!</p>
            <button
              onClick={() => {
                setSuccessModalOpen(false);
                navigate("/sell");
              }}
            >
              확인
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default GuestBook;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  padding-left: 2rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 1rem;
  font-size: 18px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  height: 6rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #6e7d9c;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #999999;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 400px;

  h3 {
    margin-bottom: 1rem;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeTitle = styled.h4`
  margin-bottom: 0.5rem;
  color: #333;
`;

const TimeButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #6e7d9c;
    color: white;
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6e7d9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #999999;
  }
`;
