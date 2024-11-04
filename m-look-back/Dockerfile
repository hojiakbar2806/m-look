FROM python:3.12-slim AS base

WORKDIR /app

# Poetry o'rnatish
RUN pip install --no-cache-dir poetry

# Poetry konfiguratsiya fayllarini nusxalash va o'rnatish
COPY pyproject.toml poetry.lock* /app/
RUN poetry config virtualenvs.create false && poetry install --no-dev --no-interaction --no-ansi

# Loyihani nusxalash
COPY . .

# 8000 portni ochish
EXPOSE 8000

# CMD komandasi bilan birgalikda Alembic migratsiyalarini bajarish
CMD ["gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app"]
