<template>
  <div class="register">
    <div class="register-card">
      <h2>Đăng ký</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <i class="icon fa fa-user"></i>
          <input type="text" v-model="fullName" placeholder="Họ và tên" required />
        </div>
        <div class="input-group">
          <i class="icon fa fa-envelope"></i>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <i class="icon fa fa-phone"></i>
          <input type="tel" v-model="phone" placeholder="Số điện thoại" required />
        </div>
        <div class="input-group">
          <i class="icon fa fa-lock"></i>
          <input type="password" v-model="password" placeholder="Mật khẩu" required />
        </div>
        <div class="input-group">
          <i class="icon fa fa-lock"></i>
          <input type="password" v-model="confirmPassword" placeholder="Nhập lại mật khẩu" required />
        </div>
        <button type="submit">Đăng ký</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    async register() {
      // Kiểm tra điều kiện trước khi gửi dữ liệu
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu không khớp!";
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register", {
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          password: this.password
        });

        alert(response.data.message||"Đăng ký thành công! Vui lòng đăng nhập.");
        this.$router.push("/login");
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.error;
        } else {
          this.error = "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại!";
        }
      }
    }
  }
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8; /* Màu nền sáng hiện đại */
  font-family: Arial, sans-serif;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 8px;
}

.input-group .icon {
  font-size: 18px;
  color: #666;
  margin-right: 8px;
}

.input-group input {
  width: 100%;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: #007bff; /* Màu xanh hiện đại */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3; /* Màu xanh đậm hơn khi hover */
}

.error {
  color: red;
  margin-top: 10px;
}

@media (max-width: 500px) {
  .register-card {
    padding: 20px;
  }

  button {
    font-size: 14px;
  }
}
</style>
