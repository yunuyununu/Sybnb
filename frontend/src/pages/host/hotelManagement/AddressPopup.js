/* global kakao */
import React from "react";
import DaumPostcode from "react-daum-postcode";
const {kakao} = window;

function AddressPopup() {

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log("주소 data : " + JSON.stringify(data))
        console.log("주소 fullAddress : " + fullAddress)
        console.log("주소 zonecode : " + data.zonecode)
        
        // 위도 및 경도 좌푯값 구하기
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.roadAddress, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
            console.log('위도 : ' + result[0].y);
            console.log('경도 : ' + result[0].x);
            }
        });
    };
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "500px",
        height: "500px",
        padding: "3px",
        // bgColor: "", 			// 바탕 배경색
        // searchBgColor: "", 		// 검색창 배경색
        // contentBgColor: "", 		// 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        // pageBgColor: "", 		// 페이지 배경색
        // textColor: "", 			// 기본 글자색
        // queryTextColor: "", 		// 검색창 글자색
        // postcodeTextColor: "", 	// 우편번호 글자색
        // emphTextColor: "", 		// 강조 글자색
        // outlineColor: "" 		// 테두리
      };

    return (
        <DaumPostcode onComplete={handleComplete} />
    )
};

export default AddressPopup;