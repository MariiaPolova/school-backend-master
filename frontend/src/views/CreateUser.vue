<template>
  <div>

    POST request 'users'

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading">
      <el-form-item label="User name" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="First name" prop="ownname">
        <el-input v-model="ruleForm.ownname"></el-input>
      </el-form-item>

      <el-form-item label="Surname" prop="surname">
        <el-input v-model="ruleForm.surname"></el-input>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="Male"></el-radio>
          <el-radio label="Female"></el-radio>
          <el-radio label="Other"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Is admin" prop="isAdmin">
        <el-switch v-model="ruleForm.isAdmin"></el-switch>
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

    export default {
        data() {
            return {
                loading: true,
                ruleForm: {
                    username: '',
                    ownname: '',
                    surname: '',
                    email: '',
                    pass: '',
                    gender: '',
                    isAdmin: false
                },
                rules: {
                    username: [
                        { required: true, message: 'Please input username', trigger: 'blur' },
                        { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
                    ],
                    ownname: [
                        { required: true, message: 'Please input First Name', trigger: 'change' }
                    ],
                    surname: [
                        { required: true, message: 'Please input Second Name', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: 'Please input email', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: 'Please input password', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],

                }
            };
        },
        created (){
            if(this.$route.params._id){
                this.updateForm();
            }


        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$route.params._id){
                            axios.put('/users/' + this.$route.params._id, this.ruleForm)
                                .then(response => {
                                    this.$router.push('/users');
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        else {
                            axios.post('/users', this.ruleForm)
                                .then(response => {
                                    console.log(this.$route.name);
                                    this.$router.push('/users');
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
                    this.loading = true;
                    axios.get('/users/' + this.$route.params._id) // make async await
                        .then(response => {
                            this.loading = false;
                            this.ruleForm = response.data;
                            console.log("ruleform " + this.ruleForm + "||" + response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
