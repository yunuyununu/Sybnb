import React from "react";

function Reply({ rp_idx, h_name, h_profile, rp_writer, rp_content, rp_date }) {
  let loading = false;
  const img_url = `http://localhost/static/images/guest/profile/${h_profile}`;

  if (loading) {
    return <div>loading...</div>;
  } else {
    let profile_src = "";
    if (h_profile !== "-") {
      profile_src = `<img class='profile-img' src=${img_url} width='40px' height='40px' style={{backgroundSize:"contain";}} />`;
    } else {
      profile_src =
        "<img class='profile-img' src='http://localhost/static/images/no-image.png' width='30px' height='30px'/>";
    }

    return (
      <table id="reply" className="tbl">
        <colgroup>
          <col style={{ width: "25%" }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <div style={{ textAlign: "left", float: "left" }}>
                <span dangerouslySetInnerHTML={{ __html: profile_src }}></span>
                <span>&nbsp;&nbsp;{h_name}</span>
                <input type="hidden" defaultValue={rp_idx} />
                <input type="hidden" defaultValue={rp_writer} />
              </div>
            </th>
            <td>
              <div
                className="row"
                style={{
                  width: "600px",
                  wordBreak: "break-all",
                  whiteSpace: "pre-line",
                  textAlign: "left",
                  padding: "0 2% 0 2%",
                }}
              >
                <span style={{ fontWeight: "normal" }}>[ {rp_date} ]</span>
                <br />
                <br />
                <span style={{ fontWeight: "normal" }}>{rp_content}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Reply;
