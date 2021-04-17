<template>
  <div class="columns is-full is-centered pt-6">
    <div class="column is-6">
      <base-comment-card>
        <base-comment-card
          v-for="(comment, index) in comments"
          :key="index"
          cardClass="column is-11 is-offset-1"
          nameClass="title is-6 has-text-weight-bold"
          commentBtnText="View Replies"
        >
          <base-comment-card
            v-for="(child, index) in comment.children"
            :key="index"
            cardClass="column is-10 is-offset-2"
            nameClass="title is-6 has-text-weight-bold"
            commentBtnText="View Replies"
          >
            <base-comment-card
              v-for="(grandchild, index) in child.grand_children"
              :key="index"
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
import httpClient from "../helpers/http.js";
import mixin from "../mixins";
export default {
  mixins: [mixin],
  components: {
    BaseCommentCard,
  },
  name: "index",
  data: () => ({
    commentBox: false,
    comments: [
      {
        id: 1,
        parent_id: null,
        level: 1,
        name: "a",
        comment_text: "a",
        created_at: "2021-04-17T04:52:43.000000Z",
        updated_at: "2021-04-17T04:52:43.000000Z",
        enable: true,
        children: [
          {
            id: 2,
            parent_id: 1,
            level: 2,
            name: "b",
            comment_text: "b",
            created_at: "2021-04-17T04:52:48.000000Z",
            updated_at: "2021-04-17T04:52:48.000000Z",
            enable: false,
            grand_children: [
              {
                id: 3,
                parent_id: 2,
                level: 3,
                name: "Rannie Ollit",
                comment_text: "a child comment",
                enable: true,
                created_at: "2021-04-17T05:03:43.000000Z",
                updated_at: "2021-04-17T05:03:43.000000Z",
              },
            ],
          },
        ],
      },
    ],
  }),
  mounted() {
    // this.fetchPosts();
  },
};
</script>
