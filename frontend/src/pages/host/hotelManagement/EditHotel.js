/* global kakao */
import React, { useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import DaumPostcode from "react-daum-postcode";
import { BuildingFill, CardChecklist, CardList } from "react-bootstrap-icons";
import RoomDetail from "../hotelManagement/RoomDetail";
const {kakao} = window;

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

function EditHotel() {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userName = userInfo.h_name;
    const navigate = useNavigate();
    const location = useLocation();
    const [modal, setModal] = useState(false);
    const [hoIdx, setHoIdx] = useState(location.state?.hoIdx);
    const [hoName, setHoName] = useState(location.state?.hoName);
    const [data, loading] = useFetch('http://localhost/host/hotel/detailMyHotel?ho_idx=' + hoIdx);
    const ho_name = useRef();
    const ho_address = useRef();
    const ho_level = useRef();
    const ho_floor = useRef();
    const ho_single = useRef();
    const ho_double = useRef();
    const ho_family = useRef();
    const ho_suite = useRef();
    const ho_check_in = useRef();
    const ho_check_out = useRef();
    const ho_img = useRef();
    const ho_x = useRef();
    const ho_y = useRef();
    const ho_description = useRef();
    const [checkItems, setCheckItems] = useState([]);
    let [inputCount, setInputCount] = useState(0);
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
    }
    
    const urlHandle = (e) => {
        window.open(`http://localhost/static/images/host/hotel/${data[0].ho_img}`, '', 'width=500, height=500'); 
    } 

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [hoX, setHoX] = useState("");
    const [hoY, setHoY] = useState("");

    const clickButton  = () => {
        setIsPopupOpen(current => !current);
    }

    const selectAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let hoX = '';
        let hoY = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.roadAddress, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
            hoX = result[0].y;
            hoY = result[0].x;
            setHoX(hoX);
            setHoY(hoY);
            }   
        });
    }
        setAddress(fullAddress);
        setIsPopupOpen(false);
    };

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "500px",
        height: "500px",
        border: "1.2px solid #F7EFFC",
      };

    const themeObj = {
        bgColor: "#DBC4F0",
        outlineColor: "#F7EFFC"
      };

    const [rooms, setRooms] = useState("");
    function Modal(props) {
        function closeModal() {
          props.closeModal();
          setModal(!modal);
        }
        return (
          <div className="modal_h" onClick={closeModal}>
            <div
              className="modalBody_h"
              style={{ width: "1000px", height: "800px", padding: "30px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btnClose" onClick={closeModal}>
                X
              </button>
                <RoomDetail 
                    hoIdx={hoIdx}
                    dIdx={rooms.d_idx}
                    roomType={rooms.d_room_type}
                    capacity={rooms.d_capacity}
                    area={rooms.d_area}
                    beds={rooms.d_beds}
                    price={rooms.d_price}
                    smoking={rooms.d_non_smoking}
                    img1={rooms.d_img1}
                    img2={rooms.d_img2}
                    img3={rooms.d_img3}
              />
               {/*props.children*/}
            </div>
          </div>
        );
    }


    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let src = '';
        let image_url = '';
        if(data.fileName !== '-'){
            src = `http://localhost/static/images/host/hotel/${data[0].ho_img}`;
            image_url = `<img src=${src} width='90px' height='90px'/>`;
        } else {
            image_url = '';
        }

        let dataList = [
            {id: 0, title: '산 전망', icon: '/img/mountain.png', sts : data[0].mountain_view},
            {id: 1, title: '바다 전망', icon: '/img/ocean.png', sts : data[0].ocean_view},
            {id: 2, title: '무선인터넷', icon: '/img/wifi.png', sts : data[0].wifi},
            {id: 3, title: '주차장', icon: '/img/parking.png', sts : data[0].parking_lot},
            {id: 4, title: '조식 제공', icon: '/img/breakfast.png', sts : data[0].breakfast},
            {id: 5, title: '화재경보기', icon: '/img/firealam.png', sts : data[0].fire_alam},
            {id: 6, title: '소화기', icon: '/img/fireExt.png', sts : data[0].fire_extinguisher}
          ];
         
        const handleSingleCheck = (checked, id, sts, df) => {
            console.log("checked : " + checked);
            console.log("sts : " + sts);
            console.log("df : " + df);
            if (checked) {
                console.log("checked is true");
                console.log("id ==> " + id);
                setCheckItems(prev => [...prev, id]);  
                console.log("checkItems ==> " + checkItems);
            } else {
                setCheckItems(checkItems.filter((el) => el !== id));
            }
          };

          const handleAllCheck = (checked) => {
              if(checked) {
                const idArray = [];
                dataList.forEach((el) => idArray.push(el.id));
                setCheckItems(idArray);
              }
              else {
                setCheckItems([]);
              }
          }

        return (
            <div className="container">
                <div className="mb-20">
                    <h2>{userName}님의 {data[0].ho_name}입니다.<br />
                    </h2>
                </div>
                <div className="card-style mb-30">
                    <h3><BuildingFill size={35} /> 기본 정보</h3>
                    <table className="tbl">
                        <colgroup>
                    <col width={"20%"} />
                    <col width={"30%"} />
                    <col width={"20%"} />
                    <col width={"30%"} />
                    </colgroup>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan={2}>호텔명</th>
                                <td colSpan={2}><input style={{border:'none'}} ref={ho_name} defaultValue={data[0].ho_name}/></td>
                            </tr>
                            <tr>
                                <th>호텔 등급</th>
                                <td><input style={{border:'none'}} ref={ho_level} defaultValue={data[0].ho_level} /></td>
                                <th>호텔 층수</th>
                                <td><input style={{border:'none'}} ref={ho_floor} defaultValue={data[0].ho_floor}/></td>
                            </tr>
                            <tr>
                                <th>싱글</th>
                                <td><input style={{border:'none'}} ref={ho_single} defaultValue={data[0].ho_single} /></td>
                                <th>더블</th>
                                <td><input style={{border:'none'}} ref={ho_double} defaultValue={data[0].ho_double} /></td>
                            </tr>
                            <tr>
                                <th>패밀리</th>
                                <td><input style={{border:'none'}} ref={ho_family} defaultValue={data[0].ho_family} /></td>
                                <th>스위트</th>
                                <td><input style={{border:'none'}} ref={ho_suite} defaultValue={data[0].ho_suite} /></td>
                            </tr>
                            <tr>
                                <th>체크인</th>
                                <td><input type="time" style={{border:'none'}} ref={ho_check_in} defaultValue={data[0].ho_check_in} /></td>
                                <th>체크아웃</th>
                                <td><input type="time" style={{border:'none'}} ref={ho_check_out} defaultValue={data[0].ho_check_out} /></td>
                            </tr>
                            <tr>
                                <th colSpan={2}>주소</th>
                                <td colSpan={2}>
                                    <input style={{border:'none', width: '75%'}} ref={ho_address} value={address == '' ? data[0].ho_address : address} onChange={(e) => {setAddress(e.target.value)}} />
                                    <input type="hidden" style={{border:'none'}} ref={ho_x} onChange={(e) => {setHoX(e.target.value)}} value={hoX == '' ? data[0].ho_x : hoX}/>
                                    <input type="hidden" style={{border:'none'}} ref={ho_y} onChange={(e) => {setHoY(e.target.value)}} value={hoY == '' ? data[0].ho_y : hoY}/>
                                
                                    <button className="main-btn" style={{zIndex: 0}} onClick={clickButton}>주소 검색</button>
                                    
                                    { isPopupOpen &&
                                        <div>
                                            <div className='Modal' onClick={() => setIsPopupOpen(false)} style={{zIndex : 999}}>
                                                <div className='modalBody' style={{height:'600px', width: '550px', padding: '20px'}} onClick={(e) => e.stopPropagation()}>
                                                        <button id = 'modalCloseBtn' onClick={() => setIsPopupOpen(false)}>
                                                        X
                                                        </button>
                                                        <DaumPostcode
                                                            onComplete={selectAddress}
                                                            autoClose={false}
                                                            style={postCodeStyle}
                                                            theme={themeObj}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>호텔 대표 이미지</th>
                                <td colSpan={2}>
                                    현재 이미지 : <a href="#" style={{border: "0px", outline: "none"}} onClick={urlHandle}> {data[0].ho_img}</a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className="form-control" type="file" ref={ho_img} />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>호텔 소개</th>
                                <td colSpan={2}>
                                    <textarea rows="6" cols="75" maxLength="500" style={{border:'none'}} onChange={onInputHandler} ref={ho_description} defaultValue={data[0].ho_description} placeholder="숙소와 주변 지역에 대한 정보에서 시작해 게스트와 어떻게 소통하고 싶은지 등의 내용을 적어주세요"/>
                                    <p style={{textAlign:'right'}}>
                                        <span>{inputCount}</span>
                                        <span> / 500 자</span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{textAlign: 'right'}}>
                        <button className="main-btnn" onClick={() => {
                            Swal.fire({
                                icon: "question",
                                text: '호텔 기본정보를 수정하시겠습니까?',
                                showCancelButton: true,
                                confirmButtonText: '확인',
                                cancelButtonText: "취소"
                            }).then((result) => {
                                if(result.isConfirmed){
                                    if(ho_name.current.value == '' || ho_level.current.value == '' || ho_floor.current.value == '' || 
                                    ho_single.current.value == '' || ho_double.current.value == '' || ho_family.current.value == '' || ho_suite.current.value == '' || 
                                    ho_check_in.current.value == '' || ho_check_out.current.value == '' || ho_address.current.value == '' || ho_description.current.value == ''){
                                    Swal.fire({
                                        icon : 'warning',
                                        title : '잠깐!',
                                        text: '입력되지 않은 항목이 있습니다.',
                                        confirmButtonText: '확인'
                                    })
                                } else {
                                    const form = new FormData();
                                    form.append('ho_idx', hoIdx);
                                    form.append('ho_name', ho_name.current.value);
                                    form.append('ho_level', ho_level.current.value);
                                    form.append('ho_floor', ho_floor.current.value);
                                    form.append('ho_single', ho_single.current.value);
                                    form.append('ho_double', ho_double.current.value);
                                    form.append('ho_family', ho_family.current.value);
                                    form.append('ho_suite', ho_suite.current.value);
                                    form.append('ho_check_in', ho_check_in.current.value);
                                    form.append('ho_check_out', ho_check_out.current.value);
                                    form.append('ho_address', ho_address.current.value);
                                    form.append('ho_x', ho_x.current.value);
                                    form.append('ho_y', ho_y.current.value);
                                    form.append('ho_description', ho_description.current.value);
                                    if(ho_img.current.files.length > 0){
                                        form.append('img', ho_img.current.files[0]);
                                    }
                                    fetch('http://localhost/host/hotel/editHotel/defaultInfo', {
                                        method: 'POST',
                                        encType : 'multipart/form-data',
                                        body : form
                                    }).then(() => {
                                        Swal.fire({
                                            icon : 'success',
                                            title : '수정 완료',
                                            text: '호텔 정보가 수정되었습니다.',
                                            confirmButtonText: '확인'
                                        });
                                        window.location.reload();
                                    });
                                }
                            }
                            });
                            }}
                        >수정</button>
                    </div>
                </div>
                <div className="card-style mb-30">
                    <h3 className="mb-30"><CardChecklist size={35} /> 호텔 편의시설</h3>
                    <div className="mb-10" style={{fontSize: '20px'}}>
                        <input type='checkbox' name='select-all'
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={checkItems.length === dataList.length ? true : false} />
                        &nbsp;
                        <strong>전체 선택</strong>
                    </div>
                    
                    <div className="checkbox-group" style={{fontSize: '18px'}}>
                        {dataList?.map((item, index) => (
                            <div key={index} className="mb-10">
                                <div>
                                    <input 
                                        type='checkbox'
                                        name={`select-${item.id}`}
                                        onChange={(e) => handleSingleCheck(e.target.checked, item.id, item.sts, e.target.defaultChecked)}
                                        //checked={checkItems.includes(item.id) ? (item.sts=='Y' ? true : false): false}
                                        //checked={checkItems.includes(item.id) ? true : false}
                                        defaultChecked={item.sts === 'Y'}
                                    />
                                    &nbsp;
                                    <img src={item.icon} style={{ width: '30px', height: '30px' }} />
                                    &nbsp;{item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{textAlign:'right'}}>
                        <button className="main-btnn" onClick={() => {
                            Swal.fire({
                                icon : 'question',
                                text: '호텔 편의시설을 수정하시겠습니까?',
                                showCancelButton: true,
                                confirmButtonText: '확인',
                                cancelButtonText: "취소"
                            }).then((result) => {
                                if(result.isConfirmed){
                                    if(checkItems.length == 0){
                                        Swal.fire({
                                            icon : 'warning',
                                            text: '선택하신 내용이 없습니다. 이대로 수정할까요?',
                                            showCancelButton : true,
                                            confirmButtonText: '확인',
                                            cancelButtonText : '취소'
                                        }).then((result) => {
                                            if(result.isConfirmed){
                                                const form = new FormData();
                                                form.append('ho_idx', hoIdx);
                                                form.append('checkItems', checkItems);
                                                fetch('http://localhost/host/hotel/editHotel/amenity', {
                                                    method: 'POST',
                                                    body : form
                                                }).then(() => {
                                                    Swal.fire({
                                                        icon : 'success',
                                                        text: '편의시설이 수정되었습니다.',
                                                        confirmButtonText: '확인'
                                                    });
                                                    window.location.reload();
                                                });
                                            }
                                        })
                                    } else {
                                        const form = new FormData();
                                        form.append('ho_idx', hoIdx);
                                        form.append('checkItems', checkItems);
                                        fetch('http://localhost/host/hotel/editHotel/amenity', {
                                            method: 'POST',
                                            body : form
                                        }).then(() => {
                                            Swal.fire({
                                                icon : 'success',
                                                text: '편의시설이 수정되었습니다.',
                                                confirmButtonText: '확인'
                                            });
                                            window.location.reload();
                                        });
                                    }
                                        
                                    
                                }
                            });
                        }}
                        >수정</button>
                    </div>
                </div>
                <div className="card-style mb-30">
                    <h3><CardList size={35} /> 객실 정보</h3>
                    <table className="tbl table table-sm table-hover align-middle text-center">
                        <thead>
                             <tr>
                                <th>번호</th>
                                <th>객실 유형</th>
                                <th>수용인원</th>
                                <th>면적</th>
                                <th>침대수</th>
                                <th>가격</th>
                                <th>금연실</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr style={{textAlign:'center'}} onClick={() => {setModal(true);  setRooms(item);}}>
                                    <td key="idx">{idx + 1}</td>
                                    <td>{item.d_room_type}</td>
                                    <td>{item.d_capacity}명</td>
                                    <td>{item.d_area}㎡</td>
                                    <td>{item.d_beds}개</td>
                                    <td>{item.d_price}원</td>
                                    <td>{item.d_non_smoking}</td>
                                </tr>
                            ))}
                            {modal && (
                                <Modal
                                    style={{ zIndex: 999, position: "relative" }}
                                    closeModal={() => {
                                        setModal(!modal);
                                      }}
                                />
                             )}
                        </tbody>
                    </table>
                </div>
                {data[0].ho_status == 2
                ? 
                    <div className="mb-40" style={{textAlign:'center'}}>
                        <button className="main-btnn" onClick={() => {
                            Swal.fire({
                                icon : 'question',
                                text: '영업 중지 신청을 하시겠습니까?',
                                showCancelButton: true,
                                confirmButtonText: '확인',
                                cancelButtonText: "취소"
                            }).then((result) => {
                                if(result.isConfirmed){
                                    const form = new FormData();
                                    form.append("ho_idx", data[0].ho_idx);
                                    form.append("status", data[0].ho_status);
                                    fetch('http://localhost/host/hotel/updateHotelStatus', {
                                        method : 'POST',
                                        body : form
                                    }).then((response) => response.json())
                                    .then(data => {
                                        if(data.result === 'success') {
                                            Swal.fire({
                                                icon : 'success',
                                                title : '신청 완료',
                                                text: '선택하신 호텔이 영업 중지 상태로 변경되었습니다.',
                                                confirmButtonText: '확인'
                                            }).then((result) => {
                                                if(result.isConfirmed){
                                                    window.location.reload();
                                                }
                                            })
                                        } else if(data.result === 'fail'){
                                            Swal.fire({
                                                icon : 'warning',
                                                title : '신청 불가',
                                                text: '현재 진행 중인 예약이 있습니다.',
                                                confirmButtonText: '확인'
                                            });
                                        }
                                    })
                            }})
                        }}>영업 중지 신청</button>
                        &nbsp;
                        <button className="main-btnn" onClick={() => {
                            navigate('/host/hotel/MyhotelList')
                        }}>뒤로 가기</button>
                    </div>
                : data[0].ho_status == 3
                ?
                <div className="mb-40" style={{textAlign:'center'}}>
                    <button className="main-btnn" onClick={() => {
                        Swal.fire({
                            icon : 'question',
                            text: '영업 재개 신청을 하시겠습니까?',
                            showCancelButton: true,
                            confirmButtonText: '확인',
                            cancelButtonText: "취소"
                        }).then((result) => {
                            if(result.isConfirmed){
                                const form = new FormData();
                                form.append("ho_idx", data[0].ho_idx);
                                form.append("status", data[0].ho_status);
                                fetch('http://localhost/host/hotel/updateHotelStatus', {
                                    method : 'POST',
                                    body : form
                                }).then((response) => response.json())
                                .then(data => {
                                    if(data.result === 'success') {
                                        Swal.fire({
                                            icon : 'success',
                                            title : '신청 완료',
                                            text: '관리자의 승인을 기다려주세요.',
                                            confirmButtonText: '확인'
                                        }).then((result) => {
                                            if(result.isConfirmed){
                                                window.location.reload();
                                            }
                                        })
                                    }
                                })
                        }})
                    }}>영업 재개 신청</button>
                    &nbsp;
                    <button className="main-btnn" onClick={() => {
                        navigate('/host/hotel/MyhotelList')
                    }}>뒤로 가기</button>
                </div>
                :
                <div className="mb-40" style={{textAlign:'center'}}>
                    <button className="main-btnn" onClick={() => {
                        navigate('/host/hotel/MyhotelList')
                    }}>뒤로 가기</button>
                </div>
                }
            </div>
        )
    }
};

export default EditHotel;