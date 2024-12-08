
import React, { useEffect, useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line,
  Bar,
  Legend,

} from "recharts";
import  { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Chart from 'chart.js/auto';



export  function ChartThree({width,color}) {
  console.log(color)
  const data = [
    { name: "Janvier", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Février", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mars", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Avril", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Mai", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Juin", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Juillet", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Août", uv: 3200, pv: 4400, amt: 2600 },
    { name: "Septembre", uv: 3100, pv: 4200, amt: 2300 },
    { name: "Octobre", uv: 2800, pv: 4000, amt: 2200 },
    { name: "Novembre", uv: 2600, pv: 3700, amt: 2100 },
    { name: "Décembre", uv: 2900, pv: 3900, amt: 2400 },
  ];
  
  return (
    <AreaChart
      width={width}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill={color.color1}
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill={color.color2}
      />
      <Area
        type="monotone"
        dataKey="amt"
        stackId="1"
        stroke="#ffc58"
        fill={color.color3}
      />
    </AreaChart>
  );
}

export  class Example extends PureComponent {
  
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    const data = [
      { name: "Nord", value: 400 },
      { name: "Sud", value: 300 },
      { name: "Est", value: 300 },
      { name: "Ouest", value: 200 },
      { name: "Centre", value: 250 },
    ];
    
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF2042'];
    
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={700} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
export  class Band extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/composed-chart-of-same-data-3cs8ym';

  render() {
    const data = [
      { name: "Janvier", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Février", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Mars", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Avril", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Mai", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Juin", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Juillet", uv: 3490, pv: 4300, amt: 2100 },
      { name: "Août", uv: 3200, pv: 4400, amt: 2600 },
      { name: "Septembre", uv: 3100, pv: 4200, amt: 2300 },
      { name: "Octobre", uv: 2800, pv: 4000, amt: 2200 },
      { name: "Novembre", uv: 2600, pv: 3700, amt: 2100 },
      { name: "Décembre", uv: 2900, pv: 3900, amt: 2400 },
    ];
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export const CircleChart = ({ labels, data, backgroundColors }) => {
  const pieChartRef = useRef(null); // Référence pour le canvas
  const pieChartInstance = useRef(null); // Référence pour l'instance du graphique

  useEffect(() => {
    const pieData = {
      labels: labels, // Labels dynamiques
      datasets: [
        {
          label: 'Dataset',
          data: data, // Données dynamiques
          backgroundColor: backgroundColors, // Couleurs dynamiques
          hoverOffset: 4,
        },
      ],
    };

    const pieConfig = {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    };

    // Création du graphique
    const pieCtx = pieChartRef.current.getContext('2d');
    pieChartInstance.current = new Chart(pieCtx, pieConfig);

    return () => {
      // Destruction du graphique pour éviter les fuites de mémoire
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [labels, data, backgroundColors]); // Mise à jour si props changent

  return (
    <div>
      <canvas ref={pieChartRef}></canvas>
    </div>
  );
};






export const BarChart = () => {
  const barChartRef = useRef(null); // Référence pour le canvas du graphique en barres
  const barChartInstance = useRef(null); // Référence pour l'instance Chart.js du graphique en barres

  useEffect(()=>{
    const barData = {
      labels: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
      ],
      datasets: [
        {
          label: 'Nombre de demandes',
          data: [65, 59, 80, 81, 56, 55, 40, 75, 60, 70, 50, 90],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const barConfig = {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const barCtx = barChartRef.current.getContext('2d');
    barChartInstance.current = new Chart(barCtx, barConfig);

    return () => {
      barChartInstance.current.destroy();
    
    };

  },[])






  return <canvas ref={barChartRef}></canvas>;
};






