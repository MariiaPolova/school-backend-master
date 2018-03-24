<template>
    <div>
        <div>
            <users-table/>
        </div>

        <div>
            <el-button>
                <router-link :to="{ name: 'createUser'}">Create New</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import UsersTable from "../components/UsersTable.vue"
    export default {
        components: {
            ElForm,
            ElFooter,
            UsersTable},
        data(){
            return{
                loading: true,
            }
        },
        methods: {

        }

    };
</script>