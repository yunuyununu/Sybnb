import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import '../aa.css'

function SearchEmail() {
    const [params, setParams]=useSearchParams();
        //  데이터 setter       
    const navigate = useNavigate();
    const g_name = useRef();
    const g_phone = useRef();
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState([]);

    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)){
            setInputValue(e.target.value);
        }
    }

    useEffect(() => {
        if (inputValue.length > 0 ) {
            setInputValue(inputValue
                .replace(/-/g, '')
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [inputValue]);

    return (
        <>
            <div className="container min-vh-100">
            <h3 className="text-bold"> <img src="/img/search_id.png" width="35px" height="35px"/>
                이메일 찾기</h3>
            <hr/>
            <div className="card-style mb-30">
                <form>
                    <div className="input-style-1">
						<label>이름</label> <input ref={g_name} placeholder="이름을 입력해주세요"/>
					</div>
                    <div className="input-style-1">
						<label>전화번호</label> <input type='tel' ref={g_phone} onChange={handleChange} value={inputValue} placeholder="숫자만 입력하세요" />
					</div>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <button type="button" onClick={() => {
                            if(g_name.current.value == '') {
                                Swal.fire({
                                    text: '이름을 입력하세요.',
                                    showCancelButton: false,
                                    confirmButtonText: '확인',
                                });
                                g_name.current.focus();
                                return;
                            }
                            if(g_phone.current.value == '') {
                                Swal.fire({
                                    text: '전화번호를 입력하세요.',
                                    showCancelButton: false,
                                    confirmButtonText: '확인',
                                });
                                g_phone.current.focus();
                                return;
                            }
                            const form = new FormData();
                                form.append('g_name', g_name.current.value);
                                form.append('g_phone', g_phone.current.value);
                                fetch('http://localhost/guest/login/searchMail', {
                                    method: 'post',
                                    body: form
                                })
                                .then(response => response.json())
                                .then(data => {
                                    setMessage(data);
                                    if(data.message == 'success') {
                                        Swal.fire({
                                            title: '이메일 찾기',
                                            text: g_name.current.value+ " 님의 이메일은 " + data.g_email+ "입니다",
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        }).then((result) => {
                                            if(result.isConfirmed) {
                                                navigate("/guest/login");
                                            }
                                        });
                                    } else {
                                        Swal.fire({
                                            title: '이메일 찾기',
                                            text: "일치하는 회원 정보가 없습니다",
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        });
                                    }
                                });
                        }} id="main-btn" className="main-btnn">아이디 찾기</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default SearchEmail;