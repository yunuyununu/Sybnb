import React, {useCallback,useRef,useEffect,useState} from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import Slider from "react-slick";
import Slider1 from "react-slick";
import GuestReview from "./GuestReview";
import HostReply from "./HostReply";

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

function Profile() {

    const cookies = new Cookies();
    const idx=cookies.get('g_idx');
    const [data,loading]=useFetch('http://localhost/guest/my?g_idx='+idx.key);
    const [data1,loading1]=useFetch('http://localhost/guest/reviewcount?g_idx='+idx.key);
    const [data2,loading2]=useFetch('http://localhost/guest/joindate?g_idx='+idx.key);
    
    const [reviewlist,setReviewList] = useState([]);
    const [replylist,setReplyList] = useState([]);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);
    const modalBackground = useRef();

    const slickRef = useRef(null);
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    const slickRef2 = useRef(null);
    const previous2 = useCallback(() => slickRef2.current.slickPrev(), []);
    const next2 = useCallback(() => slickRef2.current.slickNext(), []);

    const [sliderActive,setSliderActive] = useState(true);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, 
        arrows: false
    };

    function getReviewList(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
            setReviewList(data);
        });
    }

    useEffect(() => {getReviewList('http://localhost/guest/review?g_idx='+idx.key);},[]);

    function getReplyList(url) {
        fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
            setReplyList(data);
        });
    }

    useEffect(() => {getReplyList('http://localhost/guest/reply?g_idx='+idx.key);},[]);

    

if(loading||loading1||loading2){
    return(
        <div>loading</div>
    )
} else {
    let src='';
    let image_url='';
    if (data.dto.g_photo === '-') {
      src='/img/image_no.png';
      image_url=`<img class='profile-img' src=${src} width='120px' height='120px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src=`http://localhost/static/images/guest/photo/${data.dto.g_photo}`;
      image_url=`<img class='profile-img' src=${src} width='120px' height='120px' style={{backgroundSize:"contain";}}/>`; 
    }

    let level = '';
    if (data.dto.g_level === 1) {
        level = 'regular';
    } else if (data.dto.g_level === 2) {
        level = 'super';
    } else if (data.dto.g_level === 3) {
        level = 'VIP';
    }
 return (
    <>
        <div className="container" align='center' style={{position: 'static'}}>
                <div className="row">
                    
                    <div className="col-5">
                    <div className="container-lg">
                            <div style={{paddingLeft: '100px'}}>
                                    <br/>
                                <div className="card-stylee mb-50" >
                                    <div className="container text-center">
                                        <div className="row">
                                            <div className="col" style={{ lineHeight: '2.1'}}>
                                            <span dangerouslySetInnerHTML={{ __html: image_url}}></span>
                                            <h4>{data.dto.g_name}</h4>
                                            <div>{level}게스트</div>
                                            </div>
                                            <div className="col">
                                            <h5>후기</h5>
                                            <div>{data1.dto.reviewcount}개</div>
                                            <hr></hr>
                                            <h5>sybnb 가입 기간</h5>
                                            <div>{data2.dto.joindate}일</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 인증정보구간 */}
                                <div className="card" style={{width: '23rem',height: '16rem', padding:'1rem'}}>
                                    <div className="card-body" align='left'>
                                        <h4>{data.dto.g_name}님의 인증 정보</h4>
                                        <div style={{lineHeight: '2.9'}}>
                                         
                                            {data.dto.g_profile === "미인증"
                                            ?
                                            <tr>
                                                <td><svg xmlns="http://www.w3.org/2000/svg" color='red' width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                                </svg></td>
                                                <td>신분증</td>
                                            </tr>
                                            :
                                            <tr>
                                                <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                                <td>신분증</td>
                                            </tr>
                                            }

                                         
                                         <tr>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                            <td>이메일 주소</td>
                                         </tr>
                                         <tr>
                                            <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '24px', width: '24px', stroke: 'currentcolor', strokeWidth: '2.66667', overflow: 'visible'}}><path fill="none" d="m4 16.5 8 8 16-16"></path></svg></td>
                                            <td>전화번호</td>
                                         </tr> 
                                         </div>
                                        <a className="nav-link active">
                                            <div className={"btn-wrapper2"}>
                                                <a className={"modal-open-btn"} style={{textDecoration:'underline',cursor: 'pointer'}}
                                                onClick={() => {setModalOpen1(true); setSliderActive(false);}}>본인 인증 절차 자세히 알아보기</a>
                                            </div>
                                            </a>
                                            {modalOpen1 && (
                                            <div
                                                className={"modal-container3"}
                                                ref={modalBackground}
                                                onClick={(e) => {
                                                if (e.target === modalBackground.current) {
                                                    setModalOpen1(false);
                                                    setSliderActive(true);
                                                }
                                                }}
                                            >
                                                <div className={"modal-content3"}>
                                                <h4>본인 인증이란?</h4>
                                                <hr></hr>
                                                <p>'본인 인증' 절차를 거쳤거나 본인 인증 배지를 가지고 있다는 것은 sybnb 본인 인증 절차를 완료하기 위해 정보를 제공했다는 사실만을 의미합니다. 이 절차는 안전 장치를 갖추고 있지만, 누군가의 신원을 보장하지는 않습니다. </p>
                                                </div>
                                            </div>
                                            )}

                                    </div>
                                </div>
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
                    <div className="col-7">
                        <div className="container-lg"></div>
                        <div align='left'>
                            <h2>{data.dto.g_name} 님 소개</h2>
                            <hr></hr>
                            <h3>{data.dto.g_name} 님에 대한 호스트의 답변</h3>

                            <div align='right'>
                                    <div className="col-6">
                                        <a className="col-1">
                                            <a onClick={previous} style={{cursor:'pointer'}}>
                                                <ArrowLeftCircle size={35} color="#CD9EED" />
                                            </a>
                                        </a>
                                        &nbsp;&nbsp;
                                        <a className="col-1"> 
                                            <a onClick={next} style={{cursor:'pointer'}}>
                                                <ArrowRightCircle size={35} color="#CD9EED" />
                                            </a>
                                        </a>
                                    </div>
                                  </div>
                                  &nbsp;
                                  {sliderActive && (
                                    <div className="card-style mb-30">
                                        <Slider1 {...settings} ref={slickRef}>
                                            {replylist.map(({G_idx,H_idx,H_profile,H_name,Rp_date,Rp_content}) => (
                                                <HostReply
                                                    key={idx}
                                                    G_idx={G_idx}
                                                    H_idx={H_idx}
                                                    H_name={H_name}
                                                    H_profile={H_profile}
                                                    Rp_date={Rp_date}
                                                    Rp_content={Rp_content}
                                                />
                                            ))}
                                            {replylist.length === 0
                                            ?
                                            <div className='container'>
                                                <div>
                                                <br></br><br></br><br></br>
                                                    <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>등록된 답변이 없습니다.</div>
                                                    <br></br><br></br><br></br>
                                                </div>
                                            </div>
                                            :''
                                            }
                                        </Slider1>
                                    </div>
                                  )}
                            <hr></hr>
                            <h3>내가 작성한 후기</h3>

                            <div align='right'>
                                    <div className="col-6">
                                        <a className="col-1" style={{alignContent:'center'}}>
                                            <a onClick={previous2} style={{cursor:'pointer'}}>
                                                <ArrowLeftCircle size={35} color="#CD9EED" />
                                            </a>
                                        </a>
                                        &nbsp;&nbsp;
                                        <a className="col-1" style={{alignContent:'center'}}> 
                                            <a onClick={next2} style={{cursor:'pointer'}}>
                                                <ArrowRightCircle size={35} color="#CD9EED" />
                                            </a>
                                        </a>
                                    </div>
                                  </div>
                                  &nbsp;
                                  {sliderActive && (
                                    <div className="card-style mb-30">
                                        <Slider {...settings} ref={slickRef2}>
                                            {reviewlist.map(({G_idx, Rv_idx, H_idx,D_img1,Ho_name,Rv_date,Rv_content}) => (
                                                <GuestReview
                                                    key={idx}
                                                    G_idx={G_idx}
                                                    Rv_idx={Rv_idx}
                                                    H_idx={H_idx}
                                                    D_img1={D_img1}
                                                    Ho_name={Ho_name}
                                                    Rv_date={Rv_date}
                                                    Rv_content={Rv_content}
                                                />
                                            ))}
                                            {reviewlist.length === 0
                                            ?
                                            <div className='container'>
                                                <div>
                                                <br></br><br></br><br></br>
                                                    <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>등록된 후기가 없습니다.</div>
                                                    <br></br><br></br><br></br>
                                                </div>
                                            </div>
                                            :''
                                            }
                                        </Slider>
                                    </div>
                                  )}
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div> 
                    </div>
                </div>
            </div>
    </>
 )
}
}
export default Profile;