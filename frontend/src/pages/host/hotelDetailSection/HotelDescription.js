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

function HotelDescription() {
    const {HoIdx} = useParams();
    const {dIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <div>
                <div onClick={() => setModal(true)}>
                    <div className="hidden-text-target mb-20">
                        {data.ho_description}
                    </div>
                    <div>
                        <button type="button" className="main-btn z-0">더보기</button>
                    </div>
                </div>
                { modal &&
                    <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}>
                        <div className='modalBody' onClick={(e) => e.stopPropagation()}>
                            <button id = 'modalCloseBtn' onClick={() => setModal(false)}>
                                X
                            </button>
                            <div className="container" style={{whiteSpace: 'pre-wrap', alignSelf:'center'}}>
                                {data.ho_description}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default HotelDescription;