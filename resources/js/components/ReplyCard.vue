<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-10 is-offset-2">
        <div class="card-content card-shade">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="/images/bamboo.jpg"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6 has-text-weight-bold">{{ child.name }}</p>
              <p class="subtitle is-6">@BambooMusicLive</p>
            </div>
          </div>

          <div class="content">
            {{ child.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              ago(child.updated_at)
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
  name: "ReplyCard",
  props: {
    child: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}

.card-shade {
  background-color: #f1f2f6;
  border: 2px;
  border-radius: 26px;
}
</style>