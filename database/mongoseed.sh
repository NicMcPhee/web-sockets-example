#!/usr/bin/env bash
for file in ./seed/*.json; do
  echo Seeding $(basename "$file" ".json") from $file
  mongoimport --db=${1:-dev} --collection=$(basename "$file" ".json") --file=$file
done
