'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const assert = require('assert');

class UploadService extends Service {
  // 保存图片到本地
  async SaveFile(stream, filename = '', folderUrl = '', uid) {
    assert(stream, '文件流不能为空');
    // 把文件夹名 组装到app/public下
    const publicUrl = path.join(this.config.assetPath, uid, folderUrl);
    if (!fs.existsSync(publicUrl)) {
      fs.mkdirSync(publicUrl, { recursive: true });
    }
    filename = encodeURIComponent(filename || stream.filename).toLowerCase();
    filename = decodeURIComponent(filename);
    const target = path.join(this.config.baseDir, publicUrl, filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    return { folderUrl: uid + '/' + folderUrl, filename };
  }

  // 上传文件到OSS
  async SaveFileOSS(stream, filename) {
    assert(stream, '文件流不能为空');
    filename = encodeURIComponent(filename || stream.filename).toLowerCase();
    const result = await this.ctx.oss.putStream(filename, stream);
    return result && result.url;

  }

}

module.exports = UploadService;
