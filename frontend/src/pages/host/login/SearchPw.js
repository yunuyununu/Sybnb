import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function SearchPw() {
  const navigate = useNavigate();
  const userEmail = useRef();
  const [phone, setPhoneNum] = useState("");
  const h_phone = useRef();
  const [business, setBusinessNum] = useState("");
  const h_business = useRef();

  const handleChange = (val, opt) => {
    const phoneRegEx = /^[0-9\b -]{0,13}$/;
    const businessRegEx = /^[0-9\b -]{0,12}$/;
    switch (opt) {
      case "phone":
        if (phoneRegEx.test(val)) {
          setPhoneNum(
            val.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
          );
        }
        break;
      case "business":
        if (businessRegEx.test(val)) {
          setBusinessNum(
            val.replace(/-/g, "").replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3")
          );
        }
        break;
    }
  };

  return (
    <>
      <div className="container min-vh-100">
        <h3 className="text-bold">
          <img src="/img/search_id.png" width="35px" height="35px" />
          &nbsp;비밀번호 찾기
        </h3>
        <hr />
        <div className="card-style mb-30">
          <form>
            <div className="input-style-1">
              <label>이메일</label>&nbsp;
              <input ref={userEmail} placeholder="이메일을 입력해주세요" />
            </div>
            <div className="input-style-1">
              <label>전화번호</label>&nbsp;
              <input
                type="text"
                maxLength={13}
                onChange={(e) => {
                  handleChange(e.target.value, "phone");
                }}
                value={phone}
                ref={h_phone}
                placeholder="숫자만 입력하세요"
              />
            </div>
            <div className="input-style-1">
              <label>사업자번호</label>&nbsp;
              <input
                type="text"
                maxLength={10}
                onChange={(e) => {
                  handleChange(e.target.value, "business");
                }}
                value={business}
                ref={h_business}
                placeholder="숫자만 입력하세요"
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
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
                  if (h_phone.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "전화번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  }
                  if (h_business.current.value == "") {
                    Swal.fire({
                      icon: "warning",
                      title: "잠깐!",
                      html: "사업자번호를 입력하세요.",
                      confirmButtonText: "OK",
                    });
                    return;
                  }
                  const form = new FormData();
                  form.append("userEmail", userEmail.current.value);
                  form.append("h_phone", h_phone.current.value);
                  form.append("h_business", h_business.current.value);
                  fetch("http://localhost/api/host/login/findPwd", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.msg === "success") {
                        Swal.fire({
                          icon: "success",
                          title: "Check",
                          html: `<strong><p>${userEmail.current.value}</strong> 로 임시 비밀번호를 전송했습니다.</br>로그인 후 비밀번호를 변경해주세요.</p>`,
                          confirmButtonText: "YES",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/host/login");
                          }
                        });
                      } else if (data.msg === "fail") {
                        Swal.fire({
                          icon: "warning",
                          title: "잠깐!",
                          html:
                            "메일 발송에 실패했습니다.</br>반복 실패 시 관리자 측에 문의해주시기 바랍니다.",
                          confirmButtonText: "YES",
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "잠깐!",
                          html: data.msg + "</br>확인 후 재입력해주세요.",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                }}
                className="main-btn"
              >
                비밀번호 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchPw;
