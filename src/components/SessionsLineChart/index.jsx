import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import './SessionsLineChart.css';

/**
 * Custom X axis formatter
 *
 * @param {string} tick - The number of the day of the week
 * @returns {number} The initial of the name of the weekday.
 */
const xAxisFormatter = (tick) => {
  const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return dayNames[tick - 1];
};

/**
 * Custom cursor to display the dark rectangle when hovering over the chart
 *
 * @param {[number]} points - The cursor coordonates
 * @returns {JSX} The React component.
 */
const CustomCursor = ({ points }) => {
  return (
    <rect
      x={points[0].x}
      y="0"
      height="100%"
      width="100%"
      fill="black"
      opacity={0.1}
    ></rect>
  );
};

/**
 * Custom tooltip formatter
 *
 * @param {boolean} active - Whether the tooltip is hovered or not
 * @param {[string]} payload - The array of data
 * @returns {JSX} The tooltip.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

/**
 * Component that returns a chart from daily session data
 *
 * @component
 * @param {[object]} data - The daily session data
 * @returns {JSX} The React component.
 */
const SessionsLineChart = ({ data }) => {
  return (
    <article className="sessions-chart-container">
      <p className="sessions-chart-title">Durée moyenne des sessions</p>
      <ResponsiveContainer width="100%" aspect={0.98}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: -30 }}
        >
          <defs>
            <linearGradient id="areachart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="natural"
            dataKey="sessionLength"
            stroke="#ffffff"
            strokeWidth={4}
            strokeOpacity={0.4}
            fill="url(#areachart)"
            fillOpacity={1}
            activeDot={{ r: 8, strokeWidth: 18, strokeOpacity: 0.3 }}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tickFormatter={xAxisFormatter}
            interval="preserveStartEnd"
            dy={-50}
            tick={{
              fill: 'white',
              opacity: 0.4,
              fontWeight: 500,
              fontSize: 12,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            hide={true}
            domain={['dataMin -50', 'dataMax + 50']}
          />
          <Tooltip
            content={<CustomTooltip />}
            itemStyle={{ color: 'black' }}
            cursor={<CustomCursor />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </article>
  );
};

SessionsLineChart.prototype = {
  data: PropTypes.array,
};

export default SessionsLineChart;
