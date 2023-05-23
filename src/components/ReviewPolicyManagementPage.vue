<template>
  <div>
    <AppBarNav></AppBarNav>

    <div class="editor-container">
      <el-select v-model="selectedFile" placeholder="选择文件" @change="loadDocument">
        <el-option v-for="file in fileList" :key="file.id" :value="file.id" :label="file.name"></el-option>
      </el-select>

      <mavon-editor v-model="documentContent" @change="handleContentChange"></mavon-editor>

      <el-button type="primary" @click="saveChanges">保存更改</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { ElSelect, ElOption, ElButton } from 'element-plus';
import mavonEditor from 'mavon-editor';

import 'mavon-editor/dist/css/index.css';
import AppBarNav from "@/components/AppBarNav.vue";

export default {
  components: {
    AppBarNav,
    ElSelect,
    ElOption,
    ElButton,
    mavonEditor,
  },
  setup() {
    const selectedFile = ref('');
    const fileList = ref([]);
    const documentContent = ref('');

    // 加载文件列表
    const loadFileList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/markdowneditor', { withCredentials: true });
        fileList.value = response.data;
      } catch (error) {
        console.error('加载文件列表时出错:', error);
      }
    };

    // 加载选定的文档内容
    const loadDocument = async () => {
      if (selectedFile.value) {
        try {
          const response = await axios.get(`http://localhost:3000/api/markdowneditor/${selectedFile.value}`, { withCredentials: true });
          documentContent.value = response.data.content;
        } catch (error) {
          console.error('加载文档内容时出错:', error);
          documentContent.value = '';
        }
      } else {
        documentContent.value = '';
      }
    };

    // 处理文档内容更改
    const handleContentChange = (content) => {
      documentContent.value = content;
    };

    // 保存更改
    const saveChanges = async () => {
      if (selectedFile.value) {
        try {
          await axios.put(
              `http://localhost:3000/api/markdowneditor/${selectedFile.value}`,
              { content: documentContent.value },
              { withCredentials: true }
          );
          console.log('更改已保存');
        } catch (error) {
          console.error('保存更改时出错:', error);
        }
      }
    };

    // 初始化加载文件列表
    loadFileList();

    return {
      selectedFile,
      fileList,
      documentContent,
      loadDocument,
      handleContentChange,
      saveChanges,
    };
  },
};
</script>

<style>
.editor-container {
  margin: 20px;
}
</style>
