<template>
  <div class="goodlist-container">
    <div class="search">
      <search-form 
        :categoryData='categoryData'
        @get-table-data='handleGetTableDate'
        @updata-search-word='handleKeyword'
        @updata-category='handleCategory'
        @updata-page='handlePage'
        @get-total-count='handleGetTotalData'
      />
      <el-button 
        class='addBtn'
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleAddShow"
      >添加商品</el-button>
    </div>
    <product-table 
      :productData='productData'
      :categoryData='categoryData' 
      @get-table-data='handleGetTableDate' 
    />
    <page 
      :totalPageCount='totalPageCount'
      :currentPage='page'
      @updata-page='handlePage'
      @update-current-page='handleCurrentPage'
      @get-table-data='handleGetTableDate'
    />
    <DialogAdd
      :categoryData='categoryData'
      :dialogAddSwitch='dialogAddSwitch'
      @hide='handleAddHide'
      @get-table-data='handleGetTableDate'
    />
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm.vue';
import ProductTable from '../components/ProductTable';
import Page from '../components/Page';
import DialogAdd from '../components/DialogAdd';
export default {
  name: 'GoodLists',
  data () {
    return {
      dialogAddSwitch: false,
      productData: '',
      totalPageCount: 0,
      appkey: 'Mr_Xu_Peng_Hui_1612743894720',
      page: 1,
      size: 10,
      searchWord: '',
      category: '',
      categoryData: [],
    }
  },
  components: {
    SearchForm,
    ProductTable,
    Page,
    DialogAdd,
  },
  created() {
    this.handleGetTableDate();
    this.handleGetTotalData();
    this.handleGetCategoryData();
  },
  methods: {
    // 隐藏删除Dialog
    handleAddHide() {
      this.dialogAddSwitch = false;
    },
    // 显示删除Dialog
    handleAddShow() {
      this.dialogAddSwitch = true;
    },
    // 修改关键字
    handleKeyword($event) {
      this.searchWord = $event;
    },
    // 修改类目
    handleCategory ($event) {
      this.category = $event;
    },
    // 修改页码
    handlePage ($event) {
      this.page = $event;
    },
    // 修改当前页码
    handleCurrentPage ($event) {
      this.page = $event;
    },
    // 获取数据量
    handleGetTotalData () {
        this.$axios('/products/all', {
        method: 'get',
        params: {
          appkey: this.appkey,
          searchWord: this.searchWord,
          category: this.category,
        },
      }).then(resp => {
        this.totalPageCount = resp.data.data.length;
      });
    },
     // 获取商品类目数据
      handleGetCategoryData() {
        this.$axios('/category/all',{
          method: 'get',
          params: {
            appkey: 'Mr_Xu_Peng_Hui_1612743894720',
          }
        }).then(resp => {
          this.categoryData = resp.data.data;
        });
      },
    // 获取表格数据
    handleGetTableDate() {
      this.$axios('/products/all', {
        method: 'get',
        params: {
          appkey: this.appkey,
          page: this.page,
          size: 10,
          searchWord: this.searchWord,
          category: this.category,
        },
      }).then(resp => {
        // 转换类目为具体文字
        const newData = resp.data.data.map(item => {
          this.categoryData.forEach(cate => {
            if(cate.id === item.category) {
              item.category = cate.name;
            }
          });
          return item;
        });
        this.productData = newData;
      });
    }
  }
};
</script>

