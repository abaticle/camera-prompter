const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const PromptGenerator = require('./PromptGenerator');

const app = express();
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const CONFIG_PATH = path.join(__dirname, 'config.json');
const DATA_DIR = path.join(__dirname, 'data');

/**
 * Reads the configuration file dynamically.
 * @returns {Promise<Object>} The parsed configuration object.
 */
async function readConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading config.json:", error);
    return { port: 3000, geminiApiKey: "", geminiModel: "gemini-1.5-flash" };
  }
}

/**
 * Writes updates back to the configuration file.
 * @param {Object} newConfig - The updated configuration object.
 * @returns {Promise<void>} Resolves when the file is saved.
 */
async function writeConfig(newConfig) {
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing config.json:", error);
    throw error;
  }
}

/**
 * Reads a specific options JSON file from the data directory.
 * @param {string} filename - The name of the JSON file to read.
 * @returns {Promise<Array>} The parsed options array.
 */
async function readOptionFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error);
    return [];
  }
}

/**
 * Route handler to fetch all cinematic options in a single call.
 * GET /api/options
 */
app.get('/api/options', async (req, res) => {
  try {
    const fields = [
      'cameraBody',
      'aperture',
      'lightingStyle',
      'aspectRatio',
      'lens',
      'filmStock',
      'composition',
      'targetGenerator'
    ];

    const results = {};
    for (const field of fields) {
      results[field] = await readOptionFile(`${field}.json`);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to load option lists." });
  }
});

/**
 * Route handler to check configuration status (e.g., if API key is present).
 * GET /api/config
 */
app.get('/api/config', async (req, res) => {
  const config = await readConfig();
  const hasApiKey = !!(config.geminiApiKey || process.env.GEMINI_API_KEY);
  res.json({
    hasApiKey,
    geminiModel: config.geminiModel || "gemini-1.5-flash"
  });
});

/**
 * Route handler to update configuration settings directly from the UI.
 * POST /api/config
 */
app.post('/api/config', async (req, res) => {
  try {
    const { geminiApiKey, geminiModel } = req.body;
    const config = await readConfig();

    if (geminiApiKey !== undefined) config.geminiApiKey = geminiApiKey;
    if (geminiModel !== undefined) config.geminiModel = geminiModel;

    await writeConfig(config);
    res.json({ success: true, message: "Configuration updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update configuration." });
  }
});

/**
 * Route handler to trigger cinematic prompt generation.
 * POST /api/generate
 */
app.post('/api/generate', async (req, res) => {
  try {
    const config = await readConfig();
    const generator = new PromptGenerator(config);
    const params = req.body;

    const result = await generator.generate(params);
    res.json(result);
  } catch (error) {
    console.error("Generation handler error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Starts the Express server on the configured port.
 */
async function startServer() {
  const config = await readConfig();
  const PORT = config.port || 3000;
  
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🎬 Cinema Prompt Generator Backend is running!`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`===================================================`);
  });
}

startServer();
