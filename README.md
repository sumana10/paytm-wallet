# PayTM Wallet

## Setup Instructions

### Option A: Docker (Recommended)

1. **Clone the Repository**

```bash
git clone https://github.com/sumana10/paytm-wallet.git
cd paytm-wallet
```

2. **Run docker-compose**

```bash
docker-compose up --build
```

3. **Access the Apps in Browser**

* **User App:** `http://localhost:3000`

* **Bank Webhook:** `http://localhost:3002` 


---

### Option B: Manual Setup (Using Neon DB)

1. **Clone the Repository**

```bash
git clone https://github.com/sumana10/paytm-wallet.git
cd paytm-wallet
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

* Go to `apps/user-app` and `packages/db`.
* Copy `.env.example` to `.env` in each directory:

```bash
cp .env.example .env
```

* Update `.env` files with your Neon DB connection string:

```
DATABASE_URL=postgresql://username:password@your-neon-db-host:5432/dbname
```

4. **Setup Database**

```bash
npm run db:generate    # Generates Prisma client
npm run db:migrate     # Applies schema migrations
```


5. **Start the Application (Development Mode)**

```bash
npm run dev
```

* Starts the app with hot-reloading.
* **User App:** `http://localhost:3000`
* **Bank Webhook :** `http://localhost:3002`

6. **Production Build**

```bash
npm run build
npm run start
```

* `npm run build` compiles the app for production.
* `npm run start` runs the compiled production build.

