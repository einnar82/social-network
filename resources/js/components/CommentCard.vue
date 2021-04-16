<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-11 is-offset-1">
        <div class="card-content card-shade">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/bamboo.jpg" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6 has-text-weight-bold">{{ comment.name }}</p>
              <p class="subtitle is-6">@BambooMusicLive</p>
            </div>
          </div>

          <div class="content">
            {{ comment.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              ago(comment.updated_at)
            }}</time>

            <div class="comments-tab">
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold mr-3"
                @click="viewReplies(comment)"
              >
                View Replies
              </p>
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold"
                @click="showReplyBox"
              >
                Reply
              </p>
            </div>

            <div class="columns" v-show="replyBox">
              <div class="column">
                <b-field label="Add a comment">
                  <b-input
                    maxlength="200"
                    type="textarea"
                    size="is-small"
                    v-model="child_comment_text"
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
import httpClient from "../helpers/http";
import mixin from "../mixins";

export default {
  mixins: [mixin],
  name: "CommentCard",
  props: {
    replyBox: {
      type: Boolean,
    },
    comment: {
      type: Object,
    },
  },
  data: () => ({
    child_comment_text: null,
  }),
  methods: {
    showReplyBox() {
      this.$emit("reply-box", this.replyBox);
    },
    viewReplies(comment) {
      this.$emit("view-replies", comment);
    },
    sendComment() {
      const originalPayload = {
        parent_id: this.comment.id,
        name: "Bamboo Mañalac",
        comment_text: this.child_comment_text,
      };
      httpClient({
        url: "/comments",
        method: "post",
        data: {
          ...originalPayload,
        },
      }).then((response) => {
        this.child_comment_text = null;
        // this.posts[0].comments.unshift(response.data);
        // this.posts = response.data;
        this.$emit("send-child-comment", response.data);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}

.card-shade {
  background-color: #dfe6e9;
  border: 2px;
  // border-radius: 26px;
}

.comments-tab {
  display: flex;
}
</style>