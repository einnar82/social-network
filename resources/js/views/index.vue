<template>
  <div class="columns is-full is-centered pt-6">
    <div class="column is-6">
      <base-comment-card
        :commentBar="commentBar"
        :commentBox="commentBox"
        @show-more-comments="showMoreComments"
        @show-comment-box="showCommentBox"
      >
        <base-comment-card
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          cardClass="column is-11 is-offset-1"
          nameClass="title is-6 has-text-weight-bold"
          commentBtnText="View Replies"
        >
          <base-comment-card
            v-for="(child, index) in comment.children"
            :key="index"
            :comment="child"
            cardClass="column is-10 is-offset-2"
            nameClass="title is-6 has-text-weight-bold"
            commentBtnText="View Replies"
          >
            <base-comment-card
              v-for="(grandchild, index) in child.grand_children"
              :key="index"
              :comment="grandchild"
              cardClass="column is-9 is-offset-3"
              nameClass="title is-6 has-text-weight-bold"
              commentBtnText="View Replies"
            />
          </base-comment-card>
        </base-comment-card>
      </base-comment-card>
    </div>
  </div>
</template>

<script>
import BaseCommentCard from "../components/BaseCommentCard";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    BaseCommentCard,
  },
  name: "index",
  data: () => ({
    commentBox: false,
    commentBar: true,
  }),
  mounted() {
    this.fetchComments();
  },
  methods: {
    ...mapActions(["fetchComments"]),
    showCommentBox() {
      console.log("comment");
      this.commentBox = !this.commentBox;
    },
    showMoreComments(comment) {
      console.log(comment);
    },
  },
  computed: {
    ...mapGetters(["comments"]),
  },
};
</script>
