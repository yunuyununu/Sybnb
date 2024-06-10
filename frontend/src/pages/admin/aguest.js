import React, { useRef, useEffect, useState } from 'react';
import { PersonCircle, CardList, House, HouseCheckFill, Person } from 'react-bootstrap-icons';
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Sidebar from './sidebar';
import Swal from 'sweetalert2';


function AGuest() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const a_id = cookies.get("a_id");
    const searchkey = useRef(null);
    const search = useRef(null);
    const [agItem, setAgitem] = useState([]);

    const getLevel = (g_Level) => {
        if (g_Level <= 5) {
            return 'REGULAR';
        } else if (g_Level >= 10) {
            return 'SUPER';
        } else {
            return 'VIP';
        }
    };

    useEffect(() => {
        fetchguest();
    }, []);

    const fetchguest = () => {
        if (searchkey.current && search.current) {
            
            const form = new FormData();
            form.append('searchkey', searchkey.current.value);
            form.append('search', search.current.value);
            fetch('http://localhost/admin/ag_list', {
                method: 'post',
                body: form,
            })
                .then(response => response.json())
                .then(list => {
                    setAgitem(list);
                })
                
                .catch(error => {
                    console.error('Error fetching user list:', error);
                });
        };
    };
    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                <Sidebar/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" style={{ cursor: 'default', backgroundColor: 'white' }}>회원관리</li>
                                    <li className="breadcrumb-item active" aria-current="page" style={{ cursor: 'default', backgroundColor: 'white' }}> 회원정보관리</li>
                                </ol>
                            </nav>
                            <br />
                            <div className="card-style mb-30">
                            <h2 className="header"><PersonCircle width="50px" height="40px" /> 회원정보관리</h2>
                            <hr />
                            <div className="row mb-3">
                            <div className="col-md-2">
                                    <select ref={searchkey} className="form-select" defaultValue='g_name'>
                                        <option value="g_name">회원명</option>
                                        <option value="g_email">회원ID</option>
                                        <option value="g_idx">회원번호</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className="btn btn-sign2" onClick={fetchguest}>조회</button>
                                </div>
                            </div>
                            <table className="table table-hover table-bordered custom-table1">
                                <thead className="table-light">
                                    <tr>
                                        <th>no.</th>
                                        <th>프로필</th>
                                        <th>회원명</th>                                        
                                        <th>회원ID</th>
                                        <th>전화번호</th>
                                        <th>가입날짜</th>
                                        <th>등급관리</th>
                                        <th>포인트</th>
                                        <th>탈퇴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agItem.length > 0 ? 
                                    (agItem.map((list, index) =>
                                        <tr key={index}>
                                            <td>{list.g_idx}</td>
                                            <td>
                                            {list.g_photo.length === 1 ? (
                                            list.g_photo
                                            ) : (
                                                <button type="button" className="btn btn-link" onClick={() => window.open(`http://localhost/static/images/guest/photo/${list.g_photo}`, 'width=500,height=500')}>
                                                    {list.g_photo}
                                                </button>
                                            )}
                                            </td>
                                            <td>{list.g_name}</td>
                                            <td>{list.g_email}</td>
                                            <td>{list.g_phone}</td>
                                            <td>{list.g_join_date}</td>
                                            <td>{getLevel(list.g_level)}</td>
                                            <td>{list.g_point}</td>
                                            <td>{list.g_name.length === 1 ? '탈퇴' : ''}</td>
                                        </tr>
                                    ))
                                :
                                <tr>
                                <td colSpan={9}>검색 결과가 없습니다. </td>
                                </tr>
                                }
                                </tbody>
                            </table>
                       
                        </div>
                        </div>
                        <br /><br /><br />
                        <br /><br />
                    </main>
                </div>
            </div>
        </>
    );
}

export default AGuest;