import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function LinearChart({ options, data }) {
  return <Line options={options} data={data} />
}
