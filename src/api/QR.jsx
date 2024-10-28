import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";

const QRpage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <InfoContainer>
          <QRCodeContainer>
            <QRCodeCanvas value="ExampleURL.com" size={150} />
          </QRCodeContainer>
          <InfoItem>
            <Label>매물 번호 : </Label>
            <Value>00ab3276</Value>
          </InfoItem>
          <InfoItem>
            <Label>소재지 : </Label>
            <Value>서울시 관악구 은천로37길 5</Value>
          </InfoItem>
          <InfoItem>
            <Label>건물 : </Label>
            <Value>근린생활시설</Value>
          </InfoItem>
          <InfoItem>
            <Label>계약방법 : </Label>
            <Value>월세</Value>
          </InfoItem>
          <InfoItem>
            <Label>계약금 : </Label>
            <Value>2000(만 원)</Value>
          </InfoItem>
          <InfoItem>
            <Label>특약 : </Label>
            <Value>-</Value>
          </InfoItem>
        </InfoContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default QRpage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 900px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin-bottom: 10px;
  padding: 5px;
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
`;

const Value = styled.div`
  color: #666;
`;
