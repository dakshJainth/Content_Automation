import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Compass, Film, BarChart2, Bot, FileText,
  Anchor, Bookmark, Settings, Search, Bell, TrendingUp,
  Zap, Eye, Heart, MessageCircle, Copy, Download, ChevronDown,
  ArrowLeft, Sparkles, Play, Users, Target, Brain, Hash,
  Activity, CheckCircle, Clock, Instagram, Youtube, Music2,
  Filter, Star, Award, Layers, MoreVertical, RefreshCw
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { Eye, TrendingUp, FileText, Anchor, RefreshCw, Clock, Brain} from "lucide-react";

const COLORS = {
  bg: "#050816",
  bgCard: "rgba(15,20,40,0.7)",
  bgCard2: "rgba(20,28,55,0.8)",
  purple: "#7C3AED",
  violet: "#8B5CF6",
  cyan: "#06B6D4",
  pink: "#EC4899",
  orange: "#F97316",
  green: "#10B981",
  text: "#F9FAFB",
  muted: "#9CA3AF",
  border: "rgba(139,92,246,0.2)",
  borderCyan: "rgba(6,182,212,0.2)",
};

const glassCard = {
  background: "rgba(15,20,40,0.7)",
  border: `1px solid rgba(139,92,246,0.2)`,
  borderRadius: "16px",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};

const glassCardCyan = {
  ...glassCard,
  border: `1px solid rgba(6,182,212,0.2)`,
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --purple: #7C3AED;
    --violet: #8B5CF6;
    --cyan: #06B6D4;
    --green: #10B981;
    --pink: #EC4899;
    --orange: #F97316;
  }

  body, #root {
    background: #050816;
    font-family: 'DM Sans', sans-serif;
    color: #F9FAFB;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, .heading {
    font-family: 'Syne', sans-serif;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #071028; }
  ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.4); border-radius: 3px; }

  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes glow-pulse {
    0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(139,92,246,0.1); }
    50% { box-shadow: 0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.2); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes blob {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes runningDot {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px;
    cursor: pointer; transition: all 0.3s ease;
    font-size: 14px; font-weight: 500; color: #9CA3AF;
    position: relative; overflow: hidden;
  }
  .nav-item:hover {
    color: #F9FAFB;
    background: rgba(139,92,246,0.1);
    transform: translateX(4px);
  }
  .nav-item.active {
    color: #F9FAFB;
    background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(139,92,246,0.3));
    box-shadow: 0 0 20px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.1);
    border: 1px solid rgba(139,92,246,0.4);
  }

  .stat-card {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(139,92,246,0.2) !important;
    border-color: rgba(139,92,246,0.4) !important;
  }

  .agent-node {
    transition: all 0.3s ease;
  }
  .agent-node:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .reel-card {
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
  }
  .reel-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.3);
  }
  .reel-card:hover .reel-overlay {
    opacity: 0.7 !important;
  }

  .filter-pill {
    padding: 6px 16px; border-radius: 20px;
    cursor: pointer; transition: all 0.3s ease;
    font-size: 13px; font-weight: 500;
    border: 1px solid rgba(139,92,246,0.2);
    background: rgba(15,20,40,0.7);
    color: #9CA3AF;
  }
  .filter-pill:hover {
    border-color: rgba(139,92,246,0.5);
    color: white;
  }
  .filter-pill.active {
    background: linear-gradient(135deg, #7C3AED, #8B5CF6);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 20px rgba(139,92,246,0.4);
  }

  .glass-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px;
    cursor: pointer; transition: all 0.3s ease;
    font-size: 14px; font-weight: 600;
    border: none; outline: none;
    font-family: 'Syne', sans-serif;
  }
  .glass-btn.primary {
    background: linear-gradient(135deg, #7C3AED, #8B5CF6);
    color: white;
    box-shadow: 0 0 20px rgba(139,92,246,0.4);
  }
  .glass-btn.primary:hover {
    box-shadow: 0 0 30px rgba(139,92,246,0.7);
    transform: translateY(-2px);
  }
  .glass-btn.secondary {
    background: rgba(15,20,40,0.8);
    color: #9CA3AF;
    border: 1px solid rgba(139,92,246,0.2);
  }
  .glass-btn.secondary:hover {
    color: white;
    border-color: rgba(139,92,246,0.5);
  }

  .search-input {
    background: rgba(15,20,40,0.8);
    border: 1px solid rgba(139,92,246,0.2);
    border-radius: 10px;
    color: white;
    padding: 9px 16px 9px 40px;
    font-size: 14px;
    outline: none;
    width: 100%;
    transition: all 0.3s ease;
    font-family: 'DM Sans', sans-serif;
  }
  .search-input:focus {
    border-color: rgba(139,92,246,0.5);
    box-shadow: 0 0 20px rgba(139,92,246,0.1);
  }
  .search-input::placeholder { color: #4B5563; }

  .select-input {
    background: rgba(15,20,40,0.8);
    border: 1px solid rgba(139,92,246,0.2);
    border-radius: 10px;
    color: white;
    padding: 10px 16px;
    font-size: 14px;
    outline: none;
    width: 100%;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    appearance: none;
  }

  .hook-item {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .hook-item:hover {
    transform: translateX(4px);
    border-color: rgba(139,92,246,0.4) !important;
    box-shadow: 0 0 20px rgba(139,92,246,0.1);
  }

  .tab-btn {
    padding: 8px 16px; border-radius: 8px;
    cursor: pointer; transition: all 0.3s ease;
    font-size: 13px; font-weight: 500;
    border: none; outline: none;
    background: transparent;
    color: #9CA3AF;
    font-family: 'DM Sans', sans-serif;
  }
  .tab-btn:hover { color: white; }
  .tab-btn.active {
    background: rgba(139,92,246,0.2);
    color: white;
    border: 1px solid rgba(139,92,246,0.3);
  }

  .running-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
    background: rgba(16,185,129,0.15);
    color: #10B981;
    border: 1px solid rgba(16,185,129,0.3);
  }
  .running-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #10B981;
    animation: runningDot 1.5s ease-in-out infinite;
  }

  .page-enter {
    animation: fadeInUp 0.4s ease forwards;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: blob 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  .grid-bg {
    background-image: 
      linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

// ─── Sidebar ───────────────────────────────────────────────────────────────
const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "discover", icon: Compass, label: "Discover" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
    { id: "scripts", icon: FileText, label: "Scripts" },
    { id: "hooks", icon: Anchor, label: "Hooks" },
    { id: "saved", icon: Bookmark, label: "Saved" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div style={{
      width: 240, minHeight: "100vh", flexShrink: 0,
      background: "rgba(7,16,40,0.95)",
      borderRight: "1px solid rgba(139,92,246,0.15)",
      backdropFilter: "blur(20px)",
      display: "flex", flexDirection: "column",
      padding: "0",
      position: "sticky", top: 0, height: "100vh", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(139,92,246,0.5)",
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontSize: 18, fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
            <span style={{ color: "white" }}>ViralFlow</span>{" "}
            <span style={{ color: "#8B5CF6" }}>AI</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ id, icon: Icon, label, badge }) => (
            <div
              key={id}
              className={`nav-item${activePage === id ? " active" : ""}`}
              onClick={() => setActivePage(id)}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  color: "white", fontSize: 10, fontWeight: 700,
                  padding: "2px 7px", borderRadius: 20,
                  boxShadow: "0 0 10px rgba(139,92,246,0.5)",
                }}>{badge}</span>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom user */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(139,92,246,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "white",
            boxShadow: "0 0 15px rgba(139,92,246,0.4)",
          }}>M</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Manthan</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>Pro Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = ({ title }) => (
  <div style={{
    height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 28px",
    background: "rgba(5,8,22,0.8)",
    borderBottom: "1px solid rgba(139,92,246,0.1)",
    backdropFilter: "blur(20px)",
    position: "sticky", top: 0, zIndex: 10,
  }}>
    <div style={{ color: "#6B7280", fontSize: 18 }}>☰</div>
    <div style={{ position: "relative", width: 280 }}>
      <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
      <input className="search-input" placeholder="Search anything..." style={{ paddingLeft: 36 }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(15,20,40,0.8)",
          border: "1px solid rgba(139,92,246,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <Bell size={15} color="#9CA3AF" />
        </div>
        <div style={{
          position: "absolute", top: -2, right: -2,
          width: 8, height: 8, borderRadius: "50%",
          background: "#7C3AED",
          boxShadow: "0 0 8px rgba(124,58,237,0.8)",
        }} />
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 700, color: "white",
        boxShadow: "0 0 15px rgba(139,92,246,0.5)",
        cursor: "pointer",
      }}>M</div>
    </div>
  </div>
);

// ─── Dashboard Page ────────────────────────────────────────────────────────
const DashboardPage = () => {
  const stats = [
    { label: "Videos Analyzed", value: "1,247", growth: "+12.5% this week", icon: Eye, color: "#8B5CF6", glow: "rgba(139,92,246,0.3)" },
    { label: "Viral Score Avg.", value: "87/100", growth: "+8.3% this week", icon: TrendingUp, color: "#06B6D4", glow: "rgba(6,182,212,0.3)" },
    { label: "Scripts Generated", value: "342", growth: "+15.7% this week", icon: FileText, color: "#EC4899", glow: "rgba(236,72,153,0.3)" },
    { label: "Hooks Generated", value: "1,025", growth: "+19.3% this week", icon: Anchor, color: "#F97316", glow: "rgba(249,115,22,0.3)" },
  ];

  const agents = [
    { id: 1, name: "Scraper Agent",  desc: "Collecting viral content",  icon: RefreshCw, color: "#7C3AED", glow: "rgba(124,58,237,0.5)",  bg: "rgba(124,58,237,0.18)",  border: "rgba(124,58,237,0.5)"  },
    { id: 2, name: "Analyzer Agent", desc: "Analyzing patterns",        icon: Brain,     color: "#2563EB", glow: "rgba(37,99,235,0.5)",   bg: "rgba(37,99,235,0.18)",   border: "rgba(37,99,235,0.5)"   },
    { id: 3, name: "Script Agent",   desc: "Writing engaging scripts",  icon: FileText,  color: "#0891B2", glow: "rgba(8,145,178,0.5)",   bg: "rgba(8,145,178,0.18)",   border: "rgba(8,145,178,0.5)"   },
    { id: 4, name: "Hook Agent",     desc: "Generating viral hooks",    icon: Anchor,    color: "#7C3AED", glow: "rgba(124,58,237,0.5)",  bg: "rgba(124,58,237,0.18)",  border: "rgba(124,58,237,0.5)"  },
  ];

  const activities = [
    { icon: Eye,       color: "#8B5CF6", text: 'Analyzed new reel: "5 Habits That Changed My Life"', time: "2 minutes ago" },
    { icon: FileText,  color: "#06B6D4", text: "Generated script for: Fitness Motivation",            time: "8 minutes ago" },
    { icon: Anchor,    color: "#EC4899", text: "Created 5 hooks for: Productivity Tips",              time: "15 minutes ago" },
    { icon: RefreshCw, color: "#F97316", text: "Scraped 50 new reels from Instagram",                 time: "20 minutes ago" },
  ];

  const niches = [
    { name: "Fitness",    value: 42, color: "#06B6D4" },
    { name: "Motivation", value: 28, color: "#8B5CF6" },
    { name: "Business",   value: 18, color: "#F97316" },
    { name: "Education",  value: 12, color: "#EC4899" },
  ];

  return (
    <div className="page-enter" style={{ padding: "28px", overflowY: "auto", flex: 1 }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="heading" style={{ fontSize: 26, fontWeight: 800, color: "white", marginBottom: 4 }}>
          Welcome back, Manthan! 👋
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Your AI Social Media Manager</p>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card" style={{
              ...glassCard,
              padding: "20px",
              boxShadow: `0 8px 32px ${s.glow}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "white", fontFamily: "Syne, sans-serif" }}>{s.value}</div>
                </div>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 15px ${s.glow}`,
                }}>
                  <Icon size={18} color={s.color} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>
                ↑ {s.growth}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── AI Agent Pipeline ── */}
      <div style={{ ...glassCard, padding: "24px", marginBottom: 24 }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h2 className="heading" style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 4 }}>
            AI Agent Pipeline
          </h2>
          <p style={{ color: "#6B7280", fontSize: 13 }}>4 agents working together</p>
        </div>

        {/* Agents Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", alignItems: "center", gap: 0 }}>
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <>
                {/* Agent Node */}
                <div
                  key={agent.id}
                  className="agent-node"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "8px 6px" }}
                >
                  {/* Icon circle */}
                  <div style={{ position: "relative" }}>
                    {/* Outer glow ring */}
                    <div style={{
                      position: "absolute", inset: -5, borderRadius: "50%",
                      border: `1px solid ${agent.border}`,
                      opacity: 0.4,
                    }} />
                    {/* Icon wrapper */}
                    <div style={{
                      width: 68, height: 68, borderRadius: "50%",
                      background: agent.bg,
                      border: `2px solid ${agent.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 0 28px ${agent.glow}, 0 0 10px ${agent.glow} inset`,
                      position: "relative", zIndex: 1,
                    }}>
                      <Icon size={26} color={agent.color} />
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{ textAlign: "center" }}>
                    <div className="heading" style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 4 }}>
                      {i + 1}. {agent.name}
                    </div>
                    <div style={{ fontSize: 11.5, color: "#6B7280", marginBottom: 10, lineHeight: 1.4 }}>
                      {agent.desc}
                    </div>
                    {/* Running badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "4px 11px", borderRadius: 20,
                      background: "rgba(16,185,129,0.13)",
                      border: "1px solid rgba(16,185,129,0.32)",
                      fontSize: 11, fontWeight: 700, color: "#10B981",
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#10B981",
                        animation: "runningDot 1.5s ease-in-out infinite",
                      }} />
                      Running
                    </div>
                  </div>
                </div>

                {/* Arrow connector (skip after last agent) */}
                {i < agents.length - 1 && (
                  <div key={`arrow-${i}`} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    paddingBottom: 60, /* align with icon vertical center */
                  }}>
                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                      <path
                        d="M0 9 H22 M16 2 L24 9 L16 16"
                        stroke="url(#arrowGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={agents[i].color} stopOpacity="0.6" />
                          <stop offset="100%" stopColor={agents[i + 1]?.color ?? agents[i].color} stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Recent Activity */}
        <div style={{ ...glassCard, padding: "20px" }}>
          <h3 className="heading" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 16 }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: `${a.color}22`,
                    border: `1px solid ${a.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={14} color={a.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: "#4B5563", marginTop: 3 }}>
                      <Clock size={10} style={{ display: "inline", marginRight: 4 }} />
                      {a.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Niches */}
        <div style={{ ...glassCard, padding: "20px" }}>
          <h3 className="heading" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 4 }}>Top Performing Niches</h3>
          <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 16 }}>This week</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 130, height: 130 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={niches} cx="50%" cy="50%" innerRadius={35} outerRadius={58} paddingAngle={3} dataKey="value">
                    {niches.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "rgba(15,20,40,0.95)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "white" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {niches.map((n, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, boxShadow: `0 0 6px ${n.color}` }} />
                    <span style={{ fontSize: 12, color: "#D1D5DB" }}>{n.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: n.color }}>{n.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// ─── Discover Page ─────────────────────────────────────────────────────────
const DiscoverPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const reels = [
    { title: "3 HABITS THAT BUILT MY BODY", niche: "Fitness", score: 98, views: "2.1M", likes: "183K", comments: "12K", image: "/reels/poster-1.jpg", accent: "#06B6D4" },
    { title: "DISCIPLINE BEATS MOTIVATION", niche: "Mindset", score: 95, views: "1.8M", likes: "156K", comments: "9K", image: "/reels/poster-2.jpg", accent: "#10B981" },
    { title: "STOP OVERTHINKING EVERYTHING", niche: "Mental", score: 93, views: "1.5M", likes: "128K", comments: "8K", image: "/reels/poster-3.jpg", accent: "#8B5CF6" },
    { title: "HOW TO STAY FOCUSED ALL DAY", niche: "Productivity", score: 91, views: "1.2M", likes: "98K", comments: "6K", image: "/reels/poster-4.jpg", accent: "#F97316" },
    { title: "MINDSET IS EVERYTHING", niche: "Growth", score: 90, views: "980K", likes: "87K", comments: "5K", image: "/reels/poster-5.jpg", accent: "#06B6D4" },
  ];

  const filters = [
    { id: "all", label: "All Platforms", icon: null },
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "youtube", label: "YouTube Shorts", icon: Youtube },
    { id: "tiktok", label: "TikTok", icon: Music2 },
  ];

  return (
    <div className="page-enter" style={{ padding: "28px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="heading" style={{ fontSize: 26, fontWeight: 800, color: "white", marginBottom: 6 }}>
          Discover Viral Content
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Find trending reels and shorts across platforms</p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
          <input className="search-input" placeholder="Search niche or keyword..." />
        </div>
        <button className="glass-btn secondary" style={{ whiteSpace: "nowrap" }}>
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Filter Pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {filters.map(f => {
          const Icon = f.icon;
          return (
            <div key={f.id} className={`filter-pill${activeFilter === f.id ? " active" : ""}`} onClick={() => setActiveFilter(f.id)}>
              {Icon && <Icon size={13} style={{ display: "inline", marginRight: 4 }} />}
              {f.label}
            </div>
          );
        })}
      </div>

      {/* Reel Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
        {reels.map((reel, i) => (
          <div key={i} className="reel-card" style={{ aspectRatio: "9/16", position: "relative", background: "rgba(7,16,40,0.8)" }}>
            <img
              src={reel.image}
              alt={reel.title}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 14,
              }}
            />
            <div className="reel-overlay" style={{
              position: "absolute",
              inset: 0,
              borderRadius: 14,
              background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.08) 100%)",
              transition: "opacity 0.3s ease",
            }} />
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Play size={13} color="white" fill="white" />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 12px" }}>
              <h4 style={{
                fontSize: 18,
                fontWeight: 900,
                color: "white",
                lineHeight: 1.05,
                marginBottom: 12,
                fontFamily: "Syne, sans-serif",
                textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                textTransform: "uppercase",
              }}>{reel.title}</h4>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {[
                  { icon: Eye, val: reel.views },
                  { icon: Heart, val: reel.likes },
                  { icon: MessageCircle, val: reel.comments },
                ].map((m, j) => {
                  const Icon = m.icon;
                  return (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#E5E7EB" }}>
                      <Icon size={10} /> {m.val}
                    </div>
                  );
                })}
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 20,
                background: "rgba(16,185,129,0.22)",
                border: "1px solid rgba(16,185,129,0.42)",
                fontSize: 11,
                fontWeight: 800,
                color: "#10B981",
              }}>
                <Star size={10} fill="#10B981" />
                {reel.score} Viral Score
              </div>
            </div>
            {/* Glow border */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 14,
              border: `1px solid ${reel.accent}33`,
              pointerEvents: "none",
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Viral Analysis Page ───────────────────────────────────────────────────
const ViralAnalysisPage = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState("analysis-overview");
  const tabs = [
    { id: "analysis-overview", label: "Analysis Overview" },
    { id: "hook-analysis",     label: "Hook Analysis" },
    { id: "engagement",        label: "Engagement" },
    { id: "audience",          label: "Audience" },
  ];

  const insightRows = [
    [
      { label: "Hook Type",         value: "Curiosity",    desc: "The hook creates curiosity by promising valuable habits.",       color: "#F59E0B" },
      { label: "Emotional Trigger", value: "Inspiration",  desc: "Motivates viewers to improve themselves.",                       color: "#F59E0B" },
      { label: "Retention Pattern", value: "High",         desc: "Fast cuts, text overlays and engaging visuals.",                 color: "#10B981" },
    ],
    [
      { label: "Content Type", value: "Listicle",            desc: "3 specific habits are easy to follow.",                         color: "#06B6D4" },
      { label: "Audience",     value: "Fitness Enthusiasts", desc: "Targeting gym lovers and self-improvement seekers.",             color: "#E5E7EB" },
      { label: "Viral Score",  value: "98/100",              desc: "Excellent combination of all viral factors.",                    color: "#10B981", large: true },
    ],
  ];

  return (
    <div className="page-enter" style={{ padding: "28px 28px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 className="heading" style={{ fontSize: 28, fontWeight: 800, color: "white" }}>Viral Analysis</h1>
        <button className="glass-btn secondary" onClick={() => setActivePage("discover")} style={{ padding: "10px 16px" }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "420px minmax(0, 620px)", gap: 22, alignItems: "start" }}>
        <div style={{ ...glassCard, padding: 18, borderRadius: 18 }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, aspectRatio: "16/11", marginBottom: 22 }}>
            <img
              src="/reels/poster-1.jpg"
              alt="3 Habits That Built My Body"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <h2 className="heading" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 12 }}>
            3 Habits That Built My Body
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 26 }}>
            <Instagram size={16} color="#F77737" />
            <span style={{ fontSize: 14, color: "#9CA3AF" }}>@fitness_zone</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Views", val: "2.1M", color: "white" },
              { label: "Likes", val: "189K", color: "white" },
              { label: "Comments", val: "12K", color: "white" },
              { label: "Viral Score", val: "98", color: "#22F27A" },
            ].map((m) => (
              <div key={m.label}>
                <div className="heading" style={{ fontSize: 22, fontWeight: 800, color: m.color, marginBottom: 6 }}>{m.val}</div>
                <div style={{ fontSize: 13, color: "#9CA3AF" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <button className="glass-btn primary" style={{ width: "100%", justifyContent: "center", padding: 14, borderRadius: 10 }}>
            <Instagram size={16} /> View on Instagram
          </button>
        </div>

        <div>
          <div style={{ ...glassCard, padding: 0, borderRadius: 18, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(139,92,246,0.16)" }}>
              {tabs.map(t => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      padding: "18px 12px",
                      background: isActive ? "rgba(124,58,237,0.22)" : "transparent",
                      border: "none",
                      borderBottom: isActive ? "2px solid #7C3AED" : "2px solid transparent",
                      color: isActive ? "white" : "#9CA3AF",
                      cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div style={{ padding: "26px 28px 24px" }}>
              <h3 className="heading" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 14 }}>
                Why this went viral?
              </h3>
              <p style={{ maxWidth: 620, fontSize: 15, color: "#B7BED4", lineHeight: 1.75, marginBottom: 20 }}>
                This reel went viral because it combines a strong hook, emotional storytelling, and highly relatable content. The fast pacing and clear structure kept audiences engaged till the end.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
                {insightRows.flat().map((item) => (
                  <div key={item.label} style={{
                    background: "rgba(10,15,31,0.72)",
                    border: "1px solid rgba(139,92,246,0.16)",
                    borderRadius: 12,
                    padding: "18px 16px",
                    minHeight: 142,
                  }}>
                    <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 10 }}>{item.label}</div>
                    <div className="heading" style={{
                      fontSize: item.large ? 26 : 20,
                      fontWeight: 800,
                      color: item.color,
                      marginBottom: 12,
                      lineHeight: 1.1,
                    }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: 13, color: "#AAB2C9", lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...glassCard, marginTop: 20, padding: "22px 24px", borderRadius: 14 }}>
            <h4 className="heading" style={{ fontSize: 19, fontWeight: 800, color: "white", marginBottom: 18 }}>Keywords</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["fitness", "habits", "motivation", "gym", "bodybuilding", "self improvement"].map(k => (
                <span key={k} style={{
                  padding: "8px 15px",
                  borderRadius: 20,
                  background: "rgba(139,92,246,0.18)",
                  border: "1px solid rgba(139,92,246,0.22)",
                  fontSize: 13,
                  color: "#DAD6FF",
                }}>{k}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-enter" style={{ padding: "28px 28px 36px", flex: 1, overflowY: "auto" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 className="heading" style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Viral Analysis</h1>
        <button className="glass-btn secondary" onClick={() => setActivePage("discover")}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 28, alignItems: "start" }}>

        {/* ── LEFT: Reel card + meta ── */}
        <div>
          {/* Thumbnail */}
          <div style={{
            borderRadius: 18, overflow: "hidden", position: "relative",
            width: "100%", aspectRatio: "4/3",
            background: "linear-gradient(160deg, #0d1117 0%, #111827 40%, #1c1c2e 100%)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
            marginBottom: 20,
          }}>
            {/* Simulated gym scene — dark layered SVG bg */}
            <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} xmlns="http://www.w3.org/2000/svg">
              {/* floor */}
              <rect width="400" height="300" fill="#0a0a12"/>
              {/* ambient light beam */}
              <ellipse cx="200" cy="80" rx="160" ry="60" fill="rgba(80,60,140,0.18)"/>
              {/* barbell bar */}
              <rect x="60" y="148" width="280" height="10" rx="5" fill="#2d2d3a"/>
              {/* left weight */}
              <rect x="52" y="130" width="28" height="46" rx="6" fill="#1e1e2e" stroke="#3d3d5a" strokeWidth="1.5"/>
              <rect x="44" y="136" width="14" height="34" rx="4" fill="#252535" stroke="#3a3a52" strokeWidth="1"/>
              {/* right weight */}
              <rect x="320" y="130" width="28" height="46" rx="6" fill="#1e1e2e" stroke="#3d3d5a" strokeWidth="1.5"/>
              <rect x="342" y="136" width="14" height="34" rx="4" fill="#252535" stroke="#3a3a52" strokeWidth="1"/>
              {/* human silhouette — bent over */}
              <ellipse cx="200" cy="90" rx="22" ry="22" fill="#18182a"/>
              <path d="M200 112 Q180 130 168 158 L180 160 Q190 140 200 132 Q210 140 220 160 L232 158 Q220 130 200 112Z" fill="#141420"/>
              {/* arms reaching down to bar */}
              <path d="M178 128 Q150 140 148 153" stroke="#18182a" strokeWidth="10" strokeLinecap="round" fill="none"/>
              <path d="M222 128 Q250 140 252 153" stroke="#18182a" strokeWidth="10" strokeLinecap="round" fill="none"/>
              {/* legs */}
              <path d="M184 158 L176 210 L186 210 L192 170Z" fill="#141420"/>
              <path d="M216 158 L224 210 L214 210 L208 170Z" fill="#141420"/>
              {/* glow around figure */}
              <ellipse cx="200" cy="150" rx="60" ry="70" fill="rgba(124,58,237,0.06)"/>
              {/* floor reflection */}
              <rect x="0" y="220" width="400" height="80" fill="rgba(0,0,0,0.4)"/>
              {/* gym equipment in bg */}
              <rect x="10" y="60" width="8" height="160" rx="3" fill="#1a1a28" opacity="0.7"/>
              <rect x="380" y="60" width="8" height="160" rx="3" fill="#1a1a28" opacity="0.7"/>
              <rect x="20" y="90" width="30" height="70" rx="4" fill="#161622" opacity="0.6"/>
              <rect x="350" y="90" width="30" height="70" rx="4" fill="#161622" opacity="0.6"/>
            </svg>

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
            }}/>

            {/* Bold title overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "16px 18px",
              background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)",
            }}>
              <h3 style={{
                fontSize: 20, fontWeight: 900, color: "white", lineHeight: 1.15,
                fontFamily: "Syne, sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
                letterSpacing: "-0.3px",
              }}>3 HABITS THAT<br/>BUILT MY BODY</h3>
            </div>

            {/* Top-right icon */}
            <div style={{
              position: "absolute", top: 12, right: 12,
              width: 30, height: 30, borderRadius: 8,
              background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Play size={13} color="white" fill="white" />
            </div>
          </div>

          {/* Title + handle below the card */}
          <h2 className="heading" style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 6 }}>
            3 Habits That Built My Body
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 20 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "linear-gradient(135deg, #E1306C, #F77737)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 800, color: "white",
            }}>ig</div>
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>@fitness_zone</span>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 0", marginBottom: 20,
          }}>
            {[
              { label: "Views",       val: "2.1M",  color: "white" },
              { label: "Likes",       val: "189K",  color: "white" },
              { label: "Comments",    val: "12K",   color: "white" },
              { label: "Viral Score", val: "98",    color: "#10B981" },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative" }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute", left: 0, top: "10%", height: "80%",
                    width: 1, background: "rgba(255,255,255,0.07)",
                  }}/>
                )}
                <div style={{ fontSize: 20, fontWeight: 800, color: m.color, fontFamily: "Syne, sans-serif", marginBottom: 3 }}>{m.val}</div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="glass-btn primary" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14, borderRadius: 12 }}>
            <Instagram size={16} /> View on Instagram
          </button>
        </div>

        {/* ── RIGHT: Analysis panel ── */}
        <div style={{ ...glassCard, padding: "28px", display: "flex", flexDirection: "column", gap: 0 }}>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {tabs.map(t => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: "10px 18px", background: "transparent", border: "none", outline: "none",
                    cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? "white" : "#6B7280",
                    fontFamily: "DM Sans, sans-serif",
                    borderBottom: isActive ? "2px solid #7C3AED" : "2px solid transparent",
                    marginBottom: -1, transition: "all 0.2s ease",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Why this went viral */}
          <h3 className="heading" style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 10 }}>
            Why this went viral?
          </h3>
          <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 24 }}>
            This reel went viral because it combines a strong hook, emotional storytelling, and highly relatable content. The fast pacing and clear structure kept audiences engaged till the end.
          </p>

          {/* Insight cards — 2 rows × 3 cols */}
          {insightRows.map((row, ri) => (
            <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 14 }}>
              {row.map((item, ci) => (
                <div key={ci} style={{
                  background: "rgba(10,13,28,0.85)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "16px",
                  transition: "border-color 0.2s",
                }}>
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6, letterSpacing: "0.5px" }}>{item.label}</div>
                  <div style={{
                    fontSize: item.large ? 24 : 15,
                    fontWeight: 700,
                    color: item.color,
                    marginBottom: 8,
                    fontFamily: "Syne, sans-serif",
                    lineHeight: 1.1,
                  }}>{item.value}</div>
                  <div style={{ fontSize: 11.5, color: "#9CA3AF", lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          ))}

          {/* Keywords */}
          <div style={{ marginTop: 12 }}>
            <h4 className="heading" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 14 }}>Keywords</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["fitness", "habits", "motivation", "gym", "bodybuilding", "self improvement"].map(k => (
                <span key={k} style={{
                  padding: "6px 16px", borderRadius: 20,
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.22)",
                  fontSize: 12.5, color: "#D1D5DB",
                  cursor: "default",
                }}>{k}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Script Writer Page ────────────────────────────────────────────────────
const ScriptWriterPage = ({ setActivePage }) => {
  const [generated, setGenerated] = useState(true);

  return (
    <div className="page-enter" style={{ padding: "28px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 className="heading" style={{ fontSize: 22, fontWeight: 800, color: "white" }}>AI Script Writer</h1>
        <button className="glass-btn secondary" onClick={() => setActivePage("dashboard")}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: Inputs */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Script Topic</label>
              <input className="search-input" defaultValue="3 Habits That Built My Body" style={{ paddingLeft: 16 }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Tone</label>
              <div style={{ position: "relative" }}>
                <select className="select-input">
                  <option>Motivational</option>
                  <option>Educational</option>
                  <option>Casual</option>
                  <option>Professional</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Duration</label>
              <div style={{ position: "relative" }}>
                <select className="select-input">
                  <option>30-45 seconds</option>
                  <option>45-60 seconds</option>
                  <option>60-90 seconds</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Platform</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { id: "instagram", label: "Instagram Reels", icon: Instagram, active: true },
                  { id: "youtube", label: "YouTube Shorts", icon: Youtube, active: false },
                ].map(p => {
                  const Icon = p.icon;
                  return (
                    <div key={p.id} style={{
                      flex: 1, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                      background: p.active ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(139,92,246,0.2))" : "rgba(15,20,40,0.8)",
                      border: p.active ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(139,92,246,0.2)",
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 12, color: p.active ? "white" : "#6B7280",
                    }}>
                      <Icon size={13} /> {p.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="glass-btn primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
              <Sparkles size={16} /> Generate Script
            </button>
          </div>
        </div>

        {/* Right: Generated Script */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 className="heading" style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Generated Script</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="glass-btn secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                <Copy size={12} /> Copy Script
              </button>
              <button className="glass-btn secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                <Download size={12} /> Download
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: 400 }}>
            {[
              {
                time: "HOOK · 0:00 to 0:03",
                color: "#8B5CF6",
                lines: ["Want a better body?", "Do these 3 things daily."]
              },
              {
                time: "BODY · 0:04 to 0:28",
                color: "#06B6D4",
                lines: [
                  "First, train with intensity.",
                  "Don't just go to the gym, train like it matters.",
                  "",
                  "Second, eat real food.",
                  "Your body is a reflection of your choices.",
                  "",
                  "Third, be consistent.",
                  "Motivation fades, but discipline builds results.",
                ]
              },
              {
                time: "CTA · 0:29 to 0:35",
                color: "#F97316",
                lines: ["Save this reel and follow for", "daily fitness tips!"]
              },
            ].map((section, i) => (
              <div key={i} style={{
                ...glassCard,
                padding: "14px",
                background: "rgba(10,15,31,0.8)",
                borderLeft: `3px solid ${section.color}`,
              }}>
                <div style={{ fontSize: 10, color: section.color, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                  [{section.time}]
                </div>
                {section.lines.map((line, j) => (
                  <div key={j} style={{ fontSize: 13, color: line ? "#D1D5DB" : "transparent", lineHeight: 1.6, height: line ? "auto" : "8px" }}>{line || " "}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hook Generator Page ───────────────────────────────────────────────────
const HookGeneratorPage = ({ setActivePage }) => {
  const [numHooks, setNumHooks] = useState(5);

  const hooks = [
    "These 3 habits changed my body completely.",
    "Do this for 30 days and see the difference.",
    "Most people ignore habit #2 (big mistake).",
    "I wish I knew these 3 habits earlier.",
    "3 simple habits for a strong, fit body.",
  ];

  return (
    <div className="page-enter" style={{ padding: "28px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 className="heading" style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Hook Generator</h1>
        <button className="glass-btn secondary" onClick={() => setActivePage("dashboard")}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: Inputs */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Topic</label>
              <input className="search-input" defaultValue="3 Habits That Built My Body" style={{ paddingLeft: 16 }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Audience</label>
              <div style={{ position: "relative" }}>
                <select className="select-input">
                  <option>Fitness Enthusiasts</option>
                  <option>General Audience</option>
                  <option>Entrepreneurs</option>
                  <option>Students</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>Hook Type</label>
              <div style={{ position: "relative" }}>
                <select className="select-input">
                  <option>Curiosity</option>
                  <option>Shock</option>
                  <option>Promise</option>
                  <option>Question</option>
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 1 }}>
                Number of Hooks: <span style={{ color: "#8B5CF6", fontWeight: 700 }}>{numHooks}</span>
              </label>
              <input
                type="range" min={1} max={10} value={numHooks}
                onChange={e => setNumHooks(Number(e.target.value))}
                style={{
                  width: "100%", appearance: "none",
                  height: 6, borderRadius: 3, outline: "none", cursor: "pointer",
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${numHooks * 10}%, rgba(139,92,246,0.2) ${numHooks * 10}%, rgba(139,92,246,0.2) 100%)`,
                }}
              />
            </div>

            <button className="glass-btn primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
              <Sparkles size={16} /> Generate Hooks
            </button>
          </div>
        </div>

        {/* Right: Generated Hooks */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <h3 className="heading" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 16 }}>Generated Hooks</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {hooks.map((hook, i) => (
              <div key={i} className="hook-item" style={{
                ...glassCard,
                padding: "14px 16px",
                background: "rgba(10,15,31,0.8)",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(139,92,246,0.2))",
                  border: "1px solid rgba(139,92,246,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: "#8B5CF6",
                  fontFamily: "Syne, sans-serif",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span style={{ fontSize: 13, color: "#E5E7EB", lineHeight: 1.5 }}>{hook}</span>
              </div>
            ))}
          </div>
          <button className="glass-btn secondary" style={{ width: "100%", justifyContent: "center" }}>
            <Copy size={14} /> Copy All Hooks
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardPage />;
      case "discover": return <DiscoverPage />;
      case "analytics": return <ViralAnalysisPage setActivePage={setActivePage} />;
      case "viral-analysis": return <ViralAnalysisPage setActivePage={setActivePage} />;
      case "scripts": return <ScriptWriterPage setActivePage={setActivePage} />;
      case "hooks": return <HookGeneratorPage setActivePage={setActivePage} />;
      default: return <DashboardPage />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="grid-bg" style={{
        display: "flex", minHeight: "100vh", position: "relative", overflow: "hidden",
        background: "#050816",
      }}>
        {/* Ambient blobs */}
        <div className="blob" style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          top: -100, left: 200,
        }} />
        <div className="blob" style={{
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          bottom: 100, right: 200,
          animationDelay: "-4s",
        }} />
        <div className="blob" style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          animationDelay: "-2s",
        }} />

        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <Navbar />
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {renderPage()}
          </div>

          {/* Bottom nav shortcuts */}
          {activePage === "dashboard" && (
            <div style={{
              padding: "12px 28px",
              background: "rgba(5,8,22,0.8)",
              borderTop: "1px solid rgba(139,92,246,0.1)",
              display: "flex", gap: 10,
            }}>
              {[
                { id: "analytics", label: "Viral Analysis", icon: Activity, color: "#8B5CF6" },
                { id: "scripts", label: "Script Writer", icon: FileText, color: "#06B6D4" },
                { id: "hooks", label: "Hook Generator", icon: Anchor, color: "#EC4899" },
                { id: "discover", label: "Discover", icon: Compass, color: "#F97316" },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.id} className="glass-btn secondary"
                    style={{ fontSize: 12, padding: "8px 14px" }}
                    onClick={() => setActivePage(item.id)}>
                    <Icon size={13} color={item.color} /> {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
