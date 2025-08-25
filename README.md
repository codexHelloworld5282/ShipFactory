# 🚚 ShipFactory  

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-4.4+-brightgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/RabbitMQ-Optional-orange?style=for-the-badge&logo=rabbitmq" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/codexHelloworld5282/ShipFactory?style=social" />
  <img src="https://img.shields.io/github/forks/codexHelloworld5282/ShipFactory?style=social" />
</p>

---

A modular and scalable **Courier Integration System** built with **Node.js, Express, and MongoDB**, designed around the **Factory Pattern** to support multiple courier services with minimal effort.  

---

## ✨ Features
- 📦 Plug-and-play **Courier Factory Pattern**  
- 🔑 Secure **Login & Token Auth**  
- 📨 Create & ❌ Cancel courier orders  
- 🔄 RabbitMQ support (event-driven architecture)  
- 🛠️ Clean **modular structure**  
- 💾 Persistent storage in MongoDB  

---

## 📊 System Flow

flowchart TD
    A[Client (Postman / Frontend)] -->|API Call| B[Express Server]
    B --> C[CourierService]
    C --> D{Courier Factory}
    D -->|BlueEx| E[BlueEx API]
    D -->|DummyCourier| F[MongoDB Mock Save]
    E --> G[Order Response]
    F --> G
    G --> H[Return API Response]

## 📂 Project Structure
ShipFactory/
│── server.js                # Entry point
│── app.js                   # Express app
│── couriers/                # Courier implementations
│   ├── blueEx/              # BlueEx integration
│   └── dummy/               # Dummy courier (mock)
│── services/                # Core business logic
│── models/                  # MongoDB schemas
│── routes/                  # Express routes
│── constants/               # Centralized API paths
│── .env                     # Environment variables
│── README.md                # Project documentation

##⚡ API Endpoints
🔹 Create Order
POST http://localhost:5000/api/courier/create?brandCourierId=<id>
Content-Type: application/json


Sample Payload

[
  {
    "orderId": "OAB-9661",
    "dateTime": "2025-07-21T11:43:40",
    "paymentMethod": "Credit Card",
    "totalAmountPKR": 1200,
    "customer": {
      "name": "John Doe",
      "phone": "03001234567",
      "address": "Lahore, Pakistan"
    }
  }
]

🔹 Cancel Order
POST http://localhost:5000/api/courier/cancel?brandCourierId=<id>
Content-Type: application/json


Sample Payload

{
  "cn": "d2f73d3e-12b8-4f3b-8c3f-99a8f2ef9d23"
}

## 🛠️ Installation & Setup

Clone repo:

git clone https://github.com/codexHelloworld5282/ShipFactory.git
cd ShipFactory


## Install dependencies:

npm install


Setup .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/etcc


Run app:

npm start

## 🚀 Future Roadmap

 Add more courier integrations (Leopard, TCS, etc.)

 Improve error handling & retries

 Add Order Tracking endpoint

 Deploy on Heroku / AWS

## 🤝 Contributing

Contributions are welcome! Feel free to fork, open issues, and submit PRs.

## 🧑‍💻 Author

👩‍💻 Eisha Ayub (@codexHelloworld5282)
💡 Passionate about Backend Development, AI Models, and Scalable Architectures
