import React from 'react'
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { useNavigate } from 'react-router-dom'

function MemberHeader({userName}) {
    const navigate = useNavigate();
  return (
    <div>
        <Header>
            <Logo src={logo} />
            <RightContainer>
                <MemberText> <UserName>{userName}</UserName> 님, 반갑습니다!</MemberText>
                <MyPage onClick={() => navigate('/member/mypage')}>My Page</MyPage>
            </RightContainer>
        </Header>
    </div>
  )
}

export default MemberHeader

const Header = styled.div`
    width: 100%;
    height: 5rem;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: #9B9B9B;
    display: flex;
    align-items: center;
    flex-direction: row;
`;

const Logo = styled.img`
    padding-left: 1.5rem;
    width: 130px;
    height: auto;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: auto;
    margin-right: 2rem;
    gap: 2.5rem;
    line-height: 5rem;
`;

const MemberText = styled.div`
    font-size: 18px;
    color: #ADADAD;

`;

const UserName = styled.span`
    color: #545454;
`;

const MyPage = styled.div`
    color: #6e7d9c;
    font-weight: 800;
    font-size: 22px;
`;