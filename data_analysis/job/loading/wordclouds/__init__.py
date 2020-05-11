import os
import re
import multidict
import matplotlib.pyplot as plt
import numpy as np
from wordcloud import WordCloud


def _getFrequencyDictForText(sentence, min_repetitions):
    fullTermsDict = multidict.MultiDict()
    tmpDict = {}

    # making dict for counting frequencies
    for text in sentence.split(" "):
        if re.match("a|the|an|the|to|in|for|of|or|by|with|is|on|that|be", text):
            continue
        val = tmpDict.get(text, 0)
        tmpDict[text.lower()] = val + 1
    for key in tmpDict:
        fullTermsDict.add(key, tmpDict[key])

    return {k: v for k, v in fullTermsDict.items() if v >= min_repetitions}


def save_wordcloud(text, filename, max_words, min_frequency=0):
    module_path = os.path.dirname(os.path.abspath(__file__))
    x, y = np.ogrid[:1200, :1200]
    mask = (x - 600) ** 2 + (y - 600) ** 2 > 520 ** 2
    mask = 255 * mask.astype(int)
    wc = WordCloud(background_color="white", max_words=max_words, mask=mask)
    text = _getFrequencyDictForText(text, min_frequency)
    wc.generate_from_frequencies(text)
    plt.figure()
    plt.imshow(wc, interpolation="bilinear")
    plt.axis("off")
    plt.savefig(f"{module_path}/../../../output/{filename}")
    plt.close()
