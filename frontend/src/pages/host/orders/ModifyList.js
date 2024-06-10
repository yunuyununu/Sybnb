import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BellSlash, Exclamation } from "react-bootstrap-icons";

import RequestItem from "./RequestItem";

function useFetch(url) {
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

function ModifyList() {
  const { userIdx } = useParams();
  const [data, loading] = useFetch(
    `http://localhost/api/order/manage/modify/list?userIdx=${userIdx}`
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slick = useRef(null);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    if (data.length == 0) {
      return (
        <div>
          <h5 style={{ alignItems: "center", marginBottom: "1%" }}>
            <Exclamation size={35} />
            예약 변경 요청
          </h5>
          <div
            className="container col m-0 p-5"
            style={{ width: "890px", height: "260px", textAlign: "center" }}
          >
            <BellSlash size={35} style={{ margin: "3%" }} />
            <br />
            <h4>예약 변경요청이 없습니다.</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h5 style={{ alignItems: "center", marginBottom: "1%" }}>
            <Exclamation size={35} />
            예약 변경 요청
          </h5>
          <Slider {...settings} ref={slick}>
            {data.map((item) => (
              <RequestItem
                key={item.o_idx}
                o_idx={item.o_idx}
                g_idx={item.g_idx}
                ho_idx={item.ho_idx}
                ho_name={item.ho_name}
                d_idx={item.d_idx}
                d_room_type={item.d_room_type}
                o_ckin={item.o_ckin}
                o_ckout={item.o_ckout}
                ru_startDate={item.ru_startDate}
                ru_endDate={item.ru_endDate}
                o_adult={item.o_adult}
                o_child={item.o_child}
                o_baby={item.o_baby}
                ru_adult={item.ru_adult}
                ru_child={item.ru_child}
                ru_baby={item.ru_baby}
                bfsum={item.bfsum}
                sum={item.sum}
                g_email={item.g_email}
                g_name={item.g_name}
                g_photo={item.g_photo}
              />
            ))}
          </Slider>
        </div>
      );
    }
  }
}
export default ModifyList;
