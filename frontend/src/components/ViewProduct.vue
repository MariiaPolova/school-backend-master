<template>
    <el-row>
        <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
                <h1>Order #{{this.$route.params.id}}</h1>
                <img :src="this.product.img" style="width: 100%; display: block;">
                <div style="padding: 14px;">
                    <span>{{this.product.title}}</span>
                    <div class="bottom" style="margin-top: 13px; line-height: 12px;">
                        <span>{{this.product.price}}</span>
                        <el-button type="text" class="button">Operating button</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                product: {
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    color: '',
                    amount: 0,
                    img:'',
                    rating_value: 0,
                    rating_votes: 0,
                    filters_memory: '',
                    filters_ram: '',
                    filters_producer: '',
                }
            }
        },
        created(){
            this.product = this.$route.params.product;
            console.log(this.product);
        },
        methods: {
        }
    }
</script>