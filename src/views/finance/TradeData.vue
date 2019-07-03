<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			<!-- <el-col :span='4' class='text'>
				<span class="green">销售总收入：18000</span>
			</el-col>
			<el-col :span='4' class='text'>
				<span class="red">待结算货款：18000</span>
			</el-col> -->
			<el-col :span='8'>
				 <el-date-picker
			      	v-model="time"
			      	type="datetimerange"
			      	format='yyyy-MM-dd'
			      	value-format='yyyy-MM-dd'
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			</el-col>
			<!-- <el-col :span='2'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='会员ID'></el-option>
					<el-option value='2' label='会员姓名'></el-option>
					<el-option value='3' label='会员电话'></el-option>
			  	</el-select>
			</el-col> -->
			<el-col :span='4'>
				<el-input placeholder='输入搜索关键字' v-model='key_word'></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size='small' icon='el-icon-search' @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data='list' 
			stripe 
			header-row-class-name='bg-table-header'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='' label='记录类型'>
				<template slot-scope='scope'>
					<span class="red">{{scope.row.typeName}}</span>
				</template>
			</el-table-column>
			<el-table-column prop='' label='记录说明' width="500">
				<template slot-scope='scope'>
					<span class="red">{{scope.row.remark}}</span>
				</template>
			</el-table-column>
			<el-table-column prop='total' label='账户总金额'></el-table-column>
			<el-table-column prop='money' label='本次操作金额'></el-table-column>
			<el-table-column prop='add_time' label='时间'></el-table-column>
		</el-table>
		<div class="pagenation s-b">
			<div>
				<!--<el-button type="primary" icon="el-icon-delete" @click='deleteSome' size='small' :disabled = 'disabled'>批量删除</el-button>-->
			</div>
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
				search_type : '1',//搜索类型
				key_word : null,//搜索关键词
				time : null,//搜索时间
				total : 1,
				list : null,
				page :1,
				limit :10
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData () {
				this.http.post('/v1/f_account/getLog',{
					page : this.page,
					limit : this.limit,
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			/* 页码切换函数 */
			currentChange (page) {
				this.page = page;
				this.initData();
			},
			search () {
				
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
