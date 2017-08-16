FROM node

# Create app directory
RUN mkdir -p /home/Service
RUN mkdir -p /var/www
RUN mkdir -p /var/www/html

WORKDIR /home/Service

# Bundle app source
COPY . /home/Service
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]