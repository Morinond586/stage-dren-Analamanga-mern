import React from 'react';
import '../serverApplications/main.css';
// import Home from '../Interface/Home';
import SidBar from '../components/SidBar';
import Table from '../serverApplications/Table';
import Header from '../components/Header';
// import PageTitle from './PageTitle';
// import Dashboard from './Dashboard';

function Main() {
  return (
    <main id="main" className="main">
        <Header />
        <SidBar />
       <Table />
    </main>
  )
}

export default Main