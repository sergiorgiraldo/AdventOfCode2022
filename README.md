# AdventOfCode2022

## Puzzles from 

https://adventofcode.com/2022/

## My solutions

https://sergiorgiraldo.github.io/AdventOfCode2022/solutions/

## Performance

![](https://img.shields.io/badge/day%20📅-24-blue)
 
![](https://img.shields.io/badge/stars%20⭐-36-yellow)

## Usage

 - To run a solution by day, use: `npm start day2`

    - If it is a new day, it will generate the folder for the day based on the template, also download the input using AOCD (https://github.com/wimglenn/advent-of-code-data)

- To run test by day, use: `npm test day2`

- To submit answers, use: `npm run submit [1..25] [1|2]`

  - `npm run submit 15 1`, part 1 of day 15

  - `npm run submit 15 2`, part 2 of day 15

- To merge and generate relase, use `./deploy.sh day`

  - `./deploy.sh 7`, day seven completed 

## Setup

1. Enable github pages: repo settings > pages > deploy from branch main, root
2. Configure release-please workflow
  a. Chamge the year   
3. Configure "update stars in readme" workflow
  a. create a PAT with repo permissions and store in secrets (GH_PAT_AOCYYYY, replace YYYY with year from advent), update the name in the chekcout step
  b. change the year in the workflow
  c. double-check the aoc userid and session
  d. hints in the pages:
   - https://www.adebayosegun.com/blog/push-to-protected-branch-gh-action
   - https://github.com/marketplace/actions/aoc-badges
4. Change the year in package.json and set version to 0.0.0
5. Change the year in the readme
6. Change ITERATION to 0.0.1
7. Delete CHANGELOG.md and package-lock.json 

## Based in 

https://github.com/johnbeech/advent-of-code-nodejs-template
