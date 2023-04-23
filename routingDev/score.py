import osmnx as os

conversionDict = {"lit": 5, "paved": 4, "shade": 2, "PoI": 3}

class score():
    def score(self, pref, key, val, node, routes, walkMap, points=1):
        if key in walkMap.nodes[node]:
            if walkMap.nodes[node][key] == val:
                routes[-1][1] += (pref * points)
                routes[-1][conversionDict[key]] += (pref * points)
            else:
                routes[-1][1] += (pref * (-1*points))
                routes[-1][conversionDict[key]] += (pref * points)

