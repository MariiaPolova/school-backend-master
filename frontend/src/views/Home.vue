<!--<template>-->
  <!--<div>-->
    <!--<el-form>-->
    <!--<ul v-if="users && users.length">-->
        <!--<li v-for="user in users">-->
          <!--<p> {{ user.username }} {{ user.ownname }}  {{ user.surname }} {{ user.email }} </p>-->
            <!--<el-form-item>-->
                <!--<el-button @click="deleteUser(user._id)">Delete</el-button>-->
                <!--<el-button> <router-link :to="{ name: 'second', params: { _id: user._id }}">Update User</router-link>-->
                <!--</el-button>-->
            <!--</el-form-item>-->
        <!--</li>-->
    <!--</ul>-->
    <!--</el-form>-->
  <!--</div>-->
<!--</template>-->

<template>
        <el-table
                :data="users"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="Username"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="ownname"
                    label="First Name"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="surname"
                    label="Surname"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email">
            </el-table-column>

            <el-table-column>
                <template slot-scope="scope">
                    <el-button
                            size="mini">
                        <router-link :to="{ name: 'second', params: { _id: scope.row._id }}">Update User</router-link>
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
    import ElFooter from "../../node_modules/element-ui/packages/footer/src/main.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
//    import ElTable from "../../node_modules/element-ui/packages/table/index";
//    import ElTableColumn from "../../node_modules/element-ui/packages/table-column/index";
    import router from "../../node_modules/vue-router";
export default {
    components: {
        ElForm,
//        ElTable,
//        ElTableColumn,
        ElFooter},
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
