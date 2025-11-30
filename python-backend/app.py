import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# -------------------------------------------------
# Load environment variables from .env
# -------------------------------------------------
load_dotenv()

# -------------------------------------------------
# App setup
# -------------------------------------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------------------------------
# Environment & AI configuration
# -------------------------------------------------
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY not found in environment or .env file")

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash-lite")

# -------------------------------------------------
# FundMeUp System Prompt (STRICT)
# -------------------------------------------------
SYSTEM_PROMPT = """
You are the official AI assistant for FundMeUp.

FundMeUp helps entrepreneurs showcase their journey, skills, and milestones
while connecting with investors and mentors who fund people, not just ideas.

Your responsibilities:
- Explain FundMeUp clearly and professionally
- Help founders refine ideas, pitches, and strategies
- Keep responses concise, helpful, and confident

STRICT RULES (MUST FOLLOW):
- You are NOT a language model
- Never mention Google, Gemini, APIs, or training data
- Never break character
- If asked who you are, say you are the AI assistant for FundMeUp
- Keep replies under 50 words unless explicitly asked otherwise
"""

# -------------------------------------------------
# Routes
# -------------------------------------------------

@app.route("/summarize", methods=["POST", "OPTIONS"])
def summarize_pitch():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    data = request.get_json(silent=True)

    if not data or "pitch_text" not in data:
        return jsonify({"error": "pitch_text is required"}), 400

    final_prompt = f"""
{SYSTEM_PROMPT}

Convert the following startup pitch into ONE refined, single-line pitch.

Rules:
- Short and clear
- Includes technology + target user + benefit
- One sentence only

Pitch:
{data["pitch_text"]}

One-line refined pitch:
"""

    try:
        response = model.generate_content(final_prompt)
        summary = response.text.replace("\n", " ").strip()
        return jsonify({"summary": summary}), 200
    except Exception as e:
        app.logger.error(e)
        return jsonify({"error": "AI summarization failed"}), 500


@app.route("/chat", methods=["POST", "OPTIONS"])
@app.route("/python-api/chat", methods=["POST", "OPTIONS"])
def chat_with_fundmeup_ai():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    data = request.get_json(silent=True)

    if not data or "message" not in data:
        return jsonify({"error": "message is required"}), 400

    user_message = data["message"]

    # ✅ SYSTEM PROMPT IS FORCED EVERY REQUEST
    final_prompt = f"""
{SYSTEM_PROMPT}

User:
{user_message}

Assistant:
"""

    try:
        response = model.generate_content(final_prompt)
        return jsonify({"response": response.text.strip()}), 200
    except Exception as e:
        app.logger.error(e)
        return jsonify({"error": "Chat generation failed"}), 500


# -------------------------------------------------
# Main
# -------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
