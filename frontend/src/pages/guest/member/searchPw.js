import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function SearchPw() {
    const [params, setParams]=useSearchParams();    
    const navigate = useNavigate();
    const g_email = useRef();
    const g_name = useRef();
    const g_phone = useRef();
    const [message, setMessage] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
                비밀번호 찾기</h3>
            <hr/>
            <div className="card-style mb-30">
                <form>
                    <div className="input-style-1">
						<label>이메일</label> <input ref={g_email} placeholder="이메일을 입력해주세요"/>
					</div>
                    <div className="input-style-1">
						<label>이름</label> <input ref={g_name} placeholder="이름을 입력해주세요"/>
					</div>
                    <div className="input-style-1">
						<label>전화번호</label> <input type='tel' ref={g_phone} onChange={handleChange} value={inputValue} placeholder="숫자만 입력하세요" />
					</div>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <button type="button" onClick={() => {
                            if(g_email.current.value == '') {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '이메일을 입력하세요.',
                                });
                                g_email.current.focus();
                                return;
                            }
                            if(g_name.current.value == '') {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '이름을 입력하세요.',
                                });
                                g_name.current.focus();
                                return;
                            }
                            if(g_phone.current.value == '') {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '전화번호를 입력하세요.',
                                });
                                g_phone.current.focus();
                                return;
                            }
                            const form = new FormData();
                                form.append('g_email', g_email.current.value);
                                form.append('g_name', g_name.current.value);
                                form.append('g_phone', g_phone.current.value);
                                fetch('http://localhost/guest/login/searchPw', {
                                    method: 'post',
                                    body: form
                                })
                                .then(response => response.json())
                                .then(data => {
                                    setMessage(data);
                                    if(data.result == 'success') {
                                        Swal.fire({
                                            title: '비밀번호 전송',
                                            text: g_name.current.value+ " 님의 이메일로 임시 비밀번호를 전송했습니다",
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        }).then((result) => {
                                            if(result.isConfirmed) {
                                                navigate("/guest/login");
                                            }
                                        });
                                    } else if(data.result == 'no') {
                                        Swal.fire({
                                            title: '비밀번호 찾기',
                                            text: "일치하는 회원 정보가 없습니다",
                                            showCancelButton: false,
                                            confirmButtonText: '확인',
                                        });
                                    }
                                });
                        }} id="main-btn" className="main-btnn">비밀번호 찾기</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default SearchPw;