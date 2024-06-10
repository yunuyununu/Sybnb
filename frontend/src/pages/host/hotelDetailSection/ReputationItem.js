import React, { useEffect, useState, useRef } from "react";

import { Send, SendFill } from "react-bootstrap-icons";

import Reply from "../../../component/Reply";

function ReputationItem({
  opt,
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
  setTotalReputation,
  setFocus,
  focused,
}) {
  const [reply, setReply] = useState(null);
  const [isCollapsed, setCollapsed] = useState(true); // 접힌상태
  const target = useRef();
  let loading = false;
  const Collapsible = () => {
    if (!isCollapsed && reply !== null) {
      return (
        <>
          <Reply
            rp_idx={reply.rp_idx}
            h_name={reply.h_name}
            h_profile={reply.h_profile}
            rp_content={reply.rp_content}
            rp_date={reply.rp_date}
            key={reply.rp_idx}
          />
        </>
      );
    } else {
      return null;
    }
  };

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
      });
  }

  useEffect(() => {
    getReply(`http://localhost/api/reputation/reply/${rp_idx}`);
  }, []);

  useEffect(() => {
    if (focused != null && rv_idx === focused) {
      let target = document.querySelector(".rv" + focused);
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [focused]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (g_photo !== "-") {
      const img_url = `http://localhost/static/images/guest/photo/${g_photo}`;
      profile_src = `<img class='profile-img' src=${img_url} width='60px' height='60px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='50px' height='50px'/>";
    }

    if (opt === 1 && rownum < 7) {
      // 호텔 상세에서 call
      if (rv_content.length > 20) {
        let arr = "";
        rv_content = arr.concat(rv_content.substring(0, 20) + "...");
      }
      return (
        <div>
          <div className="card-style" style={{ maxHeight: "210px" }}>
            <div className="row mb-20">
              <div className="col-3">
                <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
              </div>
              <div className="col-9" style={{ paddingLeft: "5%" }}>
                <strong>{g_name} </strong>
                <input type="hidden" defaultValue={rv_idx} />
                <input type="hidden" defaultValue={g_email} />
                <br />
                {l_name}
              </div>
            </div>
            <div className="row">
              <span style={{ display: "inline" }}>
                {rendering(rv_star)} {rv_star}&nbsp;&nbsp;|&nbsp;&nbsp;
                {rv_date}
              </span>{" "}
            </div>
            <div className="row text-ellipsis" style={{ padding: "4%" }}>
              {rv_content}&nbsp;
              {rv_content.length > 20 ? (
                <sapn
                  onClick={() => {
                    setFocus(rv_idx);
                    setTotalReputation(true);
                  }}
                >
                  <b>더보기</b>
                </sapn>
              ) : (
                <br />
              )}
            </div>
          </div>
          <br />
          &nbsp;
        </div>
      );
    } else if (opt === 2) {
      // 모달창에서 call
      return (
        <div>
          <div
            className={"card-style rv" + rv_idx}
            style={{ textAlign: "left" }}
            ref={target}
          >
            <div className="row mb-20" style={{ display: "flow" }}>
              <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
              {g_name}
              <input type="hidden" defaultValue={rv_idx} />
              <input type="hidden" defaultValue={g_email} />
              &nbsp;({l_name})
            </div>
            <div
              className="row mb-20"
              style={{ textAlign: "left", fontWeight: "normal" }}
            >
              <span style={{ display: "inline" }}>
                <b>
                  {rendering(rv_star)} {rv_star}
                </b>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                {rv_date}
              </span>
            </div>
            <div
              className="row"
              style={{
                width: "900px",
                wordBreak: "break-all",
                whiteSpace: "pre-line",
                textAlign: "left",
                padding: "0 1.5% 0 1.5%",
                fontWeight: "normal",
              }}
            >
              {rv_content}
            </div>
            <div
              weidth="120px"
              style={{
                marginTop: "20px",
                textAlign: "right",
                alignSelf: "right",
              }}
            >
              {rp_idx !== 0 ? (
                <button
                  className="btnCheck active"
                  weidth="120px"
                  onClick={() => {
                    setCollapsed(!isCollapsed);
                  }}
                >
                  {isCollapsed ? <Send size={16} /> : <SendFill size={16} />}
                  {isCollapsed ? "답글 펼치기" : "답글 접기"}
                </button>
              ) : null}
            </div>
            <div className="container m-0 p-0">
              {!isCollapsed && <Collapsible />}
            </div>
          </div>
          <br />
          <br />
        </div>
      );
    }
  }
}

export default ReputationItem;
