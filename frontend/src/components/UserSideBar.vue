<template>
    <el-menu :default-openeds="['1','2','3']">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-search"></i>Username search</template>
                <el-menu-item index="1-1">
                    <el-input v-model="searchUsername" @change="filterUsername"></el-input>
                </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Surname search</template>
            <el-menu-item index="2-1">
                <el-input v-model="searchSurname" @change="filterSurname"></el-input>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Email search</template>
            <el-menu-item index="3-1" style="padding-bottom: 15px">
                <el-input v-model="searchEmail" @change="filterEmail"></el-input>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<style>
    .el-menu{
        padding-bottom: 15px;
    }
</style>

<script>
    import {eventBus} from '../app'
    export default {
        data() {
            return{
                searchUsername: '',
                searchSurname: '',
                searchEmail: '',
                searchAdmin: false
            }
        },
        methods: {
            filterUsername() {
                eventBus.$emit('usernameCustomFilter', {
                    username: this.searchUsername,
                })
            },
            filterSurname() {
                eventBus.$emit('surnameCustomFilter', {
                    surname: this.searchSurname,
                })
            },
            filterEmail() {
                eventBus.$emit('emailCustomFilter', {
                    email: this.searchEmail,
                })
            },
            filterAdmin() {
                eventBus.$emit('adminCustomFilter', {
                    isAdmin: this.searchAdmin,
                })
            }
        }
    };
</script>