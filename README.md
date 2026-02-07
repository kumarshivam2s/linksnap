# LinkSnap

A URL shortener with click tracking built with React, Node.js, Express, and MongoDB.

## Features

- Shorten long URLs
- Track click analytics with 7-day chart
- Search and filter links
- View stats overview (total links, clicks, averages)
- Copy links to clipboard
- Delete links

## Tech Stack

**Frontend:** React, Tailwind CSS, Chart.js, Vite  
**Backend:** Node.js, Express, MongoDB

## Setup

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/kumarshivam2s/linksnap.git
cd linksnap
```

**Server:**
```bash
cd server
npm install
```

Create `.env` file in server folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**Client:**
```bash
cd client
npm install
```

### Run

Start the server:
```bash
cd server
node server.js
```

Start the client:
```bash
cd client
npm run dev
```

Open http://localhost:5173

## Project Structure

```
linksnap/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## License

MIT
