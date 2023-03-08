from buildingsCalc import buildings

# latitute = [38.889271,38.8995286]
# longitute = [77.050182,-77.0448225]
# # 38.88940469972112, -77.05364734194916

# latCalc = (38.9006558 - 38.8995286)/3
# longCalc= (77.0465927-77.0448225)/3

# latPoint = 0
# longPoint = 0

# for j in range(4):
#     latPoint = latitute[0] - (latCalc * j)
#     longPoint = (j* longCalc) + longitute[0]
print("----------------------------------------------")
# print("       point ", j+1,"\n")
builds_shade = buildings(43.200518474083125, -43.944542477337265)
shade = builds_shade.shade(43.200518474083125, -43.944542477337265)
    # shadeid = builds_shade.shade.shadeId
print("printing return?  ",shade)
    
