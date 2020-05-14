import re
import functools

pt_stop_words = ["de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "é", "com", "não", "uma", "os", "no",
                 "se", "na", "por", "mais", "as", "dos", "como", "mas", "foi", "ao", "ele", "das", "tem", "à", "seu",
                 "sua", "ou", "ser", "quando", "muito", "há", "nos", "já", "está", "eu", "também", "só", "pelo", "pela",
                 "até", "isso", "ela", "entre", "era", "depois", "sem", "mesmo", "aos", "ter", "seus", "quem", "nas",
                 "me", "esse", "eles", "estão", "você", "tinha", "foram", "essa", "num", "nem", "suas", "meu", "às",
                 "minha", "têm", "numa", "pelos", "elas", "havia", "seja", "qual", "será", "nós", "tenho", "lhe",
                 "deles", "essas", "esses", "pelas", "este", "fosse", "dele", "tu", "te", "vocês", "vos", "lhes",
                 "meus", "minhas", "teu", "tua", "teus", "tuas", "nosso", "nossa", "nossos", "nossas", "dela", "delas",
                 "esta", "estes", "estas", "aquele", "aquela", "aqueles", "aquelas", "isto", "aquilo", "estou", "está",
                 "estamos", "estão", "estive", "esteve", "estivemos", "estiveram", "estava", "estávamos", "estavam",
                 "estivera", "estivéramos", "esteja", "estejamos", "estejam", "estivesse", "estivéssemos", "estivessem",
                 "estiver", "estivermos", "estiverem", "hei", "há", "havemos", "hão", "houve", "houvemos", "houveram",
                 "houvera", "houvéramos", "haja", "hajamos", "hajam", "houvesse", "houvéssemos", "houvessem", "houver",
                 "houvermos", "houverem", "houverei", "houverá", "houveremos", "houverão", "houveria", "houveríamos",
                 "houveriam", "sou", "somos", "são", "era", "éramos", "eram", "fui", "foi", "fomos", "foram", "fora",
                 "fôramos", "seja", "sejamos", "sejam", "fosse", "fôssemos", "fossem", "for", "formos", "forem", "serei",
                 "será", "seremos", "serão", "seria", "seríamos", "seriam", "tenho", "tem", "temos", "tém", "tinha",
                 "tínhamos", "tinham", "tive", "teve", "tivemos", "tiveram", "tivera", "tivéramos", "tenha", "tenhamos",
                 "tenham", "tivesse", "tivéssemos", "tivessem", "tiver", "tivermos", "tiverem", "terei", "terá", "teremos",
                 "terão", "teria", "teríamos", "teriam", "diz", "vai", "lugar", "Fala", "após", "fico", "ver", "outras",
                 "agora", "falar", "dar", "sobre", "dá", "novo"]
en_stop_words = ["a", "the", "an", "to", "in", "for", "of", "or", "by", "with", "is", "on", "that", "be", "he", "has", "was",
                 "say", "more", "gives", "s", "de", "from", "had", "have", "but", "not", "than", "doesnt", "when", "should",
                 "will", "new", "says", "whom", "goes", "did", "can", "it", "what", "would", "his"]
punctuation_marks = ",.;:'?!\"“”‘’"


def _remove_stop_words(text, stop_words):
    text_words = text.split()
    result_words = [word for word in text_words if word.lower()
                    not in stop_words]
    result = ' '.join(result_words)
    return result


def _remove_punctuation(text, punctuations):
    return re.sub(f"[{punctuations}]", "", text)


def _generate_wordcloud_from_df(df, keyword, column, punctuations, stop_words):
    if df.empty:
        return ''
    wordcloud_with_stop_words = functools.reduce(lambda a, b: a + ' ' + b, df[column].to_list(
    )).replace(keyword, "").replace(keyword.lower(), "").replace("Fake News", "FakeNews").replace("fake news", "FakeNews")
    wordcloud_no_punctuation = _remove_punctuation(
        wordcloud_with_stop_words, punctuations)
    wordcloud = _remove_stop_words(wordcloud_no_punctuation, stop_words)
    return wordcloud


def get_wordclouds(dict_dfs, df_column, keyword, punctuation_marks, stop_words):
    ret_dict = {}
    for key, value in dict_dfs.items():
        ret_dict[key] = _generate_wordcloud_from_df(
            value, keyword, df_column, punctuation_marks, stop_words)
    return ret_dict
