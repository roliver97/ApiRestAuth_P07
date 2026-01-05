# 📚 API REST - Biblioteca (Books & Authors)

Esta es una API REST construida con **Node.js**, **Express** y **MongoDB**. Permite gestionar una biblioteca de libros y autores, con un sistema completo de autenticación de usuarios y roles (Admin/User).

## 🚀 Tecnologías utilizadas

* **Node.js** - Entorno de ejecución.
* **Express** - Framework para el servidor.
* **MongoDB & Mongoose** - Base de datos NoSQL y ODM.
* **JWT (JsonWebToken)** - Autenticación segura.
* **Bcrypt** - Encriptación de contraseñas.
* **Dotenv** - Gestión de variables de entorno.

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/roliver97/ApiRestAuth_P07.git
    cd ApiRestAuth_P07
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    PORT=3000
    DB_URL=mongodb+srv://usuario:password@cluster.mongodb.net/nombreBBDD
    JWT_SECRET=tu_palabra_secreta
    ```

4.  **Carga inicial de datos (Seed):**
    Para poblar la base de datos con autores y libros iniciales.
    ⚠️ **Requisito Importante:** Antes de ejecutar este comando, deberás crear manualmente un usuario y asignarle el rol de `'admin'` en la base de datos. El script buscará este admin para asignarle la autoría de los libros.
    
    ```bash
    npm run seed
    ```

5.  **Arrancar el servidor:**
    ```bash
    npm run dev
    ```

## 🔐 Autenticación y Roles

El sistema cuenta con dos niveles de autorización mediante Middlewares:
* **User:** Puede ver contenido y gestionar su propio perfil.
* **Admin:** Puede gestionar roles, eliminar usuarios y firmar el contenido de la seed.

## 📡 Endpoints de la API

### 👤 Usuarios (Users)

| Método | Endpoint | Descripción | Auth Requerida |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Registrar un nuevo usuario | No |
| `POST` | `/api/v1/users/login` | Iniciar sesión (Devuelve Token) | No |
| `GET` | `/api/v1/users` | Listar todos los usuarios | 🔒 Token |
| `DELETE` | `/api/v1/users/:id` | Eliminar usuario | 🔒 Token (Admin o Propio usuario) |
| `PATCH` | `/api/v1/users/:id/role` | Cambiar rol de usuario (User/Admin) | 🔒 Token (Solo Admin) |

### ✍️ Autores (Authors)

| Método | Endpoint | Descripción | Auth Requerida |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/authors` | Obtener todos los autores | No |
| `POST` | `/api/v1/authors` | Crear un nuevo autor | 🔒 Token |
| `PUT` | `/api/v1/authors/:id` | Actualizar autor existente | 🔒 Token |
| `DELETE` | `/api/v1/authors/:id` | Eliminar autor (y sus libros) | 🔒 Token |

### 📚 Libros (Books)

| Método | Endpoint | Descripción | Auth Requerida |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/books` | Listar libros (con populate de Autor) | No |
| `POST` | `/api/v1/books` | Crear libro (Se asigna al usuario logueado) | 🔒 Token |
| `PUT` | `/api/v1/books/:id` | Actualizar información de un libro | 🔒 Token |
| `DELETE` | `/api/v1/books/:id` | Eliminar un libro | 🔒 Token |

---

## 💾 Modelos de Datos

* **User:** `userName`, `password`, `email`, `role`, `image`...
* **Author:** `name`, `country`, `image`.
* **Book:** `title`, `genre`, `author` (Relación con Author), `postedBy` (Relación con User).

---
Autor: Roman Oliver Gil