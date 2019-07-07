<template>
	<div class="">
		<!-- <el-row class='search-header' :gutter="10" >
			<el-col :span='4' class='text'>
				<span class="green" style="line-height: 40px;">结算金额：￥10000</span>
			</el-col>
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
			<el-col :span='3'>
				<el-select v-model="search_type" placeholder="请选择搜索类型">
					<el-option value='1' label='货款'></el-option>
					<el-option value='2' label='运费'></el-option>
					
			  	</el-select>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row> -->
		<!-- 表格 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
<!-- 			<el-table-column prop='operator' label='平台操作员'></el-table-column> -->
			<!-- <el-table-column prop='project' label='结算项目'></el-table-column> -->
			
			<el-table-column prop='balance' label='待结算货款'></el-table-column>
			<el-table-column prop='money' label='本次结算金额'></el-table-column>
			<el-table-column prop='add_time' label='结算时间'></el-table-column>
			<el-table-column prop='remark' label='描述'></el-table-column>
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
				total : 100,
				time : null,
				search_type : null,
				list :null,
				page : 1,
				limit :10
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData () {
				this.http.post('/v1/f_account/getPurchaseLog',{
					page : this.page,
					limit : this.limit
				}).then(res => {
					this.total = res.data.total;
					this.list = res.data.data;
				})
			},
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
