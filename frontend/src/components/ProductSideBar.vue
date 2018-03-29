<template>
    <el-menu :default-openeds="['1','2','3']">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-search"></i>Title search</template>
                <el-menu-item index="1-1">
                    <el-input v-model="searchTitle" @change="filterTitle"></el-input>
                </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Capacity search</template>
            <el-menu-item index="2-1">
                <el-input v-model="searchMemoryMin" @change="filterFiltersMemory"></el-input>
            </el-menu-item>
            <el-menu-item index="2-2">
                <el-input v-model="searchMemoryMax" @change="filterFiltersMemory"></el-input>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Category search</template>
            <el-menu-item index="3-1">
                <el-select  v-model="searchCategory" placeholder="Category search" @change="filterCategory">
                    <el-option label="Desktops" value="Desktops"></el-option>
                    <el-option label="Laptops" value="Laptops"></el-option>
                    <el-option label="Tablets" value="Tablets"></el-option>
                    <el-option label="Phones" value="Phones"></el-option>
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
                searchTitle: '',
                searchMemoryMin: 1,
                searchMemoryMax: 1000,
                searchCategory: ''
            }
        },
        methods: {
            filterTitle() {
                eventBus.$emit('titleCustomFilter', {
                    title: this.searchTitle,
                })
            },
            filterCategory() {
                eventBus.$emit('categoryCustomFilter', {
                    category: this.searchCategory,
                })
            },
            filterFiltersMemory() {
                eventBus.$emit('memoryCustomFilter', {
                    filters_memory_min: this.searchMemoryMin,
                    filters_memory_max: this.searchMemoryMax,
                })
            }
        }
    };
</script>