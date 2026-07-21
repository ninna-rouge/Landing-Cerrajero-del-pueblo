from pathlib import Path
import re
from urllib.parse import quote


def to_js_string(s: str) -> str:
    parts = ['"']
    for ch in s:
        o = ord(ch)
        if ch == "\\":
            parts.append("\\\\")
        elif ch == '"':
            parts.append('\\"')
        elif ch == "\n":
            parts.append("\\n")
        elif ch == "\r":
            parts.append("\\r")
        elif o > 127:
            parts.append(f"\\u{{{o:X}}}")
        else:
            parts.append(ch)
    parts.append('"')
    return "".join(parts)


msgs = {
    "default": """¡Hola! 👋

Espero que estén muy bien. Les escribo desde la web de *Cerrajero del Pueblo* porque necesito ayuda con un tema de cerrajería 🔑

¿Me pueden orientar con el servicio y decirme disponibilidad, por favor?

Quedo atento/a y muchas gracias por la confianza 😊🙏""",
    "hero": """¡Hola! 👋

Les escribo desde su sitio web. Vi que están disponibles *24/7* y me dio confianza contactarlos 🙏

Necesito ayuda con cerrajería y me gustaría saber si pueden atenderme.

Si les sirve, les dejo el dato:
📍 Comuna / sector: _
🛠️ Qué necesito: _

¡Muchas gracias! Quedo atento/a 😊🔑""",
    "service": """¡Hola! 👋

Quiero solicitar un servicio con ustedes. Me gustó lo claros que son con la información y por eso les escribo con confianza 🙏

Les cuento lo que necesito:
🛠️ Servicio: _
📍 Comuna / sector: _
⏰ ¿Pueden venir hoy o prefieren que coordinemos horario?

Si es de día (09:00 a 19:00) entiendo que no hay recargo; si es de noche, me confirman el valor con el recargo 🌙

¡Gracias! Quedo atento/a 😊🔑""",
    "pricing": """¡Hola! 👋

Estuve viendo sus tarifas y me gustaría cotizar con ustedes. Gracias por publicar los valores con claridad; da mucha tranquilidad 🙏📋

¿Me pueden ayudar con esto?
🛠️ Servicio: _
📍 Comuna: _
⏰ Horario aproximado: _

Si cae en horario de emergencia (19:00 a 09:00), ¿me confirman el total con el recargo de $15.000?

¡Muchas gracias! Quedo atento/a 💬✨""",
    "coverage": """¡Hola! 👋

Antes de pedir el servicio, quiero confirmar si llegan hasta mi zona 📍

📍 Comuna / sector: _

Vi que cubren el *sur oriente* (Puente Alto, La Florida y cercanas). ¿Me confirman si tienen cobertura donde estoy?

Si sí, después les cuento qué necesito para coordinar 😊🙏

¡Gracias!""",
    "contact": """¡Hola! 👋

Me contacto desde la web de *Cerrajero del Pueblo*. Gracias por la confianza que transmiten y por estar disponibles cuando uno más lo necesita 🙏💚

Necesito ayuda con cerrajería. ¿Me pueden atender?

Les dejo mis datos para que sea más fácil:
📍 Comuna: _
🛠️ Qué necesito: _
⏰ ¿Es urgente o podemos coordinar en horario normal (09:00 a 19:00)?

¡Muchas gracias! Quedo atento/a 🔑😊""",
    "fab": """¡Hola! 👋

Les escribo rapidito desde el WhatsApp de su página. ¿Me pueden ayudar con un servicio de cerrajería? 🔑

📍 Estoy en: _
🛠️ Necesito: _

Si pueden, me confirman disponibilidad y valor. ¡Gracias por la atención! 😊🙏""",
}

entries = ",\n".join(f"  {k}: {to_js_string(v)}" for k, v in msgs.items())
new_block = f"const WHATSAPP_MESSAGES = {{\n{entries}\n}}"

path = Path(__file__).resolve().parents[1] / "assets" / "js" / "main.js"
text = path.read_text(encoding="utf-8")
start = text.index("const WHATSAPP_MESSAGES = {")
end = text.index("const buildWhatsAppUrl")
path.write_text(text[:start] + new_block + "\n\n" + text[end:], encoding="utf-8")

verify = path.read_text(encoding="utf-8")
assert "\\u{1F44B}" in verify
section = verify.split("const WHATSAPP_MESSAGES")[1].split("const buildWhatsAppUrl")[0]
assert "👋" not in section

sample = re.search(r'fab: "(.+?)"(?:,|\n\})', verify, re.S).group(1)


def decode_js(s: str) -> str:
    s = s.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")

    def repl(m):
        return chr(int(m.group(1), 16))

    return re.sub(r"\\u\{([0-9A-Fa-f]+)\}", repl, s)


decoded = decode_js(sample)
assert "👋" in decoded and "🔑" in decoded
url = "https://wa.me/56978530417?text=" + quote(decoded, safe="")
assert "%F0%9F%91%8B" in url  # 👋 in UTF-8 percent encoding
print("OK — emojis escaped and URL encodes correctly")
print(url[:90] + "...")
