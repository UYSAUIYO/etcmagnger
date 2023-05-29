<template>
  <div>
    <el-select v-model="selectedDocument" placeholder="选择Markdown文档" @change="loadDocument">
      <el-option
          v-for="document in documentList"
          :key="document.id"
          :label="document.name"
          :value="document.id"
      ></el-option>
    </el-select>
    <div v-model="documentContent"></div>
    <el-button type="primary" @click="submitDocument">提交</el-button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import VEditor from 'veditor';
import { ElSelect, ElOption, ElButton } from 'element-plus';
import axios from 'axios';

export default {
  components: {
    VEditor,
    ElSelect,
    ElOption,
    ElButton,
  },
  data() {
    return {
      selectedDocument: null,
      documentList: [],
      documentContent: '',
    };
  },
  methods: {
    loadDocument() {
      // 根据选择的文档ID加载文档内容
      const documentId = this.selectedDocument;
      axios.get(`/api/documents/${documentId}`)
          .then(response => {
            this.documentContent = response.data.content;
          })
          .catch(error => {
            console.error('加载文档内容失败', error);
          });
    },
    submitDocument() {
      // 提交更新的文档内容
      const documentId = this.selectedDocument;
      const updatedContent = this.documentContent;
      axios.put(`/api/documents/${documentId}`, { content: updatedContent })
          .then(response => {
            console.log('文档更新成功');
          })
          .catch(error => {
            console.error('文档更新失败', error);
          });
    },
    fetchDocumentList() {
      // 获取文档列表
      axios.get('/api/documents')
          .then(response => {
            this.documentList = response.data;
          })
          .catch(error => {
            console.error('获取文档列表失败', error);
          });
    },
  },
  mounted() {
    this.fetchDocumentList();
  },
};
</script>
