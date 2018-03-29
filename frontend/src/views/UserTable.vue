<template>
    <el-container>
        <el-aside width="220px" height="auto" style="background-color: rgb(238, 241, 246); border: 2px solid #eee">
            <side-bar/>
            <div  style="text-align:center;">
                <el-button type="text">
                    <router-link :to="{ name: 'createUser'}">Create New User</router-link>
                </el-button>
            </div>
        </el-aside>

        <el-main>
            <users-table/>
        </el-main>

    </el-container>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import UsersTable from "../components/UsersTable.vue";
    import SideBar from "../components/UserSideBar.vue";
    import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
    import {eventBus} from '../app'
    export default {
        components: {
            ElContainer,
            ElForm,
            ElFooter,
            UsersTable,
            SideBar
        },
        data(){
            return{
                loading: true,
            }
        },
        methods: {

        }

    };
</script>