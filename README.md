# Chatty 🤖🗣️

Chatty is a real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. This project is containerized using Docker and Docker Compose, and features an NGINX reverse proxy to manage routing.

## Features

- Real-time chat functionality using Socket.io
- User authentication and management
- MongoDB for data storage
- Frontend built with React
- Backend built with Node.js and Express
- Dockerized for easy deployment
- NGINX reverse proxy for routing and hiding service addresses

## Setup and Installation

### Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose

### Running the Application

1. **Clone the Repository:**
    ```sh
    git clone https://github.com/yourusername/chatty.git
    cd chatty
    ```

2. **Create Environment Variables:**
    - Create a `.env` file in the backend directory with your MongoDB credentials.

3. **Build and Run with Docker Compose:**
    ```sh
    docker-compose up --build
    ```

4. **Access the Application:**
    - Open your browser and navigate to `http://localhost`.

## Project Overview

For this project, I have performed the following steps:

1. Created Dockerfiles for both the backend and frontend.
2. Configured the backend to connect to a MongoDB service running in a Docker container.
3. Set up Docker Compose to manage the multi-container application.
4. Configured environment variables in the frontend to communicate with the backend.
5. Added an NGINX reverse proxy to route requests to the appropriate services, ensuring the backend and frontend are accessible through port 80.

You can find the complete code and configuration files in the repository.

## Repository Structure

## Screenshots

Here are some screenshots of the application:

### Login Page
![Login Page](https://github.com/shadlia/Chatty/assets/74935083/2e8eadab-d7bb-4102-b8d7-78ea9b1a4f42)

### Avatar Interface
![Avatar interface](https://github.com/shadlia/Chatty/assets/74935083/b2aced10-21ac-487c-81ee-a139d49261de)

### Welcome Interface
![Welcome interface](https://github.com/shadlia/Chatty/assets/74935083/2318a81e-8140-43af-a591-fafa9e4f0531)

### Chat Interface
![Chat Interface](https://github.com/shadlia/Chatty/assets/74935083/8ff07ad1-a0ec-4b1a-93fb-6bf380a62316)


## Conclusion

This project demonstrates how to containerize a MERN stack application with Docker, manage it with Docker Compose, and use NGINX as a reverse proxy. The complete application can be easily deployed and managed using these tools.

You can find the complete project on [GitHub](https://github.com/yourusername/chatty).

## License

This project is licensed under the MIT License.


