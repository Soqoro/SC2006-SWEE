import csv
import weaviate

from dotenv import load_dotenv

load_dotenv()

WEAVIATE_CLUSTER_URL = "https://coverquest-bookrec-rf5qpjd7.weaviate.network"
WEAVIATE_API_KEY = "QeUDg3NZutfGaYIGW6pmO0X0zacP1KjKSlqm"
OPENAI_API_KEY = "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"

client = weaviate.Client(
    url=WEAVIATE_CLUSTER_URL,
    auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY), 
    additional_headers={"X-OpenAI-Api-Key": OPENAI_API_KEY})

client.schema.delete_class("Book")

class_obj = {
    "class": "Book",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "text2vec-openai": {
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
        }
    }
}

client.schema.create_class(class_obj)

f = open("./data-pipeline/7k-books-kaggle.csv", "r", encoding="utf-8")
current_book = None
try:
  with client.batch as batch:  # Initialize a batch process
    batch.batch_size = 100
    reader = csv.reader(f)
    # Iterate through each row of data
    for book in reader:
      current_book = book
      # 0 - isbn13
      # 1 - isbn10
      # 2 - title
      # 3 - subtitle
      # 4 - authors
      # 5 - categories
      # 6 - thumbnail
      # 7 - description
      # 8 - published_year
      # 9 - average_rating
      # 10 - num_pages
      # 11 - ratings_count

      properties = {
          "isbn13": book[0],
          "isbn10": book[1],
          "title": book[2],
          "subtitle": book[3],
          "authors": book[4],
          "categories": book[5],
          "thumbnail": book[6],
          "description": book[7],
          "published_year": book[8],
          "average_rating": book[9],
          "num_pages": book[10],
          "ratings_count": book[11],
      }

      batch.add_data_object(data_object=properties, class_name="Book")
      # print(f"{book[2]}: {uuid}", end='\n')
except Exception as e:
  print(f"something happened {e}. Failure at {current_book}")

f.close()
