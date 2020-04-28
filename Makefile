include .manala/mk/node-commons.mk

USER_DEPLOY=pandemik699
SSH_ADDRESS=ssh-$(USER_DEPLOY).alwaysdata.net
REMOTE_DIR_DEPLOY=/home/$(USER_DEPLOY)/www
KEY?=83ce8fc61f7f4d559d6de8d7f8a2cecb
ID?=601897

# node js run
dev-exe?=./$(NODE_MODULES)/nodemon/bin/nodemon.js -e $(EXTS)

# API config for alwaysdata
API=https://api.alwaysdata.com/v1

help_more:
	@echo "[==== node-tp ====]"

# deploy for alwaydata datacenter
deploy-ald: deploy
	curl --basic --request POST --user $(KEY): $(API)/site/$(ID)/restart/
