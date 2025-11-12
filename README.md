# BDA-lab-documents

Databases laboratory to implement a RESTful API with Jules, using mongodb documents database to test functionalities.

## Dependencies

This project relies on the following dependencies:

- **express**: A minimal and flexible Node.js web application framework.
- **mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **nodemon**: A utility that monitors for changes in your source and automatically restarts your server.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Installation

To get started with this project, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JirlOP/BDA-lab-documents.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd BDA-lab-documents
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

## Configuration

Before running the application, you need to set up the environment variables.

1.  **Create a `.env` file** in the root of the project.

2.  **Add the following variable** to the `.env` file:
    ```
    MONGO_URI="your_mongodb_connection_string"
    ```
    Replace `"your_mongodb_connection_string"` with your actual MongoDB connection URI.

## Running the Application

To run the application, use the following command:

```bash
npm start
```

The server will start on port 5000 by default, and `nodemon` will automatically restart it if you make any changes to the code.
