import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict

from main import SYSTEM_PROMPT, get_openai_client, get_model

app = FastAPI(title="FinBot API Server", description="FastAPI Backend for FinBot Chatbot UI")

# Enable CORS for React Dev Server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatPayload(BaseModel):
    messages: List[Message]

@app.get("/api/health")
def health_check():
    try:
        # Simple health check, also confirms if OpenAI client can be initialized
        get_openai_client()
        return {"status": "ok", "bot": "FinBot", "message": "Ready to help with finance!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/chat")
def chat_endpoint(payload: ChatPayload):
    try:
        client = get_openai_client()
        model = get_model()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Prepend the system prompt if not already present
    messages = []
    has_system = any(m.role == "system" for m in payload.messages)
    
    if not has_system:
        messages.append({"role": "system", "content": SYSTEM_PROMPT})
        
    for msg in payload.messages:
        messages.append({"role": msg.role, "content": msg.content})

    def event_generator():
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                stream=True
            )
            for chunk in response:
                if len(chunk.choices) > 0:
                    content = chunk.choices[0].delta.content
                    if content:
                        yield f"data: {json.dumps({'content': content})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
