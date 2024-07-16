# Magic Mover REST API

## Project Overview

The Magic Mover REST API is designed to manage the operations of Magic Movers and their associated Magic Items. It supports operations such as adding new movers and items, loading items onto movers, starting and ending missions, and tracking movers with the most completed missions.

## Features

-   **Add a Magic Mover**: Create a new mover with a name and weight limit.
-   **Add a Magic Item**: Create a new item with a name and weight.
-   **Load Items onto a Magic Mover**: Load specified items onto a mover.
-   **Start a Mission**: Begin a mission for a mover, preventing further loading.
-   **End a Mission**: End the mission, unload items, and log the mission details.
-   **List Top Movers**: List movers who have completed the most missions.

## Technologies

-   **Node.js**
-   **Express**
-   **TypeScript**
-   **Mongoose (MongoDB)**
-   **Zod** (for request validation)
-   **tsyringe** (for dependency injection)
-   **Jest & Supertest** (for testing)
-   **Swagger** (for API documentation)

## Prerequisites

-   Node.js (v14 or later)
-   npm (v6 or later)
-   MongoDB

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/magic-mover-api.git
    cd magic-mover-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:

    ```env
    MONGO_URI=mongodb://localhost:27017/magic
    ```

4. **Run the application**:

    ```bash
    npm start
    ```

### Swagger Documentation

Once the application is running, you can access the Swagger documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Endpoints

### Add a Magic Mover

-   **URL**: `/api/magic-movers/create`
-   **Method**: `POST`
-   **Request Body**:

    ```json
    {
        "name": "Mover1",
        "weightLimit": 100
    }
    ```

-   **Response**:

    ```json
    {
        "_id": "60d9f4f88eb0c62f24b8e4f2",
        "name": "Mover1",
        "weightLimit": 100,
        "questState": "resting",
        "items": []
    }
    ```

### Add a Magic Item

-   **URL**: `/api/magic-items/create`
-   **Method**: `POST`
-   **Request Body**:

    ```json
    {
        "name": "Item1",
        "weight": 20
    }
    ```

-   **Response**:

    ```json
    {
        "_id": "60d9f53f8eb0c62f24b8e4f4",
        "name": "Item1",
        "weight": 20
    }
    ```

### Load Items onto a Magic Mover

-   **URL**: `/api/magic-movers/:id/load-items`
-   **Method**: `PUT`
-   **Request Body**:

    ```json
    {
        "items": ["Item1", "Item2"]
    }
    ```

-   **Response**:

    ```json
    {
        "_id": "60d9f4f88eb0c62f24b8e4f2",
        "name": "Mover1",
        "weightLimit": 100,
        "questState": "loading",
        "items": ["60d9f53f8eb0c62f24b8e4f4", "60d9f53f8eb0c62f24b8e4f5"]
    }
    ```

### Start a Mission

-   **URL**: `/api/magic-movers/:id/start-mission`
-   **Method**: `PUT`
-   **Response**:

    ```json
    {
        "_id": "60d9f4f88eb0c62f24b8e4f2",
        "name": "Mover1",
        "weightLimit": 100,
        "questState": "on-mission",
        "items": ["60d9f53f8eb0c62f24b8e4f4", "60d9f53f8eb0c62f24b8e4f5"]
    }
    ```

### End a Mission

-   **URL**: `/api/magic-movers/:id/end-mission`
-   **Method**: `PUT`
-   **Response**:

    ```json
    {
        "_id": "60d9f4f88eb0c62f24b8e4f2",
        "name": "Mover1",
        "weightLimit": 100,
        "questState": "resting",
        "items": []
    }
    ```

### Get Top Movers

-   **URL**: `/api/magic-movers/top-movers`
-   **Method**: `GET`
-   **Response**:

    ```json
    [
        {
            "mover": {
                "_id": "60d9f4f88eb0c62f24b8e4f2",
                "name": "Mover1",
                "weightLimit": 100,
                "questState": "resting",
                "items": []
            },
            "missionCount": 5
        }
    ]
    ```

## Request Validation

The API uses Zod for request validation to ensure data integrity and handle errors gracefully. Each endpoint validates the incoming request data according to the expected schema, providing clear error messages if validation fails.

## Running Tests

The API is fully tested using Jest and Supertest. To run the tests, use the following command:

```bash
npm test
```

## Contact Information

For support or inquiries, please contact:

-   **Name:** Mohamad Mazkatli
-   **Email:** mazovic23@gmail.com
-   **GitHub:** [mazovic](https://github.com/mazovic)
