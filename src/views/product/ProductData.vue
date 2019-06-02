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
				<el-input placeholder="请输入搜索关键词"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
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
					<img :src="scope.row.img" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='title' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供货价'></el-table-column>
			<el-table-column prop='sales_num' label='销量'></el-table-column>
			<el-table-column prop='sales_num' label='销售额'></el-table-column>
			<el-table-column prop='stock' label='库存'></el-table-column>
			<el-table-column prop='user_identity' label="商品状态">
				<template slot-scope='scope'>
					<span class="red" v-if='scope.row.status == 0'>下架中</span>
					<span class="green" v-if='scope.row.status ==1'>在售</span>
				</template>
			</el-table-column>
			<el-table-column prop='time' label='添加时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('member-detail')">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',
				key_word : null,//搜索关键字
				list : [
					{
						id :1,
						img : 'http://flag.xmwxxx.com/img/entrep.7379ab52.png',
						title : '商品名称',
						supply_price : 100,
						market_price : 500,
						stock : 1000,
						sales_num : 0,
						status : 0,//0下架，1上架中
						time : '2019-08-08'
					},{
						id :1,
						img : 'http://flag.xmwxxx.com/img/entrep.7379ab52.png',
						title : '商品名称',
						supply_price : 100,
						market_price : 500,
						sales_num : 505,
						stock : 1000,
						status : 1,//0下架，1上架中
						time : '2019-08-08'
					}
				]
			}
		},
		created () {
			
		},
		
		methods : {
			
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
