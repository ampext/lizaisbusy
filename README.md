# lizaisbusy
Sometimes Liza is busy  🐾

![Liza is busy (dark theme)](https://raw.githubusercontent.com/ampext/ampext.github.io/master/images/lizaisbusy_dark.png)

[![Build Status](https://travis-ci.com/ampext/lizaisbusy.svg?token=rSJHbNU4TZ5JfqUKCfei&branch=master)](https://travis-ci.com/ampext/lizaisbusy)

## Install

Golang, Node.js and Yarn must be installed

### Preparation
    mkdir /home/pi/bin/lizaisbusy

### Create an empty database
    sqlite3 events.db < create.sql
    cp events.db /home/pi/bin/lizaisbusy/monitor

### Building
    make build
    make install DESTDIR=/home/pi/bin/lizaisbusy

### Starting moninitor and server

Note: monitor application uses working directory to read file database file with hardcoded name `events.db`

    cd /home/pi/bin/lizaisbusy/monitor && node monitor.js
    /home/pi/bin/lizaisbusy/server/lizaisbusy -db=../monitor/events.db
