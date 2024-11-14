<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="fullName">Full Name:</label>
        <input type="text" v-model="fullName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input type="tel" v-model="phone" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "ComRegister",
  data() {
    return {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some(user => user.email === this.email);
      if (userExists) {
        this.error = "Email already exists";
        return;
      }
      users.push({ fullName: this.fullName, email: this.email, phone: this.phone, password: this.password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify({ fullName: this.fullName, email: this.email, phone: this.phone }));
      alert("Registration successful!");
      this.fullName = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.confirmPassword = "";
      this.error = "";
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register {
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