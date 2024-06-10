import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import Join from "../pages/guest/member/join";
import HostJoin from "../pages/host/login/Join_modal";

import "../pages/guest/modall.css";
import "../pages/host/host1.css";

import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function Header() {
  const navigate = useNavigate();

  const [modal_1, setModal_1] = useState(false);
  const [modal, setModal] = useState(false);
  const [join, setJoin] = useState(false);
  const [hostJoin, setHostJoin] = useState(false);
  const cookies = new Cookies();
  const timerRef = useRef(null);

  const timeoutAlert = (type) => {
    timerRef.current = setTimeout(() => {
      Swal.fire({
        icon: "warning",
        title: "Check",
        html: "세션이 만료되었습니다.</br>메인 화면으로 이동합니다.",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        window.location.href = "/";
      });
      removeCookies(type);
    }, 1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  //게스트 쿠키
  const g_email = cookies.get("g_email"); //쿠키변수명
  const g_level = cookies.get("g_level");
  const g_photo = cookies.get("g_photo");

  //호스트 쿠키
  const userInfo = cookies.get("userInfo");

  // 관리자 쿠키
  const a_id = cookies.get("a_id");

  //쿠키삭제
  const removeCookies = (type) => {
    switch (type) {
      case "guest":
        cookies.remove("g_idx", { path: "/" }, 100);
        cookies.remove("g_name", { path: "/" }, 100);
        cookies.remove("g_email", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_level", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_phone", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_profile", { path: "/" }, new Date(Date.now()));
        cookies.remove("g_photo", { path: "/" }, new Date(Date.now()));
        break;
      case "host":
        cookies.remove("userInfo", { path: "/" }, new Date(Date.now()));
        break;
      case "admin":
        cookies.remove("a_id", { path: "/" }, new Date(Date.now()));
        cookies.remove("a_passwd", { path: "/" }, new Date(Date.now()));
        break;
    }
  };

  const locationNow = useLocation(); // 팝업창에서 헤더제거
  if (
    locationNow.pathname === "/guest/write" ||
    locationNow.pathname === "/guest/edit"
  )
    return null; // 팝업창에서 헤더 제거
  if (
    locationNow.pathname === "/host/account/manage/review" ||
    locationNow.pathname === "/host/account/manage/reply"
  )
    return null;
  if (locationNow.pathname === `/admin/alogin/${a_id}`) return null;

  if (userInfo == null && g_email == null && a_id == null) {
    console.log("a_id 로그인X cookie==> " + a_id);
    console.log("g_email 로그인X cookie==> " + g_email);
    console.log("로그인X cookie==> " + userInfo);
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
              href="/"
              width="170px"
              height="65px"
              style={{ padding: "0.5rem" }}
            ></img>
          </a>

          {/*로그인 전 상단*/}
          <div align="right">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => {
                    setModal_1(true);
                  }}
                >
                  로그인
                </a>
              </li>
              {modal_1 && (
                <div
                  className="Modal"
                  style={{ zIndex: 999 }}
                  onClick={() => setModal_1(false)}
                >
                  <div
                    className="modalBody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      id="modalCloseBtn"
                      onClick={() => setModal_1(false)}
                    >
                      X
                    </button>

                    <div
                      className="container min-vh-100"
                      style={{ paddingTop: "15px" }}
                    >
                      <h3 className="text-bold">
                        <img src="/img/login.png" width="35px" height="35px" />
                        &nbsp;로그인
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setModal_1(false);
                            navigate("/guest/login");
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
                        </div>

                        <div
                          className="card-style2"
                          onClick={() => {
                            setModal_1(false);
                            navigate("/host/login");
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  회원가입
                </a>
              </li>
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
                    <button id="modalCloseBtn" onClick={() => setModal(false)}>
                      X
                    </button>

                    <div
                      className="container min-vh-100"
                      style={{ paddingTop: "13px" }}
                    >
                      <h3 className="text-bold">
                        <img src="/img/join.png" width="35px" height="35px" />
                        &nbsp; 회원가입
                      </h3>
                      <hr />
                      <div className="aa">
                        <div
                          className="card-style1"
                          onClick={() => {
                            setModal_1(false);
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
                        </div>
                        {join && (
                          <Modall>
                            <Join />
                          </Modall>
                        )}

                        <div
                          className="card-style2"
                          onClick={() => {
                            setHostJoin(true);
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
                            <ModalH>
                              <HostJoin />
                            </ModalH>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => navigate("/component/Notice")}
                >
                  공지사항
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (userInfo == null && g_email != null && a_id == null) {
    //게스트 계정으로 로그인
    console.log("guest 로그인 ==> " + g_email);
    timeoutAlert("guest");
    let level = "";
    if (g_level.key == 1) {
      level = "regular";
    } else if (g_level.key == 2) {
      level = "super";
    } else if (g_level.key == 3) {
      level = "VIP";
    }

    let src = "";
    let image = "";
    if (g_photo.key === "-") {
      src = `http://localhost/static/images/guest/photo/image_no.png`;
      image = `<img class='profile-img' src=${src} width='45px' height='45px' style={{backgroundSize:"contain";}}/>`;
    } else {
      src = `http://localhost/static/images/guest/photo/${g_photo.key}`;
      image = `<img class='profile-img' src=${src} width='45px' height='45px' style={{backgroundSize:"contain";}}/>`;
    }

    //<span dangerouslySetInnerHTML={{ __html: image_url}}></span>
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
              href="/"
              width="170px"
              height="65px"
              style={{ padding: "0.5rem" }}
            ></img>
          </a>

          <div align="right">
            <ul className="navbar-nav">
              <li className="nav-item rounded">
                <a className="nav-link active">
                  <div className={"btn-wrapper2"}>
                    <span
                      onClick={() => navigate("/guest/Profile")}
                      dangerouslySetInnerHTML={{ __html: image }}
                    ></span>
                  </div>
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() => navigate("/component/message")}
                >
                  메시지
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/reservation")}
                >
                  여행
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/wish")}
                >
                  위시리스트
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() => navigate("/guest/Account")}
                >
                  계정
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() => navigate("/component/Notice")}
                >
                  공지사항
                </a>
              </li>
              <li className="nav-item rounded" style={{ paddingTop: "10px" }}>
                <a
                  className="nav-link active"
                  onClick={() =>
                    Swal.fire({
                      title: "",
                      html: `게스트 로그아웃 하시겠습니까?`,
                      showCancelButton: true,
                      cancelButtonText: "cancel",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeCookies("guest");
                        window.location.href = "/";
                      }
                    })
                  }
                >
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (userInfo != null && g_email == null && a_id == null) {
    //호스트계정으로 로그인 했을 때
    const userIdx = userInfo.h_idx;
    timeoutAlert("host");

    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/img/sybnb.png"
              href="/"
              width="170px"
              height="65px"
              style={{ padding: "0.5rem" }}
            ></img>
          </a>

          {/* 호스트로그인 후 상단 */}
          <div align="right">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => navigate(`/api/host/account/${userIdx}`)}
                >
                  계정
                </a>
              </li>
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => navigate(`/component/Message`)}
                >
                  메시지
                </a>
              </li>
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => navigate(`/host/hotel/MyhotelList`)}
                >
                  호텔
                </a>
              </li>
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => navigate(`/api/order/manage/list/${userIdx}`)}
                >
                  예약관리
                </a>
              </li>
              <li
                className="nav-item rounded"
                style={{ display: "inline-block" }}
              >
                <a
                  className="nav-link active"
                  onClick={() => navigate("/component/Notice")}
                >
                  공지사항
                </a>
              </li>
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => {
                    Swal.fire({
                      icon: "question",
                      title: "잠깐!",
                      html: "로그아웃 하시겠습니까?",
                      showCancelButton: true,
                      confirmButtonText: "YES",
                      cancelButtonText: "NO",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.clear();
                        sessionStorage.clear();
                        removeCookies("host");
                        navigate("/");
                      }
                    });
                  }}
                >
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else if (a_id != null && userInfo == null && g_email == null) {
    timeoutAlert("admin");
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img
              src="/img/sybnb_admin.png"
              width="170px"
              height="65px"
              style={{ padding: "0.5rem" }}
            ></img>
          </a>

          {/* 관리자 로그인 후 상단 */}
          <div align="right">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: 'default', backgroundColor: 'white' }}>*관리자님 로그인 중*</a>
              </li>
              <li className="nav-item rounded">
                <a
                  className="nav-link active"
                  onClick={() => {
                   Swal.fire({
                    icon: "question",
                    title: "로그아웃 하시겠습니까?",
                    html: "로그아웃 시 메인화면으로 이동합니다.",
                    showCancelButton: true,
                    confirmButtonText: "YES",
                    cancelButtonText: "NO",
                    confirmButtonColor: "#41774d86",
                    cancelButtonColor: "#838383d2",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.clear();
                      sessionStorage.clear();
                      removeCookies("admin");
                      navigate("/");
                      }
                    });
                  }}
                >
                  로그아웃

                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  function Modall(props) {
    function closeModal() {
      setJoin(!join);
    }

    return (
      <div className="Modal_a">
        <div className="modalBody_a" onClick={(e) => e.stopPropagation()}>
          <button
            id="modalCloseBtn"
            onClick={() => {
              closeModal();
              setModal(false);
            }}
          >
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }

  function ModalH(props) {
    function closeModal() {
      setModal(false);
      setHostJoin(false);
    }

    return (
      <div className="modal_h" onClick={(e) => e.stopPropagation()}>
        <div className="modalBody_h">
          <button id="modalCloseBtn" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }
}
export default Header;
