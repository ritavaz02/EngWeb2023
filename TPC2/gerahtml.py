import json


def ordCidade(c):
    return c['nome']

# def ordCidadeDist(listD):
#     cidadesN = []
#     for c in listD:
#         cidadesN.append(dist[c][0])
#     cidadesN.sort()

#     return c['nome']


f = open("mapa.json")

mapa = json.load(f)

cidades = mapa['cidades']
ligacoes = mapa['ligações']

# dictionary with all the information about the connections
lig = {}
# dictionary in which the keys are the citys ids and the values a set of ids that refers 
# to the connections the city is related to
dist = {}
# dictionary that has the city id as key and the name, population and descrition of the city as the value
cid = {}
# dictionary that has the district as key and the names of the cities that belong to that district as value
district = {}
# list that has the names of the districts
listDist = []

for l in ligacoes:

    # adds the id of the connection to the set related to the origin
    if l['origem'] in dist:
        dist[l['origem']].add(l['id'])
    else:
        newDist = {l['origem']: set([l['id']])};
        dist.update(newDist)

    # adds the id of the connection to the set related to the destination
    if l['destino'] in dist:
        dist[l['destino']].add(l['id'])
    else:
        newDist = {l['destino']: set([l['id']])};
        dist.update(newDist)

    # adds the information of the city to the dictionary that has 'id' as key and the value is a tuple with the other fields
    n = {l['id']: [l['origem'],l['destino'],l['distância']]}
    lig.update(n)

cidades.sort(key=ordCidade)
maxC = 0

for c in cidades:

    # adds the name of the city to the dictionary of cities
    nc = {c['id']:[c['nome'],c['população'],c['descrição']]}
    cid.update(nc)

    # adds the id of the city to the respective district
    if c['distrito'] in district:
        district[c['distrito']].append(c['id'])
        maxC += 1
    else:
        newDist = {c['distrito']: [c['id']]};
        district.update(newDist)
        listDist.append(c['distrito'])




# create the index page


pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title> Mapa Virtual</title>
        <style>
	    	table {
	    		border-collapse: collapse;
	    		width: 100%;
	    	}
	    	table tr:nth-child(odd) {
	    		background-color: #4F648F;
	    		color: white;
                width: 100%;
	    	}
	    	table tr:nth-child(even) {
	    		background-color: #6279A7;
                width: 100%;
	    	}
            body {
              background-color: #7C8FB6;
            }
	    </style>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
            <table>
                <tr>
"""

i = 0
j = 1

listDist.sort()

for nd in listDist:
    d = district[nd]
    cities = [(cid[city_id][0], city_id) for city_id in d]
    cities.sort()
    pagHTML += f"""<td><h3 href="#{nd}">{nd}</h3></td> <td>"""
    for (c,idc) in cities:
        pagHTML += f"""<td><a href="{idc}">{c}</a></td>"""
        j+=1
    while(j<maxC):
        pagHTML += f"""<td></td>"""
        j+=1
    
    pagHTML+="""</td> </tr><tr> """
    j=1

pagHTML += "</tr></table></center></html>"

with open("data/index.html", "w") as ff:
    ff.write(pagHTML)






# create the pages of the cities

for c in cidades:

    pagHTML = f"""
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title> Mapa Virtual</title>
                <style>
                    body {{
                      background-color: #7C8FB6;
                    }}
                </style>

            </head>
            
            <body>
                <center>
                    <h1>Mapa Virtual</h1>
                </center>
                <a name="{c['id']}"/>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp; {c['nome']}</h3>
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; População: </b>{c['população']}</p>
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Descrição: </b>{c['descrição']}</p>
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Distrito: </b>{c['distrito']}</p>
                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ligações:</b></p>
                <table>
                    <tr>            
        """
    i = 0
    # orDist is one of the ids of the connections that have or the origin or the destination equal to the city being studied now
    for orDist in dist[c['id']]:

        p = lig[orDist] # p is the tuple ['origem','destino','distância'] that represents the connection

        # check if the city being studied is the origin or destination of the connection
        if p[0] == c['id']:
            # the city being studied is the origin of the connection
            dest = cid[p[1]][0]
        else:
            # the city being studied is the destination of the connection
            dest = cid[p[0]][0]
        
        pagHTML += f"""
        <td><b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;> {dest}: </b> {p[2]} km<td>
        """
        i+=1
        if i==4:
            pagHTML+="""</tr><tr>"""
            i=0
    pagHTML += f"""</tr></table><address> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<a href="/"> Voltar ao índice</a>]</address>"""


    pagHTML += """
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    with open("data/" + c['id'] + ".html", "w") as f:
        f.write(pagHTML)


