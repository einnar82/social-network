<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-11 is-offset-1">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">{{ comment.name }}</p>
              <p class="subtitle is-6">@rannieo</p>
            </div>
          </div>

          <div class="content">
            {{ comment.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              comment.updated_at
            }}</time>
            <p class="subtitle is-5 pointer-cursor" @click="showReplyBox">
              Comment
            </p>
            <div class="columns" v-show="replyBox">
              <div class="column">
                <b-field label="Add a comment">
                  <b-input
                    maxlength="200"
                    type="textarea"
                    size="is-small"
                    v-model="child_comment_text"
                    @change="changeChildComment"
                  ></b-input>
                </b-field>
                <b-button type="is-primary" @click="sendComment"
                  >Comment</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    replyBox: {
      type: Boolean,
    },
    comment: {
      type: Object,
    },
    child_comment_text: {
      type: String
    }
  },
  methods: {
    showReplyBox() {
      this.$emit("reply-box", this.replyBox);
    },

    sendComment() {
      this.$emit("send-child-comment", this.replyBox);
    },

    changeChildComment(comment) {
      this.$emit("change-child-comment", comment);
    }
  },
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}
</style>