import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "react-bootstrap-icons";

import ReviewItem from "./ReviewItem";

function ListReviews() {
  const { userIdx } = useParams();
  const [list, setList] = useState([]);
  const [starList, setAvg] = useState([]);
  const [page, setPaging] = useState("");
  const [count, setCount] = useState("");
  const [pageNum, setPageNum] = useState("1");
  const [opt, setOption] = useState(0);
  const sort = useRef();
  const keyword = useRef();

  function getList(pageNum, opt) {
    let url = "";
    const form = new FormData();
    if (opt === 1) {
      url = `http://localhost/api/reply/search/reviews/${userIdx}`;
      form.append("sort", sort.current.value);
      form.append("keyword", keyword.current.value);
      form.append("pageNum", pageNum);
    } else {
      url = `http://localhost/api/reputation/manage/list/${userIdx}`;
      form.append("pageNum", pageNum);
    }
    fetch(url, { method: "post", body: form })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.list !== null) {
          setList(data.list);
          setAvg(data.avgList);
        }
        setPaging(data.page);
        setCount(data.count);
        setOption(data.option);
      });
  }

  useEffect(() => {
    getList(pageNum, opt);
  }, [pageNum]);

  const setPagination = () => {
    const result = [];
    const begin = page.blockStart;
    const end = page.blockEnd;

    for (let i = begin; i <= end; i++) {
      if (i === page.curPage) {
        result.push(
          <li key={"page-item" + i} className="page-item">
            <a key={i} className="page-link">
              <strong>{i}</strong>
            </a>
          </li>
        );
      } else {
        result.push(
          <li key={"page-item" + i} className="page-item">
            <a
              key={i}
              className="page-link"
              onClick={() => getList(`${i}`, opt)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return result;
  };

  return (
    <>
      <div id="section1" className="input-group mb-3">
        <br />
        <div className="col-6" style={{ float: "rigth" }}></div>
        <div className="col-6 mb-3" style={{ float: "rigth" }}>
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
                    height: "35px",
                    width: "30%",
                    textAlign: "left",
                  }}
                >
                  <option value={"All"}>&nbsp;All</option>
                  <option value={"ho_name"}>&nbsp;구분</option>
                  <option value={"o_idx"}>&nbsp;예약번호</option>
                  <option value={"reply"}>&nbsp;상태</option>
                </select>
              </div>
            </div>
            <input
              id="keyword"
              ref={keyword}
              type="text"
              className="form-control search"
              placeholder="검색어를 입력하세요"
              style={{ height: "35px" }}
            />
            <button
              className="btn main-btn p-0"
              type="button"
              id="btnSearch"
              onClick={() => getList(1, 1)}
              style={{
                height: "35px",
                backgroundColor: "#FEC5BB !important",
                margin: 0,
                padding: "0, 1px 0 1",
              }}
            >
              &nbsp;&nbsp;&nbsp;확인&nbsp;&nbsp;&nbsp;
            </button>
          </form>
        </div>
      </div>
      <table
        id="review"
        className="table table-sm table-hover align-middle text-center"
      >
        <colgroup>
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
          <col width="15%" />
          <col width="20%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr className="align-middle">
            <th scope="col">no.</th>
            <th scope="col">예약번호</th>
            <th scope="col">구분</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">평점</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody
          className="table-group-divider"
          style={{ borderColor: "#F7EFFC" }}
        >
          {count > 0 ? (
            list.map(
              ({
                rownum,
                rv_idx,
                ho_name,
                g_name,
                g_photo,
                g_email,
                rv_date,
                rv_content,
                rv_star,
                o_idx,
                d_idx,
                rp_idx,
              }) => (
                <ReviewItem
                  rownum={rownum}
                  rv_idx={rv_idx}
                  ho_name={ho_name}
                  g_name={g_name}
                  g_photo={g_photo}
                  g_email={g_email}
                  rv_date={rv_date}
                  rv_content={rv_content}
                  rv_star={rv_star}
                  o_idx={o_idx}
                  d_idx={d_idx}
                  rp_idx={rp_idx}
                  key={rv_idx}
                />
              )
            )
          ) : (
            <tr className="align-middle">
              <td colSpan="7">
                <br />
                <p>아직 등록된 후기가 없습니다.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <nav className="page-navibar">
          <ul className="pagination">
            {page.curPage > 1 ? (
              <li className="page-item">
                <a className="page-link">
                  <span aria-hidden="true" onClick={() => getList("1", opt)}>
                    <ChevronDoubleLeft />
                  </span>
                </a>
              </li>
            ) : null}
            {page.curBlock > 1 ? (
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span
                    aria-hidden="true"
                    onclick={() => getList(`${page.prevPage}`, opt)}
                  >
                    <ChevronLeft />
                  </span>
                </a>
              </li>
            ) : null}

            {setPagination()}

            {page.curBlock < page.totBlock ? (
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span
                    aria-hidden="true"
                    onClick={() => getList(`${page.nextPage}`, opt)}
                  >
                    <ChevronRight />
                  </span>
                </a>
              </li>
            ) : null}
            {page.curPage < page.totPage ? (
              <li className="page-item">
                <a className="page-link" aria-label="End">
                  <span onClick={() => getList(`${page.totPage}`, opt)}>
                    <ChevronDoubleRight />
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ListReviews;
