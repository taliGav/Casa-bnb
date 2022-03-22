<template>
  <section v-if="stayToEdit" class="stay-edit py-2">
    <h1 class="py-2">{{ pageTitle }}</h1>
    <form @submit.prevent="saveStay" class="form">
      <div class="form-control">
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          type="text"
          class="form-input"
          v-model="stayToEdit.name"
        />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Price</label>
        <input
          id="price"
          type="text"
          class="form-input"
          v-model.number="stayToEdit.price"
        />
      </div>
      <div class="form-control flex flex-col">
        <label for="labels" class="form-label">Labels</label>

        <el-select
          multiple
          v-model="stayToEdit.labels"
          collapse-tags-tooltip
          id="labels"
          size="large"
        >
          <el-option
            v-for="label in labels"
            :key="label"
            :value="label"
            :label="label"
          />
        </el-select>
      </div>
      <div class="form-control flex flex-col">
        <label for="stock" class="form-label">In Stock</label>
        <input id="stock" type="checkbox" v-model="stayToEdit.inStock" />
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">save</button>
        <button @click="$router.push('/stay')" class="btn btn-danger-text">
          go back
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { stayService } from '../services/stay-service'
export default {
  name: 'stay-edit',
  data() {
    return {
      stayToEdit: null,
      pageTitle: 'Add Stay',
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      stayService.getById(id).then((stay) => (this.stayToEdit = stay))
      this.pageTitle = 'Edit Stay'
    } else {
      stayService.getEmptyStay().then((stay) => (this.stayToEdit = stay))
      this.pageTitle = 'Add Stay'
    }
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
    saveStay() {
      this.$store.dispatch({ type: 'saveStay', stay: this.stayToEdit }).then(() => {
        this.$router.push('/stay')
      })
    },
  },
}
</script>

<style></style>
