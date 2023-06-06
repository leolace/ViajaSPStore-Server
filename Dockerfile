# from base image node
FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./ .

RUN npm run build
#expose the port
EXPOSE 3000

ENV DB_NAME=🙈
ENV DB_USERNAME=🙈
ENV DB_HOST=🙈
ENV DB_PASS=🙈
ENV DB_PORT=5432

# command to run when intantiate an image
CMD ["npm","start"]