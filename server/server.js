const app = require('./app');
const sequelize = require('./config/database');

// Đồng bộ database trước khi chạy server
sequelize.sync().then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
