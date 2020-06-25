import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import re
import logging

from .wordclouds import save_wordcloud
from .plots import save_percentages_plot, save_sentiments_boxplot_by_website, save_sentiments_histogram


def load(sentiments_dict, websites):
    logging.info("Loading...")
    keywords = ["Bolsonaro", "Dória", "Weintraub", "Salles"]
    save_sentiments_histogram(sentiments_dict, websites, keywords, "all", "all_by_website_hist.png")
    save_percentages_plot(sentiments_dict, websites, keywords, "percentages_by_website_hist.png")
    save_sentiments_boxplot_by_website(sentiments_dict, keywords, "sentiments_by_website_boxplot.png")

    all_websites = ["all"] + websites
    for website in all_websites:
        for sentiment in ["all", "positive", "negative", "neutral"]:
            for keyword in keywords:
                save_wordcloud(sentiments_dict[sentiment][keyword]["wordclouds"][website],
                               f"{keyword}_wordcloud_{sentiment}_{website.lower()}.png", 40)
                save_wordcloud(sentiments_dict[sentiment][keyword]["wordclouds_english"][website],
                               f"{keyword}_wordcloud_{sentiment}_{website.lower()}_english.png", 40)
