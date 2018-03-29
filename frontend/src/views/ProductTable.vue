<template>

    <div v-loading="loading">
        <el-container>
            <el-aside width="220px" height="auto" style="background-color: rgb(238, 241, 246); border: 2px solid #eee">
                <side-bar/>
                <div  style="text-align:center;">
                    <el-button type="text">
                        <router-link :to="{ name: 'createProduct'}">Create New Product</router-link>
                    </el-button>
                </div>
            </el-aside>
            <el-main>
                <products-table/>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import ProductsTable from "../components/ProductsTable.vue";
    import SideBar from "../components/ProductSideBar.vue";
    import {eventBus} from '../app'
    export default {
        components: {
            ElForm,
            ElFooter,
            ProductsTable,
            SideBar
        },
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