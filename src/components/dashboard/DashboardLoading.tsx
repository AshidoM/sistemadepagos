import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  CreditCard,
  DollarSign,
  FileText,
  CheckCircle,
  Database,
  Shield,
  Server,
} from "lucide-react";

interface DashboardLoadingProps {
  onComplete?: () => void;
  userRole?: "administrator" | "capturista";
}

const DashboardLoading = ({
  onComplete = () => {},
  userRole = "administrator",
}: DashboardLoadingProps) => {
  const [loadedModules, setLoadedModules] = useState<number[]>([]);
  const [currentModule, setCurrentModule] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const modules = [
    { icon: Database, text: "Base de Datos", color: "text-blue-400" },
    { icon: Shield, text: "Seguridad", color: "text-green-400" },
    { icon: BarChart3, text: "Resumen", color: "text-baci-yellow" },
    { icon: Users, text: "Clientes", color: "text-purple-400" },
    { icon: CreditCard, text: "Créditos", color: "text-cyan-400" },
    { icon: DollarSign, text: "Pagos", color: "text-emerald-400" },
    { icon: FileText, text: "Reportes", color: "text-orange-400" },
    { icon: CheckCircle, text: "Sistema", color: "text-green-500" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentModule < modules.length) {
        setLoadedModules((prev) => [...prev, currentModule]);
        setCurrentModule((prev) => prev + 1);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [currentModule, modules.length, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-br from-baci-darker via-baci-dark to-slate-900 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-baci-yellow/8 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-spin-slow" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="text-center z-10 max-w-2xl mx-auto px-6 critical-interaction"
          >
            <motion.div
              className="mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-baci-yellow to-baci-yellow-matte rounded-xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-8 h-8 text-baci-darker" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08 }}
              className="text-2xl font-bold text-white mb-1"
            >
              BACI Dashboard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08 }}
              className="text-slate-300 mb-1 text-sm"
            >
              {userRole === "administrator"
                ? "Panel de Administrador"
                : "Panel de Capturista"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08 }}
              className="text-slate-400 text-xs mb-8"
            >
              Cargando módulos del sistema...
            </motion.p>

            {/* Module Grid */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {modules.map((module, index) => {
                const Icon = module.icon;
                const isLoaded = loadedModules.includes(index);
                const isLoading = currentModule === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0.3 }}
                    animate={{
                      scale: isLoaded ? 1 : isLoading ? 1.05 : 0.9,
                      opacity: isLoaded ? 1 : isLoading ? 0.8 : 0.3,
                      rotate: isLoading ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: isLoading ? 0.6 : 0.12,
                      repeat: isLoading ? Infinity : 0,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="relative critical-interaction"
                  >
                    <div
                      className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                        isLoaded
                          ? "bg-slate-800/80 border border-green-500/30 shadow-lg"
                          : isLoading
                            ? "bg-baci-yellow/20 border border-baci-yellow/50 shadow-glow"
                            : "bg-slate-800/40 border border-slate-700/30"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-1 transition-colors duration-300 ${
                          isLoaded
                            ? "text-green-400"
                            : isLoading
                              ? "text-baci-yellow"
                              : "text-slate-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium transition-colors duration-300 ${
                          isLoaded
                            ? "text-green-400"
                            : isLoading
                              ? "text-baci-yellow"
                              : "text-slate-500"
                        }`}
                      >
                        {module.text}
                      </span>
                    </div>

                    {isLoaded && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-6 flex items-center justify-center space-x-2 text-slate-400 text-xs"
            >
              <Shield className="w-3 h-3 text-green-500" />
              <span>Sistema seguro y encriptado</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardLoading;
