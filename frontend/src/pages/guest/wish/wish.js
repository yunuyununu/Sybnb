import Cookies from "universal-cookie";
import React, {useRef,useEffect,useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    
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

function Wish() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    var myArr = localStorage.getItem('watched');
    let first = 0;
    if(myArr == null) {
        first = 0;
    } else {
        myArr = JSON.parse(myArr);
        first = myArr[myArr.length - 1];
    }
   
    const [data, loading] = useFetch('http://localhost/guest/wish/recentImg?idx='+first+'&g_idx='+idx.key);

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        let url = '';
        let wishImage = '';
        if (data.firstWish != null) {
            url = `http://localhost/static/images/host/hotel/${data.firstWish}`;
            wishImage = `<img src=${url} width='330px' height='330px' className="wish" style="border-radius: 15px;"/><br />`;
        }

        let src = '';
        let recentImage = '';
        if (data.firstRecent != null) {
            src = `http://localhost/static/images/host/hotel/${data.firstRecent}`;
            recentImage = `<img src=${src} width='330px' height='330px' className="wish" style="border-radius: 15px;"/><br />`;
        }

        return (
            <>
                <div className="container min-vh-100">
                <h3 className="text-bold"> <img src="/img/wish.png" width="30px" height="30px"/>
                &nbsp; 위시리스트</h3>
                <br/>
                <hr/>
                <br/>
                <div style={{float: 'left'}}>
                <Link to={data.firstWish == "no-image.png" ? '/guest/wish' :'/guest/wishList'} style={{textDecorationLine: 'none'}}>
                    <span dangerouslySetInnerHTML={{__html: wishImage}}></span>
                    <div style={{fontSize:"20px", color: 'black'}}>좋아요 누른 항목</div>
                </Link>
                <br />
                &nbsp;
                </div>
                <div className="wish-blank"></div>
                
                <div>
                <Link to={data.firstRecent == "no-image.png"?  '/guest/wish' : '/guest/recent'} style={{textDecorationLine: 'none'}}>
                <span dangerouslySetInnerHTML={{__html: recentImage}}></span>
                    <div style={{fontSize:"20px", color: 'black'}}>최근 본 숙소</div>
                    </Link>
                <br />
                &nbsp;
            
                </div>
                </div>
            </>
        )
    }
}
export default Wish; 