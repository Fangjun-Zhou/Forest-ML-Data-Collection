from pandas import DataFrame
from exceptions.BasicExceptions import IndexOutOfRangeException, NoSuchElementException
from utils.DataSet import DataSet
import pytest

from utils.question.QuestionSet import Question


class TestQuestionGeneration:

    def test_no_available(self):
        """Test case when there's no more available option.
        All the options should be excluded.
        The method should raise IndexOutOfRangeException
        """
        dataSet = DataSet(
            ["1", "2", "3"],
            set([1, 2, 3]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        with pytest.raises(IndexOutOfRangeException):
            question = Question.GenerateQuestion(dataSet, ["1", "2", "3"], 3)
            print(question)

    def test_no_answer(self):
        """Test case when randomized index is not in the answer set.
        Method should raise no such element exception.
        """
        dataSet = DataSet(
            ["4", "5", "6"],
            set([1, 2, 3]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        with pytest.raises(NoSuchElementException):
            question = Question.GenerateQuestion(dataSet, [], 3)
            print(question)

    def test_limit_ans_size(self):
        """Test case when the available options is limited.
        The method should pick "3" as audio file.
        As the only option is also 3, the final options should only be [3]
        The returned question should contain limited options.
        """
        dataSet = DataSet(
            ["3"],
            set([3]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        question = Question.GenerateQuestion(dataSet, [], 3)
        assert(len(question.options) == 1)

    def test_limit_ans_size_2(self):
        """Test case when the available options is limited.
        The method should pick "1" as audio file.
        As the only option is also 3, the final options should only be [1, 3]
        The returned question should contain limited options.
        """
        dataSet = DataSet(
            ["1"],
            set([3]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        question = Question.GenerateQuestion(dataSet, [], 3)
        assert(len(question.options) == 2)

    def test_limit_ans_size_3(self):
        """Test case when the available options is limited.
        The method should pick "1" as audio file.
        As the options are [2, 3], the final options should only be [1, 2, 3]
        The returned question should contain limited options.
        """
        dataSet = DataSet(
            ["1"],
            set([2, 3]),
            DataFrame(index=["1", "2", "3"], data={
                "ans": [1, 2, 3]
            })
        )

        question = Question.GenerateQuestion(dataSet, [], 3)
        assert(len(question.options) == 3)
