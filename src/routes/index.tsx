import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  Copy, Check, Server, Users, Zap, Shield, Sword, Coins, Calendar, Sparkles,
  Heart, Crown, Gem, Package, Image as ImageIcon, MessageCircle, ShoppingBag,
  Vote, Home, Mail, ExternalLink, Wifi, Gauge, Ticket, Lock, CreditCard, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VASTLAND SMP — India's Premium Survival Minecraft Server" },
      { name: "description", content: "Join VASTLAND SMP, India's premium survival multiplayer Minecraft experience. IP: vastxland.qzz.io" },
    ],
  }),
  component: Landing,
});

const SERVER_IP = "vastxland.qzz.io";
const SERVER_PORT = "25565";
const FULL_ADDR = `${SERVER_IP}:${SERVER_PORT}`;
const DISCORD_URL = "https://discord.gg/NQNNT3VHb9";

function useFakePlayers() {
  const [n, setN] = useState(247);
  useEffect(() => {
    const tick = () => setN(Math.floor(100 + Math.random() * 350));
    const id = setInterval(tick, 3500);
    return () => clearInterval(id);
  }, []);
  return n;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 800;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

function CopyButton({ label, value, variant = "emerald" }: { label: string; value: string; variant?: "emerald" | "purple" | "ghost" }) {
  const [copied, setCopied] = useState(false);
  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`✅ ${label} Copied!`, { description: value });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy — try manually");
    }
  }, [label, value]);

  const base = "group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-95 min-h-12";
  const styles =
    variant === "emerald"
      ? "bg-gradient-to-br from-primary to-emerald-glow text-primary-foreground hover:glow-emerald"
      : variant === "purple"
      ? "bg-gradient-to-br from-secondary to-purple-glow text-secondary-foreground hover:glow-purple"
      : "glass text-foreground hover:bg-white/5";

  return (
    <button onClick={onClick} className={`${base} ${styles}`} aria-label={`Copy ${label}`}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4 group-hover:scale-110 transition" />}
      <span>{copied ? "Copied!" : `Copy ${label}`}</span>
    </button>
  );
}

function DiscordButton({ children, variant = "primary", className = "" }: { children: React.ReactNode; variant?: "primary" | "ghost" | "purple"; className?: string }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold transition-all active:scale-95";
  const styles =
    variant === "primary"
      ? "bg-[#5865F2] text-white hover:brightness-110 hover:shadow-[0_0_30px_rgba(88,101,242,0.6)]"
      : variant === "purple"
      ? "bg-gradient-to-br from-secondary to-purple-glow text-secondary-foreground hover:glow-purple"
      : "glass text-foreground hover:bg-white/5";
  return (
    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        const dur = 6 + Math.random() * 8;
        const isPurple = Math.random() > 0.5;
        return (
          <span
            key={i}
            className="absolute rounded-sm animate-float-particle"
            style={{
              left: `${left}%`, top: `${top}%`, width: size, height: size,
              background: isPurple ? "var(--purple-glow)" : "var(--emerald-glow)",
              boxShadow: `0 0 ${size * 4}px currentColor`,
              color: isPurple ? "var(--purple-glow)" : "var(--emerald-glow)",
              animationDelay: `${delay}s`, animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Nav() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#join", label: "Join" },
    { href: "#network", label: "Network" },
    { href: "#store", label: "Store" },
    { href: "#how", label: "How it Works" },
    { href: "#staff", label: "Staff" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center font-tech text-sm font-black text-primary-foreground">V</div>
            <span className="font-display text-xl tracking-widest shimmer-text">VASTLAND</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DiscordButton className="!px-3 !py-2 !text-xs">
              <MessageCircle className="size-4" /> <span className="hidden sm:inline">Discord</span>
            </DiscordButton>
            <a href="#join" className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-black tracking-wider hover:glow-emerald transition">PLAY</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function FallingBlocks() {
  const blockTextures = [
    "https://mc-heads.net/head/Notch/64", // fallback decorative
  ];
  const items = Array.from({ length: 14 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((_, i) => {
        const left = (i * 7.3) % 100;
        const size = 28 + ((i * 13) % 36);
        const dur = 12 + ((i * 5) % 14);
        const delay = -((i * 2.7) % dur);
        const colors = [
          "linear-gradient(135deg,#6b8e3d,#3d5a1e)", // grass
          "linear-gradient(135deg,#8b6b3d,#4a3a1f)", // dirt
          "linear-gradient(135deg,#7a7a7a,#3f3f3f)", // stone
          "linear-gradient(135deg,#4ec0c0,#1e6f6f)", // diamond
          "linear-gradient(135deg,#d4a017,#6f5009)", // gold
        ];
        const bg = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute block rounded-[4px] border border-black/30"
            style={{
              left: `${left}%`,
              top: 0,
              width: size,
              height: size,
              background: bg,
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.1), 0 0 12px rgba(0,0,0,0.4)",
              animation: `block-drift ${dur}s linear ${delay}s infinite`,
              imageRendering: "pixelated",
            }}
          />
        );
      })}
      {/* unused ref to keep import simple */}
      <span style={{ display: "none" }}>{blockTextures.join("")}</span>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Minecraft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1428] via-[#0d1b2a] to-background" />
      <div className="absolute inset-0 mc-grid-bg opacity-40" />
      <FallingBlocks />
      <Particles />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      {/* Technoblade character */}
      <img
        src="https://mc-heads.net/body/Technoblade/right"
        alt="Technoblade character"
        className="hidden md:block absolute right-4 lg:right-16 bottom-24 w-[220px] lg:w-[280px] animate-char-float drop-shadow-[0_0_40px_rgba(255,50,80,0.45)]"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6 text-xs font-semibold">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="font-pixel text-[10px] text-muted-foreground">SERVER ONLINE</span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl leading-none tracking-wider">
          <span className="shimmer-text">VASTLAND</span>
          <br />
          <span className="text-foreground text-glow-emerald">SMP</span>
        </h1>

        <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          India's Premium Survival Multiplayer Experience — Survival, Lifesteal, PvP, SkyWars, SkyBlock, Parkour & more.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#join" className="rounded-xl bg-gradient-to-br from-primary to-emerald-glow text-primary-foreground px-6 py-4 font-black tracking-wider inline-flex items-center gap-2 animate-pulse-glow">
            <Server className="size-5" /> JOIN SERVER
          </a>
          <DiscordButton>
            <MessageCircle className="size-5" /> JOIN DISCORD
          </DiscordButton>
          <a href="#store" className="rounded-xl glass px-6 py-4 font-bold inline-flex items-center gap-2 hover:bg-white/5 transition">
            <ShoppingBag className="size-5 text-primary" /> Store
          </a>
        </div>
      </div>
    </section>
  );
}

function JoinCard() {
  const players = useFakePlayers();
  return (
    <section id="join" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-60 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-2 text-primary text-xs font-bold mb-2 uppercase tracking-widest">
              <Wifi className="size-4" /> Server Address
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-glow-emerald tracking-wider">JOIN NOW</h2>

            <div className="space-y-3">
              <div className="glass rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">IP Address</div>
                  <div className="font-mono text-base md:text-lg truncate">{SERVER_IP}</div>
                </div>
                <CopyButton label="IP" value={SERVER_IP} />
              </div>

              <div className="glass rounded-xl p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Port</div>
                  <div className="font-mono text-base md:text-lg">{SERVER_PORT}</div>
                </div>
                <CopyButton label="Port" value={SERVER_PORT} variant="purple" />
              </div>

              <div className="rounded-xl p-4 flex items-center justify-between gap-3 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-primary font-bold">Full Server Address</div>
                  <div className="font-mono text-base md:text-lg truncate">{FULL_ADDR}</div>
                </div>
                <CopyButton label="Server Address" value={FULL_ADDR} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 size-60 bg-secondary/20 blur-3xl rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-2 text-secondary text-xs font-bold mb-2 uppercase tracking-widest">
              <Gauge className="size-4" /> Live Status
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-glow-purple tracking-wider">SERVER STATUS</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="glass rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-bold">Online</span>
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Version</div>
                <div className="font-bold mt-1">Latest</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Ping</div>
                <div className="font-bold mt-1 text-primary">Low</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Region</div>
                <div className="font-bold mt-1">🇮🇳 India</div>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/30 text-center">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                <Users className="size-4 text-primary" /> Players Online
              </div>
              <div className="font-display text-6xl md:text-7xl shimmer-text tracking-wider">
                <AnimatedNumber value={players} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">Live • updates every few seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Network chart inspired by user upload */
function NetworkChart() {
  const groups: { name: string; children: string[] }[] = [
    { name: "Survival", children: ["Spawn", "World", "Nether", "End", "AFK Arena"] },
    { name: "Lifesteal", children: ["Spawn", "World", "Nether", "End", "AFK", "5v5 Arena"] },
    { name: "PvP", children: ["Spawn", "Crystal", "Mace", "Netherite", "Diamond", "Elytra", "Tank"] },
    { name: "SkyWars", children: ["Spawn", "Solo", "Duo", "Squads", "Mega"] },
    { name: "SkyBlock", children: ["Spawn", "Island", "Nether", "End", "Marketplace"] },
    { name: "Parkour", children: ["Spawn", "Easy", "Medium", "Hard", "Expert"] },
    { name: "Website", children: ["Spawn", "Info", "Store", "Vote", "Rules"] },
    { name: "Discord", children: ["Spawn", "Invite", "Updates", "Support", "Events"] },
  ];
  return (
    <section id="network" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="text-primary text-xs font-bold uppercase tracking-widest">Architecture</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wider"><span className="shimmer-text">HOW OUR NETWORK WORKS</span></h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A proxy-powered multi-server network. One IP, infinite worlds.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 mc-grid-bg opacity-20 pointer-events-none" />
          <div className="relative">
            {/* Top: Proxy → Lobby */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="chart-node !text-base !px-6 !py-3 !border-secondary/60" style={{ boxShadow: "0 0 30px oklch(0.65 0.25 300 / 0.4)" }}>
                PROXY SERVER MAIN
              </div>
              <div className="h-6 w-px bg-primary/50" />
              <div className="chart-node !border-primary/70" style={{ boxShadow: "0 0 25px oklch(0.72 0.22 150 / 0.4)" }}>
                LOBBY
              </div>
              <div className="h-6 w-px bg-primary/50" />
            </div>

            {/* Branch lines */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />

            {/* Groups grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {groups.map((g) => (
                <div key={g.name} className="flex flex-col items-center gap-2">
                  <div className="chart-node w-full !border-primary/70">{g.name.toUpperCase()}</div>
                  <div className="h-3 w-px bg-primary/40" />
                  <div className="chart-node w-full !text-[10px] !py-1.5 !border-secondary/40 opacity-90">Spawn</div>
                  <div className="h-3 w-px bg-primary/30" />
                  <div className="flex flex-col gap-1.5 w-full">
                    {g.children.filter((c) => c !== "Spawn").map((c) => (
                      <div key={c} className="chart-node w-full !text-[10px] !py-1.5 !border-white/10 !font-sans !tracking-normal opacity-80">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    { icon: Shield, label: "Survival", desc: "Pure vanilla+ survival with QOL tweaks." },
    { icon: Coins, label: "Economy", desc: "Player shops, jobs, balanced market." },
    { icon: Sword, label: "PvP", desc: "Arena duels and faction warfare." },
    { icon: Calendar, label: "Events", desc: "Weekly events with epic rewards." },
    { icon: Sparkles, label: "Custom Items", desc: "Unique weapons, tools & gear." },
    { icon: Heart, label: "Community", desc: "Friendly Indian community 24/7." },
  ];
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <div className="text-primary text-xs font-bold uppercase tracking-widest">About</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wider"><span className="shimmer-text">WHY CHOOSE VASTLAND?</span></h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            VASTLAND SMP has been running for over 2 years, providing a smooth Indian Survival Multiplayer experience with custom features, economy, PvP, events, and a friendly community.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.label} className="glass rounded-2xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center mb-4 group-hover:glow-emerald transition">
                <f.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-display text-xl tracking-wider">{f.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* HOW IT WORKS: ticket → pay → receive */
function HowItWorks() {
  const steps = [
    { n: 1, icon: ShoppingBag, title: "Choose Item", desc: "Pick a rank, crate, or banner promotion from the store." },
    { n: 2, icon: MessageCircle, title: "Join Discord", desc: "Click any Buy button — it redirects you to our Discord server." },
    { n: 3, icon: Ticket, title: "Create Ticket", desc: "Open a support ticket and tell us what you want to purchase." },
    { n: 4, icon: CreditCard, title: "Secure Payment", desc: "Pay safely via UPI / cards inside the ticket. Encrypted & private." },
    { n: 5, icon: Check, title: "Receive Instantly", desc: "Get your rank, crate, or banner live on the server within minutes." },
  ];
  return (
    <section id="how" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-secondary text-xs font-bold uppercase tracking-widest">Process</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wider"><span className="shimmer-text">HOW IT WORKS</span></h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            All purchases are handled through Discord tickets — fast, transparent, and 100% secure.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 items-stretch">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="glass rounded-2xl p-5 h-full text-center hover:-translate-y-1 hover:border-primary/40 transition">
                <div className="font-pixel text-[10px] text-primary mb-2">STEP {s.n.toString().padStart(2, "0")}</div>
                <div className="size-14 mx-auto rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25 grid place-items-center mb-3">
                  <s.icon className="size-7 text-primary" />
                </div>
                <h4 className="font-display text-xl tracking-wider">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 size-5 text-primary/60 z-10" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="size-5 text-primary" />
            <div>
              <div className="font-bold">100% Secure Payments</div>
              <div className="text-xs text-muted-foreground">UPI · Cards · International payments — all processed safely inside Discord tickets.</div>
            </div>
          </div>
          <DiscordButton>
            <Ticket className="size-4" /> OPEN A TICKET
          </DiscordButton>
        </div>
      </div>
    </section>
  );
}

function Store() {
  const ranks = [
    { name: "Helper 🤝", price: 50, tagline: "Starter supporter rank", color: "primary", icon: Shield, perks: ["Colored chat name", "/fly in lobby", "Helper tag in tab", "2 home points"] },
    { name: "Backer 💎", price: 100, tagline: "For active players", color: "secondary", icon: Sword, perks: ["All Helper perks", "Custom prefix", "Exclusive kit access", "/nick command", "5 home points"], featured: true },
    { name: "Patron 👑", price: 200, tagline: "Top tier flex", color: "primary", icon: Crown, perks: ["All Backer perks", "Patron particles", "Lobby cosmetics", "Priority queue", "Unlimited homes", "VIP events"] },
  ];
  const crates = [
    { name: "Runic Crate", price: 20, color: "from-primary/30 to-emerald-glow/20", accent: "primary", icon: Package, perks: ["Common Loot", "Enchanted Books", "Rare Materials"] },
    { name: "Eclipse Crate", price: 50, color: "from-secondary/30 to-purple-glow/20", accent: "secondary", icon: Gem, perks: ["Rare Loot", "Custom Armor", "Mythic Tools"], featured: true },
    { name: "Oblivion Crate", price: 80, color: "from-primary/30 to-secondary/30", accent: "primary", icon: Sparkles, perks: ["Legendary Loot", "Godly Items", "Exclusive Cosmetics"] },
  ];

  return (
    <section id="store" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-primary text-xs font-bold uppercase tracking-widest">Support</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wider">SUPPORT <span className="shimmer-text">VASTLAND</span> <span className="text-destructive">♥</span></h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            Help us maintain the server. Every purchase keeps VASTLAND alive — and gives you premium perks in return.
          </p>
        </div>

        {/* Discord-purchase notice */}
        <div className="glass rounded-2xl p-4 mb-10 flex flex-wrap items-center justify-between gap-3 border border-secondary/30">
          <div className="flex items-center gap-3 text-sm">
            <MessageCircle className="size-5 text-secondary shrink-0" />
            <span><strong>All purchases happen in Discord.</strong> Click any Buy button → join our Discord → create a ticket → pay securely → receive your item.</span>
          </div>
          <DiscordButton variant="purple" className="!py-2 !text-xs">
            <Ticket className="size-4" /> Open Ticket
          </DiscordButton>
        </div>

        {/* Ranks */}
        <div className="text-center mb-6">
          <h3 className="font-display text-3xl md:text-4xl tracking-wider"><span className="shimmer-text">PAID RANKS</span></h3>
          <p className="text-sm text-muted-foreground mt-2">Three tiers of premium membership.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {ranks.map((r) => (
            <div key={r.name} className={`glass rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${r.featured ? "border-secondary/60 glow-purple" : ""}`}>
              {r.featured && (
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-secondary/30 text-secondary border border-secondary/50">Most Popular</div>
              )}
              <div className={`absolute -top-20 -right-20 size-60 bg-gradient-to-br ${r.color === "secondary" ? "from-secondary/30 to-purple-glow/20" : "from-primary/30 to-emerald-glow/20"} blur-3xl rounded-full opacity-60`} />
              <div className="relative">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center mb-4 group-hover:scale-110 transition">
                  <r.icon className={`size-8 ${r.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{r.tagline}</div>
                <h4 className="font-display text-3xl tracking-wider mt-1">{r.name}</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-5xl shimmer-text tracking-wider">₹{r.price}</span>
                  <span className="text-xs text-muted-foreground">one-time</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {r.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Check className="size-4 text-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <DiscordButton variant={r.color === "secondary" ? "purple" : "primary"} className="mt-6 w-full">
                  <Ticket className="size-4" /> Buy on Discord
                </DiscordButton>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">Redirects to Discord → ticket → secure payment</p>
              </div>
            </div>
          ))}
        </div>

        {/* Crates */}
        <div className="text-center mb-6">
          <h3 className="font-display text-3xl md:text-4xl tracking-wider"><span className="shimmer-text">MYSTICAL CRATES</span></h3>
          <p className="text-sm text-muted-foreground mt-2">Three tiers of legendary loot, hand-crafted for VASTLAND.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {crates.map((c) => (
            <div key={c.name} className={`glass rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${c.featured ? "border-secondary/60 glow-purple" : ""}`}>
              {c.featured && (
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-secondary/30 text-secondary border border-secondary/50">Popular</div>
              )}
              <div className={`absolute -top-20 -right-20 size-60 bg-gradient-to-br ${c.color} blur-3xl rounded-full opacity-60`} />
              <div className="relative">
                <div className="size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center mb-5 group-hover:scale-110 transition">
                  <c.icon className={`size-10 ${c.accent === "primary" ? "text-primary" : "text-secondary"}`} />
                </div>
                <h4 className="font-display text-2xl tracking-wider">{c.name}</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl shimmer-text tracking-wider">₹{c.price}</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {c.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                <DiscordButton variant={c.accent === "secondary" ? "purple" : "primary"} className="mt-6 w-full">
                  <Ticket className="size-4" /> Buy on Discord
                </DiscordButton>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">Redirects to Discord → ticket → secure payment</p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner promotion */}
        <div className="mt-10 glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 size-80 bg-secondary/15 blur-3xl rounded-full" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest">
                <ImageIcon className="size-4" /> Promotion
              </div>
              <h3 className="font-display text-3xl md:text-4xl mt-3 text-glow-purple tracking-wider">BANNER PROMOTION</h3>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Just provide your banner, and we'll display it in the VASTLAND SMP Main Lobby for an entire month.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl shimmer-text tracking-wider">₹100</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
            </div>
            <DiscordButton variant="purple" className="justify-self-start md:justify-self-end">
              <Ticket className="size-5" /> Buy on Discord
            </DiscordButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaffCard({ role, name, username, isOwner }: { role: string; name: string; username: string; isOwner?: boolean }) {
  return (
    <div className={`glass rounded-3xl p-6 text-center relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${isOwner ? "border-primary/60" : ""}`}>
      <div className={`absolute -top-20 -right-20 size-48 ${isOwner ? "bg-primary/25" : "bg-secondary/20"} blur-3xl rounded-full`} />
      {isOwner && (
        <>
          <div className="absolute -inset-1 rounded-3xl pointer-events-none animate-ambient-ring opacity-90" />
          <div
            className="absolute -inset-10 pointer-events-none animate-spin-slow opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, oklch(0.78 0.22 150 / 0.35) 60deg, transparent 120deg, oklch(0.65 0.25 300 / 0.35) 200deg, transparent 260deg, oklch(0.78 0.22 150 / 0.35) 320deg, transparent 360deg)",
              filter: "blur(20px)",
            }}
          />
        </>
      )}
      <div className="relative">
        {isOwner && (
          <Crown className="size-7 text-primary mx-auto mb-2 text-glow-emerald" fill="currentColor" />
        )}
        <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-2xl ${isOwner ? "bg-gradient-to-br from-primary/40 to-emerald-glow/30 glow-emerald" : "bg-gradient-to-br from-secondary/40 to-purple-glow/30 glow-purple"} blur-md`} />
          <img
            src={`https://mc-heads.net/head/${username}/128`}
            alt={`${name} Minecraft head`}
            loading="lazy"
            className="relative h-32 w-32"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div className={`text-[10px] uppercase tracking-widest font-bold ${isOwner ? "text-primary" : "text-secondary"}`}>{role}</div>
        <h4 className="font-display text-2xl mt-1 tracking-wider">{name}</h4>
      </div>
    </div>
  );
}

function Staff() {
  return (
    <section id="staff" className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <div className="text-primary text-xs font-bold uppercase tracking-widest">Team</div>
          <h2 className="font-display text-4xl md:text-6xl mt-3 tracking-wider"><span className="shimmer-text">MEET THE STAFF</span></h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <StaffCard role="Owner" name="SAHIL (Vexa)" username="Technoblade" isOwner />
          <StaffCard role="Co-Owner" name="Raven" username="GamerFleet" />
          <StaffCard role="Co-Owner" name="Kaizen" username="Dream" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Years Running", value: 2, suffix: "+" },
    { label: "Players Joined", value: 500, suffix: "+" },
    { label: "Max Online", value: 450, suffix: "" },
    { label: "Uptime", value: 24, suffix: "/7" },
  ];
  return (
    <section className="relative py-16 px-4">
      <div className="mx-auto max-w-6xl glass rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 mc-grid-bg opacity-20" />
        {stats.map((s) => (
          <div key={s.label} className="relative">
            <div className="font-display text-5xl md:text-6xl shimmer-text tracking-wider">
              <AnimatedNumber value={s.value} />{s.suffix}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-semibold">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: ShoppingBag, label: "Store", href: "#store" },
    { icon: Users, label: "Staff", href: "#staff" },
    { icon: Vote, label: "Vote", href: "#" },
    { icon: MessageCircle, label: "Discord", href: DISCORD_URL },
    { icon: Mail, label: "Contact", href: DISCORD_URL },
  ];
  return (
    <footer className="relative py-16 px-4 border-t border-border/50">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center font-tech font-black text-sm text-primary-foreground">V</div>
              <span className="font-display text-2xl tracking-wider shimmer-text">VASTLAND SMP</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              India's premium survival Minecraft experience. Two years of community, custom features, and unforgettable moments.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 glass rounded-xl px-3 py-2 text-sm">
              <Wifi className="size-4 text-primary" />
              <span className="font-mono">{SERVER_IP}</span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Navigation</div>
            <ul className="space-y-2">
              {links.slice(0, 3).map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-primary transition inline-flex items-center gap-2"><l.icon className="size-4" />{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-bold">Community</div>
            <ul className="space-y-2">
              {links.slice(3).map((l) => (
                <li key={l.label}><a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm hover:text-secondary transition inline-flex items-center gap-2"><l.icon className="size-4" />{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 VASTLAND SMP. All Rights Reserved.</div>
          <div>Not affiliated with Mojang or Microsoft.</div>
        </div>
      </div>
    </footer>
  );
}

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-background grid place-items-center">
      <div className="text-center">
        <div className="size-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center font-tech font-black text-xl text-primary-foreground animate-pulse-glow">V</div>
        <div className="mt-5 font-display text-2xl tracking-widest shimmer-text">VASTLAND SMP</div>
        <div className="mt-3 text-xs text-muted-foreground font-pixel">LOADING...</div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen relative">
      <Loader />
      <Nav />
      <main>
        <Hero />
        <JoinCard />
        <NetworkChart />
        <About />
        <HowItWorks />
        <Store />
        <Staff />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
