# upload_file
Upload a file through a nodeJS API and ReactJS Front

# Local

Open 2 terminals (one for node_docker, one for react_docker), and run
```
npm install && npm start
```
React app will run on localhost:3000 (display a form)
Node api will run on localhost:8080 (display an 'Hello World') 
The uploaded file will be found in node_docker/uploads

# Docker

In node_docker repo
```
docker build -t node-app .
docker run -p 8080:8080 --name node-api -d node-app
```

In react_docker repo
```
docker build -t react-app .
docker run -p 3000:3000 --name react-web -d react-app
```

Once the file is uploaded, it will be found inside the node-api container, to see it :
```
docker exec -t -i node-api /bin/bash
```
It will open a bash, then navigate to the /usr/src/app/uploads repo