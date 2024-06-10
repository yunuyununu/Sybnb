/* global kakao */
import React, { useEffect, useRef, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, InfoCircle } from "react-bootstrap-icons";
import Cookies from "universal-cookie";
import DaumPostcode from "react-daum-postcode";
import Swal from "sweetalert2";
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

function RegistHotel() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userIdx = userInfo.h_idx;
    const userName = userInfo.h_name;
    const location = useLocation();
    const temp = location.state.temp;
    const temp_name = location.state.temp_name;
    const temp_level = location.state.temp_level;
    const temp_floor = location.state.temp_floor;
    const temp_single = location.state.temp_single;
    const temp_double = location.state.temp_double;
    const temp_family = location.state.temp_family;
    const temp_suite = location.state.temp_suite;
    const temp_checkIn = location.state.temp_checkIn;
    const temp_checkOut = location.state.temp_checkOut;
    const temp_description = location.state.temp_description;
    const ht_name = useRef();
    const ht_address = useRef();
    const ht_level = useRef();
    const ht_floor = useRef();
    const ht_single = useRef();
    const ht_double = useRef();
    const ht_family = useRef();
    const ht_suite = useRef();
    const ht_check_in = useRef();
    const ht_check_out = useRef();
    const ht_img = useRef();
    const ht_description = useRef();
    const ht_x = useRef();
    const ht_y = useRef();

    let [inputCount, setInputCount] = useState(0);
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
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
            console.log();
            hoX = result[0].y;
            hoY = result[0].x;
            setHoX(hoX);
            setHoY(hoY);
            } else if(status === kakao.maps.services.Status.ZERO_RESULT){
                Swal.fire({
                    icon : 'warning',
                    text: '검색 결과가 존재하지 않습니다.',
                    confirmButtonText: '확인'
                });
                return;
            } else if(status === kakao.maps.services.Status.ERROR){
                Swal.fire({
                    icon : 'warning',
                    text: '검색 결과 중 오류가 발생했습니다.',
                    confirmButtonText: '확인'
                });
                return;
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
        return (
            <div className="container">
                <div className="mb-20">
                    <h2>{userName}님의 <br />
                    호텔 등록을 시작해볼까요?</h2>
                </div>
                <div>
                    <div className="card-style mb-40">
                    <h3><InfoCircle /> 숙소 기본 정보를 알려주세요</h3>
                        <table className="tbl">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>호텔명</th>
                                    <td>
                                        {temp_name != null
                                        ? <input style={{border:'none'}} ref={ht_name} defaultValue={JSON.parse(temp_name)}/>
                                        : <input style={{border:'none'}} ref={ht_name} />
                                        } 
                                    </td>
                                </tr>
                                <tr>
                                    <th>호텔 등급</th>
                                    <td> 
                                        {temp_level != null
                                        ? <input style={{border:'none'}} ref={ht_level} defaultValue={temp_level}/>
                                        : <input style={{border:'none'}} ref={ht_level} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>호텔 층수</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input style={{border:'none'}} ref={ht_floor} defaultValue={temp_floor}/>
                                        : <input style={{border:'none'}} ref={ht_floor} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>싱글</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input style={{border:'none'}} ref={ht_single} defaultValue={temp_single}/>
                                        : <input style={{border:'none'}} ref={ht_single} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>더블</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input style={{border:'none'}} ref={ht_double} defaultValue={temp_double}/>
                                        : <input style={{border:'none'}} ref={ht_double} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>패밀리</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input style={{border:'none'}} ref={ht_family} defaultValue={temp_family}/>
                                        : <input style={{border:'none'}} ref={ht_family} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>스위트</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input style={{border:'none'}} ref={ht_suite} defaultValue={temp_suite}/>
                                        : <input style={{border:'none'}} ref={ht_suite} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>체크인</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input type="time" style={{border:'none'}} ref={ht_check_in} defaultValue={JSON.parse(temp_checkIn)}/>
                                        : <input type="time" style={{border:'none'}} ref={ht_check_in} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>체크아웃</th>
                                    <td>
                                        {temp_floor != null
                                        ? <input type="time" style={{border:'none'}} ref={ht_check_out} defaultValue={JSON.parse(temp_checkOut)}/>
                                        : <input type="time" style={{border:'none'}} ref={ht_check_out} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    {
                                        
                                    }
                                    <input style={{border:'none', width: '75%'}} ref={ht_address} value={address} onChange={(e) => {setAddress(e.target.value)}} />
                                    <input type="hidden" style={{border:'none'}} ref={ht_x} value={hoX} onChange={(e) => {setHoX(e.target.value)}} />
                                    <input type="hidden" style={{border:'none'}} ref={ht_y} value={hoY} onChange={(e) => {setHoY(e.target.value)}} />
                                
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
                                </tr>
                                <tr>
                                    <th>호텔 대표 이미지</th>
                                    <td><input type="file" ref={ht_img} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <h4>게스트에게 호텔에 대해 설명해주세요</h4>
                        <div className="text-sm mb-20">숙소에 대해 간략히 설명해주세요</div>
                            {temp_floor != null
                                ? <textarea rows="5" cols="83" maxLength="100" onChange={onInputHandler} ref={ht_description} defaultValue={JSON.parse(temp_description)} />
                                : <textarea rows="5" cols="83" maxLength="100" onChange={onInputHandler} ref={ht_description} placeholder="숙소와 주변 지역에 대한 정보에서 시작해 게스트와 어떻게 소통하고 싶은지 등의 내용을 적어주세요"/>
                            }
                            <p style={{textAlign:'right'}}>
                                <span>{inputCount}</span>
                                <span> / 100 자</span>
                            </p>
                        <div style={{textAlign:'right'}}>
                            <button className="main-btn" onClick={() => {
                                    Swal.fire({
                                        icon : 'question',
                                        text: '다음 단계로 넘어갈까요?',
                                        showCancelButton: true,
                                        confirmButtonText: '확인',
                                        cancelButtonText: "취소"
                                    }).then((result) => {
                                    if (result.isConfirmed) {
                                        if(ht_name.current.value == '' || ht_level.current.value == '' || ht_floor.current.value == '' || 
                                            ht_single.current.value == '' || ht_double.current.value == '' || ht_family.current.value == '' || ht_suite.current.value == '' || 
                                            ht_check_in.current.value == '' || ht_check_out.current.value == '' || ht_address.current.value == '' || ht_description.current.value == ''
                                            || ht_img.current.value == ''){
                                            Swal.fire({
                                                icon : 'warning',
                                                title : '잠깐!',
                                                text: '입력되지 않은 항목이 있습니다.',
                                                confirmButtonText: '확인'
                                            })
                                        } else {
                                        const form = new FormData();
                                        form.append('ht_h_idx', userIdx);
                                        form.append('temp', temp);
                                        form.append('ht_name', ht_name.current.value);
                                        form.append('ht_level', ht_level.current.value);
                                        form.append('ht_floor', ht_floor.current.value);
                                        form.append('ht_single', ht_single.current.value);
                                        form.append('ht_double', ht_double.current.value);
                                        form.append('ht_family', ht_family.current.value);
                                        form.append('ht_suite', ht_suite.current.value);
                                        form.append('ht_check_in', ht_check_in.current.value);
                                        form.append('ht_check_out', ht_check_out.current.value);
                                        form.append('ht_address', ht_address.current.value);
                                        form.append('ht_x', ht_x.current.value);
                                        form.append('ht_y', ht_y.current.value);
                                        form.append('ht_description', ht_description.current.value);
                                        if (ht_img.current.files.length > 0) {
                                            form.append('ht_img', ht_img.current.files[0]);
                                        }
                                        fetch('http://localhost/host/hotel/registHotel', {
                                            method: 'POST',
                                            encType : 'multipart/form-data',
                                            body : form
                                        }).then((response) => {
                                            return response.json();
                                        }).then(htIdx => {
                                            navigate('/host/hotel/registHotelDetail', {
                                                state : {
                                                    htIdx : htIdx
                                                }
                                            });
                                        });
                                    }
                                }});
                           
                        }}>다음 <ArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
        )

};
 
export default RegistHotel;