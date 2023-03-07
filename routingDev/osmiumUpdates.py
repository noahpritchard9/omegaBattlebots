import osmium 

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
    
    def relation(self, r):
        for x in r.members:
            if x.type == 'n' and x.ref in self.footwaysSimplified:
                for tag in r.tags:
                    self.footwaysSimplified.nodes[x.ref][tag.k] = tag.v

    
                            