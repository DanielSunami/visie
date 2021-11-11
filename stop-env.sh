#!/bin/bash

echo 'killing back...'
kill -9 `cat ./back.pid`
echo 'killing front...'
kill -9 `cat ./front.pid`