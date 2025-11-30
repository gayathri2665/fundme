!pip install -U transformers

from transformers import pipeline

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

model_name = "mistralai/Mistral-7B-Instruct-v0.3"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype="auto"
)

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=60,
    temperature=0.3,
    top_p=0.9
)



def one_line_pitch(pitch_text):
    prompt = f"""
Convert the following long startup pitch into ONE refined 1-line pitch.
The output must follow this style:
- Short
- Clear
- Uses technology + target user + benefit
- Should look like: “AI-driven nutrition platform linking patients to certified diet experts.”

Pitch:
{pitch_text}

One-line refined pitch:
"""

    result = pipe(prompt)[0]["generated_text"]
    return result.split("One-line refined pitch:")[-1].strip()


pitch = """
Our startup provides a drone-based solution that helps farmers monitor crops more efficiently.
The drones scan fields for soil moisture, pest activity, and nutrient levels in real time.
AI instantly analyzes these patterns and recommends targeted actions to farmers.
This reduces fertilizer overuse and boosts crop productivity significantly.
Farmers can track their entire field from a simple mobile dashboard.
We make precision agriculture affordable for small and mid-sized farms.
"""

print(one_line_pitch(pitch))