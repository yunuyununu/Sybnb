import React, { useRef, useEffect, useState } from 'react';
import { PencilSquare} from "react-bootstrap-icons";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import '../css/astyles.css';
import Sidebar from '../sidebar';

function Adetail() {
    const { n_idx } = useParams();
    const cookies = new Cookies();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const n_title = useRef();
    const n_content = useRef();
    const n_date = useRef();
    const a_id = cookies.get("a_id");

    useEffect(() => {
        fetch(`http://localhost/notice/detail/${n_idx}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load notice details.');
                }
                return response.json();
            })
            .then(data => {
                setNotice(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching notice details:', error);
                setError('Error');
                setLoading(false);
            });
    }, [n_idx]);


    const btnadetail = (event) => {
        event.preventDefault();

        if (!n_title.current.value || !n_content.current.value || !n_date.current.value) {
            Swal.fire({
                title: '입력 오류',
                text: '모든 필드를 입력해주세요.',
                icon: 'error',
                confirmButtonText: '확인',
            });
            return;
        }

        Swal.fire({
            title: '수정 확인',
            text: '공지 내용을 수정하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '수정',
            cancelButtonText: '취소',
            confirmButtonColor: '#41774d86',
            cancelButtonColor: '#838383d2'
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append("n_writer", notice.n_writer);
                formData.append("n_title", n_title.current.value);
                formData.append("n_content", n_content.current.value);
                formData.append("n_date", n_date.current.value);

                fetch(`http://localhost/notice/update/${n_idx}`, {
                    method: 'POST',
                    body: formData,
                })
                .then((response) => {
                    if (response.ok) {
                        Swal.fire({
                            title: '수정 완료',
                            text: '공지가 성공적으로 수정되었습니다.',
                            icon: 'success',
                            confirmButtonColor: '#41774d86',
                        }).then(() => {
                            navigate(`/admin/notice/alist/${a_id}`);
                        });
                    } else {
                        Swal.fire({
                            title: '에러 발생',
                            text: '처리 중 문제가 발생했습니다.',
                            icon: 'error',
                            confirmButtonColor: '#41774d86',
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error updating notice:', error);
                });
            }
        });
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">Error: {error}</div>;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
               <Sidebar/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container11 mt-5">
                        <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" style={{cursor : 'default', backgroundColor: 'white' }}>공지사항</li>
                            <li className="breadcrumb-item active" aria-current="page" style={{cursor : 'default', backgroundColor: 'white' }}>공지수정</li>
                        </ol>
                        </nav>
                        <br/>
                        <div className="card-style mb-30">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="header"><PencilSquare width="40px" height="30px"/> 공지사항 수정</h2>
                            </div>
                            <hr /><br />
                            <div className="table-responsive">
                                <form onSubmit={btnadetail}>
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>작성자</td>
                                                <td>{notice?.n_writer}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>제목</td>
                                                <td><textarea className="form-control" id="n_title" rows="1" ref={n_title} defaultValue={notice?.n_title}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>작성일자</td>
                                                <td><textarea className="form-control" id="n_date" rows="1" ref={n_date} defaultValue={notice?.n_date}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label"  style={{ backgroundColor: '#4e817269' }}>내용</td>
                                                <td><textarea className="form-control" id="n_content" rows="6" ref={n_content} defaultValue={notice?.n_content}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    <button type="submit" className="btn btn-sign3">수정</button>
                                                    <button type="button" onClick={() => navigate(`/admin/notice/alist/${a_id.key}`)} className="btn btn-sign3">목록</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                        </div>
                        <br/><br/><br/>
                        <br/><br/>
                    </main>
                </div>
            </div>
          
        </>
    );
}

export default Adetail;