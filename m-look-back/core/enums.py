from enum import Enum


class RoleEnum(Enum):
    USER = "user"
    ADMIN = "admin"
    OWNER = "owner"
    MODERATOR = "moderator"


class GenderEnum(Enum):
    MALE = "male"
    FEMALE = "female"


class CurrencyEnum(str, Enum):
    UZS = "UZS"
    USD = "USD"
    EUR = "EUR"
    RUB = "RUB"


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"
