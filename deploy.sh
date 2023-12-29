#!/bin/sh

node solutions/viewer-server.js

git add --all . 

git commit -S -m 'feat!: day '"$1"' completed'

gh pr create --fill --base main

gh pr merge --merge --auto