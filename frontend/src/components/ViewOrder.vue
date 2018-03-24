<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h1>Order #{{this.$route.params.id}}</h1>
            <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
        </div>
        <template>
            <el-table
                    :data="products"
                    style="width: 100%"
                    show-summary
                    :summary-method="totalPriceCalculation"> // apply count of summary
                <el-table-column
                        prop="product_title"
                        label="Product Title"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="product_price"
                        label="Product Price">
                </el-table-column>
            </el-table>
        </template>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                products: []
            }
        },
        created(){
            this.products = this.$route.params.products;
            console.log(this.products);
        },
        methods: {
            totalPriceCalculation(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = 'Total Cost';
                        return;
                    }
                    if (index === columns.length - 1) {
                        var totalPrice = 0;
                        this.products.forEach(function (product) {
                            totalPrice += product.product_price * product.quantity;
                        });
                        sums[index] = totalPrice;
                    }
                });

                return sums;
            }
        }
    }
</script>