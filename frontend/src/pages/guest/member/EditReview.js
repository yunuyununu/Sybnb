import React, { useRef, useState, useEffect } from "react";
import { ChatLeftQuote } from "react-bootstrap-icons";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import StarRate from "../../../component/StarRate";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

const EditReview = () => {
  const info = JSON.parse(localStorage.getItem("info"));
  const [data, loading] = useFetch(
    `http://localhost/api/review/detail/${info.rv_idx}`
  );

  const cookies = new Cookies();
  const g_name = cookies.get("g_name");
  const g_email = cookies.get("g_email");
  const g_photo = cookies.get("g_photo");
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
    let rate = data.rv_star;
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
              &nbsp;후기수정
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
                      {g_name.key} 님께서 {data.ho_name} 에 대해 작성하신
                      리뷰입니다.
                      <br />
                      수정을 원하시면 [수정하기]를 눌러주세요.
                      <input
                        type="hidden"
                        defaultValue={info.rv_idx}
                        readOnly
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
                  <b>예약번호</b> :&nbsp;&nbsp;{data.o_idx}
                  <br />
                  <b>이용기간</b> :&nbsp;&nbsp;{data.o_ckin} ~ {data.o_ckout}
                  <br />
                </div>
              </div>
              <div className="card-style col-12 mb-30">
                <div
                  className="col-12 mb-3"
                  style={{ float: "left", display: "inline" }}
                >
                  <b>⭐평점</b>&nbsp;:&nbsp;&nbsp;{rate}
                  &nbsp;&nbsp;|&nbsp;&nbsp;<b>변경</b>&nbsp;:&nbsp;&nbsp;
                  <StarRate rate={rate} handleStarRating={handleStarRating} />
                </div>

                <textarea
                  className="form-control mb-3"
                  rows={5}
                  cols={85}
                  defaultValue={data.rv_content}
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
                    } else {
                      Swal.fire({
                        icon: "info",
                        title: "잠깐!",
                        input: "password",
                        inputLabel: "후기를 수정하시겠습니까?",
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
                            `http://localhost/guest/info/confirmPwd?pwd=${pwd}&g_email=${g_email.key}`
                          )
                            .then((response) => response.json())
                            .then((response) => {
                              if (response.result !== "success") {
                                throw new Error("false: " + response.result);
                              }

                              const form = new FormData();
                              form.append("rv_idx", data.rv_idx);
                              form.append(
                                "rv_content",
                                rv_content.current.value
                              );
                              star == null
                                ? form.append("rv_star", rate)
                                : form.append("rv_star", star);
                              return fetch(
                                `http://localhost/api/review/edit/${info.rv_idx}`,
                                {
                                  method: "post",
                                  body: form,
                                }
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
                            localStorage.removeItem("info");
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
                      inputLabel: "작성하신 후기를 삭제하시겠습니까?",
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
                          `http://localhost/guest/info/confirmPwd?pwd=${pwd}&g_email=${g_email.key}`
                        )
                          .then((response) => response.json())
                          .then((response) => {
                            if (response.result !== "success") {
                              throw new Error("false: " + response.result);
                            }
                            return fetch(
                              `http://localhost/api/review/delete/${info.rv_idx}`
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
                          localStorage.removeItem("info");
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

export default EditReview;
