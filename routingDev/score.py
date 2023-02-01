import osmnx as os

class score():
    def score(self, pref, key, val, node, routes, walkMap):
        if key in walkMap.nodes[node]:
            if walkMap.nodes[node][key] == val:
                routes[-1][1] += (pref * 1)
            else:
                routes[-1][1] += (pref * (-1))

