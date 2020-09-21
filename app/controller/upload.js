'use strict';

const Controller = require('egg').Controller;
/**
* @controller upload 文件上传
*/
class UploadController extends Controller {

  /**
    * @summary 单文件上传
    * @description 表单请求 注意请求头 multipart/form-data
    * @router post /file/upload
    * @request formData file *file 选择文件
    * @request query String filename 文件名(非必填)
    * @request query String folderUrl 文件夹名(非必填) eg:'temp/'
    * @response 200 baseResp desc
    */
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const { filename, folderUrl } = ctx.request.query;
    // 文件传入到以用户uid命名文件夹下
    const uid = ctx.uid + '';
    // 参数规则
    const rule = {
      filename: 'string?',
      folderUrl: 'string?',
    };
    // 校验参数
    ctx.validate(rule, { filename, folderUrl });
    const result = await ctx.service.upload.SaveFile(stream, filename, folderUrl, uid);
    ctx.helper.success(result);
  }

  /**
    * @summary 多文件上传
    * @description 表单请求 注意请求头 multipart/form-data
    * @router post /file/multipleUpload
    * @request formData file *files 文件列表
    * @response 200 baseResp desc
    */
  async multipleUpload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      const fileName = await this.ctx.service.upload.SaveFile(stream);
      files.push(fileName);
    }
    this.ctx.helper.success(files);
  }

}

module.exports = UploadController;
