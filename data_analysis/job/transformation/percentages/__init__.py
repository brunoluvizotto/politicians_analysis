def add_percentages(sentiments_dict, websites, keywords):
    for sentiment, values in sentiments_dict.items():
        percentages_websites = {}
        for website in websites:
            percentages_keyword = {}
            for keyword in keywords:
                percentage = values[keyword]["dfs"][website]["headline"].count() / sentiments_dict["all"][keyword]["dfs"][website]["headline"].count()
                percentages_keyword[keyword] = percentage
            percentages_websites[website] = percentages_keyword
        sentiments_dict[sentiment]["percentages"] = percentages_websites

    return sentiments_dict