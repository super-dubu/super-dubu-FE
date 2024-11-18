import React from "react";
import logo from "../../img/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetData from "../../hooks/GetData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// 얘네가 schema, 어떤 식으로 데이터를 받아와야 하는지 입력 받을 때 바로바로 유효성 검사 해줄겨
// 하고 id, pw, verify, name, phoneNumber, email, registerNumber.. 여기에 다 들어가
const validationSchema = yup.object().shape({
  id: yup
    .string()
    .min(8, "아이디는 최소 8자 이상이어야 합니다.")
    .max(16, "아이디는 최대 16자 이하여야 합니다.")
    .required("아이디를 입력해 주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 최대 16자 이하여야 합니다.")
    .required("비밀번호를 입력해 주세요."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해 주세요."),
  name: yup
    .string()
    .matches(/^[가-힣]+$/, "이름은 한글만 입력할 수 있습니다.")
    .required("이름을 입력해 주세요."),
  phoneNumber: yup
    .string()
    .matches(
      /^\d{3}-\d{4}-\d{4}$/,
      "전화번호는 xxx-xxxx-xxxx 형식이어야 합니다."
    )
    .required("전화번호를 입력해 주세요."),
  email: yup
    .string()
    .email("유효한 이메일 형식이 아닙니다.")
    .required("이메일을 입력해 주세요."),
  registrationNumber: yup
    .string()
    .required("공인중개사 등록번호를 입력해 주세요."),
});

function MemberJoin() {
  const navigate = useNavigate();
  const { data: agents, isLoading, isError } = GetData("/HLF/getAgents");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur", // => onBlur.. touched만으로 감지하고 유효성 검사 할 수 있게끔
  });

  // 사용자가 저장을 누르면 저기 원래 받아왔던 데이터들 중에서 등록번호가 같은 애를 찾고
  // 그리고 그 데이터들이랑 잘 스까가지고 묶어서 post를 보냄 => 회원가입
  const onSubmit = async (formData) => {
    if (isLoading) {
      alert("데이터를 불러오는 중입니다...");
      return;
    }

    if (isError) {
      alert("데이터를 불러오는 데 오류가 발생했습니다.");
      return;
    }

    const agentList = agents.data;
    const matchingAgent = agentList.find(
      (agent) => agent.registerID === formData.registrationNumber
    );

    if (matchingAgent) {
      const postData = {
        id: formData.id,
        pw: formData.password,
        agentName: matchingAgent.agentName,
        agentPhone: matchingAgent.agentPhone,
        agentEmail: formData.email,
        officeName: matchingAgent.officeName,
        agentAddress: matchingAgent.agentAddress,
        registerID: matchingAgent.registerID,
        registerDate: matchingAgent.registerDate,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACK_URL}/memberLogin/signup`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("서버 응답:", response.data);
        alert(
          "회원가입이 완료되었습니다. 로그인 후 서비스를 이용하실 수 있습니다."
        );
        navigate("/member/login");
      } catch (error) {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("입력한 등록번호와 일치하는 데이터가 없습니다.");
    }
  };

  return (
    <div>
      <Header>
        <Logo src={logo} onClick={() => navigate("/")} />
      </Header>
      <Container>
        <JoinText>JOIN to DUBU</JoinText>
      </Container>
      <SignUpContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldContainer>
            <Label>아이디</Label>
            <Input type="text" {...register("id")} />
            {touchedFields.id && <Error>{errors.id?.message}</Error>}
          </FieldContainer>

          <FieldContainer>
            <Label>비밀번호</Label>
            <Input type="password" {...register("password")} />
            {touchedFields.password && (
              <Error>{errors.password?.message}</Error>
            )}
          </FieldContainer>

          <FieldContainer>
            <Label>비밀번호 확인</Label>
            <Input type="password" {...register("confirmPassword")} />
            {touchedFields.confirmPassword && (
              <Error>{errors.confirmPassword?.message}</Error>
            )}
          </FieldContainer>

          <FieldContainer>
            <Label>이름</Label>
            <Input type="text" {...register("name")} />
            {touchedFields.name && <Error>{errors.name?.message}</Error>}
          </FieldContainer>

          <FieldContainer>
            <Label>전화번호</Label>
            <Input type="text" {...register("phoneNumber")} />
            {touchedFields.phoneNumber && (
              <Error>{errors.phoneNumber?.message}</Error>
            )}
          </FieldContainer>

          <FieldContainer>
            <Label>이메일</Label>
            <Input type="text" {...register("email")} />
            {touchedFields.email && <Error>{errors.email?.message}</Error>}
          </FieldContainer>

          <FieldContainer>
            <Label>공인중개사 등록번호</Label>
            <Input type="text" {...register("registrationNumber")} />
            {touchedFields.registrationNumber && (
              <Error>{errors.registrationNumber?.message}</Error>
            )}
          </FieldContainer>

          <NextButton type="submit">가입하기</NextButton>
        </form>
      </SignUpContainer>
    </div>
  );
}

const Header = styled.div`
  width: 100%;
  height: 5rem;
  border-style: solid;
  border-width: 0 0 1.2px 0;
  border-color: #9b9b9b;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding-left: 1.5rem;
  width: 130px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const JoinText = styled.div`
  color: #6a6a6a;
  font-weight: 700;
  font-size: 50px;
  margin-top: 3rem;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
`;

const Label = styled.div`
  color: #adadad;
  font-size: 20px;
`;

const Input = styled.input`
  height: 1.75rem;
  width: 100%;
  border-radius: 0;
  border-style: solid;
  border-width: 1px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
`;

const NextButton = styled.button`
  background-color: #6e7d9c;
  color: white;
  border: none;
  font-size: 24px;
  font-weight: 900;
  border-radius: 15px;
  width: 100%;
  max-width: 505px;
  height: 70px;
  margin-top: 1rem;
`;

export default MemberJoin;
