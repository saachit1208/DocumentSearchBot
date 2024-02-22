from flask import Flask, jsonify,json, request
import os
from document_search import index_documents
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, get_jwt, create_access_token, unset_jwt_cookies
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge

# explicitly set os variable here
os.environ['OPENAI_API_KEY'] = 'YOUR_OPENAI_API_KEY'

app = Flask(__name__)
#Configure Flask app for JWT
app.config['JWT_SECRET_KEY'] = 'fec51b4ac8d1b9548237ac77206c1efef1a9b6a1e1e1140fb4400ecc964b3914'  # Change this to a secure key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
CORS(app)
jwt = JWTManager(app)

UPLOAD_FOLDER = './data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'ppt', 'xlsx', 'pptx', 'xls'}
MAX_FILE_SIZE_MB = 2  # Maximum file size in megabytes


# Mock database of users.
users = {
    'saachi': {'password': 'admin', 'role': 'admin'},
    'user': {'password': 'user', 'role': 'user'}
}

# Endpoint for user login.
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = users.get(username)
    if user and user['password'] == password:
        access_token = create_access_token(identity={'username': username, 'role': user['role']})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
    
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Protected endpoint - requires JWT token and specific role
# Upload files
@app.route('/upload', methods=['POST'])
@jwt_required()
def upload_files():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    uploaded_filenames = []

    
    # Iterate over potential file keys dynamically
    for key in request.files:
        file = request.files[key]
        print(file)
        # Check if the file size exceeds the limit

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            uploaded_filenames.append(filename)

    return jsonify({'uploaded_files': uploaded_filenames})

# Protected endpoint - requires JWT token and specific role
# Endpoint for query search.
@app.route("/search") 
@jwt_required()
def search():
    current_user = get_jwt_identity()
    # Check roles
    if current_user['role'] not in ['admin', 'user']:
        return jsonify({'error': 'Unauthorized'}), 403
    
    query = request.args.get("text", "")
    if query == "":
        return jsonify({'error': 'No query found.'}), 400
    
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    if len(files) == 0:
        print("in len 0")
        return jsonify({'error': 'No documents.'}), 400
    
    response = index_documents(query)
    return str(response), 200

# Protected endpoint - requires JWT token and specific role
# API endpoint to get the list of files
@app.route('/files', methods=['GET'])
@jwt_required()
def list_files():
    current_user = get_jwt_identity()
    # Check roles
    if current_user['role'] not in ['admin', 'user']:
        return jsonify({'error': 'Unauthorized'}), 403
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)


# Protected endpoint - requires JWT token and specific role
# API endpoint to get the list of files
@app.route('/delete', methods=['POST'])
@jwt_required()
def delete_file():
    current_user = get_jwt_identity()
    # Check roles
    if current_user['role'] not in ['admin', 'user']:
        return jsonify({'error': 'Unauthorized'}), 403
    filename = request.get_json()['filename']
    print(filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': 'File deleted successfully'})
    else:
        return jsonify({'error': 'File not found'})

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


if __name__ == "__main__":
    app.run(debug=True)

