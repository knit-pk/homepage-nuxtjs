<template>
  <nav class="knitMenu">
    <div class="knitLogotypeWrapper">
      <img class="knitLogotype" src="knit-logotype.svg" alt="logo KNIT">
    </div>
    <div class="knitMenuBlockWrapper">
      <div class="organization">
        <h3>Koło Naukowe IT</h3>
        <span>Cracow University of Technology students IT organization</span>
      </div>
      <div class="menuLinksWrapper">
        <ul class="links">
          <li>
            <a href="/">Strona główna</a>
          </li>
          <li>
            <a href="/">Zarząd</a>
          </li>
          <li>
            <a href="/">Statut</a>
          </li>
          <li>
            <a href="/">O nas</a>
          </li>
          <li>
            <a href="/">Zaloguj się</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss'>
@import 'assets/_imports.scss';

.knitMenu {
  top: 0;
  width: 80%;
  margin: 0 10%;
  z-index: 9999;
  display: flex;
  position: fixed;
  justify-content: center;
  border-bottom: 1px solid $knit-menu-border-color;
  .knitLogotypeWrapper {
    margin: 30px 0;
    flex: 1;
    .knitLogotype {
      float: right;
      height: 100%;
    }
  }
  .knitMenuBlockWrapper {
    flex: 1;
    .organization {
      span {
        display: block;
      }
    }
    .menuLinksWrapper {
      .links {
        display: flex;
        &>li {
          display: inline-block;
          &>a {
            white-space: nowrap;
            text-transform: uppercase;
            text-decoration: none;
            color: $knit-menu-links-color;
            &:hover {
              border-bottom: 1px solid $knit-menu-links-hover-color;
            }
            &:active {
              color: $knit-menu-links-color-active;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 961px) {
  .knitMenu {
    margin: 0 10%;
    width: 80%;
    .knitLogotypeWrapper {
      width: 150px;
      height: 150px;
      .knitLogotype {
        height: 100%;
      }
    }
    .knitMenuBlockWrapper {
      margin: 30px 20px;
      padding: 20px 20px 0 30px;
      .organization {
        h3 {
          font-size: 2em;
        }
        span {
          font-size: 1em;
        }
      }
      .menuLinksWrapper {
        margin-top: 20px;
        .links {
          &>li {
            padding: 5px 20px 15px 0;
            &>a {
              font-size: 1.25em;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1025px) {
  .knitMenu {
    .knitLogotypeWrapper {
      width: 250px;
      height: 250px;
    }
    .knitMenuBlockWrapper {
      margin: 60px 20px;
      .organization {
        h3 {
          font-size: 2.5em;
        }
        span {
          font-size: 1.25em;
          margin: 0px 0px 30px 4px;
        }
      }
      .menuLinksWrapper {
        margin-top: 50px;
        .links {
          &>li {
            &>a {
              font-size: 1.50em;
            }
          }
        }
      }
    }
  }
}
</style>
