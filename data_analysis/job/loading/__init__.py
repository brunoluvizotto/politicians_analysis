import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import re

from .wordclouds import save_wordcloud
from .plots import save_percentages_plot, save_sentiments_boxplot_by_website, save_sentiments_histogram


def load(sentiments_dict, websites):
    save_sentiments_histogram(sentiments_dict, websites, "all", "bolsonaro_all_by_website_hist.png")
    save_percentages_plot(sentiments_dict, websites, "bolsonaro_percentages_by_website_hist.png")
    save_sentiments_boxplot_by_website(sentiments_dict, "bolsonaro_sentiments_by_website_boxplot.png")

    all_websites = ["all"] + websites
    for website in all_websites:
        for sentiment in ["all", "positive", "negative", "neutral"]:
            save_wordcloud(sentiments_dict[sentiment]["wordclouds"][website], f"wordcloud_{sentiment}_{website.lower()}.png", 25)
            save_wordcloud(sentiments_dict[sentiment]["wordclouds_english"][website], f"wordcloud_{sentiment}_{website.lower()}_english.png", 25)
