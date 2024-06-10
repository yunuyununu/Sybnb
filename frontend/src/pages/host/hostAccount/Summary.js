import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StarFill } from "react-bootstrap-icons";

function StarItem({ ho_name, avg }) {
  return (
    <div>
      <span>
        <h4 style={{ textAlign: "left" }}>{ho_name}</h4>
      </span>
      <span>
        <h3 style={{ textAlign: "right" }}>
          <StarFill color="#FCD53F" style={{ margin: "0 1px 2% 0" }} />
          &nbsp;
          {avg}
        </h3>
      </span>
    </div>
  );
}

function Summary() {
  const { userIdx } = useParams();
  const [totReviews, setTotalCount] = useState("");
  const [noReply, setReplyCount] = useState("");
  const [stars, setAvgStars] = useState([]);
  const [pendings, setPendingCount] = useState("");

  function getData(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalCount(data.totReviews);
        setReplyCount(data.noReply);
        setAvgStars(data.stars);
        setPendingCount(data.pendings);
      });
  }

  useEffect(() => {
    getData(`http://localhost/api/chart/summary/${userIdx}`);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slick = useRef(null);
  return (
    <>
      <div
        id="StarSlider"
        className="card-style mb-3"
        style={{ height: "120px" }}
      >
        {stars.length > 0 ? (
          <Slider {...settings} ref={slick}>
            {stars.map((item, ho_idx) => (
              <StarItem key={ho_idx} ho_name={item.ho_name} avg={item.avg} />
            ))}
          </Slider>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h4 style={{ textAlign: "left", marginBottom: "6%" }}>
              조회된 내역이 없습니다
            </h4>
            <span>
              <h3 style={{ textAlign: "right" }}>
                <StarFill size={24} /> -
              </h3>
            </span>
          </div>
        )}
      </div>
      <div className="card-style mb-3" style={{ height: "120px" }}>
        <span>
          <h4 style={{ textAlign: "left", marginBottom: "6%" }}>예약대기</h4>
        </span>
        <span>
          <h3 style={{ textAlign: "right" }}>
            총 &nbsp;
            {pendings}건
          </h3>
        </span>
      </div>
      <div className="card-style" style={{ height: "120px" }}>
        <span>
          <h4 style={{ textAlign: "left", marginBottom: "6%" }}>
            전체 리뷰 {totReviews} 건
          </h4>
        </span>
        <span>
          <h3 style={{ textAlign: "right" }}>&nbsp;답글 미등록 {noReply}건</h3>
        </span>
      </div>
    </>
  );
}

export default Summary;
