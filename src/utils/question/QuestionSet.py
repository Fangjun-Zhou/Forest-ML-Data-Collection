from http.client import ImproperConnectionState
import json

import random
from typing import List, NewType
import uuid

from click import option
from utils.DataSet import DataSet
from exceptions.BasicExceptions import IndexOutOfRangeException, NoSuchElementException


class QuestionSet:
    """A set of questions that assigned to a user
    """

    def __init__(self, dataSet: DataSet) -> None:
        # The unique id of the question set
        self.setId = uuid.uuid4().hex
        # Generate a series of questions
        self.dataSet = dataSet

    def GetQuestionJsonObj(self):
        """Get the json representation of the question set
        """
        return {
            "uuid": self.setId,
            "questions": [question.GetQuestionJsonObj() for question in self.questions]
        }

    def GenerateQuestions(self, questionNum=3, optionNum=3):
        """Generate a series of questions

        Args:
            questionNum (int, optional): The number of questions in the set. Defaults to 10.
        """
        self.questions: List[Question] = []
        excludeFiles = []
        for i in range(questionNum):
            q = Question.GenerateQuestion(
                self.dataSet, excludeFiles, optionNum)
            excludeFiles.append(q.audioFile)
            self.questions.append(q)


class Question:
    """A specific question
    """

    def __init__(self, audioFile: str, options: List[str]) -> None:
        self.audioFile = audioFile
        self.options = options

    def __str__(self) -> str:
        return json.dumps({
            "audio": self.audioFile,
            "options": self.options
        })

    def GetQuestionJsonObj(self):
        """Get the json representation of the question
        """
        return {
            "audio": self.audioFile,
            "choices": self.options,
        }

    def GenerateQuestion(dataSet: DataSet, exclude: List[str], optionNum: int) -> 'Question':
        """Generate a question base on the provide data set

        Args:
            dataSet (DataSet): the provided data set
            exclude (List[str]): the audio file to exclude (already used).
            optionNum (int): the number of options in question.

        Returns:
            Question: generated question
        """
        # Generate a usable list
        availableList = [
            fileName for fileName in dataSet.audioFiles if not fileName in exclude]
        # If there's no audio left, throw exception
        if len(availableList) == 0:
            raise IndexOutOfRangeException("There's no available audio file.")
        audioFile = random.choice(availableList)

        # Generate options
        # TODO: Generate the 3 options by pick the top 3 result from ML modle.
        # Check the audioFile in the answer list
        if not audioFile in dataSet.answerSet.index:
            raise NoSuchElementException(
                f"Audio file {audioFile} not found in the answer set.")
        answer = dataSet.answerSet.at[audioFile, "ans"]
        availableOptions = [
            item for item in dataSet.options if not item == answer]
        # Strip the availableOptions
        if len(availableOptions) > optionNum-1:
            availableOptions = availableOptions[0:optionNum-1]
        availableOptions.append(answer)

        random.shuffle(availableOptions)

        # Convert the numpy int64 to int
        availableOptions = [int(x) for x in availableOptions]

        return Question(audioFile, availableOptions)
