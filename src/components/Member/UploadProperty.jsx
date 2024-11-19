import { debounce } from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../Member/MemberHeader';
import styled, { css } from 'styled-components';
import DaumPostModal from '../api/DaumPost';
import Detail from './UploadPropertyDetail';
import { AuthContext } from "../api/AuthContext"
import GetData from "../../hooks/GetData"
import axios from "axios";

function UploadProperty() {
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [debouncedDetailAddress, setDebouncedDetailAddress] = useState('');

    const { data: item, isLoading, isError } = GetData("/HLF/getBuildings");
    const { user } = useContext(AuthContext);

    const Property = {
        tokenID: "",
        buildingName: "",
        hosu: "",
        buildingAddress: "",
        area: "",
        priceRental: "",
        priceMonthly: "",
        buildingType: "",
        itemType: "",
        floorInfo: "",
        availabeDate: "",
        roomCount: "",
        bathroom: "",
        confirmDate: "",
        parking: "",
        manageFee: "",
        body: "",
        image: "https://via.placeholder.com/150",
        owner: "이상현",
        member: user.member.agentName,
        memberRegister: user.member.registerID,
        memberOffice: user.member.officeName,
        memberNumber: user.member.agentPhone
    }

    // Debounced change handler
    const debouncedChangeHandler = debounce((value) => {
        setDebouncedDetailAddress(value);
    }, 3000); // 3초 지연

    const handleCheckboxChange = (value) => {
        setSelectedCheckbox(value);
    };

    const handlePostModal = () => {
        setPostModalOpen(!isPostModalOpen);
    };

    const handleAddressComplete = (data) => {
        setAddress(data.address);
        setPostModalOpen(false);
        console.log(data.address)
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setDetailAddress(value); // 실시간으로 업데이트
        // debouncedChangeHandler(value); // 3초 지연 후 마지막 값 저장
    };

    useEffect(() => {
        // Debounced function 취소를 위해 cleanup 함수 반환
        return () => {
            debouncedChangeHandler.cancel();
        };
    }, []);

    useEffect(() => {
        if (debouncedDetailAddress) {
            console.log("Debounced Detail Address:", debouncedDetailAddress); // 마지막 데이터만 로그 출력
        }
    }, [debouncedDetailAddress]);

    return (
        <div>
            <Header userName={'오채린'} showLogout={true} />
            <Container>
                <Title>매물 등록</Title>
                <InputTitle>기본 정보</InputTitle>
                <Basic>
                    <Set>
                        <BoldText>매물 분류</BoldText>
                        <DropDown>
                            <DropDownOption>원/투룸</DropDownOption>
                            <DropDownOption>오피스텔</DropDownOption>
                            <DropDownOption>아파트</DropDownOption>
                            <DropDownOption>주택/빌라</DropDownOption>
                            <DropDownOption>상가/사무실</DropDownOption>
                        </DropDown>
                    </Set>
                    <Set>
                        <BoldText>거래 종류</BoldText>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '전세'}
                                onChange={() => handleCheckboxChange('전세')}
                            />
                            전세
                        </Label>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '월세'}
                                onChange={() => handleCheckboxChange('월세')}
                            />
                            월세
                        </Label>
                    </Set>
                </Basic>
                <InputTitle>소재지</InputTitle>
                <Basic>
                    <Set>
                        <BoldText>주소</BoldText>
                        <StringInput variant="middle" value={address} placeholder={address || '기본 주소'} readOnly />
                        <AddressButton onClick={handlePostModal}>주소 검색</AddressButton>
                    </Set>
                    <Set>
                        <BoldText>상세 주소</BoldText>
                        <StringInput
                            variant="long"
                            value={detailAddress}
                            onChange={handleAddressChange}
                            placeholder={detailAddress || '(선택) 000동 000호 형식으로 작성해주세요.'} // 실시간으로 업데이트
                        />
                    </Set>
                </Basic>
                <InputTitle>가격 정보 </InputTitle>
                <Basic>
                    <Set>
                        <BoldText>보증금</BoldText>
                        <StringInput variant="short" />
                        만 원
                    </Set>
                    {selectedCheckbox !== '전세' && (
                            <>
                                <Set>
                        <BoldText>월세</BoldText>
                        <StringInput variant="short" />
                        만 원
                    </Set>
                            </>
                        )}
                    
                    <Set>
                        <BoldText>월 관리비</BoldText>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '없음'}
                                onChange={() => handleCheckboxChange('없음')}
                            />
                            없음
                        </Label>
                        <Label>
                            <CheckBox
                                type="checkbox"
                                checked={selectedCheckbox === '있음'}
                                onChange={() => handleCheckboxChange('있음')}
                            />
                            있음
                        </Label>
                        {selectedCheckbox !== '없음' && (
                            <>
                                <StringInput variant="short" />
                                만 원
                            </>
                        )}
                 
                    </Set>

                </Basic>
                {isPostModalOpen && (
                    <DaumPostModal onComplete={handleAddressComplete} onClose={handlePostModal} />
                )}
                <Detail />
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
    border-width: 1px 1px 0 1px;
`;

const Set = styled.div`
    display: flex;
    flex-direction: row;
    height : 2.5rem;
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
  margin-right: 3px;

  ${({ variant }) =>
    variant === 'long'
      ? css`
          width: 300px;
        `
      : variant === 'medium'
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
