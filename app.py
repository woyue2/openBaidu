from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_url', methods=['GET'])
def get_url():
    # Retrieve the search query parameter from request URL
    search_term = request.args.get('search', '')  # defaults to empty string if 'search' is not provided
    url = f"http://{search_term}.com"
    return jsonify({"url": url})

if __name__ == '__main__':
    app.run(debug=True)