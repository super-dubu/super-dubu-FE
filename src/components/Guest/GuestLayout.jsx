import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";
import styled from "styled-components";

const GuestLayout = () => {
  return (
    <Container>
      <StyledHeader />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default GuestLayout;

const Container = styled.div``;

const Main = styled.div``;

const StyledHeader = styled(GuestHeader)``;
