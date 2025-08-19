# 🧱 Prototype Project

A scalable, modular microservice architecture built with **Bun.js**, **Express**, **Mongoose**, **Kafka**, and **Docker Compose**. Designed for rapid prototyping, robust logging, and seamless observability across services.

---

## 🚀 Features

- **Modular Microservices**: Each service is isolated, configurable, and independently deployable.
- **Advanced Logging**: Millisecond-precision logs with Winston, supporting local and remote targets via `.env` toggles.
- **Kafka Integration**: Event-driven communication with Kafdrop UI for monitoring.
- **MongoDB Stack**: Includes Mongo Express for quick DB inspection.
- **Docker Orchestration**: Healthchecks, timezone consistency, and service dependency management.
- **Environment Flexibility**: Cross-platform support with mounted host timezone files.

---

## 🧰 Tech Stack

| Layer            | Tools & Frameworks                          |
|------------------|---------------------------------------------|
| Runtime          | Bun.js, Node.js                             |
| Web Server       | Express.js                                  |
| Database         | MongoDB, Mongoose                           |
| Messaging        | Kafka, Kafdrop                              |
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