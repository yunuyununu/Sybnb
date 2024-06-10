import React, { useRef, useState, useEffect } from "react";
import { ChatLeftQuote } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const EditReply = () => {
  let loading = false;
  const data = JSON.parse(localStorage.getItem("editData"));

  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const rp_content = useRef();
  const [reply, setReply] = useState(null);
  const [content, setContent] = useState("");
  const [check, setCheck] = useState(false);

  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  function getReply(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReply(data.reply);
        setContent(data.reply.rp_content);
      });
  }

  useEffect(() => {
    getReply(`http://localhost/api/reputation/reply/${data.rp_idx}`);
  }, []);

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
                    style={{ marginRight: "2%" }}
                  ></div>
                  <div className="col-8" width="100%">
                    <b>예약번호</b> :&nbsp;&nbsp;{data.o_idx}&nbsp;&nbsp;
                    |&nbsp;&nbsp;<b>객실유형</b> :&nbsp;&nbsp;{data.d_idx}
                    <br />
                    <b>평점</b>: &nbsp;{rendering(data.rv_star)}
                    <br />
                    <b>후기작성일</b> :&nbsp;&nbsp;{data.rv_date}
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
                  defaultValue={content}
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
                      Swal.fire({
                        icon: "info",
                        title: "잠깐!",
                        input: "password",
                        inputLabel: "답변을 수정하시겠습니까?",
                        inputPlaceholder: "비밀번호를 입력해주세요",
                        inputAttributes: {
                          autocapitalize: "off",
                          autocorrect: "off",
                        },
                        showCancelButton: true,
                        cancelButtonText: "CANCEL",
                        confirmButtonText: "CONFIRM",
                        showLoaderOnConfirm: true,
                        preConfirm: (pwd) => {
                          return fetch(
                            `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                          )
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("false: " + response.status);
                              }

                              const form = new FormData();
                              form.append("rp_idx", data.rp_idx);
                              form.append(
                                "rp_content",
                                rp_content.current.value
                              );

                              return fetch(`http://localhost/api/reply/edit`, {
                                method: "post",
                                body: form,
                              }).then((response) => {
                                if (!response.ok) {
                                  throw new Error("false: " + response.status);
                                }
                                return response.text();
                              });
                            })
                            .catch((error) => {
                              Swal.showValidationMessage(
                                `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                              );
                            });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            icon: "success",
                            title: "Success",
                            html: "정상처리 되었습니다.",
                            showConfirmButton: false,
                            timer: 2000,
                          }).then(() => {
                            localStorage.removeItem("editData");
                            window.opener.location.reload(); // 부모창
                            window.close(); // 창닫기
                          });
                        }
                      });
                    }
                  }}
                >
                  &nbsp;&nbsp;&nbsp;수정하기&nbsp;&nbsp;&nbsp;
                </button>
                &nbsp;&nbsp;
                <button
                  className={"main-btn"}
                  style={{ backgroundColor: "#C6C7C8" }}
                  onClick={() => {
                    Swal.fire({
                      icon: "info",
                      title: "잠깐!",
                      input: "password",
                      inputLabel: "답변을 삭제하시겠습니까?",
                      inputPlaceholder: "비밀번호를 입력해주세요",
                      inputAttributes: {
                        autocapitalize: "off",
                        autocorrect: "off",
                      },
                      showCancelButton: true,
                      cancelButtonText: "CANCEL",
                      confirmButtonText: "CONFIRM",
                      showLoaderOnConfirm: true,
                      preConfirm: (pwd) => {
                        return fetch(
                          `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${userEmail}`
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("false: " + response.status);
                            }
                            let rp_idx = data.rp_idx;
                            return fetch(
                              `http://localhost/api/reply/delete/${rp_idx}`
                            ).then((response) => {
                              if (!response.ok) {
                                throw new Error("false: " + response.status);
                              }
                              return response.text();
                            });
                          })
                          .catch((error) => {
                            Swal.showValidationMessage(
                              `처리 중 문제가 발생했습니다. 비밀번호를 확인해주세요.<br/>반복실패할 경우, 관리자에게 문의 바랍니다.`
                            );
                          });
                      },
                      allowOutsideClick: () => !Swal.isLoading(),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          icon: "success",
                          title: "Success",
                          html: "정상처리 되었습니다.",
                          showConfirmButton: false,
                          timer: 2000,
                        }).then(() => {
                          localStorage.removeItem("editData");
                          window.opener.location.reload(); // 부모창
                          window.close(); // 창닫기
                        });
                      }
                    });
                  }}
                >
                  &nbsp;&nbsp;&nbsp;삭제하기&nbsp;&nbsp;&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EditReply;
