#!/bin/bash

# 目标目录
COPY_TO=/usr/local/share/applications/itchen-lgl-web/

# jenkins打包目录
COPY_FROM=/var/lib/jenkins/workspace/itchen-lgl-web/

# 复制的目录
COPY_FOLD=build

echo "复制build"

rm -rf ${COPY_TO}${COPY_FOLD}
sleep 2

if [ ! -d ${COPY_TO}${COPY_FOLD} ];
then
  mkdir ${COPY_TO}${COPY_FOLD}
fi
sleep 2

cp -r  ${COPY_FROM}${COPY_FOLD}/* ${COPY_TO}${COPY_FOLD}