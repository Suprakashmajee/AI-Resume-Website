type PolishKind = 'summary' | 'bullets';

/**
 * Optional Gemini polish. Works when GEMINI_API_KEY is available at build/runtime
 * (AI Studio injects it). Falls back to a local heuristic rewrite otherwise.
 */
export async function polishText(kind: PolishKind, input: string): Promise<string> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('Add some text first, then try AI polish.');
  }

  const apiKey = (
    (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ||
    (import.meta.env.GEMINI_API_KEY as string | undefined)
  )?.trim();

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const prompt =
        kind === 'summary'
          ? `Rewrite this resume summary to be concise, confident, and ATS-friendly (3-4 sentences). Keep facts. Return only the rewritten summary:\n\n${trimmed}`
          : `Rewrite these resume bullet points. Keep each achievement factual, start with strong verbs, one bullet per line. Return only the bullets:\n\n${trimmed}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const text = response.text?.trim();
      if (text) return text;
    } catch (err) {
      console.warn('Gemini polish failed, using local fallback', err);
    }
  }

  return localPolish(kind, trimmed);
}

function localPolish(kind: PolishKind, input: string): string {
  if (kind === 'summary') {
    const cleaned = input.replace(/\s+/g, ' ').trim();
    const sentences = cleaned
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);
    if (sentences.length === 0) return cleaned;
    return sentences
      .map((s) => (s.endsWith('.') || s.endsWith('!') || s.endsWith('?') ? s : `${s}.`))
      .join(' ');
  }

  return input
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
    .map((line) => {
      const capped = line.charAt(0).toUpperCase() + line.slice(1);
      return capped.endsWith('.') ? capped : `${capped}.`;
    })
    .join('\n');
}
