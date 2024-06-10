import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

function HotelChart() {
  const colors = [
    '#4e817269', '#87ceeb', '#ffa07a', '#8a2be2', '#ff6347',
    '#4682b4', '#ffb6c1', '#32cd32', '#ff4500', '#1e90ff'
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/admin/chart')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
    ChartDataLabels: {
      display: true,
    },
    
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: '호텔',
        },
      },
      y: {
        axis: "y",
        title: {
          display: true,
          text: '매출액 (단위: 백만 원)',
          color: "black",
        },
      },
    },
  };

  return (
    <div className="d-flex">
      <div className="graph-container flex-grow-1" style={{ width: '500%', height:'400%' }}>
        {loading && <p>Loading...</p>}
        {!loading && (
          <Bar 
            data={{
              labels: data.labelList,
              datasets: [
                {
                  label: '이번달 매출',
                  data: data.sumList || [],
                  backgroundColor: data.labelList ? data.labelList.map((_, index) => colors[index % colors.length]) : [],
                },
              ],
            }} 
            options={options} 
          />
        )}
      </div>
      <div className="col-lg-3 mb-5">
      <br/> <br/> 
                  <div className="card h-70">
                    <div className="card-header " style={{ backgroundColor: '#4e817215',justifyContent: 'center' }}>
                     호텔 순위
                    </div>
                    <div className="table-container flex-grow-1">
                    <table className="table mt-3">
                    <thead>
            <tr>
              <th>순위</th>
              <th>호텔</th>
              <th>매출액 (단위: 백만 원)</th>
            </tr>
          </thead>
          <tbody>
            {data.labelList && data.labelList.map((hotel, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{hotel}</td>
                <td>{data.sumList[index]}</td>
              </tr>
            ))}
          </tbody></table></div></div>
      </div>
    </div>
  );
}

export default HotelChart;