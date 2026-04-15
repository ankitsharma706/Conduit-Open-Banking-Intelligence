import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, CheckCircle2, Zap, Terminal } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

const AIAssistantConsole: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Conduit AI Assistant active. I can help you diagnose API failures, query system health, or trigger remediation steps. What would you like to investigate?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('health')) return "Current System Health is 92%. Primary FIP Gateway is stable at 142ms. Partner UPI Node is showing critical latency (485ms), impacting approximately ₹ 8.4 Cr of AUM.";
    if (q.includes('failure') || q.includes('diagnose')) return "Diagnosing... Found P1 Incident (INC-2026-001) at Partner UPI Node. Root cause: Connection timeout at partner downstream. Recommendation: Trigger Failover to Secondary UPI Node.";
    if (q.includes('remediate') || q.includes('fix')) return "Remediation triggered. Automated Failover initiated for Partner UPI Node. Traffic redirected to Secondary Node. Monitoring recovery...";
    return "I've analyzed your query. Based on current telemetry, the ecosystem is operating within expected thresholds, except for the Partner UPI Node. Would you like a detailed trace of the latest latency spike?";
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center text-[#00B4D8]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#0A1628]">AI Assistant Console</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operational Intelligence Layer</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Model Active</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#F8FAFC]"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-[#00B4D8] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
              msg.role === 'assistant' 
                ? 'bg-white border border-gray-100 shadow-sm text-[#0A1628]' 
                : 'bg-[#0A1628] text-white'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#00B4D8] text-white flex items-center justify-center shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g., 'Diagnose current failures' or 'Trigger remediation')"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 pr-16 text-sm font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 w-12 bg-[#0A1628] text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          <QuickAction label="Check Health" onClick={() => setInput("Check system health")} />
          <QuickAction label="Diagnose Failures" onClick={() => setInput("Diagnose current failures")} />
          <QuickAction label="Trigger Remediation" onClick={() => setInput("Trigger remediation for Partner UPI Node")} />
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="px-3 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-[#00B4D8] hover:text-[#00B4D8] transition-all"
  >
    {label}
  </button>
);

export default AIAssistantConsole;
