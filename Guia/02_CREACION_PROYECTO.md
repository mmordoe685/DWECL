# 02 - CREACIÓN DEL PROYECTO SPRING BOOT

## 🎯 Objetivo
Crear el proyecto Spring Boot con todas las dependencias necesarias.

---

## MÉTODO 1: USAR SPRING INITIALIZR WEB (RECOMENDADO)

### Paso 1: Ir a Spring Initializr

Abre tu navegador y ve a: **https://start.spring.io/**

### Paso 2: Configurar el Proyecto

Completa los campos **EXACTAMENTE** como se indica:

#### **Project Metadata:**
- **Project:** `Maven` ✅
- **Language:** `Java` ✅
- **Spring Boot:** `3.2.1` (o la última versión 3.x estable) ✅

#### **Project Metadata:**
- **Group:** `com.diveconnect`
- **Artifact:** `diveconnect`
- **Name:** `DiveConnect`
- **Description:** `Red social para comunidad de submarinismo`
- **Package name:** `com.diveconnect` (se genera automáticamente)
- **Packaging:** `Jar` ✅
- **Java:** `17` ✅

### Paso 3: Añadir Dependencias

Haz clic en **"ADD DEPENDENCIES"** y busca/añade **CADA UNA** de estas:

1. **Spring Web**
   - Busca: "web"
   - Selecciona: "Spring Web"

2. **Spring Data JPA**
   - Busca: "jpa"
   - Selecciona: "Spring Data JPA"

3. **MySQL Driver**
   - Busca: "mysql"
   - Selecciona: "MySQL Driver"

4. **Spring Security**
   - Busca: "security"
   - Selecciona: "Spring Security"

5. **Validation**
   - Busca: "validation"
   - Selecciona: "Validation"

6. **Lombok**
   - Busca: "lombok"
   - Selecciona: "Lombok"

7. **Spring Boot DevTools**
   - Busca: "devtools"
   - Selecciona: "Spring Boot DevTools"

### Paso 4: Generar el Proyecto

1. Verifica que tengas **7 dependencias** seleccionadas
2. Haz clic en el botón **"GENERATE"** (parte inferior)
3. Se descargará un archivo: `diveconnect.zip`

### Paso 5: Extraer el Proyecto

1. Ve a tu carpeta de Descargas
2. Encuentra `diveconnect.zip`
3. **Extrae** el archivo en tu carpeta de proyectos:
   - Windows: `C:\Users\TuNombre\Documents\Proyectos\`
   - Mac/Linux: `~/Proyectos/`
4. Deberías tener ahora: `Proyectos/diveconnect/`

---

## MÉTODO 2: CREAR DESDE VS CODE

### Paso 1: Abrir Command Palette

En VS Code, presiona `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (Mac)

### Paso 2: Ejecutar Spring Initializr

Escribe: `Spring Initializr: Create a Maven Project`

### Paso 3: Seguir el Asistente

Responde a cada pregunta:

1. **Spring Boot version:** `3.2.1` (o la última 3.x)
2. **Group Id:** `com.diveconnect`
3. **Artifact Id:** `diveconnect`
4. **Package type:** `Jar`
5. **Java version:** `17`

### Paso 4: Seleccionar Dependencias

Busca y selecciona (con Enter):
- Spring Web
- Spring Data JPA
- MySQL Driver
- Spring Security
- Validation
- Lombok
- Spring Boot DevTools

Presiona `Esc` cuando termines

### Paso 5: Seleccionar Carpeta

Elige dónde guardar el proyecto: `Proyectos/`

---

## ABRIR EL PROYECTO EN VS CODE

### Opción A: Desde VS Code

1. `File` → `Open Folder` (o `Ctrl+K Ctrl+O`)
2. Navega a `Proyectos/diveconnect/`
3. Click en `Seleccionar carpeta`

### Opción B: Desde el Explorador

1. Navega a la carpeta `diveconnect`
2. Click derecho → `Open with Code`

---

## ESPERAR DESCARGA DE DEPENDENCIAS

### ¿Qué está pasando?

Cuando abres el proyecto por primera vez, **Maven descargará automáticamente** todas las dependencias necesarias.

### ¿Cómo saber que está descargando?

En VS Code, mira la **parte inferior derecha**:
- Verás un ícono girando 🔄
- Mensaje: "Importing projects..."
- Barra de progreso

### ¿Cuánto tarda?

- Primera vez: 5-15 minutos (depende de tu conexión)
- Descargas subsiguientes: más rápido

### ⚠️ IMPORTANTE

**NO CIERRES VS CODE** hasta que termine de descargar

---

## VERIFICAR LA ESTRUCTURA DEL PROYECTO

### Paso 1: Expandir Carpetas

En el explorador de VS Code (panel izquierdo), deberías ver:

```
diveconnect/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── diveconnect/
│   │   │           └── DiveConnectApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/
│               └── diveconnect/
│                   └── DiveConnectApplicationTests.java
├── target/
├── .gitignore
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

### Paso 2: Verificar DiveConnectApplication.java

Abre: `src/main/java/com/diveconnect/DiveConnectApplication.java`

Debe contener:

```java
package com.diveconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DiveConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiveConnectApplication.class, args);
    }

}
```

✅ Si ves esto, ¡el proyecto se creó correctamente!

### Paso 3: Verificar pom.xml

Abre: `pom.xml`

Verifica que contenga estas dependencias:

```xml
<dependencies>
    <!-- Spring Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- DevTools -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    
    <!-- Spring Boot Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    
    <!-- Spring Security Test -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## AÑADIR DEPENDENCIA JWT MANUALMENTE

### ⚠️ IMPORTANTE

Spring Initializr **NO incluye JWT**, debemos añadirlo manualmente.

### Paso 1: Abrir pom.xml

### Paso 2: Añadir Dependencia JWT

Dentro de la sección `<dependencies>`, **antes de cerrar `</dependencies>`**, añade:

```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

### Paso 3: Guardar

`Ctrl+S` o `Cmd+S`

### Paso 4: Actualizar Maven

**Opción A:** En VS Code, aparecerá un mensaje "Maven needs to be imported"
- Click en **"Reload Projects"**

**Opción B:** Manual
- Click derecho en `pom.xml`
- `Maven` → `Reload Project`

---

## CREAR CARPETA DE UPLOADS

### Paso 1: Crear Carpeta

En la raíz del proyecto (mismo nivel que `src`), crea una carpeta llamada `uploads`

**Desde VS Code:**
1. Click derecho en el espacio vacío del explorador
2. `New Folder`
3. Nombre: `uploads`

**Desde terminal en VS Code (`Ctrl+ñ`):**

```bash
mkdir uploads
```

### Estructura Final:

```
diveconnect/
├── src/
├── uploads/        ← NUEVA
├── pom.xml
└── ...
```

---

## VERIFICAR QUE TODO FUNCIONA

### Paso 1: Compilar el Proyecto

Abre la terminal en VS Code (`Ctrl+ñ` o `Ctrl+``) y ejecuta:

```bash
mvn clean install
```

### ¿Qué debería pasar?

Verás mucho texto y al final:

```
[INFO] BUILD SUCCESS
[INFO] Total time:  XX s
```

### Si ves errores:

1. Verifica que JAVA_HOME está configurado
2. Verifica que Maven funciona: `mvn -version`
3. Revisa que el `pom.xml` no tenga errores de sintaxis

---

## PROBAR LA APLICACIÓN (TEST INICIAL)

### ⚠️ NOTA IMPORTANTE

**NO PODRÁS** ejecutar la aplicación aún porque:
- No hemos configurado MySQL
- Spring Security bloqueará todo sin configuración

Esto es **NORMAL**. Configuraremos MySQL en el siguiente documento.

---

## INICIALIZAR GIT (OPCIONAL PERO RECOMENDADO)

### Paso 1: Abrir Terminal en VS Code

`Ctrl+ñ` o `Terminal` → `New Terminal`

### Paso 2: Inicializar Repositorio

```bash
git init
git add .
git commit -m "Initial commit: Proyecto DiveConnect creado"
```

### Paso 3: Crear .gitignore (Si no existe)

El archivo `.gitignore` debe existir automáticamente. Si no, créalo con:

```
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/

### Uploads ###
uploads/*
!uploads/.gitkeep

### Logs ###
*.log
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada ítem cuando lo completes:

- [ ] Proyecto creado con Spring Initializr
- [ ] Proyecto abierto en VS Code
- [ ] Maven descargó todas las dependencias
- [ ] `DiveConnectApplication.java` existe
- [ ] `pom.xml` tiene todas las dependencias
- [ ] Dependencia JWT añadida
- [ ] Carpeta `uploads/` creada
- [ ] `mvn clean install` ejecuta correctamente
- [ ] Git inicializado (opcional)

---

## 🎉 COMPLETADO

¡Tu proyecto Spring Boot está creado y listo!

**➡️ Siguiente paso:** [`03_CONFIGURACION_MYSQL.md`](03_CONFIGURACION_MYSQL.md)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Maven not found"
**Solución:** Revisa [`01_CONFIGURACION_ENTORNO.md`](01_CONFIGURACION_ENTORNO.md) sección Maven

### Error: "Failed to execute goal"
**Solución:** 
- Verifica conexión a internet (Maven descarga dependencias)
- Ejecuta: `mvn clean`
- Intenta de nuevo: `mvn install`

### Error: "Cannot resolve symbol SpringBootApplication"
**Solución:** Maven no descargó todo
- Click derecho en `pom.xml`
- Maven → Reload Project

### No veo la carpeta `target/` después de compilar
**Es normal** si no has ejecutado `mvn install` aún

### Lombok no funciona
**Solución:**
1. Verifica que instalaste la extensión "Lombok Annotations Support"
2. Reinicia VS Code
3. En terminal: `mvn clean install`

---

**⏭️ Continúa con:** [`03_CONFIGURACION_MYSQL.md`](03_CONFIGURACION_MYSQL.md)
