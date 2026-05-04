import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "首页" },
  { id: "experiment", label: "实验演示" },
  { id: "micro", label: "微观世界" },
  { id: "unknown", label: "未知推断" },
  { id: "knowledge", label: "知识讲解" },
  { id: "equation", label: "方程式训练" },
  { id: "practice", label: "互动练习" },
  { id: "diagnosis", label: "易错诊断" },
  { id: "summary", label: "学习报告" },
];

const iconMap = {
  atom: "⚛",
  beaker: "⚗",
  book: "📘",
  check: "✓",
  arrow: "›",
  clipboard: "▣",
  eye: "◉",
  flask: "🧪",
  cap: "🎓",
  light: "💡",
  micro: "🔬",
  play: "▶",
  reset: "↻",
  sound: "♪",
  close: "×",
  warn: "!",
  download: "⇩",
  target: "◎",
  report: "📄",
  switch: "⇄",
};

function Icon({ name, className = "" }) {
  return <span aria-hidden="true" className={`inline-flex items-center justify-center leading-none ${className}`}>{iconMap[name] || "•"}</span>;
}

const substances = [
  { id: "AgNO3", label: "硝酸银溶液", formula: "AgNO₃(aq)", ions: ["Ag⁺", "NO₃⁻"], color: "slate" },
  { id: "HCl", label: "盐酸", formula: "HCl(aq)", ions: ["H⁺", "Cl⁻"], color: "orange" },
  { id: "BaCl2", label: "氯化钡溶液", formula: "BaCl₂(aq)", ions: ["Ba²⁺", "Cl⁻"], color: "blue" },
  { id: "Na2SO4", label: "硫酸钠溶液", formula: "Na₂SO₄(aq)", ions: ["Na⁺", "SO₄²⁻"], color: "violet" },
  { id: "H2SO4", label: "稀硫酸", formula: "H₂SO₄(aq)", ions: ["H⁺", "SO₄²⁻"], color: "violet" },
  { id: "NaOH", label: "氢氧化钠溶液", formula: "NaOH(aq)", ions: ["Na⁺", "OH⁻"], color: "emerald" },
  { id: "CaOH2", label: "澄清石灰水", formula: "Ca(OH)₂(aq)", ions: ["Ca²⁺", "OH⁻"], color: "emerald" },
  { id: "Na2CO3", label: "碳酸钠溶液", formula: "Na₂CO₃(aq)", ions: ["Na⁺", "CO₃²⁻"], color: "cyan" },
  { id: "NaHCO3", label: "碳酸氢钠溶液", formula: "NaHCO₃(aq)", ions: ["Na⁺", "HCO₃⁻"], color: "cyan" },
  { id: "CuSO4", label: "硫酸铜溶液", formula: "CuSO₄(aq)", ions: ["Cu²⁺", "SO₄²⁻"], color: "blue" },
  { id: "Na2S", label: "硫化钠溶液", formula: "Na₂S(aq)", ions: ["Na⁺", "S²⁻"], color: "amber" },
  { id: "FeCl3", label: "氯化铁溶液", formula: "FeCl₃(aq)", ions: ["Fe³⁺", "Cl⁻"], color: "yellow" },
  { id: "FeCl2", label: "氯化亚铁溶液", formula: "FeCl₂(aq)", ions: ["Fe²⁺", "Cl⁻"], color: "green" },
  { id: "KSCN", label: "硫氰化钾溶液", formula: "KSCN(aq)", ions: ["K⁺", "SCN⁻"], color: "slate" },
  { id: "KI", label: "碘化钾溶液", formula: "KI(aq)", ions: ["K⁺", "I⁻"], color: "slate" },
  { id: "NaBr", label: "溴化钠溶液", formula: "NaBr(aq)", ions: ["Na⁺", "Br⁻"], color: "slate" },
  { id: "Cl2Water", label: "氯水", formula: "Cl₂(aq)", ions: ["Cl₂", "HClO", "Cl⁻"], color: "yellowgreen" },
  { id: "Br2Water", label: "溴水", formula: "Br₂(aq)", ions: ["Br₂"], color: "orange" },
  { id: "Na2SO3", label: "亚硫酸钠溶液", formula: "Na₂SO₃(aq)", ions: ["Na⁺", "SO₃²⁻"], color: "slate" },
  { id: "NH4Cl", label: "氯化铵溶液", formula: "NH₄Cl(aq)", ions: ["NH₄⁺", "Cl⁻"], color: "slate" },
  { id: "NH3H2O", label: "氨水", formula: "NH₃·H₂O(aq)", ions: ["NH₃·H₂O"], color: "slate" },
  { id: "NaAlO2", label: "偏铝酸钠溶液", formula: "NaAlO₂(aq)", ions: ["Na⁺", "AlO₂⁻"], color: "slate" },
  { id: "AlCl3", label: "氯化铝溶液", formula: "AlCl₃(aq)", ions: ["Al³⁺", "Cl⁻"], color: "slate" },
  { id: "NaCl", label: "氯化钠溶液", formula: "NaCl(aq)", ions: ["Na⁺", "Cl⁻"], color: "sky" },
  { id: "KNO3", label: "硝酸钾溶液", formula: "KNO₃(aq)", ions: ["K⁺", "NO₃⁻"], color: "amber" },
];

const ions = [
  { id: "ba", label: "Ba²⁺", name: "钡离子", role: "反应离子", desc: "与 SO₄²⁻ 结合，生成难溶的 BaSO₄ 白色沉淀。", charge: "+2", color: "bg-blue-500", left: "18%", top: "35%" },
  { id: "so4", label: "SO₄²⁻", name: "硫酸根离子", role: "反应离子", desc: "与 Ba²⁺ 结合，形成 BaSO₄↓，是净离子反应的核心粒子。", charge: "-2", color: "bg-violet-500", left: "62%", top: "38%" },
  { id: "na", label: "Na⁺", name: "钠离子", role: "旁观离子", desc: "反应前后都自由存在于溶液中，没有发生本质变化。", charge: "+1", color: "bg-emerald-500", left: "72%", top: "65%" },
  { id: "cl", label: "Cl⁻", name: "氯离子", role: "旁观离子", desc: "反应前后都自由存在于溶液中，书写净离子方程式时应删去。", charge: "-1", color: "bg-orange-500", left: "30%", top: "68%" },
];

const defaultNoReaction = {
  id: "no-net-reaction",
  number: "0",
  level: "判断",
  category: "无明显净反应",
  reactants: [],
  title: "未形成净离子反应",
  kind: "none",
  phenomenon: "混合后没有沉淀、气体或弱电解质生成，溶液中的离子主要只是共存。",
  fullEq: "无明显反应",
  totalIon: "离子在溶液中共存",
  netIon: "无净离子方程式",
  cards: [],
  correctCards: [],
  spectators: [],
  noSplit: [],
  tip: "判断离子反应是否发生，要看是否生成沉淀、气体或弱电解质。",
};

const reactionBank = [
  {
    id: "agcl-hcl",
    number: "1",
    level: "基础",
    category: "沉淀反应",
    reactants: ["AgNO3", "HCl"],
    title: "硝酸银与盐酸",
    kind: "precipitate",
    visualLabel: "白色 AgCl 沉淀，不溶于稀硝酸",
    phenomenon: "白色沉淀，不溶于稀硝酸。",
    visual: { precipitate: "#f8fafc", solution: "#dbeafe" },
    fullEq: "AgNO₃ + HCl = AgCl↓ + HNO₃",
    totalIon: "Ag⁺ + NO₃⁻ + H⁺ + Cl⁻ = AgCl↓ + H⁺ + NO₃⁻",
    netIon: "Ag⁺ + Cl⁻ = AgCl↓",
    cards: ["Ag⁺", "Cl⁻", "AgCl↓", "H⁺", "NO₃⁻"],
    correctCards: ["Ag⁺", "Cl⁻", "AgCl↓"],
    spectators: ["H⁺", "NO₃⁻"],
    noSplit: ["AgCl↓"],
    inferenceIons: ["Ag⁺", "Cl⁻"],
    tip: "AgCl 为白色难溶沉淀，不应拆成离子。",
  },
  {
    id: "baso4",
    number: "2",
    level: "基础",
    category: "沉淀反应",
    reactants: ["BaCl2", "Na2SO4"],
    title: "氯化钡与硫酸钠",
    kind: "precipitate",
    visualLabel: "白色 BaSO₄ 沉淀",
    phenomenon: "两种无色溶液混合后生成白色沉淀。",
    visual: { precipitate: "#ffffff", solution: "#dbeafe" },
    fullEq: "BaCl₂ + Na₂SO₄ = BaSO₄↓ + 2NaCl",
    totalIon: "Ba²⁺ + 2Cl⁻ + 2Na⁺ + SO₄²⁻ = BaSO₄↓ + 2Na⁺ + 2Cl⁻",
    netIon: "Ba²⁺ + SO₄²⁻ = BaSO₄↓",
    cards: ["Ba²⁺", "SO₄²⁻", "BaSO₄↓", "Na⁺", "Cl⁻"],
    correctCards: ["Ba²⁺", "SO₄²⁻", "BaSO₄↓"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["BaSO₄↓"],
    inferenceIons: ["Ba²⁺", "SO₄²⁻"],
    tip: "核心是 BaSO₄ 难溶，Ba²⁺ 和 SO₄²⁻ 被移出溶液。",
  },
  {
    id: "neutralization",
    number: "3",
    level: "基础",
    category: "酸碱中和",
    reactants: ["HCl", "NaOH"],
    title: "盐酸与氢氧化钠",
    kind: "neutralization",
    visualLabel: "生成 H₂O，常伴随放热",
    phenomenon: "无明显沉淀或气体，但酸碱中和生成水。",
    visual: { solution: "#ffedd5" },
    fullEq: "HCl + NaOH = NaCl + H₂O",
    totalIon: "H⁺ + Cl⁻ + Na⁺ + OH⁻ = Na⁺ + Cl⁻ + H₂O",
    netIon: "H⁺ + OH⁻ = H₂O",
    cards: ["H⁺", "OH⁻", "H₂O", "Na⁺", "Cl⁻"],
    correctCards: ["H⁺", "OH⁻", "H₂O"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["H₂O"],
    inferenceIons: ["H⁺", "OH⁻"],
    tip: "中和反应的本质是 H⁺ 与 OH⁻ 结合生成弱电解质水。",
  },
  {
    id: "carbonate-acid",
    number: "4",
    level: "基础",
    category: "气体反应",
    reactants: ["Na2CO3", "HCl"],
    title: "碳酸钠与盐酸",
    kind: "gas",
    visualLabel: "先无明显现象，后产生 CO₂ 气泡",
    phenomenon: "先无现象，后产气。",
    visual: { bubble: "#ffffff", solution: "#dbeafe" },
    fullEq: "Na₂CO₃ + 2HCl = 2NaCl + CO₂↑ + H₂O",
    totalIon: "2Na⁺ + CO₃²⁻ + 2H⁺ + 2Cl⁻ = 2Na⁺ + 2Cl⁻ + CO₂↑ + H₂O",
    netIon: "CO₃²⁻ + 2H⁺ = CO₂↑ + H₂O",
    cards: ["CO₃²⁻", "H⁺", "CO₂↑", "H₂O", "Na⁺", "Cl⁻"],
    correctCards: ["CO₃²⁻", "H⁺", "CO₂↑", "H₂O"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["CO₂↑", "H₂O"],
    inferenceIons: ["CO₃²⁻", "H⁺"],
    tip: "生成气体 CO₂ 和水，H⁺ 前面的系数不能漏。",
  },
  {
    id: "hco3-acid",
    number: "5",
    level: "基础",
    category: "气体反应",
    reactants: ["NaHCO3", "HCl"],
    title: "碳酸氢钠与盐酸",
    kind: "gas",
    visualLabel: "无色无味 CO₂ 气体",
    phenomenon: "产生无色无味气体。",
    visual: { bubble: "#ffffff", solution: "#dbeafe" },
    fullEq: "NaHCO₃ + HCl = NaCl + CO₂↑ + H₂O",
    totalIon: "Na⁺ + HCO₃⁻ + H⁺ + Cl⁻ = Na⁺ + Cl⁻ + CO₂↑ + H₂O",
    netIon: "HCO₃⁻ + H⁺ = CO₂↑ + H₂O",
    cards: ["HCO₃⁻", "H⁺", "CO₂↑", "H₂O", "Na⁺", "Cl⁻"],
    correctCards: ["HCO₃⁻", "H⁺", "CO₂↑", "H₂O"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["CO₂↑", "H₂O"],
    inferenceIons: ["HCO₃⁻", "H⁺"],
    tip: "HCO₃⁻ 不能随意拆成 H⁺ 和 CO₃²⁻。",
  },
  {
    id: "caoh2-co2like",
    number: "6",
    level: "基础",
    category: "沉淀反应",
    reactants: ["CaOH2", "Na2CO3"],
    title: "澄清石灰水与碳酸钠",
    kind: "precipitate",
    visualLabel: "白色 CaCO₃ 沉淀，溶液变浑浊",
    phenomenon: "生成白色沉淀，溶液变浑浊。",
    visual: { precipitate: "#f8fafc", solution: "#e0f2fe" },
    fullEq: "Ca(OH)₂ + Na₂CO₃ = CaCO₃↓ + 2NaOH",
    totalIon: "Ca²⁺ + 2OH⁻ + 2Na⁺ + CO₃²⁻ = CaCO₃↓ + 2Na⁺ + 2OH⁻",
    netIon: "Ca²⁺ + CO₃²⁻ = CaCO₃↓",
    cards: ["Ca²⁺", "CO₃²⁻", "CaCO₃↓", "Na⁺", "OH⁻"],
    correctCards: ["Ca²⁺", "CO₃²⁻", "CaCO₃↓"],
    spectators: ["Na⁺", "OH⁻"],
    noSplit: ["CaCO₃↓"],
    inferenceIons: ["Ca²⁺", "CO₃²⁻"],
    tip: "CaCO₃ 白色沉淀可作为 CO₃²⁻ 或 Ca²⁺ 的判断依据。",
  },
  {
    id: "cu-oh",
    number: "7",
    level: "基础",
    category: "有色沉淀",
    reactants: ["CuSO4", "NaOH"],
    title: "硫酸铜与氢氧化钠",
    kind: "precipitate",
    visualLabel: "蓝色 Cu(OH)₂ 沉淀",
    phenomenon: "生成蓝色沉淀。",
    visual: { precipitate: "#38bdf8", solution: "#dbeafe" },
    fullEq: "CuSO₄ + 2NaOH = Cu(OH)₂↓ + Na₂SO₄",
    totalIon: "Cu²⁺ + SO₄²⁻ + 2Na⁺ + 2OH⁻ = Cu(OH)₂↓ + 2Na⁺ + SO₄²⁻",
    netIon: "Cu²⁺ + 2OH⁻ = Cu(OH)₂↓",
    cards: ["Cu²⁺", "OH⁻", "Cu(OH)₂↓", "Na⁺", "SO₄²⁻"],
    correctCards: ["Cu²⁺", "OH⁻", "Cu(OH)₂↓"],
    spectators: ["Na⁺", "SO₄²⁻"],
    noSplit: ["Cu(OH)₂↓"],
    inferenceIons: ["Cu²⁺", "OH⁻"],
    tip: "蓝色沉淀常指向 Cu²⁺ 与 OH⁻ 生成 Cu(OH)₂。",
  },
  {
    id: "fe3-oh",
    number: "8",
    level: "基础",
    category: "有色沉淀",
    reactants: ["FeCl3", "NaOH"],
    title: "氯化铁与氢氧化钠",
    kind: "precipitate",
    visualLabel: "红褐色 Fe(OH)₃ 沉淀",
    phenomenon: "生成红褐色沉淀。",
    visual: { precipitate: "#92400e", solution: "#fef3c7" },
    fullEq: "FeCl₃ + 3NaOH = Fe(OH)₃↓ + 3NaCl",
    totalIon: "Fe³⁺ + 3Cl⁻ + 3Na⁺ + 3OH⁻ = Fe(OH)₃↓ + 3Na⁺ + 3Cl⁻",
    netIon: "Fe³⁺ + 3OH⁻ = Fe(OH)₃↓",
    cards: ["Fe³⁺", "OH⁻", "Fe(OH)₃↓", "Na⁺", "Cl⁻"],
    correctCards: ["Fe³⁺", "OH⁻", "Fe(OH)₃↓"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["Fe(OH)₃↓"],
    inferenceIons: ["Fe³⁺", "OH⁻"],
    tip: "红褐色沉淀是 Fe(OH)₃ 的典型现象。",
  },
  {
    id: "fe3-scn",
    number: "9",
    level: "提高",
    category: "显色反应",
    reactants: ["FeCl3", "KSCN"],
    title: "氯化铁与硫氰化钾",
    kind: "color",
    visualLabel: "血红色溶液",
    phenomenon: "溶液显血红色。",
    visual: { solution: "#b91c1c" },
    fullEq: "FeCl₃ + 3KSCN = Fe(SCN)₃ + 3KCl",
    totalIon: "Fe³⁺ + 3Cl⁻ + 3K⁺ + 3SCN⁻ = Fe(SCN)₃ + 3K⁺ + 3Cl⁻",
    netIon: "Fe³⁺ + 3SCN⁻ = Fe(SCN)₃",
    cards: ["Fe³⁺", "SCN⁻", "Fe(SCN)₃", "K⁺", "Cl⁻"],
    correctCards: ["Fe³⁺", "SCN⁻", "Fe(SCN)₃"],
    spectators: ["K⁺", "Cl⁻"],
    noSplit: ["Fe(SCN)₃"],
    inferenceIons: ["Fe³⁺", "SCN⁻"],
    tip: "血红色是 Fe³⁺ 检验中很有辨识度的现象。",
  },
  {
    id: "cu-s",
    number: "10",
    level: "提高",
    category: "有色沉淀",
    reactants: ["CuSO4", "Na2S"],
    title: "硫酸铜与硫化钠",
    kind: "precipitate",
    visualLabel: "黑色 CuS 沉淀",
    phenomenon: "生成黑色沉淀。",
    visual: { precipitate: "#111827", solution: "#dbeafe" },
    fullEq: "CuSO₄ + Na₂S = CuS↓ + Na₂SO₄",
    totalIon: "Cu²⁺ + SO₄²⁻ + 2Na⁺ + S²⁻ = CuS↓ + 2Na⁺ + SO₄²⁻",
    netIon: "Cu²⁺ + S²⁻ = CuS↓",
    cards: ["Cu²⁺", "S²⁻", "CuS↓", "Na⁺", "SO₄²⁻"],
    correctCards: ["Cu²⁺", "S²⁻", "CuS↓"],
    spectators: ["Na⁺", "SO₄²⁻"],
    noSplit: ["CuS↓"],
    inferenceIons: ["Cu²⁺", "S²⁻"],
    tip: "黑色沉淀常见于 CuS、FeS 等硫化物。",
  },
  {
    id: "fe3-s2-low",
    number: "11",
    level: "提高",
    category: "氧化还原",
    reactants: ["FeCl3", "Na2S"],
    title: "氯化铁与少量硫化钠",
    kind: "precipitate",
    visualLabel: "淡黄色 S 沉淀",
    phenomenon: "生成淡黄色沉淀。",
    visual: { precipitate: "#fde68a", solution: "#fef3c7" },
    fullEq: "2FeCl₃ + Na₂S = 2FeCl₂ + S↓ + 2NaCl",
    totalIon: "2Fe³⁺ + 6Cl⁻ + 2Na⁺ + S²⁻ = 2Fe²⁺ + 6Cl⁻ + S↓ + 2Na⁺",
    netIon: "2Fe³⁺ + S²⁻ = S↓ + 2Fe²⁺",
    cards: ["Fe³⁺", "S²⁻", "S↓", "Fe²⁺", "Na⁺", "Cl⁻"],
    correctCards: ["Fe³⁺", "S²⁻", "S↓", "Fe²⁺"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["S↓"],
    inferenceIons: ["Fe³⁺", "S²⁻"],
    tip: "该反应不是简单复分解，涉及 Fe³⁺ 氧化 S²⁻。",
  },
  {
    id: "fe3-ki",
    number: "12",
    level: "提高",
    category: "氧化还原显色",
    reactants: ["FeCl3", "KI"],
    title: "氯化铁与碘化钾",
    kind: "color",
    visualLabel: "黄褐色，遇淀粉变蓝",
    phenomenon: "溶液变黄褐色，淀粉变蓝。",
    visual: { solution: "#92400e" },
    fullEq: "2FeCl₃ + 2KI = 2FeCl₂ + I₂ + 2KCl",
    totalIon: "2Fe³⁺ + 6Cl⁻ + 2K⁺ + 2I⁻ = 2Fe²⁺ + 6Cl⁻ + I₂ + 2K⁺",
    netIon: "2Fe³⁺ + 2I⁻ = 2Fe²⁺ + I₂",
    cards: ["Fe³⁺", "I⁻", "Fe²⁺", "I₂", "K⁺", "Cl⁻"],
    correctCards: ["Fe³⁺", "I⁻", "Fe²⁺", "I₂"],
    spectators: ["K⁺", "Cl⁻"],
    noSplit: ["I₂"],
    inferenceIons: ["Fe³⁺", "I⁻"],
    tip: "黄褐色或淀粉变蓝提示生成 I₂。",
  },
  {
    id: "cl2-br",
    number: "13",
    level: "提高",
    category: "氧化还原显色",
    reactants: ["Cl2Water", "NaBr"],
    title: "氯水与溴化钠",
    kind: "color",
    visualLabel: "溶液变橙黄",
    phenomenon: "溶液变橙黄。",
    visual: { solution: "#f97316" },
    fullEq: "2NaBr + Cl₂ = 2NaCl + Br₂",
    totalIon: "2Na⁺ + 2Br⁻ + Cl₂ = 2Na⁺ + 2Cl⁻ + Br₂",
    netIon: "2Br⁻ + Cl₂ = Br₂ + 2Cl⁻",
    cards: ["Br⁻", "Cl₂", "Br₂", "Cl⁻", "Na⁺"],
    correctCards: ["Br⁻", "Cl₂", "Br₂", "Cl⁻"],
    spectators: ["Na⁺"],
    noSplit: ["Br₂", "Cl₂"],
    inferenceIons: ["Br⁻", "Cl₂"],
    tip: "橙黄色通常提示 Br₂ 生成。",
  },
  {
    id: "so3-br2",
    number: "14",
    level: "提高",
    category: "褪色反应",
    reactants: ["Na2SO3", "Br2Water"],
    title: "亚硫酸钠与溴水",
    kind: "fade",
    visualLabel: "溴水褪色",
    phenomenon: "溴水褪色。",
    visual: { solution: "#e0f2fe" },
    fullEq: "Na₂SO₃ + Br₂ + H₂O = Na₂SO₄ + 2HBr",
    totalIon: "SO₃²⁻ + Br₂ + H₂O = SO₄²⁻ + 2Br⁻ + 2H⁺",
    netIon: "SO₃²⁻ + Br₂ + H₂O = SO₄²⁻ + 2Br⁻ + 2H⁺",
    cards: ["SO₃²⁻", "Br₂", "H₂O", "SO₄²⁻", "Br⁻", "H⁺"],
    correctCards: ["SO₃²⁻", "Br₂", "H₂O", "SO₄²⁻", "Br⁻", "H⁺"],
    spectators: ["Na⁺"],
    noSplit: ["Br₂", "H₂O"],
    inferenceIons: ["SO₃²⁻", "Br₂"],
    tip: "褪色可提示有还原性离子，如 SO₃²⁻。",
  },
  {
    id: "nh4-oh",
    number: "15",
    level: "提高",
    category: "气体反应",
    reactants: ["NH4Cl", "NaOH"],
    title: "氯化铵与氢氧化钠（加热）",
    kind: "gas",
    visualLabel: "刺激性 NH₃ 气体，使红石蕊变蓝",
    phenomenon: "产生刺激性气体，使红石蕊变蓝。",
    visual: { bubble: "#ffffff", solution: "#f0fdf4" },
    fullEq: "NH₄Cl + NaOH = NaCl + NH₃↑ + H₂O",
    totalIon: "NH₄⁺ + OH⁻ = NH₃↑ + H₂O",
    netIon: "NH₄⁺ + OH⁻ = NH₃↑ + H₂O",
    cards: ["NH₄⁺", "OH⁻", "NH₃↑", "H₂O", "Na⁺", "Cl⁻"],
    correctCards: ["NH₄⁺", "OH⁻", "NH₃↑", "H₂O"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["NH₃↑", "H₂O"],
    inferenceIons: ["NH₄⁺", "OH⁻"],
    tip: "刺激性气体并使红石蕊变蓝，常提示 NH₃。",
  },
  {
    id: "al-ammonia",
    number: "16",
    level: "提高",
    category: "胶状沉淀",
    reactants: ["AlCl3", "NH3H2O"],
    title: "氯化铝与过量氨水",
    kind: "precipitate",
    visualLabel: "白色胶状 Al(OH)₃ 沉淀，不溶于过量氨水",
    phenomenon: "白色胶状沉淀，不溶于过量氨水。",
    visual: { precipitate: "#f8fafc", solution: "#e0f2fe" },
    fullEq: "AlCl₃ + 3NH₃·H₂O = Al(OH)₃↓ + 3NH₄Cl",
    totalIon: "Al³⁺ + 3Cl⁻ + 3NH₃·H₂O = Al(OH)₃↓ + 3NH₄⁺ + 3Cl⁻",
    netIon: "Al³⁺ + 3NH₃·H₂O = Al(OH)₃↓ + 3NH₄⁺",
    cards: ["Al³⁺", "NH₃·H₂O", "Al(OH)₃↓", "NH₄⁺", "Cl⁻"],
    correctCards: ["Al³⁺", "NH₃·H₂O", "Al(OH)₃↓", "NH₄⁺"],
    spectators: ["Cl⁻"],
    noSplit: ["NH₃·H₂O", "Al(OH)₃↓"],
    inferenceIons: ["Al³⁺", "NH₃·H₂O"],
    tip: "Al(OH)₃ 为白色胶状沉淀，氨水是弱碱不拆。",
  },
  {
    id: "aluminate-acid-low",
    number: "17",
    level: "提高",
    category: "沉淀反应",
    reactants: ["NaAlO2", "HCl"],
    title: "偏铝酸钠与少量盐酸",
    kind: "precipitate",
    visualLabel: "白色 Al(OH)₃ 沉淀",
    phenomenon: "生成白色沉淀。",
    visual: { precipitate: "#f8fafc", solution: "#e0f2fe" },
    fullEq: "NaAlO₂ + HCl + H₂O = Al(OH)₃↓ + NaCl",
    totalIon: "Na⁺ + AlO₂⁻ + H⁺ + Cl⁻ + H₂O = Al(OH)₃↓ + Na⁺ + Cl⁻",
    netIon: "AlO₂⁻ + H⁺ + H₂O = Al(OH)₃↓",
    cards: ["AlO₂⁻", "H⁺", "H₂O", "Al(OH)₃↓", "Na⁺", "Cl⁻"],
    correctCards: ["AlO₂⁻", "H⁺", "H₂O", "Al(OH)₃↓"],
    spectators: ["Na⁺", "Cl⁻"],
    noSplit: ["H₂O", "Al(OH)₃↓"],
    inferenceIons: ["AlO₂⁻", "H⁺"],
    tip: "少量酸使 AlO₂⁻ 转化为 Al(OH)₃ 沉淀。",
  },
  {
    id: "nacl-kno3",
    number: "18",
    level: "判断",
    category: "无明显净反应",
    reactants: ["NaCl", "KNO3"],
    title: "氯化钠与硝酸钾",
    kind: "none",
    visualLabel: "无明显现象",
    phenomenon: "混合后没有沉淀、气体或弱电解质生成。",
    visual: { solution: "#e0f2fe" },
    fullEq: "无明显反应",
    totalIon: "Na⁺、Cl⁻、K⁺、NO₃⁻ 在溶液中共存",
    netIon: "无净离子方程式",
    cards: ["Na⁺", "Cl⁻", "K⁺", "NO₃⁻"],
    correctCards: [],
    spectators: ["Na⁺", "Cl⁻", "K⁺", "NO₃⁻"],
    noSplit: [],
    inferenceIons: [],
    tip: "这类题用于训练“不是所有电解质溶液混合都会发生净离子反应”。",
  },
];

function getSubstance(id) {
  return substances.find((s) => s.id === id) || substances[0];
}

function getReactionForReactants(left, right) {
  const ids = [left, right].sort().join("|");
  const match = reactionBank.find((r) => r.reactants.slice().sort().join("|") === ids);
  if (match) return match;
  return { ...defaultNoReaction, reactants: [left, right], title: `${getSubstance(left).formula} 与 ${getSubstance(right).formula}` };
}

const knowledgeCards = [
  { icon: "atom", title: "概念本质", brief: "离子反应不是简单看化学式变化，而是看自由离子是否发生有效变化。", detail: "如果某些离子结合成沉淀、气体或弱电解质，它们在溶液中的存在状态发生改变，就形成净离子反应。", example: "Ba²⁺ + SO₄²⁻ → BaSO₄↓" },
  { icon: "target", title: "发生条件", brief: "常见驱动力：生成沉淀、生成气体、生成弱电解质。", detail: "这些过程会降低自由离子浓度，使反应朝着生成物方向进行。", example: "H⁺ + OH⁻ → H₂O；CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O" },
  { icon: "clipboard", title: "拆分原则", brief: "强酸、强碱、可溶性盐通常拆；沉淀、气体、水、弱酸弱碱不拆。", detail: "拆分的依据是物质在水溶液中是否主要以自由离子形式存在。", example: "Na₂SO₄ → 2Na⁺ + SO₄²⁻；BaSO₄↓ 不拆" },
  { icon: "book", title: "四步书写法", brief: "写、拆、删、查。", detail: "先写完整化学方程式，再拆成总离子方程式，删去旁观离子，最后检查原子守恒和电荷守恒。", example: "写：BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl" },
];

const practiceQuestions = [
  { type: "判断题", question: "所有化合物在离子方程式中都可以拆成离子。", options: ["正确", "错误"], answer: "错误", explain: "沉淀、气体、水和弱电解质不能拆。" },
  { type: "选择题", question: "下列哪一组离子能发生明显离子反应？", options: ["Na⁺ 与 Cl⁻", "Ba²⁺ 与 SO₄²⁻", "K⁺ 与 NO₃⁻", "Na⁺ 与 K⁺"], answer: "Ba²⁺ 与 SO₄²⁻", explain: "二者可生成难溶的 BaSO₄ 白色沉淀。" },
  { type: "排序题", question: "离子方程式书写的正确顺序是？", options: ["写→拆→删→查", "拆→写→查→删", "删→写→拆→查", "查→删→拆→写"], answer: "写→拆→删→查", explain: "先建立完整方程式，再转化为净离子方程式。" },
  { type: "选择题", question: "下列哪一个物质在净离子方程式中通常不能拆？", options: ["NaCl(aq)", "HCl(aq)", "BaSO₄↓", "NaOH(aq)"], answer: "BaSO₄↓", explain: "BaSO₄ 是难溶沉淀，应保留化学式。" },
  { type: "判断题", question: "NaCl 溶液与 KNO₃ 溶液混合后一定有净离子反应。", options: ["正确", "错误"], answer: "错误", explain: "没有沉淀、气体或弱电解质生成，本质上只是离子共存。" },
  { type: "选择题", question: "酸碱中和反应的核心净离子方程式通常是？", options: ["Na⁺ + Cl⁻ → NaCl", "H⁺ + OH⁻ → H₂O", "H₂ + O₂ → H₂O", "Cl⁻ + OH⁻ → ClOH²⁻"], answer: "H⁺ + OH⁻ → H₂O", explain: "强酸强碱中和的本质是 H⁺ 与 OH⁻ 生成弱电解质水。" },
];

const errorTypes = [
  { id: "split", title: "把沉淀拆成离子", wrong: "BaSO₄ → Ba²⁺ + SO₄²⁻", diagnosis: "BaSO₄ 是难溶沉淀，在离子方程式中应保留化学式。", tip: "看到 ↓、气体、水、弱酸弱碱，先判断是否不能拆。" },
  { id: "spectator", title: "不会删除旁观离子", wrong: "Ba²⁺ + 2Cl⁻ + 2Na⁺ + SO₄²⁻ → BaSO₄↓ + 2Na⁺ + 2Cl⁻", diagnosis: "Na⁺ 和 Cl⁻ 在反应前后没有变化，应删去。", tip: "两边完全相同的离子就是旁观离子。" },
  { id: "condition", title: "只看化学式，不看反应条件", wrong: "NaCl + KNO₃ 发生离子反应", diagnosis: "没有生成沉淀、气体或弱电解质，所以没有净离子反应。", tip: "先问：有没有离子被移出溶液体系？" },
  { id: "charge", title: "忘记检查电荷守恒", wrong: "Ba⁺ + SO₄²⁻ → BaSO₄↓", diagnosis: "Ba 的常见离子应为 Ba²⁺，左侧总电荷应为 0。", tip: "最后一步查原子守恒和电荷守恒。" },
];


const unknownCases = [
  {
    id: "unknown-ag-cl",
    title: "未知溶液 A + 未知溶液 B",
    visible: "混合后立即生成白色沉淀，加入稀硝酸后沉淀不溶解。",
    visual: { kind: "precipitate", color: "#f8fafc" },
    candidates: ["Ag⁺ 和 Cl⁻", "Ba²⁺ 和 CO₃²⁻", "Cu²⁺ 和 OH⁻", "Fe³⁺ 和 SCN⁻"],
    answer: "Ag⁺ 和 Cl⁻",
    reason: "白色沉淀且不溶于稀硝酸，典型指向 AgCl，因此未知溶液中可能分别含有 Ag⁺ 和 Cl⁻。",
  },
  {
    id: "unknown-ba-sulfate",
    title: "未知溶液 C + 未知溶液 D",
    visible: "混合后生成白色沉淀，现象稳定，可与 BaSO₄ 相关检验联系。",
    visual: { kind: "precipitate", color: "#ffffff" },
    candidates: ["Ba²⁺ 和 SO₄²⁻", "H⁺ 和 OH⁻", "Na⁺ 和 NO₃⁻", "K⁺ 和 Cl⁻"],
    answer: "Ba²⁺ 和 SO₄²⁻",
    reason: "Ba²⁺ 与 SO₄²⁻ 可生成白色 BaSO₄ 沉淀，常用于硫酸根离子的检验。",
  },
  {
    id: "unknown-cu-oh",
    title: "未知溶液 E + 未知溶液 F",
    visible: "混合后出现蓝色絮状沉淀。",
    visual: { kind: "precipitate", color: "#38bdf8" },
    candidates: ["Cu²⁺ 和 OH⁻", "Fe³⁺ 和 OH⁻", "Ag⁺ 和 Cl⁻", "Ba²⁺ 和 SO₄²⁻"],
    answer: "Cu²⁺ 和 OH⁻",
    reason: "蓝色沉淀通常是 Cu(OH)₂，因此可推测存在 Cu²⁺ 和 OH⁻。",
  },
  {
    id: "unknown-fe-oh",
    title: "未知溶液 G + 未知溶液 H",
    visible: "混合后出现红褐色沉淀。",
    visual: { kind: "precipitate", color: "#92400e" },
    candidates: ["Fe³⁺ 和 OH⁻", "Cu²⁺ 和 S²⁻", "Ba²⁺ 和 CO₃²⁻", "NH₄⁺ 和 OH⁻"],
    answer: "Fe³⁺ 和 OH⁻",
    reason: "红褐色沉淀是 Fe(OH)₃ 的典型现象，说明可能存在 Fe³⁺ 和 OH⁻。",
  },
  {
    id: "unknown-fe-scn",
    title: "未知溶液 I + 未知溶液 J",
    visible: "混合后溶液变为血红色，没有明显沉淀。",
    visual: { kind: "color", color: "#b91c1c" },
    candidates: ["Fe³⁺ 和 SCN⁻", "Fe²⁺ 和 Cl⁻", "Cu²⁺ 和 SO₄²⁻", "Na⁺ 和 OH⁻"],
    answer: "Fe³⁺ 和 SCN⁻",
    reason: "Fe³⁺ 与 SCN⁻ 形成血红色络合物，是 Fe³⁺ 的典型检验反应。",
  },
  {
    id: "unknown-carbonate-acid",
    title: "未知溶液 K + 未知溶液 L",
    visible: "混合后产生大量无色气泡。",
    visual: { kind: "gas", color: "#ffffff" },
    candidates: ["CO₃²⁻/HCO₃⁻ 和 H⁺", "Ag⁺ 和 Cl⁻", "Fe³⁺ 和 OH⁻", "K⁺ 和 NO₃⁻"],
    answer: "CO₃²⁻/HCO₃⁻ 和 H⁺",
    reason: "碳酸盐或碳酸氢盐遇酸会生成 CO₂ 气体，因此可推测有 CO₃²⁻ 或 HCO₃⁻ 与 H⁺。",
  },
  {
    id: "unknown-cus",
    title: "未知溶液 M + 未知溶液 N",
    visible: "混合后生成黑色沉淀。",
    visual: { kind: "precipitate", color: "#111827" },
    candidates: ["Cu²⁺ 和 S²⁻", "Ag⁺ 和 NO₃⁻", "Na⁺ 和 Cl⁻", "H⁺ 和 OH⁻"],
    answer: "Cu²⁺ 和 S²⁻",
    reason: "Cu²⁺ 与 S²⁻ 可生成黑色 CuS 沉淀。",
  },
];

const coexistenceQuestions = [
  {
    question: "下列离子在同一无色溶液中能大量共存的是？",
    options: ["Ba²⁺、SO₄²⁻、Na⁺", "Ag⁺、Cl⁻、NO₃⁻", "Na⁺、K⁺、NO₃⁻、Cl⁻", "Fe³⁺、OH⁻、Cl⁻"],
    answer: "Na⁺、K⁺、NO₃⁻、Cl⁻",
    reason: "该组不生成沉淀、气体或弱电解质，也无明显颜色限制。",
  },
  {
    question: "下列哪一组不能大量共存，主要原因是生成沉淀？",
    options: ["H⁺、Cl⁻", "Ba²⁺、SO₄²⁻", "Na⁺、NO₃⁻", "K⁺、Cl⁻"],
    answer: "Ba²⁺、SO₄²⁻",
    reason: "Ba²⁺ 与 SO₄²⁻ 生成 BaSO₄ 白色沉淀。",
  },
  {
    question: "若溶液要求无色，下列哪种离子通常不应大量存在？",
    options: ["Na⁺", "K⁺", "Fe³⁺", "NO₃⁻"],
    answer: "Fe³⁺",
    reason: "Fe³⁺ 溶液常呈黄色，通常不满足“无色溶液”的限制。",
  },
  {
    question: "在强酸性溶液中，下列哪组离子不宜大量共存？",
    options: ["Na⁺、Cl⁻", "K⁺、NO₃⁻", "CO₃²⁻、H⁺", "Mg²⁺、Cl⁻"],
    answer: "CO₃²⁻、H⁺",
    reason: "CO₃²⁻ 与 H⁺ 反应生成 CO₂ 和 H₂O。",
  },
  {
    question: "下列哪组混合后可能出现血红色？",
    options: ["Fe³⁺、SCN⁻", "Cu²⁺、OH⁻", "Ag⁺、Cl⁻", "Ba²⁺、SO₄²⁻"],
    answer: "Fe³⁺、SCN⁻",
    reason: "Fe³⁺ 与 SCN⁻ 生成血红色络合物。",
  },
];

function normalizeEquation(text) {
  return String(text || "")
    .replace(/\s+/g, "")
    .replace(/->/g, "=")
    .replace(/→/g, "=")
    .replace(/↓/g, "")
    .replace(/↑/g, "")
    .toLowerCase();
}

function hasEquationArrow(text) {
  return /→|=|->/.test(String(text || ""));
}

function isCardSelectionCorrect(selected, reaction) {
  if (!reaction.correctCards.length) return selected.length === 0;
  return reaction.correctCards.every((x) => selected.includes(x)) && selected.length === reaction.correctCards.length;
}

function runSelfTests() {
  const first = reactionBank[0];
  const tests = [
    { name: "题库至少包含5条示例", actual: reactionBank.length >= 5, expected: true },
    { name: "微观离子数据必须存在", actual: Array.isArray(ions) && ions.length >= 4, expected: true },
    { name: "第一条题库应为氯化银沉淀反应", actual: first.netIon.includes("AgCl"), expected: true },
    { name: "第一条卡片选择完整时应判对", actual: isCardSelectionCorrect(first.correctCards, first), expected: true },
    { name: "旁观离子多选时应判错", actual: isCardSelectionCorrect([...first.correctCards, "Na⁺"], first), expected: false },
    { name: "练习题答案必须在选项中", actual: practiceQuestions.every((q) => q.options.includes(q.answer)), expected: true },
    { name: "题库中的反应物必须可反查", actual: getReactionForReactants("Na2SO4", "BaCl2").id === "baso4" && getReactionForReactants("HCl", "AgNO3").id === "agcl-hcl", expected: true },
    { name: "微观场景应同步反应物离子", actual: getMicroScene("CuSO4", "NaOH", getReactionForReactants("CuSO4", "NaOH"), false).leftIons.includes("Cu²⁺"), expected: true },
    { name: "混合后微观场景应能识别旁观离子", actual: getMicroScene("CuSO4", "NaOH", getReactionForReactants("CuSO4", "NaOH"), true).spectatorIons.includes("SO₄²⁻"), expected: true },
    { name: "动态知识讲解所需场景应能给出生成物", actual: getMicroScene("FeCl3", "NaOH", getReactionForReactants("FeCl3", "NaOH"), true).products.includes("Fe(OH)₃↓"), expected: true },
    { name: "未知组合应返回无净反应", actual: getReactionForReactants("BaCl2", "KNO3").id === "no-net-reaction", expected: true },
    { name: "无净反应题选择空卡片应判对", actual: isCardSelectionCorrect([], reactionBank.find((r) => r.id === "nacl-kno3")), expected: true },
    { name: "题库有效净离子方程式应带箭头或等号", actual: reactionBank.filter((x) => x.kind !== "none").every((x) => hasEquationArrow(x.netIon)), expected: true },
    { name: "兼容等号与箭头", actual: normalizeEquation("H⁺ + OH⁻ = H₂O") === normalizeEquation("H⁺+OH⁻→H₂O"), expected: true },
  ];
  tests.forEach((t) => {
    if (t.actual !== t.expected) console.warn(`[IonReactionPage self-test failed] ${t.name}`, t);
  });
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionTitle({ eyebrow, title, desc, icon, hideTitle = false }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        <Icon name={icon} />
        {eyebrow}
      </div>
      {!hideTitle && title ? (
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      ) : null}
      {desc ? <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{desc}</p> : null}
    </div>
  );
}

function Pill({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${tones[tone]}`}>{children}</span>;
}

function ReactantSelectorPanel({ left, right, setLeft, setRight, onStartDemo }) {
  const predicted = getReactionForReactants(left, right);
  const leftSub = getSubstance(left);
  const rightSub = getSubstance(right);

  function swapReactants() {
    setLeft(right);
    setRight(left);
  }

  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-white">自选反应物实验预判</h3>
          <p className="mt-1 text-sm text-blue-100">先选两种溶液，再进入实验演示。</p>
        </div>
        <Pill tone={predicted.kind === "none" ? "slate" : "orange"}>{predicted.kind === "none" ? "无净反应" : predicted.category}</Pill>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="mb-2 block text-xs font-bold text-blue-100">反应物 A</label>
          <select value={left} onChange={(e) => setLeft(e.target.value)} className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm font-bold text-slate-800 outline-none">
            {substances.map((s) => <option key={s.id} value={s.id}>{s.formula}｜{s.label}</option>)}
          </select>
          <div className="mt-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50">电离：{leftSub.ions.join(" + ")}</div>
        </div>
        <button onClick={swapReactants} className="self-end rounded-2xl bg-white/10 px-4 py-3 font-black text-white transition hover:bg-white/20" title="交换反应物"><Icon name="switch" /></button>
        <div>
          <label className="mb-2 block text-xs font-bold text-blue-100">反应物 B</label>
          <select value={right} onChange={(e) => setRight(e.target.value)} className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm font-bold text-slate-800 outline-none">
            {substances.map((s) => <option key={s.id} value={s.id}>{s.formula}｜{s.label}</option>)}
          </select>
          <div className="mt-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50">电离：{rightSub.ions.join(" + ")}</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-sm font-bold text-blue-50">系统预判</p>
        <p className="mt-2 text-sm leading-6 text-white">{predicted.phenomenon}</p>
        <p className="mt-3 rounded-xl bg-slate-950/30 p-3 font-mono text-sm text-orange-100">{predicted.netIon}</p>
      </div>

      <button onClick={() => onStartDemo(predicted)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:scale-[1.02] hover:bg-orange-600">
        用这个反应进行实验演示 <Icon name="arrow" />
      </button>
    </div>
  );
}

function BeakerVisual({ mixed, reaction, leftId, rightId }) {
  const leftSub = getSubstance(leftId || reaction.reactants[0] || "BaCl2");
  const rightSub = getSubstance(rightId || reaction.reactants[1] || "Na2SO4");
  const showPrecipitate = mixed && reaction.kind === "precipitate";
  const showGas = mixed && reaction.kind === "gas";
  const showNeutral = mixed && reaction.kind === "neutralization";
  const showNone = mixed && reaction.kind === "none";
  const showColor = mixed && reaction.kind === "color";
  const showFade = mixed && reaction.kind === "fade";
  const visual = reaction.visual || {};

  return (
    <div className="relative mx-auto h-80 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
      <div className="absolute inset-x-0 top-5 text-center text-sm font-medium text-slate-500">选择反应物后，点击“混合”观察实验现象</div>
      <div className="absolute left-6 top-20 h-36 w-32 rounded-b-[2rem] border-4 border-blue-200 bg-white/80">
        <div className="absolute bottom-0 h-24 w-full rounded-b-[1.6rem] bg-blue-200/70" />
        <div className="absolute inset-x-0 -top-12 text-center text-xs font-semibold text-slate-700">{leftSub.formula}<br />{leftSub.ions.join("、")}</div>
      </div>
      <div className="absolute right-6 top-20 h-36 w-32 rounded-b-[2rem] border-4 border-violet-200 bg-white/80">
        <div className="absolute bottom-0 h-24 w-full rounded-b-[1.6rem] bg-violet-200/70" />
        <div className="absolute inset-x-0 -top-12 text-center text-xs font-semibold text-slate-700">{rightSub.formula}<br />{rightSub.ions.join("、")}</div>
      </div>
      <AnimatePresence>
        {mixed && <>
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "32%", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute left-[23%] top-36 h-3 origin-left rotate-12 rounded-full bg-blue-300" />
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "32%", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute right-[23%] top-36 h-3 origin-right -rotate-12 rounded-full bg-violet-300" />
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.7 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.55 }} className="absolute left-1/2 top-32 h-36 w-44 -translate-x-1/2 rounded-b-[2.3rem] border-4 border-cyan-200" style={{ backgroundColor: visual.solution || "#cffafe" }}>
            {showPrecipitate && [...Array(18)].map((_, i) => <motion.span key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.03 }} className="absolute h-2 w-2 rounded-full shadow" style={{ left: `${14 + (i % 6) * 15}%`, bottom: `${8 + Math.floor(i / 6) * 18}%`, backgroundColor: visual.precipitate || "#ffffff" }} />)}
            {showGas && [...Array(14)].map((_, i) => <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 0], y: -80 }} transition={{ delay: 0.65 + i * 0.08, repeat: Infinity, duration: 1.8 }} className="absolute h-3 w-3 rounded-full border-2 bg-transparent" style={{ left: `${18 + (i % 5) * 16}%`, bottom: `${8 + (i % 3) * 8}%`, borderColor: visual.bubble || "#ffffff" }} />)}
            {showNeutral && <motion.div animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.9, 1.05, 0.9] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute left-1/2 top-1/2 flex h-20 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange-100 text-center text-sm font-black text-orange-700">生成水<br />轻微放热</motion.div>}
            {showNone && <div className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/80 p-3 text-center text-sm font-bold text-slate-600">无明显<br />实验现象</div>}
            {showColor && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/80 p-3 text-center text-sm font-bold text-slate-700">溶液显色<br />{reaction.visualLabel}</motion.div>}
            {showFade && <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.9, 0.35, 0.9] }} transition={{ duration: 1.4, repeat: Infinity }} className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/80 p-3 text-center text-sm font-bold text-slate-700">颜色逐渐<br />褪去</motion.div>}
            <div className="absolute inset-x-0 bottom-3 text-center text-sm font-bold text-blue-900">{reaction.visualLabel || reaction.category}</div>
          </motion.div>
        </>}
      </AnimatePresence>
      {mixed && <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 p-3 text-center text-sm font-semibold text-slate-700 shadow-sm">现象记录：{reaction.phenomenon}</div>}
    </div>
  );
}

function IonBubble({ ion, showLabel, onClick, delay = 0 }) {
  return (
    <motion.button type="button" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.12 }} transition={{ delay, type: "spring", stiffness: 120 }} onClick={() => onClick(ion)} className={`absolute flex h-16 w-16 items-center justify-center rounded-full ${ion.color} text-sm font-bold text-white shadow-lg ring-4 ring-white/70`} style={{ left: ion.left, top: ion.top }} aria-label={ion.label}>
      {showLabel ? ion.label : ""}
    </motion.button>
  );
}

function getMicroScene(selectedA, selectedB, reaction, mixed) {
  const left = getSubstance(selectedA);
  const right = getSubstance(selectedB);
  const leftIons = left?.ions || [];
  const rightIons = right?.ions || [];
  const allIons = [...leftIons, ...rightIons];

  if (!mixed) {
    return {
      left,
      right,
      leftIons,
      rightIons,
      reactingIons: [],
      products: [],
      spectatorIons: [],
      freeIons: allIons,
      kind: reaction?.kind || "none",
    };
  }

  if (!reaction || reaction.kind === "none") {
    return {
      left,
      right,
      leftIons,
      rightIons,
      reactingIons: [],
      products: [],
      spectatorIons: allIons,
      freeIons: allIons,
      kind: "none",
    };
  }

  const spectatorIons = reaction.spectators || [];
  const products = Array.from(new Set([
    ...(reaction.noSplit || []),
    ...(reaction.correctCards || []).filter((item) => item.includes("↓") || item.includes("↑") || item === "H₂O" || item.includes("(") || item.includes("SCN")),
  ]));
  const reactingIons = (reaction.inferenceIons || allIons.filter((ion) => !spectatorIons.includes(ion))).filter((ion) => !products.includes(ion));

  return {
    left,
    right,
    leftIons,
    rightIons,
    reactingIons,
    products,
    spectatorIons,
    freeIons: spectatorIons,
    kind: reaction.kind,
  };
}

function IonChip({ label, tone = "blue" }) {
  const toneMap = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    purple: "border-violet-200 bg-violet-50 text-violet-800",
    orange: "border-orange-200 bg-orange-50 text-orange-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    red: "border-red-200 bg-red-50 text-red-800",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${toneMap[tone] || toneMap.blue}`}>{label}</span>;
}

function MicroVisualizationModule({ selectedA, selectedB, reaction, mixed, setMixed, markDone }) {
  const scene = useMemo(() => getMicroScene(selectedA, selectedB, reaction, mixed), [selectedA, selectedB, reaction, mixed]);
  const [selectedLabel, setSelectedLabel] = useState(null);

  useEffect(() => {
    setSelectedLabel(null);
  }, [selectedA, selectedB, mixed]);

  const selectedRole = useMemo(() => {
    if (!selectedLabel) return null;
    if (!mixed) return "该粒子目前仍在原溶液中自由移动，尚未混合反应。";
    if (scene.reactingIons.includes(selectedLabel)) return "反应离子：混合后发生有效变化，参与净离子反应。";
    if (scene.products.includes(selectedLabel)) return "生成物：由反应离子结合、转化或离开溶液体系形成。";
    if (scene.spectatorIons.includes(selectedLabel)) return "旁观离子：反应前后都存在，没有发生本质变化。";
    return "该粒子在当前微观场景中没有被归入主要反应过程。";
  }, [selectedLabel, mixed, scene]);

  function handleMixAndMark() {
    setMixed(true);
    markDone();
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-950">微观粒子可视化</h3>
            <p className="mt-1 text-sm text-slate-500">当前微观演示与模块一所选反应物同步。</p>
          </div>
          <button onClick={handleMixAndMark} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">混合并观察微观过程</button>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-5">
          {!mixed ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5">
                <h4 className="mb-2 text-base font-black text-slate-900">左侧烧杯：{scene.left?.formula}</h4>
                <p className="mb-4 text-sm text-slate-600">{scene.left?.label}</p>
                <div className="flex flex-wrap gap-2">
                  {scene.leftIons.map((ion, i) => <button key={`${ion}-${i}`} onClick={() => setSelectedLabel(ion)}><IonChip label={ion} tone="blue" /></button>)}
                </div>
              </div>
              <div className="rounded-[2rem] border border-violet-100 bg-violet-50 p-5">
                <h4 className="mb-2 text-base font-black text-slate-900">右侧烧杯：{scene.right?.formula}</h4>
                <p className="mb-4 text-sm text-slate-600">{scene.right?.label}</p>
                <div className="flex flex-wrap gap-2">
                  {scene.rightIons.map((ion, i) => <button key={`${ion}-${i}`} onClick={() => setSelectedLabel(ion)}><IonChip label={ion} tone="purple" /></button>)}
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 text-sm leading-6 text-slate-600 shadow-sm md:col-span-2">混合前，电解质在水溶液中已经电离成自由移动的离子。点击“混合并观察微观过程”后，可查看哪些离子真正发生了变化。</div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-5">
                <h4 className="mb-3 text-base font-black text-slate-900">参与反应的粒子</h4>
                <div className="flex flex-wrap gap-2">
                  {scene.reactingIons.length ? scene.reactingIons.map((ion, i) => <button key={`${ion}-${i}`} onClick={() => setSelectedLabel(ion)}><IonChip label={ion} tone="orange" /></button>) : <span className="text-sm text-slate-500">无明显参与净反应的离子</span>}
                </div>
              </div>
              <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5">
                <h4 className="mb-3 text-base font-black text-slate-900">生成物 / 现象对应</h4>
                <div className="flex flex-wrap gap-2">
                  {scene.products.length ? scene.products.map((item, i) => <button key={`${item}-${i}`} onClick={() => setSelectedLabel(item)}><IonChip label={item} tone="green" /></button>) : <span className="text-sm text-slate-500">无沉淀、气体或弱电解质生成</span>}
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-3 text-base font-black text-slate-900">旁观离子 / 共存粒子</h4>
                <div className="flex flex-wrap gap-2">
                  {scene.spectatorIons.length ? scene.spectatorIons.map((ion, i) => <button key={`${ion}-${i}`} onClick={() => setSelectedLabel(ion)}><IonChip label={ion} tone="slate" /></button>) : <span className="text-sm text-slate-500">无旁观离子</span>}
                </div>
              </div>
              <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5">
                <h4 className="mb-3 text-base font-black text-slate-900">微观结论</h4>
                <p className="text-sm leading-6 text-slate-700">{reaction.kind === "none" ? "混合后所有主要离子仍在溶液中共存，没有生成沉淀、气体或弱电解质，因此没有净离子反应。" : `当前反应类型为“${reaction.category}”，宏观现象是：${reaction.phenomenon}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">微观解释面板</h3>
        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-4"><b>当前反应物：</b>{scene.left?.formula} + {scene.right?.formula}</div>
          <div className="rounded-2xl bg-slate-50 p-4"><b>实验现象：</b>{reaction.phenomenon}</div>
          <div className="rounded-2xl bg-slate-50 p-4"><b>净离子方程式：</b>{reaction.netIon}</div>
          <div className="rounded-2xl bg-slate-50 p-4"><b>点击说明：</b>{selectedLabel ? `${selectedLabel}：${selectedRole}` : "点击任意离子或生成物，可查看它在当前反应中的角色。"}</div>
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-orange-800"><b>书写提示：</b>{reaction.tip}</div>
        </div>
      </div>
    </div>
  );
}

function EquationTrainer({ addMistake }) {
  const [idx, setIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("全部");
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({ fullEq: "", totalIon: "", netIon: "" });
  const [stepFeedback, setStepFeedback] = useState(null);
  const reaction = reactionBank[idx];
  const categories = ["全部", ...Array.from(new Set(reactionBank.map((r) => r.category)))];
  const filteredReactions = reactionBank.filter((r) => {
    const matchCategory = categoryFilter === "全部" || r.category === categoryFilter;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || r.title.toLowerCase().includes(q) || r.netIon.toLowerCase().includes(q) || r.number === q;
    return matchCategory && matchQuery;
  });
  const steps = [
    { key: "fullEq", label: "完整方程式", answer: reaction.fullEq, hint: "先保证化学式、生成物和系数正确。" },
    { key: "totalIon", label: "总离子方程式", answer: reaction.totalIon, hint: "可溶强电解质拆；沉淀、气体、水不拆。" },
    { key: "netIon", label: "净离子方程式", answer: reaction.netIon, hint: "删去旁观离子，并检查原子守恒和电荷守恒。" },
  ];

  function changeReaction(next) {
    setIdx(next); setSelected([]); setFeedback(null); setStep(0); setInputs({ fullEq: "", totalIon: "", netIon: "" }); setStepFeedback(null);
  }
  function toggleCard(card) { setSelected((prev) => prev.includes(card) ? prev.filter((x) => x !== card) : [...prev, card]); setFeedback(null); }
  function checkCards() {
    const ok = isCardSelectionCorrect(selected, reaction);
    const missing = reaction.correctCards.filter((x) => !selected.includes(x));
    const extra = selected.filter((x) => !reaction.correctCards.includes(x));
    setFeedback(ok ? { ok: true, text: reaction.kind === "none" ? "判断正确：本题没有净离子反应，不需要选择反应粒子。" : `选择正确：净反应为 ${reaction.netIon}` } : { ok: false, text: "还需要调整。" + (missing.length ? " 缺少：" + missing.join("、") + "。" : "") + (extra.length ? " 多选：" + extra.join("、") + "。" : "") });
    if (!ok) addMistake(reaction.kind === "none" ? "condition" : "spectator");
  }
  function checkStep() {
    const current = steps[step];
    const ok = normalizeEquation(inputs[current.key]) === normalizeEquation(current.answer);
    setStepFeedback(ok ? { ok: true, text: "这一步正确，可以进入下一步。" } : { ok: false, text: `这一步还不准确。提示：${current.hint}` });
    if (!ok) addMistake(step === 1 ? "split" : step === 2 ? "spectator" : "charge");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.25fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><Icon name="book" /></div><div><h3 className="font-bold text-slate-950">题库选择</h3><p className="text-sm text-slate-500">由浅入深训练</p></div></div>
        <div className="mb-4 space-y-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索题号、反应名称或方程式，如 BaSO4、AgCl" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          <button onClick={() => { const pool = filteredReactions.length ? filteredReactions : reactionBank; const pick = pool[Math.floor(Math.random() * pool.length)]; changeReaction(reactionBank.findIndex((x) => x.id === pick.id)); }} className="w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600">随机抽一题</button>
          <p className="text-xs font-semibold text-slate-500">当前显示 {filteredReactions.length} / {reactionBank.length} 条题库</p>
        </div>
        <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
          {filteredReactions.map((r) => { const i = reactionBank.findIndex((x) => x.id === r.id); return <button key={r.id} onClick={() => changeReaction(i)} className={`w-full rounded-2xl border p-3 text-left transition ${idx === i ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-blue-300"}`}><div className="flex items-center justify-between gap-2"><b className="text-sm text-slate-900">{r.title}</b><Pill tone={r.level === "基础" ? "green" : r.level === "提高" ? "orange" : "blue"}>{r.level}</Pill></div><p className="mt-2 text-xs text-slate-500">{r.category}｜{r.phenomenon}</p></button>; })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3"><h3 className="text-lg font-bold text-slate-950">分步书写检查</h3><Pill tone="blue">写 → 拆 → 删 → 查</Pill></div>
        <div className="mb-5 grid gap-2 md:grid-cols-3">{steps.map((s, i) => <button key={s.key} onClick={() => { setStep(i); setStepFeedback(null); }} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${step === i ? "bg-blue-600 text-white shadow" : "bg-white text-slate-600 hover:bg-blue-50"}`}>{i + 1}. {s.label}</button>)}</div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-bold text-slate-600">{steps[step].label}</p>
          <textarea value={inputs[steps[step].key]} onChange={(e) => setInputs((prev) => ({ ...prev, [steps[step].key]: e.target.value }))} placeholder="在这里输入你的答案，例如：Ba²⁺ + SO₄²⁻ = BaSO₄↓" className="h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white" />
          <div className="mt-3 flex flex-wrap gap-3"><button onClick={checkStep} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700">检查这一步</button><button onClick={() => setInputs((prev) => ({ ...prev, [steps[step].key]: steps[step].answer }))} className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200">显示标准答案</button></div>
          {stepFeedback && <div className={`mt-4 rounded-2xl p-4 text-sm ${stepFeedback.ok ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-800"}`}><b>{stepFeedback.ok ? "正确。" : "需修正。"}</b>{stepFeedback.text}</div>}
        </div>
        <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm leading-6 text-orange-800"><b>本题提示：</b>{reaction.tip}</div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-slate-950">拖拽替代：点击选择反应粒子</h3>
        <div className="flex flex-wrap gap-3">{reaction.cards.map((card) => <button key={card} onClick={() => toggleCard(card)} className={`rounded-2xl border px-4 py-3 font-bold transition ${selected.includes(card) ? "border-blue-500 bg-blue-600 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300"}`}>{card}</button>)}</div>
        {reaction.kind === "none" && <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">本题无净离子反应，正确操作是不要选择任何反应粒子。</p>}
        <button onClick={checkCards} className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">检查选择</button>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-sm font-medium text-slate-500">标准净离子方程式</p><p className="mt-2 text-lg font-bold text-slate-950">{reaction.netIon}</p></div>
        {feedback && <div className={`mt-4 rounded-2xl p-4 text-sm ${feedback.ok ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>{feedback.text}</div>}
      </div>
    </div>
  );
}

function DynamicKnowledgeModule({ selectedA, selectedB, reaction, markDone }) {
  const [activeTab, setActiveTab] = useState("concept");
  const scene = useMemo(() => getMicroScene(selectedA, selectedB, reaction, true), [selectedA, selectedB, reaction]);
  const left = getSubstance(selectedA);
  const right = getSubstance(selectedB);

  const conditionText = useMemo(() => {
    if (reaction.kind === "precipitate") return "该反应发生的主要原因是生成难溶沉淀，相关离子被移出溶液体系。";
    if (reaction.kind === "gas") return "该反应发生的主要原因是生成气体，气体逸出后推动反应进行。";
    if (reaction.kind === "neutralization") return "该反应发生的主要原因是 H⁺ 与 OH⁻ 结合生成弱电解质 H₂O。";
    if (reaction.kind === "color") return "该反应的特点是生成有颜色的络合物或单质，宏观上体现为溶液颜色变化。";
    if (reaction.kind === "fade") return "该反应体现为氧化还原过程，原有有色物质被消耗，因此出现褪色现象。";
    return "这组溶液混合后没有生成沉淀、气体或弱电解质，因此没有净离子反应。";
  }, [reaction]);

  const tabs = [
    { id: "concept", label: "本反应本质" },
    { id: "split", label: "可拆/不可拆" },
    { id: "steps", label: "写拆删查" },
    { id: "teacher", label: "教师讲解提示" },
  ];

  function selectTab(id) {
    setActiveTab(id);
    markDone();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-bold text-blue-700">反应物 A</p>
          <p className="mt-1 text-xl font-black text-slate-950">{left.formula}</p>
          <p className="mt-2 text-sm text-slate-600">电离粒子：{scene.leftIons.join("、")}</p>
        </div>
        <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-5 text-center">
          <p className="text-sm font-bold text-orange-700">当前反应类型</p>
          <p className="mt-1 text-xl font-black text-slate-950">{reaction.category}</p>
          <p className="mt-2 text-sm text-slate-600">{reaction.phenomenon}</p>
        </div>
        <div className="rounded-[2rem] border border-violet-100 bg-violet-50 p-5">
          <p className="text-sm font-bold text-violet-700">反应物 B</p>
          <p className="mt-1 text-xl font-black text-slate-950">{right.formula}</p>
          <p className="mt-2 text-sm text-slate-600">电离粒子：{scene.rightIons.join("、")}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-black text-slate-950">围绕当前反应讲解</h3>
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => selectTab(tab.id)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-blue-50"}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            <b>当前净离子方程式：</b><br />{reaction.netIon}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {activeTab === "concept" && (
            <div>
              <Pill tone={reaction.kind === "none" ? "slate" : "orange"}>{reaction.category}</Pill>
              <h3 className="mt-4 text-2xl font-black text-slate-950">从现象解释离子反应本质</h3>
              <p className="mt-4 leading-7 text-slate-700">{conditionText}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-orange-50 p-4 text-orange-900"><b>反应离子：</b><br />{scene.reactingIons.length ? scene.reactingIons.join("、") : "无明显反应离子"}</div>
                <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-900"><b>生成物：</b><br />{scene.products.length ? scene.products.join("、") : "无沉淀/气体/弱电解质"}</div>
                <div className="rounded-2xl bg-slate-50 p-4 text-slate-700"><b>旁观离子：</b><br />{scene.spectatorIons.length ? scene.spectatorIons.join("、") : "无"}</div>
              </div>
            </div>
          )}

          {activeTab === "split" && (
            <div>
              <h3 className="text-2xl font-black text-slate-950">本反应中哪些能拆，哪些不能拆？</h3>
              <p className="mt-4 leading-7 text-slate-700">可溶强电解质在总离子方程式中拆成离子；沉淀、气体、水、弱电解质和络合物一般保留化学式。</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <Pill tone="green">本题可拆/已电离</Pill>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-emerald-900">
                    <p>{left.formula} → {scene.leftIons.join(" + ")}</p>
                    <p>{right.formula} → {scene.rightIons.join(" + ")}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                  <Pill tone="red">本题不可拆/保留</Pill>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-red-900">
                    {reaction.noSplit.length ? reaction.noSplit.map((item) => <p key={item}>{item}</p>) : <p>本反应无明显不可拆生成物。</p>}
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900"><b>旁观离子处理：</b>{reaction.spectators.length ? `${reaction.spectators.join("、")} 在反应前后没有本质变化，应在净离子方程式中删去。` : "本反应没有需要删去的旁观离子，或没有净离子反应。"}</div>
            </div>
          )}

          {activeTab === "steps" && (
            <div>
              <h3 className="text-2xl font-black text-slate-950">把当前反应写成离子方程式</h3>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4"><Pill tone="blue">写</Pill><p className="mt-3 font-mono text-sm text-slate-700">{reaction.fullEq}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Pill tone="blue">拆</Pill><p className="mt-3 font-mono text-sm text-slate-700">{reaction.totalIon}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><Pill tone="blue">删</Pill><p className="mt-3 text-sm text-slate-700">删去旁观离子：{reaction.spectators.length ? reaction.spectators.join("、") : "无"}</p></div>
                <div className="rounded-2xl bg-emerald-50 p-4"><Pill tone="green">查</Pill><p className="mt-3 font-mono text-sm font-bold text-emerald-900">{reaction.netIon}</p><p className="mt-2 text-sm leading-6 text-emerald-800">检查原子种类、原子个数和总电荷是否守恒。</p></div>
              </div>
            </div>
          )}

          {activeTab === "teacher" && (
            <div>
              <h3 className="text-2xl font-black text-slate-950">教师讲解提示</h3>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
                <div className="rounded-2xl bg-blue-50 p-4"><b>追问 1：</b>为什么实验中会出现“{reaction.phenomenon}”？它对应哪一种离子反应发生条件？</div>
                <div className="rounded-2xl bg-orange-50 p-4"><b>追问 2：</b>{reaction.spectators.length ? `${reaction.spectators.join("、")} 为什么是旁观离子？如果不删它们，会不会影响反应本质表达？` : "如果没有明显净反应，应如何说明离子仍然共存？"}</div>
                <div className="rounded-2xl bg-emerald-50 p-4"><b>板书建议：</b>左边写完整方程式，中间写总离子方程式，用颜色圈出反应离子和旁观离子，右边写净离子方程式。</div>
                <div className="rounded-2xl bg-slate-50 p-4"><b>易错提醒：</b>{reaction.tip}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UnknownInferenceModule({ addMistake, markDone }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [coAnswers, setCoAnswers] = useState({});
  const current = unknownCases[caseIndex];
  const correctUnknown = selected === current.answer;

  function chooseUnknown(option) {
    setSelected(option);
    markDone();
    if (option !== current.answer) addMistake("condition");
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-950">未知溶液混合推断</h3>
            <p className="mt-1 text-sm text-slate-500">根据实验现象反推未知溶液中可能含有的离子。</p>
          </div>
          <Pill tone="blue">{caseIndex + 1}/{unknownCases.length}</Pill>
        </div>

        <div className="mb-5 grid gap-2 md:grid-cols-4">
          {unknownCases.map((item, i) => (
            <button key={item.id} onClick={() => { setCaseIndex(i); setSelected(""); }} className={`rounded-2xl px-3 py-3 text-sm font-bold transition ${caseIndex === i ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50"}`}>案例 {i + 1}</button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative h-72 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-5">
            <div className="absolute left-6 top-12 h-28 w-24 rounded-b-[2rem] border-4 border-blue-200 bg-white/80"><div className="absolute bottom-0 h-20 w-full rounded-b-[1.6rem] bg-blue-200/70" /><div className="absolute inset-x-0 -top-8 text-center text-xs font-bold text-slate-600">未知溶液 A</div></div>
            <div className="absolute right-6 top-12 h-28 w-24 rounded-b-[2rem] border-4 border-violet-200 bg-white/80"><div className="absolute bottom-0 h-20 w-full rounded-b-[1.6rem] bg-violet-200/70" /><div className="absolute inset-x-0 -top-8 text-center text-xs font-bold text-slate-600">未知溶液 B</div></div>
            <div className="absolute left-1/2 top-28 h-28 w-36 -translate-x-1/2 rounded-b-[2rem] border-4 border-cyan-200" style={{ backgroundColor: current.visual.kind === "color" ? current.visual.color : "#dbeafe" }}>
              {current.visual.kind === "precipitate" && [...Array(18)].map((_, i) => <span key={i} className="absolute h-2 w-2 rounded-full shadow" style={{ backgroundColor: current.visual.color, left: `${14 + (i % 6) * 15}%`, bottom: `${8 + Math.floor(i / 6) * 18}%` }} />)}
              {current.visual.kind === "gas" && [...Array(12)].map((_, i) => <motion.span key={i} animate={{ opacity: [0, 1, 0], y: -70 }} transition={{ delay: i * 0.08, duration: 1.6, repeat: Infinity }} className="absolute h-3 w-3 rounded-full border-2 border-white" style={{ left: `${18 + (i % 5) * 16}%`, bottom: `${8 + (i % 3) * 8}%` }} />)}
              <div className="absolute inset-x-0 bottom-3 text-center text-xs font-black text-slate-700">观察现象</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black text-slate-950">{current.title}</h4>
            <div className="mt-3 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-900"><b>实验现象：</b>{current.visible}</div>
            <p className="mt-5 mb-3 text-sm font-bold text-slate-600">推测这两份未知溶液中可能有什么离子？</p>
            <div className="space-y-2">
              {current.candidates.map((option) => (
                <button key={option} onClick={() => chooseUnknown(option)} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${selected === option ? (correctUnknown ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-red-400 bg-red-50 text-red-800") : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300"}`}>{option}</button>
              ))}
            </div>
            {selected && <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${correctUnknown ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-800"}`}><b>{correctUnknown ? "推断正确。" : "推断不准确。"}</b>{current.reason}</div>}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-950">离子共存题</h3>
            <p className="mt-1 text-sm text-slate-500">围绕沉淀、气体、弱电解质、颜色限制进行判断。</p>
          </div>
          <Icon name="clipboard" className="text-2xl text-blue-600" />
        </div>
        <div className="space-y-5">
          {coexistenceQuestions.map((q, i) => {
            const chosen = coAnswers[i];
            const ok = chosen === q.answer;
            return (
              <div key={q.question} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-black leading-6 text-slate-900">{i + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((op) => (
                    <button key={op} onClick={() => { setCoAnswers((prev) => ({ ...prev, [i]: op })); markDone(); if (op !== q.answer) addMistake("condition"); }} className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${chosen === op ? (ok ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-red-400 bg-red-50 text-red-800") : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}>{op}</button>
                  ))}
                </div>
                {chosen && <p className={`mt-3 rounded-xl p-3 text-xs leading-5 ${ok ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-800"}`}>{q.reason}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function IonReactionLearningPage() {
  const [progress, setProgress] = useState(0);
  const [leftReactant, setLeftReactant] = useState("BaCl2");
  const [rightReactant, setRightReactant] = useState("Na2SO4");
  const [demoReaction, setDemoReaction] = useState(getReactionForReactants("BaCl2", "Na2SO4"));
  const currentReaction = useMemo(() => getReactionForReactants(leftReactant, rightReactant), [leftReactant, rightReactant]);
  const [mixed, setMixed] = useState(false);
  const [view, setView] = useState("micro");
  const [showLabels, setShowLabels] = useState(true);
  const [selectedIon, setSelectedIon] = useState(ions[0]);
  const [expanded, setExpanded] = useState(0);
  const [mode, setMode] = useState("学生模式");
  const [sound, setSound] = useState(false);
  const [answers, setAnswers] = useState({});
  const [mistakes, setMistakes] = useState([]);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setDemoReaction(currentReaction);
    setMixed(false);
  }, [currentReaction]);

  useEffect(() => {
    runSelfTests();
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addMistake = (id) => setMistakes((prev) => prev.includes(id) ? prev : [...prev, id]);
  const score = useMemo(() => ({ total: practiceQuestions.length, correct: practiceQuestions.filter((q, i) => answers[i] === q.answer).length }), [answers]);
  const courseProgress = Math.round((Object.keys(completed).length / 8) * 100);
  const weakText = mistakes.length ? mistakes.map((id) => errorTypes.find((e) => e.id === id)?.title).filter(Boolean).join("、") : "暂无明显薄弱点";
  const reportText = `离子反应学习报告\n\n实验选择：${getSubstance(leftReactant).formula} + ${getSubstance(rightReactant).formula}\n实验预判：${demoReaction.phenomenon}\n净离子方程式：${demoReaction.netIon}\n练习正确率：${score.correct}/${score.total}\n薄弱点：${weakText}\n建议：复习可拆/不可拆原则，按“写、拆、删、查”检查离子方程式。`;

  function startDemoFromSelector(reaction) {
    const nextReaction = reaction || currentReaction;
    setDemoReaction(nextReaction);
    setMixed(false);
    setCompleted((prev) => ({ ...prev, preselect: true }));
    scrollToId("experiment");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <button onClick={() => scrollToId("hero")} className="flex items-center gap-3 text-white"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500"><Icon name="flask" /></div><div className="text-left"><p className="text-sm font-bold leading-none">离子反应实验室</p><p className="mt-1 text-xs text-blue-200">从现象到本质</p></div></button>
          <div className="hidden items-center gap-1 lg:flex">{navItems.map((item) => <button key={item.id} onClick={() => scrollToId(item.id)} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">{item.label}</button>)}</div>
          <div className="flex items-center gap-2"><button onClick={() => setMode(mode === "学生模式" ? "教师模式" : "学生模式")} className="hidden rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 md:inline-flex">{mode}</button><button onClick={() => setSound(!sound)} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${sound ? "bg-orange-500 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}><Icon name="sound" /></button><button onClick={() => scrollToId("experiment")} className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600">开始学习</button></div>
        </div>
        <div className="h-1 bg-slate-800"><div className="h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-orange-400 transition-all" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="fixed right-4 top-28 z-40 hidden rounded-2xl border border-white/70 bg-white/80 p-3 shadow-lg backdrop-blur md:block"><div className="mb-2 text-center text-xs font-bold text-slate-500">页面进度</div><div className="relative mx-auto h-48 w-3 overflow-hidden rounded-full bg-slate-200"><div className="absolute bottom-0 w-full rounded-full bg-blue-500 transition-all" style={{ height: `${progress}%` }} /></div><div className="mt-2 text-center text-xs font-bold text-blue-700">{progress}%</div><div className="mt-3 rounded-xl bg-blue-50 p-2 text-center text-xs font-bold text-blue-700">完成 {courseProgress}%</div></div>

      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 pt-28 text-white md:px-6">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(59,130,246,.6), transparent 28%), radial-gradient(circle at 80% 30%, rgba(16,185,129,.35), transparent 30%), radial-gradient(circle at 50% 90%, rgba(249,115,22,.25), transparent 28%)" }} />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur"><Icon name="micro" /> 高中化学互动式教学网页</div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">离子反应探秘</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-blue-50">先自己选择反应物，预测是否发生离子反应，再进入实验演示、微观解释和离子方程式训练。</p>
            <div className="mt-8 flex flex-wrap gap-4"><button onClick={() => scrollToId("experiment")} className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.03] hover:bg-orange-600"><Icon name="play" /> 查看实验演示</button><button onClick={() => scrollToId("practice")} className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:bg-white/20">直接做练习 <Icon name="arrow" /></button></div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">{["选反应物", "看现象", "写方程式"].map((item, i) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur"><p className="text-2xl font-black text-orange-300">0{i + 1}</p><p className="mt-1 text-sm font-semibold text-blue-50">{item}</p></div>)}</div>
          </motion.div>
          <ReactantSelectorPanel left={leftReactant} right={rightReactant} setLeft={setLeftReactant} setRight={setRightReactant} onStartDemo={startDemoFromSelector} />
        </div>
      </section>

      <section id="experiment" className="scroll-mt-20 px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块一：自选反应物实验演示" title="由学生选择反应物，再观察宏观现象" desc="实验区会同步首页选择的两种溶液，并根据反应类型显示沉淀、气泡、中和或无明显现象。" icon="beaker" />
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-4"><p className="text-sm font-bold text-blue-700">当前反应物 A</p><p className="mt-1 text-lg font-black text-slate-950">{getSubstance(leftReactant).formula}</p></div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center"><p className="text-sm font-bold text-orange-700">系统预判</p><p className="mt-1 text-lg font-black text-slate-950">{demoReaction.category}</p></div>
            <div className="rounded-2xl bg-violet-50 p-4"><p className="text-sm font-bold text-violet-700">当前反应物 B</p><p className="mt-1 text-lg font-black text-slate-950">{getSubstance(rightReactant).formula}</p></div>
          </div>
          <BeakerVisual mixed={mixed} reaction={demoReaction} leftId={leftReactant} rightId={rightReactant} />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4"><button onClick={() => { setMixed(true); setCompleted((p) => ({ ...p, experiment: true })); }} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-blue-700"><Icon name="play" /> 混合溶液</button><button onClick={() => setMixed(false)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-200"><Icon name="reset" /> 重置实验</button><button onClick={() => scrollToId("hero")} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:scale-[1.02]">重新选择反应物</button><button onClick={() => scrollToId("micro")} className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-orange-600">观察微观过程 <Icon name="arrow" /></button></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="mb-2 text-sm font-black text-blue-600">现象</p><p className="font-semibold leading-6 text-slate-800">{demoReaction.phenomenon}</p></div><div className="rounded-2xl border border-orange-100 bg-orange-50 p-5"><p className="mb-2 text-sm font-black text-orange-600">净离子方程式</p><p className="font-mono text-sm font-semibold leading-6 text-slate-800">{demoReaction.netIon}</p></div><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><p className="mb-2 text-sm font-black text-emerald-600">判断依据</p><p className="font-semibold leading-6 text-slate-800">{demoReaction.tip}</p></div></div>
          {mode === "教师模式" && <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-orange-800"><b>教师提示：</b>让学生先预测“是否有沉淀、气体或弱电解质生成”，再点击混合。这样可以把实验观察和离子反应条件直接对应起来。</div>}
        </div>
      </section>

      <section id="micro" className="scroll-mt-20 bg-white px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块二：同步微观粒子可视化" title="模块一选什么，模块二就展示什么" desc="微观区会读取模块一当前选择的反应物，混合前显示电离离子，混合后显示反应离子、生成物和旁观离子。" icon="micro" hideTitle />
        <MicroVisualizationModule selectedA={leftReactant} selectedB={rightReactant} reaction={demoReaction} mixed={mixed} setMixed={setMixed} markDone={() => setCompleted((p) => ({ ...p, micro: true }))} />
      </section>

      <section id="knowledge" className="scroll-mt-20 px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块四：同步知识讲解" title="知识讲解也围绕当前所选反应展开" desc="本模块读取模块一选择的反应物和模块二的微观结果，动态讲解反应本质、发生条件、拆分原则和离子方程式书写步骤。" icon="book" hideTitle />
        <DynamicKnowledgeModule selectedA={leftReactant} selectedB={rightReactant} reaction={demoReaction} markDone={() => setCompleted((p) => ({ ...p, knowledge: true }))} />
      </section>

      <section id="equation" className="scroll-mt-20 bg-white px-4 py-20 md:px-6"><SectionTitle eyebrow="模块四：离子方程式书写训练" title="题库切换 + 分步输入 + 粒子选择" desc="学生既可以按“写、拆、删、查”输入方程式，也可以通过点击粒子卡片判断反应离子与旁观离子。" icon="clipboard" /><div className="mx-auto max-w-7xl"><EquationTrainer addMistake={(id) => { addMistake(id); setCompleted((p) => ({ ...p, equation: true })); }} /></div></section>

      <section id="practice" className="scroll-mt-20 px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块五：互动练习" title="用多题型巩固判断、选择与排序能力" desc="答题后立即显示解释，错误会自动进入薄弱点诊断。" icon="cap" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">{practiceQuestions.map((q, i) => { const chosen = answers[i]; const isCorrect = chosen === q.answer; return <div key={q.question} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-4 flex items-center justify-between gap-3"><Pill tone="orange">{q.type}</Pill>{chosen ? <Icon name={isCorrect ? "check" : "close"} className={`text-2xl ${isCorrect ? "text-emerald-500" : "text-red-500"}`} /> : null}</div><h3 className="min-h-16 text-lg font-black leading-7 text-slate-950">{q.question}</h3><div className="mt-5 space-y-2">{q.options.map((op) => <button key={op} onClick={() => { setAnswers((prev) => ({ ...prev, [i]: op })); setCompleted((p) => ({ ...p, practice: true })); if (op !== q.answer) addMistake(i === 3 ? "split" : i === 4 ? "condition" : "spectator"); }} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${chosen === op ? (isCorrect ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-red-400 bg-red-50 text-red-800") : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>{op}</button>)}</div>{chosen && <div className={`mt-5 rounded-2xl p-4 text-sm leading-6 ${isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-800"}`}><b>{isCorrect ? "答对了。" : "再想一想。"}</b>{q.explain}</div>}</div>; })}</div>
        <div className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-xl font-black text-slate-950">练习进度</h3><p className="mt-1 text-slate-600">已答对 {score.correct} / {score.total} 题。连续答对可获得“小离子徽章”。</p></div><div className="flex gap-2">{[...Array(score.correct)].map((_, i) => <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm"><Icon name="atom" /></div>)}</div></div></div>
      </section>

      <section id="diagnosis" className="scroll-mt-20 bg-white px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块六：常见错误诊断" title="不只判对错，更要知道为什么错" desc="系统根据练习与方程式训练记录薄弱点，并生成复习建议。" icon="warn" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">{errorTypes.map((err, i) => { const saved = mistakes.includes(err.id); return <div key={err.id} className={`rounded-[2rem] border p-6 shadow-sm ${saved ? "border-orange-300 bg-orange-50" : "border-slate-200 bg-slate-50"}`}><div className="mb-4 flex items-start justify-between gap-4"><div><Pill tone={saved ? "orange" : "red"}>{saved ? "已标记" : `错误 ${i + 1}`}</Pill><h3 className="mt-3 text-xl font-black text-slate-950">{err.title}</h3></div><button onClick={() => setMistakes((prev) => saved ? prev.filter((x) => x !== err.id) : [...prev, err.id])} className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${saved ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-blue-50"}`}>{saved ? "移出复习" : "我也容易错"}</button></div><div className="rounded-2xl bg-white p-4 font-mono text-sm text-red-700 shadow-sm">错误示例：{err.wrong}</div><div className="mt-4 rounded-2xl bg-white p-4 leading-7 text-slate-700 shadow-sm"><b>诊断：</b>{err.diagnosis}</div><div className="mt-4 rounded-2xl border border-orange-100 bg-white/70 p-4 text-sm leading-6 text-orange-800"><b>提醒：</b>{err.tip}</div></div>; })}</div>
      </section>

      <section id="summary" className="scroll-mt-20 px-4 py-20 md:px-6">
        <SectionTitle eyebrow="模块七：学习报告" title="形成知识地图，完成迁移提升" desc="页面根据学习记录生成报告，并提供总结卡下载入口。" icon="report" />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]"><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-6 text-xl font-black text-slate-950">知识总结思维导图</h3><div className="relative min-h-[430px] rounded-[2rem] bg-gradient-to-br from-blue-50 to-emerald-50 p-6"><div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-center text-lg font-black text-white shadow-xl">离子<br />反应</div>{[{ text: "概念：离子参加", x: "left-[8%] top-[12%]", tone: "bg-white" }, { text: "条件：沉淀/气体/弱电解质", x: "right-[6%] top-[16%]", tone: "bg-white" }, { text: "可拆：强酸强碱可溶盐", x: "left-[4%] bottom-[20%]", tone: "bg-white" }, { text: "四步：写拆删查", x: "right-[10%] bottom-[18%]", tone: "bg-white" }, { text: "易错：沉淀不拆、旁观离子删", x: "left-1/2 top-[6%] -translate-x-1/2", tone: "bg-orange-50" }].map((node) => <div key={node.text} className={`absolute ${node.x} max-w-52 rounded-2xl border border-blue-100 ${node.tone} p-4 text-center text-sm font-bold leading-6 text-slate-700 shadow-sm`}>{node.text}</div>)}</div></div><div className="space-y-6"><div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm"><h3 className="mb-5 text-xl font-black text-slate-950">我的学习报告</h3><div className="space-y-3"><div className="rounded-2xl bg-blue-50 p-4 text-blue-900"><b>自选实验：</b>{getSubstance(leftReactant).formula} + {getSubstance(rightReactant).formula}</div><div className="rounded-2xl bg-emerald-50 p-4 text-emerald-900"><b>练习正确率：</b>{score.correct}/{score.total}</div><div className="rounded-2xl bg-orange-50 p-4 text-orange-900"><b>薄弱点：</b>{weakText}</div><div className="rounded-2xl bg-slate-50 p-4 text-slate-700"><b>建议：</b>重新完成题库中的提高题，并重点检查“可拆/不可拆、旁观离子、电荷守恒”。</div></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => downloadTextFile("离子反应学习报告.txt", reportText)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"><Icon name="download" /> 下载学习报告</button><button onClick={() => scrollToId("hero")} className="rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200">重新选择反应物</button></div></div><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="mb-4 text-xl font-black text-slate-950">拓展问题</h3><div className="space-y-3 text-slate-700"><p className="rounded-2xl bg-slate-50 p-4">1. 为什么酸碱中和反应的本质可以写成 H⁺ + OH⁻ → H₂O？</p><p className="rounded-2xl bg-slate-50 p-4">2. 为什么有些溶液混合后看似“有反应”，实际上没有净离子反应？</p></div></div></div></div>
      </section>

      <footer className="bg-slate-950 px-4 py-10 text-white md:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="font-black">离子反应实验室</p><p className="mt-1 text-sm text-slate-400">网页资源设计方案：自选反应物、实验导入、微观动画、互动练习、错误诊断与学习总结。</p></div><div className="flex flex-wrap gap-2 text-sm text-slate-300"><span>适用：高中化学</span><span>·</span><span>模式：{mode}</span><span>·</span><span>完成度：{courseProgress}%</span></div></div></footer>
    </div>
  );
}
