def to_came_case(name: str) -> str:
    return "".join([word.lower() for word in name.split("_")])+"s"
