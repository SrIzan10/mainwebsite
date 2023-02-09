#!/bin/bash
echo -n "Please specify the name of the commit: "
read commitname
echo "Running git add ."
git add .
echo "Finished running git add ."
echo "Running git commit -m "nameofthecommit""
git commit -m "$commitname"
echo "Finished running git commit -m "nameofthecommit""
echo "Running git push"
git push
echo "Finished running git push"
echo "See ya!"
exit