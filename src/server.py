from datetime import datetime
import os
from utils.question.QuestionSet import Question
from flask import Flask, jsonify, request, Response
import pandas

from utils.DataSet import DataSet

AUDIO_DIR = "data/standard_set"
ANSWER_SET = "data/standard_ans.csv"


audioList = os.listdir(AUDIO_DIR)

ansDf = pandas.read_csv(ANSWER_SET)
ansDf = ansDf.set_index("audio")

dataSet = DataSet(audioList, set(ansDf["ans"]), ansDf)
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
    global dataSet
    """Randomly generate a question

    Returns:
        Response: network response
    """
    question = Question.GenerateQuestion(dataSet, [], 5)
    print(question)

    questionDict = {
        "audio": question.audioFile,
        "choices": question.options,
    }

    return jsonify(questionDict)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8190, debug=True)
