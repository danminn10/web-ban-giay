<template>
    <div class="checkout-container">
      <!-- Left side: Payment Information -->
      <div class="payment-info">
        <h2>Thông Tin Thanh Toán</h2>
        <form @submit.prevent="placeOrder">
          <div class="form-group">
            <label for="fullName">Họ và tên *</label>
            <input v-model="form.fullName" id="fullName" type="text" placeholder="Nhập họ và tên" required />
          </div>
  
          <div class="form-group">
            <label for="phone">Số điện thoại *</label>
            <input v-model="form.phone" id="phone" type="tel" placeholder="Nhập số điện thoại" required />
          </div>
  
          <div class="form-group">
            <label for="email">Địa chỉ email *</label>
            <input v-model="form.email" id="email" type="email" placeholder="Nhập địa chỉ email" required />
          </div>
  
          <div class="form-group">
            <label for="city">Tỉnh/Thành phố *</label>
            <select v-model="form.city" id="city" required>
              <option disabled value="">Chọn Tỉnh/Thành phố</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="district">Quận/Huyện *</label>
            <select v-model="form.district" id="district" required>
              <option disabled value="">Chọn Quận/Huyện</option>
              <option v-for="district in availableDistricts" :key="district" :value="district">{{ district }}</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="address">Địa chỉ *</label>
            <input v-model="form.address" id="address" type="text" placeholder="Nhập địa chỉ cụ thể" required />
          </div>
  
          <div class="form-group">
            <label for="orderNote">Ghi chú đơn hàng (tuỳ chọn)</label>
            <textarea v-model="form.orderNote" id="orderNote" placeholder="Ghi chú về đơn hàng..." rows="3"></textarea>
          </div>
        </form>
      </div>
  
      <!-- Right side: Order Summary -->
      <div class="order-summary">
        <h2>Đơn Hàng Của Bạn</h2>
        <div class="order-item" v-for="item in cart" :key="item.productId">
          <p class="product-name">{{ item.productName }} - {{ item.size }}</p>
          <p class="product-quantity">x {{ item.quantity }}</p>
          <p class="product-price">{{ (item.priceRange * item.quantity).toLocaleString() }} ₫</p>
        </div>
  
        <div class="order-totals">
          <div class="order-subtotal">
            <span>Tạm tính</span>
            <span>{{ subtotal.toLocaleString() }} ₫</span>
          </div>
          <div class="order-total">
            <span>Tổng</span>
            <span>{{ subtotal.toLocaleString() }} ₫</span>
          </div>
        </div>
  
        <!-- Payment Methods -->
        <div class="payment-methods">
          <label class="payment-method">
            <input type="radio" v-model="form.paymentMethod" value="bankTransfer" />
            Chuyển khoản ngân hàng
          </label>
          <div v-if="form.paymentMethod === 'bankTransfer'" class="payment-details">
            <p class="bank-instructions">
              Thực hiện thanh toán vào tài khoản ngân hàng của Authentic Shoes. Vui lòng sử dụng mã đơn hàng của bạn trong phần Nội dung thanh toán.
            </p>
            <div class="qr-code">
              <img :src="qrCodeBank" alt="QR Code" />
              <p>DANGMINH SHOES 01</p>
              <p>SDT: 0348468065</p>
            </div>
          </div>
  
          <label class="payment-method">
            <input type="radio" v-model="form.paymentMethod" value="vnpay" />
            Chuyển khoản qua MOMO
          </label>
          <div v-if="form.paymentMethod === 'vnpay'" class="payment-details">
            <div class="qr-code">
              <img :src="qrCodeMomo" alt="QR Code" />
              <p>DANGMINH SHOES 02</p>
              <p>SDT: 0348468065</p>
            </div>
          </div>
  
          <label class="payment-method">
            <input type="radio" v-model="form.paymentMethod" value="fundin" />
            Thanh toán khi nhận hàng
          </label>
        </div>
  
        <!-- Submit Button -->
        <button class="submit-button" @click="placeOrder">Đặt Hàng</button>
        <p class="privacy-notice">
          Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, trải nghiệm sử dụng website, và các mục đích khác đã được mô tả trong chính sách riêng tư của chúng tôi.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import payments from '@/data/thanhToan.js';
  import '@/components/css/ComThanhToan.css'; // Import the CSS file
  
  export default {
    data() {
      return {
        ...payments,
        availableDistricts: []
      };
    },
    computed: {
      subtotal() {
        return this.cart.reduce((acc, item) => acc + item.priceRange * item.quantity, 0);
      }
    },
    watch: {
      'form.city'(newCity) {
        this.availableDistricts = this.districts[newCity] || [];
        this.form.district = ''; // Reset district when city changes
      }
    },
    methods: {
    placeOrder() {
      if (!this.form.fullName || !this.form.phone || !this.form.email || !this.form.city || !this.form.district || !this.form.address || !this.form.paymentMethod) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      if (this.form.paymentMethod === 'bankTransfer' || this.form.paymentMethod === 'vnpay') {
        this.confirmPayment();
      } else {
        this.completeOrder();
      }
    },
    confirmPayment() {
      const confirmed = confirm("Vui lòng xác nhận rằng bạn đã hoàn tất thanh toán.");
      if (confirmed) {
        this.completeOrder();
      }
    },
    completeOrder() {
      // Validate form inputs and handle order submission logic here
      console.log("Order placed:", this.form);
      alert("Đặt hàng thành công!");
      // Clear the cart after placing the order
      localStorage.removeItem('cart');
      this.cart = [];
      this.$router.push('/');
    }
  },
    created() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        this.form.fullName = currentUser.fullName;
        this.form.phone = currentUser.phone;
        this.form.email = currentUser.email;
      }
    }
  };
  </script>