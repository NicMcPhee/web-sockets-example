#!/usr/bin/env bash
for file in ./seed/*.json; do
  echo Seeding $(basename "$file" ".json") from $file in DB ${1:-dev}
  mongoimport --db=${1:-dev} --collection=$(basename "$file" ".json") --file=$file --jsonArray
done
