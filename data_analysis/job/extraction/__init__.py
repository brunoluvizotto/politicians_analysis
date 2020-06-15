from google.cloud import firestore
import pandas as pd
import logging


def extract(google_credentials=None):
    logging.info("Extracting...")
    db = firestore.Client(
        credentials=google_credentials) if google_credentials else firestore.Client()
    sentiments_collection = db.collection('sentiments')
    sentiments = sentiments_collection.stream()
    websites_collection = db.collection('websites')
    websites = websites_collection.stream()

    docs = []
    for website in websites:
        docs.append(website.to_dict())
    websites_names = list(set(map(lambda x: x["name"], docs)))

    docs = []
    for sentiment in sentiments:
        docs.append(sentiment.to_dict())

    df = pd.DataFrame.from_dict(docs)

    return {"df": df, "websites": websites_names}
