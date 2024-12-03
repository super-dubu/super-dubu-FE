import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import cryptoJs from "crypto-js";
import styled from "styled-components";
import Header from "../Member/MemberHeader";
import { QRCodeCanvas } from "qrcode.react";

const UploadAuth = () => {
  const location = useLocation();
  const { Property } = location.state || {};
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const isButtonEnabled = isVerified && selectedCheckbox === "동의함";

  const generatedHash = cryptoJs.SHA256(Date.now()).toString().slice(2, 12);

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  const handleUpload = async () => {
    try {
      const propertyResponse = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/forsale/add`,
        Property
      );
      alert("매물 등록이 완료되었습니다.");
      navigate("/member/mypage");
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("매물 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // 폴링으로 인증 상태 확인
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/hlf/verifyauth`,
          {
            params: {
              qrID: generatedHash,
            },
          }
        );
        if (response?.status === 200) {
          setIsVerified(true);
          clearInterval(interval); // 폴링 중지
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
      }
    }, 3000); // 3초마다 확인

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 폴링 중지
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>매물 등록 인증 페이지</Title>
        <Plz>
          *휴대폰으로 QR 코드를 스캔하여 인증한 후 매물 등록을 마무리하세요.
        </Plz>
        <QRBox>
          {isVerified ? (
            <div>인증이 확인되었습니다</div>
          ) : (
            <QRCodeCanvas
              value={`${import.meta.env.VITE_FRONT_URL}/member/propAuth/${generatedHash}`}
              size={300}
            />
          )}
        </QRBox>
        <Divider />
        <AgreeContainer>
          <AgreeTitle>개인정보 수집 및 이용 동의</AgreeTitle>
          <AgreeText>
            1. 개인정보 수집 항목 및 이용 목적 <br />
            본인은 본인확인 및 서명 절차를 위해 다음과 같은 개인정보가 수집 및
            이용됨에 동의합니다. <br /> <br />
            수집 항목 : 이름, 주민등록번호 <br />
            이용 목적 : 본인 확인, 계약 서명 및 관련 서비스 제공, 게약 이행 및
            사후 관리
            <br /> <br />
            2. 개인정보 보유 및 이용 기간
            <br />
            수집된 개인정보는 법령에 따른 보유 기간 동안 또는 본인확인 및 계약
            절차의 이행을 위하여 필요한 기간 동안 보관됩니다. 보관 기간이 종료된
            후에는 개인정보 보호법에 따라 지체 없이 파기됩니다.
            <br /> <br />
            3. 동의 거부 권리 및 불이익 안내 <br />
            귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
            다만, 본 동의가 없을 경우 본인확인 및 계약 서명 등 서비스 제공이
            제한될 수 있습니다.
            <br /> <br />
            4. 개인 정보 제 3자 제공 및 위탁에 대한 안내 <br />
            귀하의 개인정보는 원칙적으로 제3자에게 제공되지 않습니다. 다만,
            법령에 따라 제3자에게 제공이 필요할 경우 사전에 안내드리겠습니다.{" "}
            <br /> <br />
            본인은 위 내용을 충분히 이해하였으며, 이에 동의합니다.
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox === "동의함"}
                onChange={() => handleCheckboxChange("동의함")}
              />
              동의함
            </Label>
            <CheckBox
              type="checkbox"
              checked={selectedCheckbox === "동의 하지않음"}
              onChange={() => handleCheckboxChange("동의 하지않음")}
            />
            동의하지 않음
          </AgreeText>
        </AgreeContainer>
        <Button
          onClick={() => handleUpload()}
          disabled={!isButtonEnabled} // 조건을 기반으로 비활성화
        >
          매물 등록하기
        </Button>
      </Container>
    </>
  );
};

export default UploadAuth;

const Plz = styled.p`
  color: #c75f5f;
`;

const QRBox = styled.div`
  width: 80%;
  height: 25rem;
  border: solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 5rem;
  font-size: 32px;
  font-weight: bold;
  color: #121212;
  margin-bottom: 3rem;
`;

const AgreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const AgreeTitle = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
`;

const AgreeText = styled.div`
  border: solid;
  border-width: 1px;
  padding: 1rem;
`;

const CheckBox = styled.input`
  margin-left: 2rem;
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const Button = styled.button`
  width: 40%;
  height: 4rem;
  margin: 3rem;
  border-radius: 15px;
  border-style: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#6E7D9C")};
  font-size: 20px;
  color: ${(props) => (props.disabled ? "#666" : "white")};
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const Divider = styled.hr`
  color: #9b9b9b;
  height: 0.5px;
  width: 80%;
  margin-top: 3rem;
  /* border: none; */
`;
