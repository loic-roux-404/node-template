import base from './base'

export default {
    build(
        showAction = '',
        newAction = '',
        updateAction = '',
        deleteAction = ''
    ) {
        this.show = showAction
        this.new = newAction
        this.update = updateAction
        this.delete = deleteAction
    },
    new(payload) {
        return base.post(this.new, payload)
    },
    update(payload) {
        return base.post(this.update, payload)
    },
    delete(payload) {
        return base.delete(this.delete, payload)
    },
    show(payload) {
        return base.get(this.show, payload)
    },
}
