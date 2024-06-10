import React, { useRef, useEffect, useState } from 'react';
import { HouseCheck} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import '../admin/css/astyles.css';
import { useNavigate } from "react-router-dom";
import Sidebar from './sidebar';
import Swal from 'sweetalert2';

function AHotel() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const a_id = cookies.get("a_id");
    const searchkey = useRef();
    const search = useRef();
    const statusFilter = useRef();
    const [list, setList] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState('');

    const getStatus = (ho_status) => {
        switch (ho_status) {
            case 1:
                return (<span style={{ color: "green", alignSelf:"center"}}>승인 대기</span>);
            case 2:
                return (<span style={{ color: "blue", alignSelf:"center"}}>영업 중</span>);
            case 3:
                return (<span style={{ color: "red", alignSelf:"center"}}>영업 중지 신청 </span>);   
            case 4:
                    return (<span style={{ color: "red", alignSelf:"center"}}>영업 중지 </span>);   
            default:
                return (<span style={{ color: "red", alignSelf:"center"}}>영업 중지 </span>);
        }
    };

    useEffect(() => {
        fetchahotel();
    }, [filteredStatus]);


    const fetchahotel = () => {
        const params = new URLSearchParams();
        if (searchkey.current.value) params.append('searchkey', searchkey.current.value);
        if (search.current.value) params.append('search', search.current.value);
        if (filteredStatus) params.append('status', filteredStatus);
    
        fetch(`http://localhost/admin/ahoList?${params.toString()}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.sort((a, b) => a.ho_idx - b.ho_idx); 
            setList(data); 
        })
        .catch(error => {
            console.error('Error fetching hotel list:', error);
        });
    };
    
const handleSearchButtonClick = () => {
    fetchahotel();
};
    const handleStatusFilterChange = () => {
        setFilteredStatus(statusFilter.current.value);
    };
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                
                <Sidebar/>

                  <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5" >
                        <nav>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item" style={{cursor : 'default', backgroundColor: 'white' }}>숙소관리</li>
                        <li className="breadcrumb-item active" aria-current="page" style={{cursor : 'default', backgroundColor: 'white' }}>숙소영업관리</li>
                        </ol>
                        </nav>
                        <br/>
                        <div className="card-style mb-30">
                            <h2 className="header"><HouseCheck width="50px" height="40px"/> 숙소영업관리</h2><hr/>
                            <div className="row mb-3">
                            <div className="col-md-2">
                                    <select ref={searchkey} defaultValue='ho_name' className="form-select">
                                        <option value="ho_idx">번호</option>
                                        <option value="ho_name">숙소명</option>
                                        <option value="ho_address">지역명</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                                </div>
                                <div className="col-md-2">
                                    <select ref={statusFilter} className="form-select" onChange={handleStatusFilterChange}>
                                        <option value="">숙소 영업 상태</option>
                                        <option value="1">승인 대기</option>
                                        <option value="2">영업 중</option>
                                        <option value="3">영업 중지</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className="btn btn-sign2" onClick={fetchahotel}>조회</button>
                                </div> 
                            </div>
                            <div className="table-responsive">
                                    <table className="table table-hover align-middle table-bordered custom-table1" >
                                        <thead className="table-light">
                                            <tr>
                                                <th>no.</th>
                                                <th>숙소명</th>
                                                <th>지역명</th>
                                                <th>등급</th>
                                                <th>호스트</th>
                                                <th>영업상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list.length > 0 
                                        ? (
                                            list.map((hotel, index) => (
                                                <tr key={index}>
                                                    <td>{hotel.ho_idx}</td>
                                                    <td><Link to={`/admin/ahoteldetail/${hotel.ho_idx}`}>{hotel.ho_name}</Link></td>
                                                    <td>{hotel.ho_address}</td>
                                                    <td>{hotel.ho_level}</td>
                                                    <td>{hotel.h_name}</td>
                                                    <td style={{textAlign:"center"}}>{getStatus(hotel.ho_status)}</td>                                                  
                                                </tr>
                                            )))
                                        :
                                            <tr>
                                                <td colSpan={6}>검색 결과가 없습니다.</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                            </div>
                        </div>  
                        </div>                     
                    </main>
                </div>
            </div>
         
        </>
    );
}

export default AHotel;