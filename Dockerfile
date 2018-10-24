FROM node


WORKDIR /code
ADD package*.json /code/
RUN npm install
COPY . /code

ENV PORT 80
EXPOSE 80