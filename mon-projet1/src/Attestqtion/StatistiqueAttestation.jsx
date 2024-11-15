import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import HeaderAtestation from './HeaderAtestation';
import SiebarAttestation from './SiebarAttestation';
import AttestationFooter from './AttestatiionFooter';
import BackTotop from '../Interface/BackToTop';
import { MdFormatListNumberedRtl, MdWatchLater, MdSchool, MdOutlineSchool } from 'react-icons/md';

function StatistiqueAttestation() {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const [year, setYear] = useState(currentYear);
  const [totalCount, setTotalCount] = useState(0);
  const [validatedCount, setValidatedCount] = useState(0);
  const [enAttenteCount, setEnAttenteCount] = useState(0);
  const [acquisesCount, setAcquisesCount] = useState(0);
  const [monthlyValidatedCounts, setMonthlyValidatedCounts] = useState(new Array(12).fill(0));
  const [monthlyAttenteCounts, setMonthlyAttenteCounts] = useState(new Array(12).fill(0));

  const fetchStatistics = async (selectedYear) => {
    try {
      const [totalResponse, validatedResponse, enAttenteResponse, acquisesResponse] = await Promise.all([
        axios.get(`http://localhost:7000/statistiques/total/${selectedYear}`),
        axios.get(`http://localhost:7000/demandeAttestations/validated/${selectedYear}`),
        axios.get(`http://localhost:7000/demandeAttestations/enAttente/${selectedYear}`),
        axios.get(`http://localhost:7000/attestations/count/${selectedYear}`)
      ]);

      setTotalCount(totalResponse.data.total);
      setValidatedCount(validatedResponse.data.validatedCount || 0);
      setEnAttenteCount(enAttenteResponse.data.enAttenteCount || 0);
      setAcquisesCount(acquisesResponse.data.count || 0);

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

  useEffect(() => {
    fetchStatistics(year);
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const chartOptions = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Statistiques des attestations validées par mois et en attente',
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

  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

  return (
    <div>
      <HeaderAtestation />
      <SiebarAttestation />
      <div className='container' style={{ marginTop: '200px' }}>
        <div className="main--contents">
          <div className="header--wrapper">
            <div className="header--title">
              <label htmlFor="yearSelect">Sélectionner une année :</label>
              <select id="yearSelect" value={year} onChange={handleYearChange}>
                {years.map(yearOption => (
                  <option key={yearOption} value={yearOption}>{yearOption}</option>
                ))}
              </select>
              <h2>Tableau de bord</h2>

              <div className="card--wrapper">
                <div className="payment--card light-red">
                  <div className="card--header">
                    <div className="amount">
                      <span className="title">Attestation validée</span>
                    </div>
                  </div>
                  <MdFormatListNumberedRtl />
                  <span className="card-detail">*** *** *** {validatedCount}</span>
                </div>

                <div className="payment--card light-purple">
                  <div className="card--header">
                    <div className="amount">
                      <span className="title">Attestation en attente</span>
                    </div>
                  </div>
                  <MdWatchLater />
                  <span className="card-detail">*** *** *** {enAttenteCount}</span>
                </div>

                <div className="payment--card light-green">
                  <div className="card--header">
                    <div className="amount">
                      <span className="title">Total par an</span>
                    </div>
                  </div>
                  <MdSchool />
                  <span className="card-detail">*** *** *** {totalCount}</span>
                </div>

                <div className="payment--card light-blue">
                  <div className="card--header">
                    <div className="amount">
                      <span className="title">Listes acquises</span>
                    </div>
                  </div>
                  <MdOutlineSchool />
                  <span className="card-detail">*** *** *** {acquisesCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tabular--wrapper">
            <div className="header--wrapper">
              <div className="header--title">
                {/* <h3 className="main--title">Diagrammes</h3> */}
              </div>
            </div>
            <div className="chart--wrapper">
              <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <AttestationFooter />
      <BackTotop />
    </div>
  );
}

export default StatistiqueAttestation;
 