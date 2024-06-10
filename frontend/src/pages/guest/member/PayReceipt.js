import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate, useLocation } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import "moment/locale/ko";

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
});

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

function PayPDF() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const location = useLocation();
    const HoIdx = location.state.Hoidx;
    const DIdx = location.state.Didx;
    const OIdx = location.state.Oidx;

    const [data, loading] = useFetch('http://localhost/guest/receipt/'+idx.key+'/'+DIdx+'/'+HoIdx+'/'+OIdx);

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png",1.0);
            const imgWidth = 210, padding = 20; // 이미지 가로 길이(mm) A4 기준
            const pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const position = 0;
 
            const pdf = new jsPDF('p','mm');
            pdf.addImage(imgData, "JPEG",position,padding, imgWidth, imgHeight);
            // pdf.output('dataurlnewwindow');
            pdf.save("Sybnb Receipt.pdf");
        });
    };
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let start = moment(data.o_ckin);
        let end = moment(data.o_ckout);
        let bak =moment.duration(end.diff(start)).asDays();
        let price = bak * data.o_price;

        let count = data.o_adult + data.o_child + data.o_baby;

        let hotel = `http://localhost/static/images/host/hotel/`+data.ho_img;
        let img =`<img src=${hotel} width='80px' height='80px' /><br />`;

        let payment='';
        if(data.o_payment === '1') {
            payment = '나이스페이먼츠';
        }else if (data.o_payment === '2') {
            payment = '카카오페이';
        }
        return (
            <>
            <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    <div className="col-11">
                        <div align='right'>
                            <button className='btn btn-outline-dark' onClick={printDocument}>Print</button>
                        </div>
                    </div>
                </div>
                <div id='divToPrint'>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10" align='left'>
                            <h2>영수증 상세내역</h2>
                            <br></br>
                            <div>영수증 ID : {data.paymentId} · {data.o_orderdate}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-5">
                        <div className="container-lg">
                                <div>
                                    <div align='left'>
                                        <br></br>
                                        <br></br>
                                        <div style={{marginBottom: '30px'}}>
                                            <div style={{border: '1px solid rgb(221, 221, 221)', width: '420px', height:'440px', padding:'20px'}}>
                                                <div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h4>{data.ho_name}에서 {bak}박</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <div className="row">
                                                        <div className="col-8">
                                                                <tr>{data.o_ckin} → {data.o_ckout}</tr>
                                                                <tr>{data.d_room_type}</tr>
                                                                <tr>침대 {data.d_beds}개</tr>
                                                                <tr>{count}명</tr>
                                                                <tr style={{color: 'gray'}}>호스트 : {data.h_name}</tr>
                                                                <tr style={{cursor: 'pointer', textDecoration:'underline'}} onClick={() => {
                                                                    navigate('/host/hotel/hotelDetail/'+HoIdx+'/'+DIdx);
                                                                }}>숙소페이지로 이동</tr>
                                                        </div>
                                                        <div className="col-4" align='right'>
                                                            <span dangerouslySetInnerHTML={{__html: img}}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <div className="row">
                                                        <div className="col">
                                                                <tr style={{color: 'gray'}}>게스트 : {data.g_name}</tr>
                                                                <br></br>
                                                                <h5>환불정책</h5>
                                                                <br></br>
                                                                <tr>체크인 전날까지는 무료 취소가 가능합니다. 그 이후에 취소하면 예약 대금이 환불되지 않습니다.</tr>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <h4>질문이 있으신가요?</h4>
                                        <br></br>
                                        <div>결제 및 환불과 관련한 자세한 사항은 결제 페이지나 관련 도움말에서 확인하실 수 있습니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div style={{marginBottom: '30px'}}>
                            <br></br><br></br>
                                <div align='left' style={{border: '1px solid rgb(221, 221, 221)', width: '420px', height:'360px', padding:'25px'}}>
                                    <h4>요금 내역</h4>
                                        <div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col">
                                                    <div style={{fontSize:'17px'}}>₩{data.o_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} X {bak}박</div>
                                                </div>
                                                <div className="col" align='right'>
                                                    <div>₩{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col">
                                                    <div style={{fontSize:'17px'}}>서비스 수수료</div>
                                                </div>
                                                <div className="col" align='right'>
                                                    <div>₩{(data.o_price * 0.2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col">
                                                    <div style={{fontSize:'17px'}}>포인트 사용금액</div>
                                                </div>
                                                <div className="col" align='right'>
                                                    <div>-{(data.o_discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col">
                                                    <div style={{fontSize:'17px'}}>쿠폰 사용금액</div>
                                                </div>
                                                <div className="col" align='right'>
                                                    <div>-₩{(data.o_benefit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <hr/>
                                            <div className="row">
                                                <div className="col">
                                                    <div style={{fontSize:'18px',fontWeight: 'bold'}}>총 합계(KRW)</div>
                                                </div>
                                                <div className="col" align='right' style={{fontWeight: 'bold'}}>
                                                    <div>₩{data.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <div style={{marginBottom: '30px',marginTop:'55px'}}>
                                <div align='left' style={{border: '1px solid rgb(221, 221, 221)', width: '420px', height:'220px', padding:'25px'}}>
                                    {data.o_refunddate === "0"
                                    ?
                                    <>
                                        <h4>결제</h4>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-8">
                                            <div>{payment}</div>
                                            <div>{data.o_orderdate}</div>
                                            </div>
                                            <div className="col-4" align='right' >
                                                <div>₩{data.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col">
                                                <div style={{fontWeight: 'bold'}}>결제금액 (KRW)</div>
                                            </div>
                                            <div className="col" align='right' >
                                                <div style={{fontWeight: 'bold'}}>₩{data.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h4>환불</h4>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-8">
                                            <div>{payment}</div>
                                            <div>{data.o_refundate}</div>
                                            </div>
                                            <div className="col-4" align='right' >
                                                <div>-₩{data.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col">
                                                <div>환불금액 (KRW)</div>
                                            </div>
                                            <div className="col" align='right' >
                                                <div>-₩{data.o_finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                            </div>
                                        </div>
                                    </>
                                    }
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row" align='left'>
                        <div className="col-1"></div>
                            <div className="col-10">
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <div style={{color: 'gray', fontWeight: 'bold'}}>Sybnb Payments KR Ltd.</div>
                                <div style={{color: 'gray'}}>Sybnb Payments는 호스트의 대금 수령 한정 대리인입니다. 따라서 Sybnb Payments를 통해 전액을 결제하면 호스트에 대한 지급 의무를 다하는 것입니다. 환불 요청은 (1)호스트의 환불 정책(숙소 페이지에서 확인 가능)또는 (2)재예약 및 환불 정책 약관에 따라 처리됩니다.</div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <div align='right'>
                                    <img src='/img/sybnb2.png' align='right' style={{width: '160px', height: '48px'}}></img>
                                </div>
                                <br></br>
                            </div>
                        <div className="col-1"></div>
                    </div>
                        <br></br>
                        <br></br>
                </div>
            </div>
            </>
        );
    }
};
export default PayPDF;
