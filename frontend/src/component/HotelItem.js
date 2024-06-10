import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';


function HotelItem({HoIdx,HoName, HoImg,Dimg1,Dimg2,Dimg3, check, Dprice,Didx,Star}) {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    let loading = false;
    const navigate = useNavigate();
    const url = `http://localhost/static/images/host/hotel/${HoImg}`;
    const url2 = `http://localhost/static/images/host/hotel/${Dimg1}`;
    const url3 = `http://localhost/static/images/host/hotel/${Dimg2}`;
    const url4 = `http://localhost/static/images/host/hotel/${Dimg3}`;

    const [image, setImage] = useState(""); 
    const [checkId, setCheckId] = useState(2);

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
                if(data.result === 'success') {
                   setCheckId(0);
                }
            })
        } else {
            fetch('http://localhost/guest/wish/wishUpdate', {
                method: 'post',
                body: form,
            }).then((response) => response.json())
            .then(data => {
                if(data.result === 'success') {
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
        let img = `<img src=${url} width='400px' height='400px' style="border-radius: 5px;" /><br />`;
        let img2 = `<img src=${url2} width='400px' height='400px' style="border-radius: 5px;" /><br />`;
        let img3 =`<img src=${url3} width='400px' height='400px' style="border-radius: 5px;" /><br />`;
        let img4 =`<img src=${url4} width='400px' height='400px' style="border-radius: 5px;" /><br />`;

        return (
            <div style={{paddingLeft: '200px',maxWidth:'600px', height:'540px'}}> 
                <div id="Img" style={{position: 'relative'}}>

                    {/* <span dangerouslySetInnerHTML={{__html: img}}></span> */}
                    
                    <Carousel
                    fullHeightHover={false} 
                    navButtonsProps={{
                        style: {
                            height:'20% !important',
                            top:'150px !important',
                            bottom:'-150px !important'
                        }
                    }}
                    animation={"fade"}
                    showStatus={false} 
                    outsideChevron={false} 
                    infiniteLoop={true} 
                    autoPlay={false} 
                    pagination={{clickable: true}}
                    >
                        <Paper><span dangerouslySetInnerHTML={{__html: img}}></span>
                        {checkId === 2 
                        ? 
                        '' 
                        : 
                        <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                        top:'8px', left:'315px'}} onClick={() => {handleClick()}}>
                        <img src={image} width='70px' height='70px' />
                        </button>
                        }
                        <input type='hidden' id={checkId} value={check}></input></Paper>

                        <Paper><span dangerouslySetInnerHTML={{__html: img2}}></span>
                        {checkId === 2 
                        ? 
                        '' 
                        : 
                        <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                        top:'8px', left:'295px'}} onClick={() => {handleClick()}}>
                        <img src={image} width='70px' height='70px' />
                        </button>
                        }
                        <input type='hidden' id={checkId} value={check}></input></Paper>

                        <Paper><span dangerouslySetInnerHTML={{__html: img3}}></span>
                        {checkId === 2 
                        ? 
                        '' 
                        : 
                        <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                        top:'8px', left:'295px'}} onClick={() => {handleClick()}}>
                        <img src={image} width='70px' height='70px' />
                        </button>
                        }
                        <input type='hidden' id={checkId} value={check}></input></Paper>

                        <Paper><span dangerouslySetInnerHTML={{__html: img4}}></span>
                        {checkId === 2 
                        ? 
                        '' 
                        : 
                        <button type='button' style={{border: 0, backgroundColor: 'transparent', position: 'absolute', 
                        top:'8px', left:'295px'}} onClick={() => {handleClick()}}>
                        <img src={image} width='70px' height='70px' />
                        </button>
                        }
                        <input type='hidden' id={checkId} value={check}></input></Paper>
                    </Carousel>
                <Link to={`/host/hotel/hotelDetail/${HoIdx}/${Didx}`}>
                    <div>
                        <div className="row">
                            <div className="col" style={{fontSize:"27px",whiteSpace:'nowrap'}}>
                            {HoName}
                            </div>
                            <div className="col" style={{fontSize:"17px"}} align='right'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'inline', height: '16px', width: '16px', fill: 'currentcolor'}}><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>&nbsp;<a style={{paddingTop:'2.5px'}}>{Math.round(Star * 100)/100}</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col">
                                <div style={{fontSize:"17px"}}>₩{Dprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;/박</div>
                            </div>
                            <div className="col" align='right'>
                                <svg style={{color:'#808080'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
                <br></br>
                </div>
                    
            </div>
        )

    }
}
export default HotelItem;