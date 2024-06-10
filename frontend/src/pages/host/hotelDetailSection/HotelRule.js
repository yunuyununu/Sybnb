import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

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

function HotelRule() {
    const {HoIdx} = useParams();
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}월 ${today.getDate() + 6}일`;
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelRule/' + HoIdx);
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div className="mb-40">
                <div className="row">
                    <div className="col-4 mb-40">
                        <h6 className="mb-10">숙소 이용규칙</h6>
                        체크인 : {data.ho_check_in}
                        <br />
                        체크아웃 : {data.ho_check_out}
                    </div>
                    <div className="col-4">
                        <h6 className="mb-10">숙소 보유 객실</h6>
                        싱글룸 : {data.ho_single}개
                        <br />
                        더블룸 : {data.ho_double}개
                        <br />
                        패밀리룸 : {data.ho_family}개
                        <br />
                        스위트룸 : {data.ho_suite}개
                    </div>
                    <div className="col-4">
                        <h6 className="mb-10">환불 정책</h6>
                        <b>{formattedDate}</b> 전에 취소하면 부분 환불을 받으실 수 있습니다.
                    </div>
                </div>
            </div>
        )
    }
};

export default HotelRule;