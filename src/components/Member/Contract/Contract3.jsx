import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function Contract3() {

    const navigate = useNavigate();
  return (
    <div>
        <Container>
             <Title>계약 내용</Title>
             <Text><Bold>제1조(보증금과 차임 및 관리비)</Bold> 위 부동산의 임대차에 관하여 임대인과 임차인은 합의에 의하여 보증금과 차임 및 관리비를 아래와 같이 지불하기로 한다.</Text>
             <Table>
                <Row>
                    <Label>보증금</Label>
                    <InputRow>금 <Input large /> 원정 <Input large placeholder='₩'/></InputRow>
                </Row>
                <Row>
                    <Label>계약금</Label>
                    <InputRow>금 <Input large /> 원정 <Input large placeholder='₩'/>은 계약시에 지불하고 영수함. &nbsp; 영수자 <Input /></InputRow>
                </Row>
                <Row>
                    <Label>중도금</Label>
                    <InputRow>금 <Input large /> 원정 <Input large placeholder='₩'/>은  <Input />년  <Input />월  <Input />일에 지불하며</InputRow>
                </Row>
                <Row>
                    <Label>잔금</Label>
                    <InputRow>금  <Input large /> 원정 <Input large placeholder='₩'/>은  <Input />년  <Input />월  <Input />일에 지불한다</InputRow>
                </Row>
                <Row>
                    <Label>차임(월세)</Label>
                    <InputRow> 금<Input large />는 원정은 매월 <Input />일에 지불한다. (입금 계좌 : <Input large /> )</InputRow>
                </Row>
                <Row>
                    <Label>관리비</Label>
                    <InputRow>
                        <Wrapper>                        
                            <Text className="special-text">(정액인 경우) 총액 금 <Input /> 원정 (\<Input large />) <GrayText>월 10만원 이상인 경우 세부금액 기재</GrayText></Text>
                            <Divider />
                        <CostContainer>
                            <Can>
                                <InputRow><Option>일반관리비</Option> 금 <Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>수도료</Option> 금 <Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>난방비</Option> 금 <Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>TV 사용료</Option> 금 <Input />원정(\<Input />)</InputRow>
                            </Can>
                            <Can>
                                <InputRow><Option>전기료</Option> 금<Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>가스 사용료</Option> 금 <Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>인터넷 사용료</Option> 금 <Input />원정(\<Input />)</InputRow>
                                <InputRow><Option>기타 관리비</Option> 금 <Input />원정(\<Input />)</InputRow>
                            </Can>
                        </CostContainer>
                        <Divider />
                        <Text className="special-text">(정액이 아닌 경우)<GrayText>관리비의 항목 및 산정 방식을 기재(예: 세대별 사용량 비례, 세대수 비례)</GrayText></Text>
                        <TextArea />
                        </Wrapper>

                    </InputRow>
                </Row>
             </Table>
             <Text><Bold>제2조(임대차기간)</Bold> 임대인은 임차주택을 임대차 목적대로 사용‧수익할 수 있는 상태로 <Input />년  <Input />월 <Input />일까지 임차인에게 인도하고, <br />
             임대차기간은 인도일로부터  <Input />년  <Input />월 <Input />일까지로 한다. </Text>
            <Button onClick={() => navigate('/member/contract4')}>다음</Button>
        </Container>
    </div>
  )
}

export default Contract3

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
`;


const Button = styled.button`
    width: 60%;
    height: 4rem;
    /* margin: 0 auto; */
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 15px;
    border-style: none;
    background-color: #6E7D9C;
    font-size: 20px;
    color: white;
    font-weight: bold;
`;

const Text = styled.div`
    padding: 1rem;
    text-align: center;

    &.special-text{
        margin-right: auto;
    }
`;

const Bold = styled.span`
  font-weight:Bold ;
`;

const Table = styled.div`
    width: 80%;
    margin-top: 1rem;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-style: solid;
    border-width: 1px 1px 0 1px;

    &:last-child{
        border-width: 1px;
    }
`;

const Label = styled.div`
    width: 10%;
    border-style: solid;
    border-width: 0 1px 0 0;
    padding: 1rem;
    font-weight: bold;
    text-align: center;
    height: 100%;
`;

const InputRow = styled.div`
    padding-left: 1rem;
    display: flex;
    /* flex-direction: column; */
`;

const Input = styled.input`
  width: ${(props) => (props.large ? '12rem' : '5rem')};  
  margin-left: 5px;
  margin-right: 5px;
  border-width: 0 0 1px 0;
`;

const GrayText = styled.span`
    font-size: 12px;
    color: gray;
    margin-left: 10px;
`;

const Divider = styled.div`
  width: 80%;
  height: 0.5px;
  background-color: black; 
  margin: 1rem 0 1rem 0;
`;

const Can = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
    width: 50%;
    padding-right: 3rem;

    &:first-child{
        border-width: 0 1px 0 0;
        border-style: solid;
    }
`;

const CostContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

const Option = styled.span`
    width: 10rem;
    text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  /* border-style: solid;
  border-width: 0 0 0 1px; */
`;

const TextArea = styled.textarea`
  border: solid 1px;
  width: 100%;
  margin-bottom: 2rem;
  height: 7rem;
`;