<template>
	<div class="">
		<el-row class='search-header'>
			<el-popover
				placement="top"
				width="250px"
				v-model='showPopover'>
				<el-input placeholder="请填写主属性/规格组名称" v-model="parent_atr_name"></el-input>
				<div style="padding-top: 15px;text-align: right;">
					<el-button size="mini" type="text" @click="cancle_parent_add">取消</el-button>
					<el-button type="primary" size="mini" @click="confirm_parent_add">确定</el-button>
				</div>
				<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" slot='reference' >添加商品主规格/属性组</el-button>
			</el-popover>
		</el-row>
		<el-tree
			:data='list'
			node-key='id'
			:expand-on-click-node='false'>
			<span class="custom-tree-node" slot-scope='{node,data}'>
				<span>{{node.label}}</span>
				<span>
					<el-button type='success' size='small' @click='addSubItem(node,data)' v-if='data.parent_id == 0'>添加子属性/规格</el-button>
					<el-button type='danger' size='small' @click='deleteItem(node,data)'>删除当前属性/规格</el-button>
				</span>
			</span>
		</el-tree>
		<!-- 添加子规格dialog -->
		<el-dialog 
			:visible.sync="show_dialog"
			title='填写规格/属性名称'
			width='30%'
			append-to-body
			center>
			<el-input v-model='sub_name' placeholder="请输入要添加的规格或属性名称"></el-input>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="showDialog = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="confirmAddSub" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
		<!-- 添加子属性dialog -->
		
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				showPopover :false,//是否显示添加主属性popover
				parent_atr_name : null,//主属性规格名称
				show_dialog : false,
				sub_name : null,
				list : null,//属性数据
				parent_item_tmp : null,//缓存添加子属性时的父级ITEM信息
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/f_goods/factoryAttributeGet',{
					
				}).then( res => {
					this.list = res.data;
				})
			},
			//取消添加父级属性
			cancle_parent_add () {
				this.parent_atr_name = null;
				this.showPopover = false;
			},
			//确认添加父级属性
			confirm_parent_add () {
				if (!this.parent_atr_name) {
					this.utils.msg('请输入属性名称');
					return;
				}
				this.http.post('/v1/f_goods/factoryAttributeAdd',{
					name : this.parent_atr_name,
					f_id : 0,
					level : 1
				}).then(res => {
					this.$message({
						type : 'success',
						message : res.data.msg
					});
					this.parent_atr_name = null;
					this.showPopover = false;
					this.initData();
				})
			},
			addSubItem (item) {
				this.show_dialog = true;
				this.parent_item_tmp = item;
			},
			//确认添加子属性
			confirmAddSub () {
				console.log(this.parent_item_tmp)
				if(!this.sub_name) {
					this.utils.msg('请输入子属性名称');
					return;
				}
				this.http.post('/v1/f_goods/factoryAttributeAdd',{
					name : this.sub_name,
					f_id : this.parent_item_tmp.data.value,
					level :2
				}).then( res => {
					this.$message({
						type : 'success',
						message : res.data.msg
					});
					this.sub_name = null;
					this.show_dialog = false;
					this.initData();
				})
			},
			//删除属性
			deleteItem(item) {
				console.log(item)
				this.http.post('/v1/f_goods/factoryAttributeDel',{
					id : item.data.value
				}).then( res => {
					this.$message({
						type : 'success',
						message : res.msg
					});
					this.initData();
				})
				
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
