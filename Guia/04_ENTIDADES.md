# 04 - ENTIDADES DEL PROYECTO

## 🎯 Objetivo
Crear todas las entidades JPA que representarán las tablas en la base de datos.

---

## 📦 ESTRUCTURA DE PAQUETES

Primero, crea la estructura de carpetas en `src/main/java/com/diveconnect/`:

```
com.diveconnect/
├── entity/              ← Aquí van las entidades
└── DiveConnectApplication.java
```

**Crear carpeta:**
1. Click derecho en `com.diveconnect`
2. `New Folder`
3. Nombre: `entity`

---

## PASO 1: CREAR ENUMERACIONES

Las enumeraciones definen valores constantes.

### 1.1 TipoUsuario.java

**Ubicación:** `src/main/java/com/diveconnect/entity/TipoUsuario.java`

```java
package com.diveconnect.entity;

public enum TipoUsuario {
    USUARIO_COMUN,      // Usuario normal de la plataforma
    USUARIO_EMPRESA,    // Centro de buceo / Empresa
    ADMINISTRADOR       // Administrador del sistema
}
```

**Cómo crear:**
1. Click derecho en carpeta `entity`
2. `New File`
3. Nombre: `TipoUsuario.java`
4. Copia y pega el código completo

### 1.2 EstadoReserva.java

**Ubicación:** `src/main/java/com/diveconnect/entity/EstadoReserva.java`

```java
package com.diveconnect.entity;

public enum EstadoReserva {
    PENDIENTE,    // Reserva creada, esperando confirmación
    CONFIRMADA,   // Reserva confirmada por el centro
    CANCELADA,    // Reserva cancelada
    COMPLETADA    // Inmersión realizada
}
```

---

## PASO 2: ENTIDAD USUARIO

Esta es la entidad principal del sistema.

**Ubicación:** `src/main/java/com/diveconnect/entity/Usuario.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 3, max = 50, message = "El username debe tener entre 3 y 50 caracteres")
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email debe ser válido")
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Column(nullable = false)
    private String password;

    @Column(length = 500)
    private String biografia;

    @Column(name = "foto_perfil")
    private String fotoPerfil;

    @Column(name = "nivel_certificacion", length = 50)
    private String nivelCertificacion;

    @Column(name = "numero_inmersiones")
    private Integer numeroInmersiones = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoUsuario tipoUsuario = TipoUsuario.USUARIO_COMUN;

    @Column(nullable = false)
    private Boolean activo = true;

    @CreationTimestamp
    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    @UpdateTimestamp
    @Column(name = "ultima_actualizacion")
    private LocalDateTime ultimaActualizacion;

    // ==============================================
    // RELACIONES
    // ==============================================

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Publicacion> publicaciones = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserva> reservas = new ArrayList<>();

    // Usuarios que este usuario sigue
    @ManyToMany
    @JoinTable(
        name = "seguidores",
        joinColumns = @JoinColumn(name = "seguidor_id"),
        inverseJoinColumns = @JoinColumn(name = "seguido_id")
    )
    private Set<Usuario> siguiendo = new HashSet<>();

    // Usuarios que siguen a este usuario
    @ManyToMany(mappedBy = "siguiendo")
    private Set<Usuario> seguidores = new HashSet<>();

    // ==============================================
    // CAMPOS ADICIONALES PARA EMPRESAS
    // ==============================================

    @Column(name = "nombre_empresa", length = 100)
    private String nombreEmpresa;

    @Column(name = "descripcion_empresa", length = 1000)
    private String descripcionEmpresa;

    @Column(length = 200)
    private String direccion;

    @Column(length = 20)
    private String telefono;

    @Column(length = 200)
    private String sitioWeb;
}
```

### 📝 Explicación de Anotaciones

- `@Entity`: Marca la clase como entidad JPA
- `@Table(name = "usuarios")`: Nombre de la tabla en MySQL
- `@Data`: Lombok genera getters, setters, toString, etc.
- `@NoArgsConstructor`: Constructor sin parámetros
- `@AllArgsConstructor`: Constructor con todos los parámetros
- `@Id`: Clave primaria
- `@GeneratedValue`: Auto-incremento
- `@Column`: Configuración de columna
- `@NotBlank`: Validación - no puede ser nulo o vacío
- `@Email`: Validación de formato email
- `@Enumerated(EnumType.STRING)`: Guarda el enum como String
- `@CreationTimestamp`: Fecha automática de creación
- `@UpdateTimestamp`: Fecha automática de actualización
- `@OneToMany`: Relación uno a muchos
- `@ManyToMany`: Relación muchos a muchos

---

## PASO 3: ENTIDAD PUBLICACION

**Ubicación:** `src/main/java/com/diveconnect/entity/Publicacion.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "publicaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El contenido es obligatorio")
    @Column(nullable = false, length = 2000)
    private String contenido;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "lugar_inmersion", length = 200)
    private String lugarInmersion;

    @Column(name = "profundidad_maxima")
    private Double profundidadMaxima;

    @Column(name = "temperatura_agua")
    private Double temperaturaAgua;

    @Column(name = "visibilidad")
    private Double visibilidad;

    @Column(name = "especies_vistas", length = 500)
    private String especiesVistas;

    @CreationTimestamp
    @Column(name = "fecha_publicacion", updatable = false)
    private LocalDateTime fechaPublicacion;

    @Column(name = "numero_likes")
    private Integer numeroLikes = 0;

    @Column(name = "numero_comentarios")
    private Integer numeroComentarios = 0;

    // ==============================================
    // RELACIONES
    // ==============================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "publicacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "likes_publicacion",
        joinColumns = @JoinColumn(name = "publicacion_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<Usuario> likes = new HashSet<>();
}
```

---

## PASO 4: ENTIDAD COMENTARIO

**Ubicación:** `src/main/java/com/diveconnect/entity/Comentario.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El contenido del comentario es obligatorio")
    @Column(nullable = false, length = 500)
    private String contenido;

    @CreationTimestamp
    @Column(name = "fecha_comentario", updatable = false)
    private LocalDateTime fechaComentario;

    // ==============================================
    // RELACIONES
    // ==============================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publicacion_id", nullable = false)
    private Publicacion publicacion;
}
```

---

## PASO 5: ENTIDAD CENTRO DE BUCEO

**Ubicación:** `src/main/java/com/diveconnect/entity/CentroBuceo.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centros_buceo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CentroBuceo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    @Column(nullable = false, length = 200)
    private String direccion;

    @Column(length = 100)
    private String ciudad;

    @Column(length = 50)
    private String pais;

    @Column(length = 20)
    private String telefono;

    @Column(length = 100)
    private String email;

    @Column(name = "sitio_web", length = 200)
    private String sitioWeb;

    @Column(length = 500)
    private String certificaciones;

    @Column
    private Double latitud;

    @Column
    private Double longitud;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "valoracion_promedio")
    private Double valoracionPromedio = 0.0;

    @Column(nullable = false)
    private Boolean activo = true;

    @CreationTimestamp
    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    // ==============================================
    // RELACIONES
    // ==============================================

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "centroBuceo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inmersion> inmersiones = new ArrayList<>();

    @OneToMany(mappedBy = "centroBuceo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserva> reservas = new ArrayList<>();
}
```

---

## PASO 6: ENTIDAD INMERSION

**Ubicación:** `src/main/java/com/diveconnect/entity/Inmersion.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inmersiones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inmersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(length = 1000)
    private String descripcion;

    @NotNull(message = "La fecha de inmersión es obligatoria")
    @Column(name = "fecha_inmersion", nullable = false)
    private LocalDateTime fechaInmersion;

    @Column(nullable = false)
    private Integer duracion; // en minutos

    @Column(name = "profundidad_maxima")
    private Double profundidadMaxima;

    @Column(name = "nivel_requerido", length = 50)
    private String nivelRequerido;

    @Column(nullable = false)
    private Double precio;

    @Column(name = "plazas_disponibles")
    private Integer plazasDisponibles;

    @Column(name = "plazas_totales")
    private Integer plazasTotales;

    @Column(length = 200)
    private String ubicacion;

    @Column
    private Double latitud;

    @Column
    private Double longitud;

    @Column(name = "equipo_incluido", length = 500)
    private String equipoIncluido;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(nullable = false)
    private Boolean activa = true;

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    // ==============================================
    // RELACIONES
    // ==============================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centro_buceo_id", nullable = false)
    private CentroBuceo centroBuceo;

    @OneToMany(mappedBy = "inmersion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserva> reservas = new ArrayList<>();
}
```

---

## PASO 7: ENTIDAD RESERVA

**Ubicación:** `src/main/java/com/diveconnect/entity/Reserva.java`

```java
package com.diveconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_personas", nullable = false)
    private Integer numeroPersonas = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoReserva estado = EstadoReserva.PENDIENTE;

    @Column(name = "precio_total", nullable = false)
    private Double precioTotal;

    @Column(length = 500)
    private String observaciones;

    @CreationTimestamp
    @Column(name = "fecha_reserva", updatable = false)
    private LocalDateTime fechaReserva;

    @UpdateTimestamp
    @Column(name = "ultima_modificacion")
    private LocalDateTime ultimaModificacion;

    // ==============================================
    // RELACIONES
    // ==============================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inmersion_id", nullable = false)
    private Inmersion inmersion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centro_buceo_id", nullable = false)
    private CentroBuceo centroBuceo;
}
```

---

## VERIFICACIÓN DE LAS ENTIDADES

### Paso 1: Compilar el Proyecto

En la terminal de VS Code:

```bash
mvn clean compile
```

Deberías ver:
```
BUILD SUCCESS
```

### Paso 2: Ejecutar la Aplicación

```bash
mvn spring-boot:run
```

### Paso 3: Verificar en MySQL Workbench

1. Conecta a `DiveConnect Local`
2. Ejecuta:

```sql
USE diveconnect_db;
SHOW TABLES;
```

**Deberías ver estas tablas:**

- centros_buceo
- comentarios
- inmersiones
- likes_publicacion
- publicaciones
- reservas
- seguidores
- usuarios

### Paso 4: Ver Estructura de una Tabla

```sql
DESCRIBE usuarios;
```

Verás todas las columnas que definiste en la entidad.

### Paso 5: Detener la Aplicación

`Ctrl+C` en la terminal

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] TipoUsuario.java creado
- [ ] EstadoReserva.java creado
- [ ] Usuario.java creado
- [ ] Publicacion.java creado
- [ ] Comentario.java creado
- [ ] CentroBuceo.java creado
- [ ] Inmersion.java creado
- [ ] Reserva.java creado
- [ ] Proyecto compila sin errores
- [ ] Todas las tablas se crean en MySQL

---

## 🎉 COMPLETADO

¡Has creado todas las entidades del proyecto!

**➡️ Siguiente paso:** [`05_REPOSITORIOS.md`](05_REPOSITORIOS.md)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot resolve symbol"
**Solución:**
- Click derecho en proyecto
- Maven → Reload Project

### Error al compilar con Lombok
**Solución:**
1. Verifica que la extensión Lombok esté instalada
2. Reinicia VS Code
3. `mvn clean install`

### Tablas no se crean en MySQL
**Verificar:**
- application.properties tiene `ddl-auto=update`
- MySQL está corriendo
- Credenciales correctas

---

**⏭️ Continúa con:** [`05_REPOSITORIOS.md`](05_REPOSITORIOS.md)
