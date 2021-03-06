import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Radar,
  PolarRadiusAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import './PerformanceRadarChart.css';

/**
 * Component that returns a chart from performance data
 *
 * @component
 * @param {[object]} data - The performance stats
 * @returns {JSX} The React component.
 */
const PerformanceRadarChart = ({ data }) => {
  let performance = [];
  const angleAxisFormatter = (tick) => {
    const activities = [
      'Cardio',
      'Energie',
      'Endurance',
      'Force',
      'Vitesse',
      'Intensité',
    ];

    return activities[tick - 1];
  };

  if (data) {
    for (let i = 0; i < data.length; i++) {
      performance.push({
        value: Object.values(data).reverse()[i].value,
        kind: Object.values(data).reverse()[i].kind,
      });
    }
  }

  return (
    <article className="performance-chart-container">
      <ResponsiveContainer width="100%" aspect={0.98}>
        <RadarChart
          data={performance}
          margin={{ top: 0, right: 50, bottom: 0, left: 50 }}
          cx="47%"
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="kind"
            tickLine={{ fill: '#282D30' }}
            tick={{ fill: 'white', fontSize: 12, fontWeight: 500 }}
            tickFormatter={angleAxisFormatter}
          />
          <PolarRadiusAxis
            domain={[0, 250]}
            tickCount={6}
            axisLine={false}
            tick={false}
          />
          <Radar dataKey="value" fill="red" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </article>
  );
};

PerformanceRadarChart.prototype = {
  data: PropTypes.array,
};

export default PerformanceRadarChart;
