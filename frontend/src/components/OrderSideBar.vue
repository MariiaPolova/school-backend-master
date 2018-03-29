<template>
    <el-menu :default-openeds="['2','3']">
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Customer Name search</template>
            <el-menu-item index="2-1">
                <el-input v-model="searchCustomerName" @change="filterCustomerName"></el-input>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Status search</template>
            <el-menu-item index="3-1">
                <el-select  v-model="searchStatus" placeholder="Status search" @change="filterStatus">
                    <el-option label="Open" value="Open"></el-option>
                    <el-option label="Processed" value="Processed"></el-option>
                    <el-option label="Cancelled" value="Cancelled"></el-option>
                    <el-option label="Failed" value="Failed"></el-option>
                    <el-option label="All" value=""></el-option>
                </el-select>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    import {eventBus} from '../app'
    export default {
        data() {
            return{
                searchCustomerName: '',
                searchStatus: ''
            }
        },
        methods: {
            filterCustomerName() {
                eventBus.$emit('customerNameCustomFilter', {
                    customer_name: this.searchCustomerName,
                })
            },
            filterStatus() {
                eventBus.$emit('statusCustomFilter', {
                    status: this.searchStatus,
                })
            }
        }
    };
</script>