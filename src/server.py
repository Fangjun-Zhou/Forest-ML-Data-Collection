from crypt import methods
from datetime import datetime
import os
import time
from utils.question.QuestionSet import Question, QuestionSet
from flask import Flask, jsonify, request, Response
import pandas
import sqlite3

from utils.DataSet import DataSet

AUDIO_DIR = "data/standard_set"
ANSWER_SET = "data/standard_ans.csv"

# All the available audios.
audioList = os.listdir(AUDIO_DIR)

# All the answers to the audio file.
ansDf = pandas.read_csv(ANSWER_SET)
ansDf = ansDf.set_index("audio")

dataSet = DataSet(audioList, set(ansDf["ans"]), ansDf)

dbConn = sqlite3.connect("data/distribute.db", check_same_thread=False)
dbCursor = dbConn.cursor()

if (len(dbCursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='UUID'").fetchall()) == 0):
    dbCursor.execute("""
    CREATE TABLE UUID (ID INTEGER PRIMARY KEY, UUID TEXT, TIMESTAMP INTEGER)
    """)
    dbConn.commit()

if (len(dbCursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='USRANSWER'").fetchall()) == 0):
    dbCursor.execute("""
    CREATE TABLE USRANSWER (ID INTEGER PRIMARY KEY, UUID TEXT, QUESTION TEXT, ANSWER TEXT, TIMESTAMP INTEGER)
    """)
    dbConn.commit()

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


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


@app.route("/api/randQuestion")
def random_question():
    global dataSet
    """Randomly generate a question

    Returns:
        Response: network response
    """
    question = Question.GenerateQuestion(dataSet, [], 5)
    print(question)

    return jsonify(question.GetQuestionJsonObj())


@app.route("/api/questionSet")
def random_question_set():
    """Randomly generate a set of questions

    Returns:
        Response: network response
    """
    global dataSet
    questionSet = QuestionSet(dataSet)
    questionSet.GenerateQuestions(questionNum=5, optionNum=3)

    dbCursor.execute(f"""
    INSERT INTO UUID (UUID, TIMESTAMP) VALUES ("{questionSet.setId}", {int(time.time())})
    """)
    dbConn.commit()

    return jsonify(questionSet.GetQuestionJsonObj())


@app.route("/api/submitQuestionSet", methods=["POST"])
def submit():
    answerJson = request.json
    uuid = answerJson["uuid"]
    print(f"UUID: {uuid}")
    questions = [question["audio"] for question in answerJson["questions"]]
    print(f"Questions: {questions}")
    answers = answerJson["answers"]
    print(f"Answers: {answers}")

    # Check UUID
    uuidRecords = dbCursor.execute(f"""
    SELECT * FROM UUID WHERE UUID="{uuid}"
    """).fetchall()
    if len(uuidRecords) == 0:
        return Response("UUID Not Recognize!", status=400)

    # Check question length and answer length
    if len(questions) != len(answers):
        return Response("Missing Answer!", status=400)

    for i in range(len(questions)):
        dbCursor.execute(f"""
        INSERT INTO USRANSWER (UUID, QUESTION, ANSWER, TIMESTAMP) VALUES ("{uuid}", "{questions[i]}", "{answers[i]}", {int(time.time())})
        """)
        dbConn.commit()

    # Remove UUID Record
    dbCursor.execute(f"""
    DELETE FROM UUID WHERE UUID="{uuid}"
    """)
    dbConn.commit()

    return Response("Submit Succeeded")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8190, debug=True,
            ssl_context=("src/certificate.crt", "src/private.key"))
