import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const GuestBook = () => {
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleReservationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSuccessModalOpen(true);
  };

  return (
    <>
      <FormContainer>
        <Header>
          <Title>공인중개인 오채린(두부공인중개사사무소)</Title>
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
                let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
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
            <Input
              type="text"
              placeholder="00 : 00"
              maxLength="7"
              onInput={(e) => {
                let value = e.target.value.replace(/[^0-9:]/g, " ");
                if (value.length === 2 && !value.includes(" : ")) {
                  value += " : ";
                }
                e.target.value = value;
              }}
            />
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
  background-color: white;
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
  width: 300px;

  h3 {
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #6e7d9c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #999999;
    }
  }
`;
