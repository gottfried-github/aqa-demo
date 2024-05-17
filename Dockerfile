FROM node

RUN mkdir /app
RUN cd /app

COPY . .

RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

CMD ["echo", "installed playwright"]