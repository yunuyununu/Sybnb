import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../sidebar';

function NoticeList() {
  const navigate = useNavigate();
  const searchkey = useRef();
  const search = useRef();
  const [Anitem, setAnitem] = useState([]);
  const cookies = new Cookies();
  const a_id = cookies.get("a_id");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    const form = new FormData();
    form.append('searchkey', searchkey.current.value);
    form.append('search', search.current.value);

    fetch('http://localhost/notice/list', {
      method: 'post',
      body: form
    })
      .then(response => response.json())
      .then(list => {
        console.log('list', list);
        setAnitem(list);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  };

  const handleWriteNotice = () => {
    navigate(`/admin/notice/awrite/${a_id.key}`);
  };

  const handleDelete = (n_idx) => {
    Swal.fire({
      title: '삭제 확인',
      text: '공지사항을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#41774d86',
      cancelButtonColor: '#838383d2',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost/notice/delete?n_idx=${n_idx}`, {
          method: 'POST'
        })
          .then(response => response.json())
          .then(data => {
            if (data.result === 'success') {
              Swal.fire({
                title: '삭제 완료',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86'
              }).then(() => {
                fetchNotices();
              });
            } else {
              Swal.fire({
                title: '에러 발생',
                text: '처리 중 오류가 발생했습니다.',
                showCancelButton: false,
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86'
              });
            }
          })
      }
    });
  };

  const btnnotice = (n_idx) => {
    navigate(`/admin/notice/anoticedetail/${a_id.key}/${n_idx}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container11 mt-5">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item" style={{ cursor: 'default', backgroundColor: 'white' }}>공지사항</li>
                  <li className="breadcrumb-item active" aria-current="page" style={{ cursor: 'default', backgroundColor: 'white' }}>공지목록</li>
                </ol>
              </nav>
              <br />
              <div className="card-style mb-30">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="header">
                    <img style={{ width: '57px', height: '57px' }} src='/img/notice.png' alt="notice icon" />&nbsp;공지사항
                  </h2>
                </div>
                <hr /><br />
                <div className="row mb-3">
                <div className="col-md-2">
                    <select ref={searchkey} className="form-select" defaultValue='n_title'>
                    <option value="n_idx">번호</option>
                      <option value="n_title">제목</option>
                      <option value="n_content">내용</option>  
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input ref={search} className="form-control" placeholder="검색어를 입력하세요" />
                  </div>
                  <div className="col-md-2">
                    <button type='button' className="btn btn-sign2" onClick={fetchNotices}>
                      검색
                    </button>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <button type='button' className="btn btn-sign3" onClick={handleWriteNotice}>
                      글쓰기
                    </button>
                  </div>
                </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered custom-table1">
                      <thead className="table-light">
                        <tr>
                          <th className='col-1 text-center'>no.</th>
                          <th className='col-2 text-center'>제목</th>
                          <th className='col text-center'>내용</th>
                          <th className='col-1 text-center'>작성자</th>
                          <th className='col-1 text-center'>작성일</th>
                          <th className='col-1 text-center'>수정</th>
                          <th className='col-1 text-center'>삭제</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Anitem.length > 0
                         ?
                         (Anitem.map((list, index) => (
                          <tr key={index} style={{ textAlign: 'center' }}>
                            <td>{list.n_idx}</td>
                            <td>{list.n_title}</td>
                            <td><Link to={`/admin/notice/anoticedetail/${list.n_idx}`}>{list.n_content}</Link></td>
                            <td>{list.n_writer}</td>
                            <td>{list.n_date}</td>
                            <td>
                              <Link to={`/admin/notice/adetail/${list.n_idx}`}>
                                <PencilSquare width="25" height="25" />
                              </Link>
                            </td>
                            <td>
                              <button type='button' className='btn' onClick={() => handleDelete(list.n_idx)}>
                                <Trash width="25" height="25" />
                              </button>
                            </td>
                          </tr>
                        )))
                         :
                         <tr>
                          <td colSpan={7}>검색 결과가 없습니다.</td>
                         </tr>
                        }
                        
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
            <br /><br /><br />
            <br /><br /><br /><br />
          </main>
        </div>
      </div>
    </>
  );
}

export default NoticeList;