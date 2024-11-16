import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import DaumPostModal from '../../api/DaumPost'; // DaumPostModal 가져오기

function Contract2() {
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedCheckbox, setSelectedCheckbox] = useState('');

    const handleCheckboxChange = (value) => {
        setSelectedCheckbox(value);
    };

  const handlePostModal = () => {
    setPostModalOpen(!isPostModalOpen);
  };

  const handleAddressComplete = (data) => {
    setAddress(data.address);
    setPostModalOpen(false);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setDetailAddress(value); // 실시간으로 업데이트
    // debouncedChangeHandler(value); // 필요 시 추가
  };

  return (
    <div>
      <Container>
        <Title>임차 주택의 표시</Title>
        <InputContainer>
          <Address>
            <Row>
              <BoldText>소재지</BoldText>
              <StringInput
                variant="medium"
                value={address}
                placeholder={address || '기본 주소'}
                readOnly
              />
              <AddressButton onClick={handlePostModal}>주소 검색</AddressButton>
            </Row>
            <Row>
              <BoldText></BoldText>
              <StringInput
                variant="long"
                value={detailAddress}
                placeholder="상세 주소"
                onChange={handleAddressChange}
              />
            </Row>
          </Address>
          <Area>
            <Can>
              <Row>
                <BoldText>토지</BoldText>
                지목 &nbsp;<StringInput variant="medium"/> ㎡
              </Row>
              <Row>
                <BoldText></BoldText>
                면적 &nbsp;<StringInput variant="medium"/> ㎡
              </Row>
            </Can>
            <Can>
              <Row>
                <BoldText>건물</BoldText>
                지목 &nbsp;<StringInput variant="medium"/> ㎡
              </Row>
              <Row>
                <BoldText />
                면적 &nbsp; <StringInput variant="medium"/> ㎡
              </Row>
            </Can>
          </Area>
          <Address>
            <BoldText>계약의 종류</BoldText>
                <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '신규 계약'}
                                onChange={() => handleCheckboxChange('신규 계약')}
                            />
                            신규 계약
                        </Label>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '재계약'}
                                onChange={() => handleCheckboxChange('재계약')}
                            />
                            합의에 의한 재계약
                        </Label>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '갱신 계약'}
                                onChange={() => handleCheckboxChange('갱신 계약')}
                            />
                            [주택입대차보호법] 제 6조의 3의 계약갱신요구권 행사에 의한 갱신 계약
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
                      checked={selectedCheckbox === '없음'}
                      onChange={() => handleCheckboxChange('없음')}
                  />
                  없음
              </Label>
              <br />
              <Label>
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '있음'}
                      onChange={() => handleCheckboxChange('있음')}
                  />
                  있음(중개대상물 확인‧설명서 제2쪽 Ⅱ. 개업공인중개사 세부 확인사항 ‘⑨ 실제 권리관계 또는 공시되지 않은 물건의 권리사항’에 기재)
            </Label>
          </Box>
          <Box>
          <BoldText>미납 국세･지방세</BoldText>
              <br />
              <Label>
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '해당 없음'}
                      onChange={() => handleCheckboxChange('해당 없음')}
                  />
                  해당 없음
              </Label>
              <br />
              <Label>
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '해당 있음'}
                      onChange={() => handleCheckboxChange('해당 있음')}
                  />
                  해당 있음(중개대상물 확인‧설명서 제2쪽 Ⅱ.개업공인중개사 세부 확인사항 ‘⑨ 실제 권리관계 또는 공시되지 않은 물건의 권리사항’에 기재)
            </Label>
          </Box>
        </CheckContainer>
        <Button onClick = {() => navigate('/member/contract3')}>다음</Button>
      </Container>

      {/* 모달을 조건부로 렌더링 */}
      {isPostModalOpen && (
        <DaumPostModal onComplete={handleAddressComplete} onClose={handlePostModal} />
      )}
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

  &:last-child{
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

const StringInput = styled.input`
  border-color: #848484;
  border-width: 0.8px;
  height: 2rem;
  margin-right: 3px;

  ${({ variant }) =>
    variant === 'long'
      ? css`
          width: 400px;
        `
      : variant === 'medium'
      ? css`
          width: 320px;
        `
      : css`
          width: 150px;
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
  display:flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 50%;
  border-style: solid;
  border-width: 0px 1px 0px 0px;

  &:last-child{
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
  background-color: #F1F1F1;
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
    background-color: #6E7D9C;
    font-size: 20px;
    color: white;
    font-weight: bold;
`;