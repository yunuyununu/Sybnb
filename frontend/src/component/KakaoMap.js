/* global kakao */
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const {kakao} = window;

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            console.log('response'+ response);
            return response.json();
        })
        .then(data => {
            console.log('data : '+ data);
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function KakaoMap(){
    const {HoIdx} = useParams();
    const {dIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx);

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        let lat = JSON.stringify(data.ho_x);
        let lng = JSON.stringify(data.ho_y);
        return (
            <Map
            //center={{ lat: 37.699072, lng: 127.460887 }}
            center={{ lat: lat, lng: lng }}
            style={{ width: '50vw', height: '50vh'}}
          >
            <MapMarker position={{ lat: lat, lng: lng }}>
              {/* <div style={{color:"#000"}}>{JSON.stringify(data.ho_name)}</div> */}
            </MapMarker>
          </Map>
        );
    }  
}

export default KakaoMap;