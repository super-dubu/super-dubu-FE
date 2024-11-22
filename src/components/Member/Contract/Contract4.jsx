import React, { useContext, useEffect, useState } from 'react'
import Header from '../MemberHeader';
import styled from 'styled-components';
import { AuthContext } from '../../api/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ContractContext } from '../../api/ContractContext';

function Contract4() {
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const {itemLog, setItemLog} = useContext(ContractContext);
    console.log("Contract4", itemLog);
  
    const navigate = useNavigate();

    useEffect(() => {
      // 오늘 날짜를 가져오기
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환

      // tradeDate에 오늘 날짜 저장
      setItemLog((prev) => ({
          ...prev,
          tradeDate: formattedDate,
      }));
  }, [setItemLog]);

    const handleCheckboxChange = (value) => {
        setSelectedCheckbox(value);
    };

 
  return (
    <div>
        <Header />
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
                  <Guitar>
                  <CheckBox
                      type="checkbox"
                      checked={selectedCheckbox === '기타'}
                      onChange={() => handleCheckboxChange('기타')}
                  />
                  기타 &nbsp;<InputString /></Guitar>
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
                    <InputString large placeholder='예컨대, 임차인의 고의․과실에 기한 파손, 전구 등 통상의 간단한 수선, 소모품 교체 비용은 민법 제623조, 판례상 임차인이 부담하는 것으로 해석됨인한 수선은 민법 제623조, 판례상 임대인이 부담하는 것으로 해석됨 '/>
                </ResRow>
            </Responsibility>
            <Divider2 />
            <UseTitle>제 4조(임차주택의 사용·관리·수선)  조항</UseTitle>
            <Note2>
            <Bold>제5조(계약의 해제)</Bold> 임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지급하기 전까지, 임대인은 계약금의 배액을 상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.<br /><br />

            <Bold>제6조(채무불이행과 손해배상)</Bold> 당사자 일방이 채무를 이행하지 아니하는 때에는 상대방은 상당한 기간을 정하여 그 이행을 최고하고 계약을 해제할 수 있으며, 그로 인한 손해배상을 청구할 수 있다. 다만, 채무자가 미리 이행하지 아니할 의사를 표시한 경우의 계약해제는 최고를 요하지 아니한다.<br /><br />

            <Bold>제7조(계약의 해지)</Bold> ① 임차인은 본인의 과실 없이 임차주택의 일부가 멸실 기타 사유로 인하여 임대차의 목적대로 사용할 수 없는 경우에는 계약을 해지할 수 있다. <br />
            ② 임대인은 임차인이 2기의 차임액에 달하도록 연체하거나, 제4조 제1항을 위반한 경우 계약을 해지할 수 있다. <br />
            <Bold>제8조(갱신요구와 거절)</Bold> ① 임차인은 임대차기간이 끝나기 6개월 전부터 2개월 전까지의 기간에 계약갱신을 요구할 수 있다. 다만, 임대인은 자신 또는 그 직계존속·직계비속의 실거주 등 주택임대차보호법 제6조의3 제1항 각 호의 사유가 있는 경우에 한하여 계약갱신의 요구를 거절할 수 있다.<br /><br />
            ② 임대인이 주택임대차보호법 제6조의3 제1항 제8호에 따른 실거주를 사유로 갱신을 거절하였음에도 불구하고 갱신요구가 거절되지 아니하였더라면 갱신되었을 기간이 만료되기 전에 정당한 사유 없이 제3자에게 주택을 임대한 경우, 임대인은 갱신거절로 인하여 임차인이 입은 손해를 배상하여야 한다.<br />
            ③ 제2항에 따른 손해배상액은 주택임대차보호법 제6조의3 제6항에 의한다.<br /><br />

                <Bold>제9조(계약의 종료)</Bold> 임대차계약이 종료된 경우에 임차인은 임차주택을 원래의 상태로 복구하여 임대인에게 반환하고, 이와 동시에 임대인은 보증금을 임차인에게 반환하여야 한다. 다만, 시설물의 노후화나 통상 생길 수 있는 파손 등은 임차인의 원상복구의무에 포함되지 아니한다. <br /><br />
                
                <Bold>제10조(비용의 정산)</Bold> ① 임차인은 계약종료 시 공과금과 관리비를 정산하여야 한다. <br />
            ② 임차인은 이미 납부한 관리비 중 장기수선충당금을 임대인(소유자인 경우)에게 반환 청구할 수 있다. 다만, 관리사무소 등 관리주체가 장기수선충당금을 정산하는 경우에는 그 관리주체에게 청구할 수 있다. <br /><br />
                <Bold>제11조(분쟁의 해결)</Bold> 임대인과 임차인은 본 임대차계약과 관련한 분쟁이 발생하는 경우, 당사자 간의 협의 또는 주택임대차분쟁조정위원회의 조정을 통해 호혜적으로 해결하기 위해 노력한다. <br /><br />

                <Bold>제12조(중개보수 등)</Bold> 중개보수는 거래 가액의 <InputString />%인  <InputString />원으로 임대인과 임차인이 각각 부담한다. 다만, 개업공인중개사의 고의 또는 과실로 인하여 중개의뢰인간의 거래행위가 무효‧취소 또는 해제된 경우에는 그러하지 아니하다.<br /><br />

                <Bold>제13조(중개대상물확인․설명서 교부)</Bold> 개업공인중개사는 중개대상물 확인․설명서를 작성하고 업무보증관계증서(공제증서등) 사본을 첨부하여           <InputString /> 년         <InputString /> 월         <InputString /> 일 임대인과 임차인에게 각각 교부한다.
            </Note2>
            <Button onClick = {() => navigate('/member/contract/5')}>다음</Button>
        </Container>
    </div>
  )
}

export default Contract4

const Guitar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
`;

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
    "divider2"
    "use-title"
    "note2"
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
    padding: 5px;

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
  /* margin-left: 2rem; */
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
  padding: 1rem;

`;

const NextButtonContainer = styled.div`
  grid-area: next-button;
  text-align: center;
  margin-top: 2rem;
`;

const Divider = styled.div`
  grid-area: divider;
  width: 100%;
  height: 0.5px;
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
  height: ${(props) => (props.large ? '2rem' : 'auto')}; /* 높이 조정 */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 ...으로 표시 */
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
    /* gap: 1rem; */
`;

const Divider2 = styled.div`
    grid-area: divider2;
    width: 100%;
  height: 0.5px;
  background-color: black; 
  margin: 1rem auto; 
  margin-top: 3rem;
`;

const UseTitle = styled.div`
  grid-area: use-title;
  /* text-align: center; */
  font-weight: bold;
  font-size: 1.2rem;
`;

const Note2 = styled.div`
  font-size: 18px;        
  color: #000000;
  border: solid 1px;
  padding: 1rem;
`;

const Button = styled.button`
    grid-area: next-button;
    width: 60%;
    height: 4rem;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 15px;
    border-style: none;
    background-color: #6E7D9C;
    font-size: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;

`;