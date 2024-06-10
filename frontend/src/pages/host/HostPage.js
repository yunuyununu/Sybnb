import React, {useRef, useCallback, useEffect, useState} from "react";
import { ArrowLeftCircle, ArrowRightCircle,CheckLg, StarFill } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderReviewItems from "../../component/SliderReviewItems";
import SliderHotelItems from "../../component/SliderHotelItems";
import Reputation from "./hotelDetailSection/Reputation";

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

function HostPage({}) {
    const {HIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hostPage/' + HIdx);
    const [rv, rvLoading] = useFetch(`http://localhost/host/hotel/allReview/${HIdx}`);
    const [hotel, hotelLoading] = useFetch('http://localhost/host/hotel/hotelSummary/' + HIdx);
    const [modal, setModal] = useState(false);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, 
        arrows: false
    };
    
    const slickRef = useRef(null);
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);
    
    const slickHotelRef = useRef(null);
    const previousHotel = useCallback(() => slickHotelRef.current.slickPrev(), []);
    const nextHotel = useCallback(() => slickHotelRef.current.slickNext(), []);

    if(loading || rvLoading || hotelLoading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {

        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        if (data.ho_level == 8){
            level = '호스트';
        } else {
            level = '슈퍼호스트';
        }

        let profile_src = '';
        let profile_url = '';
        if(data.h_profile !== '-'){
            profile_src = `http://localhost/static/images/host/profile/${data.h_profile}`;
            profile_url = `<img src=${profile_src} style="border-radius:55px; height:110px; width:110px;"/>`;
        } else {
            profile_src = `http://localhost/static/images/no-image.png`;
            profile_url = `<img src=${profile_src} width='70px' height='70px'/>`;
        }

        let hotel_src = `http://localhost/static/images/host/hotel/${hotel.ho_img}`;;
        let hotel_url = `<img src=${hotel_src} style="border-radius:45px; height:150px; width:150px;" />`;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card-style mb-30">
                            <div className="row">
                                <div className="col-6" style={{textAlign:'center', alignContent:'center'}}>
                                    <div className="mb-20" dangerouslySetInnerHTML={{__html : profile_url}}></div>
                                    <h2 className="mb-10">{data.h_name}</h2>
                                    <h6>{level}</h6>
                                </div>
                                <div className="col-6">
                                    <div>후기</div>
                                        <strong>{data.review_cnt}</strong>개
                                    <br />
                                    <hr />
                                    <div>평점</div>
                                        <strong>{data.star}</strong> <StarFill />
                                    <br />
                                    <hr />
                                    <div>호스팅 경력</div>
                                    <strong>{regdate}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="card-style mb-30">
                            <h4 className="mb-30">{data.h_name} 님의 인증 정보</h4>
                            {
                                data.h_profile != '-'
                                ?
                                <div className="mb-10">
                                    <CheckLg size={27} />
                                    　사업자등록증
                                </div>
                                : ''
                            }
                            {
                                data.h_phone != '-'
                                ?
                                <div className="mb-10">
                                    <CheckLg size={27} />
                                    　전화번호
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <h2 className="mt-20 mb-20">{data.h_name} 님 소개</h2>
                            <div>{data.h_description}</div>
                        <hr />
                        <div className="row">
                        <div className="col-10 mt-20 mb-20 h4">{data.h_name} 님의 후기</div>
                        <div className="col-1" style={{alignContent:'center'}}>
                            <div onClick={previous} style={{cursor:'pointer'}}>
                                <ArrowLeftCircle size={35} color="#CD9EED" />
                            </div>
                        </div>
                        <div className="col-1" style={{alignContent:'center'}}> 
                            <div onClick={next} style={{cursor:'pointer'}}>
                                <ArrowRightCircle size={35} color="#CD9EED" />
                            </div>
                        </div>
                        </div>
                        <div className="card-style mb-30">
                            <Slider {...settings} ref={slickRef}>
                                {rv.map((item, idx) => (
                                    <SliderReviewItems
                                        key={idx}
                                        g_name={item.g_name}
                                        g_photo={item.g_photo}
                                        rv_date={item.rv_date}
                                        rv_star={item.rv_star}
                                        rv_content={item.rv_content}
                                    />
                                ))}
                                {rv.length === 0
                                    ?
                                    <div className='container'>
                                        <div>
                                        <br></br><br></br><br></br>
                                            <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>등록된 호텔이 없습니다.</div>
                                            <br></br><br></br><br></br>
                                        </div>
                                    </div>
                                    :''
                                }
                            </Slider>
                        </div>
                        {/* <div className="text-bold" style={{cursor: 'pointer', textDecoration:'underline'}} onClick={() => setModal(true)}> 후기 {data.review_cnt}개 모두 표시하기</div>
                            { modal &&
                                <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                                    <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                                        <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                            X
                                        </button>
                                        <div className="container" style={{whiteSpace: 'pre-wrap', textAlign:'center'}}>
                                            
                                        </div>
                                    </div>
                                </div>
                            } */}
                        <hr />
                            {/* <Link to={`/host/hotel/hotelDetail/${hotel.ho_idx}/${hotel.d_idx}`} style={{textDecoration:'none', color : 'black'}}> */}
                        <div className="row">
                        <div className="col-10 mt-20 mb-20 h4">{data.h_name} 님의 숙소·체험</div>
                        <div className="col-1" style={{alignContent:'center'}}>
                            <div onClick={previousHotel} style={{cursor:'pointer'}}>
                                <ArrowLeftCircle size={35} color="#CD9EED" />
                            </div>
                        </div>
                        <div className="col-1" style={{alignContent:'center'}}> 
                            <div onClick={nextHotel} style={{cursor:'pointer'}}>
                                <ArrowRightCircle size={35} color="#CD9EED" />
                            </div>
                        </div>
                        </div>
                        <div className="card-style mb-30">
                            <Slider {...settings} ref={slickHotelRef}>
                                {hotel.map((item, idx) => (
                                    <SliderHotelItems
                                        key={idx}
                                        ho_idx={item.ho_idx}
                                        d_idx={item.d_idx}
                                        ho_img={item.ho_img}
                                        ho_name={item.ho_name}
                                        ho_address={item.ho_address}
                                    />
                                ))}
                                {hotel.length === 0
                                    ?
                                    <div className='container'>
                                        <div>
                                        <br></br><br></br><br></br>
                                            <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>등록된 호텔이 없습니다.</div>
                                            <br></br><br></br><br></br>
                                        </div>
                                    </div>
                                    :''
                                }
                            </Slider>
                        </div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        )
    }
};

export default HostPage;