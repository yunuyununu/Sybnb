import React from 'react';
import { Gear } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import '../admin/css/astyles.css';

function Sidebar() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const a_id = cookies.get("a_id");

    const handleNavigate = (path) => {
        window.location.href = path;
    };

    return (
        <>
            <div className="flex-shrink-0 p-3" style={{ width: "280px", fontWeight: 'bold' }}>
               <a className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"  onClick={() => handleNavigate(`/admin/amain/${a_id.key}`)} style={{ fontWeight: 'bold' , cursor: "pointer" }}> 
                   <span><Gear width="40px" height="25px"/> 관리자 페이지</span> 
                </a>
                <ul className="list-unstyled ps-0">              
                    <li className="mb-1">
                        <button 
                            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                            style={{ fontWeight: 'bold' ,cursor: 'default' }}
                            data-bs-toggle="collapse"
                            data-bs-target="#dashboard-collapse"
                            aria-expanded="false">
                            회원관리
                        </button>
                        <div className="Collapse" id="dashboard-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a 
                                        onClick={() => handleNavigate(`/admin/aguest/${a_id.key}`)}
                                        className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                        회원정보관리
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        onClick={() => handleNavigate(`/admin/ahost/${a_id.key}`)}
                                        className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                        사업자정보관리
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button 
                            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                            style={{ fontWeight: 'bold' ,cursor: 'default' }}
                            data-bs-toggle="collapse"
                            data-bs-target="#orders-collapse"
                            aria-expanded="false">
                            숙소관리
                        </button>
                        <div className="Collapse" id="orders-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a 
                                        onClick={() => handleNavigate(`/admin/ahotel/${a_id.key}`)}
                                        className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                        숙소영업관리
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button 
                            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                            style={{ fontWeight: 'bold' ,cursor: 'default' }}
                            data-bs-toggle="collapse"
                            data-bs-target="#notices-collapse"
                            aria-expanded="false">
                            공지사항
                        </button>
                        <div className="Collapse" id="notices-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a 
                                        onClick={() => handleNavigate(`/admin/notice/alist/${a_id.key}`)}
                                        className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                        공지목록
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        onClick={() => handleNavigate(`/admin/notice/awrite/${a_id.key}`)}
                                        className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                        공지등록
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <button 
                            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#account-collapse"
                            aria-expanded="false">
                            <a href="/">Sybnb사이트 </a>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;