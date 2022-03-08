from datetime import datetime
from flask import Flask, jsonify


app = Flask(__name__)


@app.route("/api/time")
def get_time():
    return jsonify(datetime.now())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8190, debug=True)
