# Design and Approach: Document Search Bot

## Search Bot Application with Document Upload

### Application Overview

The application serves as a Search Bot or query engine designed for natural language document queries. It integrates a React front-end and a Flask back-end to provide users with an efficient and user-friendly search experience. The system utilizes the LLama Index data framework to connect custom data sources with OPEN AI’s Large Language Models.

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
The search API takes a query input and passes this to the LLAMA-INDEX backed document search flow. It returns the response as an "answer" to your query.

#### 3.3.1 LLama Index Integration
Llama Index is data framework connecting custom data sources with Large Language models. It uses the principle of Retrieval Augmented Generation to provide end to end  pipelines to work with custom data.

Large Language Models (LLMs) undergo training on extensive datasets, yet they lack personalized training on individual user data. The introduction of Retrieval-Augmented Generation (RAG) addresses this limitation by incorporating user-specific data into the existing dataset accessible to LLMs. Frequent mentions of RAG can be found throughout this documentation.

Within the RAG framework, user data is loaded and prepped for queries, effectively "indexed." User queries then operate on this index, refining the data to the most pertinent context. Subsequently, this context, combined with the user's query, is presented to the LLM alongside a prompt, soliciting a response.

For this specific application we are using the query engine use case offered by llama index to ask questions over your data - 
Query Engines: A query engine is an end-to-end pipeline that allow you to ask question over your data. It takes in a natural language query, and returns a response, along with reference context retrieved and passed to the LLM.

[^1]: https://docs.llamaindex.ai/en/v0.9.10/getting_started/concepts.html

![image](https://github.com/saachit1208/DocumentSearchBot/assets/32326876/9adb6858-8cb8-44bf-8ac3-32192ffc3907)

[^1]: https://docs.llamaindex.ai/en/v0.9.10/getting_started/concepts.html


#### 3.3.2 Document Search Backend 

The backend includes functionality to index documents stored in the "./data" directory. Various document types, including PDFs, PPTs, DOCs, XLSX, are supported. The index_documents function utilizes the LLama Index to create a searchable document index. 

### 4. User Authentication 

#### 4.1 JWT Implementation 

The implementation of user authentication using JSON Web Tokens provides a secure access control mechanism. User roles dictate access to specific functionalities, ensuring a role-based security model. For simplicity, user data is currently hardcoded, and future integrations can include a database. 

### 5. Testing Using Pytest 

#### 5.1 Unit Testing 

Pytest is employed for automated unit testing of various components. Comprehensive coverage includes functionalities such as login, search, file upload, and user authentication. 
