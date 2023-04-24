ARG PYTHON_VERSION=3.10-slim-buster

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /code

WORKDIR /code

COPY backend/requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/
RUN pip list
COPY . /code

RUN python manage.py collectstatic --noinput
# RUN python mange.py runserver

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "BobaSpot.wsgi:application"]