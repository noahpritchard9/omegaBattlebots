import osmium

nodes = set()

#for easy manipulation of the code
key = 'highway' 

val = 'footway'


class FootwayCounterHandler(osmium.SimpleHandler):
    def __init__(self):
        super(FootwayCounterHandler, self).__init__()
        self.necessary_nodes = []

    def way(self, w):
        if w.tags.get(key) == val:
            for x in w.nodes:
                if x.ref not in self.necessary_nodes:
                    self.necessary_nodes.append(x.ref)

    def node(self, n):
        if n.tags.get(key) == val:
            if n.ref not in self.necessary_nodes:
                self.necessary_nodes.append(n.ref)

class NodesCollect(osmium.SimpleHandler):
    def way(self, w):
        if w.tags.get(key) == val:
            nodes.update([n.ref for n in w.nodes])

class HighwayFilter(osmium.SimpleHandler):
    def way(self, w):
        if w.tags.get(key) == val:
            writer.add_way(w)
    def node(self, n):
        if n.id in nodes:
            writer.add_node(n)

if __name__ == '__main__':

    #h = FootwayCounterHandler()

    #h.apply_file("dc.osm")

    #print("Array length: ", len(h.necessary_nodes))

    #gather necessary nodes to remove
    NodesCollect().apply_file("dc.osm")

    #name the output file
    writer = osmium.SimpleWriter("footways.osm")


    HighwayFilter().apply_file("dc.osm")