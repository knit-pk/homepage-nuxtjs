<template>
  <section class="article-list article-list--big-main-post">
    <h2 class="visualy-hidden">Artykuły KNIT</h2>
    <knit-article-card v-for="(article, index) in articles" :key="index"
                       :title="article.title"
                       :author="article.author"
                       :content="article.content"
                       :thumbnail-url="article.thumbnailUrl"
                       :author-avatar-url="article.authorAvatarUrl"
                       :published-at="article.publishedAt"
                       :likes="article.likes"
                       :comments="article.comments"
                       />
  </section>
</template>

<script>
import KnitArticleCard from '~/components/desktop/KnitArticleCard.vue'

export default {
  data () {
    return {
      articles: [
        {
          title: 'Rozpoczęła się rejestracja na Mocarne Warsztaty!',
          author: 'Grzegorz Nowakowski',
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam perspiciatis voluptatibus beatae quam, doloribus minus!',
          thumbnailUrl: '/temporary/card-photo-0.jpg',
          authorAvatarUrl: '/temporary/article-author.png',
          publishedAt: '2017-10-25T15:19:21+00:00',
          likes: 18,
          comments: 15
        },
        {
          title: 'Staże letnie w firmie Sabre',
          author: 'Grzegorz Nowakowski',
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam perspiciatis voluptatibus beatae quam, doloribus minus!',
          thumbnailUrl: '/temporary/card-photo-1.jpg',
          authorAvatarUrl: '/temporary/article-author.png',
          publishedAt: '2017-10-14T15:19:21+00:00',
          likes: 4,
          comments: 16
        },
        {
          title: 'Podsumowanie semestru letniego i rozpoczęcie zimowego',
          author: 'Karol Wójcik',
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam perspiciatis voluptatibus beatae quam, doloribus minus!',
          thumbnailUrl: '/temporary/card-photo-2.png',
          authorAvatarUrl: '/temporary/article-author.png',
          publishedAt: '2017-09-22T15:19:21+00:00',
          likes: 2,
          comments: 0
        },
        {
          title: 'Rekrutacja do programu Super Informatyk 2',
          author: 'Konrad Obal',
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam perspiciatis voluptatibus beatae quam, doloribus minus!',
          thumbnailUrl: '/temporary/card-photo-3.jpg',
          authorAvatarUrl: '/temporary/article-author.png',
          publishedAt: '2017-08-03T15:19:21+00:00',
          likes: 8,
          comments: 1
        },
        {
          title: 'Wykład o systemie kontroli wersji Git',
          author: 'Dominik Źrebiec',
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam perspiciatis voluptatibus beatae quam, doloribus minus!',
          thumbnailUrl: '/temporary/card-photo-4.jpg',
          authorAvatarUrl: '/temporary/article-author.png',
          publishedAt: '2017-07-15T15:19:21+00:00',
          likes: 5,
          comments: 11
        }
      ]
    }
  },
  components: {
    KnitArticleCard
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-list {
  display: flex;
  flex-wrap: wrap;

  .article-card {
    margin: 0 $knit-default-gutters-width $knit-default-gutters-width 0;
  }

  &--big-main-post {
    .article-card {
      &:first-of-type {
        flex-basis: calc(66.666% - #{$knit-default-gutters-width});
        position: relative;
        justify-content: flex-end;

        .article-card__thumbnail-link {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }

        .article-card__thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-card__title-link {
          color: #fff;
          z-index: 2;
        }

        .article-card__author-link {
          z-index: 2;
          color: #fff;
        }

        .article-card__author-avatar-link {
          z-index: 2;
        }

        .article-card__content {
          z-index: 2;
          color: #fff;
        }

        .article-card__footer {
          margin-top: 0;
          z-index: 2;
          background-color: transparent;
          color: #fff;
        }

        .article-card__like-button {
          color: #fff;

          &:hover, &:focus {
            color: $knit-article-card-like-button-hover-color;
          }
        }
      }
    }
  }
}
</style>