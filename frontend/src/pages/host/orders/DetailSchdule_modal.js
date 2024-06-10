import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Calendar2Check } from "react-bootstrap-icons";
import "moment/locale/ko";

import OrderItem from "./OrderItem";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          setData(data);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function DetailSchedule({ date }) {
  const { userIdx } = useParams();
  const [ckinData, loading1] = useFetch(
    `http://localhost/api/order/manage/schedule/detail/${userIdx}?column=o_ckin&date=${date}`
  );
  const [ckoutData, loading2] = useFetch(
    `http://localhost/api/order/manage/schedule/detail/${userIdx}?column=o_ckout&date=${date}`
  );
  const [index, setIndex] = useState("");

  if (loading1 || loading2) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div className="modal_container" style={{ paddingTop: "15px" }}>
          <h3 className="text-bold mb-30">
            <Calendar2Check size={35} />
            &nbsp;RESERVATION
          </h3>
          <hr />
          <div
            className="card-style mb-4"
            style={{ height: "340px", maxHeight: "340px" }}
          >
            <div className="row mb-3" style={{ textAlign: "left" }}>
              <h4>Check-in</h4>
            </div>
            <table
              id="review"
              className="table table-sm table-hover align-middle text-center"
            >
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="25%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr className="align-middle">
                  <th scope="col">no.</th>
                  <th scope="col" style={{ backgroundColor: "#f7effc" }}>
                    예약번호
                  </th>
                  <th scope="col">구분</th>
                  <th scope="col">객실유형</th>
                  <th scope="col">체크인/체크아웃</th>
                  <th scope="col">고객명</th>
                  <th scope="col">예약일</th>
                  <th scope="col">상태</th>
                </tr>
              </thead>
              <tbody
                className="table-group-divider"
                style={{
                  borderColor: "#F7EFFC",
                  overflowY: "auto",
                }}
              >
                {ckinData.length > 0 ? (
                  ckinData.map(
                    ({
                      rownum,
                      o_idx,
                      g_idx,
                      ho_name,
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
                      g_name,
                      g_phone,
                    }) => (
                      <OrderItem
                        event={"detail"}
                        rownum={rownum}
                        o_idx={o_idx}
                        g_idx={g_idx}
                        ho_name={ho_name}
                        d_room_type={d_room_type}
                        o_ckin={o_ckin}
                        o_ckout={o_ckout}
                        o_adult={o_adult}
                        o_child={o_child}
                        o_baby={o_baby}
                        sum={sum}
                        o_state={o_state}
                        status={status}
                        o_payment={o_payment}
                        o_price={o_price}
                        discount={discount}
                        o_finalprice={o_finalprice}
                        o_orderdate={o_orderdate}
                        g_name={g_name}
                        g_phone={g_phone}
                        index={index}
                        setIndex={setIndex}
                        key={o_idx}
                      />
                    )
                  )
                ) : (
                  <tr
                    className="align-middle  detail-row"
                    style={{
                      borderColor: "#F7EFFC",
                    }}
                  >
                    <td colSpan="8">
                      <br />
                      <p>조회된 내역이 없습니다.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="card-style mb-3"
            style={{ height: "340px", maxHeight: "340px" }}
          >
            <div className="row mb-3" style={{ textAlign: "left" }}>
              <h4>Check-out</h4>
            </div>
            <table
              id="review"
              className="table table-sm table-hover align-middle text-center"
            >
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="25%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr className="align-middle">
                  <th scope="col">no.</th>
                  <th scope="col" style={{ backgroundColor: "#f7effc" }}>
                    예약번호
                  </th>
                  <th scope="col">구분</th>
                  <th scope="col">객실유형</th>
                  <th scope="col">체크인/체크아웃</th>
                  <th scope="col">고객명</th>
                  <th scope="col">예약일</th>
                  <th scope="col">상태</th>
                </tr>
              </thead>
              <tbody
                className="table-group-divider"
                style={{
                  borderColor: "#F7EFFC",
                  overflowY: "auto",
                }}
              >
                {ckoutData.length > 0 ? (
                  ckoutData.map(
                    ({
                      rownum,
                      o_idx,
                      g_idx,
                      ho_name,
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
                      g_name,
                      g_phone,
                    }) => (
                      <OrderItem
                        event={"detail"}
                        rownum={rownum}
                        o_idx={o_idx}
                        g_idx={g_idx}
                        ho_name={ho_name}
                        d_room_type={d_room_type}
                        o_ckin={o_ckin}
                        o_ckout={o_ckout}
                        o_adult={o_adult}
                        o_child={o_child}
                        o_baby={o_baby}
                        sum={sum}
                        o_state={o_state}
                        status={status}
                        o_payment={o_payment}
                        o_price={o_price}
                        discount={discount}
                        o_finalprice={o_finalprice}
                        o_orderdate={o_orderdate}
                        g_name={g_name}
                        g_phone={g_phone}
                        index={index}
                        setIndex={setIndex}
                        key={o_idx}
                      />
                    )
                  )
                ) : (
                  <tr
                    className="align-middle  detail-row"
                    style={{
                      borderColor: "#F7EFFC",
                    }}
                  >
                    <td colSpan="8">
                      <br />
                      <p>조회된 내역이 없습니다.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default DetailSchedule;
