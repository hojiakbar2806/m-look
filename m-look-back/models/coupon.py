from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from database.base import Base

class Coupon(Base):
      id = Column(Integer, primary_key=True, index=True)
      code = Column(String(255), nullable=False)
      discount = Column(Float, nullable=False)
      created_at = Column(DateTime, default=func.now())
      expires_at = Column(DateTime, nullable=False)
      is_active = Column(Boolean, default=False)