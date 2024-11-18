# LLM-Based Threat Modeling Agent with CAPEC Retrieval

## Description
The **LLM-Based Threat Modeling Agent with CAPEC Retrieval** is an interactive tool designed to generate a threat model for a system based on its textual description. It uses a combination of advanced technologies to break down the system into core components, identify relevant threats for each component, and map them to the CAPEC database for actionable insights. The final threat model is presented as an interactive tree visualization.

## Key Features
– **System Analysis**: Decomposes unstructured/structured system descriptions into core components organized around data flow diagram (DFD) elements for threat modeling: external entities, processes, data stores, and data flows.
– **Threat Identification**:  Utilizes a LLM (GPT-4o) to identify threats for each system component.
– **CAPEC Integration**: Retrieves relevant CAPEC entries using semantic search with Chroma vector database.
