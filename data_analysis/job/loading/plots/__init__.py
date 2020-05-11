import os
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns


def save_sentiments_histogram(sentiments_dict, websites, sentiment, filename):
    module_path = os.path.dirname(os.path.abspath(__file__))
    dfs = [sentiments_dict[sentiment]["dfs"][website]["sentimentScore"] for website in websites]
    plt.figure()
    plt.hist(dfs, density=True, label=websites)
    plt.title(f"{sentiment} sentiments of Bolsonaro's headlines normalized histogram")
    plt.legend(prop={'size': 10})
    plt.savefig(f"{module_path}/../../../output/{filename}")
    plt.close()


def save_percentages_plot(sentiments_dict, websites, filename):
    module_path = os.path.dirname(os.path.abspath(__file__))
    N = len(websites)
    bolsonaro_negative_percentages = list(map(lambda x: sentiments_dict["negative"]["percentages"][x], websites))
    bolsonaro_positive_percentages = list(map(lambda x: sentiments_dict["positive"]["percentages"][x], websites))
    bolsonaro_neutral_percentages = list(map(lambda x: sentiments_dict["neutral"]["percentages"][x], websites))
    ind = np.arange(N)
    width = 0.35
    plt.figure()
    p1 = plt.bar(ind, bolsonaro_negative_percentages, width)
    p2 = plt.bar(ind, bolsonaro_neutral_percentages, width, bottom=bolsonaro_negative_percentages)
    p3 = plt.bar(ind, bolsonaro_positive_percentages, width, bottom=[sum(x) for x in zip(bolsonaro_negative_percentages, bolsonaro_neutral_percentages)])
    plt.ylabel("Percentages")
    plt.title("Percentage of sentiment classification")
    plt.xticks(ind, websites)
    plt.legend((p1[0], p2[0], p3[0]), ("Negative", "Neutral", "Positive"))
    plt.savefig(f"{module_path}/../../../output/{filename}")
    plt.close()


def save_sentiments_boxplot_by_website(sentiments_dict, filename):
    module_path = os.path.dirname(os.path.abspath(__file__))
    df_bolsonaro_sentiments = sentiments_dict["all"]["dfs"]["all"]
    plt.figure()
    sns.boxplot(x="website", y="sentimentScore", data=df_bolsonaro_sentiments)
    plt.title("Sentiments of Bolsonaro's headlines boxplot by Website")
    plt.savefig(f"{module_path}/../../../output/{filename}")
    plt.close()