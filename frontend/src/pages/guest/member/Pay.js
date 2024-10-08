import React, {useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import PayItem from "./PayItem";

function Pay() {
    const cookies = new Cookies();
    const g_idx=cookies.get('g_idx');
    const [paylist,setPayList] = useState([]);


    function getPay(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setPayList(data);
        });
    }

    useEffect(() => {getPay('http://localhost/guest/pay?g_idx='+g_idx.key);},[]);


        return (
            <>
            <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-7" align='left'>
                        <div style={{marginBottom: '30px',marginLeft: '50px'}}>
                        <h2><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                        </svg>&nbsp;결제내역</h2>
                        {paylist.length === 0
                        ? 
                        <div className='container'>
                            <div className="col-7">
                            <br></br><br></br><br></br>
                                <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>결제내역이 없습니다.</div>
                                <br></br><br></br><br></br>
                            </div>
                        </div>
                        :
                        <>
                            {paylist.map(
                                ({O_idx,G_idx,Ho_idx,D_idx,D_img1,O_state,O_orderdate,O_payment,O_ckin,O_ckout,O_finalprice,O_refunddate})=>(
                                    <PayItem
                                    O_idx={O_idx}
                                    G_idx={G_idx}
                                    Ho_idx={Ho_idx}
                                    D_idx={D_idx}
                                    D_img1={D_img1}
                                    O_state={O_state}
                                    O_orderdate={O_orderdate}
                                    O_payment={O_payment}
                                    O_ckin={O_ckin}
                                    O_ckout={O_ckout}
                                    O_finalprice={O_finalprice}
                                    O_refunddate={O_refunddate}
                                    key={G_idx}
                                    />
                                )
                            )}
                        </>
                        }
                                

                        </div>
                    </div> 
                    <div className="col-4" align='left'>
                        <br></br><br></br><br></br>
                        <div className="card" style={{width: '23rem',height: '16rem', padding:'1rem'}}>
                            <div className="card-body" align='left'>
                            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '48px', width: '48px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}><g><g stroke="none"><path d="m41.999 10v24h-4.287l1.01-.6546823c.242375-.158375.3706719-.3933125.3998895-.6646172l.0064994-.1183828c.004513-1.4230639-2.4648559-3.6737529-5.4115565-1.9238459l-.1928324.1198459-5.278 3.2416823-2.2539866.0005578c.1712874-1.0118843-.1666572-1.9090959-.8837185-1.9909612l-.1084949-.0060789-19.0018-.0005177.001-22.003z" fill-opacity=".2"></path><path d="m44 6c1.0543618 0 1.9181651.81587779 1.9945143 1.85073766l.0054857.14926234v28c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-12.446l3.079-2h9.367v-28h-40v24.0033177c-.51283584 0-.93550716.3860402-.99327227.8833788l-.00672773.1166212-.00007248 4.729076c-.55177975-.3192182-.93689844-.8944853-.9928825-1.5633277l-.00704502-.169066v-28c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm-20 9c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm-15-5c.55228475 0 1 .4477153 1 1s-.44771525 1-1 1-1-.4477153-1-1 .44771525-1 1-1z"></path></g><g fill="none" stroke-width="2"><path d="m24.9998 32.0035177c1.3716282 0 1.5099129 2.8120004-.3683588 4.2183752l8.8925588-5.4635752c3.031-1.968 5.609.35 5.6043889 1.804-.0013889.321-.1293889.602-.4063889.783l-17.2344901 11.1920163c-.947203.6151103-2.110299.8011277-3.2021.5121216l-14.54130246-3.8491683c-.43862489-.1161066-.74410744-.5129735-.74410744-.9667052v-7.2302644c0-.5522848.44771525-1 1-1z"></path><path d="m13.9998 37.0035177h8.051c1.2682235 0 2.2021119-.4127594 2.8457108-1.0010914"></path></g></g></svg>
                                <div style={{paddingBottom:'10px'}}></div>
                            <h5 style={{paddingBottom:'10px'}}>에어비앤비를 통해서만 결제하세요.</h5>
                            <div>에어비앤비의 서비스 약관, 결제 서비스 약관, 환불 정책 및 기타 안전장치의 보호를 받으려면 항상 에어비앤비를 통해 결제와 커뮤니케이션을 진행하시기 바랍니다.</div>
                            </div>
                        </div>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                        <br></br><br></br><br></br>
                    </div>

                    </div>
                </div>
            </>
        )
}
export default Pay;