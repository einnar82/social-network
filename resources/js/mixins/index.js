import { format } from 'timeago.js';
const mixin = {
    methods: {
        ago(time) {
            return format(time)
        }
    }
}

export default mixin;