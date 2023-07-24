<template>
  <el-row gutter="15">
    <el-col :span="12">
      <el-card class="card">
        <el-progress type="circle" :percentage="getCpuInfoCSys()" :stroke-width="10" :color="cpuInfoColor">
          <span>{{ cpuInfo.idle }}%</span>
          <br>
          <span>CPU</span>
        </el-progress>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card">
        <el-progress type="circle" :percentage="getMemInfoUsage()" :stroke-width="10" :color="getMemInfoColor">
          <span>{{ memInfo.usage }}</span>
          <br>
          <span>内存</span>
        </el-progress>
      </el-card>
    </el-col>
  </el-row>

  <el-card>
    <el-descriptions title="系统信息" border class="margin-top" :column="columnNums" size="small">
      <el-descriptions-item class="cell-item" align="left" label="计算机IP">{{ sysInfo.computerIp }}</el-descriptions-item>
      <el-descriptions-item class="cell-item" align="left" label="操作系统版本">{{ sysInfo.osVersion }}</el-descriptions-item>
      <el-descriptions-item class="cell-item" align="left" label="计算机名称">{{ sysInfo.computerName }}</el-descriptions-item>
      <el-descriptions-item class="cell-item" align="left" label="操作系统架构">{{ sysInfo.osArch }}</el-descriptions-item>
      <el-descriptions-item class="cell-item" align="left" label="用户目录">{{ sysInfo.userDir }}</el-descriptions-item>
      <el-descriptions-item class="cell-item" align="left" label="操作系统名称">{{ sysInfo.osName }}</el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-collapse v-model="systemDiskInfo" accordion>
    <el-collapse-item title="硬盘列表">
      <el-card v-for="fileInfo in sysFileInfo" :key="fileInfo.dirName">
        <h4>{{ fileInfo.typeName }}</h4>
        <el-descriptions border class="margin-top" :column="columnNums" size="small">
          <el-descriptions-item class="cell-item" align="left" label="总大小">{{ fileInfo.total }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="已用空间">{{ fileInfo.used }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="可用空间">{{ fileInfo.free }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-collapse-item>
  </el-collapse>

  <el-row gutter="10">
    <el-col :span="24">
      <el-card >
        <el-descriptions title="JVM信息" border class="margin-top" :column="columnNums" size="small">
          <el-descriptions-item class="cell-item" align="left" label="已使用内存">{{ jvmInfo.usedMemory }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="总内存">{{ jvmInfo.totalMemory }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="可用内存">{{ jvmInfo.freeMemory }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="最大内存">{{ jvmInfo.maxMemory }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="Java版本">{{ jvmInfo.version }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="Java路径">{{ jvmInfo.home }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'SystemInfo',
  data() {
    return {
      memInfo: {},
      sysInfo: {},
      sysFileInfo: [],
      jvmInfo: {},
      cpuInfo: {},
    };
  },
  setup() {
    const systemDiskInfo = ref(true);
    return {
      systemDiskInfo,
    };
  },
  props: {
    columnNums: {
      type: Number,
      default: 2,
    },
  },
  mounted() {
    this.fetchSystemInfo();
    setInterval(this.updateSystemInfo, 3780);
  },
  methods: {
    updateSystemInfo() {
      axios
          .get('http://localhost:8080/system/info')
          .then((response) => {
            const data = response.data;
            this.memInfo = data.memInfo;
            this.cpuInfo = data.cpuInfo;
          })
          .catch((error) => {
            console.error('Failed to fetch system info:', error);
          });
    },
    fetchSystemInfo() {
      axios
          .get('http://localhost:8080/system/info')
          .then((response) => {
            const data = response.data;
            this.memInfo = data.memInfo;
            this.sysInfo = data.sysInfo;
            this.sysFileInfo = data.sysFileInfo;
            this.jvmInfo = data.jvmInfo;
            this.cpuInfo = data.cpuInfo;
          })
          .catch((error) => {
            console.error('Failed to fetch system info:', error);
          });
    },
    getMemInfoUsage() {
      if (this.memInfo && this.memInfo.usage) {
        return parseFloat(this.memInfo.usage);
      }
      return 0;
    },
    getCpuInfoCSys() {
      if (this.cpuInfo && this.cpuInfo.idle) {
        return parseFloat(this.cpuInfo.idle);
      }
      return 0;
    },
    getMemInfoColor() {
      if (this.getMemInfoUsage() < 20) {
        return '#67C23A';
      } else if (this.getMemInfoUsage() < 40) {
        return '#E6A23C';
      } else if (this.getMemInfoUsage() < 60) {
        return '#F56C6C';
      } else if (this.getMemInfoUsage() < 80) {
        return '#F56C6C';
      } else {
        return '#F56C6C';
      }
    },
    cpuInfoColor() {
      if (this.getCpuInfoCSys() < 20) {
        return '#67C23A';
      } else if (this.getCpuInfoCSys() < 40) {
        return '#E6A23C';
      } else if (this.getCpuInfoCSys() < 60) {
        return '#F56C6C';
      } else if (this.getCpuInfoCSys() < 80) {
        return '#F56C6C';
      } else {
        return '#F56C6C';
      }
    },
  },
};
</script>

<style>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
}


.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>
