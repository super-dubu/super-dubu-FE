import React from 'react'
import Header from '../MemberHeader'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Contract5() {
    const navigate = useNavigate();
  return (
    <div>
        <Header />
        <Container>
            <Title>특약 사항</Title>
            <Note>- 주택을 인도받은 임차인은 2024년 10월 16일까지 주민등록(전입신고)과 주택임대차계약서상 확정일자를 받기로 하고, 임대인은 위 약정일자의 다음날까지 임차주택에 저당권 등 담보권을 설정할 수 없다.<br /><br />

                    - 임대인이 위 특약에 위반하여 임차주택에 저당권 등 담보권을 설정한 경우에는 임차인은 임대차계약을 해제 또는 해지할 수 있다. 이 경우 임대인은 임차인에게 위 특약 위반으로 인한 손해를 배상하여야 한다.<br /><br />

                    - 임대차계약을 체결한 임차인은 임대차계약 체결 시를 기준으로 임대인이 사전에 고지하지 않은 선순위 임대차 정보(주택임대차보호법 제3조의6 제3항)가 있거나 미납 또는 체납한 국세･지방세가 <Input />원을 초과하는 것을 확인한 경우 임대차기간이 시작하는 날까지 제5조에도 불구하고 계약금 등의 명목으로 임대인에게 교부한 금전 기타 물건을 포기하지 않고 임대차계약을 해제할 수 있다.<br /><br />

                    - 주택임대차계약과 관련하여 분쟁이 있는 경우 임대인 또는 임차인은 법원에 소를 제기하기 전에 먼저 주택임대차분쟁조정위원회에 조정을 신청한다. (<Checkbox type="checkbox" name="a"/>동의 <Checkbox type="checkbox" name="a"/>미동의 )<br /><br />

                    ※ 주택임대차분쟁조정위원회 조정을 통할 경우 60일(최대 90일) 이내 신속하게 조정 결과를 받아볼 수 있습니다.<br /><br />

                    - 주택의 철거 또는 재건축에 관한 구체적 계획  (<Checkbox type="checkbox" name="b" />있음 <Checkbox type="checkbox" name="b"/>없음 ) (공사시기 : <Input />      ※ 소요기간 : <Input />개월)<br /><br />

                    상세주소가 없는 경우 임차인의 상세주소부여 신청에 대한 소유자 동의여부  (<Checkbox type="checkbox" name="c"/>동의 <Checkbox type="checkbox" name="c"/>미동의)</Note>
             <Label>기타 특약 사항 작성</Label>
            <SpecialInput />
            <Button onClick={() => navigate('/member/contract6')}>다음</Button>
        </Container>
    </div>
  )
}

export default Contract5

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-top: 3rem;

`;

const Note = styled.div`
    border: solid 1px;
    padding: 1rem;
    width: 80%;
    margin-top: 2rem;
`;

const SpecialInput = styled.textarea`
    width: 80%;
    padding: 1rem;
    height: 10rem;
    border: solid 1px;
`;

const Label = styled.div`
    margin-top: 5rem;
    width: 82%;
    text-align: left;
    margin-bottom: 8px;
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
    cursor: pointer;
`;

const Input = styled.input`
    width: 3rem;
`;

const Checkbox = styled.input.attrs({ type: 'radio' })`
    
`;