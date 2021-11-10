#!/bin/sh

# Create report folder and move result json
mkdir -p coverage/reports
cp coverage/cypress/coverage-final.json coverage/reports/from-cypress.json
cp coverage/jest/coverage-final.json coverage/reports/from-jest.json

# Remove .nyc_output directory to avoid errors
if [ -d '.nyc_output' ]; then
  rm -rf .nyc_output
fi
mkdir -p .nyc_output

npx nyc merge coverage/reports
mv coverage.json .nyc_output/out.json

# Generate final report
npx nyc report --reporter html --reporter text-summary --report-dir coverage/result

