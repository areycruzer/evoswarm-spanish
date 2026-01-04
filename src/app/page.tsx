"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Dna,
  Zap,
  TrendingUp,
  ArrowRight,
  Activity,
  Coins,
  Users,
  RefreshCw,
  Shield,
  Gauge,
  Globe,
  Lock,
  ChevronRight,
  Hexagon,
  ArrowRightLeft,
  Sparkles,
  FileSearch,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Agent {
  id: string;
  name: string;
  generation: number;
  resiliencia: number;
  velocidad: number;
  fitness: number;
  dna: string;
}

interface BreedingEvent {
  id: string;
  parent1: string;
  parent2: string;
  offspring: string;
  timestamp: Date;
  resilienciaGain: number;
  velocidadGain: number;
}

interface AuditLog {
  id: string;
  action: string;
  contract: string;
  status: "verified" | "pending";
  timestamp: Date;
  hash: string;
}

interface PathNode {
  currency: string;
  amount: number;
  country: string;
  flag: string;
}

interface Route {
  id: string;
  nodes: PathNode[];
  slippage: number;
  fee: number;
  selected: boolean;
}

interface StakePool {
  id: string;
  name: string;
  agents: number;
  totalStaked: number;
  apy: number;
  performance: number;
}

const generateHash = (prefix = "0x") => {
  const chars = "0123456789abcdef";
  let hash = prefix;
  for (let i = 0; i < 8; i++) {
    hash += chars[Math.floor(Math.random() * 16)];
  }
  return hash + "...";
};

const generateDNA = () => {
  const bases = ["A", "T", "G", "C", "X", "Y"];
  let dna = "";
  for (let i = 0; i < 16; i++) {
    dna += bases[Math.floor(Math.random() * bases.length)];
  }
  return dna;
};

const agentNames = [
  "Quetzal-α",
  "Condor-β",
  "Jaguar-γ",
  "Puma-δ",
  "Aguila-ε",
  "Serpiente-ζ",
  "Colibri-η",
  "Mariposa-θ",
  "Lobo-ι",
  "Oso-κ",
];

const Sparkline = ({ data, positive }: { data: number[]; positive: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;
  
  const points = useMemo(() => {
    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, min, range]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-24 h-8 overflow-visible">
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        points={points}
        fill="none"
        stroke={positive ? "#00f5d4" : "#ff6b35"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_4px_rgba(0,245,212,0.5)]"
      />
    </svg>
  );
};

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [breedingEvents, setBreedingEvents] = useState<BreedingEvent[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stakePools, setStakePools] = useState<StakePool[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [networkSavings, setNetworkSavings] = useState(847523);
  const [activeAgents, setActiveAgents] = useState(1024);
  const [efficiencyGain, setEfficiencyGain] = useState(18.5);
  const [isSimulating, setIsSimulating] = useState(false);
  const [proofOfEvolution, setProofOfEvolution] = useState("");
  const [sparklineData, setSparklineData] = useState({
    ars: [100, 95, 102, 98, 110, 105, 115, 108, 120, 118],
    clp: [50, 52, 48, 55, 53, 58, 56, 60, 57, 62],
    mxn: [17, 17.2, 16.8, 17.5, 17.3, 17.8, 17.4, 18, 17.6, 17.9],
    efficiency: [12, 13, 15, 14, 16, 17, 18, 17, 18.5, 18.5],
  });

  const initializeData = useCallback(() => {
    const initialAgents: Agent[] = Array.from({ length: 6 }, (_, i) => ({
      id: generateHash(),
      name: agentNames[i % agentNames.length],
      generation: Math.floor(Math.random() * 50) + 1,
      resiliencia: Math.floor(Math.random() * 40) + 60,
      velocidad: Math.floor(Math.random() * 40) + 60,
      fitness: Math.floor(Math.random() * 30) + 70,
      dna: generateDNA(),
    }));
    setAgents(initialAgents);

    const initialRoutes: Route[] = [
      {
        id: "route-1",
        nodes: [
          { currency: "USD", amount: 1000, country: "Estados Unidos", flag: "🇺🇸" },
          { currency: "XLM", amount: 8547.32, country: "Stellar Network", flag: "⭐" },
          { currency: "USDC", amount: 999.50, country: "Circle", flag: "🔵" },
          { currency: "ARST", amount: 924500, country: "Argentina", flag: "🇦🇷" },
        ],
        slippage: 0.12,
        fee: 0.001,
        selected: true,
      },
      {
        id: "route-2",
        nodes: [
          { currency: "USD", amount: 1000, country: "Estados Unidos", flag: "🇺🇸" },
          { currency: "XLM", amount: 8547.32, country: "Stellar Network", flag: "⭐" },
          { currency: "CLPX", amount: 925000, country: "Chile", flag: "🇨🇱" },
        ],
        slippage: 0.18,
        fee: 0.002,
        selected: false,
      },
      {
        id: "route-3",
        nodes: [
          { currency: "USD", amount: 1000, country: "Estados Unidos", flag: "🇺🇸" },
          { currency: "USDC", amount: 999.80, country: "Circle", flag: "🔵" },
          { currency: "MXN", amount: 17850, country: "México", flag: "🇲🇽" },
        ],
        slippage: 0.25,
        fee: 0.003,
        selected: false,
      },
    ];
    setRoutes(initialRoutes);

    const initialPools: StakePool[] = [
      { id: "pool-1", name: "Swarm Andino", agents: 256, totalStaked: 125000, apy: 12.5, performance: 94 },
      { id: "pool-2", name: "Swarm Azteca", agents: 384, totalStaked: 187500, apy: 15.2, performance: 89 },
      { id: "pool-3", name: "Swarm Austral", agents: 192, totalStaked: 95000, apy: 10.8, performance: 97 },
    ];
    setStakePools(initialPools);

    const initialAudit: AuditLog[] = [
      {
        id: "log-1",
        action: "Verificación de Agente Evolutivo",
        contract: "soroban_evo_verify_v2",
        status: "verified",
        timestamp: new Date(),
        hash: generateHash("G"),
      },
      {
        id: "log-2",
        action: "Liquidación de Remesa Cross-Border",
        contract: "soroban_settle_main",
        status: "verified",
        timestamp: new Date(Date.now() - 3600000),
        hash: generateHash("G"),
      },
      {
        id: "log-3",
        action: "Actualización de Oráculo de Inflación",
        contract: "soroban_oracle_latam",
        status: "verified",
        timestamp: new Date(Date.now() - 7200000),
        hash: generateHash("G"),
      },
    ];
    setAuditLogs(initialAudit);
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparklineData((prev) => ({
        ars: [...prev.ars.slice(1), prev.ars[prev.ars.length - 1] + (Math.random() * 4 - 2)],
        clp: [...prev.clp.slice(1), prev.clp[prev.clp.length - 1] + (Math.random() * 2 - 1)],
        mxn: [...prev.mxn.slice(1), prev.mxn[prev.mxn.length - 1] + (Math.random() * 0.4 - 0.2)],
        efficiency: [...prev.efficiency.slice(1), prev.efficiency[prev.efficiency.length - 1] + (Math.random() * 0.2 - 0.1)],
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (agents.length >= 2 && Math.random() > 0.6) {
        const parent1 = agents[Math.floor(Math.random() * agents.length)];
        const parent2 = agents[Math.floor(Math.random() * agents.length)];
        if (parent1.id !== parent2.id) {
          const offspringName = `${parent1.name.split("-")[0]}-${parent2.name.split("-")[1]}`;
          const newEvent: BreedingEvent = {
            id: generateHash(),
            parent1: parent1.name,
            parent2: parent2.name,
            offspring: offspringName,
            timestamp: new Date(),
            resilienciaGain: Math.floor(Math.random() * 5) + 1,
            velocidadGain: Math.floor(Math.random() * 5) + 1,
          };
          setBreedingEvents((prev) => [newEvent, ...prev.slice(0, 4)]);

          const newAudit: AuditLog = {
            id: generateHash("L"),
            action: `Evolución: ${offspringName}`,
            contract: "soroban_breeding_engine",
            status: "verified",
            timestamp: new Date(),
            hash: generateHash("G"),
          };
          setAuditLogs((prev) => [newAudit, ...prev.slice(0, 9)]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [agents]);

  const simulateEvolution = () => {
    setIsSimulating(true);
    setProofOfEvolution("");

    setTimeout(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          generation: agent.generation + 1,
          resiliencia: Math.min(100, agent.resiliencia + Math.floor(Math.random() * 8) + 2),
          velocidad: Math.min(100, agent.velocidad + Math.floor(Math.random() * 8) + 2),
          fitness: Math.min(100, agent.fitness + Math.floor(Math.random() * 5) + 3),
          dna: generateDNA(),
        }))
      );

      setNetworkSavings((prev) => prev + Math.floor(Math.random() * 5000) + 1000);
      setActiveAgents((prev) => prev + Math.floor(Math.random() * 32) + 8);
      const newEfficiency = Math.min(35, efficiencyGain + Math.random() * 2 + 0.5);
      setEfficiencyGain(newEfficiency);

      const memo = `EVO:${generateDNA()}:GEN${Date.now() % 1000}:FIT${Math.floor(Math.random() * 30) + 70}`;
      setProofOfEvolution(memo);

      const bulkAudit: AuditLog = {
        id: generateHash("L"),
        action: "Optimización Masiva de Swarm",
        contract: "soroban_swarm_optimizer",
        status: "verified",
        timestamp: new Date(),
        hash: generateHash("G"),
      };
      setAuditLogs((prev) => [bulkAudit, ...prev.slice(0, 9)]);

      setIsSimulating(false);
    }, 2000);
  };

  const exportReport = () => {
    const reportDate = new Date().toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const reportContent = `
EVOSWARM - INFORME ESTRATÉGICO PARA INVERSORES (CICLO 2026)
---------------------------------------------------------
Fecha: ${reportDate}
Estado de Red: Mainnet Activa (Protocol v32)
Jurisdicciones: Argentina, Chile, México

RESUMEN EJECUTIVO:
- Ahorros Netos Generados: $${networkSavings.toLocaleString()} USD
- Eficiencia de Remesas: +${efficiencyGain.toFixed(1)}% vs. Bancos Tradicionales
- Agentes Evolutivos Activos: ${activeAgents.toLocaleString()}
- Transacciones Verificadas (Soroban): ${auditLogs.length + 1250} (Ciclo Actual)

ANÁLISIS POR REGIÓN:
- Argentina (ARST): Mitigación de volatilidad del 98.2% mediante Path Payments.
- Chile (CLPX): Reducción de costos de transacción a <0.001 XLM.
- México (MXN): Liquidación instantánea vía Corredores de Liquidez Swarm.

DNA DEL SWARM:
Última Prueba de Evolución: ${proofOfEvolution || "Verificada en Ledger"}
Nivel de Fitness Promedio: ${Math.floor(
      agents.reduce((acc, a) => acc + a.fitness, 0) / agents.length
    )}%

Certificado mediante Soroban Smart Contracts.
---------------------------------------------------------
EvoSwarm: Evolutionary AI on Stellar Blockchain.
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `EvoSwarm_Reporte_Inversores_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark min-h-screen bg-[#0a0f1a] text-[#e8f4f8] grid-bg overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f5d4]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-[#00f5d4]/5 rounded-full blur-3xl animate-float" />
      </div>

      <nav className="glass sticky top-0 z-50 border-b border-[#00f5d4]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Hexagon className="w-10 h-10 text-[#00f5d4]" strokeWidth={1.5} />
                <Dna className="w-5 h-5 text-[#00f5d4] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight neon-text">EvoSwarm</span>
                <span className="ml-2 text-xs text-[#8899a6]">Stellar Protocol</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-sm text-[#8899a6]">
                <Globe className="w-4 h-4" />
                <span>LATAM 2026</span>
              </div>
              <Badge variant="outline" className="border-[#00f5d4]/30 text-[#00f5d4] bg-[#00f5d4]/10">
                Red Principal
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="text-[#00f5d4] neon-text">Panel de Control</span>
              </h1>
              <p className="text-[#8899a6]">
                Optimización evolutiva de remesas para Chile, Argentina y México
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={exportReport}
                variant="outline"
                className="border-[#00f5d4]/30 text-[#00f5d4] hover:bg-[#00f5d4]/10 font-semibold transition-all duration-300"
              >
                <FileText className="w-4 h-4 mr-2" />
                Exportar Informe
              </Button>
              <Button
                onClick={simulateEvolution}
                disabled={isSimulating}
                className="bg-[#00f5d4] text-[#0a0f1a] hover:bg-[#00f5d4]/90 font-semibold neon-glow transition-all duration-300"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Evolucionando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Simular Evolución
                  </>
                )}
              </Button>
            </div>
          </div>

          {proofOfEvolution && (
            <div className="glass-card rounded-xl p-4 mb-6 border-[#00f5d4]/30 neon-glow animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#00f5d4]" />
                <div>
                  <span className="text-sm text-[#8899a6]">Proof of Evolution (Memo Stellar):</span>
                  <code className="ml-2 text-[#00f5d4] font-mono text-sm bg-[#0a0f1a]/50 px-2 py-1 rounded">
                    {proofOfEvolution}
                  </code>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#00f5d4]/10">
                  <Coins className="w-6 h-6 text-[#00f5d4]" />
                </div>
                <Badge className="bg-[#00f5d4]/20 text-[#00f5d4] border-0">+12.3%</Badge>
              </div>
              <p className="text-[#8899a6] text-sm mb-1">Ahorros de Red</p>
              <p className="text-3xl font-bold tracking-tight">
                ${networkSavings.toLocaleString()}
                <span className="text-lg text-[#8899a6] ml-1">USD</span>
              </p>
              <p className="text-xs text-[#8899a6] mt-2">Protegidos contra la inflación</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#00f5d4]/10">
                  <Users className="w-6 h-6 text-[#00f5d4]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#00f5d4] rounded-full animate-pulse" />
                  <span className="text-xs text-[#8899a6]">En línea</span>
                </div>
              </div>
              <p className="text-[#8899a6] text-sm mb-1">Agentes Activos</p>
              <p className="text-3xl font-bold tracking-tight">
                {activeAgents.toLocaleString()}
                <span className="text-lg text-[#8899a6] ml-1">IA</span>
              </p>
              <p className="text-xs text-[#8899a6] mt-2">Optimizando rutas 24/7</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#00f5d4]/10">
                  <TrendingUp className="w-6 h-6 text-[#00f5d4]" />
                </div>
                <Sparkline data={sparklineData.efficiency} positive />
              </div>
              <p className="text-[#8899a6] text-sm mb-1">Ganancia de Eficiencia</p>
              <p className="text-3xl font-bold tracking-tight">
                +{efficiencyGain.toFixed(1)}
                <span className="text-lg text-[#00f5d4] ml-1">%</span>
              </p>
              <p className="text-xs text-[#8899a6] mt-2">vs. métodos tradicionales</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#00f5d4]/10">
                <Dna className="w-5 h-5 text-[#00f5d4]" />
              </div>
              <h2 className="text-xl font-semibold">Visualizador de Evolución</h2>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-3 max-h-[400px] overflow-y-auto">
              <AnimatePresence initial={false}>
                {breedingEvents.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-[#8899a6]"
                  >
                    <Dna className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Esperando eventos de reproducción...</p>
                    <p className="text-sm mt-1">Los agentes evolucionan automáticamente</p>
                  </motion.div>
                ) : (
                  breedingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-xl bg-[#0a0f1a]/50 border border-[#00f5d4]/10 hover:border-[#00f5d4]/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[#00f5d4] font-mono text-xs">{event.id}</span>
                          <Badge className="bg-[#00f5d4]/20 text-[#00f5d4] text-[10px] border-0">
                            VERIFICADO SOROBAN
                          </Badge>
                        </div>
                        <span className="text-[10px] text-[#8899a6]">
                          {event.timestamp.toLocaleTimeString("es-CL")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-[#1b3a4b] rounded text-[#e8f4f8]">
                          {event.parent1}
                        </span>
                        <ArrowRightLeft className="w-4 h-4 text-[#00f5d4]" />
                        <span className="px-2 py-1 bg-[#1b3a4b] rounded text-[#e8f4f8]">
                          {event.parent2}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#8899a6]" />
                        <span className="px-2 py-1 bg-[#00f5d4]/20 rounded text-[#00f5d4] font-medium">
                          {event.offspring}
                        </span>
                      </div>

                      <div className="flex gap-4 mt-3 text-xs">
                        <span className="text-[#00f5d4]">
                          Resiliencia +{event.resilienciaGain}%
                        </span>
                        <span className="text-[#00f5d4]">
                          Velocidad +{event.velocidadGain}%
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-[#8899a6] mb-3">Agentes del Swarm</h3>
              <div className="grid grid-cols-2 gap-3">
                {agents.slice(0, 4).map((agent) => (
                  <div
                    key={agent.id}
                    className="glass-card rounded-xl p-4 hover:border-[#00f5d4]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{agent.name}</span>
                      <span className="text-[10px] text-[#8899a6]">Gen {agent.generation}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-[#8899a6]">Fitness</span>
                          <span className="text-[#00f5d4]">{agent.fitness}%</span>
                        </div>
                        <Progress value={agent.fitness} className="h-1.5 bg-[#1b2838]" />
                      </div>
                      <code className="text-[8px] text-[#8899a6] font-mono block truncate">
                        DNA: {agent.dna}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#00f5d4]/10">
                <Zap className="w-5 h-5 text-[#00f5d4]" />
              </div>
              <h2 className="text-xl font-semibold">Optimizador de Rutas</h2>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <p className="text-sm font-medium">USD 1,000</p>
                      <p className="text-[10px] text-[#8899a6]">Origen</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#00f5d4]" />
                  <div className="text-right">
                    <p className="text-sm text-[#8899a6]">Destino</p>
                    <p className="text-[10px] text-[#00f5d4]">Mejor ruta seleccionada por IA</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-4 rounded-xl transition-all cursor-pointer ${
                      route.selected
                        ? "bg-[#00f5d4]/10 border-2 border-[#00f5d4]/50 neon-glow"
                        : "bg-[#0a0f1a]/50 border border-[#1b3a4b] hover:border-[#00f5d4]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {route.selected && (
                          <Badge className="bg-[#00f5d4] text-[#0a0f1a] text-[10px]">
                            ÓPTIMA
                          </Badge>
                        )}
                        <span className="text-xs text-[#8899a6]">
                          Slippage: {route.slippage}%
                        </span>
                      </div>
                      <span className="text-xs text-[#8899a6]">
                        Fee: {route.fee} XLM
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {route.nodes.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1b2838] rounded-lg">
                            <span>{node.flag}</span>
                            <div className="text-xs">
                              <span className="font-medium">{node.currency}</span>
                              <span className="text-[#8899a6] ml-1">
                                {node.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {idx < route.nodes.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-[#00f5d4]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 bg-[#0a0f1a]/50 rounded-xl">
                <h4 className="text-sm font-medium mb-3 text-[#00f5d4]">Volatilidad Dinámica (Real-time)</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span>🇦🇷</span>
                      <span className="text-xs">ARS/USD</span>
                    </div>
                    <Sparkline data={sparklineData.ars} positive={false} />
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Activity className="w-3 h-3 text-[#ff6b35]" />
                      <span className="text-[10px] text-[#ff6b35]">Alta</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span>🇨🇱</span>
                      <span className="text-xs">CLP/USD</span>
                    </div>
                    <Sparkline data={sparklineData.clp} positive />
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Activity className="w-3 h-3 text-[#00f5d4]" />
                      <span className="text-[10px] text-[#00f5d4]">Estable</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span>🇲🇽</span>
                      <span className="text-xs">MXN/USD</span>
                    </div>
                    <Sparkline data={sparklineData.mxn} positive />
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Activity className="w-3 h-3 text-[#00f5d4]" />
                      <span className="text-[10px] text-[#00f5d4]">Estable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00f5d4]/10">
              <FileSearch className="w-5 h-5 text-[#00f5d4]" />
            </div>
            <h2 className="text-xl font-semibold">Historial de Auditoría (Soroban)</h2>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#1b2838]/50 text-[#8899a6] text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Evento</th>
                    <th className="px-6 py-4 font-medium">Contrato Inteligente</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Hash de Ledger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#00f5d4]/10">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#00f5d4]/5 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#e8f4f8]">{log.action}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-[#00f5d4] bg-[#00f5d4]/10 px-2 py-1 rounded text-xs">
                          {log.contract}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00f5d4]" />
                          <span className="text-[10px] text-[#00f5d4] uppercase font-bold tracking-widest">
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#8899a6]">
                        {log.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-[#8899a6] group-hover:text-[#00f5d4] transition-colors">
                        {log.hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00f5d4]/10">
              <Lock className="w-5 h-5 text-[#00f5d4]" />
            </div>
            <h2 className="text-xl font-semibold">Gobernanza Symbiosis</h2>
            <Badge variant="outline" className="border-[#ff6b35]/30 text-[#ff6b35] bg-[#ff6b35]/10 ml-2">
              Stake XLM
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stakePools.map((pool) => (
              <div
                key={pool.id}
                className="glass-card rounded-2xl p-5 hover:neon-glow transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{pool.name}</h3>
                    <p className="text-xs text-[#8899a6]">{pool.agents} agentes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00f5d4]">{pool.apy}%</p>
                    <p className="text-[10px] text-[#8899a6]">APY</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#8899a6]">Rendimiento del Swarm</span>
                      <span className="text-[#00f5d4]">{pool.performance}%</span>
                    </div>
                    <Progress value={pool.performance} className="h-2 bg-[#1b2838]" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8899a6]">Total Staked</span>
                    <span className="font-medium">{pool.totalStaked.toLocaleString()} XLM</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#00f5d4]/30 text-[#00f5d4] hover:bg-[#00f5d4]/10 hover:border-[#00f5d4] transition-all group-hover:neon-glow"
                >
                  <Gauge className="w-4 h-4 mr-2" />
                  Stake en este Swarm
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 glass-card rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#00f5d4]" />
              <div>
                <p className="text-sm font-medium">Comisiones de Remesa Distribuidas</p>
                <p className="text-xs text-[#8899a6]">
                  Los stakers reciben una parte proporcional de las comisiones optimizadas mediante contratos Soroban
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#00f5d4]">$12,847</p>
              <p className="text-[10px] text-[#8899a6]">Distribuido este mes</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#00f5d4]/10 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Hexagon className="w-6 h-6 text-[#00f5d4]" strokeWidth={1.5} />
              <span className="text-sm text-[#8899a6]">
                EvoSwarm © 2026 - Stellar Blockchain (Protocol v32)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#8899a6]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00f5d4] rounded-full animate-pulse" />
                Mainnet Activa
              </span>
              <span>Chile • Argentina • México</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
