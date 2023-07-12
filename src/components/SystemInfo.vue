<template>
  <el-row gutter="20" class="el-row">
    <el-col :span="12" class="el-col">
    <el-card class="el-descriptions grid-content">
      <el-descriptions  title="CPU信息" border  class="margin-top grid-content" :column="columnNums" size="small">
        <el-descriptions-item class="cell-item" align="left"  label="CPU核心数">{{ cpuInfo.cpuNum }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left"  label="用户空间占用">{{ cpuInfo.user }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left"  label="系统空间占用">{{ cpuInfo.cSys }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left"  label="空闲时间">{{ cpuInfo.idle }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left"  label="等待IO时间">{{ cpuInfo.iowait }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    </el-col>
    <el-col :span="12">
    <el-card class="el-descriptions">
      <el-descriptions  title="内存信息" border  class="margin-top grid-content" :column="columnNums" size="small">
        <el-descriptions-item class="cell-item" align="left" label="总内存">{{ memInfo.total }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="内存使用率">{{ memInfo.usage }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="已用内存">{{ memInfo.used }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="可用内存">{{ memInfo.free }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
      </el-col>
  </el-row>
    <el-card class="el-descriptions">
      <el-descriptions title="系统信息" border  class="margin-top" :column="columnNums" size="small">
        <el-descriptions-item class="cell-item" align="left" label="计算机IP">{{ sysInfo.computerIp }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="操作系统版本">{{ sysInfo.osVersion }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="计算机名称">{{ sysInfo.computerName }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="操作系统架构">{{ sysInfo.osArch }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="用户目录">{{ sysInfo.userDir }}</el-descriptions-item>
        <el-descriptions-item class="cell-item" align="left" label="操作系统名称">{{ sysInfo.osName }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-collapse v-model="systemDiskInfo" accordion>
      <el-collapse-item title="硬盘列表" name="1">
      <el-card  v-for="fileInfo in sysFileInfo" :key="fileInfo.dirName">
        <h4>{{ fileInfo.typeName }}</h4>
        <el-descriptions  border  class="margin-top" :column="columnNums" size="small">
          <el-descriptions-item class="cell-item" align="left" label="总大小">{{ fileInfo.total }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="已用空间">{{ fileInfo.used }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="可用空间">{{ fileInfo.free }}</el-descriptions-item>
          <el-descriptions-item class="cell-item" align="left" label="目录">{{ fileInfo.dirName }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      </el-collapse-item>
    </el-collapse>

  <el-row gutter="10" >
    <el-col :span="24" >
    <el-card class="el-descriptions">
      <el-descriptions title="JVM信息"  border  class="margin-top" :column="columnNums" size="small">
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
import {ref} from  'vue';

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
  },
  methods: {
    fetchSystemInfo() {
      axios.get('http://localhost:8080/system/info')
          .then(response => {
            const data = response.data;
            this.memInfo = data.memInfo;
            this.sysInfo = data.sysInfo;
            this.sysFileInfo = data.sysFileInfo;
            this.jvmInfo = data.jvmInfo;
            this.cpuInfo = data.cpuInfo;
          })
          .catch(error => {
            console.error('Failed to fetch system info:', error);
          });
    },
  },
};
</script>

<style>
/* 根据需要添加样式 */
.el-descriptions {
  box-shadow:
      -5.9px -5.9px 24px -44px rgba(0, 0, 0, 0.04),
      -10.5px -10.5px 45px -44px rgba(0, 0, 0, 0.055),
      -13.6px -13.6px 62px -44px rgba(0, 0, 0, 0.065),
      -14.8px -14.8px 77px -44px rgba(0, 0, 0, 0.073),
      -13.7px -13.7px 89px -44px rgba(0, 0, 0, 0.081),
      -9.3px -9.3px 100px -44px rgba(0, 0, 0, 0.089),
      -0.2px -0.2px 109px -44px rgba(0, 0, 0, 0.1),
      16px 16px 122px -44px rgba(0, 0, 0, 0.115),
      45px 45px 147px -44px rgba(0, 0, 0, 0.14),
      100px 100px 223px -44px rgba(0, 0, 0, 0.21) !important;
;
  margin-top: 15px;
  padding: 10px;
  display:  contents;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
