# 🧪 TESTING CON POSTMAN - DIVECONNECT

## 🎯 Guía Completa de Pruebas

---

## PASO 1: EJECUTAR LA APLICACIÓN

### En terminal de VS Code:

```bash
mvn spring-boot:run
```

**Verifica que arranca correctamente:**
```
Started DiveConnectApplication in X.XXX seconds
```

---

## PASO 2: ABRIR POSTMAN

1. Abre Postman
2. Crea una nueva Colección llamada "DiveConnect"

---

## PASO 3: PRUEBAS DE AUTENTICACIÓN

### 3.1 REGISTRO DE USUARIO

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/auth/registro`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "username": "juan_buzo",
  "email": "juan@email.com",
  "password": "password123",
  "tipoUsuario": "USUARIO_COMUN"
}
```

**Response Esperado (200 OK):**
```json
{
  "id": 1,
  "username": "juan_buzo",
  "email": "juan@email.com",
  "tipoUsuario": "USUARIO_COMUN",
  "activo": true,
  "numeroSeguidores": 0,
  "numeroSiguiendo": 0,
  "numeroPublicaciones": 0
}
```

### 3.2 REGISTRO DE EMPRESA

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/auth/registro`
- Body:

```json
{
  "username": "centro_buceo_madrid",
  "email": "info@buceomadrid.com",
  "password": "password123",
  "tipoUsuario": "USUARIO_EMPRESA",
  "nombreEmpresa": "Buceo Madrid",
  "descripcionEmpresa": "Centro de buceo profesional en Madrid",
  "direccion": "Calle Buceo 123, Madrid",
  "telefono": "+34 91 123 4567",
  "sitioWeb": "https://buceomadrid.com"
}
```

### 3.3 LOGIN

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/auth/login`
- Body:

```json
{
  "usernameOrEmail": "juan_buzo",
  "password": "password123"
}
```

**Response Esperado:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOi...",
  "tipo": "Bearer",
  "usuario": {
    "id": 1,
    "username": "juan_buzo",
    ...
  }
}
```

**⚠️ IMPORTANTE:** Copia el `token` de la respuesta. Lo necesitarás para las siguientes peticiones.

---

## PASO 4: CONFIGURAR AUTORIZACIÓN

Para las siguientes peticiones, necesitas autenticación:

1. En Postman, ve a la pestaña **Authorization**
2. Type: `Bearer Token`
3. Token: Pega el token que copiaste

**O bien:**

Añade en Headers:
- Key: `Authorization`
- Value: `Bearer eyJhbGciOiJIUzI1NiJ9...` (tu token completo)

---

## PASO 5: PRUEBAS DE USUARIOS

### 5.1 OBTENER PERFIL ACTUAL

**Request:**
- Method: `GET`
- URL: `http://localhost:8080/api/usuarios/perfil`
- Authorization: Bearer Token

**Response:**
```json
{
  "id": 1,
  "username": "juan_buzo",
  "email": "juan@email.com",
  ...
}
```

### 5.2 BUSCAR USUARIOS

**Request:**
- Method: `GET`
- URL: `http://localhost:8080/api/usuarios/buscar?q=juan`
- Authorization: Bearer Token

### 5.3 SEGUIR USUARIO

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/usuarios/2/seguir`
- Authorization: Bearer Token

---

## PASO 6: PRUEBAS DE PUBLICACIONES

### 6.1 CREAR PUBLICACIÓN

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/publicaciones`
- Authorization: Bearer Token
- Body:

```json
{
  "contenido": "¡Increíble inmersión en las Maldivas! Vimos tiburones ballena 🦈",
  "lugarInmersion": "Maldivas, Atolón Norte",
  "profundidadMaxima": 25.5,
  "temperaturaAgua": 28.0,
  "visibilidad": 30.0,
  "especiesVistas": "Tiburón ballena, Manta raya, Pez payaso"
}
```

### 6.2 OBTENER TODAS LAS PUBLICACIONES

**Request:**
- Method: `GET`
- URL: `http://localhost:8080/api/publicaciones?page=0&size=10`
- Authorization: Bearer Token

### 6.3 DAR LIKE

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/publicaciones/1/like`
- Authorization: Bearer Token

### 6.4 QUITAR LIKE

**Request:**
- Method: `DELETE`
- URL: `http://localhost:8080/api/publicaciones/1/like`
- Authorization: Bearer Token

---

## PASO 7: PRUEBAS DE COMENTARIOS

### 7.1 CREAR COMENTARIO

**Request:**
- Method: `POST`
- URL: `http://localhost:8080/api/publicaciones/1/comentarios`
- Authorization: Bearer Token
- Body:

```json
{
  "contenido": "¡Qué experiencia increíble! Me encantaría ir algún día"
}
```

### 7.2 OBTENER COMENTARIOS DE UNA PUBLICACIÓN

**Request:**
- Method: `GET`
- URL: `http://localhost:8080/api/publicaciones/1/comentarios`
- Authorization: Bearer Token

---

## PASO 8: VERIFICAR EN MYSQL WORKBENCH

Conecta a tu base de datos y ejecuta:

```sql
USE diveconnect_db;

-- Ver usuarios creados
SELECT id, username, email, tipo_usuario FROM usuarios;

-- Ver publicaciones
SELECT id, contenido, lugar_inmersion, numero_likes FROM publicaciones;

-- Ver comentarios
SELECT id, contenido, publicacion_id, usuario_id FROM comentarios;

-- Ver seguidores (relación muchos a muchos)
SELECT * FROM seguidores;

-- Ver likes
SELECT * FROM likes_publicacion;
```

---

## COLECCIÓN COMPLETA DE POSTMAN (JSON)

Puedes importar esta colección directamente en Postman:

```json
{
  "info": {
    "name": "DiveConnect API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Registro Usuario",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"juan_buzo\",\n  \"email\": \"juan@email.com\",\n  \"password\": \"password123\",\n  \"tipoUsuario\": \"USUARIO_COMUN\"\n}"
            },
            "url": {
              "raw": "http://localhost:8080/api/auth/registro",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8080",
              "path": ["api", "auth", "registro"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"usernameOrEmail\": \"juan_buzo\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:8080/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8080",
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    }
  ]
}
```

**Para importar:**
1. En Postman: Import → Raw text
2. Pega el JSON completo
3. Import

---

## ERRORES COMUNES Y SOLUCIONES

### Error 401 Unauthorized
**Causa:** Token inválido o expirado
**Solución:** Haz login nuevamente y actualiza el token

### Error 403 Forbidden
**Causa:** No tienes permisos
**Solución:** Verifica el rol del usuario

### Error 500 Internal Server Error
**Causa:** Error en el servidor
**Solución:** Revisa logs de Spring Boot en la consola

### "Cannot invoke method on null"
**Causa:** Objeto no encontrado en base de datos
**Solución:** Verifica que el ID existe en la base de datos

---

## ✅ CHECKLIST DE PRUEBAS

- [ ] Registro de usuario común exitoso
- [ ] Registro de empresa exitoso
- [ ] Login exitoso y token obtenido
- [ ] Obtener perfil actual funciona
- [ ] Crear publicación funciona
- [ ] Listar publicaciones funciona
- [ ] Dar/quitar like funciona
- [ ] Crear comentario funciona
- [ ] Listar comentarios funciona
- [ ] Seguir usuario funciona
- [ ] Datos se guardan correctamente en MySQL

---

## 🎉 COMPLETADO

¡Has probado exitosamente la API de DiveConnect!

---
