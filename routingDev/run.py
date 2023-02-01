import osmnx as ox
import geopandas as gpd
import random as rand
import osmium
import requests as r
from communication import communication
from setup import setup
from osmiumUpdates import UpdateMap
from score import score
from setup import setup
from visualize import visualize
import networkx as nx
import json

#Here we have setup, dependent on whether we really need it or not
footwaysSimplified = setup().completeSetup("dc.osm", "finalSimplified.osm")

#Get user Location and Preferences
locData = communication().getLoc()

prefData = communication().getPref()

elevation = prefData[0]
PoI = prefData[1]
paved = prefData[2]
lit = prefData[3]
distance = prefData[4]

#Here's our walking map which simplifies the map to just the walking paths
#dist is set by preferences:
length = 0
if prefData[-1] == -1:
    length = 804.672    #.5 mile radius, for ~1 mile route
elif prefData[-1] == 0:
    length = 1207.01    #.75 mile radis, for ~1.5 mile route
elif prefData[-1] == 1:
    length = 1609.34    #1 mile radius, for ~2 mile route

#Let's create our general storage for routes:
startPoint = ox.distance.nearest_nodes(footwaysSimplified, X=locData[1], Y=locData[0])
routes = [[0,0,startPoint]]

#elevation requires running a different route generator, so we'll differentiate that here:
if elevation == 1:
    #If we account for elevation, then we run the following:
    ox.settings.all_oneway = True
    ox.settings.log_console = True
    #First we pull in the dc map
    G = ox.graph_from_xml("dc.osm")
    #Get the elevations
    walk_Map = ox.elevation.add_node_elevations_google(footwaysSimplified, api_key= 'AIzaSyB7ljQ7C7x5Kjf9cWb4gFcNzW3ay_FvWCM')
    #Get the elevation grades
    walk_Map = ox.elevation.add_edge_grades(walk_Map)
    #we've now converted our walking map to consider elevation
     
        
    
#here we focus on if elevation was not considered
else:
    ox.settings.all_oneway = False
    ox.settings.log_console = False
    #Use i to determine when we should stop running this code. Looking for half of our points to meet the distance
    i = 0
    iter = 0
    #while loop to tell us what percentage of routes we want to be over the threshold
    while i < len(routes) / 100:
        tempRoutes = []
        #reset i to account for routes this run past distance
        i = 0
        
        #iterate through all saved routes
        for r in routes:
            #print(r)
            #if we can add to the route...
            if r[0] < (length):
                #look into all of its neighbors
                for nbr in footwaysSimplified[r[-1]]:
                    G = r.copy()
                    tempRoutes.append(G)
                    
                    #Let's update our reward values
                    #If we have this node already, we want a penalty
                    if nbr in tempRoutes[-1]:
                        tempRoutes[-1][1] -= 10

                    #Update scores for our various preferences                    
                    score().score(lit, "lit", "yes", nbr, tempRoutes, footwaysSimplified)
                    
                    score().score(paved, "paved", "yes", nbr, tempRoutes, footwaysSimplified)                                    
                        
                    tempRoutes[-1].append(nbr)
                    
                    #add in distance
                    tempRoutes[-1][0] += footwaysSimplified[r[-1]][nbr][0]['length']
                
            else:
                i += 1
        routes = tempRoutes
        #a print to help us figure out how many routes we want
        print(f"{i} {(len(routes)/100)}")
        iter+=1
        
        #reduce the routing data set
        if iter % 4 == 0:
            routes.sort(key=lambda x: x[1])
            routes = routes[round(.75 * len(routes)) : ]
        
    #narrow down space
    routes.sort(key=lambda x: x[1])
    routes = routes[round(.75 * len(routes)) : ]
    print(len(routes))
    # now let's make the route circular in a simple form
    # This will also allow us to evaluate the distance in a simple manner
    for r in routes:
        startDist=r[0]
        short = ox.shortest_path(footwaysSimplified, r[-1], r[2])
        try:
            for i in range(len(short)-1):
                r[0] += footwaysSimplified[short[i]][short[i+1]][0]['length']

            if len(short) > 1:
                for n in short[1:-1]:
                    r.append(n)
            
            #this part handles the scoring added:
            #Scoring is: 
            r[1] += ((r[0]-startDist)/(length)) * 100
        except TypeError:
            print('Did not return shortest path')
        #r[0] += nx.shortest_path_length(footwaysSimplified, r[2], r[-1], weight='length')
    print(len(routes))
    finalRoutes = []
    for r in routes:
        if r[0] >= length*1.5:
            finalRoutes.append(r)
    finalRoutes.sort(key=lambda x: x[1])
    finalRoutes = finalRoutes[round(.75 * len(finalRoutes)) : ]
    print(len(finalRoutes))

    visualize.showBest(tuple(finalRoutes), footwaysSimplified, locData)

    #Send the data back to the API

    