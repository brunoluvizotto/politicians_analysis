import os
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

from .percentages import sort_percentages


def save_sentiments_histogram(
        sentiments_dict,
        websites,
        keywords,
        sentiment,
        filename):
    module_path = os.path.dirname(os.path.abspath(__file__))

    for keyword in keywords:
        dfs = [sentiments_dict[sentiment][keyword]["dfs"]
               [website]["sentimentScore"] for website in websites]
        plt.figure()
        plt.hist(dfs, density=True, label=websites)
        plt.title(
            f"{sentiment} sentiments of {keyword}'s headlines normalized histogram")
        plt.legend(prop={'size': 10})
        plt.xticks(rotation=30)
        plt.savefig(
            f"{module_path}/../../../output/{keyword}_{filename}",
            bbox_inches="tight")
        plt.close()


def save_percentages_plot(sentiments_dict, websites, keywords, filename):
    module_path = os.path.dirname(os.path.abspath(__file__))
    N = len(websites)

    for keyword in keywords:
        negative_percentages = list(
            map(lambda x: sentiments_dict["negative"]["percentages"][x][keyword], websites))
        positive_percentages = list(
            map(lambda x: sentiments_dict["positive"]["percentages"][x][keyword], websites))
        neutral_percentages = list(
            map(lambda x: sentiments_dict["neutral"]["percentages"][x][keyword], websites))
        websites, negative_percentages, neutral_percentages, positive_percentages = sort_percentages(
            websites, negative_percentages, neutral_percentages, positive_percentages)
        ind = np.arange(N)
        width = 0.35
        plt.figure()
        p1 = plt.bar(ind, negative_percentages, width)
        p2 = plt.bar(
            ind,
            neutral_percentages,
            width,
            bottom=negative_percentages)
        p3 = plt.bar(
            ind,
            positive_percentages,
            width,
            bottom=[
                sum(x) for x in zip(
                    negative_percentages,
                    neutral_percentages)])
        plt.ylabel("Percentages")
        plt.title(f"Percentage of {keyword}'s sentiment classification")
        plt.xticks(ind, websites)
        plt.legend((p1[0], p2[0], p3[0]), ("Negative", "Neutral", "Positive"))
        plt.xticks(rotation=30)
        plt.savefig(
            f"{module_path}/../../../output/{keyword}_{filename}",
            bbox_inches="tight")
        plt.close()


def save_sentiments_boxplot_by_website(sentiments_dict, keywords, filename):
    module_path = os.path.dirname(os.path.abspath(__file__))

    for keyword in keywords:
        df_sentiments = sentiments_dict["all"][keyword]["dfs"]["all"]
        plt.figure()
        sns.boxplot(x="website", y="sentimentScore", data=df_sentiments)
        plt.title(f"Sentiments of {keyword}'s headlines boxplot by Website")
        plt.xticks(rotation=30)
        plt.savefig(
            f"{module_path}/../../../output/{keyword}_{filename}",
            bbox_inches="tight")
        plt.close()
