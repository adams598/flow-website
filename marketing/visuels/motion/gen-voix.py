import asyncio
from pathlib import Path

import edge_tts

OUT = Path(__file__).resolve().parent
TEXT = """<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fr-FR">
<voice name="fr-FR-RemyMultilingualNeural">
<prosody rate="-12%" pitch="-2Hz">
Flow.
<break time="700ms"/>
Des produits digitaux, conçus pour votre métier.
<break time="650ms"/>
Je vous présente Adams Dexter.
<break time="400ms"/>
Ingénieur informatique. Fondateur de Flow.
<break time="450ms"/>
C'est lui qui conçoit votre solution, et qui la livre.
<break time="700ms"/>
Un site, qui vous représente.
<break time="320ms"/>
Une application, qui simplifie votre quotidien.
<break time="320ms"/>
Une plateforme, qui relie vos équipes.
<break time="600ms"/>
Un appel. Et votre projet prend forme.
</prosody>
</voice>
</speak>"""


async def main() -> None:
    comm = edge_tts.Communicate(TEXT, "fr-FR-RemyMultilingualNeural")
    subs = edge_tts.SubMaker()
    audio = OUT / "voix-lancement.mp3"
    with audio.open("wb") as handle:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                handle.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                subs.feed(chunk)
    (OUT / "voix-lancement.vtt").write_text(subs.get_srt(), encoding="utf-8")
    print(audio, audio.stat().st_size)


if __name__ == "__main__":
    asyncio.run(main())
