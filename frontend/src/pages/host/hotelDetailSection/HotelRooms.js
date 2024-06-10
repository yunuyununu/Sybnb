import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import HotelRoomsItem from "../../../component/HotelRoomsItem";

function HotelRooms() {
    const {HoIdx} = useParams();
    const [list,setItemList] = useState([]);
  
    function getItem(url) {
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setItemList(data);
      })
    }

    useEffect(() => {getItem('http://localhost/host/hotel/hotelRooms/' + HoIdx);},[]);

    return (
        <div style={{
            display:'grid',
            gridTemplateRows:'1fr',
            gridTemplateColumns:'1fr 1fr',
            cursor: 'pointer',
        }}>
        {list.map(
                    ({dIdx, dRoomType, dImg1, dImg2, dImg3, dCapacity, dArea, dBeds, dNonSmoking, dPrice})=>(
                        <HotelRoomsItem
                        dIdx={dIdx}
                        dRoomType={dRoomType}
                        dImg1={dImg1}
                        dImg2={dImg2}
                        dImg3={dImg3}
                        dCapacity={dCapacity}
                        dArea={dArea}
                        dBeds={dBeds}
                        dNonSmoking={dNonSmoking}
                        dPrice={dPrice}
                        key={dIdx}
                        />
                    )
                )}
        </div>
    )
};

export default HotelRooms;