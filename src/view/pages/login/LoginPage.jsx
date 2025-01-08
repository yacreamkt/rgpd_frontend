import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { postLoginService } from "../../../data/datasource/remote/service/auth/LoginService";
import LoadingPage from "../../utils/components/loadingpage/LoadingPage"; // Asegúrate de importar correctamente
import icon from "../../../assets/icono.png";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el popup de carga

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldErrors({});
    setGlobalError("");
    setIsLoading(true); // Muestra el popup de carga

    try {
      const data = await postLoginService({ email, password });
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      onLogin(data.tokens.access); // Notifica al componente principal
    } catch (error) {
      if (error.status === 400) {
        setFieldErrors(error);
      } else {
        setGlobalError(error.detail || "Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false); // Oculta el popup de carga
    }
  };

  return (
    <div className={styles.authContainer}>
      {isLoading && (
        <div className={styles.popupOverlay}>
          <LoadingPage />
        </div>
      )}
      <div className={styles.authBox}>
        <img
          src={icon}
          alt="Logo"
          className={styles.authLogo}
        />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              className={styles.authInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Contraseña"
              className={styles.authInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {fieldErrors.email && (
            <p className={styles.errorMessage}>{fieldErrors.email[0]}</p>
          )}
          {globalError && (
            <p className={styles.errorMessage}>{globalError}</p>
          )}
          <div className={styles.rememberMe}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Recordar mis datos</label>
          </div>
          <button type="submit" className={styles.authButton}>
            Iniciar sesión
          </button>
        </form>
        <a href="/forgot-password" className={styles.forgotPassword}>
          ¿Olvidaste la contraseña?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
