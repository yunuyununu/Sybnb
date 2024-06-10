import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/astyles.css'; // Assuming you have custom styles here
import { CardHeading } from 'react-bootstrap-icons';

function Anoticedetail() {
    const { n_idx } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container mt-5">
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" style={{ cursor: 'default', backgroundColor: 'white' }}>공지사항</li>
                                    <li className="breadcrumb-item active" style={{ cursor: 'default', backgroundColor: 'white' }}>공지 상세</li>
                                </ol>
                            </nav> 
                            <br/>
                            <div className="card-style mb-30">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="header">
                                        <CardHeading width="40px" height="30px" /> 공지사항 상세
                                    </h2>
                                </div>
                                <br/>
                                <hr/>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className="col-form-label" style={{ backgroundColor: '#4e817269', width: '20%' }}>작성자</td>
                                                <td>{notice?.n_writer}</td>
                                                <td className="col-form-label" style={{ backgroundColor: '#4e817269', width: '20%' }}>작성일자</td>
                                                <td>{notice?.n_date}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label" style={{ backgroundColor: '#4e817269' }}>제목</td>
                                                <td colSpan="3">{notice?.n_title}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-form-label" style={{ backgroundColor: '#4e817269' }}>내용</td>
                                                <td colSpan="3">{notice?.n_content}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br /><br /><br /><br /><br /><br /><br /><br />
                    </main>
                </div>
            </div>
        </>
    );
}

export default Anoticedetail;