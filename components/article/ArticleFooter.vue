<template>
  <footer v-config class="article-footer">

    <!-- Topic tags -->
    <ul class="article-footer__tags-tabs">
      <li v-for="(tag, index) in tags" :key = "index" class="article-footer__tag-tab">
        <router-link to="" class="article-footer__tag-tab-link">
          {{ tag.name }}
        </router-link>
      </li>
    </ul>

    <!-- Meta keywords -->
    <meta :content="keywords" itemprop="keywords">

    <!-- Footer box -->
    <div class="article-footer__footer-box">
      <div class="article-footer__author-wrapper" itemprop="author" itemscope itemtype="http://schema.org/Person">

        <!-- Author image -->
        <router-link to="">
          <img :src="author.avatar.url" :alt="author.fullname" class="article-footer__author-avatar" itemprop="image" >
        </router-link>

        <div class="article-footer__author-details">

          <!-- Author fullname -->
          <router-link to="">
            <span class="article-footer__author-fullname article-footer__details-text" itemprop="name">
              {{ author.fullname }}
            </span>
          </router-link>

          <!-- About author -->
          <span class="article-footer__author-description article-footer__details-text" itemprop="description">
            This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor...
          </span>

          <!-- Section lider tags -->
          <ul class ="article-footer__section-lider-tags article-footer__color-tabs">
            Lider sekcji:
            <li v-for="(ltag, index) in leaderTags" :key = "index" class="article-footer__color-tab-item">
              <router-link :style="{ 'background-color': ltag.color }" to="" class="article-footer__color-tab-link">
                {{ ltag.text }}
              </router-link>
            </li>
          </ul>

          <!-- Section member tags -->
          <ul class ="article-footer__section-member-tags article-footer__color-tabs">
            Członek sekcji:
            <li v-for="(mtag, index) in memberTags" :key = "index" class="article-footer__color-tab-item">
              <router-link :style="{ 'background-color': mtag.color }" to="" class="article-footer__color-tab-link">
                {{ mtag.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Social icons -->
      <span class="article-footer__icons">

        <!-- Likes -->
        <router-link
          to=""
          class="article-footer__social-icon flaticon-like"
          itemprop="interactionStatistic"
          itemtype="http://schema.org/InteractionCounter"
          itemscope>
          <meta itemprop="interactionType" content="http://schema.org/LikeAction">
          <span itemprop="userInteractionCount"> {{ likesCount }} </span>
        </router-link>

        <!-- Comments -->
        <router-link
          to=""
          class="article-footer__social-icon flaticon-chat"
          itemprop="interactionStatistic"
          itemscope
          itemtype="http://schema.org/InteractionCounter">

          <!-- Meta for comments -->
          <meta itemprop="interactionType" content="http://schema.org/CommentAction" >
          <span itemprop="userInteractionCount"> {{ commentsCount }} </span>
        </router-link>

        <!-- Right footer icons -->
        <router-link to="" class="article-footer__social-icon flaticon-facebook-logo"/>
        <router-link to="" class="article-footer__social-icon flaticon-social"/>
        <router-link to="" class="article-footer__social-icon flaticon-delete"/>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      leaderTags: [
        {
          text: 'Java',
          color: '#dd5826',
        },
      ],
      memberTags: [
        {
          text: 'Sztuczna Inteligencja',
          color: '#64bd63',
        },
        {
          text: 'WebDev',
          color: '#5d8fc2',
        },
      ],
    }
  },
  computed: {
    keywords () {
      return this.tags.map(o => o.name)
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.article-footer {
  padding: 0 30px 5px 30px;
  background-color: $article-footer-bg-color;

  @media (max-width: $screen-md) {
    padding: 0 10px;
  }

  &__tags-tabs {
    margin-bottom: 10px;
    list-style: none;
  }

  &__tag-tab {
    display: inline-block;
    position: relative;
    font-size: 0.8rem;
    padding: 0 10px 10px 0;
  }

  &__tag-tab-link {
    background: $gray-20;
    color: $gray-50;
    display: block;
    padding: 8px 20px 8px 20px;
    text-decoration: none;
    border-radius: 30px;

    &:hover,
    &:focus {
      background-color: $gray-30;
    }
  }

  &__footer-box {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $gray-30;
    padding: 20px 0;

    @media (max-width: $screen-sm) {
      flex-direction: column-reverse;
    }
  }

  &__icons {
    text-align: right;

    @media (max-width: $screen-sm) {
      padding-bottom: 5px;
    }
  }

  &__author-wrapper {
    display: flex;
  }

  &__author-avatar {
    border: 3px solid $author-avatar-border-color-footer;
    border-radius: 100%;
    width: 65px;
    height: 65px;
  }

  &__author-details {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
  }

  &__details-text {
    display: inline-block;
    text-decoration: none;
  }

  &__author-fullname {
    text-decoration: none;
    color: $gray-50;
    padding: 2px 0;
  }

  &__author-description {
    padding: 10px 0;
    font-size: 0.8rem;
    color: $gray-40;
    max-width: 300px;
  }

  &__color-tabs {
    font-size: 0.8rem;
    padding: 6px 0;
  }

  &__color-tab-item {
    display: inline-block;
    margin: 0 5px;
    position: relative;

    @media (max-width: $screen-md) {
      margin: 8px 5px 0 0;
    }
  }

  &__color-tab-link {
    color: $gray-10;
    font-weight: bold;
    font-size: 0.7rem;
    display: block;
    padding: 6px 13px 6px 13px;
    text-decoration: none;
    white-space: nowrap;
    word-wrap: none;
    border-radius: 30px;

    &:hover,
    &:focus {
      filter: brightness(110%);
    }
  }

  &__social-icons {
    display: flex;
    justify-content: flex-end;
    flex: 1;

    @media (max-width: $screen-sm) {
      flex: none;
    }

    @media (max-width: 400px) {
      display: block;
      width: 75px;
      margin-left: -10px;
    }
  }

  &__social-icon {
    font-size: 0.9rem;
    color: $gray-40;
    margin-left: 15px;
    display: inline-block;

    &::before {
      font-size: 0.9rem;
    }

    &:hover,
    &:focus {
      color: $article-footer-button-hover-color;
    }

    @media (max-width: $screen-sm) {
      margin: 0 5px;
    }

    @media (max-width: 400px) {
      margin: 10px 5px;
    }
  }
}
</style>
