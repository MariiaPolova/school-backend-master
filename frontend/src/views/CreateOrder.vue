<template>
  <div>

    POST request 'orders'

    <el-form :model="ruleForm" :rules="rules" inline-message ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading">
      <el-form-item label="ID" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>

      <el-form-item label="Name" prop="customer_name">
        <el-input v-model="ruleForm.customer_id.ownname"
                  :disabled="true"></el-input>
      </el-form-item>


      <el-form-item label="Customer" prop="customer_name">
        <div>
          <el-select v-model="ruleForm.customer_name" :change="fillOutCustomer(ruleForm.customer_name)" filterable placeholder="Select one">
            <el-option
                    v-for="user in users"
                    :key="user._id"
                    :label="user.username"
                    :value="user">

            </el-option>
          </el-select>
          {{ruleForm.customer_name}}
        </div>
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-select  v-model="ruleForm.status" placeholder="please select status">
          <el-option label="Open" value="Open"></el-option>
          <el-option label="Processed" value="Processed"></el-option>
          <el-option label="Cancelled" value="Cancelled"></el-option>
          <el-option label="Failed" value="Failed"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item
                v-for="(product, index) in ruleForm.products"
                :label="'Product # ' + index"
                :key="product.product_id"
                :prop="'products.' + index + '.title'">
          <el-select v-model="product.product_id" placeholder="Select one">
            <el-option
                    v-for="item in products"
                    :key="item._id"
                    :label="item.title"
                    :value="item._id">
            </el-option>
          </el-select>
          <el-input v-model="product.quantity"></el-input>
          <el-button @click.prevent="removeProduct(product)">Delete</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addProduct">New product</el-button>
        </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
          <!--change if Update -> then 'cancel'-->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    //import users from "../components/UsersTable.vue";

    export default {
        data() {
            return {
                loading: false,
                users: [],
                products: [],
                ruleForm: {
                    id: '',
                    customer_id: '',
                    customer_name: '',
                    status: '',
                    products: [],
                },
                rules: {
                    id: [
                        { required: true, message: 'Please input ID', trigger: 'blur' },
                        { min: 1, message: 'Length should at least 1 symbol', trigger: 'blur' }
                    ],
                    customer_id: [
                        { required: true, message: 'Please input customer ID', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: 'Please input status', trigger: 'change' }
                    ],
                }
            };
        },
        created (){
            if(this.$route.params._id){
                this.updateForm();
            }
            this.showCustomersDropDown();
            this.showProductsDropDown();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$route.params._id){
                            console.log( this.ruleForm);
                            axios.put('/orders/' + this.$route.params._id, this.ruleForm)
                                .then(response => {
                                    this.$router.push('/orders');
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        else {
                            console.log( this.ruleForm);
                            axios.post('/orders', this.ruleForm)
                                .then(response => {
                                    this.$router.push('/orders');
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            }
                    }
                    else {
                        console.log('error submit');
                        return false;
                    }
                });
            },
            updateForm(){
                console.log(this.$route.params + "route params");
                if(this.$route.params){
                    //this.loading = true;
                    axios.get('/orders/' + this.$route.params._id) // make async await
                        .then(response => {
                           // this.loading = false;
                            this.ruleForm = response.data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            showCustomersDropDown(){
                axios.get('/users') // make normal async await!!
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            showProductsDropDown(){
                axios.get('/products') // make normal async await!!
                    .then(response => {
                        this.products = response.data;
                        console.log(this.products + 'final list');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            removeProduct(item) {
                var index = this.ruleForm.products.indexOf(item);
                if (index !== -1) {
                    this.ruleForm.products.splice(index, 1);
                }
            },
            addProduct() {
                console.log("list of products" +  this.ruleForm.products);
                this.ruleForm.products.push({
                    quantity: 1,
                    product_price: 0,
                    product_title: '',
                    product_id: '0'
                });
            },
            fillOutCustomer(customer){
                console.log('fill out' + customer);
                this.ruleForm.customer_name = customer.ownname + ' ' + customer.surname;
                this.ruleForm.customer_id = customer._id;
            }
        }
    }
</script>
