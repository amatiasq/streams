#!/bin/bash
BRANCH='gh-pages'

git stash
grunt

if [ $? = '0' ]
then
  git checkout -b $BRANCH
  git add -f doc dist
  git commit -am "[BUILD COMMIT]"
  git push origin :$BRANCH
  git push origin $BRANCH
  git checkout master
  git branch -D $BRANCH
fi

git stash pop
