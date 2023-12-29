import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Dashboard() {
  const [chart1State, setChart1State] = useState({
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [33, 43, 45, 51, 124, 112, 185, 214, 122, 213, 218, 122],
      },
    ],
  });

  const [chart2State, setChart2State] = useState({
    series: [522, 412, 122, 81, 43],
    chartOptions: {
      labels: ["Ha Noi", "Ho Chi Minh", "Hai Phong", "Ha Tinh", "Other"],
    },
  });

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-around">
      <Card className="h-72 w-72 bg-blue-200">
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          TOTAL
        </h5>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          1234
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total number of transactions
        </p>
      </Card>

      <Card className="h-72 w-72 bg-orange-200">
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          STORAGE
        </h5>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          36
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total number of storage in operation
        </p>
      </Card>

      <Card className="h-72 w-72 bg-red-100">
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          POST-OFFICE
        </h5>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          36
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total number of postOffice in operation
        </p>
      </Card>
      <div>
        <Chart
          options={chart1State.options}
          series={chart1State.series}
          type="line"
          width="500"
        />
      </div>
      <div className="donut">
        <Chart
          options={chart2State.chartOptions}
          series={chart2State.series}
          type="donut"
          width="380"
        />
      </div>
    </div>
  );
}
