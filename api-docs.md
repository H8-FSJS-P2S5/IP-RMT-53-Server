# API Documentation

## Endpoints

### Public Endpoints

- `POST /register`
- `POST /login`
- `POST /login/google`

### Protected Endpoints

Endpoints yang hanya bisa diakses oleh users yang sudah login

- `GET /monster`
- `GET /monster/:id`
- `GET /monster/:id/imgUrl`
- `GET /favorites`
- `POST /favorites`
- `DELETE /favorites/:monsterId`
- `POST /gemini`

### 1. `POST /register`

**Description:**

- Endpoint untuk mendaftarkan user baru dengan username, email, dan password.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

<span style="color:Khaki"> Response:

- `201 - Created`:

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Email is required"
}
```

or

```json
{
  "message": "Password is required"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 2. `POST /login`

**Description:**

- Endpoint untuk autentikasi user dan menghasilkan token.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "email": "string",
  "password": "string"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "access_token": "string",
  "userId": "integer"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Email is required"
}
```

or

```json
{
  "message": "Password is required"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid email/password"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 3. `POST /login/google`

**Description:**

- Endpoint untuk autentikasi menggunakan akun Google.

<span style="color:Khaki"> Request:

- `body`:

```json
{
  "googleToken": "string"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "access_token": "string",
  "message": "Login successful"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Google token is required"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Google token"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 4. `GET /monsters`

**Description:**

- Mengambil daftar monster dengan opsi pencarian, pagination, filter dan sorting.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- page (optional): Nomor halaman untuk pagination.
- page (optional): Jumlah item per halaman.
- q (optional): Query string untuk pencarian karakter.
- sort (optional): Pengurutan monster berdasarkan abjad {name}.

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "data": [
    {
      "id": "string",
      "type": "string",
      "species": "string",
      "name": "string",
      "description": "string",
      "imageUrl": "string"
    },
    ...
  ],
  "totalPages": "integer",
  "currentPage": "integer",
  "totalData": "integer",
  "dataPerPage": "integer"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 5. `GET /monsters/:id`

**Description:**

- Mengambil detail monster berdasarkan ID.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- `Params`:

```json
{
  "id": "integer (required)"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "data": {
    "id": "integer",
    "type": "string",
    "species": "string",
    "name": "string",
    "description": "string",
    "imageUrl": "string"
  }
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `404 - NotFound`:

```json
{
  "message": "Monster with id: {id} is not found"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 6. `PATCH /monsters/:id/imgUrl`

**Description:**

- Memperbarui gambar monster berdasarkan ID.

<span style="color:Khaki"> Request:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- `Params`:

```json
{
  "file": "string (required)"
}
```

- `headers`:

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "message": "Image url on monster with id: {id} has been updated"
}
```

- `400 - BadRequest`:

```json
{
  "message": "Image URL is required"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `404 - Not Found`:

```json
{
  "message": "Monster with id: {id} is not found"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 7. `GET  /favorites`

**Description:**

- Menampilkan monster yang ada di daftar favorite.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "data": [
    {
      "userId": string,
      "monsterId": string,
       "type": string,
      "species": string,
      "name": string,
      "description": string,
      "imageUrl": string
    },
    ...
  ],
  "message": "success"
}
```

- `401 - Unauthorized`:

```json
{
  "message": "Invalid Token"
}
```

- `404 - Not Found`:

```json
{
  "message": "User with id: {id} is not found"
}
```

- `500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 8. `POST  /favorites`

**Description:**

- Menambahkan monster ke daftar favorite.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- `Params`:

```json
{
  "monsterId": "integer (required)"
}
```

<span style="color:Khaki"> Response:

- `201 - Created`:

```json
{
  "message": "Monster with id:{monsterId} has been successfully added to favorites"
}
```

- `400 - Bad Request`:

```json
{
  "message": "This monster with id:{monsterId} is already in your favorites"
}
```

- `404 - Not Found`:

```json
{
  "message": "User with id:{id} is not found",
  "message": "Monster with id:{monsterId} is not found"
}
```

`500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 9. `DELETE  /favorites`

**Description:**

- Menghapus monster dari daftar favorite.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- `Params`:

```json
{
  "monsterId": "integer (required)"
}
```

<span style="color:Khaki"> Response:

- `200 - OK`:

```json
{
  "message": "Monster with id:{monsterId} successfully removed from favorites"
}
```

- `404 - Not Found`:

```json
{
  "message": "User with id:{id} is not found"
}
```

or

```json
{
  "message": "Monster with id:{monsterId} is not found"
}
```

`500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```

### 10. `POST  /gemini`

**Description:**

- Menghasilkan deskripsi monster menggunakan layanan AI berdasarkan nama monster yang diberikan.

<span style="color:Khaki"> Request:

- `headers`:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- `Params`:

```json
{
  "monsterName": "string (required)"
}
```

- `200 - OK`:

```json
{
  "description": "string"
}
```

- `400 - Bad Request`:

```json
{
  "message": "monsterName is required"
}
```

`500 - Internal Server Error`:

```json
{
  "message": "ISE"
}
```
