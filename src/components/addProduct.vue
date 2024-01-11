<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="product.name"
            name="name"
        />
      </div>

      <div class="form-group">
        <label for="manufacturer">Manufacturer</label>
        <input
            class="form-control"
            id="manufacturer"
            required
            v-model="product.manufacturer"
            name="manufacturer"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
            type="number"
            class="form-control"
            id="price"
            required
            v-model="product.price"
            name="price"
        />
      </div>

      <button @click="saveProduct" class="btn gradient-btn-success">Submit</button>
    </div>

    <div v-else class="center-buttons">
      <h4>You submitted successfully!</h4>
      <button class="btn gradient-btn-success" @click="newProduct">Add new</button>
      <router-link :to="'/products/'" class="btn gradient-btn-danger">Return</router-link>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductsDataService.js";

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        manufacturer: "",
        price: ""
      },
      submitted: false
    };
  },

  methods: {
    saveProduct() {
      let data = {
        name: this.product.name,
        manufacturer: this.product.manufacturer,
        price: this.product.price
      };

      ProductDataService.create(data).then(response => {
        this.product.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      }).catch(e => {
        console.log(e);
      });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>

<style>
.submit-form {
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