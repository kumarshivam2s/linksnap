import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

function ClickChart({ clickHistory }) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  const clicksPerDay = last7Days.map((day) => {
    return clickHistory.filter((click) => {
      const clickDate = new Date(click.date).toISOString().split("T")[0];
      return clickDate === day;
    }).length;
  });

  const dayLabels = last7Days.map((day) => {
    const date = new Date(day);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });

  const data = {
    labels: dayLabels,
    datasets: [
      {
        label: "Clicks",
        data: clicksPerDay,
        fill: true,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#0a0a0f",
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#18181b",
        titleColor: "#fff",
        bodyColor: "#a1a1aa",
        borderColor: "#27272a",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} clicks`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#52525b", font: { size: 11 } },
        grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
      },
      x: {
        ticks: { color: "#52525b", font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  const totalClicks = clicksPerDay.reduce((sum, clicks) => sum + clicks, 0);

  return (
    <div className="bg-white/[0.02] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">Last 7 days</span>
        <span className="text-sm text-gray-500">{totalClicks} clicks</span>
      </div>
      <div className="h-40">
        {totalClicks > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600 text-sm">
            No clicks yet
          </div>
        )}
      </div>
    </div>
  );
}

export default ClickChart;
