import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import HotspotMap from '../components/HotspotMap';
import hotspots from '../data/hotspots';
import { ShieldAlert, Activity, MapPin, FileCheck, Radio, Download, Filter } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const OfficerDashboard = ({ role }) => {
  const lineData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Disease Outbreak Incidents',
        data: [120, 190, 300, 500, 420, 610],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Resolved Field Interventions',
        data: [80, 150, 260, 410, 380, 540],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const doughnutData = {
    labels: ['Late Blight', 'Brown Plant Hopper', 'Rice Blast', 'Yellow Rust', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981', '#8b5cf6'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#9ca3af', font: { family: 'Inter', weight: '600' } } }
    },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.04)' } }
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Officer Command Desk Banner */}
      <div className="glass-card" style={{ padding: '28px 32px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(139, 92, 246, 0.1), rgba(17, 24, 39, 0.95))', borderLeft: '5px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-info"><Radio size={12} /> CENTRAL AGRI-SURVEILLANCE DESK</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Ministry of Agriculture Telemetry Portal</span>
            </div>
            <h1 className="section-title" style={{ fontSize: '28px' }}>
              National Crop Surveillance & Outbreak Command Desk 🏛️
            </h1>
            <p className="section-subtitle" style={{ fontSize: '14px' }}>
              Geospatial Hotspot Mapping • Epidemiological Modeling • Resource Allocation
            </p>
          </div>

          <button className="btn btn-cyan btn-lg" onClick={() => alert('Exporting Official State Crop Health & Surveillance PDF Report...')}>
            <Download size={18} /> Export State Report (PDF)
          </button>
        </div>
      </div>

      {/* Stats Telemetry Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(6,182,212,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(6,182,212,0.3)' }}>
            <Activity color="#22d3ee" size={26} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 'bold' }}>SCANS MONITORED</div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'Outfit' }}>14,280</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(239,68,68,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(239,68,68,0.3)' }}>
            <ShieldAlert color="#f87171" size={26} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 'bold' }}>HIGH RISK HOTSPOTS</div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'Outfit', color: '#f87171' }}>18 Districts</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16,185,129,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(16,185,129,0.3)' }}>
            <FileCheck color="#34d399" size={26} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 'bold' }}>EXPERT ACCURACY</div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'Outfit', color: '#34d399' }}>96.4%</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245,158,11,0.15)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.3)' }}>
            <MapPin color="#fbbf24" size={26} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 'bold' }}>ADVISORIES BROADCAST</div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'Outfit' }}>52,400</div>
          </div>
        </div>
      </div>

      {/* GIS Hotspot Map */}
      <div style={{ marginBottom: '24px' }}>
        <HotspotMap />
      </div>

      {/* Charts Section */}
      <div className="grid-60-40" style={{ marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="var(--primary-light)" size={20} /> 6-Month Epidemiological Outbreak Curve
          </h3>
          <Line data={lineData} options={chartOptions} />
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Top Disease Vector Breakdown
          </h3>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Doughnut data={doughnutData} options={{ plugins: { legend: { labels: { color: '#9ca3af' } } } }} />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Real-time District Outbreak Registry</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>District</th>
              <th>State</th>
              <th>Disease Detected</th>
              <th>Affected Crop</th>
              <th>Severity Level</th>
              <th>Surveillance Count</th>
            </tr>
          </thead>
          <tbody>
            {hotspots.map((spot) => (
              <tr key={spot.id}>
                <td><strong>{spot.district}</strong></td>
                <td>{spot.state}</td>
                <td style={{ color: 'var(--primary-light)', fontWeight: 'bold' }}>{spot.disease}</td>
                <td>{spot.cropAffected}</td>
                <td>
                  <span className={`badge badge-${spot.severity === 'critical' ? 'danger' : (spot.severity === 'high' ? 'warning' : 'info')}`}>
                    {spot.severity}
                  </span>
                </td>
                <td>{spot.reportCount} cases</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerDashboard;
