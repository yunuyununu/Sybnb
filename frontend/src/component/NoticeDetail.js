import React, { useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
    }, []);
    return [data, loading];
}

function NoticeDetail() {
    const location = useLocation();
    const nidx = location.state.nidx;
    const [data, loading] = useFetch('http://localhost/main/noticedetail/'+nidx);

    if(loading){
        return(
            <div>loading</div>
        )
    } else {
        return (
            <>
                <div className="container min-vh-100">
                    <h3 className="text-bold">
                        <img style={{width:'57px', height:'57px'}}src='/img/notice.png'></img>&nbsp;공지사항
                    </h3>
                    <br/>
                    <table className="tbl">
                        <colgroup>
                        <col width={"20%"} />
                        <col width={"30%"} />
                        <col width={"20%"} />
                        <col width={"30%"} />
                        </colgroup>
                        <thead>
                        </thead>
                        <tbody className="table-group-divider" >
                            <tr>
                                <th>제목</th>
                                <td colSpan={3}>{data.dto.n_title}</td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>{data.dto.n_writer}</td>
                                <th>작성일</th>
                                <td>{data.dto.n_date}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colSpan={3} style={{whiteSpace : 'pre-line'}}>
                                    {data.dto.n_content}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default NoticeDetail;