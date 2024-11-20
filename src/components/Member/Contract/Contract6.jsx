import React, { useContext } from 'react'
import Header from '../MemberHeader'
import styled from 'styled-components';
import { QRCodeCanvas } from "qrcode.react";
import { AuthContext } from '../../api/AuthContext';

function Contract6() {

const { user } = useContext(AuthContext);   
console.log("Original user", user);
const userData = user ? user : { user: "" };
console.log("Processed userData:", userData);
  return (
    <div>
        <Header />
        <Container>
            <Title>계약자 정보 인증</Title>
            <QRBox>
                <QRCodeCanvas value="ExampleURL.com" size={300}/>
            </QRBox>
            <Title>개업 공인중개사</Title>
            <AgentBox>
                <Column>
                    <Row>중개업자명 : {userData.member.agentName}</Row>
                    <Row>전화번호 : {userData.member.agentPhone}</Row>
                    <Row>E-mail : {userData.member.agentEmail}</Row>
                </Column>
                <Column>
                    <Row>사무소 소재지 : {userData.member.agentAddress}</Row>
                    <Row>사무소 명칭 : {userData.member.officeName}</Row>
                    <Row>등록번호 : {userData.member.registerID}</Row>
                </Column>
            </AgentBox>
        </Container>
    </div>
  )
}

export default Contract6

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-top : 2rem;
    margin-bottom : 2rem;
`;

const QRBox = styled.div`
    width: 80%;
    height: 25rem;
    border: solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AgentBox = styled.div`
    width: 80%;
    height : 15rem;
    border: solid 1px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10rem;
    margin-top: -1rem;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;

`;

const Row = styled.div`
    font-weight: bold;
`;