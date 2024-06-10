import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../aa.css'
import Cookies from "universal-cookie";


function RecentItem({HoIdx, HoName, HoImg, check, dIdx}) {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    let loading = false;
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    const navigate = useNavigate(); 
    const [image, setImage] = useState(""); 
    // const [isClicked, setIsClicked] = useState(false);
    const [checkId, setCheckId] = useState(0);
    
    const handleClick = () => {
        const form = new FormData();
        form.append('g_idx', idx.key);
        form.append('h_idx', HoIdx);
        if (checkId === 1) {
            fetch('http://localhost/guest/wish/wishDelete', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'success') {
                    setCheckId(0);
                }
            })
        } else  {
            fetch('http://localhost/guest/wish/wishUpdate', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'success') {
                    setCheckId(1);
                }
            })
        }
    }
    
    useEffect(() => {
        if (check === 1) {
            setCheckId(1);
        } else if (check === 0) {
            setCheckId(0);
        } else {
        }
    }, [])

    useEffect(() => {
        if (checkId === 1) {
            setImage("/img/black_heart.png");
        } else if (checkId === 0) {
            setImage("/img/heart.png");
        } else {
            setImage('');
        }   
    }, [checkId])

    if (loading) {
        return (
            <div>loading...</div>
        )
    } else {
        let img = '';
        if (HoImg != null) {
            img = `
           <img src=${url} width='330px' height='330px' className="wish" style="border-radius: 15px;"/><br />`;
        }

        return (
            <div style={{ margin: '5px', paddingLeft: '30px'}} >
                
                <div id="Img" style={{position: 'relative'}}>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}/${dIdx}`} style={{textDecorationLine: 'none'}}>
                <span dangerouslySetInnerHTML={{__html: img}}></span>
                
                    <div style={{fontSize:"20px", color: 'black'}}>{HoName}</div>
                    
                    </Link>
                    <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                    top:'8px', left:'250px'}} onClick={() => {handleClick()}}>
                    <img src = {image}   width='65px' height='65px'/>
                </button>
                <input type='hidden' id={checkId} value={check}></input>
                <br />
                &nbsp;
                </div>
            </div>
            
        )
    }
}
export default RecentItem;