import React, { useRef, useState } from "react";
import { ChatLeftQuote } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const WriteReply = () => {
  let loading = false;
  const data = JSON.parse(localStorage.getItem("reviewData"));

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userName = userInfo.h_name;
  const rp_content = useRef();
  const [check, setCheck] = useState(false);

  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (data.g_photo != "-" && data.g_photo != null) {
      const img_url = `http://localhost/static/images/guest/photo/${data.g_photo}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }

    return (
      <>
        <div className="m-2 p-2">
          <div
            className="card-style"
            style={{
              borderStyle: "solid",
              borderColor: "#F7EFFC",
              backgroundColor: "#F7EFFC",
            }}
          >
            <div className="row m-0 p-0" style={{ float: "left" }}>
              <div
                className="col-2"
                style={{ textAlign: "center", paddingTop: "3%" }}
              >
                <ChatLeftQuote size={35} />{" "}
              </div>
              <div className="col-10">
                <h4 style={{ paddingBottom: "1%" }}> {userName} 님,</h4>
                {data.g_name} 고객님께 답변을 남겨주세요!
                <input type="hidden" defaultValue={data.g_email} readOnly />
              </div>
            </div>
            <div className="input-group">
              <br />
              <div
                className="card-style col-12 mb-3"
                style={{
                  boxSizing: "border-box",
                  marginTop: "12px",
                  textAlign: "left",
                  float: "left",
                }}
              >
                <div className="row">
                  <div
                    className="col-2"
                    dangerouslySetInnerHTML={{ __html: profile_src }}
                  ></div>
                  <div className="col-10" width="100%">
                    <strong>
                      <b>예약번호</b> :&nbsp;&nbsp;{data.o_idx}&nbsp;&nbsp;
                      |&nbsp;&nbsp;<b>객실유형</b> :&nbsp;&nbsp;{data.d_idx}
                      <br />
                      <b>평점</b>: &nbsp;{rendering(data.rv_star)}
                      <br />
                      <b>후기작성일</b> :&nbsp;&nbsp;{data.rv_date}
                    </strong>
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <textarea
                    className="form-control mb-3"
                    rows={5}
                    cols={85}
                    defaultValue={data.rv_content}
                    style={{
                      cursor: "auto",
                      borderColor: "#FAE0E0",
                      borderRadius: "7px",
                    }}
                    readOnly
                  />
                </div>
              </div>
              <div className="card-style col-12 mb-30">
                <div
                  className="col-12 mb-1"
                  style={{ float: "left", display: "inline" }}
                >
                  <b>REPLY</b>
                </div>

                <textarea
                  className="form-control mb-3"
                  rows={5}
                  cols={85}
                  ref={rp_content}
                  placeholder="내용을 입력해주세요"
                  style={{
                    borderColor: "#FAE0E0",
                    borderRadius: "7px",
                  }}
                  onChange={() => {
                    if (
                      rp_content.current.value.trim() !== "" &&
                      rp_content.current.value !== null
                    ) {
                      setCheck(true);
                    } else {
                      setCheck(false);
                    }
                  }}
                />
              </div>
              <div
                className="col-12 m-0"
                width="400px"
                style={{ textAlign: "right" }}
              >
                <button
                  className={check ? "main-btn active" : "main-btn disabled"}
                  onClick={() => {
                    if (!check) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "내용을 입력해주세요.(15자 이상)",
                        confirmButtonText: "OK",
                      });
                      return;
                    } else if (rp_content.current.value.length <= 15) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "내용이 너무 짧습니다.",
                        confirmButtonText: "OK",
                      });
                      return;
                    } else {
                      const form = new FormData();
                      form.append("rp_rv_idx", data.rv_idx);
                      form.append("rp_writer", userIdx);
                      form.append("rp_content", rp_content.current.value);
                      fetch("http://localhost/api/reply/insert", {
                        method: "post",
                        body: form,
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("false: " + response.status);
                          }
                          Swal.fire({
                            icon: "success",
                            title: "Thank you!",
                            html: "정상 처리되었습니다.",
                            confirmButtonText: "OK",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              localStorage.removeItem("reviewData");
                              window.opener.location.reload();
                              window.close();
                            }
                          });
                        })
                        .catch((error) => {
                          Swal.fire({
                            icon: "error",
                            title: "잠깐!",
                            html:
                              "처리 중 문제가 발생했습니다.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.",
                            confirmButtonText: "OK",
                          });
                        });
                    }
                  }}
                >
                  &nbsp;&nbsp;&nbsp;작성완료&nbsp;&nbsp;&nbsp;
                </button>
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default WriteReply;
