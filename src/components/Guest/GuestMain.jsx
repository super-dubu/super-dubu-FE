import styled from "styled-components";
import room from "../../img/room.png";
import office from "../../img/officetel.png";
import apart from "../../img/apartment.png";
import house from "../../img/house.png";
import shop from "../../img/shop.png";

import { useNavigate } from "react-router-dom";

const GuestMain = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate("/sell", { state: { category } });
  };

  return (
    <GuestContainer>
      <SearchBar>
        <SearchInput placeholder="검색 키워드를 입력해주세요" />
      </SearchBar>
      <CardContainer>
        <Card onClick={() => handleNavigate("원/투룸")}>
          <img src={room} alt="원/투룸" />
          <CardText>원/투룸</CardText>
        </Card>
        <Card onClick={() => handleNavigate("오피스텔")}>
          <img src={office} alt="오피스텔" />
          <CardText>오피스텔</CardText>
        </Card>
        <Card onClick={() => handleNavigate("아파트")}>
          <img src={apart} alt="아파트" />
          <CardText>아파트</CardText>
        </Card>
        <Card onClick={() => handleNavigate("주택/빌라")}>
          <img src={house} alt="주택/빌라" />
          <CardText>주택/빌라</CardText>
        </Card>
        <Card onClick={() => handleNavigate("상가/사무실")}>
          <img src={shop} alt="상가/사무실" />
          <CardText>상가/사무실</CardText>
        </Card>
      </CardContainer>
      <FooterSpacer />
      <Footer />
    </GuestContainer>
  );
};

export default GuestMain;

const GuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #eaeef5;
`;

const SearchBar = styled.div`
  position: relative;
  padding: 2rem 0px 0px 0px;
  width: 60%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-left: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 18%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`;

const CardText = styled.p`
  font-size: 16px;
  color: #333;
`;

const FooterSpacer = styled.div`
  height: 50px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: #797878;
  height: 22rem;
`;
