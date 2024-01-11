<template>
  <div class="list row">

    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
            type="search"
            class="form-control"
            placeholder="Search by Id"
            id="searchIdInput"
            v-model="id"/>
        <div class="input-group-append">
          <button
              @click="searchId"
              class="btn gradient-btn-success">Search
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Products List</h4>
      <ul class="list-group">
        <li class="list-group-item list-group-item-action"
            :class="{ active: index === currentIndex }"
            v-for="(product, index) in products"
            :key="index"
            @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>Details</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentProduct.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Manufacturer:</strong></label> {{ currentProduct.manufacturer }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentProduct.price }}
        </div>

        <router-link
            :to="'/products/' + currentProduct.id"
            class="badge gradient-badge-warning"> Edit
        </router-link>

        <router-link
            :to="'/products/'"
            class="badge gradient-badge-danger"
            @click="deleteProduct"> Delete
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import ProductsDataService from "../services/ProductsDataService.js";

export default {
  name: "products-list",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      name: "",
      id: "",
    };
  },

  methods: {
    retrieveProducts() {
      ProductsDataService.getAll().then(response => {
        this.products = response.data;
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = product ? index : -1;
    },

    searchId() {
      ProductsDataService.getById(this.id).then(response => {
        const foundProduct = response.data;
        this.products.forEach((product, index) => {
          if (product.id === foundProduct.id) {
            this.setActiveProduct(foundProduct, index);
          }
        });

        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    },
    deleteProduct() {
      ProductsDataService.delete(this.currentProduct.id).then(response => {
        console.log(response.data);
        window.location.reload();
      }).catch(e => {
        console.log(e);
      });
    }
  },



  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.gradient-btn-success {
  background: linear-gradient(to right, #4b6e5f, #3c7a60);
  color: #ffffff;
}

.list-group-item.active {
  background: linear-gradient(to right, #4b6e5f, #3c7a60);
  border-color: #3c7a60;
}

.gradient-badge-warning {
  background: linear-gradient(to right, #eab437, #fcbf31);
  color: #ffffff;
  margin-right: 10px;
}

.gradient-badge-danger {
  background: linear-gradient(to right, #642f2f, #853f3f);
  color: #ffffff;
}
</style>