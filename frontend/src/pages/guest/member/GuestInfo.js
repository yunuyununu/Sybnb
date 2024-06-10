import Cookies from "universal-cookie";
import React,{useRef,useEffect,useState} from 'react';
import '../../../asset/css/user.css';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




function GuestInfo() { 
    const cookies = new Cookies();
    const email = cookies.get('g_email');
    const name = cookies.get('g_name');
    const idx = cookies.get('g_idx');
    const phone = cookies.get('g_phone');
    const profile = cookies.get('g_profile');
    const navigate = useNavigate();

    
    if(email == null || email == '') {
        Swal.fire({
            text: "로그인 후 이용 가능합니다.",
            showCancelButton: false,
            showConfirmButton: false,
            icon: "warning",
            // confirmButtonText: '확인',
        }).then(() => {
            navigate("/"); 
        });
    } 


    

    
    const g_passwd = useRef();
    const checkPwd = useRef();
    const g_phone = useRef();
    const [selected, setSelected] = useState(profile.key);
    const selectList = ["미인증", "주민등록증", "여권", "운전면허증"];
    const [inputValue, setInputValue] = useState(phone.key);
    const [alter, setAlter] = useState('dis');
    const img = useRef();
    const image = useRef();
    const [gphoto, setGphoto] = useState('-');

    function useFetch(url) {
    
        const [data, setData] = useState(null);
        const [loading,setLoading] = useState(true);
    
    
        useEffect(() => {
            fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setLoading(true);
                if (data != null) {
                    setLoading(false);
                    setData(data);
                    setGphoto(data.dto.g_photo);
                }
            })
        }, []);
        return [data, loading];
    }

    const [data, loading] = useFetch('http://localhost/guest/info/detail?g_idx='+idx.key);

    const handleSelect = (e) => {
        setSelected(e.target.value);    
    };

    useEffect(() => {
        if (inputValue.length > 0 ) {
            setInputValue(inputValue
                .replace(/-/g, '')
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [inputValue]);

    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)){
            setInputValue(e.target.value);
        }
    }

    const removeCookies = () => {
            cookies.remove("g_idx", { path: "/" }, 100);
            cookies.remove("g_name", { path: "/" }, 100);
            cookies.remove("g_email", { path: "/" }, new Date(Date.now()));
            cookies.remove("g_level", { path: "/" }, new Date(Date.now()));
            cookies.remove("g_phone", { path: "/" }, new Date(Date.now()));
            cookies.remove("g_profile", { path: "/" }, new Date(Date.now()));
        };

     const urlHandle = (e) => {
         window.open(`http://localhost/static/images/guest/photo/${data.dto.g_photo}`, '', 'width=500, height=500, top=150,left=300'); 
         return false;
        } 

    if(loading) {
        return (
            <div>loading</div>
        )
    } else {
       

        return (
            <>
                <div className="container min-vh-100">
                <h3 className="text-bold"> <img src="/img/info.png" width="35px" height="35px"/>
                &nbsp; 회원 정보</h3>
                <br/>
                <div className="card-stylee mb-30">
                    <form>
                        <div style={{float:"left"}}>
                        <label className="label-1">이메일</label><br/>
                        <input type="text" style={{border: "0px", outline: "none"}} defaultValue={email != null? email.key : ''} readOnly></input>
                        </div>
                        <div className="blankk"></div>
                        <div>
                        <label className="label-1">프로필 사진</label><br/>
                        { gphoto !== '-' ? 
                        <>
                        <a href="#none" style={{border: "0px", outline: "none"}} onClick={() => {urlHandle(); return false;}} 
                        //onClick={() => {
                            // Swal.fire({
                            //     icon: "info",
                            //     text: "프로필 사진을 변경하시겠습니까?",
                            //     confirmButtonText: "변경",
                            //     cancelButtonText: "취소",
                            //     showCancelButton: true,
                            // }).then((result) => {
                            //     if(result.isConfirmed) {
                            //         setAlter('dis-1');
                            //     } else {
                            //         setAlter('dis');
                            //     }
                            // });
                        //}}
                        >{data.dto.g_photo}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type='file' ref={image}></input>
                        </>
                        :
                        <>
                        <input type='file' ref={image}></input>
                        </>
                        }
                        </div>
                        <hr/>
                        <div>
                        <label className="label-1">이름</label><br/>
                        <input type="text" style={{border: "0px", outline: "none"}} defaultValue={name.key} readOnly></input>
                        </div>
                        <hr/>
                        <div style={{float:"left"}}>
                        <label className="label-1">비밀번호</label><br/>
                        <input className="underline" type="password"  ref={g_passwd}></input>
                        </div>
                        <div className="blankk"></div>
                        <div>
                        <label className="label-1">비밀번호 확인</label><br/>
                        <input className="underline" type="password" ref={checkPwd}></input>
                        </div>
                        <hr/>
                        <div>
                        <label className="label-1">전화번호</label><br/>
                        <input className="underline" type="text" ref={g_phone} onChange={handleChange} value={inputValue} placeholder="숫자만 입력하세요">
                        
                        </input>
                        </div>
                        <hr/>
                        <div>
                        <label className="label-1">가입일자</label><br/>
                        <input style={{border: "0px", outline: "none"}} defaultValue={data.dto.g_join_date} readOnly></input>
                        </div>
                        <hr/>
                        <div>
                        <label className="label-1">레벨</label><br/>
                        <input style={{border: "0px", outline: "none"}} defaultValue={data.dto.l_name} readOnly></input>
                        </div>
                        <hr/>
                        <div style={{float:"left", width:"150px"}}>
                        <label className="label-1">인증</label><br/>
                        <select onChange={handleSelect} value={selected} >
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select> 
                        </div>
                        <div className="blankk"></div>
                        <div>
                        <label className="label-1">신분증</label><br/>
                        { data.dto.g_url !== '-' ? 
                        <>
                        <a href="#" style={{border: "0px", outline: "none"}} onClick={() => {
                            Swal.fire({
                                icon: "info",
                                text: "이미 인증 이력이 있습니다. 변경하시겠습니까?",
                                confirmButtonText: "변경",
                                cancelButtonText: "취소",
                                showCancelButton: true,
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    setAlter('dis-1');
                                } else {
                                    setAlter('dis');
                                }
                            });
                        }}>{data.dto.g_url}</a>
                        <div id="alterUrl" className={alter}>
                        <input type='file' ref={img}></input>
                        </div>
                        </>
                        :
                        <>
                        <input type='file' ref={img}></input>
                        </>
                        }
                        </div>
                        <hr/>
                        <br/>
                        <div>
                        <button type='button' className="main-btn" onClick={() =>{
                            if(g_passwd.current.value != checkPwd.current.value) {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '변경 비밀번호가 일치하지 않습니다',
                                });
                                g_passwd.current.focus();
                                return;
                            }
                            if ((selected == '미인증' && img.current.files.length > 0) || (selected == '미인증' && data.dto.g_url == '')) {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '인증 분류를 선택해 주세요',
                                });
                                return;
                            }
                            if (selected !== '미인증' && img.current.files.length == 0 && data.dto.g_url == '-') {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '신분증 파일이 없습니다',
                                });
                                return;
                            }
                            const form = new FormData();
                            if (g_passwd.current.value !== '') {
                                form.append('g_passwd', g_passwd.current.value);
                            }
                            if (g_phone.current.value !== phone.key && g_phone.current.value !== '') {
                                form.append('g_phone', g_phone.current.value);
                            }
                            if (selected !== profile.key) {
                                form.append('g_profile', selected);
                            }
                            if(img.current.files.length !== 0) {
                                form.append('img', img.current.files[0]);
                            }
                            if(image.current.files.length !== 0) {
                                form.append('photo_img', image.current.files[0]);
                            }
                            let values = form.values();
                            let a= '';
                            for (const pair of values) {
                                a = a + '' + pair;
                            }
                            if (a !== '') {
                                form.append('g_idx', idx.key);
                                Swal.fire({
                                    text: "현재 비밀번호를 입력해 주세요",
                                    showCancelButton: true,
                                    confirmButtonText: "인증",
                                    cancelButtonText: "취소",
                                    input: 'password',
                                    preConfirm: (pwd) => {
                                        const formData = new FormData();
                                        formData.append('g_email', email.key);
                                        formData.append('pwd', pwd);
                                        return fetch('http://localhost/guest/info/confirmPwd', {
                                            method: 'post',
                                            body: formData,
                                        }).then(response => response.json())
                                        .then(data => {
                                            if(data.result == 'success') {
                                                fetch('http://localhost/guest/info/update', {
                                                    method: 'post',
                                                    encType: 'multipart/form-data',
                                                    body: form,
                                                    }).then((response) => response.json())
                                                .then(data => {
                                                    if (data.result == 'success') {
                                                        cookies.set('g_phone', {key: data.g_phone}, {path: '/', expires: new Date(Date.now()+2592000)});
                                                        cookies.set('g_photo', {key: data.g_photo}, {path: '/', expires: new Date(Date.now()+2592000)});
                                                        cookies.set('g_profile', {key: data.g_profile}, {path: '/', expires: new Date(Date.now()+2592000)});
                                                        Swal.fire({
                                                            title: '수정 완료',
                                                            showCancelButton: false,
                                                            confirmButtonText: '확인',
                                                        }).then((result) => {
                                                            if(result.isConfirmed) {
                                                                window.location.href='/guest/GuestInfo';
                                                            }
                                                        });
                                                    } else {
                                                        Swal.fire({
                                                            title: '수정 실패',
                                                            text: '관리자에게 문의하세요',
                                                            showCancelButton: false,
                                                            confirmButtonText: '확인',
                                                        });
                                                    }
                                                })
                                            } else if(data.result == 'no') {
                                                Swal.fire({
                                                    title: '비밀번호 불일치',
                                                    showCancelButton: false,
                                                    confirmButtonText: '확인',
                                                });
                                            } else {
                                                Swal.fire({
                                                    title: '에러 발생',
                                                    showCancelButton: false,
                                                    confirmButtonText: '확인',
                                                });
                                            }
                                        })
                                    }
                            });
                                } else {
                                Swal.fire({
                                    icon : 'warning',
                                    text : '변경 사항이 없습니다',
                                });
                            };
                        }} >정보 수정</button>
                        <a href="#" style={{float: "right", color: "black"}} onClick={() => {
                            const form = new FormData();
                            form.append('g_idx', idx.key);
                            fetch('http://localhost/guest/info/checkOrder', {
                                method: 'post',
                                body: form,
                            }).then(response => response.json())
                            .then(data => {
                                if(data.result == 0) {
                                    Swal.fire({
                                        icon: "warning",
                                        text: "정말 삭제하시겠습니까?",
                                        confirmButtonText: "삭제",
                                        cancelButtonText: "취소",
                                        showCancelButton: true,
                                    }).then((result) => {
                                        if(result.isConfirmed) {
                                            Swal.fire({
                                                text: "현재 비밀번호를 입력해 주세요",
                                                showCancelButton: true,
                                                confirmButtonText: "인증",
                                                cancelButtonText: "취소",
                                                input: 'password',
                                                preConfirm: (pwd) => {
                                                    const formData = new FormData();
                                                    formData.append('g_email', email.key);
                                                    formData.append('pwd', pwd);
                                                    return fetch('http://localhost/guest/info/confirmPwd', {
                                                        method: 'post',
                                                        body: formData,
                                                    }).then(response => response.json())
                                                    .then(data => {
                                                        if(data.result == 'success') {
                                                            const form = new FormData();
                                                            form.append('g_idx', idx.key);
                                                            fetch('http://localhost/guest/info/delete', {
                                                                method: 'post',
                                                                encType: 'multipart/form-data',
                                                                body: form,
                                                                }).then((response) => response.json())
                                                            .then(data => {
                                                                if (data.result == 'success') {
                                                                    Swal.fire({
                                                                        title: '탈퇴 완료',
                                                                        showCancelButton: false,
                                                                        confirmButtonText: '확인',
                                                                    }).then((result) => {
                                                                        if(result.isConfirmed) {
                                                                            removeCookies("guest");
                                                                            window.location.href='/';
                                                                        }
                                                                    });
                                                                } else {
                                                                    Swal.fire({
                                                                        title: '에러 발생',
                                                                        text: '관리자에게 문의하세요',
                                                                        showCancelButton: false,
                                                                        confirmButtonText: '확인',
                                                                    });
                                                                }
                                                            })
                                                        } else if(data.result == 'no') {
                                                            Swal.fire({
                                                                title: '비밀번호 불일치',
                                                                showCancelButton: false,
                                                                confirmButtonText: '확인',
                                                            });
                                                        } else {
                                                            Swal.fire({
                                                                title: '에러 발생',
                                                                showCancelButton: false,
                                                                confirmButtonText: '확인',
                                                            });
                                                        }
                                                    })
                                                }
                                            });
                                        } 
                                    });
                                } else {
                                    Swal.fire({
                                        title: '탈퇴 불가',
                                        text: '완료되지 않은 예약이 있습니다.',
                                        showCancelButton: false,
                                        confirmButtonText: '확인',
                                    });
                                }
                            })

                            
                        }}>회원 탈퇴</a>
                        </div>
                    </form>
                </div>
                </div>
            </>
        )
    }
}

export default GuestInfo;