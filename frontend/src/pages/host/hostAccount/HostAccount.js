import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import ListReviews from "./ListReviews";
import SalesChart from "./SalesChart";

import {
  ClipboardData,
  HandThumbsUp,
  PencilSquare,
} from "react-bootstrap-icons";

import Swal from "sweetalert2";

function useFetch(url) {
  const cookies = new Cookies();
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

function HostAccount() {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const userIdx = userInfo.h_idx;
  const navigate = useNavigate();

  const [data, loading] = useFetch(
    `http://localhost/api/host/account/${userIdx}`
  );

  if (loading) {
    return <div>loading</div>;
  } else {
    let url = "";
    let profile_src = "";

    if (data.h_profile !== "-" && data.h_profile !== "") {
      url = `http://localhost/static/images/host/profile/${data.h_profile}`;
      profile_src = `<img src=${url} width="100px" style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img src='http://localhost/static/images/no-image.png' width='30%'/>";
    }

    const handleEditInfo = () => {
      navigate(`/host/edit/${userIdx}`, {
        state: {
          // 페이지 이동 시 전달할 데이터
          h_idx: `${data.h_idx}`,
          h_email: `${data.h_email}`,
          h_name: `${data.h_name}`,
          h_phone: `${data.h_phone}`,
          h_business: `${data.h_business}`,
          h_accountnum: `${data.h_accountnum}`,
          h_level: `${data.h_level}`,
          l_name: `${data.l_name}`,
          h_status: `${data.h_status}`,
          h_regdate: `${data.h_regdate}`,
          h_profile: `${data.h_profile}`,
          h_file: `${data.h_file}`,
          h_bankbook: `${data.h_bankbook}`,
          h_description: `${data.h_description}`,
        },
      });
    };

    return (
      <>
        <div className="container min-vh-100">
          <div className="card-style">
            <h3 className="text-bold">
              <img src="/img/info.png" width="35px" height="35px" />
              &nbsp;회원 정보
            </h3>
            <br />
            <div className="row">
              <form>
                <table className="tbl">
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td
                        className="col"
                        rowSpan={5}
                        style={{
                          boxSizing: "border-box",
                        }}
                      >
                        {data.level === 9 ? (
                          <div
                            className="col"
                            style={{
                              display: "block",
                              position: "sticky",
                            }}
                          >
                            <button
                              className="btnCheck active"
                              style={{ cursor: "none" }}
                              disabled
                            >
                              SUPER
                              <HandThumbsUp size={16} />
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          className="col"
                          style={{
                            display: "block",
                            textAlign: "center",
                            margin: "10% 0 10% 0",
                          }}
                          dangerouslySetInnerHTML={{ __html: profile_src }}
                        ></div>
                      </td>
                      <th>이메일(ID)</th>
                      <td colSpan={3}>&nbsp;&nbsp;{data.h_email}</td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td colSpan={3}>&nbsp;&nbsp;{data.h_name}</td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td colSpan={3}>&nbsp;&nbsp;{data.h_phone}</td>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td colSpan={3}>
                        <div className="row">
                          <div className="col-8">
                            &nbsp;&nbsp;{data.h_status}
                          </div>
                          <div className="col-4" style={{ textAlign: "end" }}>
                            {data.h_status !== "승인완료" ? (
                              data.h_status !== "승인대기" ? (
                                <>
                                  <button
                                    type="button"
                                    className="btnCheck active"
                                    onClick={() => {
                                      if (
                                        data.h_profile !== "-" &&
                                        data.h_file !== "-" &&
                                        data.h_bankbook !== "-"
                                      ) {
                                        levelUp(userIdx, 1);
                                      } else {
                                        levelUp(userIdx, 0);
                                      }
                                    }}
                                  >
                                    Host승인신청
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="btnCheck disabled"
                                  disabled
                                  style={{ cursor: "none" }}
                                >
                                  신청완료
                                </button>
                              )
                            ) : (
                              ""
                            )}
                            &nbsp;&nbsp;
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="main-btn"
                    onClick={() => {
                      Swal.fire({
                        icon: "info",
                        title: "잠깐!",
                        input: "password",
                        inputLabel:
                          "정보 보호를 위해 비밀번호를 다시 한번 확인해주세요.",
                        inputPlaceholder: "비밀번호를 입력해주세요",
                        inputAttributes: {
                          autocapitalize: "off",
                          autocorrect: "off",
                        },
                        confirmButtonText: "CONFIRM",
                        showLoaderOnConfirm: true,
                        preConfirm: (pwd) => {
                          return fetch(
                            `http://localhost/api/host/pwdCheck/${pwd}?userEmail=${data.h_email}`
                          )
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("false: " + response.status);
                              }

                              return response.json();
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
                          handleEditInfo();
                        }
                      });
                    }}
                  >
                    회원정보수정
                  </button>
                  &nbsp;&nbsp;
                </div>
              </form>
            </div>
          </div>
          <div className="container card-style">
            <h3 className="text-bold">
              <ClipboardData size={35} />
              &nbsp;서비스 이용 현황
            </h3>
            <br />
            <SalesChart />
          </div>
          <div className="container card-style mb-50">
            <h3 className="text-bold">
              <PencilSquare size={35} />
              &nbsp;후기 관리
            </h3>
            <br />
            <ListReviews />
          </div>
        </div>
        <br />
        <br />
        <br />
      </>
    );
  }
}

function levelUp(userIdx, opt) {
  if (opt === 1) {
    fetch(`http://localhost/api/host/levelUp/${userIdx}`, {
      method: "get",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("false: " + response.status);
      }
      Swal.fire({
        icon: "success",
        title: "Check",
        html:
          "신청이 완료되었습니다.<br/>마이페이지에서 처리현황을 확인 할 수 있습니다.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "잠깐!",
      html:
        "신청이 거부되었습니다. 첨부파일을 업로드해주세요.<br/>(프로필, 사업자등록증, 통장사본)",
      confirmButtonText: "OK",
    });
  }
}

export default HostAccount;
