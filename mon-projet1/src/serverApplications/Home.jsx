import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ApexCharts from 'react-apexcharts';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsPass,
} from "react-icons/bs";
import '../App.css';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function Home() {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const [year, setYear] = useState(currentYear);
  const [totalCount, setTotalCount] = useState(0);
  const [validatedCount, setValidatedCount] = useState(0);
  const [enAttenteCount, setEnAttenteCount] = useState(0);
  const [acquisesCount, setAcquisesCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // État pour le nombre d'utilisateurs
  const [monthlyValidatedCounts, setMonthlyValidatedCounts] = useState(new Array(12).fill(0));
  const [monthlyAttenteCounts, setMonthlyAttenteCounts] = useState(new Array(12).fill(0));

  const fetchStatistics = async (selectedYear) => {
    try {
      const [totalResponse, validatedResponse, enAttenteResponse, acquisesResponse, userResponse] = await Promise.all([
        axios.get(`http://localhost:7000/statistiques/total/${selectedYear}`),
        axios.get(`http://localhost:7000/demandeAttestations/validated/${selectedYear}`),
        axios.get(`http://localhost:7000/demandeAttestations/enAttente/${selectedYear}`),
        axios.get(`http://localhost:7000/attestations/count/${selectedYear}`),
        axios.get(`http://localhost:7000/users/count`) // Requête pour le nombre d'utilisateurs
      ]);

      setTotalCount(totalResponse.data.total);
      setValidatedCount(validatedResponse.data.validatedCount || 0);
      setEnAttenteCount(enAttenteResponse.data.enAttenteCount || 0);
      setAcquisesCount(acquisesResponse.data.count || 0);
      setUserCount(userResponse.data.count || 0); // Met à jour le nombre d'utilisateurs

      const monthlyCounts = await Promise.all(
        Array.from({ length: 12 }, (_, index) => {
          const month = String(index + 1).padStart(2, '0');
          return axios.get(`http://localhost:7000/demandeAttestations/validated/month/${selectedYear}/${month}`);
        })
      );

      setMonthlyValidatedCounts(monthlyCounts.map(response => response.data.validatedCount));

      const monthlyCountsa = await Promise.all(
        Array.from({ length: 12 }, (_, index) => {
          const month = String(index + 1).padStart(2, '0');
          return axios.get(`http://localhost:7000/demandeAttestations/enAttente/month/${selectedYear}/${month}`);
        })
      );

      setMonthlyAttenteCounts(monthlyCountsa.map(response => response.data.enAttenteCount));

    } catch (error) {
      console.error('Error fetching statistics:', error.response ? error.response.data : error.message);
    }
  };

  // Calculer le pourcentage de réussite
  const calculateSuccessRate = () => {
    const totalResults = totalCount; // Remplacez ceci par le nombre total d'examens si différent
    const successCount = acquisesCount; // Nombre d'acquises
    return totalResults > 0 ? ((successCount / totalResults) * 100).toFixed(2) : 0;
  };

  const chartOptions = {
    chart: {
      id: 'bar-chart',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Statistiques des attestations validées et en attente par mois',
      align: 'center',
    },
    colors: ['#00E396', '#FF4560'],
    markers: {
      size: 5,
    },
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: 'Attestations validées',
      data: monthlyValidatedCounts,
    },
    {
      name: 'Attestations en attente',
      data: monthlyAttenteCounts,
    },
  ];

  useEffect(() => {
    fetchStatistics(year);
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

  return (
    <main className="main-container justify-content-between" style={{marginTop: '100px'}}>
      <div className="main-title">
        <h2>Tableau de bord</h2>
        <div className="slect">
          <label htmlFor="yearSelect">Sélectionner une année :</label>
          <select id="yearSelect" value={year} onChange={handleYearChange}>
            {years.map(yearOption => (
              <option key={yearOption} value={yearOption}>{yearOption}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h5>ACTIVITÉ</h5>
            <BsFillArchiveFill className="icon_icon" />
          </div>
          <p style={{color: 'white'}}>Nombres : {totalCount}</p>
        </div>

        <div className="card">
          <div className="card-inner">
            <h5>LISTES ATTESTATIONS</h5>
            <BsFillGrid3X3GapFill className="icon_icon" />
          </div>
          <p style={{color: 'white'}}> Valider : {validatedCount}</p>
          <p style={{color: 'white'}}>En attente : {enAttenteCount}</p>
        </div>

        <div className="card">
          <div className="card-inner">
            <h5>NOMBRES DES UTILISATEURS</h5>
            <BsPeopleFill className="icon_icon" />
          </div>
          <p style={{color: 'white'}}>Utilisateurs: {userCount}</p> {/* Affichage du nombre d'utilisateurs */}
        </div>

        <div className="card">
          <div className="card-inner">
            <h5>RESULTAT BEPC</h5>
            <BsPass className="icon_icon" />
          </div>
          {/* Affichage du taux de réussite */}
          {/* <p style={{color: 'white'}}>Taux: {calculateSuccessRate()}%</p>  */}
          <p style={{color: 'white'}}>Nombres: {acquisesCount}</p>
        </div>
      </div>

      <div className="mt-2">
        <div style={{margin: ''}}>
          <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
        </div>
      </div>
    </main>
  );
}

export default Home;
