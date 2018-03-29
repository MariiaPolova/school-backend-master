<template>
    <el-table
            :data="getFiltered"
            style="width: 100%"
            v-loading="loading"
            element-loading-text="Please wait for orders..."
            :default-sort = "{prop: 'id', order: 'descending'}">>
        <el-table-column
                prop="id"
                label="ID"
                width="70"
                sortable>
        </el-table-column>
        <el-table-column
                label="Customer"
                width="180"
                sortable>
            <template slot-scope="scope">
                <router-link :to="{ name: 'updateUser', params: { _id: scope.row.customer_id }}">
                    {{scope.row.customer_name}}
                </router-link>
            </template>
        </el-table-column>
        <el-table-column
                prop="status"
                label="Status"
                width="100"
                sortable>
            <template slot-scope="scope">
                <el-tag
                        :type="assignTag(scope.row.status)"
                        close-transition>{{scope.row.status}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column
                label="Total price"
                width="150"
                sortable>
            <template slot-scope="scope">
                {{totalPriceCalculation(scope.row.products)}} $
            </template>
        </el-table-column>

        <el-table-column
            prop="created"
            label="Created"
            width="140"
            :formatter="dateFormatter"
            sortable>
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
                        @click="deleteOrder(scope.row._id, scope.row.id)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import {eventBus} from '../app'
    export default {
        components: {},
        data() {
            return{
                loading: true,
                filters: {
                    customer_name: "",
                    status: "",
                },
                orders: []
            }
        },
        created (){

            eventBus.$on('customerNameCustomFilter', data => {
                this.filters.customer_name = data.customer_name
            });

            eventBus.$on('statusCustomFilter', data => {
                this.filters.status = data.status
            });
            this.getOrders();
        },
        computed: {
            getFiltered() {

                var orders = this.orders.filter((order) => {
                    return order.customer_name.toLowerCase().includes(this.filters.customer_name.toLowerCase())
                        && order.status.toLowerCase().includes(this.filters.status.toLowerCase());
                });

                return orders;
            }
        },
        methods: {

            getOrders(){
                axios.get('/orders') // make normal async await!!
                    .then(response => {
                        this.orders = response.data;
                        this.loading= false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async deleteOrder(orderID, id) {
                this.loading= true;
                await axios.delete('/orders/' + orderID)
                    .then(response => {
                        console.log(response);
                        this.$notify({
                            title: 'Order deleted',
                            message: 'The order #' + id + ' was deleted!',
                            type: 'success'
                        });
                        this.getOrders();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: 'Order is NOT deleted',
                            message: 'The order # ' + id + ' was NOT deleted!',
                            type: 'success'
                        });
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

            }
        }

    };
</script>