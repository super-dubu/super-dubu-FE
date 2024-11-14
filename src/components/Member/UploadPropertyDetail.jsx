import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';


function UploadPropertyDetail() {
    const navigate = useNavigate();
    const handleUploadProperty = () => {
        alert('매물 등록이 완료되었습니다.')
    }

    const [postImg, setPostImg] = useState([]);
const [previewImg, setPreviewImg] = useState([]);

function handleFileUpload(e) {
    const fileArr = Array.from(e.target.files);
    setPostImg(fileArr);

    const fileURLs = [];
    fileArr.forEach((file) => {
        const fileRead = new FileReader();
        fileRead.onload = () => {
            fileURLs.push(fileRead.result);
            // 모든 파일을 읽은 후에 상태 업데이트
            if (fileURLs.length === fileArr.length) {
                setPreviewImg(fileURLs);
            }
        };
        fileRead.readAsDataURL(file);
    });
}

  return (
    <div>
        <Container>
            <InputTitle>상세 정보</InputTitle>
            <Basic>
                <Row>
                    <Content>
                        <BoldText>총 층수</BoldText>
                        <StringInput variant='small' placeholder='해당 층'/>&nbsp;/&nbsp;
                        <StringInput variant='small' placeholder='전체 층' />
                    </Content>
                    <Content>
                        <BoldText>입주 가능일</BoldText>
                        <StringInput variant='medium' />
                    </Content>
                </Row>
                <Row>
                    <Content>
                        <BoldText>방 개수&nbsp;/&nbsp; 욕실 개수</BoldText>
                        <StringInput variant='small' placeholder='방 개수'/> &nbsp;/&nbsp;
                        <StringInput variant='small' placeholder='욕실 개수'/>
                    </Content>
                    <Content>
                        <BoldText>승인 일자</BoldText>
                        <StringInput variant='medium' />
                    </Content>
                </Row>
                <Row>
                    <Content>
                        <BoldText>면적</BoldText>
                        <StringInput variant='medium' placeholder='전용 면적'/>
                    </Content>
                    <Content>
                        <BoldText>주차 대수</BoldText>
                        <StringInput variant='medium' />
                    </Content>
                </Row>
                <Row>
                    <FullWidth>
                        <BoldText>상세 정보</BoldText>
                        <InputBox placeholder='방향, 반려 동물 허용 여부, 상권, 역세권 여부, 특이사항, 등'/>
                    </FullWidth>
                </Row>
                <Row>
                    <FullWidth>
                        <BoldText>사진 정보</BoldText>
                        <PhotoInput>
                            <PhotoInputButton type='file' multiple accept="image/*"
                                onChange={handleFileUpload}/>
                            <PhotoPreviewContainer>
                                {previewImg.map((imgSrc, index) => (
                                    <Photo key={index} src={imgSrc} alt={`preview-${index}`} />
                                ))}
                            </PhotoPreviewContainer>
                        </PhotoInput>
                    </FullWidth>
                </Row>
                <FixedRow>
                <Content>
                        <BoldText>등기부 상의 <br />소유자명</BoldText>
                        <Name>
                            <StringInput variant='medium' />
                            <Caution>*반드시 실명으로 입력해주세요</Caution>
                        </Name>
                    </Content>
                    <Content>
                        <BoldText>의뢰인과 등기부 상<br />
                            소유주와의 관계
                        </BoldText>
                        <StringInput variant='medium' placeholder='예) 본인, 어머니, 아들' />
                       
                    </Content>
                </FixedRow>
            </Basic>
        </Container>
        <Wrapper>
            <Button onClick = {() => {
                handleUploadProperty(),
                navigate('/member/mypage')
            }
            }>매물 등록하기</Button>
        </Wrapper>
    </div>
  )
}

export default UploadPropertyDetail

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`;

const InputTitle = styled.div`
    margin-top: 3rem;
    margin-left: 2.8rem;
    color: #6E7D9C;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 0.5rem;
`;

const Basic = styled.div`
    display: flex;
    margin-left: 2rem;
    margin-right: 2rem;
    /* height: 5rem; */
    flex-direction: column;
    justify-content: center;
    border-style: solid;
    border-width: 1px 0 0 1px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    /* height : 2.5rem; */
    border-bottom: 1px solid #000;
    align-items: center;
`

const FixedRow = styled.div`
    display: flex;
    flex-direction: row;
    height : 4rem;
    border-bottom: 1px solid #000;
    align-items: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    text-align: left;
    border-style: solid;
    border-width: 0 1px 0 0;
    height: 100%;
    width: 50%;
`;

const BoldText = styled.div`
    font-weight: bold;
    text-align: left;
    width: 10rem;
    padding-left: 1rem;
`;

const StringInput = styled.input`
  background-color: #efeff4;
  border-color: #848484;
  border-width: 0.8px;
  height: 1.5rem;
  /* margin-right: 3px; */
  margin: 7px 3px 7px 0;

  ${({ variant }) =>
    variant === 'long'
      ? css`
          width: 300px;
        `
      : variant === 'medium'
      ? css`
          width: 222px;
        `
      : css`
          width: 100px;
        `}
`;

const FullWidth = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    border-style: solid;
    border-width: 0 1px 0 0;
    height: 100%;
    width: 100%
`;

const InputBox = styled.textarea`
    background-color: #efeff4;
  border-color: #848484;
  border-width: 0.8px;
  height: 20rem;
  margin-right: 3px;
  margin: 10px 3px 10px 0;
  width: 63.5%;
  padding-top: 3px;
`;

const PhotoInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const PhotoInputButton = styled.input`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const PhotoPreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;  
  margin-bottom: 10px;
`;

const Photo = styled.img`
  width: 5rem;
  height: auto;
  /* margin-bottom: 10px;   */
`;

const Caution = styled.div`
    margin-top: -5px;
    font-size: 12px;
    color: #C75F5F;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column ;
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
`;
