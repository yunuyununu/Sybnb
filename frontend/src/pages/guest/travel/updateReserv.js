import React,{useEffect,useState} from 'react';
import Swal from "sweetalert2";
import { useParams,useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { DateRangePicker  } from "react-date-range";
import ko from "date-fns/locale/ko";
import { format, subDays} from "date-fns";
import { Dropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "../../../asset/css/datepicker.css";
import Cookies from "universal-cookie";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  

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

function UpdateReserv() {
    const {OIdx} = useParams();
    const [data, loading] = useFetch('http://localhost/guest/reserv/upDetail?o_idx=' + OIdx);
    const cookies = new Cookies();
    const idx = cookies.get('g_idx');
    

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
            <div className="container min-vh-100">
            <h3 className="text-bold">무엇을 변경하고 싶으세요?</h3>
            <br/>
            
            <div>
            <div className='card-UpdateReserv'>
            <p style={{color: 'red'}}>{data.alter} 숙박 일수는 변경할 수 없습니다.</p>
            
            <p>원하는 사항을 변경한 다음 호스트 {data.dto.h_name} 님에게 예약 변경 요청을 보내세요.</p>
                {/* <div style={{float:'left', marginRight: '10px'}}><span dangerouslySetInnerHTML={{__html: img}}></span></div> */}
                <div>
                    <p>{data.dto.ho_name}<br/>
                    호스트: {data.dto.h_name}</p>
                </div>
                <hr/>
                <h5 className="text-bold">예약 세부 정보 </h5> 
                <br/>
                
                <div>
                <Reservation/>
                </div>
                
            </div>
            </div>
            </div>
            </>
        )
    }

    function Reservation() {
        const {OIdx} = useParams();
        const [modal, setModal] = useState(false);
        const [view, setView] = useState(false);
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
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
            let date = new Date(ranges['selection'].startDate); 
            date.setDate(date.getDate() + data.diffDays);
            setState({
                startDate: ranges['selection'].startDate,
                endDate: date,
                key:ranges['selection'].key,
            })
            setView(true);
       };
    
       const [adult, setAdult] = useState(0);
       const [teenager, setTeenager] = useState(0);
       const [child, setChild] = useState(0);
       const [guestCounter, setGuestCounter] = useState(0);
    
       function adultPlusBtn(){
        setAdult(adult + 1);
        setGuestCounter(guestCounter + 1);
       }
    
       function adultMinusBtn(){
        if(adult == 1){
            Swal.fire({
                icon : 'warning',
                text : '성인은 1 미만으로 선택할 수 없습니다.',
            });
        } else {
            setAdult(adult - 1);
            setGuestCounter(guestCounter - 1);
        }
       }
    
       function teenagerPlusBtn(){
        setTeenager(teenager + 1);
        setGuestCounter(guestCounter + 1);
       }
    
       function teenagerMinusBtn(){
        if(teenager == 0){
            Swal.fire({
                icon : 'warning',
                text : '0 미만으로 선택할 수 없습니다.',
            });
        } else {
            setTeenager(teenager - 1);
            setGuestCounter(guestCounter - 1);
        }
       }
    
       function childPlusBtn(){
        setChild(child + 1);
       }
    
       function childMinusBtn(){
        if(child == 0){
            Swal.fire({
                icon : 'warning',
                text : '0 미만으로 선택할 수 없습니다.',
            });
        } else {
            setChild(child - 1);
            
        }
       }
    
       useEffect(() => {
        fetch('http://localhost/guest/reserv/upDetail?o_idx=' + OIdx)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
            setGuestCounter(data.dto.o_reser);
            setChild(data.dto.o_baby);
            setTeenager(data.dto.o_child);
            setAdult(data.dto.o_adult);
            setState({startDate: new Date(data.dto.o_ckin), endDate: new Date(data.dto.o_ckout), key: 'selection'})
            
        })
    }, []);
    
        if(loading){
            return (
                <div className="text-center">로딩 중...</div>
            )
        } else {
            
            const start = moment(state.startDate);
            const end = moment(state.endDate);
            const dateChar  = moment.duration(end.diff(start)).asDays();
            const guestCounter = adult + teenager;
    
            return (
                <>
                    <div className="card-style mb-30">
                        <table className="tbl">
                            <tbody onClick={() => setModal(true)}>
                                    <tr>
                                        <th>체크인</th>
                                        <th>체크아웃</th>
                                    </tr>
                                    <tr>
                                        <td className="text-sm">{formatDateDisplay(state.startDate)}</td>
                                        <td className="text-sm">{formatDateDisplay(state.endDate)}</td>
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
                                                
                                                <Dropdown.Item className="col-6">성인</Dropdown.Item>
                                                    <button className="circle-btn" onClick={adultMinusBtn}> - </button>
                                                    {adult}
                                                    <button className="circle-btn" onClick={adultPlusBtn} disabled={guestCounter >= data.dto.d_capacity ? true : false}> + </button>
    
                                                <Dropdown.Item>어린이</Dropdown.Item>
                                                    <button className="circle-btn" onClick={teenagerMinusBtn}> - </button>
                                                    {teenager}
                                                    <button className="circle-btn" onClick={teenagerPlusBtn} disabled={guestCounter >= data.dto.d_capacity ? true : false}> + </button>
                                                
                                                <Dropdown.Item>유아</Dropdown.Item>
                                                    <button className="circle-btn" onClick={childMinusBtn}> - </button>
                                                    {child}
                                                    <button className="circle-btn" onClick={childPlusBtn} disabled={child > 4}> + </button>
                                               
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {
                                            guestCounter > 0
                                            ?
                                            <div>
                                            게스트 {guestCounter+child}명
                                            </div>
                                            : data.dto.o_reser
                                        }
                                    </th>
                                </tr>
                            
                        </table>
                    </div>
                    <hr/>
                    <div style={{marginBottom: '40px'}}>
                    <h5 className="text-bold">환불 정책</h5>
                    <br/>
                    <p> {format(new Date(data.ref_date),"MM월 dd일 HH시")}  전에 취소하면 환불을 받으실 수 있습니다. 그 이후에 취소하면 예약 대금이 환불되지 않습니다.</p>
                    </div>
                    <button type='button' className="main-btn" onClick={() => {
                        if (format(state.startDate, "yyyy-MM-dd") == data.dto.o_ckin && format(state.endDate, "yyyy-MM-dd") == data.dto.o_ckout
                        && adult == data.dto.o_adult && teenager == data.dto.o_child && child == data.dto.o_baby) {
                            Swal.fire({
                                icon : 'warning',
                                text : '변경 사항이 없습니다',
                            });
                        } else {
                            const form = new FormData();
                            form.append('g_idx', idx.key);
                            form.append('ru_idx', OIdx);
                            form.append('ru_startDate', format(state.startDate, "yyyy-MM-dd"));
                            form.append('ru_endDate', format(state.endDate, "yyyy-MM-dd"));
                            form.append('ru_adult', adult);
                            form.append('ru_child', teenager);
                            form.append('ru_baby', child);
                            fetch('http://localhost/guest/reserv/insert', {
                                method: 'post',
                                body: form,
                                }).then((response) => response.json())
                            .then(data => {
                                if (data.result == 'success') {
                                    Swal.fire({
                                        title: '변경 완료',
                                        test: '예약 목록 화면으로 돌아갑니다',
                                        showCancelButton: false,
                                        confirmButtonText: '확인',
                                    }).then((result) => {
                                        if(result.isConfirmed) {
                                            window.location.href='/guest/reservation';
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        title: '에러 발생',
                                        text: '관리자에게 문의하세요',
                                        showCancelButton: false,
                                        confirmButtonText: '확인',
                                    });
                                }
                            })
                        }
                    }}>예약 변경</button>
                    </>
            )
        }
    }
};



export default UpdateReserv;