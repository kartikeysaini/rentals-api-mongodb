# rentals-api-mongodb
It is a REST API which allows customers to create account and rent a movie of their liking.
It provides authentication and authorization using JSON Web Token(JWT) and protect routes that can only be accessed by admins. 
Without generating and verifying a token, a user cannot acces genre route for CRUD operations.
The movie database is connected to genres database using mongoose relationship modeling which means to provide a genre to a movie, we have
to pass genreId to Movie endpoint.
