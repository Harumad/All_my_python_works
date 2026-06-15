return (
  <div className="h-screen bg-[#0f1720] text-white flex flex-col">

    {/* CHAT AREA */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {chat.map((msg, i) => (
        <div
          key={i}
          className={`flex gap-3 max-w-3xl mx-auto ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* AI Avatar */}
          {msg.role === "ai" && (
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">
              AI
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
              msg.role === "user"
                ? "bg-emerald-500 text-black rounded-br-sm"
                : "bg-[#1e293b] text-slate-200 rounded-bl-sm"
            }`}
          >
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>

          {/* User Avatar */}
          {msg.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              U
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="text-slate-400 text-center">
          SmartTrader AI is typing...
        </div>
      )}
    </div>

    {/* INPUT */}
    <div className="p-4 border-t border-emerald-900/20 flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-3 rounded-xl bg-[#1e293b] outline-none"
        placeholder="Ask something..."
      />

      <button
        onClick={sendMessage}
        className="bg-emerald-500 px-5 py-3 rounded-xl text-black font-bold"
      >
        Send
      </button>
    </div>

  </div>
);