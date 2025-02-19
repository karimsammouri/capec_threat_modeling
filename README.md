# LLM-Based Threat Modeling Agent with CAPEC Retrieval

## User Interface
![Screenshot of Threat Modeling Tool](https://github.com/karimsammouri/capec_threat_modeling/blob/master/screenshot.png)

## Description
The **LLM-Based Threat Modeling Agent with CAPEC Retrieval** is an interactive tool designed to generate a threat model based on a textual system description. It uses a combination of advanced technologies to break down a system into its core components, identify relevant threats for each component, and map each threat to the [CAPEC](https://capec.mitre.org) knowledge base for actionable insights. The final threat model is presented as an interactive tree visualization.

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
1. **Obtain an OpenAI API key:**
    - Obtain an API key by signing up at [OpenAI](https://platform.openai.com/docs/overview) and creating a new secret key.
    - This key is required for the application to interact with OpenAI's GPT-4o model. You will configure the key below.
    > **Note:** You will need to have funds in your OpenAI account. Without adequate funds, the tool will not be able to make calls to OpenAI's GPT-4o model. Check your account settings for more details.
2. **Install Python 3.12 or later** (if not already installed):
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
3. **Install Git** (if not already installed):
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
5. Configure the OpenAI API key:
    - Create a `.env` file in the root directory of the project:
        ```bash
        touch .env
        ```
    - Add the following line (your API key) to the `.env` file:
        ```bash
        OPENAI_API_KEY=your_openai_api_key
        ```
        > **Note:** Replace `your_openai_api_key` with your actual OpenAI API key and don't forget to save the file!
    - The application will automatically read the key from the `.env` file when you run it.

## Usage
1. **Load CAPEC into the Chroma vector database:**
    - Run the `chroma.py` script to load the CAPEC data:
        ```bash
        python3 chroma.py
        ```
    > **Note:** You only need to run the `chroma.py` script once. It creates a local Chroma vector database with the CAPEC dataset, which can be reused across sessions.
2. **Launch the Application:**
    - Run the Flask app:
        ```bash
        python3 app.py
        ```
3. **Interact with the Application:**
    - Open your browser and navigate to http://127.0.0.1:5000/.
    - Provide a textual description of your system.
    - Generate and explore the threat model.

## Contributions
For contributions, please fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Acknowledgements
- **MITRE:** For developing and maintaining the publicly available [CAPEC](https://capec.mitre.org/) knowledge base.
- **OpenAI:** For providing the GPT-4o model.
- **Chroma:** An open-source vector database that enables semantic search.
- **jsTree:** An open-source JavaScript library (jQuery plugin) for creating interactive tree structures.

## Contact
Developed by [Karim Sammouri](https://github.com/karimsammouri). Feel free to reach out for any questions or suggestions at karimsammouri@gmail.com.
