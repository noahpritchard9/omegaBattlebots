from buildingsCalc import buildings

latitute = [38.9006558,38.8995286]
longitute = [-77.0465927,-77.0448225]

latCalc = (38.9006558 - 38.8995286)/3
longCalc= (77.0465927-77.0448225)/3

latPoint = 0
longPoint = 0

for j in range(4):
    latPoint = latitute[0] - (latCalc * j)
    longPoint = (j* longCalc) + longitute[0]
    print("----------------------------------------------")
    print("       point ", j+1,"\n")
    builds_shade = buildings(latPoint, longPoint)
    builds_shade.shade(latPoint, longPoint) 
    


    
