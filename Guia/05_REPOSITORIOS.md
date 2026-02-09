# 05 - REPOSITORIOS JPA

## 🎯 Objetivo
Crear los repositorios que permiten realizar operaciones CRUD en la base de datos.

---

## ¿QUÉ ES UN REPOSITORIO?

Un repositorio es una interfaz que proporciona métodos para:
- Crear (Create)
- Leer (Read)
- Actualizar (Update)
- Eliminar (Delete)

Spring Data JPA genera automáticamente la implementación.

---

## CREAR PAQUETE REPOSITORY

En `src/main/java/com/diveconnect/`, crea la carpeta `repository`

---

## REPOSITORIO 1: UsuarioRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/UsuarioRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.TipoUsuario;
import com.diveconnect.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Buscar por username
    Optional<Usuario> findByUsername(String username);
    
    // Buscar por email
    Optional<Usuario> findByEmail(String email);
    
    // Verificar si username existe
    Boolean existsByUsername(String username);
    
    // Verificar si email existe
    Boolean existsByEmail(String email);
    
    // Buscar por tipo de usuario
    List<Usuario> findByTipoUsuario(TipoUsuario tipoUsuario);
    
    // Buscar usuarios activos
    List<Usuario> findByActivoTrue();
    
    // Consulta personalizada: empresas activas
    @Query("SELECT u FROM Usuario u WHERE u.tipoUsuario = 'USUARIO_EMPRESA' AND u.activo = true")
    List<Usuario> findEmpresasActivas();
    
    // Búsqueda por palabra clave en nombre o empresa
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.nombreEmpresa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Usuario> buscarPorNombre(@Param("keyword") String keyword);
}
```

---

## REPOSITORIO 2: PublicacionRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/PublicacionRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.Publicacion;
import com.diveconnect.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    
    // Publicaciones de un usuario (ordenadas por fecha)
    List<Publicacion> findByUsuarioOrderByFechaPublicacionDesc(Usuario usuario);
    
    // Todas las publicaciones (paginadas)
    Page<Publicacion> findAllByOrderByFechaPublicacionDesc(Pageable pageable);
    
    // Feed de publicaciones de usuarios seguidos
    @Query("SELECT p FROM Publicacion p WHERE p.usuario IN :usuarios ORDER BY p.fechaPublicacion DESC")
    Page<Publicacion> findPublicacionesDeSeguidos(@Param("usuarios") List<Usuario> usuarios, Pageable pageable);
    
    // Buscar publicaciones por contenido o lugar
    @Query("SELECT p FROM Publicacion p WHERE LOWER(p.contenido) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.lugarInmersion) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Publicacion> buscarPorContenido(@Param("keyword") String keyword);
    
    // Contar publicaciones de un usuario
    Long countByUsuario(Usuario usuario);
}
```

---

## REPOSITORIO 3: ComentarioRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/ComentarioRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.Comentario;
import com.diveconnect.entity.Publicacion;
import com.diveconnect.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    
    // Comentarios de una publicación
    List<Comentario> findByPublicacionOrderByFechaComentarioDesc(Publicacion publicacion);
    
    // Comentarios de un usuario
    List<Comentario> findByUsuarioOrderByFechaComentarioDesc(Usuario usuario);
    
    // Contar comentarios de una publicación
    Long countByPublicacion(Publicacion publicacion);
    
    // Contar comentarios de un usuario
    Long countByUsuario(Usuario usuario);
}
```

---

## REPOSITORIO 4: CentroBuceoRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/CentroBuceoRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.CentroBuceo;
import com.diveconnect.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CentroBuceoRepository extends JpaRepository<CentroBuceo, Long> {
    
    // Buscar centro por usuario asociado
    Optional<CentroBuceo> findByUsuario(Usuario usuario);
    
    // Centros activos
    List<CentroBuceo> findByActivoTrue();
    
    // Buscar por ciudad
    List<CentroBuceo> findByCiudad(String ciudad);
    
    // Buscar por país
    List<CentroBuceo> findByPais(String pais);
    
    // Búsqueda por nombre o ciudad
    @Query("SELECT c FROM CentroBuceo c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.ciudad) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<CentroBuceo> buscarPorNombreOCiudad(@Param("keyword") String keyword);
    
    // Centros mejor valorados
    @Query("SELECT c FROM CentroBuceo c WHERE c.activo = true ORDER BY c.valoracionPromedio DESC")
    List<CentroBuceo> findTopRated();
}
```

---

## REPOSITORIO 5: InmersionRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/InmersionRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.CentroBuceo;
import com.diveconnect.entity.Inmersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InmersionRepository extends JpaRepository<Inmersion, Long> {
    
    // Inmersiones activas de un centro
    List<Inmersion> findByCentroBuceoAndActivaTrue(CentroBuceo centroBuceo);
    
    // Todas las inmersiones activas ordenadas por fecha
    List<Inmersion> findByActivaTrueOrderByFechaInmersionAsc();
    
    // Inmersiones próximas desde una fecha
    @Query("SELECT i FROM Inmersion i WHERE i.activa = true AND i.fechaInmersion >= :fechaInicio")
    List<Inmersion> findInmersionesProximas(@Param("fechaInicio") LocalDateTime fechaInicio);
    
    // Inmersiones con plazas disponibles
    @Query("SELECT i FROM Inmersion i WHERE i.activa = true AND i.plazasDisponibles > 0 ORDER BY i.fechaInmersion ASC")
    List<Inmersion> findInmersionesDisponibles();
    
    // Buscar por título o ubicación
    @Query("SELECT i FROM Inmersion i WHERE LOWER(i.titulo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(i.ubicacion) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Inmersion> buscarPorTituloOUbicacion(@Param("keyword") String keyword);
}
```

---

## REPOSITORIO 6: ReservaRepository

**Ubicación:** `src/main/java/com/diveconnect/repository/ReservaRepository.java`

```java
package com.diveconnect.repository;

import com.diveconnect.entity.CentroBuceo;
import com.diveconnect.entity.EstadoReserva;
import com.diveconnect.entity.Inmersion;
import com.diveconnect.entity.Reserva;
import com.diveconnect.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    // Reservas de un usuario
    List<Reserva> findByUsuarioOrderByFechaReservaDesc(Usuario usuario);
    
    // Reservas de un centro
    List<Reserva> findByCentroBuceoOrderByFechaReservaDesc(CentroBuceo centroBuceo);
    
    // Reservas de una inmersión específica
    List<Reserva> findByInmersion(Inmersion inmersion);
    
    // Buscar por estado
    List<Reserva> findByEstado(EstadoReserva estado);
    
    // Reservas de un usuario con estado específico
    List<Reserva> findByUsuarioAndEstado(Usuario usuario, EstadoReserva estado);
    
    // Contar reservas confirmadas de una inmersión
    Long countByInmersionAndEstado(Inmersion inmersion, EstadoReserva estado);
}
```

---

## VERIFICACIÓN

### Compilar

```bash
mvn clean compile
```

### Verificar Sintaxis

Los repositorios son **interfaces**, no clases. No tienen implementación porque Spring Data JPA la genera automáticamente.

---

## ✅ CHECKLIST

- [ ] UsuarioRepository creado
- [ ] PublicacionRepository creado
- [ ] ComentarioRepository creado
- [ ] CentroBuceoRepository creado
- [ ] InmersionRepository creado
- [ ] ReservaRepository creado
- [ ] Proyecto compila correctamente

---

**➡️ Siguiente:** [`06_DTOS.md`](06_DTOS.md)
