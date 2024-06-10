import React, { useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import moment from "moment";
import "moment/locale/ko";
import { DateRangePicker  } from "react-date-range";
import ko from "date-fns/locale/ko";
import { format, subDays} from "date-fns";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "../../../asset/css/datepicker.css";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function Reservation() {
    const cookies = new Cookies();
    const gidx = cookies.get("g_idx");
    const userInfo = cookies.get("userInfo");
    const gprofile = cookies.get("g_profile");
    const {HoIdx} = useParams();
    const {dIdx} = useParams();
    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState(false);
    const [view, setView] = useState(false);
    const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx);
    const navigate = useNavigate();

    const [state, setState] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
   });

   function formatDateDisplay(date, defaultText) {
        if (!date) return defaultText;
        return format(date, "yyyy년 MM월 dd일");
   }

   const handleSelect = ranges => {
        setState(ranges.selection);
        setView(true);
   };

   const [adult, setAdult] = useState(1);
   const [teenager, setTeenager] = useState(0);
   const [child, setChild] = useState(0);

   function adultPlusBtn(){
    setAdult(adult + 1);
   }

   function adultMinusBtn(){
    if(adult === 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setAdult(adult - 1);
    }
   }

   function teenagerPlusBtn(){
    setTeenager(teenager + 1);
   }

   function teenagerMinusBtn(){
    if(teenager === 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setTeenager(teenager - 1);
    }
   }

   function childPlusBtn(){
        setChild(child + 1)
   }

   function childMinusBtn(){
    if(child === 0){
        Swal.fire({
            icon : 'warning',
            text : '0 미만으로 선택할 수 없습니다.',
        });
    } else {
        setChild(child - 1);
    }
   }

    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        const start = moment(state.startDate);
        const end = moment(state.endDate);
        const dateChar  = moment.duration(end.diff(start)).asDays();
        const price = (data.d_price) * dateChar;
        const vat = price * 0.2;
        const totalPrice = price + vat;
        const guestCounter = adult + teenager;

        return (
                <div className="card-style mb-30">
                    <div className="mb-20"><b>￦{data.d_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </b> / 박</div>
                    <table className="tbl">
                        <tbody onClick={() => setModal(true)}>
                                <tr>
                                    <th>체크인</th>
                                    <th>체크아웃</th>
                                </tr>
                                <tr>
                                    <td className="text-sm" style={{textAlign:'center'}}>{formatDateDisplay(state.startDate)}</td>
                                    <td className="text-sm" style={{textAlign:'center'}}>{formatDateDisplay(state.endDate)}</td>
                                </tr>
                            </tbody>
                            { modal &&
                                <div className='Modal' onClick={() => setModal(false)} style={{zIndex : 999}}> 
                                <div className='Body' onClick={(e) => e.stopPropagation()}>
                                    <DateRangePicker
                                        locale={ko}
                                        minDate={subDays(new Date(), 0)}             
                                        onChange={handleSelect}
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        ranges={[state]}
                                        direction="horizontal"
                                        isClearable={true}
                                        rangeColors={["#DBC4F0"]}
                                        disabledDates={data.imp_dates}
                                    />
                                    </div>
                                </div>
                            }
                            <tr>
                                <th colSpan={2}>
                                    <Dropdown>
                                        <Dropdown.Toggle className="col-12 btn btn-light dropdown-toggle dropdown-toggle-split" style={{backgroundColor: 'transparent'}}>
                                            인원 선택
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-12">
                                            <div className="row row-cols-2">
                                                <div className="col-6">
                                                    <Dropdown.Item>성인</Dropdown.Item>
                                                </div>
                                                <div className="col-6 mb-10">
                                                    <button className="circle-btn" onClick={adultMinusBtn}> - </button>
                                                        {adult}
                                                    <button className="circle-btn" onClick={adultPlusBtn} disabled={guestCounter >= data.d_capacity ? true : false}> + </button>
                                                </div>
                                                <div className="col-6 mb-10">
                                                    <Dropdown.Item>어린이</Dropdown.Item>
                                                </div>
                                                <div className="col-6">
                                                    <button className="circle-btn" onClick={teenagerMinusBtn}> - </button>
                                                        {teenager}
                                                    <button className="circle-btn" onClick={teenagerPlusBtn} disabled={guestCounter >= data.d_capacity ? true : false}> + </button>
                                                </div>
                                                <div className="col-6">
                                                    <Dropdown.Item>유아</Dropdown.Item>
                                                </div>
                                                <div className="col-6">
                                                    <button className="circle-btn" onClick={childMinusBtn}> - </button>
                                                        {child}
                                                    <button className="circle-btn" onClick={childPlusBtn} disabled={child >= 5 ? true : false}> + </button>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {
                                        guestCounter > 0
                                        ?
                                        <div>
                                        게스트 {guestCounter}명
                                        </div>
                                        : ''
                                    }
                                </th>
                            </tr>
                        
                    </table>
                    <div style={{textAlign:'center'}}>
                        <button className="main-btnn mb-20" style={{width : '200px'}} type="button" onClick={() => {
                            if(totalPrice === 0){
                                Swal.fire({
                                    icon : 'warning',
                                    text : '숙박날짜를 선택해주세요.',
                                });
                            } else if(userInfo !== undefined || gidx === undefined) {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '게스트 로그인시 예약가능합니다.',
                                });
                            } else if (gidx.key !== undefined && gprofile.key === '미인증') {
                                Swal.fire({
                                    icon : 'warning',
                                    title : '신분증 미등록상태',
                                    text : '계정 > 로그인및보안 > 신분증등록',
                                });
                            }
                            else {
                                navigate('/guest/Order', {
                                    state: {
                                        ckin:formatDateDisplay(state.startDate),
                                        ckout:formatDateDisplay(state.endDate),
                                        reser: guestCounter,
                                        adult: adult,
                                        child: teenager,
                                        baby: child,
                                        dprice: data.d_price,
                                        pprice: price,
                                        fprice: totalPrice,
                                        dateChar : dateChar,
                                        vat:vat,
                                        HoIdx: HoIdx,
                                        dIdx: dIdx
                                    }
                                });
                            }
                            
                        }} >예약하기</button>
                    </div>
                    { view && 
                    <div className="container mb-20">
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left', textDecoration: 'underline'}}>
                                ￦ {data.d_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} X {dateChar} 박 
                            </div>
                            <div className="col-6" style={{textAlign:'right'}}>
                                ￦ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{textAlign:'left', textDecoration: 'underline'}} onClick={() => setInfo(true)}>
                                에어비앤비 서비스 수수료
                            </div>
                            { info &&
                                <div className='Modal' onClick={() => setInfo(false)} style={{zIndex : 999}}>
                                    <div className='modalBody' style={{height:'200px', width: '400px', padding: '20px'}} onClick={(e) => e.stopPropagation()}>
                                            <button id = 'modalCloseBtn' onClick={() => setInfo(false)}>
                                            X
                                            </button>
                                            <div className="container" style={{textAlign: 'left'}}>
                                                수수료는 에어비앤비 플랫폼을 운영하고 연중무휴 고객 지원과 같은 다양한 서비스를 제공하는데 사용됩니다. 부가가치세(VAT)가 포함된 가격입니다.
                                            </div>
                                    </div>
                                </div>
                                }
                            <div className="col-6 " style={{textAlign:'right'}}>
                                ￦ {vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </div>
                        </div>
                    </div>
                    
                    }
                    <hr />
                    <div className="row">
                        <div className="col-4" style={{textAlign : 'left'}}>
                            <b>총 합계</b>
                        </div>
                        <div className="col-8" style={{textAlign : 'right'}}>
                           <b> ￦ {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
                        </div>
                    </div>
                </div>
        )
    }
};

export default Reservation;