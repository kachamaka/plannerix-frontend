# !/bin/bash

Color='\033[1;36m'
NC='\033[0m' # NC = no color

if [ $(git rev-parse --abbrev-ref HEAD) == "master" ]; then
    if [ -z "$(git status --porcelain)" ]; then
        git checkout prod
        git merge -X theirs master
        ng build --prod
        git add -f ./dist/*
        git commit -m "auto built"
        git push origin prod
        git checkout master
    else
        echo "Working directory is not clean" 
    fi
else
    echo -e "Should be on branch master. Current branch: ${Color}$(git rev-parse --abbrev-ref HEAD)${NC} !" 
fi