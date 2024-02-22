# Search Bot App

A simple search bot application built with React (client) and Flask (server).

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Description

The Search Bot App is a web application that allows users to perform searches using a search bot implemented with React on the client side and Flask on the server side. The application is designed to showcase the integration of a frontend React app with a Python-based Flask backend.

## Installation

To run the Search Bot App, follow the steps below:

### Client (React App)

1. Navigate to the `client` folder:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Server (Flask App)

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Create and activate a virtual environment (recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up OpenAI API key:

   Obtain an API key from OpenAI and set it in the `run.py` file. Open the `run.py` file and locate the `openai.api_key` variable. Replace `'YOUR_OPENAI_API_KEY'` with your actual OpenAI API key.

## Usage

1. Run the Flask server:

    ```bash
    python run.py
    ```

   This will start the Flask server, and the app will be accessible at `http://localhost:5000`.

2. Run the React app:

    ```bash
    cd client
    npm start
    ```

   The React app will be accessible at `http://localhost:3000`.

### Running Both Simultaneously

To run both the React app and Flask server simultaneously, you can use tools like `concurrently` (for npm) or `&` (for Windows command line). Here are examples:

#### Using concurrently (for npm):

1. Install `concurrently` globally (if not already installed):

    ```bash
    npm install -g concurrently
    ```

2. Run both apps simultaneously:

    ```bash
    npm run dev
    ```

#### Using Windows Command Line:

1. Open two command line windows.

2. In the first window, navigate to the `client` folder and run the React app:

    ```bash
    cd client
    npm start
    ```

3. In the second window, navigate to the `server` folder and run the Flask server:

    ```bash
    cd server
    python run.py
    ```

This will start both the React app and Flask server, allowing you to interact with the application.

## Folder Structure

- **client**: Contains the React app files.
- **server**: Contains the Flask app files, including the `run.py` script to start the server.

## Testing

Testing for the server-side code is implemented using Pytest. Tests are located in the `tests` folder within the `server` directory. To run the tests, follow these steps:

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Activate the virtual environment (if not already activated):

    ```bash
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Run the tests:

    ```bash
    pytest
    ```

   This will execute the tests and provide the test results.

