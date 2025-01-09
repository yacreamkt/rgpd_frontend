// App.js
import React, { useState, useEffect } from 'react';
import Header from './view/utils/components/header/Header';
import './view/utils/Global.css';
import WebPages from './view/pages/web/WebPage';
import DomainPage from './view/pages/web/domainPage/DomainPage';
import LoginPage from './view/pages/login/LoginPage';
import PerfilPage from './view/pages/user/perfil/PerfilPage'; // Importa PerfilPage
import OrganPage from './view/pages/user/organizacion/OrganPage'; // Importa OrganPage
import DocPage from './view/pages/documentacion/DocPage'; // Importa DocPage
import PaginasDomumentos from './view/pages/documentacion/pages/PaginasDomumentos'; // Importa PaginasDomumentos

function App() {
  const [currentPage, setCurrentPage] = useState('web');
  const [domain, setDomain] = useState('');
  const [domainId, setDomainId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (page, domainName, id, data) => {
    setCurrentPage(page);
    if (domainName) setDomain(domainName);
    if (id) setDomainId(id);
    if (data) setDocData(data);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  let PageComponent;
// organizacion
  switch (currentPage) {
    case "perfil":
      PageComponent = <PerfilPage onNavigate={handleNavigate} />;
      break;
    case "organizacion":
        PageComponent = <OrganPage onNavigate={handleNavigate} />;
      break;
    case 'web':
      PageComponent = <WebPages onNavigate={handleNavigate} />;
      break;
    case 'domain':
      PageComponent = <DomainPage domain={domain} domainId={domainId} onNavigate={handleNavigate} />;
      break;
    case 'documentacion':
      PageComponent = <DocPage onNavigate={handleNavigate} />;
      break;
      case 'paginasDomumentos':
        PageComponent = <PaginasDomumentos onNavigate={handleNavigate} formData={docData} />;
        break;
    default:
      PageComponent = <WebPages onNavigate={handleNavigate} />;
  }

  return (
    <div className="App">
      <Header onNavigate={handleNavigate} /> {/* Pasa handleNavigate al Header */}
      {PageComponent}
    </div>
  );
}

export default App;
