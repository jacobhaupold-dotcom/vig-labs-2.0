
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- 1. Icons & Assets ---
const Icons = {
  Google: (props: any) => <svg viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.15-.15-2.15z"/></svg>,
  Apple: (props: any) => <svg viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 4.31-.82c.72.03 2.26.31 3.23 1.56-2.79 1.5-2.33 5.75.44 6.95-.59 1.6-1.53 3.25-3.06 4.54zm-2.32-16.1c1.25-1.38 2.08-3.27 1.85-5.18-1.77.08-3.91 1.05-5.14 2.48-1.15 1.28-2.05 3.32-1.78 5.15 1.92.15 3.86-1.07 5.07-2.45z"/></svg>,
  Brain: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Calendar: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Pen: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  Image: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Video: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
  Mic: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Send: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Search: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  Plus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Settings: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Check: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>,
  Paperclip: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
};

// --- 2. Agent Data ---
const AGENTS = [
  { id: 'vig', name: 'VIG', role: 'Orchestrator', description: 'El jefe de orquesta. Coordina a todos los demás agentes y es tu punto de entrada principal.', icon: <Icons.Brain /> },
  { id: 'flare', name: 'Flare', role: 'Marketing & Content', description: 'Diseña estrategias de contenido, calendarios y posts. Trabaja con Pixel para creatividades.', icon: <Icons.Pen /> },
  { id: 'wavy', name: 'Wavy', role: 'Conversations', description: 'Especialista en WhatsApp Business, automatización de respuestas y gestión de leads.', icon: <div className="font-bold text-lg">W</div> },
  { id: 'mailo', name: 'Mailo', role: 'Email & Newsletters', description: 'Gestiona tu inbox, redacta respuestas y crea campañas de email marketing efectivas.', icon: <div className="font-bold text-lg">M</div> },
  { id: 'saldo', name: 'Saldo', role: 'Finance & Control', description: 'Tu CFO virtual. Analiza gastos, ingresos y rentabilidad de campañas en tiempo real.', icon: <div className="font-bold text-lg">$</div> },
  { id: 'dokka', name: 'Dokka', role: 'Documents', description: 'Crea contratos, propuestas y organiza toda la documentación de tu negocio.', icon: <div className="font-bold text-lg">D</div> },
  { id: 'pixel', name: 'Pixel', role: 'Design', description: 'Genera recursos visuales, creatividades para anuncios y mantiene la identidad de marca.', icon: <Icons.Image /> },
  { id: 'nova', name: 'Nova', role: 'Personal Assistant', description: 'Gestiona tu agenda, reuniones y equilibrio vida-trabajo. Tu guardián del tiempo.', icon: <Icons.Calendar /> },
  { id: 'reelo', name: 'Reelo', role: 'Video & Scripts', description: 'Especialista en guiones virales para TikTok/Reels y edición básica de vídeo.', icon: <Icons.Video /> },
  { id: 'atlas', name: 'Atlas', role: 'Strategy', description: 'Visión global. Analiza métricas cruzadas y propone estrategias de crecimiento.', icon: <div className="font-bold text-lg">A</div> },
];

// --- 3. Components ---

// > Liquid Core Animation (Background)
const LiquidCore = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    let time = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    
    // Interaction State
    const mouse = { x: w/2, y: h/2, active: false };
    const ripples: {x: number, y: number, age: number, life: number}[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const handleScroll = () => {
        targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = (e: MouseEvent) => {
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            age: 0,
            life: 100
        });
    };
    window.addEventListener('mousedown', handleClick);

    const animate = () => {
      time += 0.005;
      // Smooth scroll effect for stretching
      scrollY += (targetScrollY - scrollY) * 0.1;
      
      // Clear with fade for trails
      ctx.fillStyle = 'rgba(0,0,0,0.02)'; // More trail
      ctx.fillRect(0, 0, w, h);

      // Physics config
      // Massive sphere
      const centerX = w / 2;
      const centerY = h / 2;
      const baseRadius = Math.min(w, h) * 0.65; // 30% larger than before

      // Draw Ripples
      for(let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.age++;
          const progress = r.age / r.life;
          const radius = progress * 300;
          const alpha = 1 - progress;
          
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if(r.age >= r.life) ripples.splice(i, 1);
      }

      // Draw The Core
      const particles = 60; // Dense lines
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2;
        
        // Dynamic Radius based on noise and scroll
        // The 'stretch' happens by modifying Y based on scrollY speed
        const scrollStretch = Math.abs(targetScrollY - scrollY) * 0.05;
        
        const xx = Math.cos(angle + time) * baseRadius;
        const yy = Math.sin(angle + time * 1.2) * (baseRadius + scrollStretch);
        
        // Mouse interaction repulsion
        const dx = (centerX + xx) - mouse.x;
        const dy = (centerY + yy) - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const repulsion = Math.max(0, 300 - dist) * 0.2;
        
        // Draw fluid lines
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        // Bezier control points with noise
        const cp1x = xx * 0.5 + Math.sin(time * 2 + i) * 50;
        const cp1y = yy * 0.5 + Math.cos(time * 3 + i) * 50;
        
        const endX = xx + (dx / dist) * repulsion;
        const endY = yy + (dy / dist) * repulsion;

        ctx.quadraticCurveTo(cp1x, cp1y, endX, endY);
        
        // Ethereal Color Gradient
        const grad = ctx.createLinearGradient(0, 0, endX, endY);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.1)');
        grad.addColorStop(1, 'rgba(255,255,255,0.8)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Add node points at edges
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-canvas" />;
};

// > Login Overlay
const LoginOverlay = ({ onClose, onLogin }: { onClose: () => void, onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      onLogin(); // Success
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-md glass-panel p-8 rounded-2xl ${shaking ? 'animate-[pulse-slow_0.1s_ease-in-out_infinite]' : ''}`}
        style={{ transform: shaking ? 'translateX(0)' : 'none' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back</h2>
        <p className="text-gray-400 mb-8">Enter your credentials to access VIG Brain.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Identity</label>
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors font-mono"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors font-mono"
              placeholder="•••••"
            />
          </div>

          {error && (
             <div className="text-red-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
                Authentication failed.
             </div>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 mt-4"
          >
            Initialize Session
          </button>
        </form>
      </div>
    </div>
  );
};

// > Platform View (ChatGPT Style)
const PlatformView = () => {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'agent', text: 'Hola. Soy VIG. Tu sistema operativo de IA. ¿En qué puedo ayudarte hoy? Puedo organizar tu agenda, revisar campañas o analizar tus finanzas.' },
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate thinking
    setTimeout(() => {
       const responseMsg = { id: Date.now() + 1, role: 'agent', text: `Entendido. Estoy procesando tu solicitud con ${activeAgent.name}. Dame un momento para consultar VIG Brain...` };
       setMessages(prev => [...prev, responseMsg]);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white font-sans relative z-10">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-xl hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
               <Icons.Brain className="w-5 h-5" />
             </div>
             <span className="font-bold text-xl tracking-tight">VIGLABS</span>
          </div>
          <button className="w-full flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300">
            <Icons.Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-1">
          <div className="px-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Your Team</div>
          {AGENTS.map(agent => (
            <button 
              key={agent.id}
              onClick={() => setActiveAgent(agent)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${activeAgent.id === agent.id ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-xs">
                {agent.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-200">{agent.name}</div>
                <div className="text-[10px] text-gray-500">{agent.role}</div>
              </div>
              {activeAgent.id === agent.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
           <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs font-mono">AD</div>
              <div className="text-sm">
                 <div className="font-medium">Admin User</div>
                 <div className="text-xs text-gray-500">Pro Plan</div>
              </div>
              <Icons.Settings className="w-4 h-4 ml-auto text-gray-500 hover:text-white cursor-pointer"/>
           </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col relative">
         {/* Header */}
         <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
               <span className="text-gray-400 md:hidden"><Icons.Menu /></span>
               <span className="font-bold text-lg">{activeAgent.name}</span>
               <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 uppercase tracking-wider">{activeAgent.role}</span>
            </div>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-br-none' 
                      : 'glass-panel text-gray-200 rounded-bl-none'
                  }`}>
                     <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-4 md:p-6 pb-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
            <div className="max-w-4xl mx-auto relative">
               <form onSubmit={handleSend} className="glass-panel rounded-2xl flex items-end p-2 gap-2 focus-within:ring-1 ring-white/20 transition-all">
                  <button type="button" className="p-3 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                     <Icons.Paperclip className="w-5 h-5" />
                  </button>
                  <textarea 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) handleSend(e as any); }}
                    placeholder={`Message ${activeAgent.name}...`}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white py-3 max-h-48 resize-none no-scrollbar placeholder-gray-600"
                    rows={1}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      input.trim() ? 'bg-white text-black hover:scale-105' : 'bg-white/5 text-gray-600'
                    }`}
                  >
                    <Icons.Send className="w-5 h-5" />
                  </button>
               </form>
               <div className="text-center mt-2 text-[10px] text-gray-600">
                  VIG AI can make mistakes. Consider checking important information.
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// > Agents Page View (Detailed)
const AgentsPageView = () => {
  const [selected, setSelected] = useState(AGENTS[0]);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 pb-12 flex flex-col md:flex-row gap-8 relative z-10">
       {/* Left List */}
       <div className="w-full md:w-1/3 lg:w-1/4 space-y-2 animate-in slide-in-from-left duration-500">
          <h2 className="text-2xl font-bold mb-6 pl-2 border-l-2 border-white">Select Agent</h2>
          {AGENTS.map((agent, i) => (
            <div 
              key={agent.id}
              onClick={() => setSelected(agent)}
              className={`group cursor-pointer p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                selected.id === agent.id 
                ? 'bg-white text-black border-white' 
                : 'bg-black/40 border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
               <div className="flex items-center justify-between relative z-10">
                 <span className="font-mono text-sm tracking-wider uppercase">{agent.role}</span>
                 <span className="font-bold text-lg">{agent.name}</span>
               </div>
               {/* Hover Glow */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          ))}
       </div>

       {/* Right Details */}
       <div className="flex-1 glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden animate-in zoom-in-95 duration-500">
          {/* Background Grid for tech feel */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center">
             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white/20 flex items-center justify-center mb-8 bg-black/50 backdrop-blur-xl">
                <div className="scale-150 text-white/90">
                  {selected.icon}
                </div>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">{selected.name}</h1>
             <div className="h-1 w-24 bg-white mb-8"></div>
             
             <h3 className="text-xl md:text-2xl text-gray-300 font-light mb-8 leading-relaxed max-w-2xl">
                {selected.description}
             </h3>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                   <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Specialty</div>
                   <div className="text-lg">{selected.role}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                   <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Access Level</div>
                   <div className="text-lg">Full Data Read/Write</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// > Home Page Content
const LandingView = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
        
        {/* Pill Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel animate-in slide-in-from-top duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wider text-gray-300 uppercase">
            VIG Brain 1.0 Online
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none select-none cursor-default">
          <span className="ethereal-title block hover:scale-105 transition-transform duration-500">TOTAL</span>
          <span className="ethereal-title block typing-twitch">CONTROL</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed animate-in fade-in duration-1000 delay-300">
          Not just a chatbot. A complete team of autonomous AI agents orchestrated by a central brain. Manage your life and business from a single conversation.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <button className="flex-1 bg-white text-black h-14 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
            Start Now
            <Icons.Brain className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
          <button className="flex-1 glass-panel h-14 rounded-xl font-medium text-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            Watch Demo
            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">2:15</span>
          </button>
        </div>
      </main>

      {/* Brain Grid Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">How VIG Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Col 1 */}
            <div className="space-y-8 pt-12">
              <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500">
                 <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 text-blue-400"><Icons.Brain /></div>
                 <h3 className="text-2xl font-bold mb-2">VIG Core</h3>
                 <p className="text-gray-400">The orchestrator. It understands your intent and delegates tasks to specialized agents.</p>
              </div>
              <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 delay-100">
                 <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 text-purple-400"><Icons.Calendar /></div>
                 <h3 className="text-2xl font-bold mb-2">Nova</h3>
                 <p className="text-gray-400">Your agenda guardian. Manages meetings, deep work blocks, and personal time.</p>
              </div>
            </div>

            {/* Center - The Brain Visualization placeholder */}
            <div className="hidden md:flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl"></div>
                <div className="relative z-10 w-full aspect-[3/4] glass-panel rounded-full border-2 border-white/10 flex flex-col items-center justify-center gap-4 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 z-20 pointer-events-none" />
                   {/* Internal UI Mockup */}
                   <div className="w-48 p-3 glass-panel rounded-xl text-xs mb-2 z-10 animate-float">
                      <div className="flex items-center gap-2 mb-2 opacity-50"><div className="w-2 h-2 rounded-full bg-green-500"/>Memory</div>
                      <div className="h-1 bg-white/20 rounded w-full mb-1"/>
                      <div className="h-1 bg-white/20 rounded w-2/3"/>
                   </div>
                   <div className="w-56 p-3 glass-panel rounded-xl text-xs z-10 animate-float" style={{ animationDelay: '1s' }}>
                      <div className="flex items-center gap-2 mb-2 opacity-50"><div className="w-2 h-2 rounded-full bg-blue-500"/>Documents</div>
                      <div className="h-1 bg-white/20 rounded w-3/4 mb-1"/>
                      <div className="h-1 bg-white/20 rounded w-1/2"/>
                   </div>
                   <div className="w-48 p-3 glass-panel rounded-xl text-xs mt-2 z-10 animate-float" style={{ animationDelay: '2s' }}>
                      <div className="flex items-center gap-2 mb-2 opacity-50"><div className="w-2 h-2 rounded-full bg-orange-500"/>Metrics</div>
                      <div className="flex gap-1">
                         <div className="h-6 w-2 bg-white/20 rounded-sm"/>
                         <div className="h-4 w-2 bg-white/20 rounded-sm"/>
                         <div className="h-8 w-2 bg-white/20 rounded-sm"/>
                      </div>
                   </div>
                </div>
            </div>

            {/* Col 3 */}
            <div className="space-y-8 pt-12 md:pt-24">
              <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 delay-200">
                 <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400"><div className="font-bold">$</div></div>
                 <h3 className="text-2xl font-bold mb-2">Saldo</h3>
                 <p className="text-gray-400">Real-time CFO. Tracks ROI, expenses, and profitability across all your brands.</p>
              </div>
              <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 delay-300">
                 <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 text-pink-400"><Icons.Pen /></div>
                 <h3 className="text-2xl font-bold mb-2">Flare</h3>
                 <p className="text-gray-400">Marketing Director. Plans campaigns, writes copy, and coordinates visuals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-2xl font-bold tracking-tighter">VIGLABS</div>
           <div className="text-gray-500 text-sm">© 2025 VIG AI Inc. All systems operational.</div>
           <div className="flex gap-6">
             <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
           </div>
        </div>
      </footer>
    </>
  );
};

// --- 4. Main App Shell ---
const App = () => {
  const [view, setView] = useState<'landing' | 'agents' | 'platform'>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setView('platform');
  };

  const handleNavigation = (target: 'landing' | 'agents' | 'platform') => {
    if (target === 'platform' && !isLoggedIn) {
      setShowLogin(true);
    } else {
      setView(target);
    }
  };

  // CRT turn-on effect
  useEffect(() => {
    const boot = document.createElement('div');
    boot.className = 'crt-boot-overlay';
    boot.innerHTML = '<div class="crt-line"></div>';
    document.body.appendChild(boot);
  }, []);

  return (
    <div className="min-h-screen relative text-gray-100 font-sans selection:bg-white selection:text-black">
      
      {/* Login Modal */}
      {showLogin && (
        <LoginOverlay 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLoginSuccess} 
        />
      )}

      {/* Global Backgrounds */}
      <LiquidCore />
      <div className="scanlines" />
      <div className="noise-overlay" />

      {/* Platform View has its own internal layout, so we hide the main header if platform is active */}
      {view !== 'platform' && (
        <header className="fixed top-0 w-full z-50 px-6 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div 
              className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigation('landing')}
            >
              VIGLABS
            </div>
            
            <div className="hidden md:flex items-center gap-8 glass-panel px-8 py-3 rounded-full">
              <button onClick={() => handleNavigation('landing')} className={`text-sm font-medium hover:text-white transition-colors ${view === 'landing' ? 'text-white' : 'text-gray-400'}`}>Product</button>
              <button onClick={() => handleNavigation('agents')} className={`text-sm font-medium hover:text-white transition-colors ${view === 'agents' ? 'text-white' : 'text-gray-400'}`}>Agents</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Company</button>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <button 
                  onClick={() => setView('platform')}
                  className="bg-white text-black px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Open App
                </button>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-white text-black px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </header>
      )}

      {/* View Router */}
      {view === 'landing' && <LandingView />}
      {view === 'agents' && <AgentsPageView />}
      {view === 'platform' && <PlatformView />}

    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
