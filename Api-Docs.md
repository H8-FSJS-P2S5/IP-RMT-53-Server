# API Documentation

## Endpoints

### Public Enpoints

- `POST /register`
- `POST /login`
- `POST /login/google`

- `GET /public/allArts`
- `GET /public/allArts/:id`
- `POST /give-me-answer`

### Protected Enpoints

- `GET /user/get/private/home`
- `POST /user/post/private/arts`
- `GET /user/get/private/arts/:id`
- `PUT /user/update/private/arts/:id`
- `DELETE /user/delete/private/arts/:id`
- `PATCH /user/patch/private/arts/:id/image-url`

- `GET /user/get/private/origins`
- `POST /user/post/private/by/origins`
- `PUT /user/put/private/origins/by/:id`

## ENDPOINT PUBLIC

### 1. `POST /register`

**Description**

- Enpoint untuk mendaftarkan user baru dengan email dan password.

Request:

- `body`:
```json
{
    "email": "string",
    "password": "string"
}
```

Response:

- `201 - Created`:

```json
{
 "your data has been created" 
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internet Server Error"
}
```

### 2. `POST /login`

**Description**

- Edpoint untuk Autentikasi User dan mendapatkan token.

Request:

- `body`:

```json
{
    "email": "string",
    "password": "string"
}
```

Response:

```json
{
    "access_token": "string"
}
```

- `400 - Bad Request`:

```json
{
    "message": "Please input your email correctly"
}
```

or

```json
{
    "message": "Please input your password correctly"
}
```

- `401 - Unauthirized`:

```json
{
    "message": "Email or Password wrong" 
}
```

### 3. `POST /login/google`

**Description**

- Endpoint untuk Authentikasi lewat Google akun.

Request:

-  `body`:

```json
{
    "googleToken": "string"
}
```

Response:

- `200 - OK`:

```json
{
    "access_token": "string"
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server Error"
}
```

### 4. `GET /public/allArts`

**Description**

- Endpoint untuk melihat home page public.

Response:

- `200 - OK`:

```json
{
    "message": "string",
    "data": [
        {
            "id": "integer",
            "title": "string",
            "description": "string",
            "price": "integer",
            "artis": "string",
            "imageUrl": "string",
            "UserId": "integer",
            "OriginId": "integer",
            "quantity": "integer",
            "createdAt": "string",
            "updatedAt": "string"
        },
        ...
    ]
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal server Error`:

```json
{
    "message": "Internal server Error"
}
```

### 5. `GET /public/allArts`

**Description**

- Endpoint untuk melihat detail dari 1 foto di public home page.

Request:

- `params`

```json
{
    "id": "integer"
}
```

Response:

- `200 - OK`:

```json
{
    "message": "string",
    "data": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "price": "integer",
        "artis": "string",
        "imageUrl": "string",
        "UserId": "integer",
        "OriginId": "integer",
        "quantity": "integer",
        "createdAt": "string",
        "updatedAt": "2string"
    }
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal server Error`:

```json
{
    "message": "Internal server Error"
}
```

## ENDPOINT PRIVATE

### 6. `GET /user/get/private/home`

**Desscription**

- Endpoint bagi user yang sudah berhasil login dan pasti memiliki access_token, sehingga bisa melihat home page private.

Request:

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

Response:

- `200 - OK`:

```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "title": "Schkuhria anthemoidea (DC.) J.M. Coult. var. wrightii (A. Gray) Heiser",
            "description": "Supplement Right Seminal Vesicle with Nonautologous Tissue Substitute, Open Approach",
            "price": 4522176,
            "artis": "Centrocercus urophasianus",
            "imageUrl": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/65/78ce0081ad11e681d7bb31b0a632ef/starry-night.jpg",
            "UserId": 1,
            "OriginId": 12,
            "quantity": 1,
            "createdAt": "2024-10-03T18:25:38.028Z",
            "updatedAt": "2024-10-03T18:25:38.028Z"
        },
        ...
    ]
}
```

- `401 - Unauthorized`:

```json
{
    "message": "Invalid Token"
}
```

- `404 - Not Found

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server Error"
}
```

### 7. `POST /user/post/private/arts`

**Description**

- Endpoint untuk menambahkan sebuah foto tetapi user harus memiliki access_token untuk bisa mengaksessnya.

Request:

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- `body`:

```json
{
     "title": "string", 
     "description": "string", 
     "price": "integer", 
     "artis": "string", 
     "imageUrl": "string", 
     "UserId": "integer", 
     "OriginId": "integer", 
     "quantity"  "integer"
}
```

Response:

- `201 - Craated`:

```json
{
   "art": {
        "id": 11,
        "title": "From Toe to Head",
        "description": "Unknow",
        "price": 99999999,
        "artis": "Unknow",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bust_of_Jesus_Christ_by_Gianlorenzo_Bernini.jpg/640px-Bust_of_Jesus_Christ_by_Gianlorenzo_Bernini.jpg",
        "UserId": 1,
        "OriginId": 7,
        "quantity": 1,
        "updatedAt": "2024-10-10T14:41:44.831Z",
        "createdAt": "2024-10-10T14:41:44.831Z"
    } 
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server Error"
}
```

### 8. `GET /user/get/private/arts/:id`

**Description**

- Endpoint dimana membutuhkan access_token untuk bisa mengakses detail dari sebuah foto pada home private page.

Request:

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- `params`:

```json
{
    "id": "string"
}
```

Response:

- `200 - ok`:

```json
{
    "message": "Success",
    "data": {
        "id": 3,
        "title": "Draba nemorosa L.",
        "description": "Resection of Cystic Duct, Via Natural or Artificial Opening Endoscopic",
        "price": 9601968,
        "artis": "Sagittarius serpentarius",
        "imageUrl": "https://pixune.com/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-30-12.59.03-A-whimsical-and-colorful-illustration-of-an-artist-surrounded-by-a-whirlwind-of-various-art-styles-and-influences.-The-artist-a-middle-aged-Caucasian-1030x589.webp",
        "UserId": 2,
        "OriginId": 10,
        "quantity": 1,
        "createdAt": "2024-10-03T18:25:38.028Z",
        "updatedAt": "2024-10-03T18:25:38.028Z"
    }
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal Server Error`

```json
{
    "message": "Internal Server Error"
}
```

### 9.PUT `/user/update/private/arts/:id`

**Description**

- Endpoint ini dipergunakan user untuk bisa mengakses page bertujuan untuk mengubah semua indikator pada sebuah foto.

Request:

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- `params`:

```json
{
    "id": "integer"
}
```

Response:

-

### 10. `DELETE /user/delete/private/arts/:id`

**Description**

- Endpoint ini digunakan user yang sudah login untuk dapat menghapus sebuah foto yang diinginkan.

Request:

- `headers`:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- `params`:

```json
{
    "id": "integer"
}
```

Response:

- `200 - OK`:

```json
{
    "message": "${data.name} has been deleted"
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal Server Error`

```json
{
    "message": "Internal Server Error"
}
```

### 11. `PATCH //user/patch/private/arts/:id/image-url`

**Description**

- Endpoint ini digunakan user yang sudah login untuk merubah mengganti foto yang diinginkan

Request:

### 12. `GET /user/get/private/origins`

**Description**

- Endpoint ini digunakan user untuk mengakses halam Origin.

Request:

```json
{

}
```

Response:

- `200 - OK`:

```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "name": "Murów",
            "createdAt": "2024-10-03T18:25:38.016Z",
            "updatedAt": "2024-10-03T18:25:38.016Z"
        },
        {
            "id": 2,
            "name": "Nikulino",
            "createdAt": "2024-10-03T18:25:38.016Z",
            "updatedAt": "2024-10-03T18:25:38.016Z"
        },
        ...
    ]
}
```

- `404 - Not Found`:

```json
{
    "message": "Data Not Found"
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server Error"
}
```

### 13. `POST //user/post/private/by/origins`

**Description**

- Endpoint ini digunakan user yang sudah login untuk menambahkan Origin yang baru.

Response:

- `body`:

```json
{
    "name": "string"
}
```

Resnponse:

- `201 - Created`

```json
{
    "message": "Data has been created",
    "data": "silikon valley"
}
```

- `400 - Bad Request`:

```json
{
    "message": "Please input something"
}
```

- `500 - Internal Server Error`:

```json
{
    "message": "Internal Server error"
}
```



