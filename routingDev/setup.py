import osmnx as ox
from osmiumUpdates import UpdateMap
import pandas as pd
import csv
import networkx as nx
from buildingsCalc import buildings


class setup():
    #runs all necessary setup functions
    def completeSetup(self, data, file):
        self.getBuildings()
        self.footwaysSimplified = self.createFootwaysSimplified(file)
        self.addTags(data, self.footwaysSimplified)
        return self.footwaysSimplified


    #creates networkx graph for the osm file input
    def createFootwaysSimplified(self, file):
        return ox.graph_from_xml(file)

    #adds tags to the file from our data file
    def addTags(self, data, map):
        UpdateMap(map).apply_file(data)
        
        #now we add shade tags:
        for node in map.nodes:
            latitude = node['y']
            longitude = node['x']
            b = buildings(latitude, longitude)
            shade = b.shade(latitude, longitude)
            node[node.id]['shade'] = shade




    #retrieve walkways for routing
    def getWalkways(self):
        map = ox.graph_from_place('Washington, D.C., USA', network_type="walk")
        ox.save_graph_xml(map, filepath='walkways')

        
    


        



