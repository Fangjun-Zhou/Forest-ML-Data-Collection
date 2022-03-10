from datetime import datetime
import os
import random
from flask import Flask, jsonify, request, Response
import pandas

from utils.DataSet import DataSet

AUDIO_DIR = "standard_set"


audioList = os.listdir(AUDIO_DIR)

ansDf = pandas.read_csv("standard_ans.csv")
ansDf = ansDf.set_index("audio")

dataSet = DataSet(audioList, set(ansDf.index), ansDf)
dataSet.answerSet

app = Flask(__name__)


@app.route("/api/time")
def get_time():
    return jsonify(datetime.now())


@app.route("/api/audio")
def get_audio():
    """Get a specific audio file from the audio list

    Returns:
        Response: network response
    """
    audioFileName = request.args.get("name")
    if not audioFileName in audioList:
        return Response("Bad Request: Audio file not found", status=400)

    with open(os.path.join(AUDIO_DIR, audioFileName), "rb") as af:
        content = af.read()

    return Response(content, content_type="audio/mpeg")


@app.route("/api/randquestion")
def random_question():
    """Randomly generate a question

    Returns:
        Response: network response
    """
    # Random choose a audio.
    audioFileName = random.choice(audioList)
    print(f"Choose {audioFileName}")

    # Get rid of the file extention
    key = audioFileName.split(".")[0]

    # Answer not found
    if not key in list(ansDf.index):
        print("No answer found in answer data frame.")
        return Response("Answer found error", status=400)

    # The real answer of the question
    ans = int(ansDf.at[key, "ans"])
    # Add two more bait answers
    residents = [int(x) for x in set(ansDf["ans"]) if x != ans]
    random.shuffle(residents)
    if len(residents) > 2:
        choices = residents[0:2]
    else:
        choices = residents
    choices.append(ans)

    question = {
        "audio": audioFileName,
        "choices": choices,
    }

    print(question)

    return jsonify(question)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8190, debug=True)
