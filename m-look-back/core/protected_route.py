from functools import wraps
from fastapi import Depends, HTTPException, status
from typing import List
from models.user import User
from core.dependency import get_auth_user


from fastapi import HTTPException, status
from functools import wraps
from typing import List
from fastapi import Depends


def protected_route(required_roles: List[str] = None):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, current_user: User = Depends(get_auth_user), **kwargs):
            if required_roles and not any(role in current_user.role for role in required_roles):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Not enough permissions"
                )
            return await func(*args, current_user=current_user, **kwargs)
        return wrapper
    return decorator
