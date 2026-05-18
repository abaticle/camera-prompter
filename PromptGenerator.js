const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * PromptGenerator Class
 * Handles prompt generation for cinema shots by interfacing with the Google Gemini API.
 */
class PromptGenerator {
  /**
   * Initializes the PromptGenerator with configuration settings.
   * @param {Object} config - Configuration object containing Gemini credentials.
   * @param {string} config.geminiApiKey - The API key for the Gemini service.
   * @param {string} config.geminiModel - The specific model version to invoke.
   */
  constructor(config) {
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
    this.apiKey = apiKey;
    this.modelName = config.geminiModel || "gemini-1.5-flash";
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    } else {
      this.genAI = null;
      console.warn("PromptGenerator: Gemini API Key is missing. Gemini requests will not succeed until key is provided.");
    }
  }

  /**
   * Generates a fully detailed cinema shot prompt by calling the Gemini API.
   * Takes user parameters and returns a beautifully structured JSON response.
   * @param {Object} params - Input parameters for the cinematic shot.
   * @param {string} params.subject - The main subject/action of the scene.
   * @param {string} params.cameraBody - Selected camera sensor/body model.
   * @param {string} params.aperture - Selected lens aperture (depth of field).
   * @param {string} params.lightingStyle - Chosen cinematic lighting theme.
   * @param {string} params.aspectRatio - The intended aspect ratio framing.
   * @param {string} params.lens - Specific camera glass / lens.
   * @param {string} params.filmStock - Selected film emulsion or digital sensor style.
   * @param {string} params.composition - Framing technique / camera angle.
   * @returns {Promise<Object>} The structured result containing the cinematic prompt and metadata.
   */
  async generate(params) {
    if (!this.apiKey) {
      throw new Error("Gemini API key is not configured. Please add your key in config.json or set GEMINI_API_KEY env variable.");
    }

    if (!this.genAI) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }

    const {
      subject = "A quiet, mysterious encounter",
      cameraBody = "ARRI Alexa LF",
      aperture = "f/2.8",
      lightingStyle = "Golden Hour",
      aspectRatio = "2.39:1",
      lens = "Cooke S4/i Prime",
      filmStock = "Kodak Vision3 500T",
      composition = "Rule of Thirds",
      targetGenerator = "Midjourney"
    } = params;

    const systemPrompt = `You are an expert cinematic director, cinematographer, and prompt engineer. Your job is to construct a highly immersive, descriptive image-generation prompt and cinematic notes based on standard camera parameters, specifically tailored for the target image generator.
You must return your output strictly in JSON format. Use the following structure:
{
  "finalPrompt": "An exquisite, detailed prompt designed for advanced AI image generators, specifically customized to excel on the target generator. It must seamlessly blend the subject, camera body, aperture, lens properties, lighting style, film stock texture, and composition framing into a compelling single paragraph.",
  "directorNotes": "A professional paragraph explaining why this exact combination of camera, lens, and lighting fits the mood of the subject. Provide cinematography reasoning.",
  "suggestedColors": ["Color 1", "Color 2", "Color 3"],
  "technicalSettings": "Additional technical recommendations such as shutter speed, ISO range, and camera movement (e.g., pan, tilt, tracking) to capture the scene perfectly."
}`;

    const userPrompt = `Generate a cinema shot plan with the following specifications:
- Subject: ${subject}
- Camera Body: ${cameraBody}
- Lens Glass: ${lens}
- Aperture/Depth of field: ${aperture}
- Lighting Style: ${lightingStyle}
- Composition / Framing: ${composition}
- Film Stock / Color Grade: ${filmStock}
- Aspect Ratio: ${aspectRatio}
- Target Image Generator: ${targetGenerator}

Make the finalPrompt extremely vivid, professional, and evocative, containing specific details about lighting, textures, atmospheres, and cinematic quality.

Crucial Prompt Styling Rules for the Selected Target Image Generator:
- If Target Image Generator is "Midjourney", style the finalPrompt to be dramatic, detailed, and highly aesthetic. You MUST append an exact aspect ratio suffix at the very end of the finalPrompt paragraph based on the aspect ratio parameter (e.g., if aspect ratio is "2.39:1 (Anamorphic Widescreen)" append " --ar 21:9", if "1.33:1" append " --ar 4:3", if "1.85:1" append " --ar 16:9", if "9:16" append " --ar 9:16", if "1.00:1" append " --ar 1:1"). Include high-detail camera names and settings inside the prose.
- If Target Image Generator is "Nano Banana", optimize the prompt to focus on extremely rich micro-textures, organic details, vibrant warm colors, close-range rendering clarity, and tangible real-world physical properties.
- If Target Image Generator is "ChatGTP Image 2", write a fluid, cohesive, and highly detailed natural paragraph prompt suited for DALL-E 3, focusing on descriptive narrative and atmospheric details rather than short-hand camera tags or suffixes, ensuring it translates naturally without metadata tags.

Return ONLY valid JSON corresponding to the requested structure, with no markdown code block backticks (do not wrap in \`\`\`json, just return raw JSON string). Ensure the JSON is valid and parsable.`;

    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      });

      const responseText = result.response.text();
      return JSON.parse(responseText.trim());
    } catch (error) {
      console.error("Gemini API Error in PromptGenerator:", error);
      throw new Error(`Failed to generate prompt via Gemini: ${error.message}`);
    }
  }
}

module.exports = PromptGenerator;
