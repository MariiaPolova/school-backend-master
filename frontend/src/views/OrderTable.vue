<template>
<div v-loading = loading>
        <div>
            <orders-table/>
        </div>

        <div>
            <el-button>
                <router-link :to="{ name: 'createOrder'}">Create New</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import OrdersTable from "../components/OrdersTable.vue"
    export default {
        components: {
            ElForm,
            ElFooter,
            OrdersTable},
        data(){
            return{
                loading: true,
            }
        },
        created() {
            this.loading = false
        },
        methods: {

        }

    };
</script>