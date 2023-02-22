import json


def ordCidade(c):
    return c['nome']


f = open("mapa.json")

mapa = json.load(f)

cidades = mapa['cidades']
ligacoes = mapa['ligações']

# dictionary with all the information about the connections
lig = {}
# dictionary in which the keys are the citys ids and the values a set of ids that refers 
# to the connections the city is related to
dist = {}
# dictionary that has the city id as key and the name of the city as the value
cid = {}

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

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title> Mapa Virtual</title>

    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Indice-->
                <a name="indice"/>
                <td valign="top">
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    pagHTML += f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
    </li>
    """
    nc = {c['id']:c['nome']}
    cid.update(nc)


pagHTML += """
</ul>
                </td>
                <!-- Conteudo-->
                <td>"""


for c in cidades:
    pagHTML += f"""
    <a name="{c['id']}"/>
    <h3>{c['nome']}</h3>
    <p><b>&nbsp;&nbsp;&nbsp;&nbsp; População: </b>{c['população']}</p>
    <p><b>&nbsp;&nbsp;&nbsp;&nbsp; Descrição: </b>{c['descrição']}</p>
    <p><b>&nbsp;&nbsp;&nbsp;&nbsp; Distrito: </b>{c['distrito']}</p>
    <p><b>&nbsp;&nbsp;&nbsp;&nbsp; Ligações:</b></p>
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
            dest = cid[p[1]]
        else:
            # the city being studied is the destination of the connection
            dest = cid[p[0]]
        
        pagHTML += f"""
        <td><b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;> {dest}: </b> {p[2]} km<td>
        """
        i+=1
        if i==4:
            pagHTML+="""</tr><tr>"""
            i=0
    pagHTML += f"""</tr></table><address> &nbsp;&nbsp;&nbsp;&nbsp;[<a href="#indice"> Voltar ao índice</a>]</address>"""


pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)