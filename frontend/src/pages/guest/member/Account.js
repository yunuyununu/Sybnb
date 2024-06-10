import React, {useRef,useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
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

function Account() {
    const navigate = useNavigate();

    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);

    if(loading){
        return(
            <div>loading</div>
        )
    } else { 
    return(
        <>
        <div  className="container" align='center' style={{position: 'static'}}>
            <div className="row">
                <div className="col-12">
                    <div className="container-lg">
                        <h2>계정</h2>
                    </div>
                    <br></br>
                    <div>{data.dto.g_name}, {data.dto.g_email} · <a style={{fontWeight: 'bold',cursor: 'pointer'}} onClick={() => navigate('/guest/Profile')}>프로필로 이동</a></div>
                
                <br />
                <br></br>
                <br></br>
            
                <div align='center'>
                    <div className={'btn-wrapper'}>
                        <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px',cursor: 'pointer'}} onClick={() => navigate('/guest/Guestinfo')}>
                            <br/><br/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px',display: 'block', height: '32px', width: '32px', fill: 'currentcolor'}}>
                                <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z"></path></svg>
                            <div style={{fontSize: '20px', paddingTop:'5px'}}>로그인 및 보안</div>
                        </div>
                    </div>
                    <div className={'btn-wrapper'}>
                        <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px',cursor: 'pointer'}} onClick={() => navigate('/guest/Pay')}>
                            <br/><br/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px', display: "block", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M25 4a2 2 0 0 1 2 1.85V8h2.04c1.04 0 1.88.82 1.96 1.85V26c0 1.05-.8 1.92-1.81 2H6.96a1.98 1.98 0 0 1-1.95-1.85L5 26v-2H3a2 2 0 0 1-2-1.85V6a2 2 0 0 1 1.85-2H3zm2 18a2 2 0 0 1-1.85 2H7v2h22V10h-2zM25 6H3v16h22zm-3 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8-8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                        <div style={{fontSize: '20px', paddingTop:'5px'}}>결제</div>
                        </div>
                    </div>
                    <div className={'btn-wrapper'}>
                        <div className='shadow p-1 mb-5 border border-success p-2 border-opacity-10 rounded' style={{width: '300px', height: '200px',cursor: 'pointer'}} onClick={() => navigate('/guest/Coupon')}>
                        <br/><br/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{marginBottom: '10px', display: "block", height: "32px", width: "32px", fill: "currentcolor"}}><path d="M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zM13.59 17H4v11h11v-9.59l-4.3 4.3-1.4-1.42zM28 17h-9.59l4.3 4.3-1.42 1.4L17 18.42V28h11zM15 4H4v11h3.54a4 4 0 0 1 6.28-4.84c.29.28.68.85 1.18 1.74zm6 7c-.53 0-.98.17-1.42.6-.21.2-.63.87-1.22 1.98l-.25.47-.5.95H21a2 2 0 0 0 1.98-1.7l.01-.15L23 13a2 2 0 0 0-2-2zm7-7H17v7.9c.5-.89.89-1.46 1.18-1.74A4 4 0 0 1 24.46 15H28zm-17 7a2 2 0 0 0-2 2v.15A2 2 0 0 0 11 15h3.38l-.49-.95-.36-.69c-.54-.98-.91-1.58-1.1-1.76-.45-.43-.9-.6-1.43-.6z"></path></svg>
                        <div style={{fontSize: '20px', paddingTop:'5px'}}>쿠폰 및 포인트</div>
                        </div>
                    </div>
                </div>
            
            <br/>
            <br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/>
            </div></div></div>
        </>
    )
}
}
export default Account;