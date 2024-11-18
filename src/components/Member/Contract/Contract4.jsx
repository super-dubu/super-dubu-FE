import React, { useState } from 'react'
import Header from '../MemberHeader';
import styled from 'styled-components';

function Contract4() {
    const [selectedCheckbox, setSelectedCheckbox] = useState('');

    const handleCheckboxChange = (value) => {
        setSelectedCheckbox(value);
    };
    const userName = localStorage.getItem("userName");
  return (
    <div>
        <Header userName={userName}/>
        <Container>
            <SectionTitle><Bold>제 3조(입주 전 수리)</Bold>  임대인과 임차인은 임차주택의 수리가 필요한 시설물 및 비용부담에 관하여 다음과 같이 합의한다.</SectionTitle>
            <RepairOptions>
                <Row>
                    <Label>수리 필요 시설</Label>
                    <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '없음'}
                      onChange={() => handleCheckboxChange('없음')}
                  />
                  없음
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '있음'}
                      onChange={() => handleCheckboxChange('있음')}
                  />
                  있음
                </Row>
                <Row>
                <Label>수리 완료 시기</Label>
                잔금 지급 기일인 &nbsp; <InputString />년 &nbsp;<InputString />월 &nbsp;<InputString />일까지
                </Row>
                <Row>
                    <Label>약정한 수리 완료 시기까지 <br />미 수리한 경우</Label>
                    <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '공제'}
                      onChange={() => handleCheckboxChange('공제')}
                  />
                  수리비를 임차인이 임대인에게 지급하여야 할 보증금 또는 차임에서 공제
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '기타'}
                      onChange={() => handleCheckboxChange('기타')}
                  />
                  기타 <InputString />
                </Row>
            </RepairOptions>
            <Divider />
            <NoteTitle><Bold>제 4조(임차주택의 사용·관리·수선) 조항</Bold>
                <CheckBoxContainer>
                <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '확인'}
                      onChange={() => handleCheckboxChange('확인')}
                  />
                  확인
                </CheckBoxContainer>
            </NoteTitle>
            <Note>
            ① 임차인은 임대인의 동의 없이 임차주택의 구조변경 및 전대나 임차권 양도를 할 수 없으며, 임대차 목적인 주거 이외의 용도로 사용할 수 없다. <br /><br />

            ② 임대인은 계약 존속 중 임차주택을 사용·수익에 필요한 상태로 유지하여야 하고, 임차인은 임대인이 임차주택의 보존에 필요한 행위를 하는 때 이를 거절하지 못한다. <br /><br />

            ③ 임대인과 임차인은 계약 존속 중에 발생하는 임차주택의 수리 및 비용부담에 관하여 다음과 같이 합의한다. <br />
                &nbsp; &nbsp;다만, 합의되지 아니한 기타 수선비용에 관한 부담은 민법, 판례 기타 관습에 따른다.<br /><br />

            ④ 임차인이 임대인의 부담에 속하는 수선비용을 지출한 때에는 임대인에게 그 상환을 청구할 수 있다. <br />

            </Note>
            <Responsibility>
                <ResRow>
                    <Label>임대인 부담</Label>
                    <InputString large placeholder='예컨대, 난방, 상․하수도, 전기시설 등 임차주택의 주요설비에 대한 노후·불량으로 인한 수선은 민법 제623조, 판례상 임대인이 부담하는 것으로 해석됨 '/>
                </ResRow>
                <ResRow>
                    <Label>임차인 부담</Label>
                    <InputString large placeholder='예컨대, 난방, 상․하수도, 전기시설 등 임차주택의 주요설비에 대한 노후·불량으로 예컨대, 임차인의 고의․과실에 기한 파손, 전구 등 통상의 간단한 수선, 소모품 교체 비용은 민법 제623조, 판례상 임차인이 부담하는 것으로 해석됨인한 수선은 민법 제623조, 판례상 임대인이 부담하는 것으로 해석됨 '/>
                </ResRow>
            </Responsibility>
        </Container>
    </div>
  )
}

export default Contract4

const Bold = styled.span`
    font-weight: bold;
`

const Container = styled.div`
    display: grid;
    grid-template-areas:
    "section-title"
    "repair-options"
    "divider"
    "note-title"
    "note"
    "responsibility"
    "next-button";
  grid-template-columns: 1fr; /* 전체 너비를 차지 */
  gap: 1rem; /* 요소 사이의 간격 */
  padding: 2rem;
  width: 80%;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  grid-area: section-title;
  text-align: center;
  /* font-weight: bold; */
  font-size: 1.2rem;
`;

const RepairOptions = styled.div`
  grid-area: repair-options;
  display: grid;
  grid-template-rows: repeat(3, auto);
  /* gap: 1rem; */
  background-color: #F1F1F1;
`;

const Row = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    border-style: solid;
    border-width: 1px 1px 0 1px;

    &:last-child{
        border-width: 1px;
    }
`;

const CheckBox = styled.input`
    &:last-child{
        margin-left: 1rem;
    }
`;

const CheckBoxContainer = styled.div`
  display:flex;
  flex-direction: row;
`;

const NoteTitle = styled.div`
  margin-top: 2rem;
  grid-area: note-title;
  font-size: 20px;
  display: flex;
  justify-content: space-between; /* 양쪽 끝에 배치 */
  align-items: center; /* 수직 가운데 정렬 */

`;

const Label = styled.label`
  width: 15rem; /* Label의 고정 너비 설정 */
  border-style: solid;
  border-width: 0 1px 0 0;
  padding: 0.5rem;
  /* display: inline-block; */
  margin-right: 2rem; /* 오른쪽 여백 */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  text-align: center;
  font-weight: bold;
`;

const Note = styled.div`
  grid-area: note;
  font-size: 18px;
  color: #000000;
  border: solid 1px;
  padding: 1rem;
`;

const Responsibility = styled.div`
  grid-area: responsibility;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  flex-direction: column;
  border: solid 1px;


`;

const NextButtonContainer = styled.div`
  grid-area: next-button;
  text-align: center;
  margin-top: 2rem;
`;

const Divider = styled.div`
  grid-area: divider;
  width: 100%;
  height: 0.8px;
  background-color: black; /* 색상을 설정하려면 background-color 사용 */
  margin: 1rem auto; /* 가운데 정렬과 여백 추가 */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputString = styled.input`
    width: ${(props) => (props.large ? '70rem' : '3rem')};
    height: auto;
`;

// 버튼 스타일링
const NextButton = styled.button`
  background-color: #6e7d9c;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ResRow = styled.div`
    display:flex;
    flex-direction: row;
`;
