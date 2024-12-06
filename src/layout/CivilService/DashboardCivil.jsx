import React, { useEffect, useRef } from 'react';
import Sidebar from '../../components/SideBar';
import Chart from 'chart.js/auto';

const DashboardCivil = () => {
  const barChartRef = useRef(null); // Référence pour le canvas du graphique en barres
  const pieChartRef1 = useRef(null); // Référence pour le canvas du premier graphique circulaire (Pie Chart)
  const pieChartRef2 = useRef(null); // Référence pour le canvas du deuxième graphique circulaire (Pie Chart)
  const lineChartRef = useRef(null); // Référence pour le canvas du graphique linéaire (Line Chart)

  const barChartInstance = useRef(null); // Référence pour l'instance Chart.js du graphique en barres
  const pieChartInstance1 = useRef(null); // Référence pour l'instance Chart.js du premier graphique circulaire (Pie Chart)
  const pieChartInstance2 = useRef(null); // Référence pour l'instance Chart.js du deuxième graphique circulaire (Pie Chart)
  const lineChartInstance = useRef(null); // Référence pour l'instance Chart.js du graphique linéaire

  useEffect(() => {
    // Données pour le graphique en barres
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

    // Données pour le graphique circulaire
    const pieData = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    // Données pour le graphique linéaire
    const lineData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Labels pour le graphique linéaire
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Configuration du graphique en barres
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

    // Configuration du graphique circulaire (Pie Chart)
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
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        }
      },
    };

    // Configuration du graphique linéaire
    const lineConfig = {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        },
      },
    };

    // Initialisation du graphique en barres
    const barCtx = barChartRef.current.getContext('2d');
    barChartInstance.current = new Chart(barCtx, barConfig);

    // Initialisation du premier graphique circulaire
    const pieCtx1 = pieChartRef1.current.getContext('2d');
    pieChartInstance1.current = new Chart(pieCtx1, pieConfig);

    // Initialisation du deuxième graphique circulaire
    const pieCtx2 = pieChartRef2.current.getContext('2d');
    pieChartInstance2.current = new Chart(pieCtx2, pieConfig);

    // Initialisation du graphique linéaire
    const lineCtx = lineChartRef.current.getContext('2d');
    lineChartInstance.current = new Chart(lineCtx, lineConfig);

    // Nettoyage lors du démontage
    return () => {
      barChartInstance.current.destroy();
      pieChartInstance1.current.destroy();
      pieChartInstance2.current.destroy();
      lineChartInstance.current.destroy(); // Détruire le graphique linéaire
    };
  }, []);

  return (
    <div className="containerCivil">
      <Sidebar />
      <div className="rightside">
        <div className="gridDashCivil">
          <div className="boxDashCivil">
          <span>Total de demande</span> <br />
          <span className='numberDash'>100</span>
          </div>
          <div className="boxDashCivil">
          <span>Total de demande</span> <br />
          <span className='numberDash'>100</span>
            
          </div>
          <div className="boxDashCivil">
          <span>Total de demande</span> <br />
          <span className='numberDash'>100</span>
            
          </div>
        </div>

        <div className="containerChatDash">
          <div className='contentChat'>
            <canvas ref={barChartRef}></canvas>
          </div>
          <div className='contentChat'>
            <canvas ref={pieChartRef1}></canvas>
          </div>
        </div>

        <div className="containerChatDash">
          
        <div className='contentChat'>
          <canvas width={"900px"} ref={pieChartRef2}></canvas>
        </div>
        
        <div className='contentChat'>
          <canvas ref={lineChartRef}></canvas>
        </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardCivil;