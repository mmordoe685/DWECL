# 📘 GUÍA COMPLETA DIVECONNECT - RESUMEN EJECUTIVO

## 🚀 INICIO RÁPIDO - PASOS ESENCIALES

Esta guía resumida te permite crear todo el proyecto paso a paso.
Para detalles completos, consulta los documentos individuales.

---

## PARTE 1: CONFIGURACIÓN (30 min)

### 1. Verificar Requisitos
```bash
java -version    # Debe ser 17+
mvn -version     # Debe estar instalado
mysql --version  # Debe ser 8.0+
```

### 2. Crear Proyecto Spring Boot
- Ve a https://start.spring.io/
- Configuración:
  - Maven, Java 17, Spring Boot 3.2.1
  - Group: com.diveconnect
  - Artifact: diveconnect
- Dependencias: Web, JPA, MySQL, Security, Validation, Lombok, DevTools
- Genera y descarga
- Abre en VS Code

### 3. Configurar MySQL
```sql
CREATE DATABASE diveconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'diveconnect_user'@'localhost' IDENTIFIED BY 'DiveConnect2025!';
GRANT ALL PRIVILEGES ON diveconnect_db.* TO 'diveconnect_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configurar application.properties
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/diveconnect_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=diveconnect_user
spring.datasource.password=DiveConnect2025!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=DiveConnect2025SecretKeyForJWT
jwt.expiration=86400000
```

---

## PARTE 2: CÓDIGO COMPLETO DEL BACKEND

### ESTRUCTURA DE CARPETAS
```
src/main/java/com/diveconnect/
├── config/
├── controller/
├── dto/request/
├── dto/response/
├── entity/
├── exception/
├── repository/
├── security/
└── service/
```

---

## ENTIDADES (6 archivos + 2 enums)

Ya están documentadas en [`04_ENTIDADES.md`](04_ENTIDADES.md)

---

## REPOSITORIOS (6 archivos)

Ya están documentados en [`05_REPOSITORIOS.md`](05_REPOSITORIOS.md)

---

## DTOS - Data Transfer Objects

### Crear paquetes dto/request y dto/response

### DTOs REQUEST (Entrada de datos)

#### RegistroRequest.java
```java
package com.diveconnect.dto.request;

import com.diveconnect.entity.TipoUsuario;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistroRequest {
    @NotBlank @Size(min = 3, max = 50)
    private String username;
    
    @NotBlank @Email
    private String email;
    
    @NotBlank @Size(min = 6)
    private String password;
    
    private TipoUsuario tipoUsuario = TipoUsuario.USUARIO_COMUN;
    private String nombreEmpresa;
    private String descripcionEmpresa;
    private String direccion;
    private String telefono;
    private String sitioWeb;
}
```

#### LoginRequest.java
```java
package com.diveconnect.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String usernameOrEmail;
    
    @NotBlank
    private String password;
}
```

#### PublicacionRequest.java
```java
package com.diveconnect.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PublicacionRequest {
    @NotBlank
    private String contenido;
    private String imagenUrl;
    private String videoUrl;
    private String lugarInmersion;
    private Double profundidadMaxima;
    private Double temperaturaAgua;
    private Double visibilidad;
    private String especiesVistas;
}
```

#### ComentarioRequest.java
```java
package com.diveconnect.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComentarioRequest {
    @NotBlank
    private String contenido;
}
```

#### InmersionRequest.java
```java
package com.diveconnect.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InmersionRequest {
    @NotBlank
    private String titulo;
    private String descripcion;
    
    @NotNull
    private LocalDateTime fechaInmersion;
    
    @NotNull
    private Integer duracion;
    private Double profundidadMaxima;
    private String nivelRequerido;
    
    @NotNull
    private Double precio;
    
    @NotNull
    private Integer plazasTotales;
    private String ubicacion;
    private Double latitud;
    private Double longitud;
    private String equipoIncluido;
    private String imagenUrl;
}
```

#### ReservaRequest.java
```java
package com.diveconnect.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReservaRequest {
    @NotNull
    private Long inmersionId;
    
    @NotNull @Min(1)
    private Integer numeroPersonas;
    private String observaciones;
}
```

### DTOs RESPONSE (Salida de datos)

#### UsuarioResponse.java
```java
package com.diveconnect.dto.response;

import com.diveconnect.entity.TipoUsuario;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UsuarioResponse {
    private Long id;
    private String username;
    private String email;
    private String biografia;
    private String fotoPerfil;
    private String nivelCertificacion;
    private Integer numeroInmersiones;
    private TipoUsuario tipoUsuario;
    private Boolean activo;
    private LocalDateTime fechaRegistro;
    
    // Para empresas
    private String nombreEmpresa;
    private String descripcionEmpresa;
    private String direccion;
    private String telefono;
    private String sitioWeb;
    
    // Estadísticas
    private Integer numeroSeguidores;
    private Integer numeroSiguiendo;
    private Integer numeroPublicaciones;
}
```

#### AuthResponse.java
```java
package com.diveconnect.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String tipo = "Bearer";
    private UsuarioResponse usuario;
    
    public AuthResponse(String token, UsuarioResponse usuario) {
        this.token = token;
        this.usuario = usuario;
    }
}
```

Continúa en el siguiente archivo con más DTOs Response...

---

## EXCEPCIONES

### Crear paquete exception

#### ResourceNotFoundException.java
```java
package com.diveconnect.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

#### GlobalExceptionHandler.java
```java
package com.diveconnect.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", ex.getMessage());
        response.put("status", HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("message", "Error interno del servidor");
        response.put("details", ex.getMessage());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

## CONTINUARÁ...

Este documento es parte 1. Los siguientes archivos contienen:
- Servicios completos (UsuarioService, PublicacionService, etc.)
- Controladores REST
- Configuración de Seguridad JWT
- Colecciones de Postman
- Scripts de prueba

**Revisa los documentos individuales para código completo de cada componente.**

---

## ⏭️ SIGUIENTE PASO

Continúa creando los servicios y controladores siguiendo los documentos detallados.
Para testing, ve directamente a [`10_TESTING_POSTMAN.md`](10_TESTING_POSTMAN.md)

