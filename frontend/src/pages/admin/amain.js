import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css'; 
import MemoList from './memolist';
import HotelChart from './chart';
import Sidebar from './sidebar';
import Calendar from 'react-calendar';
import '../admin/css/astyles.css';

function Amain() {
  const [searchDate, setSearchDate] = useState(new Date());
  const nextWeek = new Date(searchDate);
  nextWeek.setDate(nextWeek.getDate() + 1);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>
        <div className="card-style mb-30 col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="header">관리자 메인</h2>
          </div>
          <hr />

          <main>
          <div className="main-content">

    <br/>          
    <div className="row">
      <div className="col-5">
        <div className="card">    
          <div className="card-header" style={{  backgroundColor: '#4e817269' }}>
          <strong>Calendar</strong>
          </div>                  
          <div className="card-body d-flex flex-column">
            {/* <div className="mb-3">
              <strong>오늘 날짜:</strong> {searchDate.toLocaleDateString()}
            </div> */}
            <div className="flex-grow-1 d-flex justify-content-center">
              <Calendar 
                className="calendar1" 
                value={searchDate}
              />
            </div>
          </div>
        </div>
      </div>           
      <div className="col-7">                             
        <MemoList />
      </div>
    </div>
      <br/>
      <div className="row">
      <div className="col-lg-12 mb-8">
        <div className="card h-90">
        <div className="card-header" style={{ backgroundColor: '#4e817269' }}>
          <strong>호텔 월 매출 통계</strong>
      </div> 
          <div className="card-body">
            <HotelChart />
          </div>
          </div>
      </div>
    </div>
  </div>
  <br/>
  </main>
  </div>
  </div>

  </div>
  );
}

export default Amain;