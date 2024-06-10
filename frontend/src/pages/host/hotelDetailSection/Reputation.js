import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import ReputationItem from "./ReputationItem";
import { StarFill } from "react-bootstrap-icons";
import TotalReputation from "./Reputation_modal";

function Reputation() {
  const { HoIdx } = useParams();
  const [list, setReviews] = useState([]);
  const [totReputation, setTotalReputation] = useState(false);
  const [avg, setAvg] = useState("");
  const [focused, setFocus] = useState(null);

  function getReviews(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.list != null) setReviews(data.list);
        if (data.avg != null) setAvg(data.avg);
      });
  }

  function Modal(props) {
    function closeModal() {
      props.closeModal();
    }

    return (
      <div className="modal_h z-8" onClick={closeModal}>
        <div
          className="modalBody_h z-9"
          style={{ width: "1000px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="btnClose" onClick={closeModal}>
            X
          </button>
          {props.children}
        </div>
      </div>
    );
  }

  useEffect(() => {
    getReviews(`http://localhost/api/reputation/list/${HoIdx}`);
  }, []);

  if (avg == null) {
    return (
      <>
        <div className="container mb-30">
          <h2>후기 미등록</h2>
          <p>아직 등록된 후기가 없습니다.</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="col mb-30">
          <div className="row" style={{ position: "relative", zIndex: "0" }}>
            <span style={{ marginBottom: "2%" }}>
              <strong>
                <StarFill /> {avg} | 후기 {list.length}개
              </strong>
            </span>
          </div>
          <div
            className="row"
            style={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr 1fr",
              position: "relative",
              zIndex: "0",
            }}
          >
            {list.map(
              ({
                rownum,
                rv_idx,
                g_name,
                g_photo,
                l_name,
                g_email,
                rv_content,
                rv_date,
                rv_star,
                rp_idx,
              }) => (
                <ReputationItem
                  opt={1}
                  rownum={rownum}
                  rv_idx={rv_idx}
                  g_name={g_name}
                  g_photo={g_photo}
                  l_name={l_name}
                  g_email={g_email}
                  rv_content={rv_content}
                  rv_date={rv_date}
                  rv_star={rv_star}
                  rp_idx={rp_idx}
                  setTotalReputation={setTotalReputation}
                  setFocus={setFocus}
                  key={rv_idx}
                />
              )
            )}
          </div>
          <div>
            {totReputation && (
              <Modal
                className="z-9"
                closeModal={() => {
                  setTotalReputation(!totReputation);
                }}
              >
                <TotalReputation
                  list={list}
                  avg={avg}
                  HoIdx={HoIdx}
                  focused={focused}
                />
              </Modal>
            )}
            <button
              className="main-btnn"
              style={{
                visibility: list.length >= 6 ? "visible" : "",
                display: list.length >= 6 ? "" : "none",
                height: "45px",
              }}
              onClick={() => {
                setFocus(null);
                setTotalReputation(!totReputation);
              }}
            >
              후기 모두보기
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Reputation;
