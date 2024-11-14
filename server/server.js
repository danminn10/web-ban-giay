const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Thêm dòng này
const cors = require('cors');
const app = express();
// Sử dụng CORS để cho phép truy cập từ ứng dụng Vue
app.use(cors());
app.use(bodyParser.json());
// Cấu hình Express để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));
// Giả lập dữ liệu sản phẩm
let arrProducts = [
    {
        id: 1,
        productName: "Nike Zoom Vapor Pro 2 HC ‘White’",
        productCode: "DR6191-101",
        releaseDate: "2023-05-01",
        description: "Giày Sneaker",
        priceRange: 3100000,
        starRating: 4.7,
        imageUrl: "/Images/vaporPro.png",
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 10 // Số lượng sản phẩm có sẵn
      },
      {
        id: 2,
        productName: "Tennis Asics Court FF Novak ‘Cranberry White’",
        productCode: "1041A089-605",
        releaseDate: "2023-04-15",
        description: "Giày Asics Pickleball",
        priceRange: 4500000,
        starRating: 4.9,
        imageUrl: "/Images/tennisAsics.png",
        availableSizes: ['S', 'M', 'L'],
        quantity: 15 // Số lượng sản phẩm có sẵn
      },
      {
        id: 3,
        productName: "Lacoste Tennis AG-LT23 Ultra ‘Green White’",
        productCode: "47SMA0101-2D2",
        releaseDate: "2023-03-20",
        description: "Giày Sneaker",
        priceRange: 4500000,
        starRating: 4.5,
        imageUrl: "/Images/lacoste.png",
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 20 // Số lượng sản phẩm có sẵn
      },
      {
        id: 4,
        productName: "Adidas Barricade 13 ‘White Lucid Blue’",
        productCode: "IF9129",
        releaseDate: "2023-02-10",
        description: "Giày Sneaker",
        priceRange: 4000000,
        starRating: 4.6,
        imageUrl: "/Images/adidas.png",
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 12 // Số lượng sản phẩm có sẵn
      },
      {
        id: 5,
        productName: "Tennis Asics Solution Speed FF 2 ‘White Black’",
        productCode: "1041A182-100",
        releaseDate: "2023-05-05",
        description: "Giày Sneaker",
        priceRange: 3500000,
        starRating: 4.8,
        imageUrl: "/Images/speedFF2.png",
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 18 // Số lượng sản phẩm có sẵn
      },
      {
        id: 6,
        productName: "Tennis Nike Air Zoom Vapor Pro ‘White Black’",
        productCode: "CZ0220-124",
        releaseDate: "2023-01-25",
        description: "Giày Sneaker",
        priceRange: 3500000,
        starRating: 4.7,
        imageUrl: '/Images/nikeAirZoom.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 22 // Số lượng sản phẩm có sẵn
      },
      {
        id: 7,
        productName: "Nike Air Zoom Challenge ‘White Pink Retro’",
        productCode: "FQ4155-101",
        releaseDate: "2023-06-15",
        description: "Giày Sneaker",
        priceRange: 4100000,
        starRating: 4.8,
        imageUrl: '/Images/nikeZoom.png',
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 14 // Số lượng sản phẩm có sẵn
      },
      {
        id: 8,
        productName: "Asics Court FF 3 Novak ‘White’",
        productCode: "1041A480-100",
        releaseDate: "2023-05-30",
        description: "Giày Asics Pickleball",
        priceRange: 4100000,
        starRating: 5.0,
        imageUrl: "/Images/novakWhite.png",
        availableSizes: ['S', 'M', 'L', 'XL'],
        quantity: 16 // Số lượng sản phẩm có sẵn
      }
];
// API lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
    res.json(arrProducts);
});
    // API lấy chi tiết sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = arrProducts.find(p => p.id === productId);
    if (product) {
    res.json(product);
    } else {
    res.status(404).send('Product not found');
    }
});
    // Serve static files from the Vue app
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
