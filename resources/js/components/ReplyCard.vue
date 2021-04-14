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
              <p class="title is-6">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
            <br />
            <time datetime="2016-1-1" class="mgb-small"
              >11:09 PM - 1 Jan 2016</time
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyCard",
};
</script>

<style scoped lang="scss">
.pointer-cursor {
  cursor: pointer;
}
</style>