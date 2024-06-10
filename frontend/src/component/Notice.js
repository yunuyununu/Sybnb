import React, { useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";

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

function Notice() {
    const navigate = useNavigate();
    const [data, loading] = useFetch('http://localhost/main/notice');
    
    if(loading){
        return (
            <div className="text-center">로딩 중...</div>
        )
    } else {
        return (
            <>
                <div className="container min-vh-100">
                        <h3 className="text-bold">
                        <img style={{width:'57px', height:'57px'}}src='/img/notice.png'></img>&nbsp;공지사항</h3>
                        <br/>
                        <div className="card-stylee mb-30">
                            <table className="tbl">
                                <thead>
                                    <tr>
                                        <th>no.</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.list.map((item) => (
                                        <tr style={{textAlign:'center', cursor : 'pointer'}} onClick={() =>{
                                            navigate('/component/NoticeDetail', {
                                                state: {
                                                    nidx: item.n_idx
                                                }
                                            });
                                        }}>
                                            <td>{item.rownum}</td>
                                            <td>{item.n_title}</td>
                                            <td>{item.n_writer}</td>
                                            <td>{item.n_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            </>
        )
    }
}
export default Notice;