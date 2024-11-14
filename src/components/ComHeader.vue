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
        <router-link to="/" class="nav-item">Trang Chủ</router-link>
        <router-link to="/shoes" class="nav-item">Giày</router-link>
        <router-link to="/about" class="nav-item">Giới Thiệu</router-link>
        <router-link to="/contact" class="nav-item">Liên Hệ</router-link>
        <router-link to="/news" class="nav-item">Tin Tức</router-link>
      </nav>

      <!-- User Actions -->
      <div class="user-actions">
        <router-link v-if="user == null" to="/register" class="nav-item">Đăng Ký</router-link>
        <router-link v-if="user == null" to="/login" class="nav-item">Đăng Nhập</router-link>
      </div>
      <div v-if="user" class="user-info">
        <p>Xin chào, {{ user.fullName }}</p>
        <button @click="logout">Đăng xuất</button>
      </div>
      <div class="header-icons">
        <router-link to="/cart">
          <img src="@/assets/cart-icon.png" alt="Cart" class="cart-icon" />
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
.header {
  background-color: #2c3e50; /* Updated background color */
  color: #ecf0f1; /* Updated text color */
  padding: 10px 0;
  position: fixed; /* Fix header at the top of the screen */
  top: 0; /* Position at the very top */
  width: 100%; /* Make header full-width */
  z-index: 1000; /* Ensure header stays above other content */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: add shadow for a subtle effect */
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
  height: 40px;
  margin-right: 10px;
}

.logo span {
  font-weight: bold;
  font-size: 1.2em;
  color: #ecf0f1; /* Updated text color */
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #ecf0f1; /* Updated text color */
  text-decoration: none;
  font-size: 1em;
}

.nav-item:hover {
  color: #bdc3c7; /* Updated hover color */
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
  color: #ecf0f1; /* Updated text color */
}

.user-actions .nav-item {
  color: #f39c12; /* Updated text color */
}

.user-actions .nav-item:hover {
  color: #e67e22; /* Updated hover color */
}

.cart-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

/* Add padding to the top of the main content to prevent it from being hidden under the fixed header */
main {
  padding-top: 70px; /* Adjust based on header height */
}
</style>