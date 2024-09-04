# Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/sumana10/paytm-wallet.git
    ```

2. **Install Dependencies**

    Navigate to the root directory and run:

    ```bash
    npm install
    ```

3. **Run PostgreSQL**

    You can either run PostgreSQL locally or use a cloud service like [Neon](https://neon.tech). To run PostgreSQL locally with Docker, use:

    ```bash
    docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
    ```

4. **Configure Environment Variables**

    - Navigate to both `apps/user-app` and `packages/db` directories.
    - Copy `.env.example` files to `.env` in each directory.
    - Update the `.env` files with the correct database URL.

5. **Set Up the Database**

    In the `packages/db` directory, run:

    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```

6. **Start the Application**

    Navigate to the `apps/user-app` directory and run:

    ```bash
    npm run dev
    ```

7. **Run the Bank Webhook**

    Navigate to the `bank-webhook` directory and start the webhook:

    ```bash
    node dist/index.js
    ```

8. **Import the Postman Collection**

    - Open Postman.
    - Click on "Import" and select the Postman collection file provided in the repository.
    - This will set up the necessary API endpoints for testing.

9. **Test the Login**

    Use the following credentials to log in:

    - **Phone:** 1111111111
    - **Password:** alice

    (Refer to `seed.ts` for these credentials.)
