/**
 * Created by haojing on 16/2/16.
 */
var qiniu = require('qiniu');
var fs = require('fs');

qiniu.conf.ACCESS_KEY = 'AaalZ54hN1oaGSkVlm0z5FFfuJKzNsYrS2-5NUqA';
qiniu.conf.SECRET_KEY = 'Xvt9N6fzxB0oJUYXTZ5V90CH9wtZz4MYEE2m0SK9';

//bucketname空间名称
function uptoken(bucketname) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname);
    return putPolicy.token();
}

/**
 * 上传二进制文件
 * @param bucketDomain 空间名称
 * @param key 七牛上文件名称
 * @param uptoken 凭证
 */
function uploadBuf(body, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.put(uptoken, key, body, extra, function(err, ret) {
        if(!err) {
            console.log('上传成功');
        } else {
            console.log(err);
        }
    })
}
/**
 * 上传本地文件
 * @param bucketDomain 空间名称
 * @param key 七牛上文件名称
 * @param uptoken 凭证
 */
function upload(localFile, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
        if(!err) {
            console.log('上传成功');
        } else {
            console.log(err);
        }
    })
}


var client = new qiniu.rs.Client();

/**
 * 删除文件
 * @param bucketDomain 空间名称
 * @param key 七牛上文件名称
 */
function deleteFile(bucketname, key ) {
    client.remove(bucketname, key, function(err, ret) {
        if (!err) {
            console.log('删除成功');
        } else {
            console.log(err);
        }
    })
}

/**
 * 查看图像信息
 * @param bucketDomain 域名
 * @param key 七牛上文件名称
 * @param cb 回调函数
 */
function getImageInfo (bucketDomain, key, cb) {
    var url = qiniu.rs.makeBaseUrl(bucketDomain, key);
    var ii = new qiniu.fop.ImageInfo();
    url == ii.makeRequest(url);
//共有的bucket省略此步骤
//    var policy = new qiniu.rs.GetPolicy();
//    url = policy.makeRequest(url);
    cb('', url);
}

/**
 * 生成缩略图
 * @param bucketDomain 域名
 * @param key 七牛上文件名称
 * @param cb 回调函数
 */
function generatorSmallImage  (bucketDomain, key, cb) {
    var url = qiniu.rs.makeBaseUrl(bucketDomain, key);
    var iv = new qiniu.fop.ImageView();
    iv.width = 100;
    url = iv.makeRequest(url);
    cb('', url);
}

//upload('test.jpg', 'wojiushihis.jpg', uptoken('hjqiniu888'));

exports.uptoken = uptoken;
exports.uploadBuf = uploadBuf;
exports.upload = upload;