# 🌊 GUÍA COMPLETA DIVECONNECT - Spring Boot + MySQL

## Proyecto de Fin de Grado - Red Social para Submarinismo

---

## 📚 ÍNDICE DE DOCUMENTOS

Esta guía está dividida en documentos modulares para facilitar la navegación:

### **PARTE 1: CONFIGURACIÓN INICIAL**
- [`01_CONFIGURACION_ENTORNO.md`](01_CONFIGURACION_ENTORNO.md) - Preparación del entorno de desarrollo
- [`02_CREACION_PROYECTO.md`](02_CREACION_PROYECTO.md) - Creación del proyecto Spring Boot
- [`03_CONFIGURACION_MYSQL.md`](03_CONFIGURACION_MYSQL.md) - Configuración de MySQL y base de datos

### **PARTE 2: BACKEND - ESTRUCTURA**
- [`04_ENTIDADES.md`](04_ENTIDADES.md) - Todas las entidades del proyecto
- [`05_REPOSITORIOS.md`](05_REPOSITORIOS.md) - Repositorios JPA
- [`06_DTOS.md`](06_DTOS.md) - DTOs Request y Response

### **PARTE 3: BACKEND - LÓGICA DE NEGOCIO**
- [`07_SERVICIOS.md`](07_SERVICIOS.md) - Servicios principales
- [`08_CONTROLADORES.md`](08_CONTROLADORES.md) - Controllers REST API
- [`09_SEGURIDAD_JWT.md`](09_SEGURIDAD_JWT.md) - Configuración de seguridad y JWT

### **PARTE 4: TESTING Y DESPLIEGUE**
- [`10_TESTING_POSTMAN.md`](10_TESTING_POSTMAN.md) - Pruebas con Postman
- [`11_FUNCIONALIDADES_AVANZADAS.md`](11_FUNCIONALIDADES_AVANZADAS.md) - Características adicionales
- [`12_DESPLIEGUE.md`](12_DESPLIEGUE.md) - Despliegue en producción

### **ANEXOS**
- [`ANEXO_A_COMANDOS_RAPIDOS.md`](ANEXO_A_COMANDOS_RAPIDOS.md) - Referencia rápida de comandos
- [`ANEXO_B_TROUBLESHOOTING.md`](ANEXO_B_TROUBLESHOOTING.md) - Solución de problemas comunes
- [`ANEXO_C_ESTRUCTURA_PROYECTO.md`](ANEXO_C_ESTRUCTURA_PROYECTO.md) - Estructura completa del proyecto

---

## 🚀 INICIO RÁPIDO

### Si es la primera vez:
1. Lee [`01_CONFIGURACION_ENTORNO.md`](01_CONFIGURACION_ENTORNO.md)
2. Sigue [`02_CREACION_PROYECTO.md`](02_CREACION_PROYECTO.md)
3. Configura MySQL con [`03_CONFIGURACION_MYSQL.md`](03_CONFIGURACION_MYSQL.md)
4. Continúa en orden numérico

### Si ya tienes el entorno configurado:
- Ve directamente a [`04_ENTIDADES.md`](04_ENTIDADES.md) para empezar con el código

---

## 📋 REQUISITOS PREVIOS

- **Java 17+** instalado
- **Maven 3.6+** instalado
- **MySQL 8.0+** instalado (con MySQL Workbench)
- **Visual Studio Code** con extensiones Java
- **Git** instalado
- **Postman** (opcional pero recomendado)

---

## 🎯 OBJETIVOS DEL PROYECTO

DiveConnect es una **red social y plataforma de gestión** para la comunidad de submarinismo que incluye:

✅ Sistema de registro y autenticación de usuarios (3 tipos: Usuario Común, Empresa, Administrador)
✅ Gestión de perfiles personalizados
✅ Publicaciones con fotos/videos de inmersiones
✅ Sistema de comentarios y "me gusta"
✅ Seguimiento entre usuarios
✅ Gestión de centros de buceo
✅ Reservas de inmersiones y cursos
✅ Directorio de inmersiones disponibles
✅ API REST completa
✅ Seguridad con JWT

---

## 📊 STACK TECNOLÓGICO

**Backend:**
- Spring Boot 3.2.1
- Spring Data JPA
- Spring Security + JWT
- MySQL 8.0
- Lombok
- Validation

**Herramientas:**
- Maven
- Git
- Postman
- MySQL Workbench
- Visual Studio Code

---

## 📁 ESTRUCTURA DEL PROYECTO

```
diveconnect/
├── src/
│   ├── main/
│   │   ├── java/com/diveconnect/
│   │   │   ├── config/              # Configuración (CORS, Security, etc.)
│   │   │   ├── controller/          # REST Controllers
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── request/         # DTOs de entrada
│   │   │   │   └── response/        # DTOs de salida
│   │   │   ├── entity/              # Entidades JPA
│   │   │   ├── exception/           # Manejo de excepciones
│   │   │   ├── repository/          # Repositorios JPA
│   │   │   ├── security/            # JWT y configuración de seguridad
│   │   │   ├── service/             # Lógica de negocio
│   │   │   └── DiveConnectApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/                        # Tests
├── uploads/                         # Archivos subidos
├── pom.xml                          # Dependencias Maven
└── README.md
```

---

## 🔄 FLUJO DE DESARROLLO RECOMENDADO

### **Sprint 1: Base (Semanas 1-2)**
1. Configurar entorno y proyecto
2. Crear entidades y repositorios
3. Implementar DTOs
4. Servicios básicos (Usuario, Autenticación)

### **Sprint 2: Funcionalidad Social (Semanas 3-4)**
5. Publicaciones y comentarios
6. Sistema de likes
7. Seguimiento de usuarios
8. Feed personalizado

### **Sprint 3: Gestión de Inmersiones (Semanas 5-6)**
9. Centros de buceo
10. Inmersiones
11. Sistema de reservas
12. Gestión para empresas

### **Sprint 4: Finalización (Semana 7)**
13. Testing completo
14. Manejo de archivos multimedia
15. Optimización y seguridad
16. Documentación

---

## 🛠️ CÓMO USAR ESTA GUÍA

### **En Visual Studio Code:**

1. **Abre la carpeta del proyecto** (donde guardaste estos archivos .md)
2. **Vista previa de Markdown**: `Ctrl+Shift+V` sobre cualquier archivo .md
3. **Navegación**: Haz clic en los enlaces para saltar entre documentos
4. **Búsqueda global**: `Ctrl+Shift+F` para buscar en todos los documentos
5. **Vista dividida**: Arrastra un archivo al lado para ver dos a la vez

### **Recomendaciones:**

- 📖 **Lee primero el documento completo** antes de empezar a programar
- ✍️ **Copia el código paso a paso** - no te saltes pasos
- ✅ **Verifica cada sección** antes de continuar
- 🔍 **Usa la búsqueda** si necesitas encontrar algo específico
- 💾 **Guarda frecuentemente** tu progreso

---

## 📞 SOPORTE

Si encuentras problemas:
1. Revisa [`ANEXO_B_TROUBLESHOOTING.md`](ANEXO_B_TROUBLESHOOTING.md)
2. Verifica que todos los requisitos previos estén instalados
3. Comprueba que MySQL esté corriendo
4. Revisa los logs de Spring Boot en la consola

---

## 📝 NOTAS IMPORTANTES

⚠️ **Contraseñas de Ejemplo**: Todas las contraseñas en esta guía son ejemplos. Cámbialas en producción.

⚠️ **JWT Secret**: El secret de JWT debe ser diferente en producción.

⚠️ **Base de Datos**: No uses las mismas credenciales en desarrollo y producción.

⚠️ **Commits**: Haz commits frecuentes en Git mientras desarrollas.

---

## ✨ CARACTERÍSTICAS IMPLEMENTADAS

- ✅ Autenticación y autorización con JWT
- ✅ CRUD completo de usuarios
- ✅ Sistema de publicaciones con multimedia
- ✅ Comentarios y likes
- ✅ Seguimiento entre usuarios
- ✅ Gestión de centros de buceo
- ✅ Sistema de reservas
- ✅ API REST documentada
- ✅ Validación de datos
- ✅ Manejo de excepciones
- ✅ Seguridad CORS
- ✅ Paginación
- ✅ Búsquedas

---

## 🎓 CRITERIOS DE EVALUACIÓN CUBIERTOS

Esta guía cubre todos los requisitos funcionales y no funcionales del proyecto:

**RF1** ✅ Registro y autenticación de usuarios
**RF2** ✅ Gestión de perfiles
**RF3** ✅ Reserva online de inmersiones
**RF4** ✅ Publicación de experiencias
**RF5** ✅ Sistema de comentarios
**RF6** ✅ Sistema de "me gusta"
**RF7** ✅ Seguimiento de usuarios
**RF8** ✅ Directorio de centros de buceo

**RNF1** ✅ Seguridad (HTTPS, JWT, bcrypt)
**RNF2** ✅ Rendimiento (JPA, optimizaciones)
**RNF3** ✅ Mantenibilidad (código limpio, documentado)
**RNF4** ✅ Escalabilidad (arquitectura adecuada)

---

## 🚦 COMENZAR AHORA

**➡️ Empieza con:** [`01_CONFIGURACION_ENTORNO.md`](01_CONFIGURACION_ENTORNO.md)

---

**Última actualización:** Febrero 2026
**Versión:** 1.0.0
**Autor:** Guía DiveConnect
