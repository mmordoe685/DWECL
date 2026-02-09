# 💻 CÓDIGO COMPLETO DEL BACKEND - DIVECONNECT

Este documento contiene TODO el código necesario para el backend.
Copia cada archivo exactamente como aparece aquí.

---

## 📂 TABLA DE CONTENIDOS

1. [DTOs Response](#dtos-response)
2. [Servicios](#servicios)
3. [Configuración de Seguridad](#seguridad)
4. [Controladores](#controladores)
5. [Configuración CORS](#cors)

---

## DTOS RESPONSE

### PublicacionResponse.java
**Ubicación:** `src/main/java/com/diveconnect/dto/response/PublicacionResponse.java`

```java
package com.diveconnect.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PublicacionResponse {
    private Long id;
    private String contenido;
    private String imagenUrl;
    private String videoUrl;
    private String lugarInmersion;
    private Double profundidadMaxima;
    private Double temperaturaAgua;
    private Double visibilidad;
    private String especiesVistas;
    private LocalDateTime fechaPublicacion;
    private Integer numeroLikes;
    private Integer numeroComentarios;
    private Long usuarioId;
    private String usuarioUsername;
    private String usuarioFotoPerfil;
    private Boolean likedByCurrentUser;
}
```

### ComentarioResponse.java
```java
package com.diveconnect.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComentarioResponse {
    private Long id;
    private String contenido;
    private LocalDateTime fechaComentario;
    private Long usuarioId;
    private String usuarioUsername;
    private String usuarioFotoPerfil;
    private Long publicacionId;
}
```

### InmersionResponse.java
```java
package com.diveconnect.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InmersionResponse {
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaInmersion;
    private Integer duracion;
    private Double profundidadMaxima;
    private String nivelRequerido;
    private Double precio;
    private Integer plazasDisponibles;
    private Integer plazasTotales;
    private String ubicacion;
    private Double latitud;
    private Double longitud;
    private String equipoIncluido;
    private String imagenUrl;
    private Boolean activa;
    private LocalDateTime fechaCreacion;
    private Long centroBuceoId;
    private String centroBuceoNombre;
    private String centrobuceoCiudad;
}
```

### ReservaResponse.java
```java
package com.diveconnect.dto.response;

import com.diveconnect.entity.EstadoReserva;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservaResponse {
    private Long id;
    private Integer numeroPersonas;
    private EstadoReserva estado;
    private Double precioTotal;
    private String observaciones;
    private LocalDateTime fechaReserva;
    private Long usuarioId;
    private String usuarioUsername;
    private Long inmersionId;
    private String inmersionTitulo;
    private LocalDateTime inmersionFecha;
    private Long centroBuceoId;
    private String centroBuceoNombre;
}
```

### CentroBuceoResponse.java
```java
package com.diveconnect.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CentroBuceoResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private String direccion;
    private String ciudad;
    private String pais;
    private String telefono;
    private String email;
    private String sitioWeb;
    private String certificaciones;
    private Double latitud;
    private Double longitud;
    private String imagenUrl;
    private Double valoracionPromedio;
    private Boolean activo;
    private LocalDateTime fechaRegistro;
    private Long usuarioId;
    private String usuarioUsername;
}
```

---

## SERVICIOS

### UsuarioService.java
**Ubicación:** `src/main/java/com/diveconnect/service/UsuarioService.java`

```java
package com.diveconnect.service;

import com.diveconnect.dto.request.RegistroRequest;
import com.diveconnect.dto.response.UsuarioResponse;
import com.diveconnect.entity.TipoUsuario;
import com.diveconnect.entity.Usuario;
import com.diveconnect.exception.ResourceNotFoundException;
import com.diveconnect.repository.PublicacionRepository;
import com.diveconnect.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PublicacionRepository publicacionRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioResponse registrarUsuario(RegistroRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El username ya existe");
        }
        
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setTipoUsuario(request.getTipoUsuario() != null ? request.getTipoUsuario() : TipoUsuario.USUARIO_COMUN);
        
        if (usuario.getTipoUsuario() == TipoUsuario.USUARIO_EMPRESA) {
            usuario.setNombreEmpresa(request.getNombreEmpresa());
            usuario.setDescripcionEmpresa(request.getDescripcionEmpresa());
            usuario.setDireccion(request.getDireccion());
            usuario.setTelefono(request.getTelefono());
            usuario.setSitioWeb(request.getSitioWeb());
        }

        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertirAResponse(savedUsuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPerfil(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return convertirAResponse(usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPerfilPorUsername(String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return convertirAResponse(usuario);
    }

    @Transactional
    public void seguirUsuario(Long seguidorId, Long seguidoId) {
        Usuario seguidor = usuarioRepository.findById(seguidorId)
                .orElseThrow(() -> new ResourceNotFoundException("Seguidor no encontrado"));
        Usuario seguido = usuarioRepository.findById(seguidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario a seguir no encontrado"));

        if (seguidorId.equals(seguidoId)) {
            throw new RuntimeException("No puedes seguirte a ti mismo");
        }

        seguidor.getSiguiendo().add(seguido);
        usuarioRepository.save(seguidor);
    }

    @Transactional
    public void dejarDeSeguir(Long seguidorId, Long seguidoId) {
        Usuario seguidor = usuarioRepository.findById(seguidorId)
                .orElseThrow(() -> new ResourceNotFoundException("Seguidor no encontrado"));
        Usuario seguido = usuarioRepository.findById(seguidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        seguidor.getSiguiendo().remove(seguido);
        usuarioRepository.save(seguidor);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> buscarUsuarios(String keyword) {
        return usuarioRepository.buscarPorNombre(keyword).stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    private UsuarioResponse convertirAResponse(Usuario usuario) {
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setUsername(usuario.getUsername());
        response.setEmail(usuario.getEmail());
        response.setBiografia(usuario.getBiografia());
        response.setFotoPerfil(usuario.getFotoPerfil());
        response.setNivelCertificacion(usuario.getNivelCertificacion());
        response.setNumeroInmersiones(usuario.getNumeroInmersiones());
        response.setTipoUsuario(usuario.getTipoUsuario());
        response.setActivo(usuario.getActivo());
        response.setFechaRegistro(usuario.getFechaRegistro());
        response.setNombreEmpresa(usuario.getNombreEmpresa());
        response.setDescripcionEmpresa(usuario.getDescripcionEmpresa());
        response.setDireccion(usuario.getDireccion());
        response.setTelefono(usuario.getTelefono());
        response.setSitioWeb(usuario.getSitioWeb());
        response.setNumeroSeguidores(usuario.getSeguidores().size());
        response.setNumeroSiguiendo(usuario.getSiguiendo().size());
        response.setNumeroPublicaciones(publicacionRepository.countByUsuario(usuario).intValue());
        return response;
    }
}
```

**(Los demás servicios PublicacionService, ComentarioService, etc. siguen el mismo patrón.
Por brevedad, consulta los documentos detallados o solicita servicios específicos.)**

---

## SEGURIDAD JWT

### JwtUtil.java
**Ubicación:** `src/main/java/com/diveconnect/security/JwtUtil.java`

```java
package com.diveconnect.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
```

### UserDetailsServiceImpl.java
```java
package com.diveconnect.security;

import com.diveconnect.entity.Usuario;
import com.diveconnect.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .or(() -> usuarioRepository.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                new ArrayList<>()
        );
    }
}
```

### JwtAuthenticationFilter.java
```java
package com.diveconnect.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

### SecurityConfig.java
```java
package com.diveconnect.config;

import com.diveconnect.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
```

---

## CONTROLADORES

### AuthController.java
**Ubicación:** `src/main/java/com/diveconnect/controller/AuthController.java`

```java
package com.diveconnect.controller;

import com.diveconnect.dto.request.LoginRequest;
import com.diveconnect.dto.request.RegistroRequest;
import com.diveconnect.dto.response.AuthResponse;
import com.diveconnect.dto.response.UsuarioResponse;
import com.diveconnect.security.JwtUtil;
import com.diveconnect.security.UserDetailsServiceImpl;
import com.diveconnect.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/registro")
    public ResponseEntity<UsuarioResponse> registrar(@Valid @RequestBody RegistroRequest request) {
        UsuarioResponse usuario = usuarioService.registrarUsuario(request);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsernameOrEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        UsuarioResponse usuario = usuarioService.obtenerPerfilPorUsername(userDetails.getUsername());
        
        return ResponseEntity.ok(new AuthResponse(token, usuario));
    }
}
```

### UsuarioController.java
```java
package com.diveconnect.controller;

import com.diveconnect.dto.response.UsuarioResponse;
import com.diveconnect.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/perfil")
    public ResponseEntity<UsuarioResponse> obtenerPerfilActual(Authentication authentication) {
        String username = authentication.getName();
        UsuarioResponse usuario = usuarioService.obtenerPerfilPorUsername(username);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obtenerPerfil(@PathVariable Long id) {
        UsuarioResponse usuario = usuarioService.obtenerPerfil(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UsuarioResponse> obtenerPerfilPorUsername(@PathVariable String username) {
        UsuarioResponse usuario = usuarioService.obtenerPerfilPorUsername(username);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/{id}/seguir")
    public ResponseEntity<Void> seguir(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        UsuarioResponse usuarioActual = usuarioService.obtenerPerfilPorUsername(username);
        usuarioService.seguirUsuario(usuarioActual.getId(), id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/seguir")
    public ResponseEntity<Void> dejarDeSeguir(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        UsuarioResponse usuarioActual = usuarioService.obtenerPerfilPorUsername(username);
        usuarioService.dejarDeSeguir(usuarioActual.getId(), id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<UsuarioResponse>> buscar(@RequestParam String q) {
        List<UsuarioResponse> usuarios = usuarioService.buscarUsuarios(q);
        return ResponseEntity.ok(usuarios);
    }
}
```

---

## CORS CONFIGURATION

### CorsConfig.java
```java
package com.diveconnect.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

## ✅ RESUMEN

Has creado:
- ✅ DTOs completos (Request y Response)
- ✅ Servicios principales
- ✅ Configuración de Seguridad JWT
- ✅ Controladores REST
- ✅ Configuración CORS

**Próximo paso:** Ejecutar y probar con Postman

---
