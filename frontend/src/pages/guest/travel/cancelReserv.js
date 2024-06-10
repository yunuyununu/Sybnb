import React,{useEffect,useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

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


function CancelReserv() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    const idxKey = '';
    const navigate = useNavigate();

    if(idx == null) {
        Swal.fire({
            text: "로그인 후 이용 가능합니다.",
            showCancelButton: false,
            confirmButtonText: '확인',
        }).then(() => {
            navigate("/");
        });
    } 
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/delDetail?o_idx=' + OIdx);
    
    const [data1, loading1] =useFetch('http://localhost/guest/my?g_idx='+idx.key);
    if(loading||loading1) {
        return (
            <div>loading</div>
        )
    } else {
        const url = `http://localhost/static/images/host/hotel/${data.dto.ho_img}`;
        const image = data.dto.ho_img;
        let img = '';
        if ( image !== null) {
            img = `<img src=${url} width='50px' height='50px' /><br />`;
        }
        console.log("@@@@"+data.refund_money);
        return (
            <>
            <div className="container min-vh-100">
                <div style={{float: 'left', width: '500px', marginRight:'50px'}}>
                <h3 className="text-bold">취소 확인하기</h3>
                <br/>
                <div>
                <div style={{float:'left', marginRight:'100px'}}>
                    결제한 금액
                    <p style={{fontSize:'30px', fontWeight:"bold"}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
                <div>
                    환불 금액
                    <p style={{fontSize:'30px', fontWeight:"bold"}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
                </div>
                <hr/>
                <div style={{paddingBottom:'60px'}}>
                <h5>환불 세부 내역</h5>
                    <br/>
                    <div style={{float:'left', marginRight:'100px'}}>숙박<br/><p style={{fontSize:'15px', float:'right'}}>{data.refund}</p></div>
                    <div style={{float:'right'}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원<br/><p style={{fontSize:'15px', float:'right'}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></div>
                </div>
                <hr/>
                <div style={{paddingBottom:'40px'}}>
                    <h4>총 환불 금액<p style={{float:'right'}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></h4>
                </div>
                {data.refund_money === 0
                ?
                <button type='button' className="main-btn" onClick={() => {
                    console.log("----!_!_!_!_!__!");
                    Swal.fire({
                        title: '예약을 취소하시겠습니까?',
                        text: '체크인 하루 전날은 환불 불가상태로 예약만 취소됩니다.',
                        confirmButtonText: '확인',
                        showCancelButton: true
                      }).then((result)=>{
                        if(result.isConfirmed) {
                            const form = new FormData();
                            form.append('o_idx', OIdx);
                            form.append('g_idx', idx.key);
                            fetch('http://localhost/cancelreser', {
                                method: 'post',
                                body: form,
                            }).then(() => {
                                Swal.fire({
                                    icon : 'success',
                                    text: '예약취소완료',
                                    confirmButtonText: '확인'
                                  }).then((result) => {
                                    if(result.isConfirmed) {
                                      window.location.href='/guest/reservation';
                                    }
                                  });
                            });
                        }
                      });
                }}>예약 취소</button>
                :
                <button type='button' className="main-btn" onClick={() => {
                    console.log("여기아님아님아님");
                    Swal.fire({
                        title: '예약을 취소하시겠습니까?',
                        text: '예약 목록 화면으로 돌아갑니다',
                        confirmButtonText: '확인',
                        showCancelButton: true
                      }).then((result)=>{
                        if(result.isConfirmed) {
                            const form = new FormData();
                            form.append('o_idx', OIdx);
                            form.append('g_idx', idx.key);
                            form.append('paymentId',data.dto.paymentId);
                            if(data.dto.o_discount !== null || data.dto.o_discount !== 0) {
                                form.append('pointPlus',(data.dto.o_discount + data1.dto.g_point));
                            } else {
                                form.append('pointPlus',data1.dto.g_point);
                            }
                            fetch('http://localhost/paycancel', {
                                method: 'post',
                                body: form,
                            }).then((response) => response.json())
                            .then(data => {
                                if (data.result === 'success') {
                                    Swal.fire({
                                      icon : 'success',
                                      text: '환불처리완료',
                                      confirmButtonText: '확인'
                                    }).then((result) => {
                                      if(result.isConfirmed) {
                                        window.location.href='/guest/reservation';
                                      }
                                    });
                                } else {
                                    Swal.fire({
                                        title: '에러 발생',
                                        text: '관리자에게 문의하세요',
                                        showCancelButton: false,
                                        confirmButtonText: '확인',
                                    });
                                }
                            })
                          }
                    });
                }}>예약 취소</button>
                }
            </div>

                <div className='card-reservDetail' style={{float: 'left'}}>
                    <div style={{float:'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: img}}></span></div>
                    <div>
                        <p>{data.dto.ho_name}<br/>
                        호스트: {data.dto.h_name}</p>
                    </div>
                    <hr/>
                    <p>날짜 <p style={{float:'right'}}>{data.dto.o_ckin} ~ {data.dto.o_ckout}</p></p>
                    게스트 <p style={{float:'right'}}>{data.dto.o_reser}명</p>
                    <hr/>
                    <p>현재까지 결제 완료 금액 <p style={{float:'right'}}>{data.dto.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></p>
                    총 환불 금액 <p style={{float:'right', fontWeight:"bold"}}>{data.refund_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
            </div>
            </>
        )
    }
}

export default CancelReserv;