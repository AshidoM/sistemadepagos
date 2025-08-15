import React, { useState, useEffect } from "react";
import LoginForm from "./auth/LoginForm";
import LoadingScreen from "./LoadingScreen";
import DashboardLoading from "./dashboard/DashboardLoading";
import Dashboard from "./dashboard/Dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Phone, Calculator, LogOut } from "lucide-react";

type AppState =
  | "initial-loading"
  | "login"
  | "dashboard-loading"
  | "dashboard"
  | "logging-out";
type UserRole = "administrator" | "capturista";

const Home = () => {
  const [appState, setAppState] = useState<AppState>("initial-loading");
  const [userRole, setUserRole] = useState<UserRole>("administrator");

  useEffect(() => {
    // Show loading screen for a minimum time
    const timer = setTimeout(() => {
      setAppState("login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setAppState("login");
  };

  const handleLogin = (data: { username: string; password: string }) => {
    // Check credentials
    if (data.username === "administrador" && data.password === "admin1234") {
      setUserRole("administrator");
      setAppState("dashboard-loading");
    } else if (
      data.username === "capturista" &&
      data.password === "capturista1234"
    ) {
      setUserRole("capturista");
      setAppState("dashboard-loading");
    } else {
      // Handle invalid credentials
      alert("Credenciales inválidas");
    }
  };

  const handleDashboardLoadingComplete = () => {
    setAppState("dashboard");
  };

  const handleLogout = () => {
    // Show logout animation first
    setAppState("logging-out");
    setTimeout(() => {
      setAppState("login");
      setUserRole("administrator");
    }, 1500);
  };

  // Render different states
  if (appState === "initial-loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (appState === "dashboard-loading") {
    return (
      <DashboardLoading
        onComplete={handleDashboardLoadingComplete}
        userRole={userRole}
      />
    );
  }

  if (appState === "dashboard") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
        className="critical-interaction"
      >
        <Dashboard userRole={userRole} onLogout={handleLogout} />
      </motion.div>
    );
  }

  if (appState === "logging-out") {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 bg-gradient-to-br from-baci-darker via-baci-dark to-slate-900 flex items-center justify-center z-50 critical-interaction"
      >
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0.98, opacity: 0.9 }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-2xl"
          >
            <LogOut className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-white mb-2"
          >
            Cerrando Sesión
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm"
          >
            Guardando datos y cerrando sesión de forma segura...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-baci-darker via-baci-dark to-slate-900">
      {/* Fireflies Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-baci-yellow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-baci-yellow/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-baci-yellow/5 to-blue-600/5 rounded-full blur-2xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="absolute top-6 left-6 flex items-center gap-3 z-20"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-baci-yellow to-baci-yellow-matte rounded-xl flex items-center justify-center shadow-lg">
          <Calculator className="w-6 h-6 text-baci-darker" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">ARRENDAMIENTOS BACI</h1>
          <p className="text-slate-400 text-sm">Sistema Financiero de Pagos</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.12 }}
        className="absolute top-6 right-6 flex gap-4 z-20"
      >
        <motion.a
          whileHover={{ scale: 1.005, y: -0.5 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.08, ease: [0.23, 1, 0.32, 1] }}
          href="#"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-xl text-slate-300 hover:text-baci-yellow hover:bg-slate-800/80 text-sm font-medium nav-button-optimized"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Ayuda</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.005, y: -0.5 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.08, ease: [0.23, 1, 0.32, 1] }}
          href="#"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-xl text-slate-300 hover:text-baci-yellow hover:bg-slate-800/80 text-sm font-medium nav-button-optimized"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Contacto</span>
        </motion.a>
      </motion.nav>

      {/* Main Content */}
      <div className="min-h-screen w-full flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl z-10 mt-16 sm:mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.08 }}
            className="critical-interaction"
          >
            <LoginForm onSubmit={handleLogin} />
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(244, 196, 48, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 196, 48, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
