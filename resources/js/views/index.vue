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
            <time datetime="2016-1-1">{{ post.updated_at }}</time>
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
        <div v-for="(comment, index) in post.comments" :key="index">
          <comment-card
            @reply-box="showReplyBox(index)"
            @send-child-comment="sendChildComment(comment.id)"
            @change-child-comment="changeChildComment(text)"
            :replyBox="replyBox"
            :comment="comment"
          />
          <!--reply-->
          <reply-card
            v-for="(child, index) in comment.children"
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
import _get from "../helpers/lodash-get";
export default {
  components: { CommentCard, ReplyCard },
  name: "index",
  data: () => ({
    commentBox: false,
    replyBox: false,
    posts: [],
    parent_comment_text: null,
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    showCommentBox() {
      this.commentBox = !this.commentBox;
    },
    sendChildComment(parent_id) {
      const originalPayload = {
        parent_id: parent_id,
        post_id: 1,
        name: "Rannie Ollit",
        comment_text: this.parent_comment_text,
      };
      console.log(originalPayload)
      // httpClient({
      //   url: "/comments",
      //   method: "post",
      //   data: {
      //     ...originalPayload,
      //   },
      // }).then((response) => {
      //   this.posts[0].comments.unshift(response.data);
      //   // this.posts = response.data;
      //   console.log(response.data);
      // });
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
        this.posts[0].comments.unshift(response.data);
        this.parent_comment_text = null
        // this.posts = response.data;
        console.log(response.data);
      });
    },
    showReplyBox(index) {
      this.replyBox = !this.replyBox;
    },
    fetchPosts() {
      httpClient({
        url: "/posts",
        method: "get",
      }).then((response) => {
        this.posts = response.data;
        console.log(response.data);
      });
    },
    latestReplies(replies) {
      return _get(replies)
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