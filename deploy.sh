#!/bin/sh
# create new build folder
npm run build
# clear old assets
rm -rf /var/www/epa-dashboard/html/
# copy new assets
cp -a build/. /var/www/epa-dashboard/html/
echo "Deploy complete successfully"
