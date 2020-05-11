def set_brazilian_timezone(df):
    df.loc[:, "onlineStartDate"] = df["onlineStartDate"].dt.tz_convert(
        "America/Sao_Paulo")
    df.loc[:, "onlineEndDate"] = df["onlineEndDate"].dt.tz_convert(
        "America/Sao_Paulo")
    return df


def set_initial_analysis_date(df, isodate_str):
    df = df[(df['onlineStartDate'] >= isodate_str)]
    return df