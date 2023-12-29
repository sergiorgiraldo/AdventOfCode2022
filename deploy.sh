#!/bin/sh

git add --all . 

git commit -S -m 'feat!: day '"$1"' completed'

node solutions/viewer-server.js

gh pr create --fill

gh pr merge