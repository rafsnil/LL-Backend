const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, callBack) {
        callBack(null, 'uploads')
    },

    filename: function (req, file, callBack) {

        var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        callBack(null, file.fieldname + '-' + Date.now() + ext)

    }

})

upload = multer({ storage: storage });
module.exports = upload;