#!make
# base makefile for nodejs
SHELL = /bin/bash
# Generate env
ENV_FILE=*.env
ENVS=$(basename $(wildcard *.env))
PROD=false
PKG_MANAGER?=yarn

PKG_MANAGER_GLOBAL:=$(PKG_MANAGER) global add

# deploy
REMOTE_DIR_DEPLOY=/var/www

# func to generate inline args from file
line=$(shell cat $(1) | while read line; do echo -n "$$line "; done)

# node js (may change)
NODE_PATH?=src
APP?=$(NODE_PATH)/app.js
NODE_MODULES=node_modules
prod-exe?=node
dev-exe?=$(NODE_MODULES)/nodemon/bin/nodemon.js
EXTS=.pug,.ts,.vue,.js

.DEFAULT_GOAL := help
.PHONY: $(NODE_ENVS)
.PRECIOUS: %.run
$(ENVS): % : %.run

help:
	@echo "[======== Node Help ========]"
	@echo "Usage: make <env> (ARG=<your-arg>)"
	@echo "Available environments: $(ENVS)"
	@$(MAKE) help_more || true

%.run:
	@echo [ === Building $* environments === ]
	@echo [ === check url chrome://inspect/#devices === ]
	$(eval ENVS=$(call line, $*.env))
	NODE_PATH=$(NODE_PATH) $(ENVS) \
	  ./$($*-exe) $(OPTIONS) \
	  -r esm -e $(EXTS) $(APP) 

# define requirements per envs
prod.install:
	$(PKG_MANAGER) install --save --production=true

dev.install:
	$(PKG_MANAGER) install --save
	$(PKG_MANAGER_GLOBAL) nodemon

deploy:
	ssh $(USER_DEPLOY)@$(SSH_ADDRESS) "cd $(REMOTE_DIR_DEPLOY); \
	git fetch --all && git reset --hard upstream/master"

clear:
	rm -rf *.log