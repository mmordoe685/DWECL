# 03 - CONFIGURACIÓN DE MYSQL

## 🎯 Objetivo
Configurar la base de datos MySQL y conectarla con el proyecto Spring Boot.

---

## PASO 1: ABRIR MYSQL WORKBENCH

### 1.1 Iniciar MySQL Workbench

- **Windows:** Busca "MySQL Workbench" en el menú Inicio
- **Mac:** Abre desde Applications
- **Linux:** Ejecuta `mysql-workbench` en terminal

### 1.2 Conectar al Servidor Local

1. Verás una conexión llamada **"Local instance 3306"** o similar
2. Haz **doble clic** en ella
3. Ingresa tu **contraseña de root** (la que configuraste al instalar MySQL)
4. Click en **OK**

Si conecta correctamente, verás el **Query Editor** (editor de consultas)

---

## PASO 2: CREAR LA BASE DE DATOS

### 2.1 Abrir Nueva Query Tab

En MySQL Workbench:
- Click en el ícono de documento **📄** en la barra de herramientas
- O presiona `Ctrl+T`

### 2.2 Ejecutar Script de Creación

Copia y pega **TODO** este código en el Query Editor:

```sql
-- ============================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS
-- Proyecto: DiveConnect
-- ============================================

-- Eliminar base de datos si existe (CUIDADO: Borra todo)
DROP DATABASE IF EXISTS diveconnect_db;

-- Crear base de datos con codificación UTF-8
CREATE DATABASE diveconnect_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Seleccionar la base de datos
USE diveconnect_db;

-- Verificar que se creó
SHOW DATABASES LIKE 'diveconnect_db';
```

### 2.3 Ejecutar el Script

- Click en el ícono del **rayo** ⚡ (Execute)
- O presiona `Ctrl+Shift+Enter`

### 2.4 Verificar Resultado

En la parte inferior verás:
```
1 row(s) affected
```

En el panel izquierdo (**SCHEMAS**), haz click en el ícono de **refresh** 🔄

Deberías ver: **diveconnect_db**

---

## PASO 3: CREAR USUARIO ESPECÍFICO PARA LA APLICACIÓN

### ⚠️ IMPORTANTE: Seguridad

Es una **mala práctica** usar el usuario `root` en aplicaciones. Crearemos un usuario específico.

### 3.1 Ejecutar Script de Usuario

En una **nueva query tab**, copia y ejecuta:

```sql
-- ============================================
-- CREAR USUARIO ESPECÍFICO PARA DIVECONNECT
-- ============================================

-- Eliminar usuario si existe
DROP USER IF EXISTS 'diveconnect_user'@'localhost';

-- Crear usuario con contraseña
CREATE USER 'diveconnect_user'@'localhost' 
IDENTIFIED BY 'DiveConnect2025!';

-- Dar permisos SOLO sobre diveconnect_db
GRANT ALL PRIVILEGES ON diveconnect_db.* 
TO 'diveconnect_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Verificar usuario
SELECT User, Host FROM mysql.user 
WHERE User = 'diveconnect_user';
```

### 3.2 Verificar

Deberías ver en el resultado:

| User | Host |
|------|------|
| diveconnect_user | localhost |

---

## PASO 4: PROBAR LA CONEXIÓN

### 4.1 Crear Nueva Conexión en Workbench

1. En la pantalla principal de Workbench, click en **[+]** junto a "MySQL Connections"
2. Configura:
   - **Connection Name:** `DiveConnect Local`
   - **Hostname:** `localhost`
   - **Port:** `3306`
   - **Username:** `diveconnect_user`
3. Click en **Test Connection**
4. Ingresa la contraseña: `DiveConnect2025!`
5. Deberías ver: **"Successfully made the MySQL connection"**
6. Click en **OK** y luego **OK** para guardar

### 4.2 Conectar con el Nuevo Usuario

1. Doble click en **"DiveConnect Local"**
2. Ingresa la contraseña
3. Deberías conectarte y ver solo `diveconnect_db` en SCHEMAS

---

## PASO 5: CONFIGURAR APPLICATION.PROPERTIES

### 5.1 Abrir el Archivo en VS Code

Navega a: `src/main/resources/application.properties`

### 5.2 Reemplazar TODO el Contenido

**BORRA** todo lo que hay y **PEGA** esto:

```properties
# ===============================
# CONFIGURACIÓN DEL SERVIDOR
# ===============================
server.port=8080
spring.application.name=DiveConnect

# ===============================
# MYSQL DATABASE CONFIGURATION
# ===============================
spring.datasource.url=jdbc:mysql://localhost:3306/diveconnect_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=diveconnect_user
spring.datasource.password=DiveConnect2025!
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ===============================
# JPA / HIBERNATE CONFIGURATION
# ===============================
# Opciones de ddl-auto:
# - create: Borra y crea tablas cada vez (PELIGRO: Borra datos)
# - create-drop: Crea al iniciar, borra al cerrar
# - update: Actualiza esquema sin borrar datos (RECOMENDADO para desarrollo)
# - validate: Solo valida que el esquema coincida
# - none: No hace nada automáticamente
spring.jpa.hibernate.ddl-auto=update

# Mostrar consultas SQL en consola
spring.jpa.show-sql=true

# Formatear consultas SQL para legibilidad
spring.jpa.properties.hibernate.format_sql=true

# Dialecto MySQL
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Manejo de LOBs
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

# ===============================
# MULTIPART (ARCHIVOS)
# ===============================
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
spring.servlet.multipart.file-size-threshold=2KB

# ===============================
# LOGGING CONFIGURATION
# ===============================
logging.level.org.springframework.web=INFO
logging.level.com.diveconnect=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# ===============================
# JWT CONFIGURATION
# ===============================
# IMPORTANTE: Cambia este secret en producción
jwt.secret=DiveConnect2025SecretKeyForJWTTokenGenerationMustBeLongEnoughToBeSecure
jwt.expiration=86400000

# ===============================
# FILE UPLOAD CONFIGURATION
# ===============================
file.upload-dir=uploads
```

### 5.3 Guardar el Archivo

`Ctrl+S` o `Cmd+S`

### 5.4 Explicación de Configuraciones Importantes

#### **ddl-auto=update**
- Crea tablas automáticamente cuando detecta entidades
- **NO borra** datos existentes
- Actualiza estructura si cambias entidades
- **Ideal para desarrollo**

#### **show-sql=true**
- Muestra todas las consultas SQL en la consola
- Útil para debugging
- Desactiva en producción

#### **jwt.secret**
- Llave para firmar tokens JWT
- **DEBE SER LARGA** (mínimo 256 bits)
- **CÁMBIALA en producción**

#### **file.upload-dir**
- Carpeta donde se guardarán archivos subidos
- Ruta relativa al proyecto

---

## PASO 6: VERIFICAR CONEXIÓN DESDE SPRING BOOT

### 6.1 Crear Entidad de Prueba

Vamos a crear una entidad simple para verificar que Hibernate conecta con MySQL.

En VS Code, crea un archivo:

**Ubicación:** `src/main/java/com/diveconnect/entity/PruebaConexion.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "prueba_conexion")
@Data
public class PruebaConexion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String mensaje;
}
```

### 6.2 Ejecutar la Aplicación

#### Opción A: Desde VS Code

1. Abre `DiveConnectApplication.java`
2. Verás un botón **"Run"** sobre la clase
3. Click en **"Run"**

#### Opción B: Desde Terminal

```bash
mvn spring-boot:run
```

### 6.3 ¿Qué Deberías Ver?

La aplicación **NO arrancará completamente** porque Spring Security bloqueará todo, PERO deberías ver:

```
...
Hibernate: create table prueba_conexion (...)
...
Started DiveConnectApplication in X.XXX seconds
```

Si ves esto, **¡PERFECTO!** La conexión funciona.

### 6.4 Detener la Aplicación

Presiona `Ctrl+C` en la terminal

### 6.5 Verificar en MySQL Workbench

1. En Workbench, conecta con `DiveConnect Local`
2. En el panel izquierdo, expande `diveconnect_db`
3. Expande **Tables**
4. Deberías ver: **prueba_conexion**

### 6.6 Eliminar la Tabla de Prueba

Ejecuta en Workbench:

```sql
USE diveconnect_db;
DROP TABLE IF EXISTS prueba_conexion;
```

### 6.7 Eliminar el Archivo de Prueba

Borra: `src/main/java/com/diveconnect/entity/PruebaConexion.java`

---

## PASO 7: CONFIGURACIÓN OPCIONAL DE MYSQL WORKBENCH

### 7.1 Configurar Editor SQL

Para facilitar el trabajo:

1. En Workbench: `Edit` → `Preferences`
2. `SQL Editor`
3. Activa:
   - ✅ "Safe Updates"
   - ✅ "SQL_MODE = TRADITIONAL"
4. Aumenta "Query Result: Limit Rows" a 5000

### 7.2 Crear Snippets Útiles

En una Query Tab, guarda estos comandos comunes:

```sql
-- Ver todas las tablas
USE diveconnect_db;
SHOW TABLES;

-- Ver estructura de una tabla
DESCRIBE nombre_tabla;

-- Contar registros
SELECT COUNT(*) FROM nombre_tabla;

-- Ver todos los datos de una tabla
SELECT * FROM nombre_tabla;

-- Limpiar una tabla (borrar datos)
TRUNCATE TABLE nombre_tabla;

-- Borrar una tabla completamente
DROP TABLE IF EXISTS nombre_tabla;
```

---

## PASO 8: CREAR ARCHIVO .env (OPCIONAL - SEGURIDAD)

### ⚠️ NOTA DE SEGURIDAD

Es **mala práctica** tener contraseñas en `application.properties` si compartes el código.

### Alternativa: Variables de Entorno

#### 8.1 Modificar application.properties

Cambia estas líneas:

```properties
spring.datasource.username=${DB_USERNAME:diveconnect_user}
spring.datasource.password=${DB_PASSWORD:DiveConnect2025!}
jwt.secret=${JWT_SECRET:DiveConnect2025SecretKeyForJWTTokenGenerationMustBeLongEnoughToBeSecure}
```

#### 8.2 Crear archivo .env.local

En la raíz del proyecto:

```
DB_USERNAME=diveconnect_user
DB_PASSWORD=DiveConnect2025!
JWT_SECRET=DiveConnect2025SecretKeyForJWTTokenGenerationMustBeLongEnoughToBeSecure
```

#### 8.3 Añadir a .gitignore

```
.env.local
.env
```

**Nota:** Esto requiere configuración adicional que veremos más adelante si es necesario.

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada ítem:

- [ ] MySQL Workbench conecta al servidor
- [ ] Base de datos `diveconnect_db` creada
- [ ] Usuario `diveconnect_user` creado
- [ ] Conexión "DiveConnect Local" funciona en Workbench
- [ ] `application.properties` configurado
- [ ] Spring Boot arranca y crea tablas
- [ ] Tabla de prueba se creó en MySQL
- [ ] Archivo de prueba eliminado

---

## 🎉 COMPLETADO

¡MySQL está configurado y conectado con Spring Boot!

**➡️ Siguiente paso:** [`04_ENTIDADES.md`](04_ENTIDADES.md)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Access denied for user"
**Causas posibles:**
1. Contraseña incorrecta
2. Usuario no creado
3. Usuario no tiene permisos

**Solución:**
```sql
-- Recrear usuario
DROP USER IF EXISTS 'diveconnect_user'@'localhost';
CREATE USER 'diveconnect_user'@'localhost' IDENTIFIED BY 'DiveConnect2025!';
GRANT ALL PRIVILEGES ON diveconnect_db.* TO 'diveconnect_user'@'localhost';
FLUSH PRIVILEGES;
```

### Error: "Communications link failure"
**Solución:**
1. Verifica que MySQL esté corriendo:
   - Windows: Servicios → MySQL80
   - Mac/Linux: `sudo systemctl status mysql`
2. Verifica el puerto en `application.properties`: debe ser 3306

### Error: "Unknown database 'diveconnect_db'"
**Solución:** La base de datos no existe
```sql
CREATE DATABASE diveconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Error: "Table doesn't exist" al ejecutar Spring Boot
**Normal** si es la primera vez. Spring creará las tablas automáticamente.

### Spring Boot no arranca
**Verifica:**
1. MySQL está corriendo
2. Credenciales correctas en `application.properties`
3. Base de datos existe
4. Revisa logs en consola para error específico

### Error: "The server time zone value 'XXX' is unrecognized"
**Solución:** Ya está en el URL:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/diveconnect_db?serverTimezone=UTC
```

### No veo tablas en Workbench después de ejecutar Spring Boot
**Solución:**
1. Click derecho en **Tables**
2. **Refresh All**
3. O presiona F5

---

## 📚 RECURSOS ADICIONALES

- **MySQL Docs:** https://dev.mysql.com/doc/
- **Spring Data JPA:** https://spring.io/projects/spring-data-jpa
- **Hibernate Docs:** https://hibernate.org/orm/documentation/

---

**⏭️ Continúa con:** [`04_ENTIDADES.md`](04_ENTIDADES.md)
