from typing import List, Set
import pandas


class DataSet:
    """The data set class to store all the question related data
    """

    def __init__(self, audioFiles: List[str], options: Set[str], answerSet: pandas.DataFrame) -> None:
        """The constructor for DataSet class

        Args:
            audioFiles (List[str]): all the audio file names
            options (Set[str]): all the available options
            answerSet (pandas.DataFrame): answer data frame
        """
        # All the audio file names
        self.audioFiles = audioFiles
        # All available options
        self.options = options
        # The data frame that stores the answer to questions.
        # answerSet.index is the name of each audio files, answerSet.ans is the answer choice.
        self.answerSet = answerSet
