rem two servers are expected to run: app on localhost:8000 and selenium on localhost:4444
rem these are launched by running following 2 commands in separate cmd shells on project root:
rem
rem webdriver-manager start
rem npm start

..\node_modules\.bin\karma start karma.conf.js --no-auto-watch --single-run --reporters=dots --browsers=Firefox
..\node_modules\.bin\protractor e2e-tests/protractor.conf.js --browser=firefox
