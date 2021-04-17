<template>
  <div class="columns is-full is-centered pt-6">
    <div class="column is-6">
      <div
        class="card bg-override"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="card-content card-shade  shadow-override">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/bamboo.jpg" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 has-text-weight-bold">{{ post.name }}</p>
              <p class="subtitle is-6">{{username(post.name)}}</p>
            </div>
          </div>

          <div class="content">
            {{ post.title }}
            <br />
            <time datetime="2016-1-1">{{ ago(post.updated_at) }}</time>
            <div class="comments-tab">
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold mr-3"
                @click="showMoreComments"
              >
                View Comments
              </p>
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold"
                @click="showCommentBox"
              >
                Add Comment
              </p>
            </div>
            <div class="columns" v-show="commentBox">
              <div class="column">
                <b-field label="Name">
                  <b-input v-model="name"></b-input>
                </b-field>
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
            @send-child-comment="sendChildComment"
            @view-replies="viewReplies"
            v-bind="{ comment: comment, replyBox: comment.enable }"
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
import mixin from "../mixins";
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
    details: {},
    name: null,
    parent_comment_text: null,
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    viewReplies(comment) {
      httpClient({
        url: `/comments/${comment.id}`,
        method: "get",
      }).then((response) => {
        const { data, ...otherDetails } = response.data;
        const parentComment = this.posts[0].comments.find((item) => {
          return item.id === comment.id;
        });

        Object.assign(parentComment, {
          ...parentComment,
          children: data,
        });
      });
    },
    showCommentBox() {
      this.commentBox = !this.commentBox;
    },

    sendChildComment(comment) {
      const parentId = comment.parent_id;
      const parentComment = this.posts[0].comments.find((item) => {
        return item.id === parentId;
      });

      parentComment.children.unshift(comment);
      parentComment.enable = !parentComment.enable;
    },
    showMoreComments() {
      httpClient({
        url: this.details.next_page_url,
        method: "get",
      }).then((response) => {
        console.log("other comments", response.data);
        const { data, ...otherDetails } = response.data;
        const latestComments = data.map((comment) => {
          return {
            ...comment,
            enable: false,
            children: [],
          };
        });
        this.posts = [
          {
            name: "Bamboo Manalac",
            title: "Tignan mo ang iyong palad",
            updated_at: new Date(),
            comments: this.posts[0].comments.concat(latestComments),
          },
        ];
        this.details = otherDetails;
      });
    },
    sendComment() {
      const originalPayload = {
        name: this.name,
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
          ...response.data.data,
          enable: false,
          children: [],
        };
        this.posts[0].comments.unshift(mutatedComment);
        this.parent_comment_text = null;
        this.name = null;
        this.commentBox = !this.commentBox;
      });
    },
    showReplyBox(index) {
      this.posts[0].comments[index].enable = !this.posts[0].comments[index]
        .enable;
    },
    fetchPosts() {
      httpClient({
        url: "/comments",
        method: "get",
      }).then((response) => {
        const { data, ...otherDetails } = response.data;
        const latestComments = data.map((comment) => {
          return {
            ...comment,
            enable: false,
            children: [],
          };
        });
        this.posts = [
          {
            name: "Bamboo Mañalac",
            title: "Tignan mo ang iyong palad",
            updated_at: new Date(),
            comments: [...latestComments],
          },
        ];
        this.details = otherDetails;
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

.card-shade {
  // background-color: #ced6e0;
  background-color: #ffff;
  border: 2px;
  // border-radius: 26px;
}

.shadow-override {
  box-shadow: none;
  border: 0px;
}

// .bg-override {
//   background-color: #4bcffa;
// }

.comments-tab {
  display: flex;
}
</style>