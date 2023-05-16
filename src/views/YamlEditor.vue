<template>
  <div>
    <AppBarNav></AppBarNav>
    <h1>YAML Editor</h1>
    <div v-if="files.length">
      <el-select
        v-model="selectedFile"
        placeholder="Please select a file"
        @change="fetchFile"
      >
        <el-option
          v-for="file in files"
          :key="file"
          :label="file"
          :value="file"
        >
        </el-option>
      </el-select>
    </div>
    <div v-if="fileContent">
      <el-input
        type="textarea"
        :rows="25"
        v-model="fileContent"
        auto-complete="off"
      >
      </el-input>
      <v-btn type="primary" @click="updateFile">
        <v-icon>mdi-upload</v-icon>
        更新
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import yaml from "js-yaml";
import AppBarNav from "@/components/AppBarNav.vue";

export default {
  components: { AppBarNav },
  data() {
    return {
      files: [],
      selectedFile: "",
      fileContent: "",
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get("http://localhost:3000/api/yml");
        this.files = response.data.files;
      } catch (error) {
        console.error("Could not fetch files", error);
      }
    },
    async fetchFile() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/yml/${this.selectedFile}`
        );
        this.fileContent = yaml.dump(response.data.data);
      } catch (error) {
        console.error("Could not fetch file", error);
      }
    },
    async updateFile() {
      try {
        const content = yaml.load(this.fileContent);
        await axios.put(
          `http://localhost:3000/api/yml/${this.selectedFile}`,
          yaml.dump(content),
          {
            headers: {
              "Content-Type": "text/yaml",
            },
          }
        );
        this.$message.success("File updated");
      } catch (error) {
        console.error("Could not update file", error);
      }
    },
  },
  mounted() {
    this.fetchFiles();
  },
};
</script>
