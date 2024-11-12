import chromadb # type: ignore
import chromadb.utils.embedding_functions as embedding_functions # type: ignore
from dotenv import load_dotenv # type: ignore
import csv
import os

chroma_client = chromadb.PersistentClient(path="chroma")

load_dotenv()

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=os.getenv("OPENAI_API_KEY"),
                model_name="text-embedding-3-large"
            )

collection = chroma_client.get_or_create_collection(
    name="capec",
    metadata={"hnsw:space": "cosine"},
    embedding_function=openai_ef
)

# directory = "capec"
# documents = []
# ids = []

# for filename in os.listdir(directory):
#     if filename.endswith(".csv"):
#         file_path = os.path.join(directory, filename)
#         with open(file_path, 'r', encoding='ISO-8859-1') as file:
#             csv_reader = csv.DictReader(file)
#             for row in csv_reader:
#                 documents.append(str(row))
#                 ids.append(row['ID'])

# collection.add(
#     documents = documents,
#     ids = ids
# )

results = collection.query(
    query_texts=["relay"],
    n_results=3
)

for i in range(3):
    print(results['distances'][0][i])
    print(results["documents"][0][i])