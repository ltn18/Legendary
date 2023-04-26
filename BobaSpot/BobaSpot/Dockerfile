ARG PYTHON_VERSION=3.10-slim-buster

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /code

WORKDIR /code

COPY backend/requirements.txt /tmp/requirements.txt

# RUN touch /code/.env \
#     cd /code/ \
#     echo DB_NAME="postgres" >> .env \
#     echo DB_USER="postgres" >> .env \
#     echo DB_PASSWORD="R{<;D8.LBU8Yh0RZ" >> .env \
#     echo DB_HOST_IP="34.67.4.9" >> .env \
#     echo DB_PORT="5432" >> .env \
#     echo JWT_SECRET_KEY="thisisasecretkeyhihi" >> .env

RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/
RUN pip list
COPY . /code

# RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "BobaSpot.wsgi:application"]
