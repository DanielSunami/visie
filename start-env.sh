#!/bin/bash

cd backend
echo 'installing backend...'
npm install
node index.js &
echo $! > ../back.pid
cd ../frontend
echo 'installing express...'
npm install express
node server.js &
echo $! > ../front.pid
