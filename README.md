# Auth API — Uso en JavaScript

Base URL:  
```
http://localhost:3000/api/v1/auth
```

> ⚠️ Importante: Todas las peticiones deben enviarse con `credentials: 'include'` para que el navegador envíe/reciba la cookie `token`.

---

## 🔑 Login

```js
async function login() {
  const res = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: "user@example.com",
      password: "Clave123"
    })
  });

  const data = await res.json();
  console.log(data);
}
```

**Respuesta esperada:**
```json
{
  "data": {
    "message": "Logged in.",
    "user": { "id": 123 }
  }
}
```

---

## 📝 Register

```js
async function register() {
  const res = await fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: "user@example.com",
      password: "Clave123",
      rePassword: "Clave123",
      dni: "12345678",
      birthdate: "1990-01-01",
      name: "Ada",
      lastname: "Lovelace"
    })
  });

  const data = await res.json();
  console.log(data);
}
```

**Respuesta esperada:**
```json
{
  "data": {
    "message": "register successfully.",
    "user": { "id": 123 }
  }
}
```

---

## 👤 Verificar sesión

```js
async function checkSession() {
  const res = await fetch("http://localhost:3000/api/v1/auth/session", {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();
  console.log(data);
}
```

**Respuesta esperada:**
```json
{
  "data": {
    "message": "Logged in.",
    "user": { "id": 123 }
  }
}
```

---

## 🚪 Logout

```js
async function logout() {
  const res = await fetch("http://localhost:3000/api/v1/auth/session", {
    method: "DELETE",
    credentials: "include"
  });

  const data = await res.json();
  console.log(data);
}
```

**Respuesta esperada:**
```json
{ "data": { "message": "Logged out." } }
```

---

## Ejemplo con **Axios**

Si usás [axios](https://axios-http.com/):

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
  withCredentials: true
});

// Login
await api.post("/login", { email: "user@example.com", password: "Clave123" });

// Register
await api.post("/register", {
  email: "user@example.com",
  password: "Clave123",
  rePassword: "Clave123",
  dni: "12345678",
  birthdate: "1990-01-01",
  name: "Ada",
  lastname: "Lovelace"
});

// Verificar sesión
await api.get("/session");

// Logout
await api.delete("/session");
```
