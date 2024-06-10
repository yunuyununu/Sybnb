import React from "react";
import {useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Footer() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const a_id = cookies.get("a_id");
    const userInfo = cookies.get("userInfo");
    const g_email = cookies.get("g_email");
    // 팝업창에서 푸터 제거
    const locationNow = useLocation()
    if (locationNow.pathname === "/guest/write" ||
    locationNow.pathname === "/guest/edit") return null; 
    if (locationNow.pathname === "/host/account/manage/review" || locationNow.pathname === "/host/account/manage/reply") return null;
    if (locationNow.pathname === `/admin/alogin/${a_id}`) return null;

 
      const btnAdmin = () => {
        if (a_id != null) {
            window.location.href = `/admin/amain/${a_id.key}`;
        } else if (userInfo != null) {
            Swal.fire({
                title: '잠깐!',
                text: '로그인하려면 로그아웃 후 다시 시도하세요.',
                icon: 'warning',
                cancelButtonText: '확인'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/`);
                }
            });
        } else if (g_email != null) {
            Swal.fire({
                title: '잠깐!',
                text: '로그인하려면 로그아웃 후 다시 시도하세요.',
                icon: 'warning',
                cancelButtonText: '확인'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/`);
            }
        });
     } else {
        window.location.href = `/admin/alogin/${a_id}`;
        }
        };
    
    return (
        <div className="Footer">
            <br/>
            <div align="center" height="20px">
                <a>© 2024 sybnb, Inc.</a>&nbsp;&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>개인정보처리방침</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>이용약관</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>사이트맵</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>한국의 변경된 환불 정책</a>&nbsp;·&nbsp;
                <a href='#' style={{textDecoration: "none", color: "#262626"}}>회사 세부정보</a>&nbsp;·&nbsp;
                <a onClick={btnAdmin} style={{ textDecoration: "none", color: "#262626", cursor: "pointer" }}>관리시스템</a>
                </div>
           
            <div align="center" style={{fontSize: "10px",color: "grey"}}>
                웹사이트 제공자: sybnb Ireland UC, private unlimited company, 8 Hanover Quay Dublin 2, D02 DP23 Ireland | 이사: sys | VAT 번호: IE1234567L | 사업자 등록 번호: IE 123456 | 연락처: sybnb@sybnb.com, 웹사이트, 080-123-0230 | 호스팅 서비스 제공업체: SY 웹서비스 | sybnb는 통신판매 중개자로 sybnb 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가 아닙니다. sybnb 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.
            </div>
        </div>
    )
}

export default Footer;