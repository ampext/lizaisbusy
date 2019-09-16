.PHONY: build-server build-ui install

build-server:
	go get && go build

build-ui:
	cd ui && yarn && yarn build

install:
	mkdir -p $(DESTDIR)/monitor
	mkdir -p $(DESTDIR)/server/static
	cp lizaisbusy $(DESTDIR)/server
	cp -r ui/dist/* $(DESTDIR)/server/static