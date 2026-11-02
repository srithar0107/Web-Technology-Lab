# Experiment 10 – Developing Server-Side Application Using Node.js

## 1. Objective
To develop a basic server-side application using Node.js and implement HTTP request handling to deliver responses to clients.

## 2. Software Requirements
- Node.js
- Visual Studio Code
- Web Browser

## 3. Description
Node.js is a JavaScript runtime environment used to execute JavaScript outside a web browser. In this experiment, the built-in HTTP module is used to create a server for the Elite Architectural Firm.

The server handles client requests and sends an HTML response containing the firm's information, request URL, and request method.

## 4. Concepts Used
- Node.js HTTP module
- HTTP server creation
- Request and response handling
- HTTP status code and response headers
- Server execution using port 3000

## 5. Files Used
- server.js – Contains the Node.js server program.

## 6. Execution Steps
1. Open the exp10 folder in Visual Studio Code.
2. Open the terminal.
3. Execute `node server.js`.
4. Open a browser.
5. Visit `http://localhost:3000`.
6. Verify the webpage displayed by the server.

## 7. Expected Output
- Elite Architectural Firm
- Welcome to our architectural design studio!
- Request URL: /
- Request Method: GET
- Server-side application developed using Node.js.

## 8. Result
Successfully developed and executed a server-side application using Node.js. The HTTP server handled client requests and delivered an HTML response through the web browser.