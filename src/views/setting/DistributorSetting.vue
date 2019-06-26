<template>
	<div class="">
		<el-row class="search-header" :gutter='10'>
			<el-col :span='2'>
				<el-button type="primary" size="small" @click='show_dialog = true'>添加配送员</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='name' label='配送员姓名'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.name' clearable @change='changeExpressTitle(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column prop='ind' label='配送员电话'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.tel' clearable @change='changeExpressTitle(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click='deleteItem(scope.row)'>删除</el-button>
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
				<el-form-item label='配送员姓名'>
					<el-input v-model="express_title" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label='配送员电话'>
					<el-input v-model="express_code" placeholder="" type="number"></el-input>
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
				list : null,
				show_dialog :false,
				express_title : null,
				express_code : null
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData(){
				this.http.post('/v1/f_delivery/getAll',{
					
				}).then(res => {
					this.list = res.data.data;
				})
			},
			hideDialog () {
				this.resetData();
			},
			curfirm () {
				if (!this.express_title) {
					this.utils.msg('请填写配送员姓名');
					return;
				}
				if (!this.express_code) {
					this.utils.msg('请填写配送员电话');
					return;
				}
				this.http.post('/v1/f_delivery/add',{
					name : this.express_title,
					tel : this.express_code
				}).then(res => {
					this.utils.msg('添加成功',()=>{
						this.resetData()
						this.initData()
					})
				})
			},
			//修改快递公司名称
			changeExpressTitle (item) {
				this.http.post('/v1/f_delivery/upd',{
					id : item.id,
					name : item.name,
					tel : item.tel
				}).then(res => {
					this.$message({
						type : 'success',
						message :'修改成功'
					})
				})
			},
			//删除
			deleteItem (item) {
				this.http.post('/v1/f_delivery/del',{
					id :item.id
				}).then(res => {
					this.utils.msg('删除成功',()=>{
						this.initData();
					})
				})
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
