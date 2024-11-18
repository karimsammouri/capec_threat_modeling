# Imports
import csv
import os
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions

# Load OpenAI API key as environment variable
load_dotenv()

# Initialize ChromaDB client
chroma_client = chromadb.PersistentClient(path="chroma")

# Initialize OpenAI embedding function
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-3-large"
)

# Create or retrieve collection
collection = chroma_client.get_or_create_collection(
    name="capec",
    metadata={"hnsw:space": "cosine"},
    embedding_function=openai_ef
)

# Load data from CSV files in the capec directory (contains dataset of CAPEC entries)
directory = "capec"
documents = []
ids = []

# Iterate through CSV files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".csv"):
        file_path = os.path.join(directory, filename)
        with open(file_path, "r", encoding="ISO-8859-1") as file:
            csv_reader = csv.DictReader(file)
            row = next(csv_reader)
            documents.append(str(row))
            ids.append(row["ID"])

# Add data to the collection
collection.add(
    documents=documents,
    ids=ids
)