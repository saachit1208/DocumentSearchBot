# Test Document: `tests/test_app.py`

This document contains test cases for the `test_app.py` module.

## Test Setup

```python
# Import necessary modules and libraries
import json
import pytest
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, get_jwt, create_access_token, unset_jwt_cookies
from werkzeug.datastructures import FileStorage
from io import BytesIO

# Fixture to set up the testing client
@pytest.fixture
def client():
    from run import app
    app.config["TESTING"] = True
    app.config["JWT_SECRET_KEY"] = "542e10c55fd5e5f427e2dc8c6e4e6839187fbc9114cd8b64a6f398169aa9341e"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False  # Disable token expiration for testing
    app.config["UPLOAD_FOLDER"] = "./tests/test_data"  # Use a separate upload folder for testing
    client = app.test_client()
    yield client
```
## Test Cases
### 1. Test Login
``` python
Copy code
def test_login(client):
    print("test1-----------------")
    print(client)
    response = client.post(
        "/login",
        json={"username": "saachi", "password": "admin"},
        content_type="application/json",
    )
    data = json.loads(response.data)
    assert response.status_code == 200
    assert "access_token" in data
```

``` python
def test_search_authorized(client):
    with client.application.app_context():
        access_token = create_access_token(identity={"username": "saachi", "role": "admin"})
        headers = {"Authorization": f"Bearer {access_token}"}
        response = client.get("/search", headers=headers)
        assert response.status_code == 400
        data = json.loads(response.data)
        assert "error" in data and "No query found." in data["error"]

```
