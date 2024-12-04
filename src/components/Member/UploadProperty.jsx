import { debounce } from "lodash";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Member/MemberHeader";
import styled, { css } from "styled-components";
import DaumPostModal from "../api/DaumPost";
import { AuthContext } from "../api/AuthContext";
import GetData from "../../hooks/GetData";
import axios from "axios";
import Swal from "sweetalert2"

function UploadProperty() {
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [selectedItembox, setSelectedItembox] = useState("");
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [debouncedDetailAddress, setDebouncedDetailAddress] = useState("");
  const [match, setMatch] = useState({});
  const [previewImg, setPreviewImg] = useState([]);

  const [buildingType, setBuildingType] = useState("0");
  const [itemType, setItemType] = useState("");
  const [priceRental, setPriceRental] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [manageFee, setManageFee] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [parking, setParking] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const navigate = useNavigate();
  const { data: item, isLoading, isError } = GetData("/HLF/getBuildings");
  const { user } = useContext(AuthContext);
  const formData = new FormData();

  const Property = {
    tokenID: match.tokenID,
    buildingName: match.buildingName,
    hosu: match.hosu,
    buildingAddress: match.buildingAddress,
    area: match.area,
    priceRental: priceRental,
    priceMonthly: priceMonthly,
    buildingType: buildingType,
    itemType: itemType,
    floorInfo: match.floorInfo,
    availableDate: availableDate,
    roomCount: match.roomCount,
    bathroom: bathroom,
    confirmDate: match.comfirmDate,
    parking: parking,
    image: imageUrl,
    manageFee: manageFee,
    body: body,
    owner: match.owner,
    member: user?.agentName,
    memberRegister: user?.registerID,
    memberOffice: user?.officeName,
    memberNumber: user?.agentPhone,
    status: "PENDING",
  };

  const debouncedChangeHandler = debounce((value) => {
    setDebouncedDetailAddress(value);
  }, 3000);
  const handlePostModal = () => {
    setPostModalOpen(!isPostModalOpen);
  };

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };
  const handleItemTypeChange = (value) => {
    setSelectedItembox(value);
    setItemType(value);
  };
  const handleAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };
  const handleBuildingTypeChange = (e) => {
    setBuildingType(e.target.value);
  };
  const handlePriceRentalChange = (e) => setPriceRental(e.target.value);
  const handlePriceMonthlyChange = (e) => setPriceMonthly(e.target.value);
  const handleManageFeeChange = (e) => setManageFee(e.target.value);
  const handleAvailableDateChange = (e) => setAvailableDate(e.target.value);
  const handleBathroomChange = (e) => setBathroom(e.target.value);
  const handleParkingChange = (e) => setParking(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);

  const handleAddressComplete = (data) => {
    setAddress(data.address);
    setPostModalOpen(false);

    if (isLoading || isError || !item) return;

    const matched = item.data.response.find((building) => {
      const tokenIDPrefix = building.tokenID.slice(0, 17);
      const buildingCodePrefix = data.buildingCode.slice(0, 17);
      return tokenIDPrefix === buildingCodePrefix;
    });

    if (matched) {
      setMatch(matched);
    } else {
      setMatch(null);
    }
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "확인",
    });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    formData.append("tokenID", match.tokenID);
    for (let i = 0; i < files.length; i++) {
      formData.append("many", files[i], `${i + 1}`);
    }
  };

  const handleUploadProperty = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/forsale/upload`,
        formData
      );
      setImageUrl(response.data);

      if (response.data.length > 0) {
        Property.image = response.data;
        navigate("/member/uploadAuth", { state: {Property} });
      } else {
        showAlert("오류 발생", "이미지 등록을 실패했습니다.", "error");
      }
    } catch (error) {
      showAlert("오류 발생", "매물 등록 중 오류가 발생했습니다.", "error");
    }
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  useEffect(() => {
    if (debouncedDetailAddress) {
    }
  }, [debouncedDetailAddress]);

  return (
    <div>
      {user ? <Header showLogout={false} /> : ""}
      <Container>
        <Title>매물 등록</Title>
        <InputTitle>기본 정보</InputTitle>
        <Basic>
          <Set>
            <BoldText>매물 분류</BoldText>
            <DropDown value={buildingType} onChange={handleBuildingTypeChange}>
              <DropDownOption value="0">원/투룸</DropDownOption>
              <DropDownOption value="1">오피스텔</DropDownOption>
              <DropDownOption value="2">아파트/빌라</DropDownOption>
              <DropDownOption value="3">주택</DropDownOption>
              <DropDownOption value="4">상가/사무실</DropDownOption>
            </DropDown>
          </Set>
          <Set>
            <BoldText>거래 종류</BoldText>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedItembox === "0"}
                onChange={() => handleItemTypeChange("0")}
              />
              전세
            </Label>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedItembox === "1"}
                onChange={() => handleItemTypeChange("1")}
              />
              월세
            </Label>
          </Set>
        </Basic>
        <InputTitle>소재지</InputTitle>
        <Basic>
          <Set>
            <BoldText>주소</BoldText>
            <StringInput
              variant="middle"
              value={address}
              placeholder={address || "기본 주소"}
              readOnly
            />
            <AddressButton onClick={handlePostModal}>주소 검색</AddressButton>
          </Set>
          <Set>
            <BoldText>상세 주소</BoldText>
            <StringInput
              variant="long"
              value={detailAddress}
              onChange={handleAddressChange}
              placeholder={
                detailAddress || "(선택) 000동 000호 형식으로 작성해주세요."
              }
            />
          </Set>
        </Basic>
        <InputTitle>가격 정보</InputTitle>
        <Basic>
          <Set>
            <BoldText>보증금</BoldText>
            <StringInput
              variant="short"
              value={priceRental}
              onChange={handlePriceRentalChange}
            />
            만 원
          </Set>
          {selectedCheckbox !== "전세" && (
            <Set>
              <BoldText>월세</BoldText>
              <StringInput
                variant="short"
                value={priceMonthly}
                onChange={handlePriceMonthlyChange}
              />
              만 원
            </Set>
          )}
          <Set>
            <BoldText>월 관리비</BoldText>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox === "없음"}
                onChange={() => handleCheckboxChange("없음")}
              />
              없음
            </Label>
            <Label>
              <CheckBox
                type="checkbox"
                checked={selectedCheckbox === "있음"}
                onChange={() => handleCheckboxChange("있음")}
              />
              있음
            </Label>
            {selectedCheckbox !== "없음" && (
              <>
                <StringInput
                  variant="short"
                  value={manageFee}
                  onChange={handleManageFeeChange}
                />
                만 원
              </>
            )}
          </Set>
        </Basic>
        <InputTitle>상세 정보</InputTitle>
        <Basic>
          <Row>
            <DetailContent>
              <BoldText>총 층수</BoldText>
              <StringInput variant="small" placeholder="해당 층" />
              &nbsp;/&nbsp;
              <StringInput variant="small" placeholder="전체 층" />
            </DetailContent>
            <DetailContent>
              <BoldText>입주 가능일</BoldText>
              <StringInput
                variant="medium"
                value={availableDate}
                onChange={handleAvailableDateChange}
              />
            </DetailContent>
          </Row>
          <Row>
            <DetailContent>
              <BoldText>방 개수&nbsp;/&nbsp; 욕실 개수</BoldText>
              <StringInput variant="small" placeholder="방 개수" />{" "}
              &nbsp;/&nbsp;
              <StringInput
                variant="small"
                value={bathroom}
                onChange={handleBathroomChange}
              />
            </DetailContent>
            <DetailContent>
              <BoldText>승인 일자</BoldText>
              <StringInput variant="medium" />
            </DetailContent>
          </Row>
          <Row>
            <DetailContent>
              <BoldText>면적</BoldText>
              <StringInput variant="medium" placeholder="전용 면적" />
            </DetailContent>
            <DetailContent>
              <BoldText>주차 대수</BoldText>
              <StringInput
                variant="medium"
                value={parking}
                onChange={handleParkingChange}
              />
            </DetailContent>
          </Row>
          <Row>
            <FullWidth>
              <BoldText>상세 정보</BoldText>
              <InputBox
                value={body}
                onChange={handleBodyChange}
                placeholder="방향, 반려 동물 허용 여부, 상권, 역세권 여부, 특이사항 등"
              />
            </FullWidth>
          </Row>
          <Row>
            <FullWidth>
              <BoldText>사진 정보</BoldText>
              <PhotoInput>
                <PhotoInputButton
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <PhotoPreviewContainer>
                  {previewImg.map((imgSrc, index) => (
                    <Photo key={index} src={imgSrc} alt={`preview-${index}`} />
                  ))}
                </PhotoPreviewContainer>
              </PhotoInput>
            </FullWidth>
          </Row>
          <FixedRow>
            <DetailContent>
              <BoldText>
                등기부 상의 <br />
                소유자명
              </BoldText>
              <Name>
                <StringInput variant="medium" />
                <Caution>*반드시 실명으로 입력해주세요</Caution>
              </Name>
            </DetailContent>
            <DetailContent>
              <BoldText>
                의뢰인과 등기부 상<br />
                소유주와의 관계
              </BoldText>
              <StringInput
                variant="medium"
                placeholder="예) 본인, 어머니, 아들"
              />
            </DetailContent>
          </FixedRow>
        </Basic>
        {isPostModalOpen && (
          <DaumPostModal
            onComplete={handleAddressComplete}
            onClose={handlePostModal}
          />
        )}
        <Wrapper>
          <Button
            onClick={() => {
              handleUploadProperty();
            }}
          >
            신원 인증하기
          </Button>
        </Wrapper>
      </Container>
    </div>
  );
}

export default UploadProperty;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 3rem;
  font-size: 28px;
  font-weight: bold;
`;

const InputTitle = styled.div`
  margin-top: 3rem;
  margin-left: 2.8rem;
  color: #6e7d9c;
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
  border-width: 1px 1px 0 1px;
`;

const Set = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.5rem;
  border-bottom: 1px solid #000;
  align-items: center;
`;

const BoldText = styled.div`
  font-weight: bold;
  text-align: left;
  width: 10rem;
  padding-left: 1rem;
`;

const DropDown = styled.select`
  height: 1.5rem;
  width: 8rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropDownOption = styled.option``;

const CheckBox = styled.input``;

const Label = styled.label`
  margin-right: 2rem;
`;

const StringInput = styled.input`
  background-color: #efeff4;
  border-color: #848484;
  border-width: 0.8px;
  height: 1.5rem;
  margin: 5px 3px 5px 0;

  ${({ variant }) =>
    variant === "long"
      ? css`
          width: 300px;
        `
      : variant === "medium"
        ? css`
            width: 225px;
          `
        : css`
            width: 150px;
          `}
`;

const AddressButton = styled.button`
  background-color: white;
  border-width: 1px;
  margin-left: 10px;
  height: 1.7rem;
  border-radius: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  /* padding: 5px; */
  border-bottom: 1px solid #000;
  align-items: center;
`;

const FixedRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 4rem;
  border-bottom: 1px solid #000;
  align-items: center;
`;

const FullWidth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  border-style: solid;
  border-width: 0 0 0 0;
  height: 100%;
  width: 100%;
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
  /* margin-top: px; */
  font-size: 12px;
  color: #c75f5f;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  height: 4rem;
  margin: 3rem;
  border-radius: 15px;
  border-style: none;
  background-color: #6e7d9c;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  text-align: left;
  border-style: solid;
  border-width: 0 1px 0 0;
  height: 100%;
  width: 50%;

  &:last-child {
    border: none;
  }
`;
