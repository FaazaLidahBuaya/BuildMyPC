# BuildMyPC

> A modern PC building platform for creating custom PC builds and checking hardware compatibility.

**BuildMyPC** is a full-stack web application designed to help users build a custom PC while automatically checking the compatibility between its components.

The project focuses on making PC building easier by providing component specifications, compatibility validation, estimated power requirements, pricing, and build management in one platform.

## ✨ Features

### 🖥️ PC Builder

Create a custom PC by selecting different hardware components:

* CPU
* GPU
* Motherboard
* RAM
* Storage
* Power Supply
* PC Case
* CPU Cooler

### 🔍 Compatibility Checker

BuildMyPC validates the selected components based on their technical specifications.

The system can check things such as:

* CPU socket compatibility
* CPU and motherboard compatibility
* RAM generation
* RAM capacity and slot limitations
* Motherboard form factor
* GPU PCIe interface
* GPU length and case clearance
* CPU cooler socket support
* CPU cooler height
* PSU wattage requirements
* PSU power connectors
* Storage interface and motherboard support

Instead of simply showing whether a component works or does not work, the system provides a reason for each compatibility result.

### ⚡ Power Estimation

The system estimates the power consumption of the selected components and calculates a recommended PSU capacity with additional headroom.

### 💰 Build Cost

Automatically calculate the total estimated price of the selected components.

### 🧩 Component Explorer

Browse and explore PC components with their technical specifications and pricing.

### ⚔️ Component Comparison

Compare different hardware components based on their specifications and other relevant information.

### 💾 Build Management

Create and manage custom PC builds and keep all selected components together as a single configuration.

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* Zustand

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Development

* Git
* GitHub
* REST API

## 🏗️ Project Structure

```text
BuildMyPC/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ How It Works

BuildMyPC uses the backend as the main source of compatibility logic.

The frontend sends the selected components to the backend:

```text
User selects components
        ↓
Frontend
        ↓
REST API
        ↓
Compatibility Engine
        ↓
MongoDB component data
        ↓
Compatibility result
        ↓
Frontend displays the result
```

For example:

```text
CPU
Ryzen 5 7600
        +
Motherboard
B650
        ↓
Socket: AM5
        ↓
✓ Compatible
```

While an incompatible combination can return:

```text
CPU
Ryzen 5 7600
        +
Motherboard
Z790
        ↓
AM5 ≠ LGA1700
        ↓
✕ Incompatible
```

## 📊 Compatibility System

Compatibility is divided into three states:

| Status         | Meaning                                           |
| -------------- | ------------------------------------------------- |
| ✅ Compatible   | Components can work together                      |
| ⚠️ Warning     | Components can work together but have limitations |
| ❌ Incompatible | Components cannot be used together                |

Examples of compatibility checks include:

```text
CPU ↔ Motherboard
CPU ↔ RAM
Motherboard ↔ RAM
Motherboard ↔ GPU
Motherboard ↔ Storage
Motherboard ↔ Case
GPU ↔ Case
GPU ↔ PSU
CPU ↔ Cooler
Cooler ↔ Case
PSU ↔ Case
```

The compatibility logic is handled by the backend rather than the frontend.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/FaazaLidahBuaya/BuildMyPC.git

cd BuildMyPC
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will then be available through the local development server.

## 🌐 Live Demo

**BuildMyPC**

https://build-my-pc-tau.vercel.app/

## 🗺️ Future Development

Planned improvements include:

* [ ] More complete component database
* [ ] Automatic component recommendations
* [ ] Budget-based PC builder
* [ ] Game performance estimation
* [ ] FPS estimation
* [ ] Advanced component comparison
* [ ] Saved builds
* [ ] Shareable build links
* [ ] User authentication
* [ ] More detailed compatibility checks
* [ ] Component filtering and search
* [ ] Price tracking

## 🎯 Project Goals

BuildMyPC was created as a full-stack project to explore how a real-world hardware configuration platform could be designed and implemented.

The project focuses on:

* Frontend development
* Backend API development
* Database design
* Hardware compatibility logic
* Data validation
* REST API architecture
* Interactive UI/UX
* Full-stack application development

## 📌 Disclaimer

BuildMyPC is a personal development project.

Hardware specifications, compatibility information, prices, and performance estimates may change over time. Users should verify important specifications with the respective hardware manufacturers before purchasing components.

## 👨‍💻 Author

**Faaza Achmad Taufiqiy**

GitHub:
https://github.com/FaazaLidahBuaya

---

⭐ If you find this project interesting, feel free to explore the repository and its development.
