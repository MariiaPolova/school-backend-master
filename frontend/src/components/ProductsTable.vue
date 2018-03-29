<template>
    <el-table
            :data="getFiltered"
            style="width: 100%"
            v-loading="loading"
            element-loading-text="Please wait for products..."
            :default-sort = "{prop: 'title', order: 'descending'}">
        <el-table-column
                prop="title"
                label="Title"
                width="200"
                sortable>
        </el-table-column>
        <el-table-column
                prop="price"
                label="Price"
                width="90"
                sortable>
        </el-table-column>
        <el-table-column
                prop="color"
                label="Color"
                width="90"
                sortable>
        </el-table-column>
        <el-table-column
                prop="category"
                label="Category"
                width="120"
                sortable>
        </el-table-column>
        <el-table-column
                prop="amount"
                label="Available"
                width="120"
                sortable>
        </el-table-column>
        <el-table-column
                label="Image"
                width="120">
            <template slot-scope="scope">
                <img v-if="scope.row.img" :src="scope.row.img" class="img-fluid" width="70">
            </template>
        </el-table-column>

        <el-table-column>
            <template slot-scope="scope">
                <el-button
                        size="mini">
                    <router-link :to="{ name: 'updateProduct', params: { _id: scope.row._id }}">Update Product</router-link>
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="deleteProduct(scope.row._id, scope.row.title)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import {eventBus} from '../app'
    export default {
        components: {},
        data() {
            return{
                loading: true,
                filters: {
                    title: "",
                    filters_memory_min: 0,
                    filters_memory_max: 1000,
                    category: "",
                },
                products: []
            }
        },
        created (){
            eventBus.$on('titleCustomFilter', data => {
                this.filters.title = data.title
            });

            eventBus.$on('categoryCustomFilter', data => {
                this.filters.category = data.category
            });

            eventBus.$on('memoryCustomFilter', data => {
                this.filters.filters_memory_min = data.filters_memory_min;
                    this.filters.filters_memory_max = data.filters_memory_max
            });
            this.getProducts();
        },
        computed: {
            getFiltered() {

                var products = this.products.filter((product) => {
                    console.log(this.filters.filters_memory);
                    console.log(product.filters_memory >= this.filters.filters_memory_min + ' and '+ product.filters_memory <= this.filters.filters_memory_max);
                    return product.title.toLowerCase().includes(this.filters.title.toLowerCase())
                        && product.category.toLowerCase().includes(this.filters.category.toLowerCase())
                        && product.filters_memory >= this.filters.filters_memory_min
                        && product.filters_memory <= this.filters.filters_memory_max;
                });

                return products;
            }
        },
        methods: {

            getProducts(){
                axios.get('/products') // make normal async await!!
                    .then(response => {
                        this.products = response.data;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async deleteProduct(productID, title) {
                this.loading = true;
                await axios.delete('/products/' + productID)
                    .then(response => {
                        console.log(response);
                        this.$notify({
                            title: 'Product deleted',
                            message: 'The product ' + title + ' was deleted!',
                            type: 'success'
                        });
                        this.getProducts();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: 'Product is NOT deleted',
                            message: 'The error occurred during deleting of ' + title,
                            type: 'error'
                        });
                    });
            }
        }

    };
</script>