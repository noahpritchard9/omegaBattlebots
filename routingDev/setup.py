import osmnx as ox
from osmiumUpdates import UpdateMap
import pandas as pd
import csv
import networkx as nx
from buildingsCalc import buildings
import sys
import timeit
import time



class setup():
    #runs all necessary setup functions
    def completeSetup(self, data, file):
        self.footwaysSimplified = self.createFootwaysSimplified(file)
        self.dc = self.createFootwaysSimplified('dc.osm')
        self.addTags(data, self.footwaysSimplified, self.dc)
        return self.footwaysSimplified


    #creates networkx graph for the osm file input
    def createFootwaysSimplified(self, file):
        return ox.graph_from_xml(file)

    #adds tags to the file from our data file
    def addTags(self, data, map, dc):
        UpdateMap(map).apply_file(data)
        
        #now we add shade tags:
        # i = 1
        # start = timeit.timeit()
        # try:
        #     for node in map.nodes:
        #         print(map.nodes[node])
        #         #footwaysSimplified.nodes[n.ref][tag.k] = tag.v
        #         if i % 6000 == 0:
        #             end = timeit.timeit()
        #             if end-start < 60:
        #                 time.sleep(60 - (end-start))
        #                 start = timeit.timeit()
        #         latitude = map.nodes[node]['y']
        #         longitude = map.nodes[node]['x']
        #         b = buildings(latitude, longitude)
        #         shade = b.shade(latitude, longitude)
        #         shade = shade.lower()
        #         node[node.id]['shade'] = shade
        # except KeyboardInterrupt:
        #     ox.save_graph_xml(map, filepath="shade.osm")
        #     ox.save_graphml(map, filepath='shade.graphml')
        #     ox.save_graph_geopackage(map, filepath='shade.gpkg')

        #     print('Interrupted')
        #     sys.exit(0)




    #retrieve walkways for routing
    def getWalkways(self):
        map = ox.graph_from_place('Washington, D.C., USA', network_type="walk")
        ox.save_graph_xml(map, filepath='walkways')

        
    


        



