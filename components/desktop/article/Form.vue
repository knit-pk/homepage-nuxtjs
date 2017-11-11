<template>
  <form @submit.prevent="handleSubmit(item)">
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.title) }">
      <label for="_title" class="control-label">title</label>
      <input v-model="item.title" type="text"  placeholder="the title of the article" required="true" id="_title" class="form-control" />
      <span v-if="errors && errors.title" class="help-block" id="_title_helpBlock">{{ errors.title }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.content) }">
      <label for="_content" class="control-label">content</label>
      <input v-model="item.content" type="text"  placeholder="the actual body of the article" required="true" id="_content" class="form-control" />
      <span v-if="errors && errors.content" class="help-block" id="_content_helpBlock">{{ errors.content }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.category) }">
      <label for="_category" class="control-label">category</label>
      <input v-model="item.category" type="text"  placeholder="articles may belong to one category" required="true" id="_category" class="form-control" />
      <span v-if="errors && errors.category" class="help-block" id="_category_helpBlock">{{ errors.category }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.tags) }">
      <label for="_tags" class="control-label">tags</label>
      <input v-model="item.tags" type="text"  placeholder="tags that defines article"  id="_tags" class="form-control" />
      <span v-if="errors && errors.tags" class="help-block" id="_tags_helpBlock">{{ errors.tags }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.description) }">
      <label for="_description" class="control-label">description</label>
      <input v-model="item.description" type="text"  placeholder="the subject matter of the content" required="true" id="_description" class="form-control" />
      <span v-if="errors && errors.description" class="help-block" id="_description_helpBlock">{{ errors.description }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.author) }">
      <label for="_author" class="control-label">author</label>
      <input v-model="item.author" type="text"  placeholder="The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably." required="true" id="_author" class="form-control" />
      <span v-if="errors && errors.author" class="help-block" id="_author_helpBlock">{{ errors.author }}</span>
    </div>
    <div :class="{ 'form-group': true, 'has-error': (errors && errors.published) }">
      <label for="_published" class="control-label">published</label>
      <input v-model="item.published" type="checkbox"  placeholder="determines whether article was published"  id="_published" class="form-control" />
      <span v-if="errors && errors.published" class="help-block" id="_published_helpBlock">{{ errors.published }}</span>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
  export default {
    props: {
      handleSubmit: {
        type: Function,
        required: true,
      },
      values: {
        type: Object,
        required: true
      },
      errors: {
        type: Object
      },
      initialValues: {
        type: Object
      }
    },
    computed: {
      item: function () {
        return this.initialValues ? this.initialValues : this.values;
      }
    }
  }
</script>
