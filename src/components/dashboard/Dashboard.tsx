import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  CreditCard,
  DollarSign,
  FileText,
  LogOut,
  TrendingUp,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  Shield,
  Search,
  Plus,
  Filter,
  Download,
  UserCheck,
  Building,
  Route,
  ClipboardList,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Home,
  User,
  CreditCard as CreditCardIcon,
  Banknote,
  Receipt,
  Target,
  Percent,
  AlertCircle,
  History,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardProps {
  userRole?: "administrator" | "capturista";
  userName?: string;
  onLogout?: () => void;
}

type ModuleType =
  | "dashboard"
  | "clientes"
  | "avales"
  | "creditos"
  | "pagos"
  | "rutas"
  | "poblaciones"
  | "reportes"
  | "reglas"
  | "usuarios"
  | "auditoria";

const Dashboard = ({
  userRole = "administrator",
  userName = "Admin",
  onLogout = () => {},
}: DashboardProps) => {
  const [activeModule, setActiveModule] = useState<ModuleType>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedPopulation, setSelectedPopulation] = useState<any>(null);
  const [populationClients, setPopulationClients] = useState<any[]>([]);
  const [isPopulationDialogOpen, setIsPopulationDialogOpen] = useState(false);
  const [populationSortBy, setPopulationSortBy] = useState<
    "name" | "clients" | "amount"
  >("name");
  const [populationSortDirection, setPopulationSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Mock population data
  const allPopulations = [
    {
      id: 1,
      name: "SAN JUAN DEL LLANITO",
      route: "RUTA 4",
      coordinator: "MARIELA CALVILLO VILLA",
      coordinatorAddress: "QUINTANA ROO #87",
      coordinatorPhone: "4612983620",
      coordinatorBirthday: "12 DE AGOSTO",
      day: "VIERNES",
      date: "29/08/2025",
      activeClients: 5,
      weeklyCollection: 900.0,
      totalCV: 160.0,
      totalSheet: 1060.0,
      assignedTo: "administrator",
      clients: [
        {
          folio: "BACH-2025-001",
          nombre: "MELISSA MAGALY ESPINOZA GUERRERO",
          domicilio: "LIBRADO RENDÓN REYES 17",
          nombreAval: "HANNIA NATHALIE GARCÍA VILLASEÑOR",
          domicilioAval: "CALLE PRIMAVERA S/N",
          pagoEsperado: 160.0,
          multa: "M15",
          adeudoTotal: 320.0,
          plazo: 14,
          pagosVdos: 1,
          cv: 160.0,
          cobroSemana: 320.0,
          abonosParciales: 0,
          fechaDisp: "16/04/2025",
        },
        {
          folio: "BACH-2025-002",
          nombre: "YOLANDA BENÍTEZ BRIONES",
          domicilio: "FAISÁN 7",
          nombreAval: "PATRICIA VILLASEÑOR GAYTÁN",
          domicilioAval: "SENTIMIENTOS DE LA NACIÓN 50 C",
          pagoEsperado: 160.0,
          multa: "-",
          adeudoTotal: 320.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 160.0,
          abonosParciales: 160.0,
          fechaDisp: "16/04/2025",
        },
        {
          folio: "BACH-2025-003",
          nombre: "MARÍA ELVIA AGUILERA MÉNDEZ",
          domicilio: "AV. FELIPE CARRILLO PUERTO",
          nombreAval: "MARÍA GUADALUPE CENTENO ESPINOSA",
          domicilioAval: "SUPREMO TRIBUNAL S/N",
          pagoEsperado: 160.0,
          multa: "-",
          adeudoTotal: 480.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 160.0,
          abonosParciales: 0,
          fechaDisp: "23/04/2025",
        },
        {
          folio: "BACH-2025-004",
          nombre: "MARÍA GUADALUPE GARCÍA CAMARENA",
          domicilio: "DOMINGO VIDAL S/N",
          nombreAval: "MARÍA GUADALUPE GARCÍA VÁZQUEZ",
          domicilioAval: "RICARDO FLORES MAGÓN S/N",
          pagoEsperado: 160.0,
          multa: "-",
          adeudoTotal: 480.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 160.0,
          abonosParciales: 0,
          fechaDisp: "23/04/2025",
        },
        {
          folio: "BACH-2025-005",
          nombre: "(COORD) MARÍA SUSANA VÁZQUEZ SANDOVAL",
          domicilio: "MIGUEL HIDALGO 87",
          nombreAval: "—",
          domicilioAval: "—",
          pagoEsperado: 260.0,
          multa: "-",
          adeudoTotal: 780.0,
          plazo: 10,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 260.0,
          abonosParciales: 260.0,
          fechaDisp: "10/05/2025",
        },
      ],
    },
    {
      id: 2,
      name: "CÁRDENAS 2",
      route: "RUTA 8",
      coordinator: "ROSA DELIA CASTILLO LOREDO",
      coordinatorAddress: "FERNANDO MONTES DE OCA #12",
      coordinatorPhone: "4871495316",
      coordinatorBirthday: "13/04",
      day: "MIÉRCOLES",
      date: "12/08/2025",
      activeClients: 8,
      weeklyCollection: 2450.0,
      totalCV: 0.0,
      totalSheet: 2450.0,
      assignedTo: "administrator",
      clients: [
        {
          folio: "1608",
          nombre: "CAROLINA HERRERA PALOMO",
          domicilio: "B. DOMÍNGUEZ Y 16 DE SEPTIEMBRE",
          nombreAval: "—",
          domicilioAval: "—",
          pagoEsperado: 200.0,
          multa: "M15",
          adeudoTotal: 400.0,
          plazo: 14,
          pagosVdos: 2,
          cv: 400.0,
          cobroSemana: 400.0,
          abonosParciales: 0,
          fechaDisp: "21/06/2024",
        },
        {
          folio: "1629",
          nombre: "VALENCIA HERNÁNDEZ LICEA",
          domicilio: "COMONFORT 1",
          nombreAval: "—",
          domicilioAval: "—",
          pagoEsperado: 350.0,
          multa: "M15",
          adeudoTotal: 750.0,
          plazo: 14,
          pagosVdos: 2.14,
          cv: 750.0,
          cobroSemana: 750.0,
          abonosParciales: 0,
          fechaDisp: "12/07/2024",
        },
        {
          folio: "1649",
          nombre: "ROCÍO LICEA VELÁZQUEZ",
          domicilio: "COMONFORT 1",
          nombreAval: "—",
          domicilioAval: "—",
          pagoEsperado: 350.0,
          multa: "M15",
          adeudoTotal: 2450.0,
          plazo: 14,
          pagosVdos: 7,
          cv: 2450.0,
          cobroSemana: 2450.0,
          abonosParciales: 0,
          fechaDisp: "26/07/2024",
        },
        {
          folio: "1661",
          nombre: "JUANA YADIRA REYES MARTÍNEZ",
          domicilio: "ABASOLO 7",
          nombreAval: "—",
          domicilioAval: "—",
          pagoEsperado: 250.0,
          multa: "M15",
          adeudoTotal: 1500.0,
          plazo: 14,
          pagosVdos: 6,
          cv: 1500.0,
          cobroSemana: 1500.0,
          abonosParciales: 0,
          fechaDisp: "16/08/2024",
        },
      ],
    },
    {
      id: 3,
      name: "LA CAÑADA (EL MARQUÉS)",
      route: "RUTA 3",
      coordinator: "AZUCENA LÓPEZ MENDOZA",
      coordinatorAddress: "AV. LOS ARCOS 145",
      coordinatorPhone: "442 345 7789",
      coordinatorBirthday: "05/02",
      day: "LUNES",
      date: "01/09/2025",
      activeClients: 4,
      weeklyCollection: 1090.0,
      totalCV: 0.0,
      totalSheet: 1090.0,
      assignedTo: "administrator",
      clients: [
        {
          folio: "3012",
          nombre: "DANIELA PÉREZ NAVARRO",
          domicilio: "CALLE OLIVOS 23",
          nombreAval: "IVÁN PÉREZ NAVA",
          domicilioAval: "OLIVOS 25",
          pagoEsperado: 310.0,
          multa: "-",
          adeudoTotal: 930.0,
          plazo: 14,
          pagosVdos: 1,
          cv: 0,
          cobroSemana: 310.0,
          abonosParciales: 0,
          fechaDisp: "10/07/2025",
        },
        {
          folio: "3013",
          nombre: "RENATA GARCÍA VILLAR",
          domicilio: "PRIV. CIPRESES 5",
          nombreAval: "ELSA VILLAR RIVAS",
          domicilioAval: "CIPRESES 7",
          pagoEsperado: 210.0,
          multa: "-",
          adeudoTotal: 420.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 210.0,
          abonosParciales: 0,
          fechaDisp: "17/07/2025",
        },
        {
          folio: "3014",
          nombre: "ALMA DELGADO HERRERA",
          domicilio: "AV. EL MARQUÉS 810",
          nombreAval: "LUIS DELGADO RUIZ",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 160.0,
          multa: "M15",
          adeudoTotal: 320.0,
          plazo: 14,
          pagosVdos: 1,
          cv: 0,
          cobroSemana: 320.0,
          abonosParciales: 0,
          fechaDisp: "24/07/2025",
        },
        {
          folio: "3015",
          nombre: "MARIANA ZÚÑIGA FLORES",
          domicilio: "CERRADA NOGALES 4",
          nombreAval: "SILVIA FLORES",
          domicilioAval: "NOGALES 6",
          pagoEsperado: 410.0,
          multa: "-",
          adeudoTotal: 820.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 410.0,
          abonosParciales: 0,
          fechaDisp: "24/07/2025",
        },
      ],
    },
    {
      id: 4,
      name: "EL PUEBLITO (CORREGIDORA)",
      route: "RUTA 5",
      coordinator: "LAURA EDITH RAMÍREZ",
      coordinatorAddress: "5 DE FEBRERO 220",
      coordinatorPhone: "446 221 0044",
      coordinatorBirthday: "22/11",
      day: "JUEVES",
      date: "04/09/2025",
      activeClients: 5,
      weeklyCollection: 1330.0,
      totalCV: 0.0,
      totalSheet: 1330.0,
      assignedTo: "administrator",
      clients: [
        {
          folio: "5021",
          nombre: "CLAUDIA RIVERA OROZCO",
          domicilio: "NIÑOS HÉROES 12",
          nombreAval: "MARIO RIVERA",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 110.0,
          multa: "-",
          adeudoTotal: 220.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 110.0,
          abonosParciales: 0,
          fechaDisp: "15/08/2025",
        },
        {
          folio: "5022",
          nombre: "KARLA SOTO PICHARDO",
          domicilio: "CAMINO REAL 33",
          nombreAval: "VERÓNICA PICHARDO",
          domicilioAval: "REAL 35",
          pagoEsperado: 560.0,
          multa: "-",
          adeudoTotal: 1120.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 560.0,
          abonosParciales: 0,
          fechaDisp: "08/08/2025",
        },
        {
          folio: "5023",
          nombre: "ELSA MENDOZA LUNA",
          domicilio: "LAZARO CÁRDENAS 78",
          nombreAval: "EDUARDO LUNA",
          domicilioAval: "CÁRDENAS 79",
          pagoEsperado: 260.0,
          multa: "-",
          adeudoTotal: 520.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 260.0,
          abonosParciales: 0,
          fechaDisp: "01/08/2025",
        },
        {
          folio: "5024",
          nombre: "ROCÍO PALACIOS",
          domicilio: "LOS OLIVOS 15",
          nombreAval: "MARÍA PALACIOS",
          domicilioAval: "OLIVOS 15",
          pagoEsperado: 310.0,
          multa: "M15",
          adeudoTotal: 620.0,
          plazo: 14,
          pagosVdos: 1,
          cv: 0,
          cobroSemana: 310.0,
          abonosParciales: 0,
          fechaDisp: "01/08/2025",
        },
        {
          folio: "5025",
          nombre: "NURIA GALINDO",
          domicilio: "HEROICO COLEGIO MILITAR 6",
          nombreAval: "ALBERTO GALINDO",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 90.0,
          multa: "-",
          adeudoTotal: 180.0,
          plazo: 10,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 90.0,
          abonosParciales: 0,
          fechaDisp: "01/08/2025",
        },
      ],
    },
    {
      id: 5,
      name: "SANTIAGO DE QUERÉTARO (CENTRO)",
      route: "RUTA 1",
      coordinator: "CYNTHIA MARTÍNEZ",
      coordinatorAddress: "MADERO 100",
      coordinatorPhone: "442 550 8890",
      coordinatorBirthday: "09/09",
      day: "MARTES",
      date: "02/09/2025",
      activeClients: 3,
      weeklyCollection: 780.0,
      totalCV: 0.0,
      totalSheet: 780.0,
      assignedTo: "CYNTHIA M.",
      clients: [
        {
          folio: "1020",
          nombre: "PAOLA FRAGA",
          domicilio: "JUÁREZ 10",
          nombreAval: "RAÚL FRAGA",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 260.0,
          multa: "-",
          adeudoTotal: 520.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 260.0,
          abonosParciales: 0,
          fechaDisp: "05/08/2025",
        },
        {
          folio: "1021",
          nombre: "IRENE GALVÁN",
          domicilio: "CORREGIDORA 45",
          nombreAval: "BRUNO GALVÁN",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 260.0,
          multa: "-",
          adeudoTotal: 520.0,
          plazo: 14,
          pagosVdos: 0,
          cv: 0,
          cobroSemana: 260.0,
          abonosParciales: 0,
          fechaDisp: "05/08/2025",
        },
        {
          folio: "1022",
          nombre: "ELVIA ROJAS",
          domicilio: "ZARAGOZA 220",
          nombreAval: "MARTA ROJAS",
          domicilioAval: "MISMO DOM.",
          pagoEsperado: 260.0,
          multa: "M15",
          adeudoTotal: 780.0,
          plazo: 14,
          pagosVdos: 1,
          cv: 0,
          cobroSemana: 260.0,
          abonosParciales: 0,
          fechaDisp: "05/08/2025",
        },
      ],
    },
  ];

  // Filter populations based on user role
  const availablePopulations = useMemo(() => {
    if (userRole === "administrator") {
      return allPopulations;
    } else {
      // For capturista, only show populations assigned to them
      return allPopulations.filter((pop) => pop.assignedTo === userName);
    }
  }, [userRole, userName]);

  // Get sorted populations
  const sortedPopulations = useMemo(() => {
    const sorted = [...availablePopulations].sort((a, b) => {
      let aValue, bValue;

      switch (populationSortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "clients":
          aValue = a.activeClients;
          bValue = b.activeClients;
          break;
        case "amount":
          aValue = a.weeklyCollection;
          bValue = b.weeklyCollection;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return populationSortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return populationSortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [availablePopulations, populationSortBy, populationSortDirection]);

  // Handle population selection
  const handlePopulationSelect = (population: any) => {
    setSelectedPopulation(population);
    setPopulationClients(population.clients);
    setIsPopulationDialogOpen(true);
    // Prevent body scroll when modal opens
    document.body.classList.add("modal-open");
  };

  // Handle modal close
  const handleModalClose = (open: boolean) => {
    setIsPopulationDialogOpen(open);
    if (!open) {
      // Re-enable body scroll when modal closes
      document.body.classList.remove("modal-open");
    }
  };

  // Handle population sort
  const handlePopulationSort = (sortBy: "name" | "clients" | "amount") => {
    if (populationSortBy === sortBy) {
      setPopulationSortDirection(
        populationSortDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setPopulationSortBy(sortBy);
      setPopulationSortDirection("asc");
    }
  };

  // Organized menu sections for intuitive navigation
  const menuSections = [
    {
      title: "Operación",
      items: [
        {
          id: "dashboard" as ModuleType,
          icon: BarChart3,
          label: "Dashboard",
          shortcut: "⌘1",
        },
        {
          id: "clientes" as ModuleType,
          icon: Users,
          label: "Clientes",
          shortcut: "⌘2",
        },
        {
          id: "creditos" as ModuleType,
          icon: CreditCard,
          label: "Créditos",
          shortcut: "⌘3",
        },
        {
          id: "pagos" as ModuleType,
          icon: DollarSign,
          label: "Pagos",
          shortcut: "⌘4",
        },
      ],
    },
    {
      title: "Catálogos",
      items: [
        {
          id: "avales" as ModuleType,
          icon: UserCheck,
          label: "Avales",
          shortcut: "⌘5",
        },
        {
          id: "rutas" as ModuleType,
          icon: Route,
          label: "Rutas",
          shortcut: "⌘6",
        },
        {
          id: "poblaciones" as ModuleType,
          icon: Building,
          label: "Poblaciones",
          shortcut: "⌘7",
        },
      ],
    },
    {
      title: "Reportes",
      items: [
        {
          id: "reportes" as ModuleType,
          icon: FileText,
          label: "Reportes",
          shortcut: "⌘8",
        },
      ],
    },
    ...(userRole === "administrator"
      ? [
          {
            title: "Configuración",
            items: [
              {
                id: "reglas" as ModuleType,
                icon: Settings,
                label: "Reglas",
                shortcut: "⌘9",
              },
              {
                id: "usuarios" as ModuleType,
                icon: Shield,
                label: "Usuarios",
                shortcut: "⌘0",
              },
              {
                id: "auditoria" as ModuleType,
                icon: History,
                label: "Auditoría",
                shortcut: "⌘A",
              },
            ],
          },
        ]
      : []),
  ];

  const stats = [
    {
      title: "Clientes",
      value: "247",
      change: "+12",
      trend: "up",
      icon: Users,
    },
    {
      title: "Créditos Activos",
      value: "89",
      change: "+8",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Cobro Semanal",
      value: "$125,400",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Pagos Completos",
      value: "156",
      change: "Esta semana",
      trend: "neutral",
      icon: CheckCircle,
    },
  ];

  const sampleClients = [
    {
      folio: "BACH-2025-001",
      nombre: "Melissa Magaly Espinoza Guerrero",
      domicilio: "Librado Rendón Reyes 17",
      telefono: "4612983620",
      ruta: "RUTA 4",
      poblacion: "SAN JUAN DEL LLANITO",
      aval: "Hannia Nathalie García Villaseñor",
      estatus: "Activo",
      creditosActivos: 1,
      adeudoTotal: 320,
    },
    {
      folio: "BACH-2025-002",
      nombre: "Yolanda Benítez Briones",
      domicilio: "Faisán 7",
      telefono: "4612983621",
      ruta: "RUTA 4",
      poblacion: "SAN JUAN DEL LLANITO",
      aval: "Patricia Villaseñor Gaytán",
      estatus: "Activo",
      creditosActivos: 1,
      adeudoTotal: 320,
    },
    {
      folio: "BACH-2025-003",
      nombre: "María Elvia Aguilera Méndez",
      domicilio: "Av. Felipe Carrillo Puerto",
      telefono: "4612983622",
      ruta: "RUTA 4",
      poblacion: "SAN JUAN DEL LLANITO",
      aval: "María Guadalupe Centeno Espinosa",
      estatus: "Activo",
      creditosActivos: 1,
      adeudoTotal: 480,
    },
  ];

  // Memoized filtered and sorted data
  const filteredClients = useMemo(() => {
    let filtered = sampleClients.filter(
      (client) =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.folio.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const renderKPIs = () => (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-200 minimal-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-slate-400" />
                {stat.trend === "up" && (
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xl font-semibold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderPopulationList = () => (
    <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-medium flex items-center gap-2">
            <Building className="w-5 h-5" />
            Poblaciones
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handlePopulationSort("name")}
              className={`h-8 px-3 text-xs ${
                populationSortBy === "name"
                  ? "bg-baci-yellow/20 text-baci-yellow border-baci-yellow/30"
                  : "bg-slate-700/50 text-slate-300 border-slate-600/30"
              } hover:bg-baci-yellow/30 border focus-ring`}
            >
              Alfabeto
              {populationSortBy === "name" && (
                <ArrowUpDown
                  className={`w-3 h-3 ml-1 ${populationSortDirection === "desc" ? "rotate-180" : ""}`}
                />
              )}
            </Button>
            <Button
              onClick={() => handlePopulationSort("clients")}
              className={`h-8 px-3 text-xs ${
                populationSortBy === "clients"
                  ? "bg-baci-yellow/20 text-baci-yellow border-baci-yellow/30"
                  : "bg-slate-700/50 text-slate-300 border-slate-600/30"
              } hover:bg-baci-yellow/30 border focus-ring`}
            >
              Cuentas
              {populationSortBy === "clients" && (
                <ArrowUpDown
                  className={`w-3 h-3 ml-1 ${populationSortDirection === "desc" ? "rotate-180" : ""}`}
                />
              )}
            </Button>
            <Button
              onClick={() => handlePopulationSort("amount")}
              className={`h-8 px-3 text-xs ${
                populationSortBy === "amount"
                  ? "bg-baci-yellow/20 text-baci-yellow border-baci-yellow/30"
                  : "bg-slate-700/50 text-slate-300 border-slate-600/30"
              } hover:bg-baci-yellow/30 border focus-ring`}
            >
              Dinero
              {populationSortBy === "amount" && (
                <ArrowUpDown
                  className={`w-3 h-3 ml-1 ${populationSortDirection === "desc" ? "rotate-180" : ""}`}
                />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-80">
          {sortedPopulations.map((population) => (
            <button
              key={population.id}
              onClick={() => handlePopulationSelect(population)}
              className="w-full px-4 py-3 text-left hover:bg-slate-700/30 transition-colors border-b border-slate-700/20 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">
                    {population.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {population.route} • {population.coordinator}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {population.day} — {population.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {population.activeClients}
                      </p>
                      <p className="text-slate-400">clientes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">
                        ${population.weeklyCollection.toFixed(0)}
                      </p>
                      <p className="text-slate-400">semanal</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderPopulationHeader = () => {
    if (!selectedPopulation) return null;

    return (
      <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Population info */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Población: {selectedPopulation.name}
              </h2>
              <div className="text-sm text-slate-400">
                {selectedPopulation.day} — Fecha: {selectedPopulation.date}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Clientas activas:</span>
                <span className="ml-2 text-white font-medium">
                  {selectedPopulation.activeClients}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Cobro semanal:</span>
                <span className="ml-2 text-white font-medium">
                  ${selectedPopulation.weeklyCollection.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Total de C.V.:</span>
                <span className="ml-2 text-white font-medium">
                  ${selectedPopulation.totalCV.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Ficha total:</span>
                <span className="ml-2 text-white font-medium">
                  ${selectedPopulation.totalSheet.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coordinator info */}
            {userRole === "administrator" && (
              <div className="pt-4 border-t border-slate-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Coord.:</span>
                    <span className="ml-2 text-white font-medium">
                      {selectedPopulation.coordinator}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Domicilio:</span>
                    <span className="ml-2 text-white">
                      {selectedPopulation.coordinatorAddress}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tel:</span>
                    <span className="ml-2 text-white">
                      {selectedPopulation.coordinatorPhone}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Cumpleaños:</span>
                    <span className="ml-2 text-white">
                      {selectedPopulation.coordinatorBirthday}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-sm">
              <span className="text-slate-400">Ruta:</span>
              <span className="ml-2 text-baci-yellow font-medium">
                {selectedPopulation.route}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPopulationTable = () => {
    if (!selectedPopulation || populationClients.length === 0) {
      return (
        <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Building className="w-16 h-16 text-slate-600" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {selectedPopulation
                    ? "Sin clientes"
                    : "Selecciona una población"}
                </h3>
                <p className="text-slate-400">
                  {selectedPopulation
                    ? "Esta población no tiene clientes registrados"
                    : "Usa el buscador para encontrar y seleccionar una población"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow">
        <CardContent className="p-0">
          <div className="overflow-auto table-scrollbar max-h-96">
            <table className="w-full text-xs">
              <thead className="sticky-header">
                <tr className="border-b border-slate-700/30">
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[100px]">
                    NO. DE CRÉDITO / FOLIO
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[200px]">
                    NOMBRE DEL CLIENTE
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[150px]">
                    DOMICILIO
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[150px]">
                    NOMBRE DEL AVAL
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[150px]">
                    DOMICILIO AVAL
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    PAGO (esperado semana)
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[60px]">
                    MULTA (M15 o "-")
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    ADEUDO TOTAL
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[60px]">
                    PLAZO
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    PAGOS VDOS.
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[60px]">
                    C.V.
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    COBRO DE LA SEMANA
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    ABONOS PARCIALES
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-slate-300 min-w-[80px]">
                    FECHA DE DISP.
                  </th>
                </tr>
              </thead>
              <tbody>
                {populationClients.map((client, index) => (
                  <tr
                    key={client.folio}
                    className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-2 py-3 text-xs font-medium text-white">
                      {client.folio}
                    </td>
                    <td className="px-2 py-3 text-xs text-white">
                      {client.nombre}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300">
                      {client.domicilio}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300">
                      {client.nombreAval}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300">
                      {client.domicilioAval}
                    </td>
                    <td className="px-2 py-3 text-xs font-medium text-white">
                      ${client.pagoEsperado.toFixed(2)}
                    </td>
                    <td className="px-2 py-3 text-xs text-center">
                      <span
                        className={`${client.multa === "M15" ? "text-red-400 font-medium" : "text-slate-400"}`}
                      >
                        {client.multa}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs font-medium text-white">
                      ${client.adeudoTotal.toFixed(2)}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300 text-center">
                      {client.plazo}
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300 text-center">
                      {client.pagosVdos}
                    </td>
                    <td className="px-2 py-3 text-xs font-medium text-white">
                      ${client.cv.toFixed(2)}
                    </td>
                    <td className="px-2 py-3 text-xs font-medium text-white">
                      ${client.cobroSemana.toFixed(2)}
                    </td>
                    <td className="px-2 py-3 text-xs font-medium">
                      <span
                        className={
                          client.abonosParciales > 0
                            ? "text-green-400"
                            : "text-slate-400"
                        }
                      >
                        ${client.abonosParciales.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-slate-300">
                      {client.fechaDisp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderTable = () => (
    <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg font-medium flex items-center gap-2">
          <Users className="w-5 h-5" />
          Clientes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto table-scrollbar max-h-96">
          <table className="w-full">
            <thead className="sticky-header">
              <tr className="border-b border-slate-700/30">
                <th className="sticky-column px-4 py-3 text-left text-sm font-medium text-slate-300">
                  <button
                    onClick={() => handleSort("folio")}
                    className="flex items-center gap-1 hover:text-white transition-colors focus-ring"
                  >
                    Folio
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                  <button
                    onClick={() => handleSort("nombre")}
                    className="flex items-center gap-1 hover:text-white transition-colors focus-ring"
                  >
                    Cliente
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                  Ruta
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                  <button
                    onClick={() => handleSort("adeudoTotal")}
                    className="flex items-center gap-1 hover:text-white transition-colors focus-ring"
                  >
                    Adeudo
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-12 h-12 text-slate-600" />
                      <div>
                        <p className="text-slate-400 font-medium mb-1">
                          No se encontraron clientes
                        </p>
                        <p className="text-sm text-slate-500">
                          Intenta ajustar los filtros de búsqueda
                        </p>
                      </div>
                      <Button className="bg-baci-yellow/20 hover:bg-baci-yellow/30 text-baci-yellow border border-baci-yellow/30">
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Cliente
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr
                    key={client.folio}
                    className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="sticky-column px-4 py-3 text-sm font-medium text-white">
                      {client.folio}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {client.nombre}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {client.domicilio}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {client.ruta}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-white">
                      ${client.adeudoTotal.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-transparent hover:bg-slate-700/50 text-slate-400 hover:text-white border-0 focus-ring"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 bg-transparent hover:bg-slate-700/50 text-slate-400 hover:text-white border-0 focus-ring"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        {userRole === "administrator" && (
                          <Button
                            size="sm"
                            className="h-7 w-7 p-0 bg-transparent hover:bg-red-500/20 text-slate-400 hover:text-red-400 border-0 focus-ring"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {renderKPIs()}

            {/* Quick Actions */}
            <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg font-medium flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  <Button className="h-16 flex flex-col gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 focus-ring">
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">Cliente</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 focus-ring">
                    <CreditCardIcon className="w-5 h-5" />
                    <span className="text-sm">Crédito</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 focus-ring">
                    <Banknote className="w-5 h-5" />
                    <span className="text-sm">Pago</span>
                  </Button>
                  <Button className="h-16 flex flex-col gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 focus-ring">
                    <Receipt className="w-5 h-5" />
                    <span className="text-sm">Anexo</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "clientes":
        return renderTable();

      case "poblaciones":
        return <div className="space-y-6">{renderPopulationList()}</div>;

      default:
        return (
          <Card className="bg-slate-800/40 border-slate-700/30 backdrop-blur-sm minimal-shadow">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center">
                  <Settings className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Módulo en Desarrollo
                  </h3>
                  <p className="text-slate-400">
                    Este módulo estará disponible próximamente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  const getModuleTitle = () => {
    for (const section of menuSections) {
      const item = section.items.find((item) => item.id === activeModule);
      if (item) return item.label;
    }
    return "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baci-darker via-baci-dark to-slate-900 custom-scrollbar">
      {/* Population Details Dialog */}
      <Dialog open={isPopulationDialogOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-5xl w-[90vw] max-h-[85vh] h-[80vh] bg-slate-800/95 backdrop-blur-xl border border-slate-700/40 text-white shadow-2xl overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-800/60 backdrop-blur-xl rounded-lg -z-10"></div>

          {/* Fixed Header */}
          <DialogHeader className="flex-shrink-0 sticky top-0 z-20 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/30 -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
            <DialogTitle className="text-xl font-semibold text-white pr-8">
              {selectedPopulation?.name || "Detalles de Población"}
              {selectedPopulation && (
                <div className="text-sm font-normal text-slate-300 mt-1">
                  Coordinadora: {selectedPopulation.coordinator}
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto population-modal-scrollbar px-1 py-4">
            {selectedPopulation && (
              <div className="space-y-6 relative z-10">
                {/* Population Header Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      {selectedPopulation.day} — Fecha:{" "}
                      {selectedPopulation.date}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Clientas activas:</span>
                      <span className="ml-2 text-white font-medium">
                        {selectedPopulation.activeClients}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Cobro semanal:</span>
                      <span className="ml-2 text-white font-medium">
                        ${selectedPopulation.weeklyCollection.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Total de C.V.:</span>
                      <span className="ml-2 text-white font-medium">
                        ${selectedPopulation.totalCV.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Ficha total:</span>
                      <span className="ml-2 text-white font-medium">
                        ${selectedPopulation.totalSheet.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Coordinator info */}
                  {userRole === "administrator" && (
                    <div className="pt-4 border-t border-slate-700/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Coord.:</span>
                          <span className="ml-2 text-white font-medium">
                            {selectedPopulation.coordinator}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Domicilio:</span>
                          <span className="ml-2 text-white">
                            {selectedPopulation.coordinatorAddress}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tel:</span>
                          <span className="ml-2 text-white">
                            {selectedPopulation.coordinatorPhone}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Cumpleaños:</span>
                          <span className="ml-2 text-white">
                            {selectedPopulation.coordinatorBirthday}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-sm">
                    <span className="text-slate-400">Ruta:</span>
                    <span className="ml-2 text-baci-yellow font-medium">
                      {selectedPopulation.route}
                    </span>
                  </div>
                </div>

                {/* Population Table */}
                {populationClients.length > 0 ? (
                  <div className="bg-slate-800/20 border border-slate-700/20 rounded-lg backdrop-blur-sm flex-1">
                    <div className="overflow-auto population-table-scrollbar h-full">
                      <table
                        className="w-full text-sm"
                        style={{ minWidth: "1600px" }}
                      >
                        <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-xl z-10">
                          <tr className="border-b border-slate-700/40">
                            <th className="sticky left-0 bg-slate-900/95 backdrop-blur-xl px-4 py-4 text-left text-sm font-medium text-slate-300 border-r border-slate-700/30 min-w-[120px] z-20">
                              FOLIO
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[220px]">
                              CLIENTE
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[180px]">
                              DOMICILIO
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[180px]">
                              AVAL
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[180px]">
                              DOM. AVAL
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[100px]">
                              PAGO
                            </th>
                            <th className="px-4 py-4 text-center text-sm font-medium text-slate-300 min-w-[80px]">
                              MULTA
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[100px]">
                              ADEUDO
                            </th>
                            <th className="px-4 py-4 text-center text-sm font-medium text-slate-300 min-w-[80px]">
                              PLAZO
                            </th>
                            <th className="px-4 py-4 text-center text-sm font-medium text-slate-300 min-w-[90px]">
                              P. VDOS
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[80px]">
                              C.V.
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[100px]">
                              COBRO
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[100px]">
                              ABONOS
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-slate-300 min-w-[100px]">
                              FECHA
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {populationClients.map((client, index) => (
                            <tr
                              key={client.folio}
                              className="border-b border-slate-700/10 hover:bg-slate-700/20 transition-colors duration-150"
                              style={{ minHeight: "40px" }}
                            >
                              <td className="sticky left-0 bg-slate-800/90 backdrop-blur-xl px-4 py-4 text-sm font-medium text-white border-r border-slate-700/20 z-10">
                                {client.folio}
                              </td>
                              <td className="px-4 py-4 text-sm text-white font-medium">
                                {client.nombre}
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300">
                                {client.domicilio}
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300">
                                {client.nombreAval}
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300">
                                {client.domicilioAval}
                              </td>
                              <td className="px-4 py-4 text-sm font-semibold text-baci-yellow">
                                ${client.pagoEsperado.toFixed(0)}
                              </td>
                              <td className="px-4 py-4 text-sm text-center">
                                <span
                                  className={`px-2 py-1 rounded text-sm font-medium ${
                                    client.multa === "M15"
                                      ? "bg-red-500/20 text-red-400"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {client.multa}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm font-semibold text-white">
                                ${client.adeudoTotal.toFixed(0)}
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300 text-center">
                                {client.plazo}
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300 text-center">
                                {client.pagosVdos}
                              </td>
                              <td className="px-4 py-4 text-sm font-semibold text-white">
                                ${client.cv.toFixed(0)}
                              </td>
                              <td className="px-4 py-4 text-sm font-semibold text-white">
                                ${client.cobroSemana.toFixed(0)}
                              </td>
                              <td className="px-4 py-4 text-sm font-semibold">
                                <span
                                  className={
                                    client.abonosParciales > 0
                                      ? "text-green-400"
                                      : "text-slate-400"
                                  }
                                >
                                  ${client.abonosParciales.toFixed(0)}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-300">
                                {client.fechaDisp}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 px-6">
                    <div className="bg-slate-800/40 border border-slate-700/30 rounded-lg backdrop-blur-sm p-8">
                      <Building className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg">
                        Esta población no tiene clientes registrados
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/30 z-40 overflow-hidden transition-all duration-200 ease-out ${
          sidebarCollapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-baci-yellow to-baci-yellow-matte rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-baci-darker" />
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-white">BACI</h1>
                    <p className="text-xs text-slate-400">Sistema</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 p-0 bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white border-0 focus-ring"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="space-y-6 custom-scrollbar overflow-y-auto max-h-[calc(100vh-200px)]">
            {menuSections.map((section) => (
              <div key={section.title}>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 px-2"
                    >
                      {section.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => setActiveModule(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 focus-ring group ${
                          isActive
                            ? "bg-baci-yellow/20 text-baci-yellow border border-baci-yellow/30"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <AnimatePresence>
                          {!sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="flex items-center justify-between flex-1 overflow-hidden"
                            >
                              <span className="text-sm font-medium truncate">
                                {item.label}
                              </span>
                              <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.shortcut}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="absolute bottom-4 left-4 right-4">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="bg-slate-800/60 rounded-lg p-3 mb-3"
                >
                  <p className="text-sm font-medium text-white mb-1">
                    {userRole === "administrator" ? "Admin" : userName}
                  </p>
                  <p className="text-xs text-slate-400">Sistema activo</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              onClick={onLogout}
              className={`${sidebarCollapsed ? "w-8 h-8 p-0" : "w-full"} bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 focus-ring`}
              title={sidebarCollapsed ? "Cerrar Sesión" : undefined}
            >
              <LogOut className="w-4 h-4" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="ml-2 text-sm"
                  >
                    Cerrar Sesión
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-200 ease-out ${
          sidebarCollapsed ? "ml-16" : "ml-60"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white mb-1">
                  {getModuleTitle()}
                </h1>
                <p className="text-sm text-slate-400">ARRENDAMIENTOS BACI</p>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                {activeModule !== "poblaciones" && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-800/60 border-slate-700/30 text-white placeholder:text-slate-400 w-64 h-9 focus-ring"
                    />
                  </div>
                )}
                <Button className="h-9 bg-baci-yellow/20 hover:bg-baci-yellow/30 text-baci-yellow border border-baci-yellow/30 focus-ring">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
                <Button className="h-9 bg-slate-800/60 hover:bg-slate-800/80 text-slate-300 border border-slate-700/30 focus-ring">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button className="h-9 bg-slate-800/60 hover:bg-slate-800/80 text-slate-300 border border-slate-700/30 focus-ring">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderModuleContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
