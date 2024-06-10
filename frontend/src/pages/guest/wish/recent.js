import React, {useRef,useEffect,useState} from 'react';
import RecentItem from './recentItem';
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Recent() {
    const cookies = new Cookies();
    const [recentList, setRecentList] = useState([]);
    const idx = cookies.get('g_idx');
    
    var myArr = localStorage.getItem('watched');
    myArr = JSON.parse(myArr);

    function getRecent(url) {
        const form = new FormData();
        form.append('recentIdx', myArr);
        form.append('g_idx', idx.key);
        fetch(url, { method: 'post', body: form })
        .then(response => {
          return response.json();
    })
    .then(data => {
        setRecentList(data);
    })
  }
 

    useEffect(() => {getRecent('http://localhost/guest/wish/recentList');},[]);
    return (
        <>
        <div className="container min-vh-100">
            <h3 className="text-bold"> <img src="/img/wish.png" width="30px" height="30px" />
            &nbsp; 위시리스트</h3>
            <br/>
            <hr/>
            <br/>
            <div style={{alignContent: 'center', alignItems: 'center'}}>
            <div style={{
                display:'grid',
                gridTemplateRows:'1fr',
                gridTemplateColumns:'1fr 1fr 1fr',
                }}>
            {recentList &&
             recentList.map(
                ({HoImg,HoName,HoIdx,check,dIdx})=>(
                    <RecentItem
                      HoIdx={HoIdx}
                      HoName={HoName}
                      HoImg={HoImg}
                      check={check}
                      dIdx={dIdx}
                    />
                )
            )}
      </div>
      </div>
      </div>
        </>
    )

}

export default Recent;