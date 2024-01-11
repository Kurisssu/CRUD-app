import http from "../http-common.js";

class ProductsDataService {
    getAll() {
        return http.get("/products");
    }

    getById(id) {
        return http.get(`products/${id}`, id);
    }
    create(id) {
        return http.post("/products", id);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }
}

export default new ProductsDataService();