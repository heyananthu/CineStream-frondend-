import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axiosInstance from "../Constants/BaseUrl";

function SupportViewReports() {
  const districts = [
    { district: "Trivandrum", crimeCount: 5 },
    { district: "Kollam", crimeCount: 8 },
    { district: "Pathanamthitta", crimeCount: 3 },
    { district: "Alappuzha", crimeCount: 7 },
    { district: "Kottayam", crimeCount: 6 },
    { district: "Idukki", crimeCount: 2 },
    { district: "Ernakulam", crimeCount: 10 },
    { district: "Thrissur", crimeCount: 4 },
    { district: "Palakkad", crimeCount: 5 },
    { district: "Malappuram", crimeCount: 9 },
    { district: "Kozhikode", crimeCount: 8 },
    { district: "Wayanad", crimeCount: 1 },
    { district: "Kannur", crimeCount: 6 },
    { district: "Kasaragod", crimeCount: 3 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A10303",
    "#8A2BE2",
    "#A52A2A",
    "#DEB887",
    "#5F9EA0",
    "#D2691E",
    "#FF7F50",
    "#6495ED",
    "#FFF8DC",
    "#DC143C",
  ];

  const [data, setData] = useState([]);


  useEffect(() => {
    axiosInstance
      .post(`/getMostPopularMovies`)
      .then((res) => {
        console.log(res,'hi');
        if (res.data.status === 200) {
          setData(res.data.data||[]);
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to fetch cast data");
      });


      

    
  }, []);

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="movieName"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {districts.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SupportViewReports;
