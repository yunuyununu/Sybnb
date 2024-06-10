import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../aa.css'


function PreReservItem({OIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress}) {
    let loading = false;
    const navigate = useNavigate();
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `
           <img src=${url} width='250px' height='250px' className="wish" /><br />`;
        }

        return (
            
           <div className="card-reserv" onClick={() => navigate(`/guest/preReservDetail/${OIdx}`)}>
            <Link to={`/guest/preReservDetail/${OIdx}`}>
                        <div style={{float: "left", width: "300px"}} onClick={() => navigate(`/guest/preReservDetail/${OIdx}`)}>
                            <p style={{fontSize: "30px", color: 'black'}}>{HoName}</p>
                            <p style={{fontSize:"20px", color: 'black'}}>{OCkin}~{OCkout}</p>
                            <br/>
                            <p style={{fontSize: "25px", color: 'black' }}>{HName}</p>
                            <p style={{fontSize: "20px", color: 'black' }}>{HoAddress}</p>
                            <input type='hidden' value={OIdx}></input>
                        </div>    
                        <div style={{float: "left", width: "300px"}} onClick={() => navigate(`/guest/preReservDetail/${OIdx}`)}>
                            <span dangerouslySetInnerHTML={{__html: img}}></span>
                        </div>
                        </Link>
               </div>
               
            
        )
    }
}
export default PreReservItem;