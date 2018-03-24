<template>
    <el-table
            :data="users"
            style="width: 100%"
            :default-sort = "{prop: 'username', order: 'descending'}">
        <el-table-column
                prop="username"
                label="Username"
                sortable
                width="120">
        </el-table-column>
        <el-table-column
                prop="ownname"
                label="First Name"
                sortable
                width="120">
        </el-table-column>
        <el-table-column
                prop="surname"
                label="Surname"
                sortable
                width="120">
        </el-table-column>
        <el-table-column
                prop="email"
                sortable
                label="Email">
        </el-table-column>

        <el-table-column
                label="Administrator">
            <template slot-scope="scope">
            <el-switch
                    v-model=" scope.row.isAdmin"
                    disabled>
            </el-switch>
            </template>
        </el-table-column>

        <el-table-column>
            <template slot-scope="scope">
                <el-button
                        size="mini">
                    <router-link :to="{ name: 'updateUser', params: { _id: scope.row._id }}">Update User</router-link>
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="deleteUser(scope.row._id)">Delete</el-button>
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
                users: []
            }
        },
        created (){
            this.getUsers();

        },
        methods: {

            getUsers(){
                axios.get('/users') // make normal async await!!
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async deleteUser(userID) {
                console.log(userID);
                await axios.delete('/users/' + userID)
                    .then(response => {
                        console.log(response);
                        this.getUsers();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

    };
</script>