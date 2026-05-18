import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';

/**
 * CinePrompter Class
 * Main custom Lit component that renders the cinematic prompt generator workspace.
 */
class CinePrompter extends LitElement {
  
  /**
   * Defines reactive properties for the component.
   */
  static properties = {
    options: { type: Object },
    selectedOptions: { type: Object },
    subject: { type: String },
    config: { type: Object },
    generationResult: { type: Object },
    isLoading: { type: Boolean },
    isApiKeyDialogOpen: { type: Boolean },
    apiKeyInput: { type: String },
    modelInput: { type: String },
    errorMessage: { type: String }
  };

  /**
   * Defines CSS styles for the component using Glassmorphism and dark cinema aesthetics.
   */
  static styles = css`
    :host {
      display: block;
      font-family: 'Outfit', sans-serif;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      color: #f1f5f9;
    }

    /* Prevent Flash of Unstyled Content for Custom Web Components */
    :not(:defined) {
      display: none !important;
    }

    /* Glassmorphic Container styling */
    .glass-card {
      background: rgba(13, 15, 23, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 2.2rem;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }

    /* Navbar/Header layout */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 1.5rem;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      font-size: 2.2rem;
      animation: rotate-lens 20s linear infinite;
    }

    @keyframes rotate-lens {
      100% { transform: rotate(360deg); }
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0;
      letter-spacing: 2px;
      background: linear-gradient(135deg, #fff 30%, #e2e8f0 70%, #ffc73c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 20px rgba(255, 199, 60, 0.1);
    }

    .subtitle {
      font-size: 0.95rem;
      color: #94a3b8;
      margin-top: 4px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .badge-api {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 20px;
      background: rgba(220, 38, 38, 0.15);
      border: 1px solid rgba(220, 38, 38, 0.3);
      color: #f87171;
      transition: all 0.3s ease;
    }

    .badge-api.configured {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
    }

    .badge-api:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    /* Grid Workspace layout */
    .workspace-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 2.5rem;
    }

    @media (max-width: 968px) {
      .workspace-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Left Sidebar: Director's Desk */
    .desk-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: #f8fafc;
      margin-top: 0;
      margin-bottom: 1.2rem;
      display: flex;
      align-items: center;
      gap: 8px;
      border-left: 3px solid #ffc73c;
      padding-left: 10px;
    }

    /* Presets Panel styled premium */
    .presets-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 1.8rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 10px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .preset-btn {
      cursor: pointer;
      font-size: 0.8rem;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.5);
      color: #cbd5e1;
      transition: all 0.2s ease;
      font-family: 'Space Grotesk', sans-serif;
    }

    .preset-btn:hover {
      background: #ffc73c;
      color: #0d0e12;
      border-color: #ffc73c;
      transform: scale(1.03);
      box-shadow: 0 4px 10px rgba(255, 199, 60, 0.2);
    }

    .form-group {
      margin-bottom: 1.4rem;
    }

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.8rem;
    }

    @media (max-width: 576px) {
      .grid-inputs {
        grid-template-columns: 1fr;
      }
    }

    sl-select {
      width: 100%;
    }

    .field-desc {
      font-size: 0.78rem;
      color: #64748b;
      margin-top: 4px;
      line-height: 1.3;
      padding-left: 2px;
    }

    .generate-btn-container {
      margin-top: 2rem;
    }

    .generate-btn {
      width: 100%;
      height: 3.5rem;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 1px;
      font-family: 'Space Grotesk', sans-serif;
      --sl-color-primary-600: #ffc73c;
      --sl-color-primary-500: #e0ab24;
      --sl-color-primary-700: #d49a1c;
      transition: all 0.3s ease;
    }

    .generate-btn::part(base) {
      background-image: linear-gradient(135deg, #ffd35c 0%, #e0ab24 100%);
      border: none;
      color: #090a0f;
      box-shadow: 0 8px 24px rgba(224, 171, 36, 0.25);
    }

    .generate-btn:hover::part(base) {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(224, 171, 36, 0.4);
    }

    /* Right Sidebar: Production Monitor Viewfinder */
    .monitor-card {
      border: 2px solid #334155;
      background: #06070a;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      min-height: 520px;
      display: flex;
      flex-direction: column;
    }

    /* Cinematic Viewfinder overlay indicators */
    .viewfinder-marks {
      pointer-events: none;
      position: absolute;
      inset: 15px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
      z-index: 2;
    }

    .viewfinder-corner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid #ffc73c;
      z-index: 2;
    }

    .vf-tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
    .vf-tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
    .vf-bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
    .vf-br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

    .vf-rec-dot {
      position: absolute;
      top: 25px;
      left: 25px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      color: #ef4444;
      font-family: 'Space Grotesk', sans-serif;
      z-index: 3;
    }

    .rec-pulse {
      width: 8px;
      height: 8px;
      background-color: #ef4444;
      border-radius: 50%;
      animation: pulse-red 1s infinite alternate;
    }

    @keyframes pulse-red {
      0% { opacity: 0.3; }
      100% { opacity: 1; box-shadow: 0 0 8px #ef4444; }
    }

    .vf-lens-info {
      position: absolute;
      top: 25px;
      right: 25px;
      font-size: 0.7rem;
      color: #64748b;
      font-family: 'Space Grotesk', sans-serif;
      text-transform: uppercase;
      z-index: 3;
    }

    .monitor-content {
      flex: 1;
      padding: 3rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 2;
    }

    /* Idle / Blank state */
    .monitor-placeholder {
      text-align: center;
      color: #475569;
    }

    .monitor-placeholder-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      color: #334155;
    }

    .monitor-placeholder-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.2rem;
      color: #94a3b8;
      margin-bottom: 6px;
    }

    .monitor-placeholder-sub {
      font-size: 0.85rem;
      max-width: 300px;
      margin: 0 auto;
    }

    /* Loading state overlay with professional logging console */
    .monitor-loading {
      position: absolute;
      inset: 0;
      background: rgba(9, 10, 15, 0.95);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      padding: 2rem;
    }

    .loading-clapper {
      font-size: 3rem;
      animation: bounce 1.5s infinite ease-in-out;
      margin-bottom: 1.5rem;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }

    .loading-status {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      color: #ffc73c;
      font-weight: 600;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }

    .loading-console {
      font-family: monospace;
      font-size: 0.75rem;
      color: #34d399;
      background: #000;
      padding: 10px 15px;
      border-radius: 8px;
      border: 1px solid rgba(52, 211, 153, 0.2);
      width: 100%;
      max-width: 320px;
      min-height: 60px;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
    }

    /* Result State layout */
    .result-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      animation: fade-in-up 0.5s ease-out;
    }

    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .result-section {
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
      padding: 1rem;
    }

    .result-header {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      color: #ffc73c;
      text-transform: uppercase;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing: 0.5px;
    }

    .prompt-text {
      font-size: 0.95rem;
      color: #e2e8f0;
      line-height: 1.5;
      font-style: italic;
      margin: 0;
    }

    .notebook-text {
      font-size: 0.85rem;
      color: #cbd5e1;
      line-height: 1.4;
      margin: 0;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px 16px;
      font-size: 0.82rem;
    }

    .tech-label {
      color: #64748b;
      font-weight: 600;
    }

    .tech-value {
      color: #94a3b8;
    }

    /* Glowing Color Palette */
    .palette-list {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: 4px;
    }

    .color-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      color: rgba(255,255,255,0.7);
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 4px 10px;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    /* Custom form styling elements */
    sl-textarea::part(base) {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    sl-textarea::part(base):focus-within {
      border-color: #ffc73c;
      box-shadow: 0 0 10px rgba(255, 199, 60, 0.15);
    }

    sl-select::part(combobox) {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    sl-select::part(combobox):focus-within {
      border-color: #ffc73c;
    }

    sl-alert {
      margin-bottom: 1.5rem;
    }

    .settings-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 1.5rem;
    }
  `;

  /**
   * Constructs the class and initializes internal reactive state variables.
   */
  constructor() {
    super();
    this.options = {
      cameraBody: [],
      aperture: [],
      lightingStyle: [],
      aspectRatio: [],
      lens: [],
      filmStock: [],
      composition: [],
      targetGenerator: []
    };
    this.selectedOptions = {
      cameraBody: '',
      aperture: '',
      lightingStyle: '',
      aspectRatio: '',
      lens: '',
      filmStock: '',
      composition: '',
      targetGenerator: ''
    };
    this.subject = "A lone cinematic explorer standing on a colossal ancient stone platform, looking up at a glowing colossal stellar portal in a star-filled celestial sky.";
    this.config = { hasApiKey: false, geminiModel: "gemini-1.5-flash" };
    this.generationResult = null;
    this.isLoading = false;
    this.isApiKeyDialogOpen = false;
    this.apiKeyInput = '';
    this.modelInput = 'gemini-1.5-flash';
    this.errorMessage = '';
    
    // Log active console feedback messages during prompt compilation
    this.activeLogMsg = "Idle";
    this.logRotatorInterval = null;
  }

  /**
   * Invoked automatically once the element is mounted in the document.
   * Calls methods to load options and setup configs.
   */
  connectedCallback() {
    super.connectedCallback();
    this.loadOptions();
    this.loadConfig();
  }

  /**
   * Fetches the full set of cinematic fields and options from the server API.
   */
  async loadOptions() {
    try {
      const response = await fetch('/api/options');
      if (!response.ok) throw new Error("Failed to load options");
      this.options = await response.json();
      
      // Load saved selections from localStorage if present
      const savedSelectionsStr = localStorage.getItem('cine_prompter_selections');
      let savedSelections = null;
      if (savedSelectionsStr) {
        try {
          savedSelections = JSON.parse(savedSelectionsStr);
        } catch (e) {
          console.warn("Failed to parse saved selections from localStorage:", e);
        }
      }

      // Auto-initialize selected IDs with the first choice of each list or restored selection
      const initializedSelections = {};
      for (const [key, list] of Object.entries(this.options)) {
        if (list && list.length > 0) {
          if (savedSelections && savedSelections[key]) {
            // Ensure the saved ID is still present in the dynamic options list
            const exists = list.some(opt => opt.id === savedSelections[key]);
            initializedSelections[key] = exists ? savedSelections[key] : list[0].id;
          } else {
            initializedSelections[key] = list[0].id;
          }
        }
      }
      this.selectedOptions = initializedSelections;

      // Restore saved subject if present in localStorage
      const savedSubject = localStorage.getItem('cine_prompter_subject');
      if (savedSubject !== null) {
        this.subject = savedSubject;
        const textarea = this.shadowRoot.querySelector('sl-textarea');
        if (textarea) textarea.value = savedSubject;
      }
    } catch (error) {
      this.errorMessage = "Failed to communicate with options database. Ensure backend server is running.";
    }
  }

  /**
   * Fetches the current configuration state (API key and active model) from the server.
   */
  async loadConfig() {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) throw new Error("Failed to fetch settings");
      this.config = await response.json();
      this.modelInput = this.config.geminiModel || "gemini-1.5-flash";
    } catch (error) {
      console.error("Config fetch error:", error);
    }
  }

  /**
   * Triggers the loader console log simulator while call is in progress.
   */
  startConsoleAnimation() {
    const messages = [
      "Connecting to Gemini Intelligence Network...",
      "Analyzing camera sensor and depth metrics...",
      "Simulating anamorphic lens streak refraction...",
      "Calculating golden spiral spatial weight...",
      "Applying warm Kodak Vision3 silver emulsion grain...",
      "Compiling final high-fidelity cinematic prompt...",
      "Polishing Director's custom grading log..."
    ];
    let i = 0;
    this.activeLogMsg = messages[0];
    
    this.logRotatorInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      this.activeLogMsg = messages[i];
      this.requestUpdate();
    }, 1200);
  }

  /**
   * Terminates the loader console log simulator interval.
   */
  stopConsoleAnimation() {
    if (this.logRotatorInterval) {
      clearInterval(this.logRotatorInterval);
      this.logRotatorInterval = null;
    }
  }

  /**
   * Updates state when a specific cinematic selector is changed.
   * @param {string} field - The database configuration field.
   * @param {string} value - Selected option value ID.
   */
  handleOptionChange(field, value) {
    this.selectedOptions = {
      ...this.selectedOptions,
      [field]: value
    };
    
    // Save updated selections to localStorage
    localStorage.setItem('cine_prompter_selections', JSON.stringify(this.selectedOptions));
  }

  /**
   * Updates state when custom subject description text is modified.
   * @param {Event} event - Input element modification event.
   */
  handleSubjectInput(event) {
    this.subject = event.target.value;
    
    // Save updated subject description to localStorage
    localStorage.setItem('cine_prompter_subject', this.subject);
  }

  /**
   * Opens the configuration modal.
   */
  openApiKeyDialog() {
    this.isApiKeyDialogOpen = true;
  }

  /**
   * Closes the configuration modal.
   */
  closeApiKeyDialog() {
    this.isApiKeyDialogOpen = false;
  }

  /**
   * Sends the updated Gemini settings/API key back to the backend.
   * @param {Event} event - Form click trigger.
   */
  async saveConfig(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiApiKey: this.apiKeyInput,
          geminiModel: this.modelInput
        })
      });

      if (!response.ok) throw new Error("Failed to save configuration settings.");
      
      this.isApiKeyDialogOpen = false;
      this.apiKeyInput = '';
      this.loadConfig();
      
      // Notify custom success feedback using browser window alerts (safe for testing)
      alert("Settings saved successfully!");
    } catch (error) {
      alert(`Error updating settings: ${error.message}`);
    }
  }

  /**
   * Applies a preset template instantly by filling subject and camera parameters.
   * @param {string} presetName - The preset name key.
   */
  applyPreset(presetName) {
    const presets = {
      cyberpunk: {
        subject: "A cybernetically enhanced courier wearing a glowing transparent yellow raincoat, standing under flashing holographic billboard projections in a rainy, narrow Neo-Tokyo alleyway.",
        cameraBody: "sony_venice_2",
        lens: "panavision_c_anamorphic",
        aperture: "f_1_8",
        lightingStyle: "neon_noir",
        composition: "leading_lines",
        filmStock: "kodak_vision3_500t",
        aspectRatio: "2_39_1",
        targetGenerator: "midjourney"
      },
      goldenHour: {
        subject: "An vintage convertible driving down a scenic coastal highway hugging high seaside cliffs, warm dust particles dancing in the air as waves break in the distance.",
        cameraBody: "arri_alexa_lf",
        lens: "cooke_s4",
        aperture: "f_2_8",
        lightingStyle: "golden_hour",
        composition: "rule_of_thirds",
        filmStock: "kodak_portra_400",
        aspectRatio: "2_39_1",
        targetGenerator: "midjourney"
      },
      kubrickSciFi: {
        subject: "A pristine white futuristic command deck of a colony vessel, clinical control panels glowing soft cyan, with a lone astronaut standing in exact center looking at a deep black monolith.",
        cameraBody: "imax_msm_9802",
        lens: "zeiss_master_prime",
        aperture: "f_5_6",
        lightingStyle: "high_key",
        composition: "center_symmetrical",
        filmStock: "digital_clean",
        aspectRatio: "1_43_1",
        targetGenerator: "chatgtp_image_2"
      },
      vintageNoir: {
        subject: "A detective with a wet fedora hat standing beneath a solitary gas lamp lighting on a dark harbor dock, dense low-hanging fog rising from the cold ocean water.",
        cameraBody: "super_35",
        lens: "canon_k35",
        aperture: "f_1_2",
        lightingStyle: "chiaroscuro",
        composition: "low_angle",
        filmStock: "eastman_double_x",
        aspectRatio: "1_33_1",
        targetGenerator: "nano_banana"
      }
    };

    const targetPreset = presets[presetName];
    if (targetPreset) {
      this.subject = targetPreset.subject;
      
      const newSelections = { ...this.selectedOptions };
      for (const field of Object.keys(newSelections)) {
        if (targetPreset[field]) {
          newSelections[field] = targetPreset[field];
        }
      }
      this.selectedOptions = newSelections;
      
      // Perform UI text-areas state refresh
      const textarea = this.shadowRoot.querySelector('sl-textarea');
      if (textarea) textarea.value = targetPreset.subject;

      // Save complete preset states to localStorage
      localStorage.setItem('cine_prompter_selections', JSON.stringify(this.selectedOptions));
      localStorage.setItem('cine_prompter_subject', this.subject);

      // Force select elements updates
      this.requestUpdate();
    }
  }

  /**
   * Submits selected inputs to the Node backend to generate a rich prompt via Gemini.
   */
  async generatePrompt() {
    if (!this.config.hasApiKey) {
      this.openApiKeyDialog();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.generationResult = null;
    this.startConsoleAnimation();

    // Map selected ids to their actual readable option names
    const mappedParams = {
      subject: this.subject
    };

    for (const [field, selectedId] of Object.entries(this.selectedOptions)) {
      const optionsList = this.options[field] || [];
      const matchingOption = optionsList.find(opt => opt.id === selectedId);
      mappedParams[field] = matchingOption ? matchingOption.name : selectedId;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedParams)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate cinematic prompt.");
      }

      this.generationResult = await response.json();
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
      this.stopConsoleAnimation();
    }
  }

  /**
   * Renders the description of a selected option dynamically beneath the dropdown.
   * @param {string} field - The option list field key.
   * @returns {string} The description string.
   */
  getSelectedDescription(field) {
    const list = this.options[field] || [];
    const selectedId = this.selectedOptions[field];
    const match = list.find(opt => opt.id === selectedId);
    return match ? match.description : '';
  }

  /**
   * Helper function to map field keys to clean human-readable titles.
   * @param {string} field - The database configuration field.
   * @returns {string} Clean formatted display label.
   */
  getFieldLabel(field) {
    const labels = {
      cameraBody: "Camera Body",
      aperture: "Aperture (DoF)",
      lightingStyle: "Lighting Style",
      aspectRatio: "Aspect Ratio",
      lens: "Lens Glass",
      filmStock: "Film Stock / Texture",
      composition: "Composition Framing",
      targetGenerator: "Target Image Generator"
    };
    return labels[field] || field;
  }

  /**
   * Render function to compile the element's shadow DOM template.
   */
  render() {
    return html`
      <div class="glass-card">
        
        <!-- Header Section -->
        <header>
          <div class="logo-container">
            <div class="logo-icon">🎬</div>
            <div>
              <h1>CINEPROMPTER</h1>
              <div class="subtitle">Ultimate Cinema Shot Prompt Workspace</div>
            </div>
          </div>

          <!-- API Key Status button (glowing toggle badge) -->
          <div class="badge-api ${this.config.hasApiKey ? 'configured' : ''}" @click=${this.openApiKeyDialog}>
            <span>🔑</span>
            <span>${this.config.hasApiKey ? 'Gemini Active' : 'API Key Required'}</span>
          </div>
        </header>

        <!-- Warning Alert if API key is not configured -->
        ${!this.config.hasApiKey ? html`
          <sl-alert variant="warning" open>
            <span style="font-size: 1.2rem; margin-right: 8px;">⚠️</span>
            <div>
              <strong>Gemini API Key Missing</strong><br>
              A Google Gemini API key is required to synthesize and generate cinematic shots.
              <a href="#" style="color: #ffc73c; font-weight: 600;" @click=${(e) => { e.preventDefault(); this.openApiKeyDialog(); }}>
                Configure Key Now
              </a>
            </div>
          </sl-alert>
        ` : ''}

        <!-- Workspace main split grids -->
        <div class="workspace-grid">
          
          <!-- Left: Parameter Dashboard Panel -->
          <div class="options-panel">
            <div class="desk-title">🎬 Cinematographer's Clipboard</div>
            
            <!-- Beautiful Preset Pills -->
            <div class="presets-container">
              <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; padding: 6px 4px 6px 0; font-family: 'Space Grotesk', sans-serif;">Presets:</span>
              <button class="preset-btn" @click=${() => this.applyPreset('cyberpunk')}>⚡ Neon Cyberpunk</button>
              <button class="preset-btn" @click=${() => this.applyPreset('goldenHour')}>☀️ Golden Highway</button>
              <button class="preset-btn" @click=${() => this.applyPreset('kubrickSciFi')}>🚀 Kubrick Space</button>
              <button class="preset-btn" @click=${() => this.applyPreset('vintageNoir')}>🕶️ Classic Film Noir</button>
            </div>

            <!-- Custom Subject Textarea -->
            <div class="form-group">
              <div style="font-size: 0.85rem; font-weight: 600; color: #94a3b8; margin-bottom: 8px; font-family: 'Space Grotesk', sans-serif; display: flex; justify-content: space-between;">
                <span>Subject / Scene Narrative</span>
                <span style="color: #64748b; font-weight: normal;">Describe the core vision</span>
              </div>
              <sl-textarea 
                rows="3" 
                placeholder="A mysterious figure in a foggy harbor, warm lantern light casting long shadows..." 
                value=${this.subject} 
                @input=${this.handleSubjectInput}>
              </sl-textarea>
            </div>

            <!-- Parameters Selector Grid -->
            <div class="grid-inputs">
              ${Object.keys(this.options).map(field => html`
                <div class="form-group">
                  <div style="font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-family: 'Space Grotesk', sans-serif;">
                    ${this.getFieldLabel(field)}
                  </div>
                  <sl-select 
                    value=${this.selectedOptions[field] || ''} 
                    @sl-change=${(e) => this.handleOptionChange(field, e.target.value)}>
                    ${(this.options[field] || []).map(opt => html`
                      <sl-option value=${opt.id}>${opt.name}</sl-option>
                    `)}
                  </sl-select>
                  <div class="field-desc">${this.getSelectedDescription(field)}</div>
                </div>
              `)}
            </div>

            <!-- Large Action Button -->
            <div class="generate-btn-container">
              <sl-button 
                variant="primary" 
                class="generate-btn" 
                ?loading=${this.isLoading}
                @click=${this.generatePrompt}>
                🎬 Generate Cinematic Scene Prompt
              </sl-button>
            </div>
          </div>

          <!-- Right: Production Viewfinder Monitor -->
          <div class="monitor-card">
            <!-- Camera Viewfinder Corner Indicators -->
            <div class="viewfinder-marks">
              <div class="viewfinder-corner vf-tl"></div>
              <div class="viewfinder-corner vf-tr"></div>
              <div class="viewfinder-corner vf-bl"></div>
              <div class="viewfinder-corner vf-br"></div>
            </div>

            <!-- Top Viewfinder stats -->
            <div class="vf-rec-dot">
              <div class="rec-pulse"></div>
              <span>MONITOR LIVE</span>
            </div>
            <div class="vf-lens-info">
              ${this.selectedOptions.aspectRatio ? this.options.aspectRatio.find(o => o.id === this.selectedOptions.aspectRatio)?.name.split(' ')[0] : '2.39:1'}
            </div>

            <!-- Dynamic Loader State -->
            ${this.isLoading ? html`
              <div class="monitor-loading">
                <div class="loading-clapper">🎬</div>
                <div class="loading-status">DIRECTING SHOT...</div>
                <sl-spinner style="font-size: 2rem; --track-width: 4px; --indicator-color: #ffc73c; margin-bottom: 1.5rem;"></sl-spinner>
                <div class="loading-console">
                  <span style="color: #64748b;">$ logs > </span> ${this.activeLogMsg}
                </div>
              </div>
            ` : ''}

            <div class="monitor-content">
              <!-- Error Display -->
              ${this.errorMessage ? html`
                <div style="text-align: center; color: #f87171; padding: 2rem;">
                  <span style="font-size: 3rem;">⚠️</span>
                  <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; margin-top: 10px; margin-bottom: 6px;">
                    Cinematography Error
                  </div>
                  <div style="font-size: 0.85rem; color: #fca5a5; max-width: 400px; margin: 0 auto; line-height: 1.4;">
                    ${this.errorMessage}
                  </div>
                </div>
              ` : ''}

              <!-- Idle State -->
              ${!this.isLoading && !this.generationResult && !this.errorMessage ? html`
                <div class="monitor-placeholder">
                  <div class="monitor-placeholder-icon">🎥</div>
                  <div class="monitor-placeholder-title">Monitor Screen Offline</div>
                  <div class="monitor-placeholder-sub">
                    Select your custom lens properties, choose a presets panel, and click generate to visualize your masterpiece prompt.
                  </div>
                </div>
              ` : ''}

              <!-- Results Dashboard Rendered -->
              ${!this.isLoading && this.generationResult ? html`
                <div class="result-container">
                  
                  <!-- Main prompt card -->
                  <div class="result-section" style="border-color: rgba(255, 199, 60, 0.2); background: rgba(255, 199, 60, 0.02);">
                    <div class="result-header">
                      <span>Generated Image Prompt</span>
                      <sl-copy-button value=${this.generationResult.finalPrompt}></sl-copy-button>
                    </div>
                    <p class="prompt-text">${this.generationResult.finalPrompt}</p>
                  </div>

                  <!-- Director's notebook -->
                  <div class="result-section">
                    <div class="result-header">🎬 Director's Notebook</div>
                    <p class="notebook-text">${this.generationResult.directorNotes}</p>
                  </div>

                  <!-- Color Palette details -->
                  <div class="result-section">
                    <div class="result-header">🎨 Color Grading Palette</div>
                    <div class="palette-list">
                      ${(this.generationResult.suggestedColors || []).map(color => html`
                        <div class="color-circle">
                          <span style="width: 8px; height: 8px; border-radius: 50%; display: inline-block; background-color: #ffc73c; margin-right: 6px;"></span>
                          ${color}
                        </div>
                      `)}
                    </div>
                  </div>

                  <!-- Technical Settings metadata -->
                  <div class="result-section">
                    <div class="result-header">⚙️ Technical Grade Recommendation</div>
                    <div class="tech-grid">
                      <span class="tech-label">Suggested Shutter:</span>
                      <span class="tech-value">180° Shutter Angle (1/48s for 24fps)</span>
                      
                      <span class="tech-label">Camera Movement:</span>
                      <span class="tech-value">${this.generationResult.technicalSettings || 'Slow atmospheric tracking pan'}</span>
                    </div>
                  </div>

                </div>
              ` : ''}
            </div>
          </div>

        </div>

      </div>

      <!-- Settings dialog popup modal for API Keys updates -->
      <sl-dialog 
        label="⚙️ Cinema Project Configuration" 
        ?open=${this.isApiKeyDialogOpen} 
        @sl-request-close=${this.closeApiKeyDialog}>
        
        <form @submit=${this.saveConfig}>
          <div class="form-group">
            <div style="font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-family: 'Space Grotesk', sans-serif;">
              Google Gemini API Key
            </div>
            <sl-input 
              type="password" 
              placeholder="Paste your AIzaSy... API key here" 
              password-toggle
              .value=${this.apiKeyInput}
              @input=${(e) => this.apiKeyInput = e.target.value}>
            </sl-input>
            <div style="font-size: 0.72rem; color: #64748b; margin-top: 6px; line-height: 1.3;">
              Your key is saved directly to your local config.json file and never shared.
            </div>
          </div>

          <div class="form-group" style="margin-top: 1.2rem;">
            <div style="font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; font-family: 'Space Grotesk', sans-serif;">
              Gemini Model Version
            </div>
            <sl-input 
              placeholder="gemini-1.5-flash" 
              .value=${this.modelInput}
              @input=${(e) => this.modelInput = e.target.value}>
            </sl-input>
          </div>

          <div class="settings-footer">
            <sl-button variant="neutral" outline @click=${this.closeApiKeyDialog}>Cancel</sl-button>
            <sl-button variant="primary" type="submit">Save Changes</sl-button>
          </div>
        </form>
      </sl-dialog>
    `;
  }
}

customElements.define('cine-prompter', CinePrompter);
export { CinePrompter };
