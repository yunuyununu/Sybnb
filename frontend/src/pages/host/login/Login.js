import React, { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import GuestJoin from "../../guest/member/join";
import HostJoin from "./Join_modal";
import "../host1.css";

function HostLogin() {
  const navigate = useNavigate();
  const [join, setJoin] = useState(false);
  const [hostJoin, setHostJoin] = useState(false);
  const userEmail = useRef();
  const pwd = useRef();
  const [modal, setModal] = useState(false);

  const handleCookie = (data) => {
    let expires = new Date();
    const cookies = new Cookies();
    expires.setDate(expires.getDate() + 1);
    cookies.set("userInfo", data, {
      path: "/",
      expires: expires,
    });
  };

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          <img src="/img/login.png" width="35px" height="35px" />
          &nbsp;호스트 로그인
        </h3>
        <br />
        <p className="text-sm text-gray">
          로그인을 하시면 보다 더 많은 정보와 서비스를 이용하실 수 있습니다.
        </p>

        <div className="card-style mb-30">
          <form>
            <div>
              <div className="input-style-1">
                <label>이메일</label>
                <input ref={userEmail} placeholder="이메일을 입력해주세요" />
              </div>
              <div className="input-style-1">
                <label>비밀번호</label>
                <input
                  type="password"
                  ref={pwd}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
              <br />
              <button
                type="button"
                onClick={() => {
                  if (userEmail.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "이메일을 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  }
                  if (pwd.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "비밀번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    pwd.current.focus();
                    return;
                  }
                  const form = new FormData();
                  form.append("userEmail", userEmail.current.value);
                  form.append("pwd", pwd.current.value);
                  fetch("http://localhost/api/host/login/", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.msg == "success") {
                        handleCookie(data.dto);
                        navigate("/");
                      } else {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html: "아이디/비밀번호를 확인해주세요.",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                }}
                className="main-btnn"
              >
                로그인
              </button>
              &nbsp;
            </div>
          </form>
        </div>
        <div
          className="card-style d-flex align-items-center"
          style={{
            backgroundColor: "#EEEEEE",
            border: "1px solid #D5D5D5",
            height: "300px",
          }}
        >
          <div className="col text-center">
            <div className="btnLoginBottom">
              <Link to="/host/SearchEmail">
                <img src="/img/id.png" />
                <br /> 이메일 찾기
              </Link>
            </div>
          </div>
          <div className="col text-center">
            <div className="btnLoginBottom">
              <Link to="/host/searchPw">
                <img src="/img/forgot.png" />
                <br /> 비밀번호 찾기
              </Link>
            </div>
          </div>

          <div className="col text-center">
            <div className="btnLoginBottom">
              <div onClick={() => setModal(true)}>
                <img src="/img/join.png" />
                <br /> <label className="text-bold">회원가입</label>
              </div>

              {modal && (
                <div
                  className="Modal"
                  style={{ zIndex: 999 }}
                  onClick={() => setModal(false)}
                >
                  <div
                    className="modalBody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="container min-vh-100"
                      style={{ paddingTop: "15px" }}
                    >
                      <h3 className="text-bold">
                        <img src="/img/join.png" width="35px" height="35px" />
                        &nbsp;회원가입
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setJoin(!join);
                          }}
                        >
                          <img
                            src="/img/guest.png"
                            width="100px"
                            height="100px"
                            style={{ marginLeft: "10px" }}
                          />
                          <label
                            className="text-bold"
                            style={{ paddingTop: "20px" }}
                          >
                            게스트
                          </label>
                          {join && (
                            <ModalH
                              style={{ zIndex: 9999 }}
                              closeModal={() => {
                                setJoin(!join);
                              }}
                            >
                              <GuestJoin />
                            </ModalH>
                          )}
                        </div>

                        <div
                          className="card-style2"
                          onClick={() => {
                            setHostJoin(!hostJoin);
                          }}
                        >
                          <img
                            src="/img/host.png"
                            width="100px"
                            height="100px"
                          />
                          <label
                            className="text-bold"
                            style={{ paddingTop: "20px" }}
                          >
                            호스트
                          </label>
                          {hostJoin && (
                            <ModalH
                              closeModal={() => {
                                setHostJoin(!hostJoin);
                              }}
                            >
                              <HostJoin />
                            </ModalH>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function ModalH(props) {
    function closeModal() {
      props.closeModal();
      setModal(false);
    }

    return (
      <div className="modal_h" onClick={closeModal}>
        <div className="modalBody_h" onClick={(e) => e.stopPropagation()}>
          <button className="btnClose" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }
}

export default HostLogin;
