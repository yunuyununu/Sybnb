import React, { useState } from "react";
import { useParams } from "react-router";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/ko";

function OrderItem({
  event,
  rownum,
  o_idx,
  g_idx,
  ho_idx,
  ho_name,
  d_idx,
  d_room_type,
  o_ckin,
  o_ckout,
  o_adult,
  o_child,
  o_baby,
  sum,
  o_state,
  status,
  o_payment,
  o_price,
  discount,
  o_finalprice,
  o_orderdate,
  g_email,
  g_name,
  g_phone,
  handleModal,
  setIndex,
  index,
}) {
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");
  const { userIdx } = useParams();
  const userEmail = userInfo.h_email;
  const userName = userInfo.h_name;
  const [isCollapsed, setCollapsed] = useState(true); // 접힌상태

  // 쿠키 정보 업데이트
  const handleCookie = (data) => {
    let expiration = new Date();
    const cookies = new Cookies();
    expiration.setDate(expiration.getDate() + 1);
    cookies.set("userInfo", data, {
      path: "/",
      expires: expiration,
    });
  };

  const Collapsible = ({ idx }) => {
    if (index === idx) {
      return (
        <>
          <tr className="align-middle detail-row">
            <td colSpan="4">
              <b>연락처</b>&nbsp;&nbsp;:&nbsp;&nbsp;{g_phone}
              &nbsp;&nbsp;|&nbsp;&nbsp;총 {sum}명
            </td>
            <td colSpan="4">
              <b>결제금액</b>&nbsp;&nbsp;:&nbsp;&nbsp;({o_price}\ x 1박,
              수수료별도) - ({discount}\ 할인적용)&nbsp;&nbsp;
              <br />
              =&nbsp;&nbsp;총 {o_finalprice}\
            </td>
          </tr>
        </>
      );
    } else {
      return null;
    }
  };

  const dataset = {
    // 전달할 데이터
    o_idx: `${o_idx}`,
    g_idx: `${g_idx}`,
    ho_idx: `${ho_idx}`,
    ho_name: `${ho_name}`,
    d_idx: `${d_idx}`,
    d_room_type: `${d_room_type}`,
    o_ckin: `${o_ckin}`,
    o_ckout: `${o_ckout}`,
    o_adult: `${o_adult}`,
    o_child: `${o_child}`,
    o_baby: `${o_baby}`,
    sum: `${sum}`,
    o_state: `${o_state}`,
    status: `${status}`,
    o_payment: `${o_payment}`,
    o_price: `${o_price}`,
    discount: `${discount}`,
    o_finalprice: `${o_finalprice}`,
    o_orderdate: `${o_orderdate}`,
  };

  function handleDateCheck(ckin) {
    const today = moment().format("YYYY-MM-DD");
    if (ckin <= today) {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeState = () => {
    switch (o_state) {
      case 1:
        Swal.fire({
          icon: "question",
          title: "Check",
          input: "password",
          inputLabel: "예약을 확정할까요?",
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
                return fetch(
                  `http://localhost/api/order/manage/update/${o_idx}`
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
              title: "Confirm",
              html: "예약 바우처 발송이 완료되었습니다.",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              window.location.reload();
            });
          }
        });
        break;
      case 3:
        if (handleDateCheck(o_ckin)) {
          Swal.fire({
            icon: "question",
            title: "Check",
            input: "password",
            inputLabel: "투숙객 확인이 완료되었나요? 체크인완료로 설정합니다.",
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
                  form.append("opt", 1); // 체크인확정 & 게스트레벨업
                  form.append("oidx", o_idx);
                  form.append("hidx", userIdx);
                  form.append("idx", g_idx);

                  return fetch(
                    `http://localhost/api/order/manage/confirm/${o_idx}`,
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
              handleCookie({
                h_idx: userIdx,
                h_email: userEmail,
                h_name: userName,
                h_level: parseInt(result.value[9]),
              });
              Swal.fire({
                icon: "success",
                title: "Complete",
                html: "정상처리 되었습니다.",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                window.location.reload();
              });
            }
          });
        } else {
          return null;
        }
        break;
      default:
        return null;
    }
  };

  if (event == "order") {
    return (
      <tr
        className="align-middle"
        onClick={() => {
          localStorage.setItem("dataset", JSON.stringify(dataset));
          handleModal(o_idx, "order");
        }}
      >
        <td>{rownum}</td>
        <td>{o_idx}</td>
        <td>{d_room_type}</td>
        <td>{o_ckin}</td>
        <td>{o_ckout}</td>
        <td>{o_finalprice}</td>
        <td>{o_orderdate}</td>
        {o_state === 1 ? (
          <th style={{ color: "crimson" }}>{status}</th>
        ) : (
          <th>{status}</th>
        )}
      </tr>
    );
  } else {
    let ckin = moment(o_ckin).format("YY-MM-DD");
    let ckout = moment(o_ckout).format("YY-MM-DD");
    let orderdate = moment(o_orderdate).format("YY-MM-DD");
    return (
      <>
        <tr className="align-middle detail-row">
          <td>{rownum}</td>
          <td
            style={{ cursor: "pointer", backgroundColor: "#f7effc" }}
            onClick={() => {
              setIndex(o_idx);
              isCollapsed ? setCollapsed(false) : setCollapsed(true);
            }}
            title={isCollapsed ? "더보기" : null}
          >
            {o_idx}
          </td>
          <td>{ho_name}</td>
          <td>{d_room_type}</td>
          <td>
            {ckin} / {ckout}
          </td>
          <td>{g_name}</td>
          <td>{orderdate}</td>
          {o_state === 1 ? (
            <th
              id="status"
              style={{ color: "crimson", cursor: "pointer" }}
              onClick={() => handleChangeState()}
            >
              {status}
            </th>
          ) : (
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleChangeState()}
            >
              {status}
            </th>
          )}
        </tr>
        {isCollapsed == false && <Collapsible idx={o_idx} />}
      </>
    );
  }
}
export default OrderItem;
