import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

function HotelImage() {
    const navigate = useNavigate();
    const location = useLocation();
    const HoIdx = location.state.HoIdx;
    const dIdx = location.state.dIdx;
    const [data, loading] = useFetch('http://localhost/host/hotel/viewHotelImg/' + HoIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let ho_img_src = '';
        let ho_img_url = '';
        if(data.ho_img !== '-'){
            ho_img_src = `http://localhost/static/images/host/hotel/${data[0].ho_img}`;
            ho_img_url = `<img src=${ho_img_src} style="height:100%; width:100%;"/>`;
        } else {
            ho_img_url = '';
        }

        return (
            <div className="container">
                <div className="mb-40">
                    <div className="row mb-50" style={{textAlign:'center'}}>
                        <h3 className="mb-20">호텔 대표 사진</h3>
                        <div style={{width : '800px', height : '500px', display:'block', margin:'auto'}} dangerouslySetInnerHTML={{__html : ho_img_url}}></div>
                    </div>
                    <div className="row">
                        <h4 className="mb-20" style={{textAlign:'center'}}>객실 사진</h4>
                            {data.map((data, idx) => (
                                <div className="row mb-30" style={{textAlign:'center'}}>
                                    <div className="col-3" style={{alignContent :'center'}}>
                                        <strong style={{fontSize : '20px'}}>{data.d_room_type}</strong>
                                    </div>
                                    <div className="col-3">
                                        {
                                            data.d_img1 != '-'
                                            ? <img src={`http://localhost/static/images/host/hotel/${data.d_img1}`} style={{width:'350px', height:'200px', objectFit:'fill'}}/>
                                            : ''
                                        }
                                    </div>
                                    <div className="col-3">
                                        {
                                            data.d_img2 != '-'
                                            ? <img src={`http://localhost/static/images/host/hotel/${data.d_img2}`} style={{width:'350px', height:'200px', objectFit:'fill'}} />
                                            : ''
                                        }
                                    </div>
                                    <div className="col-3">
                                        {
                                            data.d_img3 != '-'
                                            ? <img src={`http://localhost/static/images/host/hotel/${data.d_img3}`} style={{width:'350px', height:'200px', objectFit:'fill'}} />
                                            : ''
                                        }
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mb-40" style={{textAlign : 'center'}}>
                    <button className="main-btn" onClick={() => {
                        navigate(`/host/hotel/hotelDetail/` + HoIdx + `/` + dIdx)
                    }}>뒤로 가기</button>
                </div>
            </div>
       )
    }
};

export default HotelImage;