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

ENV DB_NAME=xnxtxoxi
ENV DB_USERNAME=xnxtxoxi
ENV DB_HOST=silly.db.elephantsql.com
ENV DB_PASS=NPlJ3UewAoODg_1CRyHbJC-cRHM-NAN7
ENV DB_PORT=5432

ENV JWT_SECRET=ISA21l3002

# command to run when intantiate an image
CMD ["npm","start"]