<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-10 is-offset-2">
        <div class="card-content card-shade">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/bamboo.jpg" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6 has-text-weight-bold">{{ child.name }}</p>
              <p class="subtitle is-6">{{ username(child.name) }}</p>
            </div>
          </div>

          <div class="content">
            {{ child.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              ago(child.updated_at)
            }}</time>
            <div class="comments-tab">
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold mr-3"
                @click="viewReplies(child)"
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
                <b-field label="Name">
                  <b-input v-model="name"></b-input>
                </b-field>
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
import mixin from "../mixins";
export default {
  mixins: [mixin],
  name: "ReplyCard",
  props: {
    child: {
      type: Object,
    },
  },
  data: () => ({
    name: null,
    child_comment_text: null
  }),
  methods: {
    viewReplies() {
      
    }
  }
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