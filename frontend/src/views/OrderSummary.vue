<template>
    <div>
        <div slot="header" class="clearfix">
            <view-order/>
        </div>

        <div class="btn-search">
            <el-button icon="el-icon-search">
                <router-link :to="{ name: 'orders'}">View All</router-link>
            </el-button>
        </div>
    </div>
</template>

<style>
    .btn-search {
        text-align:center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import ViewOrder from "../components/ViewOrder.vue";
    import ViewProduct from "../components/ViewProduct.vue";
    export default {
        components: {
            ElForm,
            ElFooter,
            ViewOrder,
            ViewProduct},
        data(){
            return{
                loading: true,
            }
        },
        methods: {
        }

    };
</script>