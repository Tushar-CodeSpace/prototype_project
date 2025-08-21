# 🧪 Prototype Project

![License: All Rights Reserved](https://img.shields.io/badge/license-All%20Rights%20Reserved-red.svg)
![Kafka: WIP](https://img.shields.io/badge/Kafka-WIP-orange)

Prototype Project is a **scalable microservice-based architecture** built with **Bun.js**, **Express**, **MongoDB**, and **Docker Compose**, with planned integration of **Kafka** and additional distributed services.  
This repository is designed as a foundation for building **modular, event-driven systems** with a focus on:
- 🚀 **Rapid prototyping** for new ideas.  
- 📡 **Extensibility** to add new services without breaking existing ones.  
- 🏗 **Scalability** to support future workloads and cloud-native deployment.  
- 🔎 **Observability** through centralized logging, monitoring, and service discovery.  

Future roadmap includes more microservices (inventory, notifications, analytics), deeper Kafka event streaming, and full observability stack integration.
---

## 🚀 Features

- **Microservices**
  - `auth-service` → Handles user authentication (login, register, logout).
  - `logger-service` → Centralized logging service with DB persistence and query APIs.
  - `api-gateway-service` → Single entry point, proxies requests to microservices.
- **Advanced Logging**
  - Millisecond-precision logs with Winston.
  - Remote log storage in MongoDB via `logger-service`.
- **Kafka Integration** ![WIP](https://img.shields.io/badge/WIP-orange)
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

| Layer            | Tools & Frameworks                                            |
|------------------|---------------------------------------------------------------|
| Runtime          | Bun.js, Node.js                                               |
| Web Server       | Express.js                                                    |
| Database         | MongoDB, Mongoose                                             |
| Messaging        | Kafka, Kafdrop ![WIP](https://img.shields.io/badge/WIP-orange)|
| Containerization | Docker Compose                                                |
| Logging          | Winston (custom formats, daily rotation)                      |
| Observability    | Remote logging, Kafdrop, Mongo Express                        |

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

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/v1/login`    | User login        |
| POST   | `/api/v1/register` | User registration |
| POST   | `/api/v1/logout`   | User logout       |

---

### 📝 Logger Service (`logger-service` @ port **8011**)

| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| POST   | `/api/v1/log`                | Register a log in DB remotely     |
| GET    | `/api/v1/logs`               | Get all recorded logs             |
| GET    | `/api/v1/logs/:service_name` | Get logs filtered by service name |

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
* **Kafdrop (Kafka UI)** → [http://localhost:9000](http://localhost:9000) ![WIP](https://img.shields.io/badge/WIP-orange)

---

## 🛠 Development Notes

* All services respect `.env` configs (ports, DB URIs, log endpoints).
* `logger-service` should **start first**, then dependent services (`auth-service`, `api-gateway-service`).
* The gateway handles **service discovery** internally via Docker network aliases.
* Kafka integration is under development ![WIP](https://img.shields.io/badge/WIP-orange) — not all event-driven features may work yet.

---

## 📜 License

Copyright © 2025 [Tushar-CodeSpace](https://github.com/Tushar-CodeSpace)
**All rights reserved.**

This project is made publicly available for **showcasing purposes only**.
No permission is granted to **copy, modify, distribute, or use** the source code in any form without explicit written consent from the author.
