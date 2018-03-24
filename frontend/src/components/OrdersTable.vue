<template>
    <el-table
            :data="orders"
            style="width: 100%">
        <el-table-column
                prop="id"
                label="ID"
                width="50">
        </el-table-column>
        <el-table-column
                label="Customer"
                width="180">
            <template slot-scope="scope">
                <router-link :to="{ name: 'updateUser', params: { _id: scope.row.customer_id }}">
                    {{scope.row.customer_name}}
                </router-link>
            </template>
        </el-table-column>
        <el-table-column
                prop="status"
                label="Status"
                width="100">
            <template slot-scope="scope">
                <el-tag
                        :type="assignTag(scope.row.status)"
                        close-transition>{{scope.row.status}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column
                label="Total price"
                width="100">
            <template slot-scope="scope">
                {{totalPriceCalculation(scope.row.products)}} $
            </template>
        </el-table-column>

        <el-table-column
            prop="created"
            label="Created"
            width="140"
            :formatter="dateFormatter">
        </el-table-column>

        <el-table-column>
            <template slot-scope="scope">
                <el-button
                        size="mini">
                    <router-link :to="{ name: 'viewOrder',
                    params: { id: scope.row.id,
                    products: scope.row.products }}">
                        Details</router-link>
                </el-button>
                <el-button
                        size="mini">
                    <router-link :to="{ name: 'updateOrder', params: { _id: scope.row._id }}">Update Order</router-link>
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="deleteOrder(scope.row._id)">Delete</el-button>
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
                orders: []
            }
        },
        created (){
            this.getOrders();

        },
        methods: {

            getOrders(){
                axios.get('/orders') // make normal async await!!
                    .then(response => {
                        this.orders = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async deleteOrder(orderID) {
                console.log(orderID);
                await axios.delete('/orders/' + orderID)
                    .then(response => {
                        console.log(response);
                        this.getOrders();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            assignTag(fieldName){
                let tag;
                console.log(fieldName + "  fieldName");
                switch (fieldName){
                    case 'Processed':
                        tag = 'success';
                        break;
                    case 'Failed':
                        tag = 'danger';
                        break;
                    case 'Cancelled':
                        tag = 'warning';
                        break;
                    default:
                        tag = 'primary';
                }
                console.log(tag + "  tag");
                return tag;
            },
            totalPriceCalculation(products){
                var totalPrice = 0;
                products.forEach(function(product){
                    totalPrice+= product.product_price * product.quantity;
                });

                return totalPrice;
            },
            dateFormatter(row, column) {
                var date = new Date(Date.parse(row.created));
                console.log(date);
                return date.toUTCString();
//                return date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear()
//                    + " " + date.getHours() + ":" + date.getMinutes();
            }
        }

    };
</script>