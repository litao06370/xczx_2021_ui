<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" v-bind:value="item.siteId">
        </el-option>
      </el-select>
      页面别名：<el-input v-model="params.pageAliase" style="width: 150px" placeholder="输入页面别名"></el-input>
      <el-button type="primary" @click="query" size="small">查询</el-button>
      <!-- <el-button type="primary" size="small" @click="firstPage(),query">查询</el-button> -->

      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
       page: this.params.page,
       siteId: this.params.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>

    </el-form>
    <!--在table上添加按钮-->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
     <!-- <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column> -->
      <el-table-column prop="siteId" label="siteId" width="180">
      </el-table-column>

      <!-- 添加操作列 -->
      <el-table-column label="操作" width="180">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除
          </el-button>
          <el-button @click="preview(page.row.pageId)" type="text" size="small">页面预览</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination layout="prev, pager, next" :page-size="params.size" :total="total" :current-page="params.page"
      v-on:current-change="changePage" style="float:right;">
    </el-pagination>

  </div>
</template>
<script>
  //导入对cms.js文件的引用
  import * as cmsApi from '../api/cms';
  //定义的vm中的分页数据,并将数据进行导出
  export default {
    data() {
      return {
        siteList: [],
        list: [],
        total: 0, //总条数
        params: {
          siteId: [],
          pageAliase: '',
          page: 1, //页码
          size: 10 //每页显示个数
        },
        pageName: '',
        pageType: '',
        pageWebPath: '',
        pagePhysicalPath: '',
        pageCreateTime: ''
      }
    },
    methods: {
      //点击页面调用的change事件方法,
      //事件触发都会将点击的页面传入该方法中
      changePage: function(page) {
        this.params.page = page;
        this.query();
      },
      //查询的点击事件
      //查询的点击事件
      query: function() {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        })
      },
      // 我自己添加方法,为了每次点击查询能跳转到第一页
      firstPage: function() {
        this.params.page = 1;
      },

      //修改页面
      edit: function(pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query: {
            page: this.params.page,
            siteId: this.params.siteId,
          },
        })
      },
      // 删除页面
      del: function(pageId) {
        //根据id删除页面
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          this.addLoading = true;
          cmsApi.page_delete(pageId).then((res) => {
            console.log(res);
            if (res.success) {
              this.addLoading = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.query();

            } else {
              this.addLoading = false;
              this.$message.error('删除失败:'+res.message);
            };
          });
        }).catch(() => {
                   this.$message.info('已取消!');
                 });;
      },
      //页面预览
      preview(pageId){
          window.open("http://localhost/cms/preview/"+pageId)
      }

    },

    created() {
      //从路由上获取参数,并设置若值为空时,赋予默认值;取出的值类型为字符串
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted() {
      //默认查询页面
      // alert('钩子函数执行了');
      this.query();
      //初始化站点列表
      this.siteList = [{
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '测试fdafadsfas',
          siteName: '测试站'
        }
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
