import osmium 
import osmnx as ox

### THE FOLLOWING GETS OUR TAGS/ATTRIBUTES ONTO OUR WALKING MAP ###

class UpdateMap(osmium.SimpleHandler):
    
    def __init__(self, footwaysSimplified):
        super(UpdateMap, self).__init__()
        self.ways = []
        self.footwaysSimplified = footwaysSimplified 
    
    def way(self, w):
        for n in w.nodes:
            if n.ref in self.footwaysSimplified:
                for tag in w.tags:
                    self.footwaysSimplified.nodes[n.ref][tag.k] = tag.v
                    
        # for i in range(len(ways)):
        #     if ways[i][0] == w.id:
        #         for n in w.nodes:
        #             if n.ref in footwaysSimplified:
        #                 for tag in r.tags:
        #                     footwaysSimplified.nodes[n.ref][tag.k] = tag.v
            
    def node(self, n):
        if n.id in self.footwaysSimplified:
            for tag in n.tags:
                self.footwaysSimplified.nodes[n.id][tag.k] = tag.v
        if "tourism" in n.tags:
            node = ox.distance.nearest_nodes(self.footwaysSimplified, n.location.lon, n.location.lat)
            self.footwaysSimplified.nodes[node]['PoI'] = 'yes'
    
    def relation(self, r):
        for x in r.members:
            if x.type == 'n' and x.ref in self.footwaysSimplified:
                for tag in r.tags:
                    self.footwaysSimplified.nodes[x.ref][tag.k] = tag.v
            




# Adds points of interest
class UpdateMap2(osmium.SimpleHandler):
    
    def __init__(self, footwaysSimplified, dc):
        super(UpdateMap2, self).__init__()
        self.footwaysSimplified = footwaysSimplified
        self.dc = dc
    
    def way(self, w):
        node = ox.distance.nearest_nodes(self.footwaysSimplified, self.dc.nodes[w.nodes[0]]['y'], self.dc.nodes[w.nodes[0]]['x'])
        self.footwaysSimplified.nodes[node]['PoI'] = 'yes'
        
                    
    
                            