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

  const data = {
    labels,
    datasets: [
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
    ],
  };
  return (
    <Box width="100%">
      <Bar options={options} data={data} />
    </Box>
  );
};
export default MyChartBar;
