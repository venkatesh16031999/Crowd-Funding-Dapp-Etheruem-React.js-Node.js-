FROM node:12.18.3

RUN mkdir -p /usr/src/crowdfunding/backend

WORKDIR /usr/src/crowdfunding/backend/

COPY package.json /usr/src/crowdfunding/backend/

RUN npm install

COPY ./ ./

CMD ["/bin/bash"]