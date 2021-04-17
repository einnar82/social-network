<template>
  <div class="card bg-override">
    <div class="card-content">
      <div class="columns is-full is-mobile">
        <div :class="cardClass">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/bamboo.jpg" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p :class="nameClass">Bamboo Manalac</p>
              <p :class="mentionClass">{{ username("Bamboo Manalac") }}</p>
            </div>
          </div>

          <div class="content">
            Tignan mo ang iyong palad
            <br />
            <time datetime="2016-1-1">{{ ago(new Date()) }}</time>
            <div class="comments-tab" v-show="commentBox">
              <p
                class="subtitle is-5 pointer-cursor is-size-6 has-text-weight-bold mr-3"
                @click="showMoreComments"
              >
                {{ commentBtnText }}
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
                    v-model="comment_text"
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

    <slot></slot>
  </div>
</template>

<script>
import mixin from "../mixins";
export default {
  name: "BaseCommentCard",
  mixins: [mixin],
  props: {
    commentBox: {
      type: Boolean,
      default: false
    },
    cardClass: {
      type: String,
      default: "column is-12",
    },
    nameClass: {
      type: String,
      default: "title is-4 has-text-weight-bold",
    },
    mentionClass: {
      type: String,
      default: "subtitle is-6",
    },
    commentBtnText: {
      type: String,
      default: "View Comments",
    },
  },
  data: () => ({
    details: {},
  }),
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