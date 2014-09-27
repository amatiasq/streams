#!/bin/bash
BRANCH='gh-pages'

git stash
git branch -D $BRANCH
git checkout -b $BRANCH
grunt
git add -f doc dist
git commit -am "[BUILD COMMIT]"
git push origin :$BRANCH
git push origin $BRANCH
git checkout master
git stash pop
