#!/bin/bash
BRANCH='latest'

git branch -D $BRANCH
git checkout -b $BRANCH
grunt
rm .gitignore
git add doc dist
git commit -am "[BUILD COMMIT]"
git push origin :$BRANCH
git push origin $BRANCH
git checkout master
