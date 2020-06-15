from .extraction import extract
from .loading import load
from .transformation import transform


def run(config):
    data = extract(config.GOOGLE_CREDENTIALS_POLITICIANS)
    sentiments_dict = transform(data["df"], data["websites"])
    load(sentiments_dict, data["websites"])