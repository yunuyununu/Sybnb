import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../host1.css'

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

function HotelAmenities() {
    const {HoIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelAmenity/' + HoIdx);
    
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let mountain_url = '';
        if(data.mountain_view == 'Y'){
            mountain_url = `<img src="/img/mountain.png" width='35px' height='35px'/>　산 전망`;
        } else {
            mountain_url = '';
        }

        let ocean_url = '';
        if(data.ocean_view == 'Y'){
            ocean_url = `<img src="/img/ocean.png" width='35px' height='35px'/>　바다 전망`;
        } else {
            ocean_url = '';
        }

        let wifi_url = '';
        if(data.wifi == 'Y'){
            wifi_url = `<img src="/img/wifi.png" width='35px' height='35px'/>　무선 인터넷`;
        } else {
            wifi_url = '';
        }

        let parking_url = '';
        if(data.parking_lot == 'Y'){
            parking_url = `<img src="/img/parking.png" width='35px' height='35px'/>　건물 내 무료주차`;
        } else {
            parking_url = '';
        }

        let breakfast_url = '';
        if(data.breakfast == 'Y'){
            breakfast_url = `<img src="/img/breakfast.png" width='35px' height='35px'/>　조식 제공`;
        } else {
            breakfast_url = '';
        }

        let fire_alam_url = '';
        if(data.fire_alam == 'Y'){
            fire_alam_url = `<img src="/img/firealam.png" width='35px' height='35px'/>　소화기`;
        } else {
            fire_alam_url = '';
        }

        let fireExt_url = '';
        if(data.fire_extinguisher == 'Y'){
            fireExt_url = `<img src="/img/fireExt.png" width='35px' height='35px'/>　화재 경보기`;
        } else {
            fireExt_url = '';
        }

        return (
            <div>
                <div onClick={() => setModal(true)}>
                    <div className="hidden-text-target mb-30">
                        <div className="mb-10"dangerouslySetInnerHTML={{__html : mountain_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : ocean_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : wifi_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : parking_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : breakfast_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : fire_alam_url}}></div>
                        <div className="mb-10" dangerouslySetInnerHTML={{__html : fireExt_url}}></div>
                    </div>
                    <div>
                        <button type="button" className="main-btn z-0">편의시설 모두보기</button>
                    </div>
                </div>
                { modal &&
                    <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                        <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                            <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                X
                            </button>
                            <div className="container" style={{textAlign: 'left'}}>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : mountain_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : ocean_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : wifi_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : parking_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : breakfast_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : fire_alam_url}}></div>
                                <div className="mb-10" dangerouslySetInnerHTML={{__html : fireExt_url}}></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default HotelAmenities;