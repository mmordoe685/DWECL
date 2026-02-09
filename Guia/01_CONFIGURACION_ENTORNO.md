# 01 - CONFIGURACIÓN DEL ENTORNO

## 🎯 Objetivo
Preparar tu computadora con todas las herramientas necesarias para desarrollar el proyecto DiveConnect.

---

## 📋 LISTA DE VERIFICACIÓN

Antes de empezar, necesitas tener instalado:

- [ ] Java JDK 17 o superior
- [ ] Maven 3.6 o superior
- [ ] MySQL 8.0 o superior
- [ ] MySQL Workbench
- [ ] Visual Studio Code
- [ ] Git
- [ ] Postman (opcional)

---

## 1. VERIFICAR INSTALACIONES EXISTENTES

### 1.1 Abrir Terminal

**Windows:**
- Presiona `Windows + R`
- Escribe `cmd` o `powershell`
- Presiona Enter

**Mac/Linux:**
- Abre la Terminal

### 1.2 Ejecutar Comandos de Verificación

Copia y pega cada comando para verificar:

```bash
# Verificar Java
java -version
```
**Salida esperada:**
```
java version "17.0.x" o superior
```

```bash
# Verificar Maven
mvn -version
```
**Salida esperada:**
```
Apache Maven 3.6.x o superior
```

```bash
# Verificar Git
git --version
```
**Salida esperada:**
```
git version 2.x.x o superior
```

```bash
# Verificar MySQL (puede variar)
mysql --version
```
**Salida esperada:**
```
mysql  Ver 8.0.x o superior
```

---

## 2. INSTALAR JAVA JDK 17

### 2.1 Si NO tienes Java o tienes una versión antigua:

**Opción Recomendada: Eclipse Temurin (Adoptium)**

1. Ve a: https://adoptium.net/
2. Descarga **Temurin 17 (LTS)**
3. Ejecuta el instalador
4. Durante la instalación:
   - ✅ Marca "Set JAVA_HOME variable"
   - ✅ Marca "Add to PATH"
5. Reinicia tu terminal
6. Verifica: `java -version`

### 2.2 Configurar JAVA_HOME (si no se configuró automáticamente)

**Windows:**

1. Click derecho en "Este equipo" → Propiedades
2. Click en "Configuración avanzada del sistema"
3. Click en "Variables de entorno"
4. En "Variables del sistema", click "Nueva":
   - Nombre: `JAVA_HOME`
   - Valor: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x` (tu ruta)
5. Edita la variable `Path` y añade: `%JAVA_HOME%\bin`
6. Click "Aceptar" en todo

**Mac:**

Añade a `~/.zshrc` o `~/.bash_profile`:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH=$JAVA_HOME/bin:$PATH
```

Ejecuta: `source ~/.zshrc`

**Linux:**

Añade a `~/.bashrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

Ejecuta: `source ~/.bashrc`

---

## 3. INSTALAR MAVEN

### 3.1 Windows

**Opción 1: Con Chocolatey (Recomendado)**
```bash
choco install maven
```

**Opción 2: Manual**
1. Descarga desde: https://maven.apache.org/download.cgi
2. Descarga el archivo `.zip` (Binary)
3. Extrae a `C:\Program Files\Apache\maven`
4. Añade a las Variables de Entorno:
   - Variable: `MAVEN_HOME` → `C:\Program Files\Apache\maven`
   - Añade a `Path`: `%MAVEN_HOME%\bin`

### 3.2 Mac

```bash
brew install maven
```

### 3.3 Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install maven
```

### 3.4 Verificar

```bash
mvn -version
```

---

## 4. INSTALAR MYSQL

### 4.1 Windows

1. Ve a: https://dev.mysql.com/downloads/installer/
2. Descarga **MySQL Installer** (Web o Full)
3. Ejecuta el instalador
4. Selecciona **"Developer Default"**
5. En la configuración:
   - **MySQL Server**: Configura una contraseña de root (ejemplo: `root123`)
   - **Puerto**: Deja el 3306 por defecto
   - ✅ Inicia MySQL Server como servicio de Windows
6. Instala **MySQL Workbench** (viene incluido)

### 4.2 Mac

```bash
brew install mysql
brew services start mysql

# Configurar seguridad
mysql_secure_installation
```

### 4.3 Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install mysql-server mysql-workbench
sudo systemctl start mysql
sudo systemctl enable mysql

# Configurar seguridad
sudo mysql_secure_installation
```

### 4.4 Verificar MySQL

**Conectar a MySQL:**

```bash
mysql -u root -p
```

Ingresa tu contraseña. Si conecta, verás:
```
mysql>
```

Sal con: `exit`

---

## 5. INSTALAR VISUAL STUDIO CODE

### 5.1 Descargar e Instalar

1. Ve a: https://code.visualstudio.com/
2. Descarga para tu sistema operativo
3. Instala siguiendo el asistente

### 5.2 Instalar Extensiones Necesarias

Abre VS Code y presiona `Ctrl+Shift+X` (o `Cmd+Shift+X` en Mac)

Busca e instala **EN ORDEN**:

1. **Extension Pack for Java** (Microsoft)
   - Incluye múltiples extensiones Java

2. **Spring Boot Extension Pack** (VMware)
   - Soporte para Spring Boot

3. **MySQL** (cweijan)
   - Cliente MySQL integrado

4. **REST Client** (Huachao Mao)
   - Para probar APIs sin Postman

5. **Lombok Annotations Support for VS Code** (GabrielBB)
   - Soporte para Lombok

6. **Thunder Client** (Ranga Vadhineni) - OPCIONAL
   - Alternativa a Postman dentro de VS Code

### 5.3 Configurar Java en VS Code

1. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P`)
2. Escribe: `Java: Configure Java Runtime`
3. Verifica que aparezca Java 17

---

## 6. INSTALAR GIT

### 6.1 Windows

Descarga desde: https://git-scm.com/download/win

Durante la instalación:
- Editor: Visual Studio Code
- PATH: Git from the command line
- SSH: Use bundled OpenSSH
- HTTPS: Use the OpenSSL library
- Line endings: Checkout Windows-style, commit Unix-style
- Terminal: Use MinTTY

### 6.2 Mac

```bash
brew install git
```

### 6.3 Linux (Ubuntu/Debian)

```bash
sudo apt install git
```

### 6.4 Configurar Git (IMPORTANTE)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
```

### 6.5 Verificar

```bash
git --version
git config --list
```

---

## 7. INSTALAR POSTMAN (OPCIONAL)

### 7.1 Descargar

Ve a: https://www.postman.com/downloads/

### 7.2 Instalar

Ejecuta el instalador

### 7.3 Crear Cuenta (Opcional)

Puedes usar Postman sin cuenta, pero crear una te permite guardar tus colecciones.

---

## 8. CREAR CARPETA DE TRABAJO

### 8.1 Ubicación Recomendada

**Windows:**
```
C:\Users\TuNombre\Documents\Proyectos\
```

**Mac/Linux:**
```
~/Proyectos/
```

### 8.2 Crear la Carpeta

**Windows (PowerShell):**
```powershell
mkdir C:\Users\$env:USERNAME\Documents\Proyectos
cd C:\Users\$env:USERNAME\Documents\Proyectos
```

**Mac/Linux:**
```bash
mkdir -p ~/Proyectos
cd ~/Proyectos
```

---

## 9. VERIFICACIÓN FINAL

### 9.1 Checklist de Verificación

Ejecuta todos estos comandos y verifica que funcionan:

```bash
# Java
java -version

# Maven
mvn -version

# Git
git --version

# MySQL
mysql --version
```

### 9.2 Verificar MySQL Workbench

1. Abre MySQL Workbench
2. Haz clic en tu conexión local
3. Ingresa tu contraseña
4. Si conecta, ¡perfecto! ✅

### 9.3 Verificar VS Code

1. Abre VS Code
2. Presiona `Ctrl+Shift+P`
3. Escribe: `Java: Create Java Project`
4. Si aparece la opción, ¡todo está listo! ✅

---

## ✅ COMPLETADO

Si todos los pasos anteriores funcionaron, tu entorno está listo.

**➡️ Siguiente paso:** [`02_CREACION_PROYECTO.md`](02_CREACION_PROYECTO.md)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Problema: "java no se reconoce como comando"
**Solución:** JAVA_HOME no está configurado. Revisa la sección 2.2

### Problema: "mvn no se reconoce como comando"
**Solución:** Maven no está en el PATH. Revisa la sección 3

### Problema: "No puedo conectar a MySQL"
**Solución:** 
- Verifica que MySQL esté corriendo: 
  - Windows: Servicios → MySQL80 debe estar "Iniciado"
  - Mac/Linux: `sudo systemctl status mysql`
- Verifica usuario y contraseña

### Problema: "VS Code no detecta Java"
**Solución:** 
1. Reinstala Extension Pack for Java
2. Reinicia VS Code
3. Verifica JAVA_HOME

### Problema: "Puerto 3306 ya en uso"
**Solución:** Ya tienes MySQL corriendo en otro lugar. Usa ese o cambia el puerto.

---

## 📚 RECURSOS ADICIONALES

- **Java Docs:** https://docs.oracle.com/en/java/javase/17/
- **Maven Guide:** https://maven.apache.org/guides/
- **MySQL Docs:** https://dev.mysql.com/doc/
- **VS Code Java:** https://code.visualstudio.com/docs/java/java-tutorial
- **Spring Boot:** https://spring.io/guides

---

**⏭️ Continúa con:** [`02_CREACION_PROYECTO.md`](02_CREACION_PROYECTO.md)
