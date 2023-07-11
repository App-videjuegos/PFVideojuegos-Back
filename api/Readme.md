RUTAS

    BulkDB

Alojar todos los vidojuegos a la BD Postgres
POST --> https://pfvideojuegos-back-production.up.railway.app/games/createBulkDB


    GAMES
Extrae todos los video juegos de la BD postgres
GET -->  https://pfvideojuegos-back-production.up.railway.app/games


Extrae el video juego por nombre de la BD postgres
GET --> https://pfvideojuegos-back-production.up.railway.app/games?name=Tomb Raider (2013)


Extrae el video juego por ID de la BD postgres
GET --> https://pfvideojuegos-back-production.up.railway.app/games/19710

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Nombre en forma Ascendente (A - Z)
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/asc

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Nombre en forma Descendente (Z - A)
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/desc

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Rating de menor a mayor
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/ratmin

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Rating de mayor a menor
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/ratmax

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Precio de menor a mayor
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/pricemin

Extrae todos los video juegos de la BD postgres, los filtra y los oredna por Precio mayor a menor
GET --> https://pfvideojuegos-back-production.up.railway.app/games/order/pricemax


Elimina un video juego pasandole el ID
DELETE --> https://pfvideojuegos-back-production.up.railway.app/games/19710


Actualiza un video juego
PUT --> https://pfvideojuegos-back-production.up.railway.app/games/update/19710
Se le deve pasar por body la siguiente estructura
{
        "id": "19710",
        "name": " ensayo put",
        "released": "2013-09-17",
        "rating": 4,
        "platforms": [
            "PlayStation 5",
            "Xbox Series S/X",
            "PlayStation 4",
            "PC",
            "PlayStation 3",
            "Xbox 360",
            "Xbox One"
        ],
        "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        "genre": [
            "Action",
            "Adventure"
        ]
    }


Agregar un nuevo video juego
POST --> https://pfvideojuegos-back-production.up.railway.app/games
Se le deve pasar por body la siguiente estructura

{
    "id": 19710,
        "name": " Prueba post",
        "released": "2013-09-17",
        "rating": 4,
        "platforms": [
            "PlayStation 5",
            "Xbox Series S/X",
            "PlayStation 4",
            "PC",
            "PlayStation 3",
            "Xbox 360",
            "Xbox One"
        ],
        "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        "genre": [
            "Action",
            "Adventure"
        ]
    }




    GENEROS


Obtener Generos

GET --> https://pfvideojuegos-back-production.up.railway.app/genres;





    PLATAFORMAS


Obtener Plataforma

Extrae todos los video juegos de la BD postgres, los filtra de acuerdo a la plataforma que se ha solicitado

GET --> https://pfvideojuegos-back-production.up.railway.app/games/plataforms/ Android;



    USERS

Agregar un nuevo USUARIO
POST --> https://pfvideojuegos-back-production.up.railway.app/user
Se le deve pasar por body la siguiente estructura

{
	"id": 198,
	"name": "Jonhy Deep",
	"userAdmin": true,
	"email": "jonhydeep@gmail.com",
	"password": "12345678",
	"image": "http://image.com.ar",
	"phone": "444-4444"
}    

Extrae todos los usuarios de la BD postgres
GET -->  https://pfvideojuegos-back-production.up.railway.app/user

Extrae el usuario por ID de la BD postgres
GET --> https://pfvideojuegos-back-production.up.railway.app/user/198

Extrae el video juego por nombre de la BD postgres
GET --> https://pfvideojuegos-back-production.up.railway.app/user?name=Jonhy Deep

Actualiza los datos de un usuario
PUT --> https://pfvideojuegos-back-production.up.railway.app/user/update/19710
Se le deve pasar por body la siguiente estructura:

{
    "id": 198,
	"name": "Walker Jonhy",
	"userAdmin": false,
	"email": "walkerjonhy@gmail.com",
	"password": "141414",
	"image": "http://image.random.com.ar",
	"phone": "141-4141"
}


CARTS : Carrito de Compras

Agregar un nuevo Carrito al Usuario.
POST --> https://pfvideojuegos-back-production.up.railway.app/cart
Se le deve pasar por body la siguiente estructura
{
	"userId": 198,
	"videogameId": 12020,
	"quantity": 4,
	"price": 60
}

