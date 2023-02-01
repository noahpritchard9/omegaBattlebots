import osmnx as ox
from osmiumUpdates import UpdateMap

class setup():
    #runs all necessary setup functions
    def completeSetup(self, data, file):
        self.footwaysSimplified = self.createFootwaysSimplified(file)
        self.addTags(data, self.footwaysSimplified)
        return self.footwaysSimplified


    #creates networkx graph for the osm file input
    def createFootwaysSimplified(self, file):
        return ox.graph_from_xml(file)

    #adds tags to the file from our data file
    def addTags(self, data, map):
        UpdateMap(map).apply_file(data)


        



