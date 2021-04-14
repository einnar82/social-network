<template>
  <div class="columns is-full is-mobile is-centered">
    <div class="column is-6">
      <div class="card" v-for="post in posts" :key="post.id">
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
              <p class="title is-4">{{ post.name }}</p>
              <p class="subtitle is-6">@rannieo</p>
            </div>
          </div>

          <div class="content">
            {{ post.title }}
            <br />
            <time datetime="2016-1-1">{{ ago(post.updated_at) }}</time>
            <p class="subtitle is-5 pointer-cursor" @click="showCommentBox">
              Comment
            </p>
            <div class="columns" v-show="commentBox">
              <div class="column">
                <b-field label="Add a comment">
                  <b-input
                    maxlength="200"
                    type="textarea"
                    size="is-small"
                    v-model="parent_comment_text"
                  ></b-input>
                </b-field>
                <b-button type="is-primary" @click="sendComment"
                  >Comment</b-button
                >
              </div>
            </div>
          </div>
        </div>
        <!--comment-->
        <div
          v-for="(comment, index) in post.comments"
          :key="index"
        >
          <comment-card
            @reply-box="showReplyBox(index)"
            :replyBox="comment.enable"
            :comment="comment"
            @send-child-comment="sendChildComment"
          />
          <!--reply-->
          <reply-card
            v-for="(child, index) in latestReplies(comment.children)"
            :key="index"
            :child="child"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from "../components/CommentCard.vue";
import ReplyCard from "../components/ReplyCard.vue";
import httpClient from "../helpers/http.js";
import mixin from '../mixins'
export default {
  mixins: [mixin],
  components: { CommentCard, ReplyCard },
  name: "index",
  data: () => ({
    commentBox: false,
    posts: [
      {
        comments: [],
      },
    ],
    parent_comment_text: null,
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    showCommentBox() {
      this.commentBox = !this.commentBox;
    },
    sendChildComment(comment) {
      this.fetchPosts();
    },
    sendComment() {
      const originalPayload = {
        post_id: 1,
        name: "Rannie Ollit",
        comment_text: this.parent_comment_text,
      };

      httpClient({
        url: "/comments",
        method: "post",
        data: {
          ...originalPayload,
        },
      }).then((response) => {
        const mutatedComment = {
          ...response.data,
          enable: false,
        };
        this.posts[0].comments.unshift(mutatedComment);
        this.parent_comment_text = null;
      });
    },
    showReplyBox(index) {
      this.posts[0].comments[index].enable = !this.posts[0].comments[index]
        .enable;
    },
    fetchPosts() {
      httpClient({
        url: "/posts",
        method: "get",
      }).then((response) => {
        const post = response.data[0];
        const mutatedComments = response.data[0].comments.map((comment) => {
          return {
            ...comment,
            enable: false,
          };
        });
        this.posts = [
          {
            ...post,
            comments: [...mutatedComments],
          },
        ];
      });
    },
    latestReplies(replies) {
      return replies
        ? replies.length > 3
          ? replies.slice(0, 3).map((i) => i)
          : replies
        : [];
    },
  },
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}
</style>