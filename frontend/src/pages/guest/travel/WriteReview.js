import React, { useRef, useState } from "react";
import { ChatLeftQuote } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import StarRate from "../../../component/StarRate";

const WriteReview = () => {
  let loading = false;
  const data = JSON.parse(localStorage.getItem("reservData"));
  const cookies = new Cookies();

  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email");
  const g_photo = cookies.get("g_photo");
  const rv_writer = useRef();
  const rv_content = useRef();
  const [star, setStar] = useState(null);
  const [check, setCheck] = useState(false);

  const handleStarRating = (value) => {
    setStar(value);
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (g_photo.key != "-" && g_photo.key != null) {
      const img_url = `http://localhost/static/images/guest/photo/${g_photo.key}`;
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
              marginTop: "5px",
              borderStyle: "solid",
              borderColor: "#F7EFFC",
              backgroundColor: "#F7EFFC",
            }}
          >
            <h3 className="text-bold">
              <ChatLeftQuote size={35} />
              &nbsp;후기작성
            </h3>
            <hr />
            <div className="input-group">
              <br />
              <div
                className="card-style col-12 mb-3"
                style={{
                  boxSizing: "border-box",
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
                      {g_name.key} 님,
                      <br />
                      {data.HoName} 에 대한 후기를 남겨주세요!
                      <input
                        type="hidden"
                        defaultValue={g_email.key}
                        readOnly
                        ref={rv_writer}
                      />
                    </strong>
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <b>예약번호</b> :&nbsp;&nbsp;{data.OIdx}
                  <br />
                  <b>이용기간</b> :&nbsp;&nbsp;{data.OCkin} ~ {data.OCkout}
                  <br />
                </div>
              </div>
              <div className="card-style col-12 mb-30">
                <div
                  className="col-12 mb-3"
                  style={{ float: "left", display: "inline" }}
                >
                  <b>⭐평점 </b>: &nbsp;
                  {<StarRate rate={0} handleStarRating={handleStarRating} />}
                </div>

                <textarea
                  className="form-control mb-3"
                  rows={5}
                  cols={85}
                  ref={rv_content}
                  placeholder="내용을 입력해주세요"
                  style={{
                    borderColor: "#FAE0E0",
                    borderRadius: "7px",
                  }}
                  onChange={() => {
                    if (
                      rv_content.current.value.trim() !== "" &&
                      rv_content.current.value !== null
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
                    } else if (rv_content.current.value.length <= 15) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "내용이 너무 짧습니다.",
                        confirmButtonText: "OK",
                      });
                      return;
                    } else if (star == null) {
                      Swal.fire({
                        icon: "warning",
                        title: "잠깐!",
                        html: "평점을 체크해주세요.",
                        confirmButtonText: "OK",
                      });
                    } else {
                      const form = new FormData();
                      form.append("rv_writer", rv_writer.current.value);
                      form.append("rv_content", rv_content.current.value);
                      form.append("o_idx", data.OIdx);
                      form.append("rv_star", star);
                      fetch("http://localhost/api/review/insert", {
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
                            timer: 2000,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              localStorage.removeItem("reservData"); // localStorage 비우기
                              window.opener.location.reload(); // 부모창(reservRevItem) 새로고침(리뷰 미작성 목록 새로고침)
                              window.close(); // 창닫기
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

export default WriteReview;
