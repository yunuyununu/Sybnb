import React, { useRef, useEffect ,useState} from 'react';
import { Pencil, CardList, House, HouseCheckFill, Person } from "react-bootstrap-icons";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import Sidebar from '../sidebar';


function Awrite() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const n_writer = useRef();
  const n_title = useRef();
  const n_content = useRef();
  const n_date = useRef();
  const a_id = cookies.get("a_id");

  const btnlist = (event) => {
    event.preventDefault();

    if (!n_writer.current.value|| !n_title.current.value || !n_content.current.value || !n_date.current.value) {
      Swal.fire({
        title: '입력 오류',
        text: '모든 필드를 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#41774d86',
      });
      return;
    }

    const form = new FormData();
    form.append('n_writer', n_writer.current.value);
    form.append('n_title', n_title.current.value);
    form.append('n_content', n_content.current.value);
    form.append('n_date', n_date.current.value);  

    Swal.fire({
      title: '등록 확인',
      text: '공지사항을 등록하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '등록',
      cancelButtonText: '취소',
      confirmButtonColor: '#41774d86',
      cancelButtonColor: '#838383d2'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost/notice/insert`, {
          method: 'POST',
          body: form,
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: '등록 완료',
                text: '공지 목록 화면으로 이동합니다.',
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              }).then(() => {
                navigate(`/admin/notice/alist/${a_id.key}`);
              });
            } else {
              Swal.fire({
                title: '에러 발생',
                text: '처리 중 문제가 발생했습니다.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#41774d86',
              });
            }
          })
      }
    });
  };

  useEffect(() => { // 현재 날짜 출력
    const today = new Date().toISOString().split('T')[0]; 
    n_date.current.value = today;
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
       <Sidebar/>          
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="container11 mt-5">
          <nav>       <ol className="breadcrumb">
                       <li className="breadcrumb-item" style={{cursor : 'default', backgroundColor: 'white' }}>공지사항</li>
                          <li className="breadcrumb-item active" aria-current="page" style={{cursor : 'default', backgroundColor: 'white' }}>공지등록</li>
                        </ol>
                        </nav>
                        <br/>
                        <div className="card-style mb-30">
          <div className="d-flex justify-content-between align-items-center">
      <h2 className="header"><Pencil width="40px" height="30px"/> 공지사항 등록</h2>
    </div>
    <hr/><br />
    <div className="table-responsive">
      <form>
        <table className="table table-bordered">
          <tbody>
            <tr>
            <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>작성자</td>
              <td><textarea className="form-control table-light" id="n_writer" rows="1" ref={n_writer} defaultValue="관리자" readOnly></textarea></td>
            </tr>
            <tr>
            <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>작성일자</td>
              <td><textarea className="form-control table-light"  rows="1" ref={n_date} readOnly ></textarea></td>
            </tr>
            <tr>
            <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>제목</td>
              <td><textarea className="form-control table-light" id="n_title" rows="1" ref={n_title}></textarea></td>
            </tr>
            <tr>
            </tr> 
            <tr>
            <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>내용</td>
              <td><textarea className="form-control table-light" id="n_content" rows="6" ref={n_content}></textarea></td>
            </tr>
          </tbody>
        </table>
       
            <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-sign3" onClick={btnlist}>등록하기</button>    </div>  
      </form>
    </div>
  </div>
  </div>
  <br/><br/><br/>
  <br/><br/><br/><br/>
</main></div></div>
    </>
  );
}
export default Awrite;