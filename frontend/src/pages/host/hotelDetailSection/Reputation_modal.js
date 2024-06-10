import React, { useEffect, useRef, useState } from "react";
import { ChatLeftQuote, Search } from "react-bootstrap-icons";

import ReputationItem from "./ReputationItem";

function TotalReputation({ list, avg, HoIdx, focused }) {
  const [review, setList] = useState(list);
  const sort = useRef();
  const keyword = useRef();

  function getList() {
    const url = "http://localhost/api/reputation/review/search";
    const form = new FormData();
    form.append("sort", sort.current.value);
    form.append("keyword", keyword.current.value);
    form.append("ho_idx", HoIdx);
    fetch(url, { method: "post", body: form })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data.list);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="modal_container" style={{ paddingTop: "15px" }}>
        <h3 className="text-bold">
          <ChatLeftQuote size={35} />
          &nbsp;REVIEW
        </h3>
        <br />
        <hr />
        <br />
        <div id="section1" className="input-group row mb-3">
          <br />
          <div
            className="col-4"
            style={{ boxSizing: "border-box", marginTop: "12px" }}
          >
            <h3>
              ⭐&nbsp;{avg} | {review.length}개
            </h3>
          </div>
          <div className="col-8">
            <form
              className="d-flex input-group"
              id="form1"
              name="form1"
              method="post"
            >
              <div className="col-3">
                <div className="input-group d-flex">
                  <select
                    className="form-select form-select opt"
                    ref={sort}
                    style={{
                      size: "3",
                      borderRadius: "30px 0 0 30px",
                      height: "48.33px",
                    }}
                  >
                    <option defaultValue="latest" selected>
                      &nbsp;최신순
                    </option>
                    <option value="highest">&nbsp;높은평점순&nbsp;</option>
                    <option value="lowest">&nbsp;낮은평점순&nbsp;</option>
                  </select>
                </div>
              </div>
              <input
                id="keyword"
                ref={keyword}
                type="text"
                className="form-control search"
                placeholder="검색어를 입력하세요"
              />
              <button
                className="btn main-btn"
                type="button"
                id="btnSearch"
                onClick={() => getList()}
                style={{ backgroundColor: "#FEC5BB !important" }}
              >
                <Search size="16px" />
              </button>
            </form>
          </div>
        </div>

        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateRows: "1fr",
          }}
        >
          {review.map(
            ({
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
                opt={2}
                rv_idx={rv_idx}
                g_name={g_name}
                g_photo={g_photo}
                l_name={l_name}
                g_email={g_email}
                rv_content={rv_content}
                rv_date={rv_date}
                rv_star={rv_star}
                rp_idx={rp_idx}
                focused={focused}
                key={rv_idx}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
export default TotalReputation;
