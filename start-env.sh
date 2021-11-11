#!/bin/bash

cd backend
echo 'installing backend...'
npm install
node index.js &
echo $! > ../back.pid
cd ../frontend
node server.js &
echo $! > ../front.pid
