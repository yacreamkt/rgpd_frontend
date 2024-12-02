import React, { useState, useEffect } from 'react';
import Header from './view/utils/components/header/Header';
import './view/utils/Global.css';
import WebPages from './view/pages/web/WebPage';
import DomainPage from './view/pages/web/domainPage/DomainPage';
import LoginPage from './view/pages/login/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('web');
  const [domain, setDomain] = useState('');
  const [domainId, setDomainId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si hay un token en localStorage
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token); // Si existe un token, el usuario está autenticado
  }, []);

  const handleLogin = (token) => {
    // Actualiza el estado de autenticación
    setIsAuthenticated(true);
  };

  const handleNavigate = (page, domainName, id) => {
    setCurrentPage(page);
    if (domainName) setDomain(domainName);
    if (id) setDomainId(id);
  };

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, muestra la página de inicio de sesión
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header />
      {currentPage === 'web' ? (
        <WebPages onNavigate={handleNavigate} />
      ) : (
        <DomainPage domain={domain} domainId={domainId} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
