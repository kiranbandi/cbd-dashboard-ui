#!/bin/sh
# Script to update apache server
git pull origin master
# create new build folder
npm run build
# stop nginx  server
sudo systemctl stop nginx
# clear old assets
rm -rf /var/www/html/demo/
# copy new assets
cp -a build/. /var/www/html/demo/
# restart nginx server
sudo systemctl start nginx
echo "Deploy complete successfully"
