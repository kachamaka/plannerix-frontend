# !/bin/bash

Color='\033[1;36m'
NC='\033[0m' # NC = no color

if [ $(git rev-parse --abbrev-ref HEAD) == "master" ]; then
    echo "yey"
else
    echo -e "Should be on branch master. Current branch: ${Color}$(git rev-parse --abbrev-ref HEAD)${NC} !" 
fi