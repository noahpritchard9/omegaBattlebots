# omegaBattlebots Project -- Journey

# Installation
- For all python libraries, a simple pip install for each should work to download them.
- For the DC map data, please go to https://download.geofabrik.de/ and download the appropriate .osm file type. We have focused on Washington, D.C., so you only need to download that latest map for our application.
 - Once downloaded, put the Node, Way, Relation order in the file to Relation, Way, Node order. This ensures that tags are taken in the appropriate order. This can be done manually, or through a script.
 -  When downloaded, place it into the routingDev folder, and put the file name as the replacement to "dc.osm."
 -  For downloading the walkways map, please consult https://github.com/gboeing/osmnx-examples/blob/main/notebooks/01-overview-osmnx.ipynb as it gives a full tutorial on doing this. As specified, this can be for any location. This would be the file to replace the "finalSimplified.osm" file. 
-  To increase speed times of shade, https://shademap.app/ was used to download .tiff files for shading. Select a region, and export the tiff file. In routingDev/tiffShade.py, replace the file name with what was downloaded. 
-  For the app portion, consult the appDev folder, with its own respective readme with instructions.

# Running
Once setup is complete, and an emulator/query device can make requests to the API, do the following:
- Run "main (1).py". This may take a few minutes, especially if starting from scratch. Future boots should be used using the complete setup option in this file.
- Send an appropriate Post request
- View results in emulator, or view the data returned.

# Future Projects
- Integrating this app with LetsEat (restaurant recommendation app), SafeStride, or other walking based routing apps.
- Expand the project to biking, or other modes of transportation.
- Incorporate new, technically difficult tags to data (for example, one not implemented in our project was foot traffic)
- Work on how to update maps with up-to-date data. With OSM, we found that data in DC is inaccurate or not present at times. A project to survey a city efficiently would help solve this problem for many app developers.

