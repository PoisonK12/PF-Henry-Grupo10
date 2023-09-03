Endpoint definidos

Get all asset & count
http://localhost:3001/assets?size=10&page=1 etc...
(Variables agregables, no excluyentes dentro de query: location, rooms, bathrooms, onSale, amenities, rentPriceMax, rentPriceMin, sellPriceMax, sellPriceMin)

Get all aplicando filtro de location. Desconozco si desde el front hay que generar una logica para incluir los %20 en vez de espacios
http://localhost:3001/assets?size=10&page=1&location=Provincia%20de%20Buenos%20Aires

Ruta tentativa ordenamiento
http://localhost:3001/assets?size=10&page=1&location=CABA&orderby=asc

Get asset by ID
http://localhost:3001/assets/:uuid

Post asset
http://localhost:3001/assets/create

Put asset
http://localhost:3001/assets/

Delete asset (falta borrado logico)
http://localhost:3001/assets/delete/:uuid

Get location
http://localhost:3001/assets/location
Informacion disponible para lista desplegable de un primer pre-filtro por ubicacion.

Get amenities (devuelve un array de objetos con id y name)(ANDAN AMBAS PARA QUE NO SE ROMPA EL FRON HASTA ACTUALIZAR)
http://localhost:3001/assets/amenities
http://localhost:3001/amenities

Template de post para BBDD local(3)

{
"name": "Gachishouse",
"description": "El Gachishouse ofrece alojamiento con pileta privada en Buenos Aires. Esta casa se encuentra a 2,5 km de la calle Caminito y a 2,6 km del café Tortoni.La casa tiene acceso directo a un balcón con vistas al jardín, aire acondicionado, 4 dormitorios y cocina totalmente equipada.Además, hay una terraza.El estadio La Bombonera se encuentra a 2,2 km del Gachishouse, mientras que el Palacio Barolo está a 2,3 km. El aeropuerto Jorge Newbery, el aeropuerto más cercano, está a 9 km.",
"address": "Virrey Ceballos 1757 p.b 2, 1135",
"location":"Buenos Aires",
"country":"Argentina",
"images":["https://cf.bstatic.com/xdata/images/hotel/max1024x768/287157097.jpg?k=8be83c6cb2405b8ec69b82ec4a19645f51746591036148e6e07e8066638a1a19&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/286487613.jpg?k=594c88df0e3a954d1fd94bdf5a61e15f96d28dd91383529541cf5345d9f720fa&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/286487618.jpg?k=9deab4fe3823dee8f3b83011da66c97f16c2c2e01af3d58ce94774f480568a2d&o=&hp=1"],
"onSale":true,
"sellPrice":200000,
"rentPrice":230,
"rooms":2,
"bathrooms":1,
"coveredArea":87.6,
"totalArea":300,
"reviews":"asdasdasd",
"nearby":"asd",
"nearbyScore":1,
"amenities":[1,2,3],
"userId":1
}

---

{
"name": "Gorriti 3500 - Lux 1 Bd Pool & Gym Palermo",
"description": "El Gorriti 3500 Lux 1 Bd Pool Amp Gym Palermo se encuentra en Buenos Aires, a 2,5 km del Museo de Arte Latinoamericano de Buenos Aires MALBA y a 2,8 km del jardín japonés, y ofrece alojamiento con wifi gratis, aire acondicionado y pileta al aire libre. También cuenta con pileta privada.El departamento cuenta con TV. El departamento también incluye cocina bien equipada con heladera, horno, microondas y secador de pelo.El departamento está a 2,8 km del Museo Nacional de Bellas Artes y a 3 km de la plaza Serrano. El aeropuerto más cercano es el aeropuerto Jorge Newbery Airfield, ubicado a 5 km del Gorriti 3500 Lux 1 Bd Pool Amp Gym Palermo.Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes.",
"address": "Gorriti 3552, Recoleta, 1172",
"location":"CABA",
"country":"Argentina",
"images":["https://cf.bstatic.com/xdata/images/hotel/max1024x768/474660077.jpg?k=c9272c95eeca64f8f688890bd7f928572f449d82c7ca90549e1c68a2254659ac&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/474660167.jpg?k=560ec8acb7d595dc685e25e63c9cffc34b5a6dbee44d1cd72a51bd067e7c7582&o=&hp=1","https://cf.bstatic.com/xdata/images/hotel/max1024x768/474660183.jpg?k=db2c8f5c68be7f0c8b14febaaf4f050288737c6c764e55a13128b1d71bddf7a1&o=&hp=1"],
"onSale":true,
"sellPrice":250000,
"rentPrice":450,
"rooms":3,
"bathrooms":2,
"coveredArea":95.2,
"totalArea":200,
"reviews":"asdasdasd",
"nearby":"asd",
"nearbyScore":1,
"amenities":[2,4,6],
"userId":1
}

---

{
"name": "Em Departamento Amoblado Cordoba",
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
"coveredArea":87.6,
"totalArea":300,
"reviews":"asdasdasd",
"nearby":"asd",
"nearbyScore":1,
"amenities":[1,3,5],
"userId":1
}
