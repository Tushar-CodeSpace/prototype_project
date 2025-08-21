# 🧱 Prototype Project

A scalable, modular **microservice architecture** built with **Bun.js**, **Express**, **Mongoose**, **Kafka**, and **Docker Compose**.  
Designed for **rapid prototyping**, **robust logging**, and **seamless observability** across distributed services.

---

## 🚀 Features

- **Microservices**
  - `auth-service` → Handles user authentication (login, register, logout).
  - `logger-service` → Centralized logging service with DB persistence and query APIs.
  - `api-gateway-service` → Single entry point, proxies requests to microservices.
- **Advanced Logging**
  - Millisecond-precision logs with Winston.
  - Remote log storage in MongoDB via `logger-service`.
- **Kafka Integration**
  - Event-driven communication for extensibility.
  - Kafdrop UI for monitoring topics & partitions.
- **MongoDB Stack**
  - Includes **Mongo Express** for quick DB inspection.
- **Docker Orchestration**
  - Healthchecks, dependencies, and timezone consistency across containers.
- **Environment Flexibility**
  - Cross-platform `.env` support with mounted host timezone files.

---

## 🧰 Tech Stack

| Layer            | Tools & Frameworks                          |
|------------------|---------------------------------------------|
| Runtime          | Bun.js, Node.js                             |
| Web Server       | Express.js                                  |
| Database         | MongoDB, Mongoose                           |
| Messaging        | Kafka, Kafdrop       `WIP`                  |
| Containerization | Docker Compose                              |
| Logging          | Winston (custom formats, daily rotation)    |
| Observability    | Remote logging, Kafdrop, Mongo Express      |

---

## 📦 Setup

```bash
# Clone the repo
git clone https://github.com/Tushar-CodeSpace/prototype_project.git
cd prototype_project

# Start services
docker-compose up --build
````

---

## 🌐 API Endpoints

### 🔑 Auth Service (`auth-service` @ port **8001**)

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/api/v1/login`   | User login        |
| POST   | `/api/v1/register`| User registration |
| POST   | `/api/v1/logout`  | User logout       |

---

### 📝 Logger Service (`logger-service` @ port **8011**)

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| POST   | `/api/v1/log`               | Register a log in DB remotely     |
| GET    | `/api/v1/logs`              | Get all recorded logs             |
| GET    | `/api/v1/logs/:service_name`| Get logs filtered by service name |

---

### 🌉 API Gateway (`api-gateway-service` @ port **8000**)

| Method | Gateway Route         | Proxies To                                  |
| ------ | --------------------- | ------------------------------------------- |
| POST   | `/auth/login`         | `auth-service:/api/v1/login`                |
| POST   | `/auth/register`      | `auth-service:/api/v1/register`             |
| POST   | `/auth/logout`        | `auth-service:/api/v1/logout`               |
| POST   | `/log`                | `logger-service:/api/v1/log`                |
| GET    | `/logs`               | `logger-service:/api/v1/logs`               |
| GET    | `/logs/:service_name` | `logger-service:/api/v1/logs/:service_name` |

---

## 📊 Observability

* **Mongo Express** → [http://localhost:8081](http://localhost:8081)
* **Kafdrop (Kafka UI)** → [http://localhost:9000](http://localhost:9000) `WIP`

---

## 🛠 Development Notes

* All services respect `.env` configs (ports, DB URIs, log endpoints).
* `logger-service` should **start first**, then dependent services (`auth-service`, `api-gateway-service`).
* The gateway handles **service discovery** internally via Docker network aliases.

---

## 📜 License

MIT License © 2025 [Tushar-CodeSpace](https://github.com/Tushar-CodeSpace)

```

✅ This is **one single file** — you can copy-paste directly into your `README.md`.  

Do you also want me to include **sample request/response bodies** (JSON for login, logs, etc.) in this same file so new devs can test endpoints instantly with Postman?
```
