import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../asset/css/reactcalendar.css";
import { CircleFill, TriangleFill } from "react-bootstrap-icons";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.count != 0) {
          let arr = [];
          for (let i = 0; i < data.list.length; i++) {
            let value = "";
            if (data.column == "o_ckin") {
              value = JSON.stringify(data.list[i].o_ckin);
              arr.push(moment(value).format("YYYY-MM-DD"));
            } else {
              value = JSON.stringify(data.list[i].o_ckout);
              arr.push(moment(value).format("YYYY-MM-DD"));
            }
          }
          setData(arr);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function Scheduler({ handleModal }) {
  const { userIdx } = useParams();
  const [value, onChange] = useState(new Date());
  const [ckin, loading1] = useFetch(
    `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckin`
  );
  const [ckout, loading2] = useFetch(
    `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckout`
  );
  const [pending, loading3] = useFetch(
    `http://localhost/api/order/manage/schedule/${userIdx}?column=o_ckin&pending=1`
  );
  const [date, setDate] = useState(value);

  if (loading1 || loading2 || loading3) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    return (
      <div>
        <Calendar
          formatDay={(local, date) => moment(date).format("D")} // '-일'제거
          formatYear={(local, date) => moment(date).format("YYYY")}
          formatMonthYear={(local, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory" // 일요일 부터 시작
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          onChange={onChange}
          onClickDay={(date, event) => {
            let strDate = moment(date).format("YYYY-MM-DD");
            handleModal(strDate, "detail");
          }}
          value={value}
          tileClassName={({ date, view }) => {
            if (
              ckin.find((x) => x === moment(date).format("YYYY-MM-DD")) ||
              ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              return "highlight"; // 확정 or 완료 일정 하이라이트 처리
            }
          }}
          tileContent={({ date, view }) => {
            let html = [];
            if (
              // 취소 제외, 체크인 일정 있을 경우 마크
              ckin.find((x) => x === moment(date).format("YYYY-MM-DD")) ||
              pending.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              html.push(
                <CircleFill
                  color={"#8c7e9e"}
                  style={{
                    margin: "0 1px",
                    width: "8px",
                    height: "8px",
                  }}
                />
              );
            }
            if (ckout.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              // 확정 or 완료상태인 체크아웃 일정 있을 경우 마크
              html.push(
                <TriangleFill
                  color={"#8c7e9e"}
                  style={{
                    margin: "0 1px",
                    width: "8px",
                    height: "8px",
                  }}
                />
              );
            }
            return (
              <>
                <div className="col-12 px-1 m-0" style={{ height: "16px" }}>
                  {html}
                </div>
              </>
            );
          }}
        />
      </div>
    );
  }
}
export default Scheduler;
