<template>
  <!--编写页面静态部分，即view部分-->
  <div>
    <!-- 表单校验 -->
    <el-form :model="pageForm" :rules="pageFormRules" ref="pageForm" label-width="80px">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option v-for="item in templateList" :key="item.templateId" :label="item.templateName" :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>
      ​
      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>
      ​
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据Url" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off"></el-input>
      </el-form-item>
      ​
      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>
      ​
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back" >返回</el-button>
    </div>

  </div>
</template>
<script>
  //导入对cms.js文件的引用
  import * as cmsApi from '../api/cms';
  //定义的vm中的分页数据,并将数据进行导出
  export default {
    data() {
      return {
        //站点列表
        siteList: [],
        //模版列表
        templateList: [],
        //新增界面数据
        pageForm: {
          siteId: '',
          templateId: '',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pageParameter: '',
          pagePhysicalPath: '',
          pageType: '',
          pageCreateTime: new Date()
        },
        pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId:[
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //提交POST表单
      addSubmit() {

        this.$refs.pageForm.validate((valid) => {

          // 校验成功
                if (valid) {
                 this.$confirm('确定要提交吗???啊啊啊', '提示一下:', {
                   confirmButtonText:'必须滴',
                   cancelButtonText:'算了吧',
                   // type:'warning'
                 }).then(() => {
                  cmsApi.page_add(this.pageForm).then((res) => {
                    console.log(res);
                    if (res.success) {
                      this.$message.success('提交完成!');
                    this.$refs.pageForm.resetFields();
                    } else if(res.message){
                      this.$message.error('提交失败:'+ res.message);
                    }else{
                      this.$message.error('提交失败!原因不明!');
                    };
                  })
                 }).catch(() => {
                   this.$message.info('已取消!');
                 });
                } else {
                  alert('校验失败,检查输入的信息是否有遗漏或错误!');
                  // this.$message.error('校验失败,请检查!')
                  return false;
                }
        })

      },

      // 返回页面
      go_back(){
        this.$router.push({
          path: '/cms/page/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      }
    },

    created:function(){
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
      //模板列表
      this.templateList = [
        {
          templateId:'5a962b52b00ffc514038faf7',
          templateName:'首页'
        },
        {
          templateId:'5a962bf8b00ffc514038fafa',
          templateName:'轮播图'
        }
      ]
    }

  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
