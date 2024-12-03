// DaumPostModal.jsx
import React from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";

function DaumPostModal({ onComplete, onClose }) {
  return (
    <ModalBackground>
      <Modal>
        <DaumPostCode
          onComplete={(data) => {
            onComplete(data);
            onClose(); // 주소 선택 후 모달 닫기
          }}
        />
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </Modal>
    </ModalBackground>
  );
}

export default DaumPostModal;

// 스타일 정의
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  margin-top: 10px;
`;
