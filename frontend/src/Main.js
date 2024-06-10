import React, {useRef,useEffect,useState} from 'react';

import HotelItem from './component/HotelItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function Main() {
  const [list,setMainList] = useState([]);
  const search = useRef();
  const cookies = new Cookies();
  const idx = cookies.get('g_idx');

  function getMain(url) {
    if (idx == null) {
      fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMainList(data);
      });
    } else {
      const form = new FormData();
      form.append('g_idx', idx.key);
      fetch(url, {method: 'post', body: form})
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMainList(data);
      });
    }
   
  }

  useEffect(() => {getMain('http://localhost/guest/main');}, []);

  return (
      <>
        <div className='container-fluid' align="center">
          <input title="호텔명으로 검색" type="text" ref={search} placeholder="Search" className='shadow w-25 p-1 mb-5 border border-success p-2 border-opacity-10 rounded'/>
          &nbsp;
          <button type='button' onClick={()=>{
              if(search.current.value === "") {
                Swal.fire({
                  icon : 'warning',
                  text : '검색어를 입력해주세요',
                  confirmButtonText: '확인'
                });
                return;
              }
              getMain(`http://localhost/guest/main?search=${search.current.value}`)
              //검색
          }} className='shadow p-1 mb-2 border border-success p-2 border-opacity-10 rounded'><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg></button>
        </div>


      <div style={{
                display:'grid',
                gridTemplateRows:'1fr',
                gridTemplateColumns:'1fr 1fr 1fr',
      }}>
        
      {list.map(
                ({HoName,HoImg,Dimg1,Dimg2,Dimg3,HoIdx,check,Dprice,Didx,Star})=>(
                    <HotelItem
                      HoImg={HoImg}
                      Dimg1={Dimg1}
                      Dimg2={Dimg2}
                      Dimg3={Dimg3}
                      HoIdx={HoIdx}
                      Didx={Didx}
                      HoName={HoName}
                      Dprice={Dprice}
                      Star={Star}
                      key={HoIdx}
                      check={check}
                    />
                )
            )}
      </div>
      {list.length === 0
      ?
      <div align='center' style={{color: '#A9A9A9',fontWeight: 'bold', fontSize:'20px'}}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>검색결과가 없습니다.</div>
        <div>철자를 확인하거나 긴 문구는 띄어쓰기를 해보세요.</div>
        <br></br>
        <br></br>
        <br></br><br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      :''
      }
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
    </>
  );
}
export default Main;