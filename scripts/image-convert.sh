#!/usr/bin/env bash

# Given an image, convert to web-ready quality, size, etc
if [ "$#" -ne 1 ]; then
  echo "No file provided to convert. Include a jpg file as input."
else
  echo "Converting image : $1"
  mkdir converted
  convert $1 -resize 1600x1600\> -strip -quality 75 -set filename:f '%t' './converted/%[filename:f]-1600.jpg'
fi
