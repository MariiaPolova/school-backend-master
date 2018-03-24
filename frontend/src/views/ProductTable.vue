<template>
<div>
        <div v-loading="loading">
            <products-table/>
        </div>

        <div>
            <el-button>
                <router-link :to="{ name: 'createProduct'}">Create New</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import ProductsTable from "../components/ProductsTable.vue"
    export default {
        components: {
            ElForm,
            ElFooter,
            ProductsTable},
        data(){
            return{
                loading: true,
            }
        },

        mounted(){
            this.loading=false;
        },
        methods: {

        }

    };
</script>