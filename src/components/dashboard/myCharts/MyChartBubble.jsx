import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const MyChartBubble = ({ colors }) => {
  const { primary, secondary, third, fourth } = colors;
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    datasets: [
      {
        label: "Bubbles",
        data: Array.from({ length: 10 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 15 }),
        })),
        backgroundColor: primary,
      },
      {
        label: "More Bubbles",
        data: Array.from({ length: 15 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: secondary,
      },
    ],
  };
  return <Bubble options={options} data={data} />;
};

export default MyChartBubble;
