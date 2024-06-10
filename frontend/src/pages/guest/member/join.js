import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import '../../../asset/css/user.css';
import '../aa.css'

function Join() {
    const g_email = useRef();
    const g_passwd = useRef();
    const g_name = useRef();
    const g_phone = useRef();
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [check, setCheck] = useState(false);
    const checkEmail = useRef();
    let info_code = '';
    const passwdCheck = useRef();
    const [checkCode, setCheckCode] = useState(false);


    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)){
            setInputValue(e.target.value);
        }
        if(inputValue.length < 10) {
            setCheckCode(false);
        } else {
            setCheckCode(true);
        }
    }

    useEffect(() => {
        if (inputValue.length > 0 ) {
            setInputValue(inputValue
                .replace(/-/g, '')
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        
    });
    
    const changeButton = (e) => {
        g_email.current.value.includes('@') && g_email.current.value.length >=9
        ? setCheck(true) : setCheck(false)
    }
    
   

    return( 
        <>
        <div className="container min-vh-100" style={{ zIndex: "1000", paddingTop: "15px"}}>
        <h3 className="text-bold"> <img src="/img/join.png" width="35px" height="35px"/>
        &nbsp;게스트 회원가입</h3>
        <hr/>
        <div className="card-style mb-30">
        <form>
        <h4>이메일</h4>
        <br/>
        <div className="input-style-a" >
			<div className="fl" style={{marginLeft:"20px"}}><input type='text' ref={g_email} onChange={changeButton} placeholder="이메일을 입력해주세요" /></div>
            <div className="blank"></div>
            <div className="fl" style={{paddingBottom: "20px"}}><button type="button" value={check} disabled={!check} className={"check-btn" + (check?'Active':'Disabled')} onClick={() => {
                if(g_email.current.value == '') {
                    Swal.fire({
                        icon : 'warning',
                        text : '이메일을 입력하세요.',
                    });
                    g_email.current.focus();
                    return;
                }
                const form = new FormData();
                form.append('g_email', g_email.current.value);
                fetch('http://localhost/guest/info/checkEmail', {
                    method: 'post',
                    body: form
                })
                .then(response => response.json())
                .then(data => {  
                    if(data.result == 'success') {
                        info_code = data.info_code;
                        Swal.fire({
                            title: '코드 전송 완료',
                            text: "인증 코드를 입력해 주세요",
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        });
                    } else if (data.result == 'fail') {
                        Swal.fire({
                            title: '중복 아이디',
                            text: "이미 가입된 회원입니다",
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        });
                    } else {
                        Swal.fire({
                            title: '회원가입 실패',
                            text: "관리자에게 문의 바랍니다",
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        });
                    }
                });
            }}>아이디 확인</button></div>
        </div>
        <br/>
        <div className="input-style-check">
			<div className="fl" style={{marginLeft:"20px"}}><input ref={checkEmail} placeholder="인증 코드" /></div>
            <div className="blank"></div>
            <div className="fl" style={{paddingBottom: "30px"}}><button type="button" className="main-btn-check" onClick={() => {
                if (checkEmail.current.value == info_code) {
                    Swal.fire({
                        title: '인증 성공',
                        showCancelButton: false,
                        confirmButtonText: '확인',
                    });
                    setCheckCode(true);
                } else {
                    Swal.fire({
                        title: '인증 실패',
                        text: '다시 시도해 주세요',
                        showCancelButton: false,
                        confirmButtonText: '확인',
                    });
                }
            }}>코드 확인</button></div>
        </div>
        <br/>
        <div className="fl"style={{marginBottom: "20px"}}><h4>&nbsp;&nbsp;&nbsp;비밀번호</h4>
        <br/>
        <div className="input-style-b" style={{marginLeft: "20px"}}>
			<input type='password' ref={g_passwd} />
        </div>
        </div>
        <br/>
        <div className="blank"></div>
        <div className="fl" style={{marginBottom: "20px", marginRight: "2px"}}><h4>비밀번호 확인</h4>
        <br/>
        <div className="input-style-b" style={{marginRight: "12px"}}>
			<input type='password' ref={passwdCheck} />
        </div>
        </div>
        <div className="fl"><h4>이름</h4>
        <br/>
        <div className="input-style-c" style={{marginLeft: "20px"}}>
			<input type='text' ref={g_name} />
        </div>
        </div>
        <div className="blankk"></div>
        
        <div className="fl" style={{marginBottom: "20px"}}><h4>전화번호</h4>
        <br/>
        <div className="input-style-d" style={{marginRight: "12px"}}>
			<input type='text' ref={g_phone} onChange={handleChange} value={inputValue} placeholder="숫자만 입력하세요"/>
            <div className="blank"></div>
        </div>
        </div>
        
        <br/>
        <p style={{color: "red"}}> 추후 신분증과 정보가 다를 경우 이용이 제한될 수 있습니다</p>
        
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
                if(g_passwd.current.value == '') {
                    Swal.fire({
                        icon : 'warning',
                        text : '비밀번호를 입력하세요.',
                    });
                    g_passwd.current.focus();
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
                if(g_passwd.current.value != passwdCheck.current.value) {
                    Swal.fire({
                        icon : 'warning',
                        text : '비밀번호가 일치하지 않습니다',
                    });
                    g_passwd.current.focus();
                    return;
                }
                const form = new FormData();
                form.append('g_email', g_email.current.value);
                form.append('g_passwd', g_passwd.current.value);
                form.append('g_name', g_name.current.value);
                form.append('g_phone', g_phone.current.value);
                fetch('http://localhost/guest/info/join', {
                    method: 'post',
                    body: form
                })
                .then(response => response.json())
                .then(data => {
                    if(data.result == 'success') {
                        Swal.fire({
                            title: '회원가입 완료',
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        }).then((result) => {
                            if(result.isConfirmed) {
                                window.location.href="/guest/login";
                            }
                        });
                    } else {
                        Swal.fire({
                            title: '회원가입 실패',
                            text: "관리자에게 문의 바랍니다",
                            showCancelButton: false,
                            confirmButtonText: '확인',
                        });
                    }
                });
            }} value={checkCode} disabled={!checkCode} className={"main-btnn" + (checkCode?'Active':'Disabled')} >회원가입</button>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Join;