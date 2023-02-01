import osmnx as ox
import matplotlib.pyplot as plt

class visualize:
    def showAll(finalRoutes, footwaysSimplified, locData):
        lat = locData[0]
        lon = locData[1]
        zoom = .5
        for i in range(len(finalRoutes)):
            fig, ax = ox.plot_graph_route(footwaysSimplified, finalRoutes[len(finalRoutes)-i -1][2:], route_color="y", route_linewidth=6, node_size=0, bbox = (lat+(zoom*.0125), lat-(zoom*.0125), lon+(zoom*.0125), lon-(zoom*.0125)), show=True)
            plt.figure(fig)
            plt.axes(ax)
            plt.show()
            print(finalRoutes[len(finalRoutes)-i -1][1])
    
    def showBest(finalRoutes, footwaysSimplified, locData):
        lat = locData[0]
        lon = locData[1]
        zoom = .5
        fig, ax = ox.plot_graph_route(footwaysSimplified, finalRoutes[len(finalRoutes)-1][2:], route_color="y", route_linewidth=6, node_size=0, bbox = (lat+(zoom*.0125), lat-(zoom*.0125), lon+(zoom*.0125), lon-(zoom*.0125)) )
        print(finalRoutes[len(finalRoutes)-1][1])

    def showWorst(finalRoutes, footwaysSimplified, locData):
        lat = locData[0]
        lon = locData[1]
        zoom = .5
        fig, ax = ox.plot_graph_route(footwaysSimplified, finalRoutes[0][2:], route_color="y", route_linewidth=6, node_size=0, bbox = (lat+(zoom*.0125), lat-(zoom*.0125), lon+(zoom*.0125), lon-(zoom*.0125)) )
        print(finalRoutes[0][1])

