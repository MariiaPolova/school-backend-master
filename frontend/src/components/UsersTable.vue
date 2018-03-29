<template>
    <div class="table">
        <el-table
                :data="getFiltered"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="Please wait for users..."
                :default-sort = "{prop: 'username', order: 'descending'}">
            <el-table-column
                    prop="username"
                    label="Username"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="ownname"
                    label="First Name"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="surname"
                    label="Surname"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="email"
                    sortable
                    label="Email">
            </el-table-column>

            <el-table-column
                    label="Admin"
                    width="120"
                    sortable>
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
                            @click="deleteUser(scope.row._id, scope.row.username)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import VueAlert from '@vuejs-pt/vue-alert';
    import {eventBus} from '../app'
    export default {
        components: {},
        data() {
            return{
                loading: true,
                filters: {
                    username: "",
                    email: "",
                    surname: "",
                    isAdmin: false
            },
                users: []
            }
        },
        created (){
            eventBus.$on('usernameCustomFilter', data => {
                this.filters.username = data.username
            });

            eventBus.$on('surnameCustomFilter', data => {
                this.filters.surname = data.surname
            });

            eventBus.$on('emailCustomFilter', data => {
                this.filters.email = data.email
            });
            this.getUsers();
        },
        computed: {
            getFiltered() {

                var users = this.users.filter((user) => {
                    return user.username.toLowerCase().includes(this.filters.username.toLowerCase())
                        && user.email.toLowerCase().includes(this.filters.email.toLowerCase())
                        && user.surname.toLowerCase().includes(this.filters.surname.toLowerCase());
                });

//                var users = this.users.filter((user) => {
//                        Object.entries(this.filters).forEach((entry) => {
//                            const [key, value] = entry;
//                            console.log(key + " --" + value);
//                            console.log(user);
//                            return user.key.toLowerCase().includes(this.filters.entry.toLowerCase());
//                        });
//                });

                return users;
            }
        },
        methods: {

            getUsers(){
                axios.get('/users') // make normal async await!!
                    .then(response => {
                        this.users = response.data;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
             deleteUser(userID, username) {
                 this.loading = true;
                     axios.delete('/users/' + userID)
                        .then(response => {
                            this.$notify({
                                title: 'User is deleted!',
                                message: 'The user ' + username + ' was deleted!',
                                type: 'success'
                            });
                            this.getUsers();
                        })
                        .catch(error => {
                            console.log(error);
                            this.$notify({
                                title: 'User is NOT deleted!',
                                message: 'The ERROR during deleting of user ' + username + ' occured!',
                                type: 'error'
                            });
                        });
            }
        }

    };
</script>