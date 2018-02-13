<template>
  <footer class="article-footer">
    <ul class="article-footer__tags">
      <li v-for="(tag, index) in tags" class="article-footer__single-tag" :key = "index">
        <router-link to="" class="article-footer__single-tag-route"> {{ tag }} </router-link>
      </li>
    </ul>
    <div class="article-footer__footer-box">
      <router-link to="">
        <img class="article-footer__author-avatar" :src="author.avatar.url" :alt="author.fullname"/>
      </router-link>
      <div class="article-footer__author-details">
        <router-link to="">
          <span class="article-footer__author-fullname article-footer__details-text"> {{ author.fullname }} </span>
        </router-link>
        <span class="article-footer__author-description article-footer__details-text">This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor...</span>
        <span class="article-footer__author-leader-sections">
          <ul class ="article-footer__section-tags">
            Lider sekcji:
            <li v-for="(ltag, index) in leaderTags" class="article-footer__single-leader-tag" :key = "index">
              <router-link to="" :style="{ 'background-color': ltag.color }" class="article-footer__single-section-tag-route">
                {{ ltag.text }}
              </router-link>
            </li>
          </ul>
        </span>
        <span class="article-footer__author-member-sections">
          <ul class ="article-footer__section-tags">
            Członek sekcji:
            <li v-for="(mtag, index) in memberTags" class="article-footer__single-member-tag" :key = "index">
              <router-link to="" :style="{ 'background-color': mtag.color }" class="article-footer__single-section-tag-route">
                {{ mtag.text }}
              </router-link>
            </li>
          </ul>
        </span>
      </div>
      <span class="article-footer__icons">
        <router-link to="" class="article-footer__single-icon flaticon-like"> {{ likes.length }} </router-link>
        <router-link to="" class="article-footer__single-icon flaticon-chat"> {{ commentsCount }} </router-link>
        <router-link to="" class="article-footer__single-icon flaticon-facebook-logo"></router-link>
        <router-link to="" class="article-footer__single-icon flaticon-social"></router-link>
        <router-link to="" class="article-footer__single-icon flaticon-delete"></router-link>
      </span>
    </div>
  </footer>
</template>

<script>
import articleFooterSchema from '~/schemes/article/footer'

export default {
  data () {
    return {
      tags: [
        'Java',
        'Programowanie',
        'Kotlin',
        'Technologia'
      ],
      leaderTags: [
        {
          text: 'Java',
          color: '#dd5826'
        }
      ],
      memberTags: [
        {
          text: 'Sztuczna Inteligencja',
          color: '#64bd63'
        },
        {
          text: 'WebDev',
          color: '#5d8fc2'
        }
      ]
    }
  },
  props: articleFooterSchema.props
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-footer {
  padding: 0 30px 30px 30px;
  height: 250px;
  background-color: $article-footer-bg-color;

  &__tags {
    list-style: none;
    padding-bottom: 20px;
  }

  &__single-tag {
    display: inline-block;
    margin-right: 16px;
    position: relative;
    font-size: .8rem;
  }

  &__single-tag-route {
    background: $gray-20;
    color: $gray-50;
    display: block;
    line-height: 1em;
    padding: .65em 1.5em .65em 1.5em;
    text-decoration: none;
    border-radius: 30px;

    &:hover,
    &:focus {
      background-color: $gray-10;
    }
  }

  &__footer-box {
    display: flex;
    border-top: 1px solid $gray-30;
    padding: 20px 0;
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
    width: 50%;
    padding: 10px 0;
    font-size: .8rem;
    color: $gray-40;
  }

  &__author-leader-sections {
    padding: 10px 0;
    font-size: .8rem;
  }

  &__author-member-sections {
    font-size: .8rem;
  }

  &__section-tags {
    list-style: none;
  }

  &__single-leader-tag {
    display: inline-block;
    margin: 0 10px 0 5px;
    position: relative;
  }

  &__single-member-tag {
    display: inline-block;
    margin: 0 5px;
    position: relative;
  }

  &__single-section-tag-route {
    color: $gray-10;
    font-weight: bold;
    font-size: .7rem;
    display: block;
    line-height: .6em;
    padding: .6em 1em .6em 1em;
    text-decoration: none;
    border-radius: 30px;

    &:hover,
    &:focus {
      filter: brightness(110%);
    }
  }

  &__icons {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }

  &__single-icon {
    font-size: .9rem;
    color: $gray-40;
    margin-left: 15px;
    height: 0;

    &:before {
      font-size: .9rem;
    }

    &:hover,
    &:focus {
      color: $article-footer-button-hover-color;
    }
  }
}
</style>
