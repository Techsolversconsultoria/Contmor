import React, { useState, useEffect } from 'react';
import data from './data.json';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const uniqueValues = (items, key) => [...new Set(items.map(item => item[key]).filter(Boolean))];

const App = () => {
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroGrupo, setFiltroGrupo] = useState('');
  const [filtroFolha, setFiltroFolha] = useState('');
  const [filtroDoc, setFiltroDoc] = useState('');

  const dadosFiltrados = data.filter(item =>
    (!filtroStatus || item.Status === filtroStatus) &&
    (!filtroGrupo || item.Grupo === filtroGrupo) &&
    (!filtroFolha || item.Folha === filtroFolha) &&
    (!filtroDoc || item.Documentação === filtroDoc)
  );

  const statusCounts = ['CONCLUIDO', 'EM ANDAMENTO', 'INICIAR'].map(status => ({
    name: status,
    total: dadosFiltrados.filter(item => item.Status === status).length
  }));

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Dashboard de Empresas</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select onChange={e => setFiltroStatus(e.target.value)} className="p-2 border rounded-lg">
          <option value="">Todos os Status</option>
          {uniqueValues(data, 'Status').map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select onChange={e => setFiltroGrupo(e.target.value)} className="p-2 border rounded-lg">
          <option value="">Todos os Grupos</option>
          {uniqueValues(data, 'Grupo').map(grupo => (
            <option key={grupo} value={grupo}>{grupo}</option>
          ))}
        </select>
        <select onChange={e => setFiltroFolha(e.target.value)} className="p-2 border rounded-lg">
          <option value="">Todas as Folhas</option>
          {uniqueValues(data, 'Folha').map(folha => (
            <option key={folha} value={folha}>{folha}</option>
          ))}
        </select>
        <select onChange={e => setFiltroDoc(e.target.value)} className="p-2 border rounded-lg">
          <option value="">Todas as Documentações</option>
          {uniqueValues(data, 'Documentação').map(doc => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">Resumo por Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusCounts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#1D4ED8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              {Object.keys(data[0]).map(col => (
                <th key={col} className="px-4 py-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((row, i) => (
              <tr key={i} className="border-b hover:bg-blue-50">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-2">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
