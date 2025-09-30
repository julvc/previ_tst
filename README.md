# Demoprevi - Sistema CRUD de Personas

Sistema completo de gestión de personas con sus direcciones, desarrollado con **Spring Boot** (backend) y **React TypeScript** (frontend). La aplicación gestiona personas con sus direcciones asociadas a comunas y regiones chilenas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Prerrequisitos](#prerrequisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Funcionalidades del Frontend](#funcionalidades-del-frontend)
- [Testing](#testing)
- [Documentación API](#documentación-api)

## ✨ Características

- **CRUD completo** de personas con direcciones
- **Gestión de regiones y comunas chilenas** con datos reales
- **Interfaz React moderna** con TypeScript
- **API REST** completamente documentada con Swagger/OpenAPI
- **Validaciones** en frontend y backend
- **Modales accesibles** con soporte para lectores de pantalla
- **Arquitectura limpia** siguiendo principios SOLID
- **Testing** integrado para componentes y funcionalidades

## 🛠 Stack Tecnológico

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Data JPA**
- **SQLite** con Hibernate Community Dialects
- **Swagger/OpenAPI 3** para documentación
- **Maven** para gestión de dependencias
- **Lombok** para reducir boilerplate

### Frontend
- **React 19**
- **TypeScript 5.8**
- **Vite 7** como build tool
- **React Router Dom 7** para navegación
- **Axios** para llamadas HTTP
- **Vitest** para testing
- **Testing Library** para pruebas de componentes

## 🏗 Arquitectura

### Backend
```
├── domain/          # Entidades JPA
├── repository/      # Repositorios JPA
├── service/         # Lógica de negocio
├── controller/      # Controladores REST
└── configuration/   # Configuración de aplicación
```

### Frontend
```
├── components/      # Componentes reutilizables
├── pages/          # Páginas principales
├── hooks/          # Custom hooks
├── services/       # Servicios API
├── types/          # Definiciones TypeScript
└── utils/          # Utilidades
```

## 📦 Prerrequisitos

### Herramientas Requeridas
- **Java 21**
- **Maven 3.6+**
- **Node.js 18+** y **npm 9+**
- **Git**

### Verificación de Prerequisitos
```powershell
# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar Node.js y npm
node --version
npm --version
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```powershell
gh repo clone julvc/previ_tst
cd previ_tst
```

### 2. Configurar Backend
```powershell
cd backend

# Instalar dependencias y compilar
mvn clean install

# La base de datos SQLite se creará automáticamente al iniciar la aplicación
```

### 3. Configurar Frontend
```powershell
cd frontend

# Instalar dependencias
npm install

# Verificar instalación
npm run test:run
```

## ▶️ Ejecución del Proyecto

### Opción 1: Ejecución Automática (Recomendada)

#### Backend
```powershell
cd backend
mvn spring-boot:run
```
El backend estará disponible en: `http://localhost:8080`

#### Frontend
```powershell
cd frontend
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

### Opción 2: Ejecución Manual

#### Backend
```powershell
cd backend
mvn clean package
java -jar target/demoprevi-0.0.1-SNAPSHOT.jar
```

#### Frontend
```powershell
cd frontend
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
previ_tst/
├── README.md
├── database.db                    # Base de datos SQLite (generada automáticamente)
├── backend/                       # Aplicación Spring Boot
│   ├── src/main/java/com/jvc/demoprevi/
│   │   ├── DemopreviApplication.java
│   │   ├── configuration/
│   │   ├── controller/           # Controllers REST
│   │   │   ├── PersonasController.java
│   │   │   ├── RegionController.java
│   │   │   └── ComunaController.java
│   │   ├── domain/               # Entidades JPA
│   │   │   ├── Personas.java
│   │   │   ├── Direccion.java
│   │   │   ├── Region.java
│   │   │   └── Comuna.java
│   │   ├── repository/           # Repositorios JPA
│   │   └── service/              # Servicios de negocio
│   └── src/main/resources/
│       └── application.properties
└── frontend/                      # Aplicación React
    ├── src/
    │   ├── components/           # Componentes reutilizables
    │   │   ├── Forms/
    │   │   ├── Layout/
    │   │   ├── Portal/
    │   │   └── UI/
    │   ├── pages/                # Páginas principales
    │   ├── hooks/                # Custom hooks
    │   ├── services/             # Servicios API
    │   └── types/                # Tipos TypeScript
    ├── package.json
    └── vite.config.ts
```

## 🔌 API Endpoints

### Personas
- `GET /api/personas` - Listar todas las personas
- `GET /api/personas/{id}` - Obtener persona por ID
- `POST /api/personas` - Crear nueva persona
- `PUT /api/personas/{id}` - Actualizar persona
- `DELETE /api/personas/{id}` - Eliminar persona

### Regiones
- `GET /api/regiones` - Listar todas las regiones
- `GET /api/regiones/{id}` - Obtener región por ID

### Comunas
- `GET /api/comunas` - Listar todas las comunas
- `GET /api/comunas/region/{regionId}` - Obtener comunas por región

### Ejemplo de Payload (Persona)
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "rut": "12345678-9",
  "telefono": "+56912345678",
  "email": "juan.perez@email.com",
  "direccion": {
    "calle": "Av. Libertad",
    "numero": "123",
    "comunaId": 1
  }
}
```

## 🖥 Funcionalidades del Frontend

### Características Principales
- **Dashboard principal** con navegación intuitiva
- **CRUD completo de personas** con formularios validados
- **Consulta de regiones y comunas** chilenas
- **Búsqueda y filtrado** de personas
- **Modales accesibles** para confirmaciones y notificaciones
- **Interfaz responsiva** adaptable a diferentes dispositivos

### Navegación
- `/` - Página principal
- `/personas` - Gestión de personas
- `/regiones` - Consulta de regiones
- `/comunas` - Consulta de comunas
- `/acerca-de` - Información del proyecto

### Accesibilidad
- **ARIA labels** y roles apropiados
- **Navegación por teclado** completa
- **Soporte para lectores de pantalla**
- **Contrastes apropiados** para WCAG compliance

## 🧪 Testing

### Backend
```powershell
cd backend
mvn test
```

### Frontend
```powershell
cd frontend

# Ejecutar tests en modo desarrollo
npm run test

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con interfaz visual
npm run test:ui
```

## 📚 Documentación API

### Swagger UI
Una vez que el backend esté ejecutándose, la documentación interactiva estará disponible en:
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Características de la Documentación
- **Documentación interactiva** con Swagger UI
- **Ejemplos de requests y responses**
- **Schemas detallados** de todos los DTOs
- **Códigos de estado HTTP** documentados
- **Posibilidad de probar endpoints** directamente desde la interfaz

## 🔧 Configuración Adicional

### Variables de Entorno Backend
El archivo `application.properties` contiene la configuración por defecto:
```properties
spring.datasource.url=jdbc:sqlite:database.db
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Variables de Entorno Frontend
El frontend está configurado para conectarse al backend en `http://localhost:8080` por defecto.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Julio Varas C.**

---

Para más información o reportar problemas, por favor abre un issue en el repositorio.