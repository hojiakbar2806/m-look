import sqlalchemy as sa

class TimeStampMixin:
      created_at = sa.Column(sa.DateTime, default=sa.func.now())
      updated_at = sa.Column(sa.DateTime, onupdate=sa.func.now())