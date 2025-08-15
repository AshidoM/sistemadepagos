import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Shield, Server, CheckCircle } from "lucide-react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete = () => {} }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    {
      icon: Database,
      text: "Conectando a la base de datos...",
      duration: 1500,
    },
    { icon: Shield, text: "Verificando certificados SSL...", duration: 1200 },
    { icon: Server, text: "Inicializando servicios...", duration: 1000 },
    { icon: CheckCircle, text: "Sistema listo", duration: 800 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < loadingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, loadingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, loadingSteps, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-baci-darker via-baci-dark to-slate-900 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-baci-yellow/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-baci-yellow/5 rounded-full blur-2xl" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 max-w-md mx-auto px-6"
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-baci-yellow to-baci-yellow-matte rounded-2xl flex items-center justify-center shadow-2xl">
                <Database className="w-10 h-10 text-baci-darker" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-2"
            >
              ARRENDAMIENTOS BACI
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 mb-12"
            >
              Sistema Financiero de Pagos
            </motion.p>

            <div className="space-y-6">
              {loadingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: isActive || isCompleted ? 1 : 0.3,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                      isActive
                        ? "bg-baci-yellow/10 border border-baci-yellow/30"
                        : isCompleted
                          ? "bg-green-500/10 border border-green-500/30"
                          : "bg-slate-800/30 border border-slate-700/30"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-baci-yellow/20 text-baci-yellow"
                          : isCompleted
                            ? "bg-green-500/20 text-green-400"
                            : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : isCompleted
                              ? "text-green-400"
                              : "text-slate-400"
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-2 h-2 bg-baci-yellow rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: dot * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center justify-center space-x-2 text-slate-400 text-sm"
            >
              <Shield className="w-4 h-4 text-green-500" />
              <span>Conexión segura SSL/TLS</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
