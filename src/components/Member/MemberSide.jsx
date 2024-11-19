import React from "react";
import styled from "styled-components";
import Image from "../../img/image.png";
import { useNavigate } from "react-router-dom";

function MemberSide({userName}) {
  const navigate = useNavigate();
  return (
    <div>
      <SideInfo>
        <IDPhoto src={Image} />
        <NameBox>
          <Name> {userName} <Position>공인 중개사</Position></Name>
          <ShopInfo>두부 공인 중개사<br /> (동작구 상도로 369)</ShopInfo>
        </NameBox>
        <Divider />
        <SideMenu>
          <SideButton>예약 관리</SideButton>
          <SideButton onClick={() => navigate("/member/property")}>매물 등록</SideButton>
          <SideButton onClick={() => navigate("/member/contract1")}>거래 생성</SideButton>
          <SideButton>최근 거래</SideButton>
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
  height: 7rem;
  margin-top: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  text-align: center;
  gap: 1rem;
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
