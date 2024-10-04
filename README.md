# IP-RMT-53-Server

Individual Project RMT-53 Server Side

# AniTrackr. App Server

## RESTful endpoints

### POST /register

> Post user register

_Request Header_

```
not needed
```

_Request Body_

```
  {
    "username": "<user username>",
    "email": "<user email>",
    "password": "<user password>"
  }
```

_Response (201)_ - User Created / Register Success

```
  {
    "id": "<user id>,
    "email": "<user email>",
  }
```

### POST /login

> Post user login

_Request Header_

```
not needed
```

_Request Body_

```
  {
    "email": "<user email>",
    "password": "<user password>"
  }
```

_Response (200)_ - Login Success

```
  {
    "access_token": "<access token>,
    "id": "<user id>,
    "username": "<user username>,
    "email": "<user email>",
  }
```

### POST /google-login

> Post user login with google

_Request Header_

```
{
    "google_token": "<user google token>"
}
```

_Request Body_

```
  not needed
```

_Response (200)_ - Login Success

```
  {
    "access_token": "<access token>,
    "id": "<user id>,
    "username": "<user username>,
    "email": "<user email>",
  }
```

### POST /api/chat

> Post chatbot for anime recommendation based on user question

_Request Header_

```
not needed
```

_Request Body_

```
prompt: <user prompt>
```

_Response (200)_ - Login Success

```
{
    "message": "Gemini AI Chatbot replied successfully",
    "recommendation": "<chatbot reply(recommendation)>"
}
```

### GET /anime/search

> Get user searched anime

_Request Header_

```
Authorization: Bearer <user token>
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "malId": "<anime mal_id>",
    "title": "<anime title>",
    "genre": "<anime genre>"
    "synopsis": "<anime synopsis>",
    "episodes": "<anime episodes>",
    "imageUrl": "<anime image url>",
    "score": "<anime score>",
},
...
```

### GET /anime/:id

> Get user searched anime

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "mal_id": "<anime mal_id>",
    "title": "<anime title>",
    "genre": "<anime genre>"
    "synopsis": "<anime synopsis>",
    "episodes": "<anime episodes>",
    "images": "<anime image>",
    "score": "<anime score>",
    ...
},
```

### POST /api/anime/store

> Post user searched anime to anime database

_Request Header_

```
not needed
```

_Request Body_

```
[
  {
    "mal_id": "<anime mal_id>",
    "title": "<anime title>",
    "genre": "<anime genre>"
    "synopsis": "<anime synopsis>",
    "episodes": "<anime episodes>",
    "images": "<anime image>",
    "score": "<anime score>",
    ...
  },
  ...
]

```

_Response (200)_

```
{
  message: "Anime data stored successfully",
},
```

### GET /api/user/me

> Get user profile data

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "username": "<user username>,
    "id": "<user id>,
    "email": "<user email>"
},
```

### PUT /api/user/me/username

> Get user profile data

_Request Header_

```
Authorization: Bearer <user token>
```

_Request User_

```
{
    "id": <user id>
}
```

_Request Body_

```
{
    username: "<new username>"
}
```

_Response (200)_

```
{
    message: "Username updated successfully."
},
```

### GET /api/user/me/anime-list

> Get user's anime list

_Request Header_

```
Authorization: Bearer <user token>
```

_Request User_

```
{
    "id": <user id>
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "Anime": {episodes: <anime episodes>, ...}
    "id": "<anime list id>"
    "animeId": "<user anime id>
    "userId": "<user id>
},
```

### DELETE /api/user/me/anime-list/:animeId

> Delete selected user's anime from list

_Request Header_

```
Authorization: Bearer <user token>
```

_Request Params_

```
"animeId": "<anime id>"
```

_Request User_

```
{
    "id": "<user id>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    message: "Anime removed from your list successfully"
},
```

### POST /api/user/me/anime-list

> Delete selected user's anime from list

_Request Header_

```
Authorization: Bearer <user token>
```

_Request User_

```
{
    "id": "<user id>"
}
```

_Request Body_

```
{
    "malId": "<anime id>"
}
```

_Response (201)_ Anime successfully added

```
{
    "message": "Anime added to your list successfully",
    data: {
        "userId": "<user id>",
        "animeId": <anime id>,
    }
},
```