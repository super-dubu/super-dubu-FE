import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../MemberHeader';
import getData from '../../../hooks/GetData'
import { ContractContext } from '../../api/ContractContext';

function Contract2() {
  // const [address, setAddress] = useState("");
  // const [detailAddress, setDetailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCheckbox, setSelectedCheckbox] = useState({
    contractType: "",
    unpaidTax: "",
    date: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { PNU, itemInfo } = location.state || {};
  console.log(itemInfo);

  const {itemLog, setItemLog} = useContext(ContractContext);
    console.log("Contract2", itemLog);

  // 데이터 로딩
  // const { data: building, isLoading, isError } = getData(
  //   `HLF/getBuilding?tokenID=${PNU}`
  // );

  useEffect(() => {
    if (itemLog && itemInfo) {
      setIsLoading(false);
    }
  }, [itemLog, itemInfo]);

  const handleCheckboxChange = (key, value) => {
    setSelectedCheckbox((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // // 로딩 상태 처리
  // if (!itemLog) {
  //   return <p>로딩 중...</p>;
  // }

  // // 에러 상태 처리
  // if (isError) {
  //   return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  // }

  // 데이터가 로드된 후 렌더링
  // const contractItem = building?.data?.result;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Header />
      <Container>
        <Title>임차 주택의 표시</Title>
        <InputContainer>
          <Address>
            <Row>
              <BoldText>소재지</BoldText>
              <String variant="medium">
                {itemInfo?.buildingAddress || "기본 주소"}
              </String>
            </Row>
            <Row>
              <BoldText></BoldText>
              <String variant="long">
                {itemInfo?.buildingName + " " + itemInfo?.hosu || "상세 주소"}
              </String>
            </Row>
          </Address>
          <Area>
            <Can>
              <Row>
                <BoldText>토지</BoldText>
                지목 &nbsp;<StringInput variant="medium" disabled/>
              </Row>
              <Row>
                <BoldText></BoldText>
                면적 &nbsp;<StringInput variant="medium" disabled/> ㎡
              </Row>
            </Can>
            <Can>
              <Row>
                <BoldText>건물</BoldText>
                지목 &nbsp;<StringInput variant="medium"></StringInput>
              </Row>
              <Row>
                <BoldText />
                면적 &nbsp; <String variant="medium">{itemInfo?.area / 100}</String> ㎡
              </Row>
            </Can>
          </Area>
          <Address>
            <BoldText>계약의 종류</BoldText>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox.contractType === "신규 계약"}
                onChange={() => handleCheckboxChange("contractType","신규 계약")}
              />
              신규 계약
            </Label>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox.contractType === "재계약"}
                onChange={() => handleCheckboxChange("contractType","재계약")}
              />
              합의에 의한 재계약
            </Label>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox.contractType === "갱신 계약"}
                onChange={() => handleCheckboxChange("contractType","갱신 계약")}
              />
              [주택임대차보호법] 제 6조의 3의 계약갱신요구권 행사에 의한 갱신 계약
            </Label>
          </Address>
        </InputContainer>
        <CheckContainer>
          <Box>
            <BoldText>미납 국세･지방세</BoldText>
                <br />
                <Label>
                    <CheckBox
                        type="checkbox"
                        checked={selectedCheckbox.unpaidTax === '해당 없음'}
                        onChange={() => handleCheckboxChange('unpaidTax','해당 없음')}
                    />
                    해당 없음
                </Label>
                <br />
                <Label>
                    <CheckBox
                        type="checkbox"
                        checked={selectedCheckbox.unpaidTax === '해당 있음'}
                        onChange={() => handleCheckboxChange('unpaidTax','해당 있음')}
                    />
                    해당 있음(중개대상물 확인‧설명서 제2쪽 Ⅱ.개업공인중개사 세부 확인사항 ‘⑨ 실제 권리관계 또는 공시되지 않은 물건의 권리사항’에 기재)
              </Label>
            </Box>
        </CheckContainer>
        <CheckContainer>
          <Box>
            <BoldText>선순위 확정일자 현황</BoldText>
                <br />
                <Label>
                    <CheckBox
                        type="checkbox"
                        checked={selectedCheckbox.date === '해당 없음'}
                        onChange={() => handleCheckboxChange('date','해당 없음')}
                    />
                    해당 없음
                </Label>
                <br />
                <Label>
                    <CheckBox
                        type="checkbox"
                        checked={selectedCheckbox.date === '해당 있음'}
                        onChange={() => handleCheckboxChange('date','해당 있음')}
                    />
                    해당 있음(중개대상물 확인‧설명서 제2쪽 Ⅱ.개업공인중개사 세부 확인사항 ‘⑨ 실제 권리관계 또는 공시되지 않은 물건의 권리사항’에 기재)
              </Label>
            </Box>
        </CheckContainer>
        <Button onClick={() => navigate("/member/contract/3")}>다음</Button>
      </Container>
    </div>
  );
}

export default Contract2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 3rem;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-style: solid;
  border-width: 1px;
  padding: 1rem;

  &:last-child {
    border-top: 0px;
  }
`;

const AddressButton = styled.button`
  background-color: white;
  border-width: 1px;
  margin-left: 10px;
  height: 2.2rem;
  border-radius: 5px;
`;

const BoldText = styled.div`
  font-weight: bold;
  text-align: left;
  width: 10rem;
  padding-left: 1rem;
  font-size: 18px;
`;

const String = styled.div`
  border-color: #848484;
  border-width: 0.8px;
  border-style: solid;
  height: 2rem;
  margin-right: 3px;
  width: auto;
  padding: 0 5px 0 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ variant }) =>
    variant === 'long'
      ? css`
          min-width: 400px;
        `
      : variant === 'medium'
      ? css`
          min-width: 320px;
        `
      : css`
          min-width: 150px;
        `}
`;

const StringInput = styled.input`
  border-color: #848484;
  border-width: 0.8px;
  border-style: solid;
  height: 2rem;
  margin-right: 3px;
  width: auto;
  padding: 0 5px 0 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ variant }) =>
    variant === "long"
      ? css`
          min-width: 400px;
        `
      : variant === 'medium'
      ? css`
          min-width: 320px;
        `
      : css`
          min-width: 150px;
        `}
`;

const Area = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 0 1px 1px 1px;
`;

const Can = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 50%;
  border-style: solid;
  border-width: 0px 1px 0px 0px;

  &:last-child {
    border-width: 0px;
  }
`;

const CheckBox = styled.input`
  margin-left: 1rem;
`;

const Label = styled.label`
  margin-right: 2rem;
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 2rem;
  width: 80%;
`;

const Box = styled.div`
  height: 7rem;
  background-color: #f1f1f1;
  border-radius: 20px;
  border: solid 1px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  height: 4rem;
  margin: 3rem;
  border-radius: 15px;
  border-style: none;
  background-color: #6e7d9c;
  font-size: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
