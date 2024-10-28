import React from 'react'
import styled from 'styled-components';
import logo from '../../img/logo.png'
import { useNavigate } from 'react-router-dom';

function MemberLogin() {
    const navigate = useNavigate();
  return (
    <div>
        <Header>
            <Logo src={logo} />
        </Header>
        <Container>
            <LoginText>DUBU LOGIN</LoginText>
            <KeyBox placeholder='공인중개사 Key를 입력하세요' />
            <LoginButton onClick={() => navigate('/member')}>LOGIN</LoginButton>
        </Container>
    </div>
  )
}

export default MemberLogin

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
`;

const LoginText = styled.div`
    color: #6a6a6a;
    font-weight: 800;
    font-size: 56px;
    margin-top: 180px;
`;

const KeyBox = styled.input`
    margin-top: 140px;
    width: 500px;
    height: 50px;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: #9b9b9b;
    /* text-align: center; */
    font-size: 22px;
    &::placeholder {
        color: #ADADAD;
        font-size: 22px;
        margin-bottom: 3px;
    }
`;

const LoginButton = styled.button`
    margin-top: 70px;
    width: 505px;
    height: 80px;
    border-radius: 20px;
    background-color: #6E7D9C;
    color: white;
    border: none;
    font-size: 24px;
    font-weight: 900;
`;
