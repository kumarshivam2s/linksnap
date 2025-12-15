import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
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
  // Generate last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  // Count clicks for each day
  const clicksPerDay = last7Days.map((day) => {
    return clickHistory.filter((click) => {
      const clickDate = new Date(click.date).toISOString().split('T')[0];
      return clickDate === day;
    }).length;
  });

  // Format day labels
  const dayLabels = last7Days.map((day) => {
    const date = new Date(day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  // Chart data configuration
  const data = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Clicks',
        data: clicksPerDay,
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#1f2937',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} clicks`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#9ca3af',
          font: { size: 11 }
        },
        grid: {
          color: '#374151',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: '#9ca3af',
          font: { size: 11 }
        },
        grid: {
          display: false
        }
      }
    }
  };

  // Calculate total clicks in last 7 days
  const totalClicks = clicksPerDay.reduce((sum, clicks) => sum + clicks, 0);

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-400">Clicks (Last 7 days)</h3>
        <span className="text-sm text-gray-500">
          Total: {totalClicks}
        </span>
      </div>

      {/* Chart Container */}
      <div className="h-48">
        {totalClicks > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No clicks in the last 7 days
          </div>
        )}
      </div>
    </div>
  );
}

export default ClickChart;