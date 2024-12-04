import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";

const GuestHeader = () => {
  const navigate = useNavigate();

  return (
    <Header>
      <Logo src={logo} onClick={() => navigate("/")} />
      <RightContainer>
        <StyledLogin onClick={() => navigate("/member/login")}>
          중개사 Login
        </StyledLogin>
      </RightContainer>
    </Header>
  );
};

export default GuestHeader;

const Header = styled.div`
  width: 100%;
  height: 5rem;
  border-style: solid;
  border-width: 0 0 1.2px 0;
  border-color: #9b9b9b;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding-left: 1.5rem;
  width: 130px;
  height: auto;
  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
  line-height: 5rem;
  gap: 2.5rem;
`;

const StyledButton = styled.div`
  color: #6e7d9c;
  font-weight: 800;
  font-size: 22px;
  cursor: pointer;
`;

const StyledLogin = styled.div`
  color: #cacaca;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #cacaca;
  border-radius: 10px;
  height: 40px;
  width: 100px; /* 버튼의 너비를 설정하여 일관된 크기를 유지 */
  display: flex;
  align-items: center;
  justify-content: center; /* 텍스트를 중앙에 배치 */
`;
