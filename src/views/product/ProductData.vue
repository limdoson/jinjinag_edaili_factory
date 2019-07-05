<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='商品ID' value='1'></el-option>
					<el-option label='商品名称' value='2'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="key_word"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!-- 数据表 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='nick_name' label='图片'>
				<template slot-scope='scope'>
					<img :src="scope.row.cover" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='name' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供货价'></el-table-column>
			<el-table-column prop='sale' label='销量'></el-table-column>
			<el-table-column prop='sale_money' label='销售额'></el-table-column>
			<el-table-column prop='stock' label='库存'></el-table-column>
			<el-table-column prop='is_sale' label="商品状态"></el-table-column>
			<el-table-column prop='add_time' label='添加时间' width="180"></el-table-column>
			<el-table-column fixed='right' label='操作' width="180">
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('product-detail/'+scope.row.id)">详情</el-button>
					<el-button type='text' size='small' @click="deleteItem(scope.row)">删除商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total"
			  @current-change='currentChange'>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',//搜搜类型
				key_word : null,//搜索关键字
				list : null,
				limit : 10,
				page :1,
				total : 1
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData() {
				this.http.post('/v1/f_goods/goodsGetAll',{
					id : this.search_type == '1' ? this.key_word : null,
					name : this.search_type == '2' ? this.key_word : null,
					page : this.page,
					limit : this.limit,
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			//商品搜索
			search () {
				if (!this.key_word) {
					this.utils.msg('请输入搜索关键词');
					return;
				}
				this.page = 1;
				this.initData()
			},
			//商品删除
			deleteItem (item) {
				this.http.post('/v1/f_goods/goodsDel',{
					id : item.id
				}).then( res => {
					this.$message({
						type : 'success',
						message : res.msg
					});
					this.list = this.list.filter( _item => {
						return _item.id != item.id;
					})
				})
			},
			//页码切换
			currentChange (page) {
				this.page = page;
				this.initData();
			}
		},
		//mounted () {},
		// watch () {
		// 	a (n,o) {
		// 		
		// 	}
		// },
		// computed () {
		// 	a () {
		// 		return this.a
		// 	}
		// },
	}
</script>
