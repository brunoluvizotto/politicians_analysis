def set_sentiment_label(df):
    df.loc[df["sentimentScore"] >= 0.25, "sentimentLabel"] = "positive"
    df.loc[df["sentimentScore"] <= -0.25, "sentimentLabel"] = "negative"
    df.loc[(df["sentimentScore"] > -0.25) &
           (df["sentimentScore"] < 0.25), "sentimentLabel"] = "neutral"
    return df


def get_sentiments_for_keyword(df, keyword, websites, sentiment="all"):
    ret_dict = {"all": df[(df["keywords"].apply(lambda x: keyword in x))]}
    for website in websites:
        if sentiment == "all":
            df_website = df[(df["keywords"].apply(lambda x: keyword in x)) & (
                df["website"] == website)]
        else:
            df_website = df[(df["keywords"].apply(lambda x: keyword in x)) & (
                df["website"] == website) & (df["sentimentLabel"] == sentiment)]
        ret_dict[website] = df_website
    return ret_dict