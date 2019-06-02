<template>
	<div class="">
		<el-row class="search-header" :gutter='10'>
			<el-col :span='2'>
				<el-button type="primary" size="small" @click='show_dialog = true'>添加快递</el-button>
			</el-col>
			<el-col :span='10' style='line-height: 40px;'>
				<p class="tips">快递公司编码，请下载<a href="">快递编号Excel</a>查看</p>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='express_title' label='快递公司名称'></el-table-column>
			<el-table-column prop='express_code' label='快递公司编码'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加快递dialog -->
		<el-dialog 
			title='添加快递'
			:visible.sync="show_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form label-width="180px">
				<el-form-item label='快递公司名称'>
					<el-input v-model="express_title" placeholder="请填写快递公司名称"></el-input>
				</el-form-item>
				<el-form-item label='快递公司编码'>
					<el-input v-model="add_cls_title" placeholder="请填写快递公司编码"></el-input>
				</el-form-item>
			</el-form>
			<div slot='footer'>
				<el-button size='small' type="default" @click='hideDialog'>取 消</el-button>
				<el-button size='small' type="primary" @click='curfirm'>确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : [
					{
						id : 1,
						express_title : '快递公司名称',
						express_code : '快递公司编码'
					}
				],
				show_dialog :false,
				express_title : null,
				express_code : null
			}
		},
		created () {
			
		},
		
		methods : {
			
			hideDialog () {
				this.resetData();
			},
			curfirm () {
				if (!this.express_title) {
					this.utils.msg('请填写快递公司名称');
					return;
				}
				if (!this.express_code) {
					this.utils.msg('请填写快递公司编码');
					return;
				}
			},
			resetData () {
				this.show_dialog = false;
				this.express_code = null;
				this.express_title = null;
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
