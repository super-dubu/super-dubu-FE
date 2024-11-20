import React, { useContext } from "react";
import styled from "styled-components";
import Image from "../../img/image.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../api/AuthContext";

function MemberSide() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext); 

  return (
    <div>
      <SideInfo>
        <IDPhoto src={Image} />
        <NameBox>
          {user ? <Name> {user.member.agentName} <Position>공인 중개사</Position></Name> : ""}
          {user ? <ShopInfo>{user.member.officeName}<br /> ({user.member.agentAddress})</ShopInfo> : ""}
        </NameBox>
        <Divider />
        <SideMenu>
          <SideButton>예약 관리</SideButton>
          <SideButton onClick={() => navigate("/member/property")}>매물 등록</SideButton>
          <SideButton onClick={() => navigate("/member/contract1")}>계약서 작성</SideButton>
          <SideButton>최근 계약</SideButton>
        </SideMenu>
      </SideInfo>
    </div>
  );
}

export default MemberSide;

const SideInfo = styled.div`
  border-style: solid;
  border-width: 0 1.2px 0 0;
  border-color: #9b9b9b;
  width: 25rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IDPhoto = styled.img`
  margin-top: 2.5rem;
  width: 12rem;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 13rem;
  height: auto;
  margin-top: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  text-align: center;
  gap: 1rem;
  padding-bottom: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #545454;
  margin-top: 1rem;
`;

const Position = styled.span`
  font-size: 18px;
  color: #adadad;
`;

const ShopInfo = styled.div`
  color: #545454;
  font-weight: 500;
  padding: 0 1rem 1rem 1rem;
`;

const Divider = styled.hr`
  color: #9b9b9b;
  width: 85%;
  margin-top: 2rem;
`;

const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-top: 3rem;
`;

const SideButton = styled.div`
  font-size: 24px;
  font-weight: 500;
`;
