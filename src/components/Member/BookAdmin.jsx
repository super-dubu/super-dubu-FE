import React, { useState } from "react";
import styled, { css } from "styled-components";
import Holiday from "./AdminHoliday";
import WorkHours from "./AdminWorkHours";

function BookingAdmin({ onClose }) {
  const [selectedType, setSelectedType] = useState("휴무일");
  return (
    <Overlay>
      <Modal>
        <Content>
          <Header>
            <CloseButton onClick={onClose}>X</CloseButton>
            <Menu>
              <Type
                isActive={selectedType === "휴무일"}
                onClick={() => setSelectedType("휴무일")}
              >
                휴무일
              </Type>
              <Type
                isActive={selectedType === "근무시간"}
                onClick={() => setSelectedType("근무시간")}
              >
                근무시간
              </Type>
            </Menu>
          </Header>
          <Body>
            {selectedType === "휴무일" && <Holiday />}
            {selectedType === "근무시간" && <WorkHours />}
          </Body>
        </Content>
      </Modal>
    </Overlay>
  );
}

export default BookingAdmin;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 540px;
  height: 800px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* 닫기 버튼 위치 조정을 위해 */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* 왼쪽은 메뉴, 오른쪽은 닫기 버튼 */
  align-items: center;
  width: 100%;
  height: 5rem;
  background-color: #f8f8f8;
  border-color: #7e7d7d;
  border-style: solid;
  border-width: 0 0 1px 0;
  position: relative; /* 닫기 버튼 위치 조정을 위해 */
  border-radius: 10px 10px 0 0;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%); /* 버튼을 수직 중앙에 맞춤 */
`;

const Content = styled.div`
  text-align: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 1.5rem;
  gap: 3rem;
  font-size: 18px;
  font-weight: bold;
  color: #545454;
`;

const Type = styled.div`
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 중앙 정렬 */

  ${({ isActive }) =>
    isActive &&
    css`
      color: #6e7d9c;
      font-weight: bold;
      border: solid #6e7d9c 2px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 6rem;
      height: 35px;
      border-radius: 15px;
      /* background-color: #f0f8ff; */
    `}
`;

const Body = styled.div``;
