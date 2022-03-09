from datetime import datetime
import os
from flask import Flask, jsonify, request, Response

AUDIO_DIR = "standard_set"


audioList = os.listdir(AUDIO_DIR)

app = Flask(__name__)


@app.route("/api/time")
def get_time():
    return jsonify(datetime.now())


@app.route("/api/audio")
def get_audio():
    audioFileName = request.args.get("name")
    if not audioFileName in audioList:
        return Response("Bad Request: Audio file not found", status=400)

    with open(os.path.join(AUDIO_DIR, audioFileName), "rb") as af:
        content = af.read()

    return Response(content, content_type="audio/mpeg")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8190, debug=True)
