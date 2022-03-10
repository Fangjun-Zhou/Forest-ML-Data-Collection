from pandas import DataFrame
from exceptions.BasicExceptions import NoSuchElementException
from utils.DataSet import DataSet
import pytest

from utils.question.QuestionSet import Question


class TestQuestionGeneration:

    def TestNoAvailable(self):
        dataSet = DataSet(
            ["1", "2", "3"],
            set(["1", "2", "3"]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        with pytest.raises(NoSuchElementException):
            question = Question.GenerateQuestion(dataSet, ["1", "2", "3"], 3)
            print(question)


dataSet = DataSet(
    ["1", "2", "3"],
    set(["1", "2", "3"]),
    DataFrame(index=["1", "2", "3"], data={
        "ans": [1, 2, 3]
    })
)

question = Question.GenerateQuestion(dataSet, ["1", "2", "3"], 3)
