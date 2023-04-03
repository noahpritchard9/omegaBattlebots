import osmnx as os

class score():
    def score(self, pref, key, val, node, routes, walkMap, points=1):
        if key in walkMap.nodes[node]:
            if walkMap.nodes[node][key] == val:
                routes[-1][1] += (pref * points)
            else:
                routes[-1][1] += (pref * (-1*points))

