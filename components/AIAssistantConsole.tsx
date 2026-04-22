import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, CheckCircle2, Zap, Terminal, Image, Paperclip } from 'lucide-react';

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
    <div className="flex flex-col h-full max-w-5xl mx-auto bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden animate-fade-in">
      {/* Header removed as it is in sub-bar */}

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              msg.role === 'assistant' 
                ? 'bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white glossy-emoji' 
                : 'bg-[#0A1628] text-white shadow-[#0A1628]/10'
            }`}>
              {msg.role === 'assistant' ? <Bot size={22} className="animate-pulse" /> : <User size={20} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-[14px] font-medium leading-relaxed shadow-sm ${
              msg.role === 'assistant' 
                ? 'bg-white border border-[#E2E8F0] text-[#0A1628]' 
                : 'bg-[#0A1628] text-white'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white flex items-center justify-center shrink-0 glossy-emoji shadow-lg">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div className="bg-white border border-[#E2E8F0] shadow-sm p-4 rounded-xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-4">
          <button className="p-2 text-gray-400 hover:text-[#00B4D8] transition-colors hover:bg-[#F0F9FF] rounded-lg" title="Upload Image">
            <Image size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-[#00B4D8] transition-colors hover:bg-[#F0F9FF] rounded-lg" title="Upload File">
            <Paperclip size={20} />
          </button>
        </div>
        <form onSubmit={handleSend} className="relative flex gap-3">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about system health or diagnostics..."
            className="flex-1 h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] px-4 text-[14px] text-[#0A1628] outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/5 transition-all placeholder:text-[#8B9BB4]"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-[52px] h-[52px] bg-[#0A1628] text-white rounded-[12px] flex items-center justify-center hover:bg-[#1E293B] transition-all disabled:opacity-50 shadow-lg shadow-[#0A1628]/10 group"
          >
            <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          <QuickAction label="Check Health" onClick={() => setInput("Check system health")} />
          <QuickAction label="Diagnose Failures" onClick={() => setInput("Diagnose current failures")} />
          <QuickAction label="Trigger Remediation" onClick={() => setInput("Trigger remediation for Partner UPI Node")} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .glossy-emoji {
          background: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%);
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(0,180,216,0.2);
          position: relative;
          overflow: hidden;
        }
        .glossy-emoji::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
        }
      ` }} />
    </div>
  );
};

const QuickAction = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="h-[32px] px-3 rounded-[4px] border border-[#E2E8F0] bg-white text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4] hover:border-[#00B4D8] hover:text-[#00B4D8] transition-all"
  >
    {label}
  </button>
);

export default AIAssistantConsole;
