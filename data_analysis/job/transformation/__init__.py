import functools
import re
import logging

from .wordclouds import get_wordclouds, pt_stop_words, en_stop_words, punctuation_marks
from .dates import set_brazilian_timezone, set_initial_analysis_date
from .sentiments import set_sentiment_label, get_sentiments_for_keyword
from .percentages import add_percentages


def transform(df, websites):
    logging.info("Transforming...")
    df = df.copy()
    df = set_initial_analysis_date(df, "2020-05-06 00:00:00")
    df = set_brazilian_timezone(df)
    df = set_sentiment_label(df)

    sentiments = ["all", "positive", "negative", "neutral"]
    keywords = ["Bolsonaro", "Dória", "Weintraub", "Salles"]

    sentiments_dict = {}
    for sentiment in sentiments:
        keywords_dict = {}
        for keyword in keywords:
            sentiments_dfs = get_sentiments_for_keyword(df, keyword, websites, sentiment)
            headline_wordclouds = get_wordclouds(sentiments_dfs, "headline", keyword, punctuation_marks, pt_stop_words)
            headline_wordclouds_english = get_wordclouds(sentiments_dfs, "headlineEnglish", keyword, punctuation_marks, en_stop_words)
            keywords_dict[keyword] = {
                "dfs": sentiments_dfs,
                "wordclouds": headline_wordclouds,
                "wordclouds_english": headline_wordclouds_english
            }
        sentiments_dict[sentiment] = keywords_dict
        
    sentiments_dict = add_percentages(sentiments_dict, websites, keywords)

    return sentiments_dict
