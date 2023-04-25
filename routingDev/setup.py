import osmnx as ox
from osmiumUpdates import UpdateMap
import pandas as pd
import csv
import networkx as nx
from buildingsCalc import buildings
import sys
import timeit
import time
from tiffShade import tiffShade



class setup():
    #runs all necessary setup functions
    def completeSetup(self, data, file):
        self.footwaysSimplified = self.createFootwaysSimplified(file)
        self.dc = self.createFootwaysSimplified('dc.osm')
        self.addTags(data, self.footwaysSimplified, self.dc)
        ox.save_graphml(self.footwaysSimplified, 'savedFootways.graphml')
        return self.footwaysSimplified

    #loads previous setup
    def loadSetup(self, file='savedFootways.graphml'):
        return ox.load_graphml(file)

    #creates networkx graph for the osm file input
    def createFootwaysSimplified(self, file):
        return ox.graph_from_xml(file)

    #adds tags to the file from our data file
    def addTags(self, data, map, dc):
        UpdateMap(map).apply_file(data)
        
        shadeCalc = tiffShade()
        for node in map.nodes:
            latitude = map.nodes[node]['y']
            longitude = map.nodes[node]['x']
            shade = shadeCalc.isSunny(latitude, longitude)
            
            if shade == 0:
                map.nodes[node]['shade'] = 'yes'
            elif shade == 1:
                map.nodes[node]['shade'] = 'no'
                
    #retrieve walkways for routing
    def getWalkways(self):
        map = ox.graph_from_place('Washington, D.C., USA', network_type="walk")
        ox.save_graph_xml(map, filepath='walkways')

        
    


        



