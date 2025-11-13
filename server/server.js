import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Very simple in-memory session store (resets on server restart)
const sessions = new Map(); // sessionId -> [{role, content}]

const SYSTEM_PROMPT = `You are Auxonium Group's assistant. Be concise and helpful. 
Services: IT Solutions, AC Mechanics, Electrical Works across UAE. 
WhatsApp: +971563536545. Areas: Dubai, Abu Dhabi, Sharjah, Ajman (All UAE). 
If user asks for quote: collect name, phone, service type, location, preferred time. 
Never invent prices. Offer WhatsApp handoff for urgent issues.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body || {};
    if (!message) return res.status(400).json({ error: 'message is required' });

    const sid = sessionId || 'anon';
    const history = sessions.get(sid) || [ { role: 'system', content: SYSTEM_PROMPT } ];

    history.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: history,
      temperature: 0.3,
      max_tokens: 350,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not process that.';

    history.push({ role: 'assistant', content: reply });
    // Keep only last 12 messages plus system
    const system = history[0];
    const trimmed = [system, ...history.slice(-12)];
    sessions.set(sid, trimmed);

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Chat service error' });
  }
});

// Optional: simple lead capture endpoint
app.post('/api/lead', async (req, res) => {
  try {
    const { name, phone, service, location, time, notes } = req.body || {};
    if (!name || !phone || !service) {
      return res.status(400).json({ error: 'name, phone, and service are required' });
    }
    // For demo, just log. You can push to Google Sheets/Email/DB here.
    console.log('New lead:', { name, phone, service, location, time, notes, at: new Date().toISOString() });
    res.json({ ok: true });
  } catch (err) {
    console.error('Lead error:', err);
    res.status(500).json({ error: 'Lead service error' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Auxonium chatbot server listening on http://localhost:${PORT}`);
});
