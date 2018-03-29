<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading">
      <el-form-item label="Title" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="Price" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input type="textarea"
                  autosize
                  v-model="ruleForm.description"></el-input>
      </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select  v-model="ruleForm.category" placeholder="please select category">
            <el-option label="Desktops" value="Desktops"></el-option>
            <el-option label="Laptops" value="Laptops"></el-option>
            <el-option label="Tablets" value="Tablets"></el-option>
            <el-option label="Phones" value="Phones"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Color" prop="color">
          <el-select  v-model="ruleForm.color" placeholder="please select status">
            <el-option label="Silver" value="Silver"></el-option>
            <el-option label="Gold" value="Gold"></el-option>
            <el-option label="Rose" value="Rose"></el-option>
            <el-option label="Black" value="Black"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="Image" prop="img">
        <el-input v-model="ruleForm.img"></el-input>
          <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
      </el-form-item>

      <el-col :span="10">
        <el-form-item label="Rating" prop="rating_value">
            <el-rate :disabled="true" v-model="ruleForm.rating_value"></el-rate>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Rating votes" prop="rating_votes">
          <el-input disabled v-model="ruleForm.rating_votes"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Capacity" prop="filters_memory">
          <el-input v-model="ruleForm.filters_memory">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="RAM" prop="filters_ram">
          <el-input v-model="ruleForm.filters_ram">
            <template slot="append">GB</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Producer" prop="filters_producer">
          <el-input v-model="ruleForm.filters_producer"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Amount" prop="amount">
          <el-input v-model="ruleForm.amount"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
          <!--change if Update -> then 'cancel'-->
      </el-form-item>
      </el-col>
    </el-form>

  </div>

</template>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
    import axios from '../my-axios.js';
    import router from "../app.js";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        data() {
            return {
                loading: true,
                ruleForm: {
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
                },
                rules: {
                    title: [
                        { required: true, message: 'Please input title', trigger: 'change' },
                        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' }
                    ],
                    price: [
                        {  required: true, message: 'Please input price, it should be number', trigger: 'change' }
                    ],
                    description: [
                        { required: true, message: 'Please input description', trigger: 'change' }
                    ],
                    category: [
                        { required: true, message: 'Please category', trigger: 'change' }
                    ],
                    filters_memory: [
                        { message: 'Please input capacity, it should be number', trigger: 'change' }
                    ],
                    filters_ram: [
                        { message: 'Please input RAM, it should be number', trigger: 'change' }
                    ],
                    amount: [
                        { required: true, message: 'Please input amount of available products', trigger: 'change' }
                    ],
                    color: [
                        { required: true, message: 'Please input color', trigger: 'change' }
                    ]

                }
            };
        },
        created (){
            if(this.$route.params._id){
                this.updateForm();
            }
            this.loading = false;


        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$route.params._id){
                            axios.put('/products/' + this.$route.params._id, this.ruleForm)
                                .then(response => {
                                    this.$notify({
                                        title: 'Product is updated!',
                                        message: 'The product ' + this.ruleForm.title + ' was updated!',
                                        type: 'success',
                                    });
                                    this.$router.push('/products');
                                })
                                .catch(error => {
                                    console.log(error);
                                    this.$notify({
                                        title: 'Product is failed to update!',
                                        type: 'error'
                                    });
                                });
                        }
                        else {
                            axios.post('/products', this.ruleForm)
                                .then(response => {
                                    this.$notify({
                                        title: 'Product is created!',
                                        message: 'The product ' + this.ruleForm.title + ' was created!',
                                        type: 'success',
                                    });
                                    this.$router.push('/products');
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
                    axios.get('/products/' + this.$route.params._id) // make async await
                        .then(response => {
                            this.loading = false;
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

        }
    }
</script>
