# Connectify
Certainly, here is a refined README file incorporating the detailed development steps and enhancements discussed earlier:

Connectify - Group Chat Application

This repository contains the backend and frontend implementation for a real-time group chat application built with Spring Boot, Spring WebSocket, MongoDB, and React.js.

Features:

Room Management:
Create new chat rooms with unique IDs.
Join existing chat rooms by providing their IDs.
Messaging:
Send and receive messages in real-time within a chat room.
Persist messages in MongoDB for each room.
Real-time Communication:
Utilize WebSockets (STOMP protocol) for instant message delivery to all users in a room.
User Interface:
User-friendly interface with clear options for creating and joining rooms.
Simple UI for chatting and room management.
Responsive design for optimal user experience.
Technologies Used:

Backend:
Spring Boot
Spring WebSocket
Spring Data MongoDB
Java
Frontend:
React.js
JavaScript
CSS
Database: MongoDB
Real-time Communication: WebSocket (STOMP protocol)
Architecture:

Backend:
RESTful APIs for room creation, joining, and message handling.
WebSocket configuration for real-time communication.
MongoDB integration for storing rooms and messages.
Frontend:
Homepage with "Create Room" and "Join Room" options.
Forms for room creation and joining.
Chat interface for displaying messages and sending new ones.
API Endpoints:

Room Management:

Create Room:

POST /room/create
Payload: { "name": "Room Name" }
Functionality:
Validate room name (e.g., length, uniqueness).
Create a new room in MongoDB.
Return the newly created room's ID.
Join Room:

GET /room/{roomId}
Functionality:
Retrieve room details and messages from MongoDB.
Return room details and messages to the frontend.
Handle cases where the room does not exist.
Messaging:

Send Message:

POST /room/{roomId}/message
Payload: { "sender": "Username", "message": "Message content" }
Functionality:
Store the message in MongoDB.
Broadcast the message to all users in the room via WebSocket.
Fetch Messages:

GET /room/{roomId}/messages
Functionality:
Retrieve all messages for a specific room ID from MongoDB.
Return messages to the frontend.
WebSocket Connection:

Endpoint: /chat
Functionality:
Handle real-time message delivery to all users in a room.
Development Steps:

Backend Development:
API Setup
WebSocket Configuration
MongoDB Integration
Frontend Development:
Homepage
Room Creation Form
Room Joining Form
Chat Interface
Testing:
Multiple User Testing
Message Persistence Testing
Real-time Communication Testing
Getting Started:

<!-- Clone the repository:

Bash

git clone <repository_url>
Set up environment variables:

Create a .env file in the project root and add the following environment variables:
MONGODB_URI=<your_mongodb_connection_string>
Build and run the application:

Bash

mvn clean install
Bash

mvn spring-boot:run
Contributing:

Contributions are welcome! Please feel free to submit pull requests or create issues for any bugs or enhancements you'd like to see.

License:

This project is licensed under the MIT License.

Additional Notes:

This README provides a comprehensive overview of the Connectify application.
The application is still under development and may contain further improvements and features.
Remember to replace the placeholders with your actual information and update the README accordingly.
This README file provides a detailed and informative overview of your Connectify project. Feel free to further customize it based on your specific needs and preferences. -->