import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyChartLine = ({ colors }) => {
  const { primary, secondary } = colors;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const labels = ["JanFebMar", "AprMayJun", "JulAugSep", "OctNovDec"];
  const data = {
    labels,
    datasets: [
      {
        label: "Egress",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: primary,
        backgroundColor: primary,
      },
      {
        label: "Ingress",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: secondary,
        backgroundColor: secondary,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default MyChartLine;
