import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function RequestItem({
  o_idx,
  g_idx,
  ho_idx,
  ho_name,
  d_idx,
  d_room_type,
  o_ckin,
  o_ckout,
  ru_startDate,
  ru_endDate,
  o_adult,
  o_child,
  o_baby,
  ru_adult,
  ru_child,
  ru_baby,
  bfsum,
  sum,
  g_email,
  g_name,
  g_photo,
}) {
  let loading = false;
  const cookies = new Cookies();
  const { userIdx } = useParams();
  const userInfo = cookies.get("userInfo");
  const userEmail = userInfo.h_email;

  if (loading) {
    return <div>로딩 중...</div>;
  } else {
    let profile_src = "";
    if (g_photo !== "-") {
      const img_url = `http://localhost/static/images/guest/photo/${g_photo}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{background-size:"contain" }} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }
    return (
      <div
        className="container m-0 p-0"
        style={{ width: "890px", height: "260px" }}
      >
        <table className="tbl" style={{ margin: "0" }}>
          <colgroup>
            <col width={"20%"} />
            <col width={"40%"} />
            <col width={"40%"} />
          </colgroup>
          <tbody>
            <tr>
              <th>고객정보</th>
              <td colSpan={2}>
                <div
                  className="row m-0"
                  style={{
                    paddingRight: "3%",
                  }}
                >
                  <div
                    className="col-3  my-auto"
                    style={{
                      width: "80px",
                      display: "inline",
                      float: "left",
                    }}
                    dangerouslySetInnerHTML={{ __html: profile_src }}
                  ></div>
                  <div
                    className="col mx-auto"
                    style={{
                      height: "60px",
                      padding: "1% 0 1% 0",
                      display: "inline",
                    }}
                  >
                    이름&nbsp;:&nbsp;&nbsp;{g_name}
                    <br />
                    이메일&nbsp;:&nbsp;&nbsp;{g_email}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    className="btn-group col-3 mx-auto"
                    role="group"
                    style={{
                      textAlign: "right",
                      height: "60px",
                      padding: "2% 0 2% 0",
                      display: "inline-block",
                    }}
                  >
                    <button
                      className="btn btnCheck active"
                      style={{
                        borderTopLeftRadius: "30px",
                        borderBottomLeftRadius: "30px",
                      }}
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: "Check",
                          input: "password",
                          inputLabel: "변경된 내용으로 예약을 확정할까요?",
                          inputPlaceholder: "비밀번호를 입력해주세요.",
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
                                form.append("oidx", o_idx);
                                form.append("ho_idx", ho_idx);
                                form.append("d_idx", d_idx);
                                form.append("d_room_type", d_room_type);
                                form.append("ckin", ru_startDate);
                                form.append("ckout", ru_endDate);
                                form.append("adult", ru_adult);
                                form.append("child", ru_child);
                                form.append("baby", ru_baby);
                                form.append("hidx", userIdx);

                                return fetch(
                                  `http://localhost/api/order/manage/modify/${o_idx}`,
                                  {
                                    method: "post",
                                    body: form,
                                  }
                                ).then((response) => {
                                  if (!response.ok) {
                                    throw new Error(response.status);
                                  }
                                  return response.json();
                                });
                              })
                              .catch((error) => {
                                Swal.showValidationMessage(
                                  `error : 비밀번호를 확인해주세요.<br/>반복실패 시, 관리자에게 문의 바랍니다.`
                                );
                              });
                          },
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            let status = JSON.stringify(
                              Object.values(result)[3].response.statusCodeValue
                            );
                            if (status == 200) {
                              Swal.fire({
                                icon: "success",
                                title: "Confirm",
                                html: "예약 바우처 발송이 완료되었습니다.",
                                showConfirmButton: false,
                                timer: 2000,
                              }).then(() => {
                                window.location.reload();
                              });
                            } else {
                              Swal.fire({
                                icon: "error",
                                title: "Not possible",
                                html: `예약을 변경할 수 없습니다.<br/>${ho_name}의 예약목록을 확인해주세요.<br/>반복실패 시, 관리자에게 문의 바랍니다.`,
                                showConfirmButton: true,
                              }).then(() => {
                                window.location.reload();
                              });
                            }
                          }
                        });
                      }}
                    >
                      승인
                    </button>
                    <button
                      className="btn btnCheck active"
                      style={{
                        borderTopRightRadius: "30px",
                        borderBottomRightRadius: "30px",
                        backgroundColor: "#8c7e9e",
                        color: "#ffffff",
                      }}
                      onClick={() => {
                        Swal.fire({
                          icon: "question",
                          title: "Check",
                          input: "password",
                          inputLabel:
                            "게스트의 예약변경 요청을 거절하시겠습니까?",
                          inputPlaceholder: "비밀번호를 입력해주세요.",
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
                                return fetch(
                                  `http://localhost/api/order/manage/reject/${o_idx}`
                                ).then((response) => {
                                  if (!response.ok) {
                                    throw new Error(response.status);
                                  }
                                  return response.text();
                                });
                              })
                              .catch((error) => {
                                Swal.showValidationMessage(
                                  `error : 비밀번호를 확인해주세요.<br/>반복실패 시, 관리자에게 문의 바랍니다.`
                                );
                              });
                          },
                          allowOutsideClick: () => !Swal.isLoading(),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              icon: "success",
                              title: "Complete",
                              html:
                                "기존 예약으로 자동확정 되었습니다.<br/>(예약 바우처 발송완료)",
                              showConfirmButton: false,
                              timer: 2000,
                            }).then(() => {
                              window.location.reload();
                            });
                          }
                        });
                      }}
                    >
                      거부
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowSpan={3}>
                예약정보 <br />
              </th>
              <td>예약번호 :&nbsp;&nbsp;{o_idx}</td>
              <td>
                {ho_name}&nbsp;&nbsp;|&nbsp;&nbsp;{d_room_type}
              </td>
            </tr>
            <tr>
              <th>기존 예약</th>
              <th style={{ color: "crimson" }}>변경 요청</th>
            </tr>
            <tr>
              <td>
                {o_ckin} ~ {o_ckout}
                <br />총 <b>{bfsum}</b>인 : 성인({o_adult}) , 어린이(
                {o_child}), 유아(
                {o_baby})
              </td>
              <td>
                {ru_startDate} ~ {ru_endDate}
                <br />총 <b>{sum}</b>인 : 성인({ru_adult}) , 어린이(
                {ru_child}), 유아(
                {ru_baby})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RequestItem;
