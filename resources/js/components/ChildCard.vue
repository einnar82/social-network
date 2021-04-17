<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-8 is-offset-4">
        <div class="card-content card-shade">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="/images/bamboo.jpg" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6 has-text-weight-bold">{{ grandchild.name }}</p>
              <p class="subtitle is-6">{{ username(grandchild.name) }}</p>
            </div>
          </div>

          <div class="content">
            {{ grandchild.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              ago(grandchild.updated_at)
            }}</time>
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
  name: "ChildCard",
  props: {
    grandchild: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.grandchild)
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