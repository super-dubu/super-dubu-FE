import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function Contract3() {

    const navigate = useNavigate();
  return (
    <div>Contract3
        <Button onClick={() => navigate('/member/contract4')}></Button>
    </div>
  )
}

export default Contract3

const Button = styled.button`
    
`;