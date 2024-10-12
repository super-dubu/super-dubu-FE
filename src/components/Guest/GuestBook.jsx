import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GuestBook = () => {
  const navigate = useNavigate();

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
            <Input type="text" placeholder="010 - xxxx - xxxx" />
          </FormGroup>

          <FormGroup>
            <Label>예약 날짜</Label>
            <InputWrapper>
              <Input type="text" placeholder="YY. MM. DD" />
              <IconWrapper onClick={() => navigate("date")}>📅</IconWrapper>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>예약 시간</Label>
            <Input type="text" placeholder="00 : 00" />
          </FormGroup>

          <FormGroup>
            <Label>요청 사항</Label>
            <TextArea placeholder="원하는 매물의 조건 등을 남겨주세요!" />
          </FormGroup>

          <Button onClick={() => navigate("/success")}>예약 신청하기</Button>
        </Form>
      </FormContainer>
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
