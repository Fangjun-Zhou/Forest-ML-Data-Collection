

class IndexOutOfRangeException(Exception):
    """The access index is not in the valid range.

    Args:
        Exception (_type_): base exception
    """

    def __init__(self, *args: object) -> None:
        super().__init__(*args)


class NoSuchElementException(Exception):
    """The target element is not found.

    Args:
        Exception (_type_): base exception
    """

    def __init__(self, *args: object) -> None:
        super().__init__(*args)
