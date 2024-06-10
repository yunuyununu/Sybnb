import Cookies from "universal-cookie";
import '../../../asset/css/user.css';
import React,{useRef,useEffect,useState} from 'react';
import PreReservItem from "./preReservItem";
import LastReservItem from "./lastReservItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slid from "react-slick";
import Sld from "react-slick";
import ReservRevItem from "./reservRevItem";





function Reservation() {
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    const [reservList, setReservList] = useState([]);
    const [lastReservList, setLastReservList] = useState([]);
    const [review, setReview] = useState([]);
    
    function getReserv(url) {
        const form = new FormData();
        form.append('g_idx', idx.key);
        fetch(url, { method: 'post', body: form })
        .then(response => {
          return response.json();
    })
    .then(data => {
        console.log(data);
        setReservList(data.after);
        setLastReservList(data.before);
        setReview(data.review);
    })
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

var setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

var set = {
    rows: 3,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
};

  useEffect(() => {getReserv('http://localhost/guest/reserv/list');},[]);
  
    
        return (
            <>

                 <div className="container min-vh-100" style={{}}>
                 <h3 className="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 여행</h3>
                <br/>
                <br/>
                <div style={{width: '1000px'}}>
                <div style={{marginBottom:'50px', width: "600px" ,height: '300px',marginRight: '70px', float: 'left'}}>
                
                {reservList==''? 
                <h4>예약이 없습니다</h4>
                :
                <h4>예정된 예약</h4>
                }
                <Slider {...settings}>
                    {reservList.map(
                    ({OIdx, HoName, HoImg, OCkin, OCkout, HName, HoAddress})=>(
                        <PreReservItem
                        OIdx={OIdx}
                        HoName={HoName}
                        HoImg={HoImg}
                        OCkin={OCkin}
                        OCkout={OCkout}
                        HName={HName}
                        HoAddress={HoAddress}
                        />
                    )
                )} 
                </Slider>
                </div> 
                    <div style={{zIndex: 0, height: '400px', width:'550px', marginLeft: '600px'}}>
                        {review == ''? '' :
                    <h4>&nbsp;&nbsp;리뷰를 작성해 주세요</h4>
                }
                    <br/>
                    <Sld {...set}>
                    {review.map(
                    ({OIdx, HoName, HoImg, OCkin, OCkout, HName})=>(
                        <ReservRevItem
                        OIdx={OIdx}
                        HoName={HoName}
                        HoImg={HoImg}
                        OCkin={OCkin}
                        OCkout={OCkout}
                        HName={HName}
                        />
                    )
                )} 

                </Sld>
                    </div>
                    </div>
               
                <div style={{ zIndex: 0, paddingBottom: '100px', position:'relative'}}>
                    <br/>
                    <br/>
                    {lastReservList == ''? '' : 
                    <h4>이전 예약</h4>
                    }
                    <br/>
                    <Slid {...setting}>
                    {lastReservList.map(
                    ({OIdx, HoName, HoImg, OCkin, OCkout, HName})=>(
                        <LastReservItem
                        OIdx={OIdx}
                        HoName={HoName}
                        HoImg={HoImg}
                        OCkin={OCkin}
                        OCkout={OCkout}
                        HName={HName}
                        />
                    )
                )} 

      </Slid>
                </div>
                 </div>
            </>
        )
    
}


export default Reservation;