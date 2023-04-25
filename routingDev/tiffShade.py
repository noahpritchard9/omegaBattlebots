import rasterio
import numpy as np

class tiffShade():
    def __init__(self):
        # Open the TIFF file provided by https://shademap.app/
        self.dataset = rasterio.open(r'shade_2023-04-24T18.9.00.GMT-4.tiff')
    def isSunny(self, lat, lon):
                    
            try:
                # Convert the map coordinate (latitude, longitude) to a pixel location
                row, col = self.dataset.index(lon, lat)

                # Read the pixel values at the specified location
                values = self.dataset.read(1)  # Assumes single band file

                # Extract the value at the specified location
                value = values[row, col]
                            
                # value is 0 for shade, 1 if sunny
                return value
            
                
            except:
                return -1
