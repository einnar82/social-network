import { format } from 'timeago.js';
const mixin = {
    methods: {
        ago(time) {
            return format(time)
        },
        sendComment() {}
    }
}

export default mixin;