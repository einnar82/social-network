import { format } from 'timeago.js';
const mixin = {
    data: () => ({
        commentBox: false,
        name: null,
        comment_text: null
    }),
    methods: {
        dd(data) {
            console.log(data)
        },
        ago(time) {
            return format(time)
        },
        sendComment() {},
        showMoreComments() {},
        showCommentBox() {},
        username(name) {
            return name ? `@${name.toLowerCase().replace(/ /g, '')}` : '';
        }
    }
}

export default mixin;