import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../aa.css'
import Swal from "sweetalert2";


function WishItem({HoIdx, HoName, HoImg, wIdx, dIdx}) {
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    const navigate = useNavigate(); 
    

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `
           <img src=${url} width='330px' height='330px' className="wish" style="border-radius: 15px;" /><br />`;
        }

        return (
            <div style={{ margin: '5px', paddingLeft: '30px'}} >
                
                <div id="Img" style={{position: 'relative'}}>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}/${dIdx}`} style={{textDecorationLine: 'none'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                
                    <div style={{fontSize:"20px", color: 'black'}}>{HoName}</div>
                    <input type="hidden" value={wIdx}></input>
                    
                    </Link>
                    <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                    top:'8px', left:'250px'}} onClick={() => {
                        const form = new FormData();
                        form.append('w_idx', wIdx);
                        fetch('http://localhost/guest/wish/delete', {
                            method: 'post',
                            body: form,
                        }).then((response) => response.json())
                        .then(data => {
                            if(data.result == 'success') {
                                window.location.href='/guest/wishList';
                            }
                        })
                    }
                }>
                    <img src='/img/black_heart.png' width='65px' height='65px' />
                </button>
                <br />
                &nbsp;
                </div>
            </div>
            
        )
    }
}
export default WishItem;