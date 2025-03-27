<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
        <span>DANGMINH SHOES</span>
      </div>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <router-link to="/" class="nav-item">
          <i class="fas fa-home"></i> Trang Chủ
        </router-link>
        <router-link to="/shoes" class="nav-item">
          <i class="fas fa-shoe-prints"></i> Giày
        </router-link>
        <router-link to="/about" class="nav-item">
          <i class="fas fa-info-circle"></i> Giới Thiệu
        </router-link>
        <router-link to="/contact" class="nav-item">
          <i class="fas fa-envelope"></i> Liên Hệ
        </router-link>
        <router-link to="/news" class="nav-item">
          <i class="fas fa-newspaper"></i> Tin Tức
        </router-link>
      </nav>

      <!-- User Actions -->
      <div class="user-actions">
        <router-link v-if="user == null" to="/register" class="nav-item">
          <i class="fas fa-user-plus"></i> Đăng Ký
        </router-link>
        <router-link v-if="user == null" to="/login" class="nav-item">
          <i class="fas fa-sign-in-alt"></i> Đăng Nhập
        </router-link>
      </div>
      <div v-if="user" class="user-info">
        <p>
          <i class="fas fa-user-circle"></i> Xin chào, {{ user.fullName }}
        </p>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Đăng Xuất
        </button>
      </div>

      <!-- Cart Icon -->
      <div class="header-icons">
        <router-link to="/cart">
          <i class="fas fa-shopping-cart cart-icon"></i>
        </router-link>
      </div>
    </div>
  </header>
  <router-view></router-view>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  name: 'ComHeader',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('currentUser')) || null,
    };
  },
  created() {
    eventBus.on('loginSuccess', this.handleLoginSuccess);
  },
  beforeUnmount() {
    eventBus.off('loginSuccess', this.handleLoginSuccess);
  },
  methods: {
    handleLoginSuccess(user) {
      this.user = user;
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.user = null;
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.header {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 10px 0; /* Giảm khoảng cách padding */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo img {
  height: 35px; /* Giảm chiều cao logo */
  margin-right: 10px;
}

main {
  padding-top: 60px; /* Điều chỉnh theo chiều cao header mới */
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.logo span {
  font-weight: bold;
  font-size: 1.5em;
  color: #f39c12;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #f39c12;
}

.user-actions {
  display: flex;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info p {
  margin: 0;
  font-size: 1em;
}

.logout-btn {
  background-color: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 5px;
}

.logout-btn:hover {
  color: #c0392b;
}

.cart-icon {
  font-size: 1.5em;
  color: #f39c12;
  cursor: pointer;
  transition: color 0.3s ease;
}

.cart-icon:hover {
  color: #e67e22;
}

main {
  padding-top: 80px;
}
</style>
