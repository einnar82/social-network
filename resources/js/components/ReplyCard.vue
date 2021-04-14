<template>
  <div class="card-content">
    <div class="columns is-full is-mobile">
      <div class="column is-10 is-offset-2">
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
              <p class="title is-6">{{ child.name }}</p>
              <p class="subtitle is-6">@rannieo</p>
            </div>
          </div>

          <div class="content">
            {{ child.comment_text }}
            <br />
            <time datetime="2016-1-1" class="mgb-small">{{
              child.updated_at
            }}</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyCard",
  props: {
    child: {
      type: Object,
    },
  }
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}
</style>