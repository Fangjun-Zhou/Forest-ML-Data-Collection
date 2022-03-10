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

    def GenerateQuestions(self):
        """Generate a series of questions
        """
        self.questions = []


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

        return Question(audioFile, availableOptions)
