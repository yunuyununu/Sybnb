import React, {useEffect,useState,useRef,useCallback} from 'react';
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";


function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch(url)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data,loading];
}

function Order() {
    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const location = useLocation();
    const HoIdx = location.state.HoIdx;
    const dIdx = location.state.dIdx;
    const ckin = location.state.ckin;
    const ckout = location.state.ckout;
    const reser = location.state.reser;
    const adult = location.state.adult;
    const child = location.state.child;
    const baby = location.state.baby;
    const dprice = location.state.dprice;
    const pprice = location.state.pprice;
    const fprice = location.state.fprice;
    const dateChar = location.state.dateChar;
    const vat = location.state.vat;
   
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);
    const [hotel,loading2] = useFetch('http://localhost/host/hotel/hotelDetail/'+HoIdx+'/'+dIdx);
    const [review, loading3] = useFetch('http://localhost/api/reputation/list/' + HoIdx);
    const [coupon,loading4]=useFetch('http://localhost/guest/coupon?g_idx='+idx.key);
    const [count,loading5]=useFetch('http://localhost/guest/c_count?g_idx='+idx.key);
    const [pay, setPay] = useState("1"); //default :  Card선택

    //쿠폰사용
    const [couponAmount,setCouponAmount] = useState(0);
    const [couponIdx, setCouponIdx] = useState("");

    //포인트사용
    const [finalamount,setFinalamount] = useState(fprice);
    const [pointAmount,setPointAmount] = useState(0);
    const [fpoint,setFpoint] = useState(0);

    const handleCoupon = (e) => {
        Handlepoint(e);
        setModalOpen1(false);
    };

    const PointAmount = (e) => {
        setPointAmount(e.target.value);
    }
    const Handlepoint = () => {
        let fpoint = parseInt(pointAmount);
        setFpoint(fpoint);
        let finalP=parseInt(fprice);
        let pointP=parseInt(fpoint);
        let couponP =parseInt(couponAmount);
        if(pointP !== 0 || couponP !== 0) {
            finalP = finalP - (pointP + couponP);
        }
        setFinalamount(finalP);
    };

    const GetCoupon = (e) => {
        let str = e.target.value;
        let Cidx ='';
        let Camount ='0';
        if (str !== 0) {
            Cidx =str.substring(0, str.indexOf(','));
            Camount =str.substring(str.lastIndexOf(',') + 1);
        }
        setCouponAmount(Camount);
        setCouponIdx(Cidx);
    };
    //결제수단 선택
    let method ='';
    let channel ='';
    let pgs='';
    if(pay ==="1") { //나이스페이
        method = 'CARD';
        channel ='channel-key-79aea003-5c79-4b37-a303-c271c68f7456';
        pgs = 'nice_v2';
    } else if (pay ==="2") { //카카오페이
        method = 'EASY_PAY';
        channel ='channel-key-ac36bf36-f116-42b5-90cf-0d78e5edda2f';
        pgs = 'kakaopay';
    }

    const onSelect = (event) => {
        setPay(event.target.value);
    };

    //쿠폰모달
    const [modalOpen1, setModalOpen1] = useState(false);
    const modalBackground = useRef();
    
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src="https://cdn.portone.io/v2/browser-sdk.js"
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);
    
    //포트원 연동 나이스페이 결제
    async function serverAuth() {
        const { PortOne } = window;
        const response = await PortOne.requestPayment({
            storeId: 'store-af69f2fa-5d38-4271-b9ad-44d9dc389ecd',
            paymentId: `payment-${crypto.randomUUID()}`,
            payMethod: method,
            channelKey : channel,
            currency: 'KRW',
            totalAmount: 100,
            orderName: hotel.ho_name,
            pg: pgs,
            customer: {
                email: data.dto.g_email,
                firstName: data.dto.g_name.substring(0,1),
                lastName: data.dto.g_name.substring(1,6),
                phoneNumber: data.dto.g_phone,
            },
        });
        if (response.code != null) {
            //결제실패시 홈화면으로 화면전환
            Swal.fire({
                icon : 'warning',
                title: '결제실패',
                text : '다시 시도해주세요.',
                confirmButtonText: '확인'
            });
            return;
            // .then((result) => {
            //     if(result.isConfirmed) {
            //         window.location.href='/';
            //     }
            // });
        } else {
            const form = new FormData();
            form.append('idx',idx.key);
            form.append('dIdx',dIdx);
            form.append('ckin',ckin.replace(/년/gi,"").replace(/월/gi,"").replace(/일/gi,"").replace(/\s/g,""));
            form.append('ckout',ckout.replace(/년/gi,"").replace(/월/gi,"").replace(/일/gi,"").replace(/\s/g,""));
            form.append('adult',adult);
            form.append('child',child);
            form.append('baby',baby);
            form.append('pay',pay);
            form.append('dprice',dprice*dateChar);
            form.append('fprice',finalamount);
            if (pointAmount !== null || pointAmount === 0) {
                form.append('usePoint',pointAmount);
                form.append('rePoint',(data.dto.g_point - pointAmount));
            } else {
                form.append('usePoint',0);
                form.append('rePoint',data.dto.g_point);
            }
            if (couponAmount === null || couponAmount === 0) {
                form.append('useCoupon',0);
            } else {
                form.append('useCoupon',couponAmount);
                form.append('gcidx',couponIdx);
            }
            form.append('paymentId', response.paymentId);
            fetch('http://localhost/guest/order',{
                method:'post',
                body:form
            }).then(()=>{
                //예약완료시 모달로 확인 후 예약내역페이지로 이동
                Swal.fire({
                    icon : 'success',
                    text : '예약요청이 완료되었습니다.',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.href='/guest/reservation';
                    }
                });
            });
        }
    }

    if(loading || loading2 || loading3 || loading4 ||loading5){
        return(
            <div>loading</div>
        )
    } else {
        
        let src=`http://localhost/static/images/host/hotel/${hotel.ho_img}`;
        let image_url=`<img src=${src} width='100px' height='100px'/>`;
        if(pointAmount > data.dto.g_point) {
            Swal.fire({
                icon : 'warning',
                text : '사용가능 포인트를 초과하였습니다.',
                confirmButtonText: '확인'
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    return (
        <>
        <div className="container" align='center' style={{position: 'static'}}>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-5">
                <div className="container-lg">
                        <div style={{paddingLeft: '100px'}}>
                            <div align='left'>
                                <h2>예약요청</h2>
                                <div style={{marginBottom: '30px',marginTop:'20px'}}>
                                    <div style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '400px', height:'90px', padding:'20px'}}>
                                        <div>
                                            <div className="row">
                                                <div className="col">
                                                    <h6 style={{paddingBottom:'5px'}}>저렴한 요금&nbsp;</h6><div>얼른 예약하세요!</div>
                                                </div>
                                                <div className="col" align='right'>
                                                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" ariaHidden="true" role="presentation" focusable="false" style={{display: 'block', height: '32px', width: '32px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}><g stroke="none"><path d="M25.55 1a5 5 0 0 1 3.344 1.282l.192.182 17.207 17.208a3 3 0 0 1 .135 4.098l-.135.144-18.379 18.379a3.001 3.001 0 0 1-3.32.63l-6.42 3.81c-1.296.768-2.948.452-3.894-.736l-.115-.153-.118-.186L2.094 25.046a5 5 0 0 1-.53-3.7l3.435-14.01L5 6a5 5 0 0 1 4.783-4.995L10 1h15.55zM5 15.733l-1.494 6.09a3 3 0 0 0 .219 2.034l.1.186 11.93 20.574.07.112a1 1 0 0 0 1.328.283l5.797-3.441L6.464 25.086a5 5 0 0 1-1.457-3.272L5 21.55v-5.817zM25.55 3H10a3 3 0 0 0-2.995 2.824L7 6v15.55a3 3 0 0 0 .743 1.977l.136.144L25.086 40.88a1 1 0 0 0 1.32.083l.094-.083L44.88 22.5a1 1 0 0 0 .083-1.32l-.083-.094L27.67 3.879A3 3 0 0 0 25.55 3zM14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path><path d="M25.556 5H10a1 1 0 0 0-.993.883L9 6v15.556a1 1 0 0 0 .206.608l.087.1 16.505 16.505 16.971-16.971L26.263 5.293a1 1 0 0 0-.575-.284L25.556 5z" fillOpacity=".2"></path></g></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                <h4>예약정보</h4>
                                <br></br>
                                <div>{hotel.d_room_type}</div>
                                <br></br>
                                <div>날짜</div>
                                <div>{ckin} ~ {ckout}</div>
                                <br></br>
                                <div>게스트</div>
                                <div>{reser}명 + 유아 {baby}명</div>
                                <br></br>
                                <hr/>
                                <br></br>
                                <h4>결제수단&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style={{width: '28px', height:'28px'}} src='/img/nice.jpg'></img>&nbsp;<img style={{width: '50px', height:'25px'}} src='/img/kakaopay.png'></img></h4>
                                <br/>
                                <select value={pay} className="form-select" ariaLabel="Default select example" onChange={onSelect}>
                                    <option value="1">Card</option>
                                    <option value="2">KakaoPay</option>
                                </select>
                                        {pay === "1"
                                        ?
                                        <div style={{fontSize: '10px',paddingTop:'13px'}}>* 나이스페이먼츠로 결제</div>
                                        :
                                        <div style={{fontSize: '10px', paddingTop:'13px'}}>* 카카오페이로 결제</div>
                                        }
                                        <br></br>
                                <hr/>
                                <h4>호스트정보</h4>
                                <br></br>
                                <div>host : {hotel.h_name}님</div>
                                <hr/>
                                <h4>환불 정책</h4>
                                <br></br>
                                <div>체크인 전날 12시까지 100% 가능 / 이후 불가능 </div>
                                <hr/>
                                <div><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" ariaHidden="true" role="presentation" focusable="false" style={{display: 'block', height: '32px', width: '32px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}><g><g stroke="none"><path d="M43 8v21.295L32.295 40l-10.359.001A11.971 11.971 0 0 0 26 31c0-6.627-5.373-12-12-12a12.02 12.02 0 0 0-3.001.378L11 8h32z" fill-opacity=".2"></path><path d="M32 42v-8a5 5 0 0 1 4.783-4.995L37 29h8V6H34v2h-2V6H22v2h-2V6H9v14.5H7V6a2 2 0 0 1 1.85-1.995L9 4h11V2h2v2h10V2h2v2h11a2 2 0 0 1 1.995 1.85L47 6v24.953L33.953 44H15v-2h17zm12.123-11H37a3 3 0 0 0-2.995 2.824L34 34v7.122L44.123 31z"></path></g><g fill="none" stroke-width="2"><path d="M14 43c.328 0 .653-.013.974-.039C21.146 42.465 26 37.299 26 31c0-6.627-5.373-12-12-12A11.995 11.995 0 0 0 2 31c0 6.627 5.373 12 12 12z"></path><path d="M23 31h-9v-9"></path></g></g></svg></div>
                                <div>호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된 것이 아닙니다.</div>
                                <hr/>
                                <div style={{display: "inline"}}>
                                    <a>아래 버튼을 선택하면 </a>
                                    <a style={{textDecoration: 'underline'}}>호스트가 설정한 숙소 이용규칙, 게스트에게 적용되는 기본 규칙, sybnb 재예약 및 환불 정책</a>
                                    <a>에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 sybnb가 </a>
                                    <a style={{textDecoration: 'underline'}}>결제 수단으로 청구</a>
                                    <a>의 조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을 수락하면 표시된 총액이 결제되는 데 동의합니다.</a>
                                </div>
                                <br></br>
                                <br/>
                                {pay === "1"
                                ?
                                //카드(나이스페이먼츠)로 결제시
                                <button className='btn btn-outline-dark' onClick={()=>serverAuth()}>nicepay 결제하기</button>
                                :
                                //카카오페이로 결제시
                                <img type='button' src='/img/kakaopay.png' onClick={()=>serverAuth()}></img>
                                }
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-5">
                    <div style={{marginBottom: '30px',marginTop:'55px'}}>
                        <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '420px', height:'450px', padding:'25px'}}>
                            <div>
                                <div className="row">
                                    <div className="col-4">
                                        <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
                                    </div>
                                    <div className="col-6" align='left'>
                                        <br></br>
                                    <div style={{fontSize:'23px'}}>{hotel.ho_name}</div>
                                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ariaHidden="true" role="presentation" focusable="false" style={{display: 'inline', height: '14px', width: '14px', fill: 'currentcolor'}}><path fillRule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>{review.avg} (후기: {review.list!=null ? review.list.length : 0}개)</div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <hr/>
                            <h4>요금세부정보</h4>
                                <div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-9">
                                            <div style={{fontSize:'17px'}}>원가&nbsp;&nbsp;₩{dprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {dateChar}박</div>
                                        </div>
                                        <div className="col-3" align='right'>
                                            ₩{pprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-9">
                                            <div style={{fontSize:'17px'}}>서비스수수료</div>
                                        </div>
                                        <div className="col-3" align='right'>
                                            ₩{vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </div>
                                    <br></br>
                                    {fpoint > 0
                                    ?
                                    <div className="row">
                                        <div className="col-9">
                                            <div>포인트사용</div>
                                        </div>
                                        <div className="col-3" align='right'>
                                            -{fpoint}P
                                        </div>
                                    </div>
                                    :''
                                    }
                                    <br></br>
                                    {couponAmount > 0
                                    ?
                                    <div className="row">
                                        <div className="col-9">
                                        <div>쿠폰사용금액</div>
                                        </div>
                                        <div className="col-3" align='right'>
                                            -{couponAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                                        </div>
                                    </div>
                                    :''
                                    }
                                    <hr/>
                                    <div className="row">
                                        <div className="col-8">
                                            <div value={finalamount} style={{fontSize:'18px'}}>총 합계(KRW)&nbsp;&nbsp;&nbsp;</div>
                                        </div>
                                        <div className="col-4" align='right' style={{fontSize:'18px'}}>
                                            ₩{finalamount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div style={{marginBottom: '30px',marginTop:'55px'}}>
                        <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '420px', height:'380px', padding:'25px'}}>
                            <h4>할인적용</h4>
                            <br></br>
                            <h5 style={{marginBottom: '16px'}}>쿠폰</h5>

                            <div className="row">
                                <div className="col-7">
                                    <input style={{marginBottom: '16px'}} className="form-control" type="text" placeholder={couponAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} disabled></input>
                                </div>
                                <div className="col-5" align='right'>
                                    <div>
                                        <button className='btn btn-outline-dark' onClick={() => setModalOpen1(true)}>쿠폰조회</button>
                                    </div>
                                </div>
                            </div>

                            <div style={{color:'gray'}}>&nbsp;보유쿠폰 {count.c_count}장</div>

                            {modalOpen1 && (
                                    <div
                                        className={"modal-container4"}
                                        ref={modalBackground}
                                    >
                                        <div className={"modal-content4"}>
                                            <div className="row">
                                                <div className="col">
                                                    <h4>쿠폰 조회</h4>
                                                </div>
                                                <div className="col" align='right' >
                                                    <svg onClick={() => setModalOpen1(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ariaHidden="true" role="presentation" focusable="false" style={{display: 'inline', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible'}}><path d="m6 6 20 20M26 6 6 26"></path></svg>
                                                </div>
                                            </div>
                                            
                                            <hr></hr>
                                            
                                            <div style={{marginBottom: '5px',marginTop:'5px'}}>
                                                    <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '400px', height:'50px', padding:'9px'}}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='0' onClick={(e) => GetCoupon(e)}></input>
                                                                <label className="form-check-label" for="flexRadioDefault1">
                                                                    <div>적용안함</div>
                                                                </label>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div>보유쿠폰 {count.c_count}장</div>
                                            {coupon.map((item) => (
                                                <div style={{marginBottom: '5px',marginTop:'5px'}} className={"modal-scrollable"}>
                                                    <div align='left' style={{border: '1px solid rgb(221, 221, 221)', borderRadius: '12px', width: '400px', height:'80px', padding:'9px'}}>
                                                        <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={[item.Gcidx,Math.trunc(dprice * (item.Cbenefit/100))]} onClick={(e) => GetCoupon(e)}></input>
                                                            <label className="form-check-label" for="saleprice">
                                                                <tr>
                                                                    <td style={{fontWeight:'bold'}}>{item.Cname}</td>
                                                                    <td>{item.Cbenefit}%</td>
                                                                    <td>&nbsp;{'('}{Math.trunc(dprice * (item.Cbenefit/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원{')'}</td>
                                                                    {/* onChange={(e) => setCouponIdx(e.target.value)}*/}
                                                                </tr>
                                                                <tr>
                                                                    <td align='right' colSpan='2'>{item.Gcdeadline}까지 사용가능</td>
                                                                </tr>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <br></br>
                                            <div align='center'>
                                                <button className='btn btn-outline-dark' onClick={()=>handleCoupon()}>{couponAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 적용하기</button>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                                    <br></br>
                                    <br></br>
                            <div className="row">
                                <div className="col-4">
                                    <h5 style={{marginBottom: '16px'}}>포인트</h5>
                                </div>
                                <div className="col-8" align='right' >
                                
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-7">
                                    <input type='number' style={{marginBottom: '16px'}} className="form-control" placeholder='-0 P' value={pointAmount} onChange={(e) => PointAmount(e)}></input>
                                    {/* onChange={(e) => PointAmount(e)} */}
                                </div>
                                <div className="col-5" align='right' >
                                    <button className='btn btn-outline-dark' onClick={() => Handlepoint()}>포인트적용</button>
                                </div>
                            </div>

                            <div style={{color:'gray'}}>&nbsp;잔여포인트 {data.dto.g_point}P</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
}
export default Order;