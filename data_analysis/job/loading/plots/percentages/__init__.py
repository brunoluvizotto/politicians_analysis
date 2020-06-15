def sort_percentages(websites, negatives, neutrals, positives):
    websites = [x for _,x in sorted(zip(negatives, websites))]
    positives = [x for _,x in sorted(zip(negatives, positives))]
    neutrals = [x for _,x in sorted(zip(negatives, neutrals))]
    negatives = sorted(negatives)
    return websites, negatives, neutrals, positives