<template>
  <div class="checkout-container">
    <!-- Payment Information -->
    <div class="payment-info">
      <h2>Thông Tin Thanh Toán</h2>
      <form @submit.prevent="placeOrder">
        <div class="form-group">
          <label for="fullName"><i class="fas fa-user"></i> Họ và tên: </label>
          <input
            v-model="user.fullName"
            id="fullName"
            type="text"
            readonly
            class="readonly-input"
          />
        </div>

        <div class="form-group">
          <label for="phone"><i class="fas fa-phone"></i> Số điện thoại: </label>
          <input
            v-model="user.phone"
            id="phone"
            type="tel"
            readonly
            class="readonly-input"
          />
        </div>

        <div class="form-group">
          <label for="email"><i class="fas fa-envelope"></i> Địa chỉ email: </label>
          <input
            v-model="user.email"
            id="email"
            type="email"
            readonly
            class="readonly-input"
          />
        </div>

        <div class="form-group">
          <label for="city"><i class="fas fa-city"></i> Tỉnh/Thành phố: </label>
          <select v-model="form.city" id="city" required>
            <option disabled value="">Chọn Tỉnh/Thành phố</option>
            <option v-for="city in cities" :key="city.code" :value="city.name">
              {{ city.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="district"><i class="fas fa-map-marked-alt"></i> Quận/Huyện: </label>
          <select v-model="form.district" id="district" required>
            <option disabled value="">Chọn Quận/Huyện</option>
            <option
              v-for="district in availableDistricts"
              :key="district.code"
              :value="district.name"
            >
              {{ district.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="address"><i class="fas fa-home"></i> Địa chỉ: </label>
          <input
            v-model="form.address"
            id="address"
            type="text"
            placeholder="Nhập địa chỉ cụ thể"
            required
          />
        </div>

        <div class="form-group">
          <label for="orderNote"><i class="fas fa-sticky-note"></i> Ghi chú: </label>
          <textarea
            v-model="form.orderNote"
            id="orderNote"
            placeholder="Ghi chú về đơn hàng..."
            rows="3"
          ></textarea>
        </div>
      </form>
    </div>

    <!-- Order Summary -->
    <div class="order-summary">
      <h2>Đơn Hàng Của Bạn</h2>
      <div class="order-item" v-for="item in cart" :key="item.productId">
        <div class="order-item-info">
          <p class="product-name">{{ item.productName }} - {{ item.size }}</p>
          <p class="product-quantity">x {{ item.quantity }}</p>
        </div>
        <p class="product-price">
          {{ (item.priceRange * item.quantity).toLocaleString() }} ₫
        </p>
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

      <div class="payment-methods">
        <label class="payment-method">
          <input type="radio" v-model="form.paymentMethod" value="momo" />
          Chuyển khoản qua MOMO
        </label>

        <label class="payment-method">
          <input type="radio" v-model="form.paymentMethod" value="cod" />
          Thanh toán khi nhận hàng
        </label>
      </div>

      <button class="submit-button" @click="placeOrder">Đặt Hàng</button>
    </div>
  </div>
</template>



  
  <script>
import axios from 'axios';

export default {
  name: "ComThanhToan",
  data() {
    return {
      cart: [],
      user: {
        fullName: '',
        phone: '',
        email: '',
      },
      cities: [],
      districts: [],
      form: {
        city: '',
        district: '',
        address: '',
        orderNote: '',
        paymentMethod: 'cod',
      },
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((total, item) => total + item.priceRange * item.quantity, 0);
    },
    availableDistricts() {
      const city = this.cities.find((c) => c.name === this.form.city);
      return city ? this.districts.filter((d) => d.province_code === city.code) : [];
    },
  },
  methods: {
    async fetchProvinces() {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        this.cities = response.data.map((city) => ({
          code: city.code,
          name: city.name,
        }));
      } catch (error) {
        console.error('Lỗi khi tải danh sách tỉnh/thành phố:', error);
      }
    },
    async fetchDistricts() {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/d/');
        this.districts = response.data;
      } catch (error) {
        console.error('Lỗi khi tải danh sách quận/huyện:', error);
      }
    },
    async fetchUserInfo() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        this.user = {
          fullName: currentUser.fullName,
          phone: currentUser.phone,
          email: currentUser.email,
        };
      }
    },
    async fetchCart() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
          try {
              const response = await axios.get(`http://localhost:3000/api/cart?userId=${currentUser.id}`);
              this.cart = response.data.map((item) => ({
                  id: item.id,
                  productName: item.product?.productName || 'Không xác định',
                  priceRange: item.product?.priceRange || 0,
                  quantity: item.quantity,
                  size: item.size || 'N/A',
              }));
          } catch (error) {
              console.error('Lỗi khi tải giỏ hàng:', error);
              alert('Không thể tải giỏ hàng. Vui lòng thử lại!');
          }
      } else {
          this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
  },
    async placeOrder() {
      const shippingAddress = `${this.form.address}, ${this.form.district}, ${this.form.city}`;
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
          alert('Vui lòng đăng nhập để tiếp tục.');
          return;
        }

      try {
        if (this.form.paymentMethod === 'momo') {
          // Xử lý thanh toán MoMo
          const response = await axios.post('http://localhost:3000/api/momo/create', {
            userId: currentUser.id,
            shippingAddress,
            totalAmount: this.subtotal,
            orderNote: this.form.orderNote,
          });
          if (response.data.payUrl) {
            window.location.href = response.data.payUrl; // Chuyển người dùng đến URL thanh toán MoMo
          } else {
            alert('Không thể tạo yêu cầu thanh toán MoMo.');
          }
        } else if (this.form.paymentMethod === 'cod') {
          // Xử lý thanh toán COD
          const response = await axios.post('http://localhost:3000/api/orders/create', {
            userId: currentUser.id,
            shippingAddress,
            orderNote: this.form.orderNote,
            paymentMethod: this.form.paymentMethod,
          });
          alert(response.data.message || 'Đặt hàng thành công!');
          this.cart = [];
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        alert('Không thể đặt hàng. Vui lòng thử lại sau!');
      }
    },
  },
  mounted() {
    this.fetchProvinces();
    this.fetchDistricts();
    this.fetchUserInfo();
    this.fetchCart();
  },
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.checkout-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
}

.payment-info,
.order-summary {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  flex: 0 0 150px; /* Cố định chiều rộng cho label */
  margin-bottom: 0;
}

.form-group input,
.form-group select,
.form-group textarea {
  flex: 1; /* Đảm bảo input/textarea chiếm đủ chiều rộng */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.readonly-input {
  background-color: #f9f9f9;
  color: #666;
  cursor: not-allowed;
}

textarea {
  resize: none; /* Vô hiệu hóa thay đổi kích thước */
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.order-item-info {
  flex: 1;
}

.product-price {
  font-weight: bold;
  text-align: right;
  flex: 0 0 100px;
}

.order-totals {
  margin-top: 20px;
  border-top: 2px solid #eee;
  padding-top: 15px;
}

.order-subtotal,
.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 10px;
}

.order-total {
  font-weight: bold;
  color: #007bff;
}

.payment-methods {
  margin-top: 20px;
}

.payment-method {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.payment-method input {
  margin-right: 10px;
}

.submit-button {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
