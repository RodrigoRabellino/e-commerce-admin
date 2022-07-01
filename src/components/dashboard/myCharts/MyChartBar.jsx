import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyChartBar = ({ colors }) => {
  const { primary, secondary, third } = colors;
  const admin = useSelector((store) => store.admin);
  const [myData, setMyData] = useState([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  useEffect(() => {
    setMyData([
      {
        label: "Guitars",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: primary,
      },
      {
        label: "Amps",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: secondary,
      },
      {
        label: "Others",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: third,
      },
    ]);
  }, []);

  const data = {
    labels,
    datasets: [...myData],
  };
  return (
    <Box width="100%">
      <Bar options={options} data={data} />
    </Box>
  );
};
export default MyChartBar;
