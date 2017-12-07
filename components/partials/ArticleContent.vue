<template>
  <div style="height: 1300px; background-color: white;">
    <img src="/temporary/card-photo-0.jpg" class="CHANGE-ME" alt="CHANGE-ME">
    <header>
      <h2>Tytuł</h2>
      <span>Author's avatar and name</span>
      <span>NOTE: Please make title first in markup but position it below author's avatar in view. Flexbox 'order' property is perfect for that. See in article-card component</span>
    </header>
    <vue-markdown :source="markdownSource"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  data () {
    return {
      markdownSource: `
      \n # Heading one
      \n ## Heading two
      \n ### Heading three
      \n #### Heading four
      \n ##### Heading five
      \n ###### Heading six
      \n - list1
      \n - list2
      \n - list3
      \n 1. list1
      \n 2. list2
      \n 3. list3
      \n ## Horizontal rules
      \n ---
      \n text
      \n ***
      \n **This is bold text**
      \n __This is bold text__
      \n *This is italic text*
      \n _This is italic text_
      \n ~~Strikethrough~~
      \n > Blockquotes can also be nested...
      \n >> ...by using additional greater-than signs right next to each other...
      \n > > > ...or with spaces between arrows.
      \n [link with title](https://github.com/miaolz123/vue-markdown "VueMarkdown")
      \n | Option | Description |
      \n | ------ | ----------- |
      \n | data   | path to data files to supply the data that will be passed into templates. |
      \n | engine | engine to be used for processing templates. Handlebars is the default. |
      \n | ext    | extension to be used for dest files. |
      `
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.CHANGE-ME  {
  @include img-fluid();
}
</style>
