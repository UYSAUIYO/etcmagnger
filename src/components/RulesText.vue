<template>
    <div>
        <AppBarNav></AppBarNav>
        <!-- 文件选择器 -->
        <el-select v-model="selectedFile" placeholder="选择文件" @change="loadFileContent">
            <el-option v-for="file in formattedFileList" :key="file" :value="file" :label="file"></el-option>
        </el-select>

        <!-- 文件内容编辑器 -->
        <el-input v-model="fileContent" type="textarea" rows="10"></el-input>

        <!-- 预览 -->
        <div>
            <h3>预览</h3>
            <div v-html="fileContentPreview"></div>
        </div>

        <!-- 更新按钮 -->
        <el-button type="primary" @click="updateFileContent">更新</el-button>
    </div>
</template>

<script>
import axios from 'axios';
import AppBarNav from "@/components/AppBarNav.vue";

export default {
    components: {AppBarNav},
    data() {
        return {
            fileList: [],                // 文件列表
            selectedFile: '',            // 选中的文件
            fileContent: '',             // 文件内容
            fileContentPreview: '',      // 文件内容预览
        };
    },
    mounted() {
        this.fetchFileList();          // 获取文件列表
    },
    computed:{
        formattedFileList() {
            return this.fileList.map((file) => file.replace('.html', ''));
        },
    },
    methods: {
        // 获取文件列表
        fetchFileList() {
            axios
                .get('http://localhost:3000/api/html')
                .then((response) => {
                    this.fileList = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        // 加载文件内容
        loadFileContent() {
            axios
                .get(`http://localhost:3000/api/html/${this.selectedFile}`)
                .then((response) => {
                    this.fileContent = response.data.content;
                    this.fileContentPreview = response.data.content;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        // 更新文件内容
        updateFileContent() {
            axios
                .put(`http://localhost:3000/api/html/${this.selectedFile}`, { content: this.fileContent })
                .then(() => {
                    console.log('文件内容已更新');
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
