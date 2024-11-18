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
            <SectionTitle>제 3조(입주 전 수리)  임대인과 임차인은 임차주택의 수리가 필요한 시설물 및 비용부담에 관하여 다음과 같이 합의한다.</SectionTitle>
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
            <Note />
            
            <Divider />
        </Container>
    </div>
  )
}

export default Contract4

const Container = styled.div`
    display: grid;
    grid-template-areas:
    "section-title"
    "repair-options"
    "repair-schedule"
    "note"
    "responsibility"
    "next-button";
  grid-template-columns: 1fr; /* 전체 너비를 차지 */
  gap: 1rem; /* 요소 사이의 간격 */
  padding: 2rem;
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
    
`;

const Label = styled.label`
  width: 15rem; /* Label의 고정 너비 설정 */
  border-style: solid;
  border-width: 0 1px 0 0;
  padding: 0.5rem;
  display: inline-block; /* Label의 크기를 고정 너비에 맞추기 위해 inline-block 설정 */
  margin-right: 2rem; /* 오른쪽 여백 */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  text-align: center;
  font-weight: bold;
`;

const Note = styled.div`
  grid-area: note;
  font-size: 0.9rem;
  color: #666;
`;

const Responsibility = styled.div`
  grid-area: responsibility;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const NextButtonContainer = styled.div`
  grid-area: next-button;
  text-align: center;
  margin-top: 2rem;
`;

const Divider = styled.div`
  width: 80%;
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
    width: 3rem;
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
