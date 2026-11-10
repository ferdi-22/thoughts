/* Lokale KI-Stimme (Kokoro-82M) – läuft komplett im Browser.
   Dieser "Web Worker" rechnet in einem eigenen Hintergrund-Thread,
   damit die App beim Erzeugen der Sprache nicht einfriert.

   Ablauf:
   1. Beim ersten Mal lädt der Browser das Modell (~90 MB) von Hugging Face
      und speichert es (Cache) – danach geht es ohne erneuten Download.
   2. Für jeden Text erzeugt das Modell Audiodaten (24 kHz) und
      schickt sie als WAV zurück an die App. */

import { KokoroTTS } from 'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js';

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
let ttsPromise = null;

function loadModel() {
  ttsPromise ??= KokoroTTS.from_pretrained(MODEL_ID, {
    dtype: 'q8',      // komprimierte Variante: ~90 MB statt ~330 MB, klingt fast gleich
    device: 'wasm',   // läuft auf jedem Gerät (WebAssembly)
    progress_callback: p => {
      // Fortschritt der großen Modelldatei an die App melden
      if (p.status === 'progress' && p.file?.endsWith('.onnx'))
        postMessage({ type: 'progress', percent: Math.round(p.progress) });
    },
  }).catch(err => { ttsPromise = null; throw err; });   // beim nächsten Mal neu versuchen
  return ttsPromise;
}

onmessage = async ({ data }) => {
  const { id, text, voice, speed } = data;
  try {
    const tts = await loadModel();
    postMessage({ type: 'ready' });
    const audio = await tts.generate(text, { voice, speed });
    postMessage({ type: 'audio', id, blob: audio.toBlob() });
  } catch (err) {
    postMessage({ type: 'error', id, message: err?.message || String(err) });
  }
};
