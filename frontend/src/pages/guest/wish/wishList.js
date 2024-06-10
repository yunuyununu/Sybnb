import React, {useRef,useEffect,useState} from 'react';
import WishItem from './wishItem';
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function WishList() {
    const cookies = new Cookies();
    const [wishList, setWishList] = useState([]);
    const idx = cookies.get('g_idx');
    
    function getWish(url) {
        fetch(url)
        .then(response => {
          return response.json();
    })
    .then(data => {
        setWishList(data);
    })
  }

  var myArr = localStorage.getItem('watched');
    myArr = JSON.parse(myArr);
  
    useEffect(() => {getWish(`http://localhost/guest/wish/wishList?g_idx=${idx.key}`);},[]);
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
      {wishList.map(
                ({HoImg,HoName,HoIdx,wIdx, dIdx})=>(
                    <WishItem
                      HoIdx={HoIdx}
                      HoName={HoName}
                      HoImg={HoImg}
                      wIdx={wIdx}
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

export default WishList;