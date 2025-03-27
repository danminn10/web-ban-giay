<template>
  <div class="login">
    <div class="login-card">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <i class="icon fa fa-envelope"></i>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <i class="icon fa fa-lock"></i>
          <input v-model="password" type="password" placeholder="Mật khẩu" required />
        </div>
        <button type="submit">Đăng nhập</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ComLogin",
  data() {
    return {
      email: '',
      password: '',
      error: '' // Biến hiển thị lỗi đăng nhập
    };
  },
  methods: {
    async login() {
      try {
        // Gửi yêu cầu POST đến API đăng nhập
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        // Lấy token và thông tin người dùng từ phản hồi API
        const { token, user } = response.data;

        // Lưu token và thông tin người dùng vào localStorage để sử dụng cho các API cần xác thực
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Hiển thị thông báo thành công và chuyển hướng
        alert("Đăng nhập thành công!");
        this.$router.push('/'); // Chuyển hướng về trang chủ
      } catch (error) {
        // Xử lý lỗi nếu đăng nhập thất bại
        if (error.response && error.response.data) {
          this.error = error.response.data.error; // Hiển thị lỗi từ backend
        } else {
          this.error = 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại!';
        }
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e4ddeb, #8eaee4);
  font-family: Arial, sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
  background: #f5f5f5;
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
  background: linear-gradient(135deg, #dfd3ed, #2575fc);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #d6dae0, #9d64da);
}

.error {
  color: red;
  margin-top: 10px;
}

@media (max-width: 500px) {
  .login-card {
    padding: 20px;
  }

  button {
    font-size: 14px;
  }
}
</style>
