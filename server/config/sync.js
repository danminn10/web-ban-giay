const sequelize = require('./database');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Xóa bảng cũ và tạo lại
        console.log('Đồng bộ cơ sở dữ liệu thành công!');
    } catch (error) {
        console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', error);
    }
};

syncDatabase();
