from google.cloud import firestore
import pandas as pd


def extract():
    db = firestore.Client()
    sentiments_collection = db.collection('sentiments')
    offline_sentiments = sentiments_collection.where(u'isOnline', u'==', False).stream()
    websites_collection = db.collection('websites')
    websites = websites_collection.stream()

    docs = []
    for website in websites:
        docs.append(website.to_dict())
    websites_names = list(set(map(lambda x: x["name"], docs)))

    docs = []
    for offline_sentiment in offline_sentiments:
        docs.append(offline_sentiment.to_dict())
        
    df = pd.DataFrame.from_dict(docs)

    return {"df": df, "websites": websites_names}