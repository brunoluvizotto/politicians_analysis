import functools
import re

from .wordclouds import get_wordclouds, pt_stop_words, en_stop_words, punctuation_marks
from .dates import set_brazilian_timezone, set_initial_analysis_date
from .sentiments import set_sentiment_label, get_sentiments_for_keyword


def transform(df, websites):
    df = df.copy()
    df = set_initial_analysis_date(df, "2020-05-06 00:00:00")
    df = set_brazilian_timezone(df)
    df = set_sentiment_label(df)

    sentiments = ["all", "positive", "negative", "neutral"]

    sentiments_dict = {}
    for sentiment in sentiments:
        bolsonaro_sentiments_dfs = get_sentiments_for_keyword(df, "Bolsonaro", websites, sentiment)
        bolsonaro_headline_wordclouds = get_wordclouds(bolsonaro_sentiments_dfs, "headline", "Bolsonaro", punctuation_marks, pt_stop_words)
        bolsonaro_headline_wordclouds_english = get_wordclouds(bolsonaro_sentiments_dfs, "headlineEnglish", "Bolsonaro", punctuation_marks, en_stop_words)
        sentiments_dict[sentiment] = {
            "dfs": bolsonaro_sentiments_dfs,
            "wordclouds": bolsonaro_headline_wordclouds,
            "wordclouds_english": bolsonaro_headline_wordclouds_english
        }

    for sentiment, values in sentiments_dict.items():
        percentages_websites = {}
        for website in websites:
            percentage = values["dfs"][website]["headline"].count() / sentiments_dict["all"]["dfs"][website]["headline"].count()
            percentages_websites[website] = percentage
        sentiments_dict[sentiment]["percentages"] = percentages_websites

    return sentiments_dict
