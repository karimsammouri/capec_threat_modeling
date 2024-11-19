# LLM-Based Threat Modeling Agent with CAPEC Retrieval

## Description
The **LLM-Based Threat Modeling Agent with CAPEC Retrieval** is an interactive tool designed to generate a threat model for a system based on its textual description. It uses a combination of advanced technologies to break down a system into its core components, identify relevant threats for each component, and map each threat to the [CAPEC](https://capec.mitre.org) knowledge base for actionable insights. The final threat model is presented as an interactive tree visualization.

## Key Features
- **System Decomposition:** Utilizes an LLM (GPT-4o) to decompose a structured/unstructured system description into core components using Data-Flow Diagram (DFD) elements: (1) external entities, (2) processes, (3) data stores, and (4) data flows.
- **Threat Identification:** Utilizes an LLM (GPT-4o) to identify relevant threats for each system component.
- **CAPEC Retrieval:** Utilizes a vector database (Chroma) containing the [CAPEC](https://capec.mitre.org) dataset to retrieve relevant attack patterns for each identified threat using semantic search.

## Technologies Used
- **Backend:** Flask (Python)
- **LLM API:** OpenAI GPT-4o
- **Vector Database:** Chroma
- **Frontend:** HTML, CSS, JavaScript, and jsTree (for interactive visualization)

## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contributions](#Contributions)
4. [License](#License)
5. [Acknowledgements](#Acknowledgements)
6. [Contact](#Contact)

## Installation

### Prerequisites
1. **Install Python 3.12 or later** (if not already installed):
    > **Note:** This project is designed to work best with *Python 3.12*. While earlier versions of Python may work, they are not officially supported and could result in *unexpected behavior or performance issues*.
    - **macOS:** Python 3 is often pre-installed. Verify the version:
        ```bash
        python3 --version
        ```
        If Python 3.12 or later is not installed:
        - Download Python from the [official Python website](https://www.python.org/downloads/).
        - Follow the installation instructions for your OS.
    - **Linux:** Most distributions have Python 3 pre-installed. Verify with:
        ```bash
        python3 --version
        ```
        To install the latest version:
        ```bash
        sudo apt update
        sudo apt install python3 python3-venv python3-pip
        ```
    - **Windows:**
        - Download the installer from the [official Python website](https://www.python.org/downloads/).
        - During installation, make sure to check the box *"Add Python to PATH"*.
2. **Install Git** (if not already installed):
    - Follow the instructions for your operating system at the [official Git website](https://git-scm.com/).

### Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/karimsammouri/capec_threat_modeling.git
    ```
2. Navigate to the project directory:
    ```bash
    cd capec_threat_modeling
    ```
3. Create and activate a virtual environment (optional but recommended):
    - Create the virtual environment (named `venv`):
        ```bash
        python3 -m venv venv
        ```
        > **Note:** Use `python` instead of `python3` if it points to Python 3 on your system.
    - Activate the virtual environment:
        - On macOS/Linux:
            ```bash
            source venv/bin/activate
            ```
        - On Windows:
            ```bash
            .\venv\Scripts\activate
            ```
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage
1. **Load CAPEC into the Chroma vector database:** Run the `chroma.py` script to load the CAPEC data:
    ```bash
    python3 chroma.py
    ```
2. **Launch the Application:** Run the Flask app:
    ```bash
    python3 app.py
    ```
3. **Interact with the Application:**
    - Open your browser and navigate to http://127.0.0.1:5000/.
    - Provide a textual description of your system.
    - Generate and explore the threat model.

## Contributions
For contributions, please fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Acknowledgements
- **MITRE:** For developing and maintaining the [CAPEC](https://capec.mitre.org/) knowledge base.
- **OpenAI:** For providing the GPT-4o model.
- **Chroma:** An open-source vector database that enables semantic search.
- **jsTree:** An open-source JavaScript library (jQuery plugin) for creating interactive tree structures.

## Contact
Developed by [Karim Sammouri](https://github.com/karimsammouri). Feel free to reach out for any questions or suggestions at karimsammouri@gmail.com.