# LLM-Based Threat Modeling Agent with CAPEC Retrieval

## Description
The **LLM-Based Threat Modeling Agent with CAPEC Retrieval** is an interactive tool designed to generate a threat model for a system based on its textual description. It uses a combination of advanced technologies to break down the system into core components, identify relevant threats for each component, and map them to the CAPEC database for actionable insights. The final threat model is presented as an interactive tree visualization.

## Key Features
- **System Analysis**: Decomposes unstructured/structured system descriptions into core components (external entities, processes, data stores, data flows).
- **Threat Identification**: Utilizes LLM (GPT-4o) to identify threats for each system component.
- **CAPEC Integration**: Retrieves relevant CAPEC entries using semantic search with Chroma vector database.
- **Interactive Visualization**: Displays threats and CAPEC mappings in an interactive jsTree-based UI.

---

## Technologies Used
- **Backend**: Flask (Python)
- **LLM API**: OpenAI GPT-4o
- **Vector Database**: Chroma for CAPEC semantic retrieval
- **Frontend**: HTML, CSS, JavaScript, and jsTree for interactive visualization.

---

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [License](#license)
5. [Acknowledgements](#acknowledgements)

---

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/karimsammouri/capec_threat_modeling.git
2. Navigate to the project directory:
    ```bash
    cd capec_threat_modeling
3. Create and activate a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate # On Windows: .\venv\Scripts\activate
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt

## Usage
1. Load CAPEC Data into Chroma Vector Database: Run the chroma.py script to load the CAPEC data:
    ```bash
    python3 chroma.py
2. Launch the Application: Fun the Flask app:
    ```bash
    python3 app.py
3. Interact with the Application:
- Open your browser and navigate to https://127.0.0.1:5000/.
- Provide a textual description of your system.
- View the generated threat modle and explore the CAPEC entires in the interactive jsTree.