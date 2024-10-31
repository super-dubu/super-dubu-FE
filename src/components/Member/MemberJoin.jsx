import React from 'react'
import logo from '../../img/logo.png'
import styled from 'styled-components';
import { Form, useNavigate } from 'react-router-dom';

function MemberJoin() {
    const navigate = useNavigate();
    const handleSignUp = () => {
        alert('회원가입이 완료되었습니다. 로그인 후 서비스를 이용하실 수 있습니다.')
    }
  return (
    <div>
        <Header>
            <Logo src={logo} />
        </Header>
        <Container>
            <JoinText>JOIN to DUBU</JoinText>
        </Container>
        <SignUpContainer>
            <FieldContainer>
                <Label>아이디</Label>
                <Input type="text" />
            </FieldContainer>

            <FieldContainer>
                <Label>비밀번호</Label>
                <Input type="password" />
            </FieldContainer>

            <FieldContainer>
                <Label>비밀번호 확인</Label>
                <Input type="password" />
            </FieldContainer>

            <FieldContainer>
                <Label>이름</Label>
                <Input type="text" />
            </FieldContainer>

            <FieldContainer>
                <Label>전화번호</Label>
                <Input type="text" />
            </FieldContainer>

            <FieldContainer>
                <Label>이메일</Label>
                <Input type="text" />
            </FieldContainer>

            <FieldContainer>
                <Label>사무소 주소</Label>
                <Input type="text" />
            </FieldContainer>

            <FieldContainer>
                <Label>공인중개사 등록번호</Label>
                <Input type="text" />
            </FieldContainer>
            <NextButton onClick={() => 
                {
                    handleSignUp();
                    navigate('/member/login')
                }
                }>다음 단계</NextButton>
        </SignUpContainer>
        
    </div>
  )
}

const Header = styled.div`
    width: 100%;
    height: 5rem;
    /* background-color: grey; */
    border-style: solid;
    border-width: 0 0 1.2px 0;
    border-color: #9B9B9B;
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
    margin-top: 5rem;
`;

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 4rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const Label = styled.div`
    color: #ADADAD;
    font-size: 20px;
    width: 14rem;
    text-align: center;
`;

const Input = styled.input`
    height: 1.75rem;
    width: 15rem;
    border-radius: 0;
    border-style: solid;
    border-width: 1px;

`;

const NextButton = styled.button`
    background-color: #6E7D9C;
    color: white;
    border: none;
    font-size: 24px;
    font-weight: 900;
    border-radius: 15px;
    width: 505px;
    height: 70px;
    margin-top: 1rem;
`;

export default MemberJoin