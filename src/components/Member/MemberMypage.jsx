import React from 'react'
import Header from '../Member/MemberHeader'
import styled from 'styled-components'
import SideBar from './MemberSide';

function MemberMypage({userName}) {
  return (
    <div>
      <Header userName={'오채린'} showLogout={true}/>
      <Container>
        <SideBar userName={'오채린'}/>
        <Content>
          <BookingList>
            <BookingTitle>상담 예약 내역</BookingTitle>
            <BookBox>
              <BookContent />
              <BookContent />
              <BookContent />
            </BookBox>
          </BookingList>
          <SellList>
            <SellBox>
              <SellContent />
              <SellContent />
              <SellContent />
            </SellBox>
          </SellList>
        </Content>
      </Container>
    </div>
  )
}

export default MemberMypage

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const BookingList = styled.div`
  background-color: #F5F5F5;
  width: 100%;
  height: 22rem;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: #9B9B9B;

`;

const BookingTitle = styled.div`
  margin: 1.5rem 0 0 1.5rem;
  font-size: 18px;
  font-weight: bold;
  color: #121212;
`;

const BookBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem 0 0 1.5rem;
`;

const BookContent = styled.div`
  width: 17rem;
  height: 15rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const SellList = styled.div`
  
`;

const SellBox = styled.div`
  
`;

const SellContent = styled.div`
  
`;

