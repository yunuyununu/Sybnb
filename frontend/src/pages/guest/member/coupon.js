import React, {useEffect,useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

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

function Coupon() {

    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);
    const [coupon,loading2]=useFetch('http://localhost/guest/coupon?g_idx='+idx.key);
    const [count,loading3]=useFetch('http://localhost/guest/c_count?g_idx='+idx.key);

    if(loading||loading2||loading3){
        return(
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="container-lg">
                                <div>
                                    <div align='left'>
                                        <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px', display: "inline", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zM13.59 17H4v11h11v-9.59l-4.3 4.3-1.4-1.42zM28 17h-9.59l4.3 4.3-1.42 1.4L17 18.42V28h11zM15 4H4v11h3.54a4 4 0 0 1 6.28-4.84c.29.28.68.85 1.18 1.74zm6 7c-.53 0-.98.17-1.42.6-.21.2-.63.87-1.22 1.98l-.25.47-.5.95H21a2 2 0 0 0 1.98-1.7l.01-.15L23 13a2 2 0 0 0-2-2zm7-7H17v7.9c.5-.89.89-1.46 1.18-1.74A4 4 0 0 1 24.46 15H28zm-17 7a2 2 0 0 0-2 2v.15A2 2 0 0 0 11 15h3.38l-.49-.95-.36-.69c-.54-.98-.91-1.58-1.1-1.76-.45-.43-.9-.6-1.43-.6z"></path></svg>&nbsp;쿠폰 및 포인트</h2>
                                    </div>
                                        <br/>
                                    <div className="card-style mb-30" >
                                        <h4 align='left'>포인트</h4>
                                        <br></br>
                                        <div className="card-style mb-20" align='left'>
                                            <div align='left' style={{fontSize: '18px'}}>MyPoint : {data.dto.g_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                        </div>
                                        <h4 align='left'>쿠폰</h4>
                                        <br></br>
                                        {count.c_count >0
                                        ?
                                        <div>
                                            <div align='left' style={{fontSize: '13px'}}>* 보유하고 있는 쿠폰목록</div>
                                                <table className="tbl">
                                                    <thead>
                                                        <tr>
                                                            <th>쿠폰종류</th>
                                                            <th>쿠폰명</th>
                                                            <th>할인율</th>
                                                            <th>기한</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {coupon.map((item) => (
                                                            <tr style={{textAlign:'center'}}>
                                                                <td>{item.Cname}</td>
                                                                <td>{item.Cdiv}</td>
                                                                <td>{item.Cbenefit}%</td>
                                                                <td>{item.Gcissue} ~ {item.Gcdeadline}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                        </div>
                                        :
                                        <div className="card-stylee mb-30" >
                                            <br></br>
                                            <br></br>
                                        <div>보유하고 있는 쿠폰이 없습니다.</div>
                                            <br></br>
                                            <br></br>
                                        </div>
                                        }
                                        <br></br>
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br>
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                        <br></br> 
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            </>
        )
    }
}
export default Coupon;