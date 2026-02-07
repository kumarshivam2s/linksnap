# LinkSnap

LinkSnap is a full-stack URL shortener with click tracking built using React, Node.js, Express, and MongoDB. It allows users to create short links, monitor analytics, and manage URLs through a clean dashboard interface.

---

## Features

- Generate short URLs instantly  
- Track click analytics with 7‑day chart visualization  
- Search and filter saved links  
- View overall statistics (total links, total clicks, averages)  
- Copy shortened links to clipboard  
- Delete links when needed  

---

## Tech Stack

Frontend  
- React  
- Tailwind CSS  
- Chart.js  
- Vite  

Backend  
- Node.js  
- Express  
- MongoDB  

---

## Getting Started

### Prerequisites

- Node.js v16 or higher  
- MongoDB (local installation or MongoDB Atlas)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/kumarshivam2s/linksnap.git
cd linksnap
```

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Setup Frontend

```bash
cd ../client
npm install
```

---

## Running the Application

Start backend:

```bash
cd ../server
node server.js
```

Start frontend:

```bash
cd ../client
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Project Structure

```
linksnap/
├── client/          React frontend
│   ├── src/
│   └── package.json
├── server/          Express backend
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## License

MIT License
