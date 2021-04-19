<template>
  <div class="columns is-full is-centered pt-6">
    <div class="column is-6">
      <base-comment-card
        :commentBar="commentBar"
        :commentBox="commentBox"
        @show-more-comments="showMoreComments"
        @show-comment-box="showCommentBox"
        @send-comment="sendComment"
      >
        <base-comment-card
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          :commentBox="comment.enable"
          cardClass="column is-11 is-offset-1"
          nameClass="title is-6 has-text-weight-bold"
          commentBtnText="View Replies"
          @show-more-comments="showMoreParentComments(comment)"
          @show-comment-box="showParentCommentBox(comment)"
          @send-comment="sendParentComment"
        >
          <base-comment-card
            v-for="(child, index) in comment.children"
            :key="index"
            :comment="child"
            :commentBox="child.enable"
            cardClass="column is-10 is-offset-2"
            nameClass="title is-6 has-text-weight-bold"
            commentBtnText="View Replies"
            @show-more-comments="showMoreGrandchildComments(comment)"
            @show-comment-box="showGrandchildCommentBox(comment, index)"
            @send-comment="sendThisGrandchildComment"
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
    ...mapActions([
      "fetchComments",
      "addComment",
      "fetchOtherComments",
      "enableParentCommentBox",
      "enableGrandchildCommentBox",
      "addChildComment",
      "sendGrandchildComment",
      "fetchParentComments",
    ]),
    showCommentBox(comment) {
      this.commentBox = !this.commentBox;
    },
    showMoreComments(comment) {
      this.fetchOtherComments(comment);
    },
    sendComment(payload) {
      this.addComment(payload).then((response) => {
        this.commentBox = !this.commentBox;
      });
    },
    showMoreParentComments(comment) {
      this.fetchParentComments(comment.id);
    },
    showParentCommentBox(comment) {
      this.enableParentCommentBox(comment);
    },
    sendParentComment(comment) {
      this.addComment({ ...comment, parent_id: comment.comment_id });
    },
    showMoreGrandchildComments(comment) {},
    showGrandchildCommentBox(comment, index) {
      this.enableGrandchildCommentBox({ ...comment, index });
    },
    sendThisGrandchildComment(childComment, payload) {
      const params = {
        parent_id: payload.id,
        comment_text: childComment.comment_text,
        name: childComment.name,
      };
      this.sendGrandchildComment({ ...params, payload: payload });
    },
  },
  computed: {
    ...mapGetters(["comments"]),
  },
};
</script>
