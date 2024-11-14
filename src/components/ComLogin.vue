<template>
  <div class="login">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
      </div>
      <button type="submit">Đăng nhập</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  name: "ComLogin",
  data() {
    return {
      email: '',
      password: '',
      username: '',
      error: '',
      users: JSON.parse(localStorage.getItem("users")) || []
    };
  },
  methods: {
    login() {
      const user = this.users.find(user => user.email === this.email && user.password === this.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        eventBus.emit('loginSuccess', user);
        alert("Đăng nhập thành công!");
        this.$router.push('/');
      } else {
        this.error = 'Email hoặc mật khẩu không đúng';
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>