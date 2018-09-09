<!--
    fileList        为页面传入的图片列表数据
    uploadSuccess   图片上传成功后需要传父组件图片列表的数据
    fileLimit       图片上传最大值
    isViewStatus    true => 图片处于查看状态，不能编辑，不能删除 
                    false => 图片能编辑
    imgSize         限制图片上传的大小 默认150kb
    isAutoUpload    false 为手动上传   true 为自动上传  默认是自动上传
    <Upload :fileList="fileList" @uploadSuccess="uploadSuccess" :isViewStatus=true :imgSize="100" :isAutoUpload="'false'"></Upload>
-->
<template>
    <div class="upload-image">
        <el-upload
            action="/"
            :class="{'viewStatus':isViewStatus}"
            ref="upload"
            :list-type="listType"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :fileLimit="limit"
            :imgSize="imgSize"
            :auto-upload="isAutoUpload"
            >
            <el-button 
                type="primary"
                size="small"
                v-if="isAutoUpload"
            >点击上传
            </el-button>
            <el-button slot="trigger" size="small" type="primary" v-if="!isAutoUpload">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" v-if="!isAutoUpload" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip"><span><i class="el-icon-warning"></i>支持上传jpg/jpeg/png文件，且不超过{{imgsize}}kb</span></div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" 
            width="30%"
            :show-close="showClose"
            title="预览"
        >
            <div slot="title"></div>
            <vueSwiper v-if="filesList.length > 1" :previewList="previewLists"></vueSwiper>
            <img v-if="filesList.length === 1" width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        
    </div>
</template>
<script>
import vueSwiper from '@/components/VueSwiper.vue'
export default {
    name: 'uploadImage',
    data () {
        return {
            limit: this.fileLimit,
            dialogVisible: false,
            showClose: false,
            dialogImageUrl: '',
            filesList: this.fileList,
            imgsize: this.imgSize,
            previewLists: []
        }
    },
    props: {
        fileList: {
            type: Array,
            default: () => {
                return []
            }
        },
        uploadSuccess: {
            type: Function
        },
        fileLimit: {
            type: Number,
            default: 1
        },
        listType: {
            type: String,
            default: 'picture-card'
        },
        imgSize: {
            type: Number,
            default: 150
        },
        isViewStatus: {
            type: Boolean,
            default: false
        },
        isAutoUpload: {
            type: Boolean,
            default: true
        }

    },
    created () {
        this.FileReader = new FileReader()
    },
    components: {
        vueSwiper
    },
    methods: {
        beforeUpload (file) {
            console.log(this.fileLists, '==this.filesList')
            const isLt5M = file.size < this.imgsize * 1024
            if (!isLt5M) {
                this.$message({
                    message: `图片大小超过${this.imgsize}kb`,
                    type: 'warning'
                });
                return false
            }
            let fileReader = this.FileReader
            if (file) {
                fileReader.readAsDataURL(file)
            }
            fileReader.onload = () => {
                let base64Str = fileReader.result
                let params = {
                    data: base64Str.split(',')[1],
                    imageType: file.type.replace(/image\//, '')
                }
                this.uploadImage(params)
            }
        },
        uploadImage (params) {
            this.$http.post('/uploadFile', params).then(res => res.data)
            .then(res => {
                if (res.code === 0) {
                    if (this.fileList.length < this.fileLimit) {
                       this.fileList.push({url: res.url}) 
                    } else {
                        this.$alert('', {
                            type: 'warning',
                            message: '图片上传达上限，请删除后再上传！'
                        })
                    }
                    this.$emit('uploadSuccess', this.fileList)
                } 
            })
        },
        // 图片预览
        handlePreview (file) {
            this.previewLists = this.filesList
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片删除
        handleRemove (file, fileList) {
            this.filesList = fileList
            console.log(fileList, '==fileListremove====')
            this.$emit('uploadSuccess', this.filesList)
        },
        submitUpload () {
            this.$refs.upload.submit();
        }
    }
}
</script>
<style lang="scss">
// 图片查看状态样式
.upload-image {
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        img {
            display: block;
        }
    }
}
.viewStatus {
    .el-upload-list--picture-card .el-upload-list__item-actions:hover span {
        .el-icon-delete{
            display: none;
        }
    }
    .el-upload--picture-card, .el-upload--picture {
        display: none;
    }
    .el-upload-list {
        .el-icon-close {
            display: none;
        }
    }
    .el-button {
        display: none
    }
}
</style>
