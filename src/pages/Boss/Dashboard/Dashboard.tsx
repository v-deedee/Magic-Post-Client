import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { PiTagChevronFill } from "react-icons/pi";

export default function Dashboard() {
  const [chart1State, setChart1State] = useState({
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  const [chart2State, setChart2State] = useState({
    series: [],
    chartOptions: {
      labels: [],
    },
  });

  const [statisticsData, setStatisticsData] = useState({
    total: 0,
    storage: 0,
    postoffice: 0,
  });

  const fetchData = async () => {
    const res = await axios({
      method: "get",
      url: "https://my-json-server.typicode.com/pbdanh/db/boss",
    });
    console.log(res);
    setStatisticsData(res.data);
    setChart1State({
      ...chart1State,
      series: [
        {
          name: "series-1",
          data: res.data.chart1.data,
        },
      ],
    });
    setChart2State({
      series: res.data.chart2.series,
      chartOptions: {
        labels: res.data.chart2.labels,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-sm bg-indigo-200 p-4 dark:bg-indigo-500 sm:p-6">
        {/* Background illustration */}
        <div
          className="pointer-events-none absolute right-0 top-0 -mt-4 hidden xl:block"
          aria-hidden="true"
        >
          <img src="/login-background.jpg" alt="" width="2000" />
        </div>

        {/* Content */}
        <div className="relative">
          <h1 className="mb-1 text-2xl font-bold text-slate-200 dark:text-slate-100 md:text-3xl">
            Annual Statistics 👋
          </h1>
          <p className="pt-2 text-slate-200 dark:text-indigo-200">
            Track all your transactions!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full flex flex-col rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:col-span-6 xl:col-span-4">
          <div className="px-5 pt-5">
            <header className="mb-2 flex items-start justify-between">
              <div className="text-4xl text-yellow-300">
                <PiTagChevronFill />
              </div>
            </header>
            <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              TOTAL
            </h2>
            <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
              Total number of transactions
            </div>
            <div className="mb-5 flex items-start">
              <div className="mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
                {statisticsData.total}
              </div>
              <div className="rounded-full bg-emerald-500 px-2 pb-0.5 text-sm font-semibold text-white">
                +6
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:col-span-6 xl:col-span-4">
          <div className="px-5 pt-5">
            <header className="mb-2 flex items-start justify-between">
              <div className="text-4xl text-blue-300">
                <PiTagChevronFill />
              </div>
            </header>
            <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              STORAGE
            </h2>
            <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
              Total number of storage in operation
            </div>
            <div className="flex items-start">
              <div className="mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
                {statisticsData.storage}
              </div>
              <div className="rounded-full bg-amber-500 px-2 pb-0.5 text-sm font-semibold text-white">
                -2
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:col-span-6 xl:col-span-4">
          <div className="px-5 pt-5">
            <header className="mb-2 flex items-start justify-between">
              <div className="text-4xl text-purple-300">
                <PiTagChevronFill />
              </div>
            </header>
            <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              POST-OFFICE
            </h2>
            <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
              Total number of post office in operation
            </div>
            <div className="flex items-start">
              <div className="mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
                {statisticsData.postoffice}
              </div>
              <div className="rounded-full bg-emerald-500 px-2 pb-0.5 text-sm font-semibold text-white">
                +8
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:col-span-6 xl:col-span-6">
          <header className="border-b border-slate-100 px-5 py-4 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              Transactions by provinces
            </h2>
          </header>
          <div className="donut flex items-center justify-center p-10">
            <Chart
              options={chart2State.chartOptions}
              series={chart2State.series}
              type="donut"
              width="380"
            />
          </div>
        </div>

        <div className="col-span-full rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 xl:col-span-6">
          <header className="border-b border-slate-100 px-5 py-4 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              Transactions by months
            </h2>
          </header>
          <div className="flex justify-around">
            <div>
              <Chart
                options={chart1State.options}
                series={chart1State.series}
                type="line"
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <Card className="h-72 w-72 bg-blue-200">
          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </Card> */
}

{
  /* <Card className="h-72 w-72 bg-orange-200">
          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <p className="font-normal text-gray-700 dark:text-gray-400"></p>
        </Card> */
}

{
  /* <Card className="h-72 w-72 bg-red-100">
          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            
          </h5>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            
          </p>
        </Card> */
}
