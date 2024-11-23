import React, { useContext } from "react";
import styled from "styled-components";
import Image from "../../img/image.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../api/AuthContext";

function MemberSide({ openModal }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  return (
    <div>
      <Container>
        <Wrapper>
          {/* <Label onClick={() => navigate()}>예약 관리</Label> */}
          <Label onClick={() => navigate('/member/property')}>매물 등록</Label>
          <Label onClick={() => navigate('')}>계약 조회</Label>
          </Wrapper>
      </Container>
    </div>
  );
}

export default MemberSide;

const Container = styled.div`
  width: 100%;
  height: 5rem;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #9B9B9B;
  display: flex;
  flex-direction: row;
  /* margin-left: 1rem; */
  align-items: center;
  gap: 2rem;
  background-color: #F5F5F5;
`;

const Wrapper = styled.div`
  margin-left : auto;
  margin-right: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  /* justify-content: flex-end; */

`;

const Label = styled.div`
  font-weight: bold;
  cursor: pointer;
  color: #6E7D9C;
  /* color: white; */
  font-size: 18px;
  border: solid 2px;
  border-color: #6E7D9C;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  /* background-color: #6E7D9C; */
`;
