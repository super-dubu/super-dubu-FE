import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { Button } from "@mui/material";

function AdminHoliday() {
  const [selectedDates, setSelectedDates] = useState(null); // 날짜 범위 상태

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          onChange={setSelectedDates} // 날짜 또는 범위 선택 핸들러
          value={selectedDates} // 선택된 날짜 또는 범위
          selectRange // 날짜 범위 선택 활성화
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
        />
      </CalendarContainer>
      <SelectedDate>
        {selectedDates
          ? `선택한 날짜: ${selectedDates[0].toLocaleDateString()} ~ ${selectedDates[1].toLocaleDateString()}`
          : '휴무일을 선택하세요'}
      </SelectedDate>
      {selectedDates ? <Button>휴무일 등록</Button> : ''}
    </Container>
  );
}

export default AdminHoliday;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 1rem 0 1rem;
  justify-content: center;
`;

const SelectedDate = styled.div`
  margin-top: 3rem;
  font-size: 18px;
  color: #555;
  font-weight: bold;
  margin-bottom: 1rem;
`;

// const Button = styled.button`
//     width: 60%;
//     height: 3rem;
//     margin: 3rem;
//     border-radius: 15px;
//     border-style: none;
//     background-color: #6E7D9C;
//     font-size: 18px;
//     color: white;
//     font-weight: bold;
//     cursor: pointer;
// `;