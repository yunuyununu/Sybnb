import React, { useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function HotelRoomsItem({dIdx, dRoomType, dImg1, dImg2, dImg3, dCapacity, dArea, dBeds, dNonSmoking, dPrice}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${dImg1}`;
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const {HoIdx} = useParams();
    if (loading) {
        return (
            <div>로딩 중...</div>
        )
    } else {
        let img1_src = '';
        let img1_url = '';        
        if(dImg1 !== '-'){
            img1_src = `http://localhost/static/images/host/hotel/${dImg1}`;
            img1_url = `<img src=${img1_src} width='200px' height='180px'/>`;
        } else {
            img1_src = `http://localhost/static/images/no-image.png`;
            img1_url = `<img src=${img1_src} width='70px' height='70px'/>`;
        }

        let img2_src = '';
        let img2_url = '';
        if(dImg2 !== '-'){
            img2_src = `http://localhost/static/images/host/hotel/${dImg2}`;
            img2_url = `<img src=${img2_src} width='200px' height='130px'/>`;
        } else {
            img2_url = '';
        }

        let img3_src = '';
        let img3_url = '';   
        if(dImg3 !== '-'){
            img3_src = `http://localhost/static/images/host/hotel/${dImg3}`;
            img3_url = `<img src=${img3_src} width='200px' height='130px'/>`;
        } else {
            img3_url = '';
        }

        let NonSmoke = '';
        if(dNonSmoking == 'Y'){
            NonSmoke = '흡연 금지';
        } else {
            NonSmoke = '흡연 가능';
        }
        return (
            <div>
                <div onClick={() => setModal(true)}>
                    <div className='mb-20' style={{textAlign:'center'}}>
                        <div className = "mb-10" dangerouslySetInnerHTML={{__html: img1_url}}></div> 
                        <h5><div>{dRoomType}</div></h5>
                    </div>
                </div>
                { modal &&
                    <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                        <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                            <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                X
                            </button>
                            <div className="mt-20 mb-40">
                            <h3><div className='mb-50'>{dRoomType}</div></h3>
                                <div className='row mb-50'>
                                    <div className="col-7" style={{alignContent : 'center'}}>
                                        <div className="mb-20" dangerouslySetInnerHTML={{__html: img1_url}}></div>
                                        {/* <div className="mb-20" dangerouslySetInnerHTML={{__html: img2_url}}></div>
                                        <div className="mb-20" dangerouslySetInnerHTML={{__html: img3_url}}></div>  */}
                                    </div>
                                    <div className="col-5" style={{textAlign : 'left'}}>
                                        <p>수용 인원 : {dCapacity}명 </p>
                                        <p>면적 : {dArea}㎡</p>
                                        <p>침대수 : {dBeds}개</p>
                                        <p>금연실 여부 : {NonSmoke}</p>
                                        <p>가격 : {dPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
                                    </div>
                                </div>
                            </div>
                            <button className="main-btn" onClick={() => {
                                fetch(`http://localhost/host/hotel/hotelDetail/` + HoIdx + `/` + dIdx)
                                 .then(() => {
                                    window.location.href = `/host/hotel/hotelDetail/` + HoIdx + `/` + dIdx;
                                })}}>해당 객실로 예약하기
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default HotelRoomsItem;