import React, { useState } from 'react'
import Header from '../MemberHeader'
import styled, { css } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cryptoJs from 'crypto-js';

function Contract1() {
    const ENC_KEY = import.meta.env.VITE_ENC_KEY;
  
    const [nameLessor, setNameLessor] = useState("");
    const [idLessor, setIdLessor] = useState("");
    const [isLessorAuthComplete, setIsLessorAuthComplete] = useState(false);
  
    const [nameLessee, setNameLessee] = useState("");
    const [idLessee, setIdLessee] = useState("");
    const [isLesseeAuthComplete, setIsLesseeAuthComplete] = useState(false);
  
    const [selectedCheckbox, setSelectedCheckbox] = useState("");

    const location = useLocation();
    const { PNU } = location.state || {};
    console.log(PNU, "PNU");
  
    const navigate = useNavigate();
  
    const handleAuth = async (type) => {
      try {
        const name = type === "lessor" ? nameLessor : nameLessee;
        const id = type === "lessor" ? idLessor : idLessee;
  
        const hashedCode = cryptoJs.SHA256(name + id + ENC_KEY).toString();
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/HLF/auth`,
          {
            params: { name: decodeURI(name), code: hashedCode },
          }
        );
        console.log(response);
        alert(`${type === "lessor" ? "임대인" : "임차인"} 신원 인증 성공`);
        if (type === "lessor") {
          setIsLessorAuthComplete(true);
        } else {
          setIsLesseeAuthComplete(true);
        }
      } catch (error) {
        alert(`${type === "lessor" ? "임대인" : "임차인"} 신원 인증 실패`);
        console.error(error);
      }
    };
  
    const handleCheckboxChange = (value) => {
      setSelectedCheckbox(value);
    };
  
    const isButtonEnabled =
      isLessorAuthComplete &&
      isLesseeAuthComplete &&
      selectedCheckbox === "동의함";

    
  
    return (
      <div>
        <Header />
        <Container>
          <Title>주택 임대차 표준 계약</Title>
          <CertContainer>
            <CertBox>
              <InputContainer>
                <BoldText>임대인</BoldText>
                <Row>
                  <BoldText>이름</BoldText>
                  <StringInput
                    value={nameLessor}
                    onChange={(e) => setNameLessor(e.target.value)}
                  />
                </Row>
                <Row>
                  <BoldText>주민등록번호</BoldText>
                  <StringInput
                    value={idLessor}
                    onChange={(e) => setIdLessor(e.target.value)}
                  />
                </Row>
              </InputContainer>
              <AuthButton
                onClick={() => handleAuth("lessor")}
                disabled={isLessorAuthComplete}
              >
                {isLessorAuthComplete ? "인증완료" : "인증하기"}
              </AuthButton>
            </CertBox>
            <CertBox>
              <InputContainer>
                <BoldText>임차인</BoldText>
                <Row>
                  <BoldText>이름</BoldText>
                  <StringInput
                    value={nameLessee}
                    onChange={(e) => setNameLessee(e.target.value)}
                  />
                </Row>
                <Row>
                  <BoldText>주민등록번호</BoldText>
                  <StringInput
                    value={idLessee}
                    onChange={(e) => setIdLessee(e.target.value)}
                  />
                </Row>
              </InputContainer>
              <AuthButton
                onClick={() => handleAuth("lessee")}
                disabled={isLesseeAuthComplete}
              >
                {isLesseeAuthComplete ? "인증완료" : "인증하기"}
              </AuthButton>
            </CertBox>
          </CertContainer>
          <Divider />
          <AgreeContainer>
            <AgreeTitle>개인정보 수집 및 이용 동의</AgreeTitle>
            <AgreeText>
            1. 개인정보 수집 항목 및 이용 목적 <br />
                        본인은 본인확인 및 서명 절차를 위해 다음과 같은 개인정보가 수집 및 이용됨에 동의합니다. <br /> <br />
                        수집 항목 : 이름, 주민등록번호 <br />
                        이용 목적 : 본인 확인, 계약 서명 및 관련 서비스 제공, 게약 이행 및 사후 관리<br /> <br />
                        2. 개인정보 보유 및 이용 기간<br />
                        수집된 개인정보는 법령에 따른 보유 기간 동안 또는 본인확인 및 계약 절차의 이행을 위하여 필요한 기간 동안 보관됩니다. 보관 기간이 종료된 후에는 개인정보 보호법에 따라 지체 없이 파기됩니다.
                        <br /> <br />
                        3. 동의 거부 권리 및 불이익 안내 <br />
                        귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 본 동의가 없을 경우 본인확인 및 계약 서명 등 서비스 제공이 제한될 수 있습니다.
                        <br /> <br />
                        4. 개인 정보 제 3자 제공 및 위탁에 대한 안내 <br />
                        귀하의 개인정보는 원칙적으로 제3자에게 제공되지 않습니다. 다만, 법령에 따라 제3자에게 제공이 필요할 경우 사전에 안내드리겠습니다. <br /> <br />
                        본인은 위 내용을 충분히 이해하였으며, 이에 동의합니다.
              <Label>
                <CheckBox
                  type="checkbox"
                  checked={selectedCheckbox === "동의함"}
                  onChange={() => handleCheckboxChange("동의함")}
                />
                동의함
              </Label>
              <Label>
                <CheckBox
                  type="checkbox"
                  checked={selectedCheckbox === "동의하지 않음"}
                  onChange={() => handleCheckboxChange("동의하지 않음")}
                />
                동의하지 않음
              </Label>
            </AgreeText>
          </AgreeContainer>
          <Button
            onClick={() => navigate("/member/contract/2", { state: { PNU } })}
            disabled={!isButtonEnabled} // 조건을 기반으로 비활성화
          >
            계속 진행하기
          </Button>
        </Container>
      </div>
    );
  }
  
  export default Contract1;

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

const CertContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* gap: 3rem; */
    /* border-style: solid;
    border-width: 0.8px; 모든 면에 동일한 border 적용 */
    width: 80%;
    height: 10rem;
`;

const CertBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-style: solid;
    border-width: 0.8px 0.8px 0.8px 0.8px;
    width: 50%;
    
    &:last-child {
        border-width: 0.8px 0.8px 0.8px 0;
    }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


const BoldText = styled.div`
    font-weight: bold;
    text-align: left;
    width: 10rem;
    align-self: center;
    text-align: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StringInput = styled.input`
   background-color: #efeff4;
  border-color: #848484;
  border-width: 0.8px;
  height: 1.5rem;
  width: 14rem;

`;

const AuthButton = styled.button`
    height: 4.5rem;
    width: 3rem;
    margin-top: 36px;
`;

const Divider = styled.hr`
    color: #9b9b9b;
    height: 0.5px;
    width: 80%;
    margin-top: 3rem;
    /* border: none; */
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