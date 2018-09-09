<template>
   <div class="img-upload">
        <el-form ref="form" :model="form" :rules="disabled ? {} : rules" label-width="200px" class="form-width">
            <el-form-item label="图片URL" prop="img">
                <el-input v-model="form.img" class="first-col" :disabled="disabled" ref='imgUrl'></el-input>
                <Upload :isViewStatus="false" :imgSize="600"
                :fileList="fileList" 
                @uploadSuccess="beforeUpload"
                ></Upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="disabled">复制图片URL</el-button>
                <el-button class="right-float" @click="reset()" :disabled="disabled">重置上传内容</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import Upload from '@/components/UploadImage.vue'
  export default {
    data() {
      return {
        form: {
          img: ''
        },
        disabled: false,
        rules: {
            img: [
                { required: true, message: '图片不能为空', trigger: 'blur' }
            ]
        },
        showClose: true,
        uploadData: {},
        action: '', // 请求服务的地址
        dialogImageUrl: '',
        dialogVisible: false,
        limit: 1,
        fileList: [],
        fileRader: ''
      }
    },
    components: { Upload },
    watch: {
        'form.img': function (val) {
            if (val === '') {
                this.disabled = true
                this.fileList = []
            } else {
                this.disabled = false
            }
        }
    },
    mounted () {
        if (!window.FileReader) {
            console.error('Your browser does not support FileReader API!')
        }
        this.fileReader = new FileReader()
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.doCopy()
                } else {
                    this.$message({
                            message: '请按上传一张图片！',
                            type: 'error'
                    });
                    return false;
                }
            });
        },
        doCopy: function () {
            this.$copyText(this.form.img).then(function (e) {
                alert('图片已复制！')
                console.log(e)
            }, function (e) {
                alert('不能复制！')
                console.log(e)
            })
        },
        reset() {
            this.$refs['form'].resetFields()
            this.fileList = []
        },
        beforeUpload (fileList) {
            this.form.img = fileList.length > 0 ? fileList[0].url : ''
            this.$refs.imgUrl.focus()
            this.$refs.imgUrl.blur()
            this.fileList = fileList
        }
    },
     created: function () {
    }
  }
</script>

<style lang="scss">
  .img-upload {
    display: block;

    .right-float {
        float: right;
    }

    .form-width {
        margin-left: 12%;
        width: 60%;
    }

    .dis-line {
        display: inline;
    }

    .first-col {
        margin-bottom: 5px;
    }

    .upload-demo {
        ul, input {
            display: none;
        }
    }

    .up-down {
        width: 200px;
        .el-dialog{
            height: 200px;
            overflow-y: scroll;
        }
        .el-form-item__label{
            width: 100px;
        }
        .el-dialog__body{
            padding: 10px 20px;
        }
        .el-form-item{
            margin-bottom: 20px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 48%;
        }
    }

    .message-info {
        margin-bottom: 20px;
        font-size: 18px;
        margin-left: 30%;
    }

    .margin-center {
        margin-left: 35%;
    }
    
  }

</style>

