from .extraction import extract
from .loading import load
from .transformation import transform


def run():
    data = extract()
    sentiments_dict = transform(data["df"], data["websites"])
    load(sentiments_dict, data["websites"])