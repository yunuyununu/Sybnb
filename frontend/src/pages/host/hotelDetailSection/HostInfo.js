import React, {useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/ko";
import Cookies from "universal-cookie";
import { StarFill } from "react-bootstrap-icons";

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

function HostInfo() {
    const cookies = new Cookies();
    const gEmail = cookies.get("g_email");

    const navigate = useNavigate();
    const {HoIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hostInfo/' + HoIdx);
    const [review, loading2] = useFetch('http://localhost/api/reputation/list/' + HoIdx);
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
            answer = '80%';
        } else {
            level = '슈퍼호스트';
            answer = '100%';
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
        return (
            <div>
                <div className="card-style" style={{backgroundColor : "#F6F2F9"}}>
                    <div className="row">
                        <div className="col-6">
                            <div className="card-style mb-30">
                                <div className="row">
                                    <div className="col-6 text-center">
                                        <span dangerouslySetInnerHTML={{__html : profile_url}}></span>
                                        <br />
                                        <h2>{data.h_name}</h2><br />
                                        <h6>{level}</h6>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-xs">후기</div>
                                        {review.list!=null ? review.list.length : 0}개
                                        <br />
                                        <hr />
                                        <div className="text-xs">별점</div>
                                        <StarFill size={14}/> {review.avg!=null ? review.avg : 0}
                                        <br />
                                        <hr />
                                        <div className="text-xs">호스팅 경력</div>
                                        {regdate}
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor : 'pointer', textDecoration:'underline'}} onClick={() => navigate(`/host/hotel/hostPage/${data.h_idx}`)}>
                                더 보기 ▶
                            </div>
                        </div>

                        <div className="col-6">
                            <h4 className="mb-10">{data.h_name}님은 {level}입니다.</h4>
                            <div className="mb-20">
                                {data.h_description}
                            </div>
                            <h4 className="mb-10">호스트 상세 정보</h4>
                            <div className="mb-20">
                                응답률 : {answer} <br />
                                1시간 이내에 응답
                            </div>
                            <button type="button" onClick={() => {
                                if (gEmail == null) {
                                    Swal.fire({
                                        text: '게스트로 로그인 해 주세요',
                                        showCancelButton: false,
                                        confirmButtonText: '확인',
                                    });
                                } else {
                                    const form = new FormData();
                                    form.append('h_email', data.h_email);
                                    form.append('g_email', gEmail.key);
                                    fetch('http://localhost/chatroom/check', {
                                        method: 'post',
                                        body: form,
                                    })
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(dat => {
                                        const roomId = dat.result;
                                        navigate(`/component/message/${roomId}/${data.h_name}`)
                                    })
                                }  
                            }}
                            className="btn btn-dark">호스트에게 메시지 보내기</button>
                            <hr />
                            <div className="row text-xs">
                                <div className="col-1">
                                    <img src="/img/danger.png" width="35px" height="35px"/>
                                </div>
                                <div className="col-11">
                                    안전한 결제를 위해 사이트 외부에서 송금하거나 대화를 나누지 마세요.
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default HostInfo;