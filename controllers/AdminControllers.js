const AdminModel = require('../models/AdminModel');
const ProductsModel = require('../models/ProductsModel');

const multer = require('multer');
const cloudinary = require('../Cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ProductImages',
        format: async (req, file) => {
            // Auto-determine format based on mimetype
            const mime = file.mimetype;

            if (mime === 'image/jpeg') return 'jpg';
            if (mime === 'image/png') return 'png';
            if (mime === 'image/webp') return 'webp';
            // Default format
            return 'jpg';
        },
        public_id: (req, file) => {
            const originalName = file.originalname.split('.')[0].trim().replace(/\s+/g, '-');
            return Date.now() + '-' + originalName;
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB in bytes
    }
}).array('productImages', 10);


const AdminLogin = async (req, res) => {
    const { adminid, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ adminid });

        if (!admin) {
            return res.status(401).send({ message: 'Invalid Admin ID!' });
        }

        if (admin.password !== password) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        res.status(200).send({
            message: "Login successful!",
            admin: {
                adminid: admin.adminid,
                adminname: admin.adminname,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


const UploadProducts = async (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.error("❌ Multer/Cloudinary error:", error);
            return res.status(500).json({ message: 'File Uploading Error', error: error.message });
        }

        try {
            const {
                productCode,
                productName,
                productCategory,
                brand,
                description,
                price,
                discountPrice,
                stock
            } = req.body;

            const imageUrls = req.files.map(file => file.path);

            const Product = await ProductsModel.create({
                productCode,
                productName,
                productCategory,
                brand,
                description,
                price: parseFloat(price),
                discountPrice: parseFloat(discountPrice),
                stock: parseInt(stock),
                productImages: imageUrls,
                defaultImage: imageUrls[0]
            });

            res.status(200).json({
                message: '✅ Product uploaded successfully!',
                data: Product
            });

        } catch (error) {
            console.error("🔥 DB Save Error:", error);

            if (error.code === 11000) {
                return res.status(409).json({ message: '❌ Product Code already exists.' });
            }

            res.status(500).json({ message: 'Error in Saving Data', error: error.stack });
        }
    });
};




module.exports = {
    AdminLogin,
    UploadProducts,
    upload
};
