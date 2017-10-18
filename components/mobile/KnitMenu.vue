<template>

</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style lang='scss'>
@media (min-width: 641px) {
  .knitMenu {
    width: 100%;
    .knitLogotypeWrapper {
      width: 125px;
      height: 125px;
    }
    .knitMenuBlockWrapper {
      margin: 30px 20px;
      padding: 20px 20px 0 30px;
      .organization {
        h3 {
          font-size: 1.8em;
        }
        span {
          font-size: .9em;
          margin: 0 0 30px 2px;
        }
      }
      .menuLinksWrapper {
        .links {
          &>li {
            &>a {
              padding: 5px 10px 15px 0;
              font-size: 1em;
            }
          }
        }
      }
    }
  }
}

</style>
