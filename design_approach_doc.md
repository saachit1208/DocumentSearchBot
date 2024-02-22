# Design and Approach: Document Search Bot

## Search Bot Application with Document Upload

### Application Overview

The application serves as a Search Bot designed for natural language document queries. It integrates a React front-end and a Flask back-end to provide users with an efficient and user-friendly search experience. The system utilizes the LLama Index data framework to connect custom data sources with OPEN AI’s Large Language Models.

## 2. Front-End Functionality

### 2.1 Search

Users can input search queries through a user-friendly interface developed in React. The front end communicates with the back end to process and display search results.

### 2.2 Upload Files

File upload functionality is incorporated into the React front end. The user interface includes checks for file type and size before initiating the upload process. Admin users can upload, view, and delete files, while normal users can only search.

### 2.3 View and Delete Files

The React front end lists available files and allows users to delete them. Back-end APIs handle file-related actions, providing a cohesive and integrated user experience.

## 3. Back-End APIs

### 3.1 User Authentication

The Flask back end uses JSON Web Tokens (JWT) for secure user authentication. User credentials are validated during the login process, and JWTs are issued upon successful authentication. Logout functionality is implemented to enhance overall system security. Note: User data is currently hardcoded for simplicity.

### 3.2 File Management

Flask back-end APIs handle file-related functionalities, including uploading, listing, and deleting files. User roles (admin, user) are enforced to control access to specific functionalities. Robust error handling is implemented to address various scenarios.

### 3.3 Search API Integration

#### 3.3.1 LLama Index Integration

The LLama Index, an advanced search technology powered by OpenAI, is integrated into the system for efficient search capabilities. Utilizing the OpenAI API, the system employs LLama Index Python libraries to enhance search results using AI-driven vector representations.

**What is the LLama Index:**

The LLama Index, accessible at [www.llamaindex.ai](https://www.llamaindex.ai), is a cutting-edge search technology that leverages AI-driven vector representations to create an index of documents. This integration enhances the quality of search results, providing a seamless and efficient search experience.

#### 3.3.2 Document Search Bac
