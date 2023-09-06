CRUD Asset

Get all asset & count con filtrados
Get ->http://localhost:3001/assets?
&size=10
&page=1
&location=Ciudad%20de%20Buenos%20Aires      (el %20 representa el espacio, no se si hay que armarlo manualmente en la query)
&rooms=1
&bathrooms=1
&onSale=true
&amenities=1&amenities=2                    (hay que realizar un apartado por cada amenitie)
&rentPriceMin
&rentPriceMax
&sellPriceMin
&sellPriceMax
&averageScoreMin                            (decimal min 1)
&averageScoreMax                            (decimal max 5)
&sortBy                                     (sin terminar)

Borrado logico (pausar/primer paso de borrar publicacion)
Delete -> http://localhost:3001/assets/delete/:id

Restaurar
Get -> http://localhost:3001/assets/restore/:id

Borrado definitivo (boton adicional segundo paso borrado)
Delete -> http://localhost:3001/assets/:id

Get asset by ID
http://localhost:3001/assets/:uuid

Post asset
Post -> http://localhost:3001/assets/create
name          string
description   text
address       string
location      string
country       string
images        array(string)
onSale        boolean
sellPrice     number
rentPrice     number
rooms         number
bathrooms     number
coveredArea   float
totalArea     float
amenities     array(number)

Put asset
http://localhost:3001/assets/
name          string
description   text
images        array(string)
onSale        boolean
sellPrice     number
rentPrice     number
rooms         number
bathrooms     number
coveredArea   float
totalArea     float
amenities     array(number)

Get all but all (trae todas las publicaciones en BBDD aunque tengan un borrado logico)
Get -> http://localhost:3001/assets/admin


Get location
http://localhost:3001/assets/location
Informacion disponible para lista desplegable de un primer pre-filtro por ubicacion.

Get amenities (devuelve un array de objetos con id y name)
http://localhost:3001/amenities





Crud USER



Template de post para BBDD local(3)

{
	"name": "Departamento de Pepita",
	"description": "El Em Departamento Amoblado Cordoba se encuentra en Córdoba y ofrece alojamiento con balcón y cocina.Todos los alojamientos cuentan con aire acondicionado y TV de pantalla plana.El centro comercial Córdoba se encuentra a 1,7 km del departamento, mientras que el estadio de fútbol Mario Alberto Kempes está a 3,6 km. El aeropuerto más cercano es el aeropuerto internacional Ingeniero Aeronáutico Ambrosio L.V. Taravella, ubicado a 9 km del Em Departamento Amoblado Cordoba.",
	
	"address": "951 Padre Luis Galeano, 5009 ",
	"location":"Cordoba",
	"country":"Argentina",
	
	"images":["https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659301.jpg?k=2534661492111b259f5dbc7277e3f48c2e2f8232e92e9908ad81b6890b0616fa&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659315.jpg?k=499585cf667a36291b45c1e31bd4d871ee0ab0826348fdc2cfda66f4dbe8e685&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/345659308.jpg?k=2f921fa3038fe4c5ab2dc9f26046053866e2700b966f0e3c9acc2aed607f85f1&o=&hp=1"],
	
	"onSale":true,
	"sellPrice":150000,
	"rentPrice":250,
	
	"rooms":2,
	"bathrooms":1,
	"averageScore":3.5,
	"numberOfReviews":3,
	"coveredArea":87.6,
	"totalArea":300,
	
	"amenities":[1,5,6,7]
}