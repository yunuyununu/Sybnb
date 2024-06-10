import React,{useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

 function ReservRevItem({OIdx, HoName, HoImg, OCkin, OCkout, HName}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    //const url = `../img/${HoImg}`;
    const navigate = useNavigate();

    const reservData =  {
        // 페이지 이동 시 전달할 데이터
        OIdx: `${OIdx}`,
        HoName: `${HoName}`,
        OCkin: `${OCkin}`,
        OCkout: `${OCkout}`,
    }
    const openPopup = () => {
        const popup = window.open("./write", "name(Write)", "width=500,height=730,left=300,top=100,toolbar=no,scrollbars=no,resizable=yes");
        return popup;
    }; 


    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `<img src=${url} width='80px' height='80px' /><br />`;
        }

        return (
            <>
            <div style={{zIndex: 0, width: '600px', marginBottom:'50px', height:'50px', float: "left", marginLeft: '10px'}}>
            
            <div style={{float: "left", width: "120px", marginTop: '5px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
            </div>
            <div style={{float: "left", width: "230px", height: "50px"}}>
                <p style={{marginTop:'15px',fontSize: "20px", color: 'black', height: '20px'}}>{HoName}</p>
                <p style={{fontSize:"15px", color: 'black', height: '20px'}}>{OCkin}~{OCkout}</p>
                <br/>
                <input type='hidden' value={OIdx}></input>
            </div>  
            <div style={{width: "50px", marginLeft: '330px'}}>
                <img src='/img/review.png' width='30px' height='30px' style={{marginTop:'28px'}}
                onClick={() => {
                    localStorage.setItem('reservData',JSON.stringify(reservData));
                    openPopup();
                  }}
                ></img>
            </div>
            </div>              
            </>
        )
    }
}
export default ReservRevItem;
