import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { InfoCircle, QuestionCircle } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import RegistRoomDetail from "./RegistRoomDetail";
//import base64 from "base-64";

function RegistHotelDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const htIdx = location.state.htIdx;
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    const userIdx = userInfo.h_idx;
    const userName = userInfo.h_name;
    const [modal, setModal] = useState(false);
    const [checkItems, setCheckItems] = useState([]);

    const [lists, setList] = useState([]);
    const [fileLists, setFileLists] = useState([]);
    let list=[];
    let fileList=[];

    const onSetData = (item, file) => {
        for (let i=0; i<lists.length; i++){
            if(lists[i].roomType == item.roomType){
                Swal.fire({
                    icon: "warning",
                    title: '잠깐!',
                    text: '이미 등록된 객실 유형입니다.',
                    confirmButtonText: '확인'
                });
                return;
            }
        }
        console.log(item);
        console.log(file);
        list.push(item);
        fileList.push(file);

        setList(old => [...old, ...list]);
        setFileLists(old => [...old, ...fileList]);
        setModal(false);
    }

    const deleteData = (item) => {
        setList(lists.filter((el) => el !== item));
    }

    function Modal(props) {
        function closeModal() {
            props.closeModal();
          setModal(!modal);
        }
        return (
          <div className="modal_h z-3" onClick={closeModal}>
            <div
              className="modalBody_h"
              style={{ width: "1000px", height: "800px", padding: "30px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btnClose" onClick={closeModal}>
                X
              </button>
               {props.children}
            </div>
          </div>
        );
    }

    const dataList = [
        {id: 0, title: '산 전망', icon: '/img/mountain.png'},
        {id: 1, title: '바다 전망', icon: '/img/ocean.png'},
        {id: 2, title: '무선인터넷', icon: '/img/wifi.png'},
        {id: 3, title: '주차장', icon: '/img/parking.png'},
        {id: 4, title: '조식 제공', icon: '/img/breakfast.png'},
        {id: 5, title: '화재경보기', icon: '/img/firealam.png'},
        {id: 6, title: '소화기', icon: '/img/fireExt.png'}
    ];

    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);        
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
    };

    return (
        <div className="container">
            <div className="mb-20">
                <h2>{userName}님의 <br />
                신규 호텔 등록을 시작해볼까요?</h2>
            </div>
            <div className="card-style mb-30">
                <h3><QuestionCircle size={30}/> 어떤 편의시설을 제공하시나요?</h3>
                <div className="text-sm mb-20 mt-10">일반적으로 게스트가 기대하는 편의시설 목록입니다.<br />
                숙소를 등록한 후 언제든 편의시설을 추가할 수 있어요.</div>
                <div className="mb-10" style={{fontSize: '20px'}}>
                    <input type='checkbox' name='select-all'
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === dataList.length ? true : false} />
                    &nbsp;
                    <strong>전체 선택</strong>
                </div>
                <div className="checkbox-group mb-40" style={{fontSize: '18px'}}>
                    {dataList?.map((item, index) => (
                        <div key={index} className="mb-10">
                            <div>
                                <input type='checkbox' name={`select-${item.id}`}
                                onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                                checked={checkItems.includes(item.id) ? true : false} />
                                &nbsp;
                                <img src={item.icon} style={{ width: '30px', height: '30px' }} />
                                &nbsp;{item.title}
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <h3><InfoCircle size={30} /> 호텔의 객실 정보를 알려주세요</h3>
                &nbsp;&nbsp;<span style={{color:'red', fontWeight : 'bold'}}>※ 싱글룸 등록 필수 </span>
                <div style={{textAlign : 'right'}}>    
                    <button className="main-btn z-0" style={{textAlign:'right'}} onClick={() => setModal(true)}>추가</button>
                </div>
                {modal && (
                    <Modal closeModal={() => {setModal(!modal);}}>
                        <RegistRoomDetail
                            insertData={onSetData}
                        />
                    </Modal>
                )}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>객실유형</th>
                            <th>수용인원(명)</th>
                            <th>면적(㎡)</th>
                            <th>침대수(개)</th>
                            <th>금연실</th>
                            <th>가격(원)</th>
                            <th>객실 이미지</th>
                            <th>객실 이미지2</th>
                            <th>객실 이미지3</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    { lists.length == 0
                        ? 
                            <tbody>
                                <tr>
                                    <td colSpan={10} style={{textAlign: 'center'}}>등록된 객실이 없습니다.</td>
                                </tr>
                            </tbody>
                        :
                            <tbody>
                                {lists.map((item) => (
                                    <tr style={{textAlign:'center'}}>
                                        <td>{item.roomType}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.area}</td>
                                        <td>{item.beds}</td>
                                        <td>{item.non_smoking}</td>
                                        <td>{item.price}</td>
                                        <td>{item.dImg1_name}</td>
                                        <td>{item.dImg2_name}</td>
                                        <td>{item.dImg3_name}</td>
                                        <td><button className="main-btn z-0" onClick={(e) => deleteData(item)}>삭제</button></td>
                                    </tr>
                                ))}
                            </tbody>
                    }
                </table>

                <div className="mt-50" style={{textAlign : 'center'}}>
                    <button className="main-btn z-0" style={{zIndex: 0}}  onClick={() => {
                       let what = lists.some(el => {
                            return el.roomType == '싱글룸';
                        });

                        if(checkItems.length == 0){
                            Swal.fire({
                                icon : 'warning',
                                text: '선택한 편의시설이 없습니다. 이대로 등록할까요?',
                                showCancelButton : true,
                                confirmButtonText: '확인',
                                cancelButtonText : '취소'
                            }).then((result) => {
                                if(result.isConfirmed){
                                    if(lists.length == 0){
                                        Swal.fire({
                                            icon : 'warning',
                                            text: '등록된 객실이 없습니다.',
                                            confirmButtonText: '확인'
                                        }).then((result) => {
                                            if(result.isConfirmed){
                                                return;
                                            }
                                        })
                                    } else if(!what){
                                    Swal.fire({
                                        icon : 'warning',
                                        text: '객실 유형 중 싱글룸은 필수 입력값입니다.',
                                        confirmButtonText: '확인'
                                    }).then((result) => {
                                        if(result.isConfirmed){
                                            return;
                                        }
                                    })
                                     } else {
                                        const form = new FormData();
                                        form.append('ht_idx', htIdx);
                                        form.append('ht_h_idx', userIdx);
                                        form.append('checkItems', checkItems);
                                        form.append('list', JSON.stringify(lists));
                                        form.append('dImg1', JSON.stringify(fileLists));
                                        fetch('http://localhost/host/hotel/registHotelDetail', {
                                            method : 'POST',
                                            encType : 'multipart/form-data',
                                            body : form
                                        }).then(() => {
                                            Swal.fire({
                                                icon: "success",
                                                title: '등록 완료',
                                                text: '호텔 등록이 완료되었습니다. 관리자 승인을 기다려주세요.',
                                                confirmButtonText: '확인'
                                            }).then((result) => {
                                                if(result.isConfirmed){
                                                    navigate('/host/hotel/MyhotelList');
                                                }
                                            });
                                        })
                                    }
                                }})
                        } else if(lists.length == 0){
                            Swal.fire({
                                icon : 'warning',
                                text: '등록된 객실이 없습니다.',
                                confirmButtonText: '확인'
                            }).then((result) => {
                                if(result.isConfirmed){
                                    return;
                                }
                            })
                        } else if(!what){
                            Swal.fire({
                                icon : 'warning',
                                text: '객실 유형 중 싱글룸은 필수 입력값입니다.',
                                confirmButtonText: '확인'
                            }).then((result) => {
                                if(result.isConfirmed){
                                    return;
                                }
                            })
                        } else {
                            const form = new FormData();
                            form.append('ht_idx', htIdx);
                            form.append('ht_h_idx', userIdx);
                            form.append('checkItems', checkItems);
                            form.append('list', JSON.stringify(lists));
                            form.append('dImg1', JSON.stringify(fileLists));
                            fetch('http://localhost/host/hotel/registHotelDetail', {
                                method : 'POST',
                                encType : 'multipart/form-data',
                                body : form
                            }).then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: '등록 완료',
                                    text: '호텔 등록이 완료되었습니다. 관리자 승인을 기다려주세요.',
                                    confirmButtonText: '확인'
                                }).then((result) => {
                                    if(result.isConfirmed){
                                        navigate('/host/hotel/MyhotelList');
                                    }
                                });
                            })
                        }
                    }}>등록 신청하기</button>
                    &nbsp;
                    {/* <button className="main-btn z-0" style={{zIndex: 0}}  onClick={() => {
                        Swal.fire({
                            icon: "warning",
                            title: '잠깐!',
                            text: '입력하신 내용이 사라집니다. 뒤로 가시겠습니까?',
                            showCancelButton: true,
                            confirmButtonText: '확인',
                            cancelButtonText: "취소"
                        }).then((result) => {
                            if(result.isConfirmed){
                                navigate('/host/hotel/registHotel');
                            }
                        })
                    }}>뒤로 가기</button> */}
                </div>
            </div>
        </div>
    )
}

export default RegistHotelDetail;