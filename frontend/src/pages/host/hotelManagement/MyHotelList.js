import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { BuildingAdd, BuildingCheck, BuildingDash, Hearts } from "react-bootstrap-icons";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function MyHotelList() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userIdx = userInfo.h_idx;
    const userName = userInfo.h_name;
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelManagement/' + userIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div className="container">
                <h2 className="mb-30"><Hearts color="#DBC4F0" size={40}/> {userName}님의 호텔 현황입니다.<br /></h2>
                <div style={{textAlign:'right'}}>
                    <button className="main-btn mb-20" onClick={() => {                       
                        const form = new FormData();
                        form.append("userIdx", userIdx);
                        fetch(`http://localhost/host/hotel/beforeRegistCheck`, {
                            method: "POST",
                            body: form,
                        }).then((response) => response.json()
                        ).then((data) => {
                            if (data.check === "success") {
                                Swal.fire({
                                    icon: "question",
                                    title: "신규호텔 등록",
                                    html: "새로운 호텔을 등록하시나요?",
                                    confirmButtonText: "네",
                                    showCancelButton: true,
                                    cancelButtonText : "아니오"
                                }).then((result) => {
                                    if(result.isConfirmed){
                                        navigate('/host/hotel/registHotel', {
                                            state : {
                                                data : null
                                            }
                                        });
                                    }
                                })
                            } else if(data.check === "fail") {
                                Swal.fire({
                                icon: "warning",
                                title: "잠깐!",
                                html: "작성 중인 내용이 있습니다. 이어서 작성할까요?",
                                confirmButtonText: "네",
                                showCancelButton: true,
                                cancelButtonText : "아니오"
                            }).then((result) => {
                                if(result.isConfirmed){
                                    //데이터 불러와서 넘기기
                                    const form = new FormData();
                                    form.append("userIdx", userIdx);
                                    fetch(`http://localhost/host/hotel/selectTempHotel`, {
                                        method: "POST",
                                        body: form,
                                    }).then((response) => response.json())
                                    .then(data => {
                                        navigate('/host/hotel/registHotel', {
                                            state : {
                                                temp : JSON.stringify(data.temp),
                                                temp_name : JSON.stringify(data.temp.ht_name),
                                                temp_level : JSON.stringify(data.temp.ht_level),
                                                temp_floor : JSON.stringify(data.temp.ht_floor),
                                                temp_single : JSON.stringify(data.temp.ht_single),
                                                temp_double : JSON.stringify(data.temp.ht_double),
                                                temp_family : JSON.stringify(data.temp.ht_family),
                                                temp_suite : JSON.stringify(data.temp.ht_suite),
                                                temp_checkIn : JSON.stringify(data.temp.ht_check_in),
                                                temp_checkOut : JSON.stringify(data.temp.ht_check_out),
                                                temp_address : JSON.stringify(data.temp.ht_address),
                                                temp_img : JSON.stringify(data.temp.ht_img),
                                                temp_description : JSON.stringify(data.temp.ht_description)
                                            }
                                        });
                                    })
                                } else {
                                    const form = new FormData();
                                    form.append("userIdx", userIdx);
                                    fetch(`http://localhost/host/hotel/deleteTempHotel`, {
                                        method: "POST",
                                        body: form,
                                    }).then(() => {
                                        navigate('/host/hotel/registHotel', {
                                            state : {
                                                data : null
                                            }
                                        });
                                    })
                                }
                            })}
                        });
                    }}>호텔 신규 등록</button>
                </div>
                <div className="card-style mb-20">
                    <div className="mb-20"><BuildingAdd size={30} /> 승인 대기 {data.status.wait}개</div>
                    <div className="mb-20"><BuildingCheck size={30} /> 영업 중  {data.status.open}개</div>
                    <div><BuildingDash size={30} /> 영업 중지  {data.status.close}개</div>
                </div>

                <div className="card-style mb-20">
                    <table className="tbl table table-sm table-hover align-middle text-center">
                        <thead>
                             <tr>
                                <th>번호</th>
                                <th>호텔명</th>
                                <th>주소</th>
                                <th onClick={() => {
                                    
                                }}>상태</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {data.list.map((item, idx) => (
                                <tr style={{textAlign:'center'}} onClick={() => {
                                    navigate('/host/hotel/editHotel', {
                                        state : {
                                            hoIdx : item.ho_idx,
                                            hoName : item.ho_name
                                        }
                                    })
                                }}>
                                    <td>{idx + 1}</td>
                                    <td>{item.ho_name}</td>
                                    <td>{item.ho_address}</td>
                                    {item.status == "영업 중" 
                                        ? (<td style={{ color: "blue"}}>{item.status}</td>) 
                                        : item.status == "영업 중지" 
                                        ? (<td style={{ color: "red"}}>{item.status}</td>)
                                        : (<td>{item.status}</td>)
                                    }
                                </tr>
                            ))}
                            {data.list.length === 0
                                ?
                                <tr>
                                    <td colSpan={4}>
                                        등록된 호텔이 없습니다.
                                    </td>
                                </tr>
                                :''
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

export default MyHotelList;