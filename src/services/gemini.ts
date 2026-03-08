import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export interface VectoPayload {
  inputType: 'manual' | 'pdf' | 'url';
  manualData?: any;
  pdfData?: { base64: string; mimeType: string; name: string };
  urlData?: string;
  marketSignals: any;
}

export async function generateVectoReport(payload: VectoPayload) {
  const promptText = `
You are the Vecto TVET Architect, an AI-powered "Live-Curriculum" Engine for Malaysia.
Your goal is to continuously update vocational training curricula by identifying emerging skills (especially digital and green competencies) and generating "patches" for outdated training modules.

Task:
1. Analyze the provided legacy curriculum (provided as text, a PDF document, or a URL).
2. Compare it against the provided market signals and your knowledge of 2026 Malaysian industry trends.
3. Calculate the Skill Obsolescence Score (0-100%) and provide a Confidence Score for your analysis.
4. Generate a Modernization Patch that replaces obsolete manual tasks with Digital/Green tasks. Include specific update notes (e.g., "Add 2 hours on solar inverter diagnostics to Module 3").
5. Provide the Patch in BOTH English and Bahasa Malaysia.
6. Provide a Parent-Teacher Pitch (New-Collar Narrative) to rebrand the course and reduce social stigma.
7. Provide an "Industry-Ready" checklist for instructors.

Constraint: Do not suggest outdated technologies. Pivot to the 2026 industry standard.

Market Signals (Live Data Feed):
${JSON.stringify(payload.marketSignals, null, 2)}

Output Format Requirements:
Use clear headings.

Example Output Format (Markdown):
# Vecto Live-Curriculum Patch

**Obsolescence Score:** [Score]% | **AI Confidence Score:** [Score]%
**Data Sources Analyzed:** JobStreet Malaysia, DOSM, LinkedIn

## Top 3 Skills to Add (Gap Detection):
- [Skill 1]
- [Skill 2]
- [Skill 3]

## Digital/Green Integration Patch:
**English:**
[Specific pedagogical shift and concise update notes, e.g., "Add 2 hours on X"]

**Bahasa Malaysia:**
[Terjemahan dan nota kemas kini yang spesifik]

## Industry-Ready Checklist for Instructors:
- [Item 1]
- [Item 2]

## The New-Collar Narrative (Parental Perception Insight):
> [1-sentence pitch for parents/students highlighting high-tech nature and wage parity in Malaysia]
`;

  const parts: any[] = [{ text: promptText }];
  let config: any = {};

  if (payload.inputType === 'manual') {
    parts.push({ text: `\n\nLegacy Curriculum Data:\n${JSON.stringify(payload.manualData, null, 2)}` });
  } else if (payload.inputType === 'pdf' && payload.pdfData) {
    parts.push({ text: `\n\nLegacy Curriculum Data is provided in the attached PDF document (${payload.pdfData.name}).` });
    parts.push({
      inlineData: {
        data: payload.pdfData.base64,
        mimeType: payload.pdfData.mimeType
      }
    });
  } else if (payload.inputType === 'url' && payload.urlData) {
    parts.push({ text: `\n\nLegacy Curriculum Data is located at this URL: ${payload.urlData}. Please read and analyze the content from this URL.` });
    config.tools = [{ urlContext: {} }];
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: { parts },
    config: Object.keys(config).length > 0 ? config : undefined,
  });

  return response.text;
}


