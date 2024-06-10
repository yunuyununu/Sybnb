import React, { useRef } from "react";

function ReviewItem({
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
}) {
  let loading = false;
  const guest_email = useRef();
  const review_idx = useRef();
  const reply_idx = useRef();
  const rendering = (i) => {
    const star = "⭐";
    const result = [];
    for (let j = 0; j < i; j++) {
      result.push(<span key={j}>{star}</span>);
    }
    return result;
  };

  const reviewData = {
    // 전달할 데이터
    rv_idx: `${rv_idx}`,
    ho_name: `${ho_name}`,
    g_name: `${g_name}`,
    g_photo: `${g_photo}`,
    g_email: `${g_email}`,
    rv_date: `${rv_date}`,
    rv_content: `${rv_content}`,
    rv_star: `${rv_star}`,
    o_idx: `${o_idx}`,
    d_idx: `${d_idx}`,
  };

  const editData = {
    // 전달할 데이터
    rp_idx: `${rp_idx}`,
    rv_idx: `${rv_idx}`,
    ho_name: `${ho_name}`,
    g_name: `${g_name}`,
    g_photo: `${g_photo}`,
    g_email: `${g_email}`,
    rv_date: `${rv_date}`,
    rv_content: `${rv_content}`,
    rv_star: `${rv_star}`,
    o_idx: `${o_idx}`,
    d_idx: `${d_idx}`,
  };

  const openPopup = (opt) => {
    let popup = null;
    if (opt === "write") {
      popup = window.open(
        `../../../host/account/manage/review`,
        "name(Write)",
        "width=500,height=780,left=300,top=100,toolbar=no,scrollbars=no,resizable=yes"
      );
    } else {
      popup = window.open(
        `../../../host/account/manage/reply`,
        "name(Edit)",
        "width=500,height=780,left=300,top=100,toolbar=no,scrollbars=no,resizable=yes"
      );
    }
    return popup;
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <tr className="align-middle">
          <th>{rownum}</th>
          <td>
            {o_idx}
            <input type="hidden" defaultValue={rv_idx} ref={review_idx} />
          </td>
          <td>{ho_name}</td>
          <td>
            {g_name}
            <input type="hidden" defaultValue={g_email} ref={guest_email} />
          </td>
          <td>{rv_date}</td>
          <td>{rendering(rv_star)}</td>
          <td>
            <input type="hidden" defaultValue={rp_idx} ref={reply_idx} />
            {rp_idx == 0 ? (
              <button
                className="btnCheck active"
                onClick={() => {
                  localStorage.setItem(
                    "reviewData",
                    JSON.stringify(reviewData)
                  );
                  openPopup("write");
                }}
              >
                &nbsp;&nbsp;미등록&nbsp;&nbsp;
              </button>
            ) : (
              <button
                className="btnCheck disabled"
                onClick={() => {
                  localStorage.setItem("editData", JSON.stringify(editData));
                  openPopup("edit");
                }}
              >
                등록완료
              </button>
            )}
          </td>
        </tr>
      </>
    );
  }
}
export default ReviewItem;
