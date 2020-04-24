# TODO sync manala conf
include .manala/mk/node-commons.mk

USER_DEPLOY=pandemik699
SSH_ADDRESS=ssh-$(USER_DEPLOY).alwaysdata.net
REMOTE_DIR_DEPLOY=/home/$(USER_DEPLOY)/www
KEY?=83ce8fc61f7f4d559d6de8d7f8a2cecb
ID?=601897

# API config for alwaysdata
API=https://api.alwaysdata.com/v1

help_more:
	@echo "[==== node-tp ====]"

deploy-ald: rsync
	curl --basic --user $(KEY): $(API)/site/$(ID)