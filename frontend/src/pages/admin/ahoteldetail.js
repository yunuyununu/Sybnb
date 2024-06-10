import React, {useEffect, useState } from 'react';
import { BuildingFill, PersonVcard } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import '../admin/css/astyles.css'; 
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import Sidebar from './sidebar';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return [data, loading, error];
}

function AHoteldetail() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const a_id = cookies.get("a_id");
    const { hoIdx } = useParams();
    const [data, loading, fetchError] = useFetch(`http://localhost/admin/ahodetail?hoIdx=${hoIdx}`);

        const getlevel = (h_level) => {
            if (h_level == 8) {
                return '호스트';
            } else if (h_level == 9) {
                return '슈퍼호스트';
            } 
            };

        const getStatus = (ho_status) => {
            switch (ho_status) {
                case 1:
                    return (<td style={{ color: "green",fontWeight: 'bold' }}>승인 대기</td>);
                case 2:
                    return (<td style={{ color: "blue",fontWeight: 'bold' }}>영업 중</td>);
                case 3  :
                    return (<td style={{ color: "red",fontWeight: 'bold' }}>영업 중지 신청</td>);

                default :
                    return (<td style={{ color: "coral" ,fontWeight: 'bold'}}>영업 재개 신청</td>);
            }
        };

        const urlHandle = (e) => {
            window.open(`http://localhost/static/images/host/hotel/${data.dto[0].ho_img}`, 'width=500, height=500');         
        };

        const url = (e) => {
            window.open(`http://localhost/static/images/host/profile/${data.dto[0].h_file}`, 'width=400, height=400');
        };

        const urlBank = (e) => {
            window.open(`http://localhost/static/images/host/profile/${data.dto[0].h_bankbook}`, 'width=400, height=400');
        };

        

        const btnApprove = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 등록 승인 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#41774d86',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotel?ho_idx=${hoIdx}&ho_status=2`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 등록되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                                window.location.reload();
                            } else {
                                Swal.fire({
                                title: '에러 발생',
                                text: '처리 중 문제가 발생했습니다.',
                                icon: 'error',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#41774d86',
                            });
                        }
                      })
                }
            });
        };

        const btnStop = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 영업 중지 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#d33',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotelClose?ho_idx=${hoIdx}&ho_status=3`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 영업 중지되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                                window.location.reload();
                            } else {
                                Swal.fire({
                                    title: '에러 발생',
                                    text: '처리 중 문제가 발생했습니다.',
                                    icon: 'error',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                });
                            }
                        })
                }
            });
        };
        
        const btnStart = (hoIdx) => {
            Swal.fire({
                title: `${data.dto[0].h_name}님의 호텔 영업 재개 신청`,
                text: '승인하시겠습니까?',
                confirmButtonText: '확인',
                cancelButtonText: "취소",
                showCancelButton: true,
                icon: 'question',
                iconColor: '#41774d86',
                confirmButtonColor: '#41774d86',
                cancelButtonColor: '#838383d2',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost/admin/approveHotel?ho_idx=${hoIdx}&ho_status=2`, {
                        method: 'POST',
                    })
                        .then(response => {
                            if (response.ok) {
                                Swal.fire({
                                    title: '승인 완료',
                                    text: `${data.dto[0].ho_name}이 영업 재개되었습니다.`,
                                    icon: 'success',
                                    confirmButtonText: '확인',
                                    confirmButtonColor: '#41774d86',
                                   
                                }); 
                                window.location.reload();
                            } else {
                                throw new Error('Error approving hotel');
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: '에러 발생',
                                text: '처리 중 문제가 발생했습니다.',
                                icon: 'error',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#41774d86',
                            });
                        });
                }
            });
        };

        if (loading) {
            return <div>Loading...</div>;
        }

        if (fetchError) {
            return <div>Error loading data.</div>;
        }

        return (
            <>
                <div className="container-fluid">
                    <div className="row"> 
                        <Sidebar/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="container">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" style={{cursor : 'default', backgroundColor: 'white' }}>Hotel</li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{cursor : 'default', backgroundColor: 'white' }}>{data.dto[0].h_name}님의 {data.dto[0].ho_name} 상세 정보</li>
                                </ol>

                                <div className="card-style mb-30">
                                    <h3><PersonVcard size={35} /> 호스트 정보</h3><br />
                                    <div className="profile-card1">
                                        <table className="tbl1">
                                            <tbody>
                                                <tr>
                                                    <th>이름</th>
                                                    <td>{data.dto[0].h_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>이메일</th>
                                                    <td>{data.dto[0].h_email}</td>
                                                </tr>
                                                <tr>
                                                    <th >사업자 등록증/등록번호</th>
                                                    <td>등록증:{data.dto[0].h_file.length === 1 ? (
                                                data.dto[0].h_file
                                                ) : (
                                                <button type="button" className="btn btn-link" onClick={urlBank} style={{cursor: "pointer"}}>
                                                 {data.dto[0].h_file}
                                                </button> 
                                            )}<br/>
                                             등록번호: {data.dto[0].h_business} </td>
                                                </tr>
                                                <tr>
                                                    <th >호스트 등급</th>
                                                    <td>{getlevel(data.dto[0].h_level)}</td>
                                                
                                                </tr>
                                                <tr>
                                                    <th>연락처</th>
                                                    <td>{data.dto[0].h_phone}</td>
                                                </tr>
                                                <tr>
                                                <th>통장사본/계좌번호</th>
                                                <td>통장사본:
                                                {data.dto[0].h_bankbook.length === 1 ? (
                                                    data.dto[0].h_bankbook
                                                ) : (
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-link" 
                                                        onClick={urlBank} 
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {data.dto[0].h_bankbook}
                                                    </button>
                                                )} 
                                                <br/>
                                                 계좌번호: {data.dto[0].h_accountnum}
                                            </td>
                                            </tr>
                                                <tr>
                                                    <th>가입일</th>
                                                    <td>{data.dto[0].h_regdate.split('T')[0]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card-style mb-30">
                                    <h3><BuildingFill size={35} /> 호텔 상세</h3>
                                    <br />
                                    <table className="tbl1">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>호텔 대표 이미지</th>
                                                <td>
                                                    [이미지] <a href="#" style={{ border: "0px", outline: "none"  }} onClick={urlHandle}> {data.dto[0].ho_img}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>호텔 등급</th>
                                                <td >{data.dto[0].ho_level}등급</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>객실정보</th>
                                                <td>
                                                    <table className="nested-tbl" style={{display: 'inline'}}>
                                                        <tbody>
                                                          {data.dto.map((item) => (
                                                            <tr><td style={{fontWeight: 'bold'}}>{item.d_room_type}</td>
                                                            <td>{item.roomCount}개  가격: {item.d_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                                                            <td>면적: {item.d_area}㎡</td>
                                                            <td>수용인원: {item.d_capacity}명</td>
                                                            <td>침대수: {item.d_beds}개</td>
                                                            <td>금연실 여부: {item.d_non_smoking}</td>
                                                            </tr>
                                                          ))

                                                          }
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>주소</th>
                                                <td>{data.dto[0].ho_address}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }} >체크인</th>
                                                <td>{data.dto[0].ho_check_in}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }} >체크아웃</th>
                                                <td>{data.dto[0].ho_check_out}</td>
                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>편의시설</th>
                                                <tr>           
                                                     {data.dto[0].mountain_view == 'Y'? <td><img src='/img/mountain.png' width="47.1px" height="47.1px" /> 산전망</td> : ''}
                                                     {data.dto[0].ocean_view == 'Y'? <td><img src='/img/ocean.png' width="47.1px" height="47.1px" /> 바다 전망</td> : ''}
                                                     {data.dto[0].wifi == 'Y'? <td><img src='/img/wifi.png' width="47.1px" height="47.1px" /> 무선인터넷</td> : ''}
                                                     {data.dto[0].parking_lot == 'Y'? <td><img src='/img/parking.png' width="47.1px" height="47.1px" /> 주차장</td> : ''}
                                                     {data.dto[0].breakfast == 'Y'? <td><img src='/img/breakfast.png' width="47.1px" height="47.1px" /> 조식제공</td> : ''}
                                                     {data.dto[0].fire_alam == 'Y'? <td><img src='/img/firealam.png' width="47.1px" height="47.1px" /> 화재경보기</td> : ''}
                                                     {data.dto[0].fire_extinguisher == 'Y'? <td><img src='/img/fireExt.png' width="47.1px" height="47.1px" /> 소화기</td>  : ''}                                                                              
                                                </tr>

                                            </tr>
                                            <tr>
                                                <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>소개</th>
                                                <td>{data.dto[0].ho_description == null? '없음' : data.dto[0].ho_description}</td>
                                            </tr>
                                            <tr>
                                                    <th colSpan={2} style={{ backgroundColor: '#4e817269' }}>영업상태</th>
                                                    <td>{getStatus(data.dto[0].ho_status)}</td>
                                                  
                                                    <td colSpan={3}>

                                                    {(data.dto[0].ho_status) === 1 && (
                                                        <button type="button" className="btn btn-primary" onClick={() => btnApprove(data.dto[0].ho_idx)}>승인</button>
                                                
                                                    )}

                                                    {(data.dto[0].ho_status) === 3 &&   (
                                                        <button type="button" className="btn btn-danger" onClick={() => btnStop(data.dto[0].ho_idx)} >영업 중지</button>
                                                   
                                                    )}  
                                                    {(data.dto[0].ho_status )=== 3 && (                                                       
                                                    <button type="button" className="btn btn-success" onClick={() => btnStart(data.dto[0].ho_idx)} >영업 재개</button>
                                                    )} 
                                                    </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br/><br/>
                        </main>
                    
                    </div>
                </div>
            </>
        );
    }


export default AHoteldetail;