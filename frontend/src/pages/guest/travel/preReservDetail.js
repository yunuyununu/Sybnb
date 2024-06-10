import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import {Link, useNavigate} from "react-router-dom";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}


function PreReservDetail() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/lastDetail?o_idx=' + OIdx);
    const [check, setCheck] = useState(false);

    const handleCopyClick = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            alert('텍스트가 복사되었습니다.');
          })
          .catch((error) => {
            console.error('복사 실패:', error);
          });
      };

    
    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        let lat = data.dto.ho_x;
        let lng = data.dto.ho_y;

        const address = data.dto.ho_address;
        const hProfile = data.dto.h_profile;

        let payment = ''
        const pay = data.dto.o_payment;
        if (pay == 1) {
            payment = '카카오페이'
        } else if(pay == 2) {
            payment = '카드'
        } else if (pay == 3) {
            payment = '포인트'
        }

        let state = ''
        const sat = data.dto.o_state;
        if (sat == 1) {
            state = '예약 대기'
        } else if (sat == 3) {
            state = '예약 확정'
        }

        let img = '';
        const url = `http://localhost/static/images/host/profile/${hProfile}`;
        if ( hProfile != null) {
            img = `<img src=${url} width='30px' height='30px' /><br />`;
        }
       

        return (
           
            <>
            <div style={{width: '1500px', marginLeft: '200px', marginTop: '50px', overflow: 'hidden'}}>
                <h3 className="text-bold"> <img src="/img/reservDetail.png" width="35px" height="35px"/>
                &nbsp; 예정 예약 상세</h3>
                <br/>
                <br/>
                <div style={{width: '500px', float:'left'}}>
                <div className="card-reservDetail">
                    <h4>예약 세부 정보</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 상태: {state} <span style={{fontWeight: 'bold', color: 'red'}}>{data.state_check}</span></p> 
                    
                    <p style={{fontWeight: 'bold'}}> 환불 정책</p>
                    <p>{data.ref_date} {data.dto.ho_check_in} 전에 취소하면 전체 환불을 받으실 수 있습니다. 그 이후에 취소하면 예약 대금이 환불되지 않습니다.</p>
                    <hr/>
                    <Link to={`/guest/updateReserv/${OIdx}`} style={{textDecorationLine: 'none'}}><div><p style={{color: 'black'}}><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;예약 변경</p></div></Link>
                    <hr/>
                    <Link to={`/guest/cancelReserv/${OIdx}`} style={{textDecorationLine: 'none'}}><div><p style={{color: 'black'}}><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;예약 취소</p></div></Link>
                </div>
                <div className='detail-blank'></div>
                <div className='card-reservDetail'>
                    <h4>찾아가는 방법</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 주소</p>
                    <p>{data.dto.ho_address}</p>
                    <hr/>
                    <div onClick={() => handleCopyClick(address)}><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;주소 복사하기</p></div>            
                </div>
                <div className='detail-blank'></div>
                <div className='card-reservDetail'>
                    <h4>숙소 안내 및 일정</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}>예약 일정</p>
                    <p>인원: {data.dto.o_reser}명 <br/> {data.dto.o_ckin} {data.dto.ho_check_in} ~ {data.dto.o_ckout} {data.dto.ho_check_out}</p>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}> 숙소 안내</p>
                    <p>면적: {data.dto.d_area} <br/> 룸 타입: {data.dto.d_room_type} <br/> 침대 수: {data.dto.d_beds} <br/> 흡연실 여부: {data.dto.d_non_smoking} </p>
                </div>
                <div className='detail-blank'></div>
                <div className='card-reservDetail'>
                    <h4>호스트 안내</h4>
                    <hr/>
                    <div style={{float: 'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: img}}></span></div><p style={{fontSize: '20px'}}>{data.dto.h_name}님 <br/></p>
                    <p>연락처: {data.dto.h_phone}</p>
                </div>
                <div className='detail-blank'></div>
                <div className='card-reservDetail'  style={{marginBottom: '100px'}}>
                    <h4>결제 정보</h4>
                    <hr/>
                    <p style={{fontWeight: 'bold'}}>결제 세부 정보</p>
                    <p>{(data.dto.o_price*1.2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    <hr/>
                    <div onClick={() => {setCheck(!check)}}><p><img src="/img/bbtnDetail.png" width="12px" height="12px" style={{marginRight: '2px', marginBottom: '2px'}}/>&nbsp;상세 내역</p></div>
                    <div className={check? 'abl' : 'dis'}>
                        <p>주문 날짜: {data.dto.o_orderdate} <br/>
                        결제 수단: {payment} <br/>
                        할인 금액: {data.dto.o_discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 <br/>
                        최종 결제 금액: {data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    </div>
                </div>
                </div>
                   
            <div style={{ marginLeft:'30px',float:'left'}}>
                <Map
                //center={{ lat: 37.699072, lng: 127.460887 }}
                center={{ lat: lat, lng: lng }}
                style={{ width: '50vw', height: '800px'}}
                >
                <MapMarker position={{ lat: lat, lng: lng }}>
                {/* <div style={{color:"#000"}}>{JSON.stringify(data.ho_name)}</div> */}
                </MapMarker>
                </Map>
            </div>  
            </div>          
            </>
        )
    }
}

export default PreReservDetail;