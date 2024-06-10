import React, {useRef, useEffect, useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import KakaoMap from "../../component/KakaoMap";
import HotelDescription from "./hotelDetailSection/HotelDescription";
import HotelRooms from "./hotelDetailSection/HotelRooms";
import HostInfo from "./hotelDetailSection/HostInfo";
import HotelRule from "./hotelDetailSection/HotelRule";
import HotelAmenities from "./hotelDetailSection/HotelAmenities";
import Reservation from "./hotelDetailSection/Reservation";
import Reputation from "./hotelDetailSection/Reputation";
import { AwardFill, FileEarmarkImage, StarFill } from "react-bootstrap-icons";
import DateRangeSelector from "../../component/DateRangeSelector";
import moment from "moment";
import "moment/locale/ko";

const {Kakao} = window;


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

function HotelDetail() {
    const {HoIdx} = useParams();
    let {dIdx} = useParams();
    const navigate = useNavigate();
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx);
    const [review, loading2] = useFetch('http://localhost/api/reputation/list/' + HoIdx);
    const element = useRef(null);
    const onMoveBox = () => {
        element.current?.scrollIntoView({behavior : "smooth", block:"start"});
    }

    var Arr = [];
    useEffect(() => {
        var myArr = localStorage.getItem('watched');
        if(myArr == null) {
            myArr = [];
        } else {
            myArr = JSON.parse(myArr);
        }
        for (let i = 0; i<myArr.length; i++) {
            if (myArr[i] == HoIdx) {
            } else {
                Arr.push(myArr[i]);
            }
        }
        Arr.push(HoIdx);
        myArr = new Set(Arr);
        myArr = [...myArr];
        localStorage.setItem('watched', JSON.stringify(myArr));
    }, []);

    const realUrl = "http://localhost:3000";
    const resultUrl = window.location.href;

    useEffect(() => {
        //초기화 전 clean up
        Kakao.cleanup();
        Kakao.init('3a200d4b8b334dd0270039e106f222e1');
    }, []);

    if(loading || loading2){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let regdate = moment(data.h_regdate).fromNow();
        let level = '';
        let answer = '';
        if (data.ho_level == 8){
            level = '호스트';
            answer = '85%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
        }
        let src = '';
        let img_url = '';
        if(data.ho_img !== '-'){
            src = `http://localhost/static/images/host/hotel/${data.ho_img}`;
            img_url = `<img src=${src} style="height:440px; width:600px;"/>`;
        } else {
            img_url = '';
        }

        let hotel_src2 = '';
        let hotel_url2 = '';
        let hotel_url2_2 = '';
        if(data.d_img1 !== '-'){
            hotel_src2 = `http://localhost/static/images/host/hotel/${data.d_img1}`;
            hotel_url2 = `<img src=${hotel_src2} style="height:440px; width:300px;"/>`;
            hotel_url2_2 = `<img src=${hotel_src2} style="height:440px; width:100%;"/>`;
        } else {
            hotel_url2 = '';
        }

        let hotel_src3 = '';
        let hotel_url3 = '';
        if(data.d_img2 !== '-'){
            hotel_src3 = `http://localhost/static/images/host/hotel/${data.d_img2}`;
            hotel_url3 = `<img src=${hotel_src3} style="height:440px; width:300px;"/>`;
        } else {
            hotel_url3 = '';
        }

        let profile_src = '';
        let profile_url = '';
        if(data.h_profile !== '-'){
            profile_src = `http://localhost/static/images/host/profile/${data.h_profile}`;
            profile_url = `<img src=${profile_src} width='90px' height='90px'/>`;
        } else {
            profile_src = `http://localhost/static/images/no-image.png`;
            profile_url = `<img src=${profile_src} width='70px' height='70px'/>`;
        }

        const shareKakao = () => {
            Kakao.Share.sendDefault({
                objectType : 'commerce',
                content : {
                    title : 'sybnb - 호텔 예약 사이트',
                    imageUrl : 'https://ifh.cc/g/dGvtZ8.png',
                    link : {mobileWebUrl : realUrl}
                },
                commerce: {
                    productName: data.ho_name,
                    regularPrice: data.d_price
                },
                buttons: [
                    {
                    title: '호텔 보러 가기',
                    link: {
                        mobileWebUrl: 'http://localhost:3000/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx,
                        webUrl: 'http://localhost:3000/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx,
                    },
                    },
                    {
                    title: '사이트 보러 가기',
                    link: {
                        mobileWebUrl: 'http://localhost:3000',
                        webUrl: 'http://localhost:3000',
                    },
                    },
                ],
            })
        }

        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-10">
                        <h2>{data.ho_name}</h2>
                    </div>
                    <div className="col-2" style={{textAlign:'right', cursor: 'pointer'}}>
                        <div onClick={() => {
                            shareKakao()
                        }}>
                            <img src="/img/share.png" width="25px" height="25px"/>
                            &nbsp;공유하기
                        </div>
                    </div>
                </div>
                <br />
                <div className="row mb-30">
                    <div className="card-style" style={{width : '1500px', height:'500px'}}>
                        {data.d_img2 !== '-'
                        ?
                            <div className="row">
                                <div className="col-6" dangerouslySetInnerHTML={{__html : img_url}}></div>
                                <div className="col-3" dangerouslySetInnerHTML={{__html : hotel_url2}}></div>
                                <div className="col-3 z-0" style={{position:'relative'}}>
                                    <span dangerouslySetInnerHTML={{__html : hotel_url3}}></span>
                                    <button className="main-btn" style={{position:'absolute', top : '410px', left:'150px'}} 
                                        onClick={() => navigate("/host/hotel/HotelImage", {
                                            state : {
                                                HoIdx : HoIdx,
                                                dIdx : dIdx
                                            }
                                        })}> <FileEarmarkImage size={18} /> 사진 모두 보기
                                    </button>
                                </div>
                            </div>
                        :                    
                            <div className="row">
                                <div className="col-6" dangerouslySetInnerHTML={{__html : img_url}}></div>
                                <div className="col-6 z-0">
                                    <div style={{width:'600px'}}><span dangerouslySetInnerHTML={{__html : hotel_url2_2}}></span></div>
                                    <button className="main-btn" style={{position:'absolute', top : '440px', left:'1130px'}} 
                                        onClick={() => navigate("/host/hotel/HotelImage", {
                                            state : {
                                                HoIdx : HoIdx,
                                                dIdx : dIdx
                                            }
                                        })}> <FileEarmarkImage size={18} /> 사진 모두 보기
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div>
                            <h3>{data.ho_address}</h3>
                            <div>최대 인원 {data.d_capacity}명 · 침대 {data.d_beds}개 · 면적 {data.d_area}㎡</div>
                            <br />
                            <div>                            
                                {
                                    level === '슈퍼호스트'
                                    ? <div className="card-style" style={{textAlign:'center'}}>
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="row">
                                                    <h5>별점</h5>
                                                </div>
                                               <span>
                                                    <StarFill /> {review.avg}
                                              </span>
                                            </div>
                                            <div className="col-5" style={{alignContent:'center'}}>
                                                <div className="row">
                                                    <span>
                                                        <AwardFill  size={24}/>
                                                        <strong>게스트 선호</strong>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="row">
                                                    <h5>후기</h5>
                                                </div>
                                                <span>
                                                    {review.list!=null ? review.list.length : 0} 개
                                                </span>
                                            </div>
                                        </div>
                                     </div>
                                    : <div> </div>
                                }
                            </div>
                            <br />
                            <div className="row" onClick={onMoveBox}>
                                <div className="col-3" style={{textAlign : 'center'}} dangerouslySetInnerHTML={{__html : profile_url}}></div>
                                <div className="col-9" style={{alignSelf : 'center'}}>
                                  
                                    <div><b> 호스트 : {data.h_name}님 </b></div>
                                    <div>{level} · 호스팅 경력 {regdate}</div>

                                </div>
                            </div>
                            <hr />
                            <h4 className="mb-20">숙소 소개</h4>
                                <div>
                                    <HotelDescription />
                                </div>
                            <hr />
                            <h4 className="mb-20">선택 가능한 객실 유형</h4>
                                <div> 
                                    <HotelRooms />
                                </div>
                            <hr />
                            <h4 className="mb-20">숙소 편의시설</h4>
                                <HotelAmenities />
                            <hr />
                            <h4>
                                {data.ho_name}에서 
                            </h4>
                            <div>
                                <DateRangeSelector />
                            </div>
                            <hr />
                            <h4>숙소 후기</h4>
                            <br/>
                            <div className="z-1" style={{position:'relative'}}>
                                <Reputation />
                            </div>
                            <hr />
                            <h4>숙소 위치</h4>
                                <div className="z-0" style={{position:'relative'}}>{data.ho_address}
                                <br />
                                    <KakaoMap />
                                </div>
                            <hr />
                            <h4 className="mb-30">호스트 소개</h4>
                                <div ref={element}><HostInfo /></div>
                            <hr />
                            <h4 className="mb-20">알아두어야 할 사항</h4>
                                <div>
                                    <HotelRule />
                                </div>
                        </div>
                    </div>
                    
                    <div className="col-4">
                        <Reservation className="z-0" style={{position:'relative'}} />
                    </div>
                </div>
            </div>
        )
    }
};

export default HotelDetail;