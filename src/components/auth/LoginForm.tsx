import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import FormField from "./FormField";

const loginSchema = z.object({
  username: z.string().min(1, "Ingrese un nombre de usuario válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void;
}

const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const watchedFields = watch();
  const isFormValid =
    watchedFields.username &&
    watchedFields.password &&
    watchedFields.password.length >= 6;

  const handleFormSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-slate-700/50 relative critical-interaction"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-baci-yellow/5 via-transparent to-blue-600/5 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-baci-yellow/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 p-6">
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
          className="text-center mb-5 critical-interaction"
        >
          <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-baci-yellow to-baci-yellow-matte rounded-lg flex items-center justify-center shadow-lg">
            <ShieldCheckIcon className="w-5 h-5 text-baci-darker" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Iniciar Sesión</h2>
          <p className="text-slate-400 text-xs">
            Accede a tu cuenta del sistema financiero
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 form-optimized"
        >
          <FormField
            label="Usuario"
            error={errors.username?.message}
            icon={<MailIcon className="h-5 w-5" />}
          >
            <Input
              {...register("username")}
              type="text"
              placeholder="administrador"
              className="bg-slate-800/60 border-0 text-white placeholder:text-slate-400 rounded-lg px-10 py-2 h-10 focus:bg-slate-800/80 focus:ring-2 focus:ring-baci-yellow/50 focus:outline-none input-optimized"
            />
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </FormField>

          <FormField
            label="Contraseña"
            error={errors.password?.message}
            icon={<LockIcon className="h-5 w-5" />}
          >
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-slate-800/60 border-0 text-white placeholder:text-slate-400 rounded-lg px-10 pr-10 py-2 h-10 focus:bg-slate-800/80 focus:ring-2 focus:ring-baci-yellow/50 focus:outline-none input-optimized"
              />
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-baci-yellow button-optimized"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormField>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="rememberMe"
                {...register("rememberMe")}
                className="border-slate-600 data-[state=checked]:bg-baci-yellow data-[state=checked]:border-baci-yellow rounded-md"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-slate-300 cursor-pointer hover:text-white smooth-transition"
              >
                Recordarme
              </Label>
            </div>

            <a
              href="#"
              className="text-sm text-baci-yellow hover:text-baci-yellow-matte smooth-transition font-medium"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <motion.div
            whileHover={{ scale: isFormValid ? 1.005 : 1 }}
            whileTap={{ scale: isFormValid ? 0.995 : 1 }}
            transition={{ duration: 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full font-semibold py-2 h-9 rounded-lg flex items-center justify-center gap-2 text-sm button-optimized ${
                isFormValid
                  ? "bg-gradient-to-r from-baci-yellow to-baci-yellow-matte hover:from-baci-yellow-matte hover:to-baci-yellow text-baci-darker shadow-lg hover:shadow-xl"
                  : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-baci-darker/30 border-t-baci-darker rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Account Request Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
          className="mt-5 text-center"
        >
          <p className="text-slate-400 text-xs mb-2">¿No tienes una cuenta?</p>
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="w-full bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-baci-yellow/30 text-slate-300 hover:text-baci-yellow rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-medium text-xs button-optimized"
          >
            <UserPlus className="w-3 h-3" />
            Solicitar Acceso
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.08 }}
        className="bg-slate-900/60 backdrop-blur-sm px-6 py-4 border-t border-slate-700/30"
      >
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-1">
          <ShieldCheckIcon className="h-3 w-3 text-green-400" />
          <span>Conexión segura SSL/TLS</span>
        </div>
        <div className="text-center text-xs text-slate-500">
          © 2024 ARRENDAMIENTOS BACI. Todos los derechos reservados.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
