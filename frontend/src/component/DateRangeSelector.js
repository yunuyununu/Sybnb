import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { subDays} from "date-fns";
import ko from "date-fns/locale/ko";
import "../asset/css/datepicker.css"

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
 
function DateRangeSelector() {
     const {HoIdx} = useParams();
     const {dIdx} = useParams();
     const [data, loading] = useFetch('http://localhost/host/hotel/hotelDetail/' + HoIdx + '/' + dIdx);
     const [state, setState] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
     });

     const handleSelect = ranges => {
          setState(ranges.selection);
     };

     if(loading){
          return (
              <div className="text-center">로딩 중...</div>
          )
      } else {
     return (          
               <div className="dateRangePicker">
                    <div>
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
                    <div>
                         <button className="main-btn z-0" onClick={() => {window.scrollTo({top:400, left:0, behavior:'auto'})}}>예약하기</button>
                    </div>
               </div>
     )
     }
};

export default DateRangeSelector;