import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Copy, Check, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const MarkdownText: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let tableBuffer: string[] = [];
  let formulaBuffer: string[] = [];
  let inFormula = false;

  const flushList = (key: number) => {
    if (!currentList) return null;
    const ListTag = currentList.type;
    const el = (
      <ListTag key={`list-${key}`} className={ListTag}>
        {currentList.items.map((item, idx) => <li key={idx}>{item}</li>)}
      </ListTag>
    );
    currentList = null;
    return el;
  };

  const flushCode = (key: number) => {
    if (!codeBlockLines.length) return null;
    const text = codeBlockLines.join('\n');
    codeBlockLines = [];
    return <pre key={`code-${key}`}><code>{text}</code></pre>;
  };

  const flushFormula = (key: number) => {
    if (!formulaBuffer.length) return null;
    const text = formulaBuffer.join('\n');
    formulaBuffer = [];
    inFormula = false;
    return <pre key={`formula-${key}`} className="formula">{text}</pre>;
  };

  const flushTable = (key: number) => {
    if (!tableBuffer.length) return null;
    const raw = [...tableBuffer];
    const rows = raw.map(r => r.split('|').filter(c => c !== '').map(c => c.trim()));
    tableBuffer = [];
    let seperatorIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length > 0 && /^[-:\s]+$/.test(rows[i][0]) && rows[i].every(c => /^[-:\s]+$/.test(c))) {
        seperatorIdx = i;
        break;
      }
    }
    if (seperatorIdx === -1) {
      return (<>{raw.map((line, li) => <p key={`${key}-${li}`}>{line}</p>)}</>);
    }
    const thead = seperatorIdx > 0 ? (
      <thead>
        <tr>{rows[0].map((c, ci) => <th key={ci}>{parseInline(c)}</th>)}</tr>
      </thead>
    ) : null;
    const bodyStart = seperatorIdx + 1;
    const tbody = bodyStart < rows.length ? (
      <tbody>
        {rows.slice(bodyStart).map((row, ri) => (
          <tr key={ri}>{row.map((c, ci) => <td key={ci}>{parseInline(c)}</td>)}</tr>
        ))}
      </tbody>
    ) : null;
    return <table key={`table-${key}`}>{thead}{tbody}</table>;
  };

  const parseInline = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx}>{part.slice(2, -2)}</strong>;
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cPart, cIdx) => {
        if (cPart.startsWith('`') && cPart.endsWith('`')) return <code key={`${idx}-${cIdx}`}>{cPart.slice(1, -1)}</code>;
        return cPart;
      });
    });
  };

  const isFormulaLine = (text: string, raw: string): boolean => {
    const t = text.trim();
    if (t.includes('─')) return true;
    if (/^\s{2,}/.test(raw) && /[\d:=]/.test(t)) {
      if (t.startsWith('Profit') || t.startsWith('Revenue') || t.startsWith('Expense') || t.startsWith('Net') || t.startsWith('Less') || t.startsWith('Sales') || t.startsWith('Total') || t.startsWith('Cost') || t.startsWith('Margin') || t.startsWith('Gross') || t.startsWith('Income') || t.includes('GHS') || t.includes('GH₵') || t.includes('¢')) return true;
    }
    return false;
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) { inCodeBlock = false; const el = flushCode(i); if (el) renderedElements.push(el); }
      else { const le = flushList(i); if (le) renderedElements.push(le); const te = flushTable(i); if (te) renderedElements.push(te); const fe = flushFormula(i); if (fe) renderedElements.push(fe); inCodeBlock = true; }
      continue;
    }
    if (inCodeBlock) { codeBlockLines.push(lines[i]); continue; }
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const fe = flushFormula(i); if (fe) renderedElements.push(fe);
      const le = flushList(i); if (le) renderedElements.push(le);
      tableBuffer.push(trimmed);
      continue;
    }
    if (tableBuffer.length) { const el = flushTable(i); if (el) renderedElements.push(el); }
    if (isFormulaLine(lines[i], lines[i])) {
      if (!inFormula) {
        const le = flushList(i); if (le) renderedElements.push(le);
        const te = flushTable(i); if (te) renderedElements.push(te);
        inFormula = true;
      }
      formulaBuffer.push(lines[i]);
      continue;
    } else if (inFormula) {
      const el = flushFormula(i); if (el) renderedElements.push(el);
    }
    if (trimmed.startsWith('#') && /^#{1,6}\s/.test(trimmed)) {
      const le = flushList(i); if (le) renderedElements.push(le);
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const tag = `h${Math.min(6, level + 2)}` as keyof JSX.IntrinsicElements;
        renderedElements.push(React.createElement(tag, { key: i }, parseInline(match[2])));
      }
      continue;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const text = trimmed.substring(2);
      if (!currentList) currentList = { type: 'ul', items: [text] };
      else currentList.items.push(text);
      continue;
    }
    if (currentList) { const el = flushList(i); if (el) renderedElements.push(el); }
    if (!trimmed) { renderedElements.push(<div key={i} style={{ height: 6 }} />); continue; }
    renderedElements.push(<p key={i}>{parseInline(lines[i])}</p>);
  }
  const le = flushList(lines.length); if (le) renderedElements.push(le);
  const ce = flushCode(lines.length); if (ce) renderedElements.push(ce);
  const te = flushTable(lines.length); if (te) renderedElements.push(te);
  const fe = flushFormula(lines.length); if (fe) renderedElements.push(fe);
  return <>{renderedElements}</>;
};

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const STORAGE_KEY = 'fraudshield_chat_messages';

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  useEffect(() => {
    if (isOpen && textareaRef.current) textareaRef.current.focus();
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isGenerating) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: '' }]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok || !response.body) throw new Error('API error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const clean = line.trim();
          if (!clean || !clean.startsWith('data: ')) continue;
          const data = clean.substring(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              accumulated += parsed.content;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: accumulated };
                return copy;
              });
            }
          } catch { /* skip parse errors */ }
        }
      }
    } catch (err: any) {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: `Connection Error: Unable to reach the server. Please ensure the API is running.\n\n*${err.message || 'Server Unreachable'}*`
        };
        return copy;
      });
    } finally {
      setIsGenerating(false);
    }
  }, [input, isGenerating, messages]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const copyMsg = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(`msg_${idx}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="chat-panel-overlay" onClick={onClose} />}

      {/* Panel */}
      <div className={`chat-panel${isOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="chat-panel-header">
          <div className="chat-panel-header-info">
            <div className="chat-panel-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <div className="chat-panel-title">FinBot AI</div>
              <div className="chat-panel-status">Online</div>
            </div>
          </div>
          <div className="chat-panel-header-actions">
            <button className="chat-panel-btn" onClick={clearChat} title="Clear conversation">
              <Trash2 size={14} />
            </button>
            <button className="chat-panel-btn" onClick={onClose} title="Close">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-panel-messages">
          {messages.length === 0 ? (
            <div className="chat-panel-welcome">
              <i className="fas fa-robot" style={{ fontSize: 48, color: 'var(--primary)', marginBottom: 16 }}></i>
              <h3>Your Financial Assistant</h3>
              <p>Ask me about personal finance, business planning, savings, mobile money, or fraud detection.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 16 }}>
                {[
                  'How can I create a monthly budget?',
                  'What\'s the best way to save for a business?',
                  'Load a MoMo message screenshot for scam analysis',
                ].map((prompt, i) => (
                  <button key={i} className="chat-panel-suggestion" onClick={() => {
                    setInput(prompt);
                    setTimeout(() => {
                      if (textareaRef.current) {
                        textareaRef.current.style.height = 'auto';
                        textareaRef.current.style.height = Math.min(200, textareaRef.current.scrollHeight) + 'px';
                      }
                    }, 0);
                  }}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`chat-panel-msg ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="chat-panel-msg-avatar"><i className="fas fa-robot"></i></div>
                )}
                <div className="chat-panel-msg-content">
                  <div className="chat-panel-msg-text">
                    <MarkdownText content={msg.content} />
                    {isGenerating && idx === messages.length - 1 && msg.role === 'assistant' && msg.content === '' && (
                      <span className="chat-panel-typing">
                        <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                      </span>
                    )}
                    {isGenerating && idx === messages.length - 1 && msg.role === 'assistant' && msg.content !== '' && (
                      <span className="chat-panel-cursor"></span>
                    )}
                  </div>
                  {msg.content && (
                    <button className="chat-panel-copy-btn" onClick={() => copyMsg(msg.content, idx)} title="Copy">
                      {copiedId === `msg_${idx}` ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-panel-input-area">
          <div className="chat-panel-input-wrapper">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about finance, fraud, or mobile money..."
              disabled={isGenerating}
            />
            <button className="chat-panel-send-btn" onClick={handleSend} disabled={isGenerating || !input.trim()} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
