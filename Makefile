.PHONY: build-server build-ui install-server install-monitor

build: build-server build-ui

install: install-server install-monitor

build-server:
	go get && go build

build-ui:
	API_URL="" && cd ui && yarn && yarn build

install-server:
	mkdir -p $(DESTDIR)/server/static
	cp lizaisbusy $(DESTDIR)/server
	cp -r ui/dist/* $(DESTDIR)/server/static

install-monitor:
	mkdir -p $(DESTDIR)/monitor
	cp monitor/app/monitor.js monitor/app/package.json monitor/app/yarn.lock $(DESTDIR)/monitor
	cd $(DESTDIR)/monitor && yarn
