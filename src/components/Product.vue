<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentProduct.name"
        />
      </div>
      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input type="text" class="form-control" id="manufacturer"
               v-model="currentProduct.manufacturer"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price"
               v-model="currentProduct.price"
        />
      </div>
    </form>
    <div class="center-buttons">
      <button class="btn gradient-btn-danger" @click="deleteProduct">Delete</button>
      <button type="submit" class="btn gradient-btn-success" @click="updateProduct">Update</button>
      <p>{{ message }}</p>
    </div>

  </div>

  <div v-else>
    <br />
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductsDataService.js";

export default {
  name: "product-details",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },

  methods: {
    getProduct(id) {
      ProductDataService.getById(id).then(response => {
        this.currentProduct = response.data;
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct).then(response => {
        console.log(response.data);
        this.message = 'The product was updated successfully!';
        this.$router.push({name: "products"});
      }).catch(e => {
        console.log(e);
      });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id).then(response => {
        console.log(response.data);
        this.$router.push({name: "products"});
      }).catch(e => {
        console.log(e);
      });
    }
  },

  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.btn {
  margin-right: 10px;
}

.center-buttons {
  text-align: center;
}

.gradient-btn-success {
  background: linear-gradient(to right, #4b6e5f, #3c7a60);
  color: #ffffff;
}

.gradient-btn-danger {
  background: linear-gradient(to right, #642f2f, #853f3f);
  color: #ffffff;
}
</style>