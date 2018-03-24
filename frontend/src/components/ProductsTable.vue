<template>
    <el-table
            :data="products"
            style="width: 100%">
        <el-table-column
                prop="title"
                label="Title"
                width="180">
        </el-table-column>
        <el-table-column
                prop="price"
                label="Price"
                width="90">
        </el-table-column>
        <el-table-column
                prop="color"
                label="Color"
                width="90">
        </el-table-column>
        <el-table-column
                prop="category"
                label="Category">
        </el-table-column>
        <el-table-column
                prop="amount"
                label="Available">
        </el-table-column>
        <el-table-column
                label="Image">
            <template slot-scope="scope">
                <img v-if="scope.row.img" :src="scope.row.img" class="avatar">
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
                        @click="deleteProduct(scope.row._id)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    export default {
        components: {},
        data() {
            return{
                loading: true,
                products: []
            }
        },
        created (){
            this.getProducts();

        },
        methods: {

            getProducts(){
                axios.get('/products') // make normal async await!!
                    .then(response => {
                        this.products = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async deleteProduct(productID) {
                console.log(productID);
                await axios.delete('/products/' + productID)
                    .then(response => {
                        console.log(response);
                        this.getProducts();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

    };
</script>