from pandas import DataFrame
from exceptions.BasicExceptions import IndexOutOfRangeException
from utils.DataSet import DataSet
import pytest

from utils.question.QuestionSet import Question


class TestQuestionGeneration:

    def test_no_available(self):
        dataSet = DataSet(
            ["1", "2", "3"],
            set(["1", "2", "3"]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        with pytest.raises(IndexOutOfRangeException):
            question = Question.GenerateQuestion(dataSet, ["1", "2", "3"], 3)
            print(question)
