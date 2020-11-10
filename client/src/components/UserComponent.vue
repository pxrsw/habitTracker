<template>
  <div class = "container">
  <h1>Users</h1>
  <div class="create-user">
  <label for="create-user">Create new acc:  </label>
  <input type="text" id="create-user" v-model="firstName" placeholder="Enter her/his first name">
  <button v-on:click="createUser">Submit!</button>
  </div>
  
  <p class = "error" v-if="error">{{ error }}</p>
  <div class = "users-container">
  <div class = "user"
  v-for="(user, index) in users"
  v-bind:item="user"
  v-bind:index = "index"
  v-bind:key="user._id"
  >
  <p class="firstName">{user.firstName} </p>
  </div>
  </div>
  </div>
</template>

<script>
import UserService from '../UserService';

export default {
  name: 'UserComponent',
  data() {
  return {
  users: [],
  error: '',
  firstName: ''
  }
  },
  async created() {
  try {
  this.users = await UserService.getUsers();
  }catch(err) {
  this.error = err.message;
  }
  },
  methods: {
  async createUser() {
  await UserService.insertUser({firstName:this.firstName});
  this.users = await UserService.getUsers();
  } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
div.container { max-width: 800px; margin: 0 auto; }

p.error { border: 1px solid #ff5b5f; background-color: #ffc5c1; padding: 10px; margin-bottom: 15px; }

div.firstName { position: relative; border: 1px solid #5bd658; background-color: 3bcffb8; padding: 10px 10px 30px 10px; margin-bottom: 15px; }

div.created-at { position: absolute; top: 0; left: 0; padding: 5px 15px 5px 15px; background-color: darkgreen; }

p.firstName { font-size: 22px; font-weight: 700; margin-bottom: 0; } 
</style>
