import { format } from 'timeago.js';
const mixin = {
    methods: {
        ago(time) {
            return format(time)
        },
        sendComment() {},
        username(name) {
            return name ? `@${name.toLowerCase().replace(/ /g, '')}` : '';
        }
    }
}

export default mixin;