import React,{useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";

function LastReservItem({OIdx, HoName, HoImg, OCkin, OCkout, HName}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    //const url = `../img/${HoImg}`;
    const navigate = useNavigate();

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `<img src=${url} width='100px' height='100px' /><br />`;
        }

        return (
            <>
            <div style={{zIndex: 0,width: '320px', marginBottom:'50px', height:'100px'}}>
            <Link to={`/guest/lastReservDetail/${OIdx}`}>
            <div style={{float: "left", width: "120px", marginTop: '5px'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
            </div>
            <div style={{float: "left", width: "200px", height: "80px"}}>
                <p style={{fontSize: "21px", color: 'black'}}>{HoName}</p>
                <p style={{fontSize: "18px", color: 'black'}}>{HName}</p>
                <p style={{fontSize:"15px", color: 'black'}}>{OCkin}~{OCkout}</p>
                <br/>
                <input type='hidden' value={OIdx}></input>
            </div>  
            </Link>
            </div>              
            </>
        )
    }
}
export default LastReservItem;