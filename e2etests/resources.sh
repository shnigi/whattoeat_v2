#!/bin/bash

function runByTestName() {
  if [[ $2 == "headless" ]]; then
     robot --test "$1" -v BROWSER:headlesschrome -d results .
  else
     robot -v BROWSER:googlechrome --test "$1" -d results .
  fi
}

function runByFile() {
  if [[ $2 == "headless" ]]; then
     robot -v BROWSER:headlesschrome -d results $1
  else
     robot -v BROWSER:googlechrome -d results $1
  fi
}

function runAllTests() {
  if [[ $1 == "headless" ]]; then
     robot -v BROWSER:headlesschrome -d results .
  else
     robot -v BROWSER:googlechrome -d results .
  fi
}