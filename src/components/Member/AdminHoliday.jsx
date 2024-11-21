import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { Button } from "@mui/material";

function AdminHoliday() {
  const [value, setValue] = useState(dayjs()); // 현재 날짜로 초기값 설정

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarContainer>
          <DatePicker
            label="휴무일 선택"
            value={value}
            onChange={(newValue) => setValue(newValue)} // 날짜 선택 핸들러
          />
          &nbsp;~&nbsp; 
          <DatePicker
            label="휴무일 선택"
            value={value}
            onChange={(newValue) => setValue(newValue)} // 날짜 선택 핸들러
          />
        </CalendarContainer>
      </LocalizationProvider>
      <SelectedDate>
        {value ? `선택한 날짜: ${value.format('YYYY-MM-DD')}` : '날짜를 선택하세요'}
      </SelectedDate>
      {value && <Button variant="contained">휴무일 등록</Button>}
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
