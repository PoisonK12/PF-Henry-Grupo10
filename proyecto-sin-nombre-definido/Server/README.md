CRUD Asset

Get all asset & count con filtrados
GET ->http://localhost:3001/assets?
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
GET -> http://localhost:3001/assets/restore/:id

Borrado definitivo (boton adicional segundo paso borrado)
Delete -> http://localhost:3001/assets/:id

Get asset by ID
http://localhost:3001/assets/:uuid

Post asset
POST -> http://localhost:3001/assets/create
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

Editar asset
PUT -> http://localhost:3001/assets/
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
GET -> http://localhost:3001/assets/admin


Get location
GET -> http://localhost:3001/assets/location
Informacion disponible para lista desplegable de un primer pre-filtro por ubicacion.

Get amenities (devuelve un array de objetos con id y name)
GET -> http://localhost:3001/amenities





Crud USER

Lista completa de usuarios
GET -> http://localhost:3001/users

Get user por id (chequear)
GET -> http://localhost:3001/users/:id

Creacion de usuario
POST -> http://localhost:3001/users/create
Informacion enviada por body
userName,
    fullName										string
    profilePic									text
    birthDate										string? "YYYY-MM-DD"
    phoneNumber									string
    verificationNumber					string
    gender											string ENUM("Male", "Female", "agender", "No binary")
    address											string
    nationality									string ENUM("Argentina", "Mexico", "Colombia", "Venezuela")
    email												string
    password										string
    landlord										boolean
    userType										string ENUM("Admin", "User", "Premium User") default "User"

El user type en la practica no es un campo que utilicemos en el front, ahora lo enviamos por post para armar nuestras cuentas de admin pero en el caso de que una plataforma real tenga que crear este tipo de cuentas creo que se edita a mano por los dev en la BBDD o en un caso muy profesional se deberia hacer con una interfase dedicada.

Edicion de usuario
PUT -> http://localhost:3001/users/
Como referencia
    userName(unique)          string
Para edicion por voluntad de usuario
    fullName                  string
    profilePic                text
    phoneNumber               string
    verificationNumber				string
    gender										string ENUM("Male", "Female", "agender", "No binary") 
    address										string
    nationality								string ENUM("Argentina", "Mexico", "Colombia", "Venezuela")
    email(unique)             string
    password									string
    landlord									boolean
Edicion por sistema
    userType									string ENUM("Admin", "User", "Premium User")
    averageScore              float
    numberOfReviews           integer
    favorites                 array(string) uuid de asset favoritos
    history                   array(string) uuid de rent completadas

Eliminar usuario (destroy)
DELETE -> http://localhost:3001/users/:id


Login
POST -> http://localhost:3001/login
email                         string
password                      string original y se hashea en el recorrido para comparar

Logout
GET -> http://localhost:3001/logout


Template de post para BBDD asset

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
	
	"amenities":[1,3,5,6,7]
}
Template de post para BBDD user

{

    "userName": "MessiAdmin",
    "fullName": "Lionel Messi gato",

    "profilePic": "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9210c8d5e9b04af3/615f75d1f0cc0276fbb26d71/d27b847732f6968d3ec83e569617ab16ae0f7af9.jpg?auto=webp&format=pjpg&width=3840&quality=60",

    "birthDate": "2023-09-06",
    "phoneNumber": "11 0303 4560",
		"verificationNumber": "11 0404 5670",


    "gender": "Male",
    "address":"Calle Falsa 123",

    "nationality":"Argentina",
    "email": "messi@yahoo.com",

    "password":"administrador",
    "landlord": false,
    "userType": "Admin"

}