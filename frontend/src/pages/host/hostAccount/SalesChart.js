import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Summary from "./Summary";

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
  ChartDataLabels
);

export const options = {
  responsive: false, // canvas 반응형 여부
  maxBarThickness: 30,
  grouped: true, // x축 값이 같은 데이터, 그룹화
  interaction: {
    mode: "index", // hover(tooltip) : index를 기준으로(동일한 index에 놓인 값)
  },
  plugins: {
    legend: {
      labels: { padding: 20 },
    },
    title: {
      display: true,
      text: "지난달 대비 매출현황",
      color: "black",
      font: {
        size: "18",
      },
    },
    ChartDataLabels: {
      display: true,
    },
    datalabels: {
      color: "black",
      font: {
        weight: "bold",
      },
      anchor: "end",
      formatter: function(value, context) {
        if (value == 0) return null;
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      bodySpacing: 10, // 툴팁 내부의 항목들 간 간격
    },
  },
  scales: {
    y: {
      axis: "y",
      title: {
        display: true,
        align: "end",
        color: "black",
        text: "백만원",
      },
    },
  },
};

function useFetch(url, e) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (e == "labels" && data != null) {
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push(Object.values(data[i]).toString());
          }
          setData(arr);
        } else if (e == "sales" && data != null) {
          setData(data);
        }
        setLoading(false);
      });
  }, []);
  return [data, loading];
}

function SalesChart() {
  const { userIdx } = useParams();
  const today = new Date();
  const [labels, loading1] = useFetch(
    `http://localhost/api/chart/labels/${userIdx}`,
    "labels"
  );
  const [sales, loading2] = useFetch(
    `http://localhost/api/chart/sales/${userIdx}`,
    "sales"
  );

  if (loading1 || loading2) {
    return <div className="text-center">로딩 중...</div>;
  } else {
    //차트 데이터 셋팅
    const lastSales = Object.values(sales.lastMonth);
    const thisSales = Object.values(sales.thisMonth);
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: today.getMonth() + "월",
          data: lastSales,
          backgroundColor: "rgba(140, 126, 158, 0.7)",
        },
        {
          label: today.getMonth() + 1 + "월",
          data: thisSales,
          backgroundColor: "rgba(219, 196, 240, 0.7)",
        },
      ],
    };

    return (
      <>
        <div className="row mt-0 mb-2">
          <div className="col-9">
            <div style={{ width: 900, height: 400 }}>
              <Bar
                options={options}
                data={chartData}
                height={380}
                width={890}
              />
            </div>
          </div>
          <div className="col-3">
            <Summary />
          </div>
        </div>
      </>
    );
  }
}

export default SalesChart;
