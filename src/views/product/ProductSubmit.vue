<template>
	<div class="product-submit">
		<!-- 步骤条 -->
		<el-steps :active="active" simple finish-status="success">
			<el-step title="填写商品基本信息" icon="el-icon-edit"></el-step>
			<el-step title="上传商品详情图" icon="el-icon-edit"></el-step>
			<el-step title="其他相关设置" icon="el-icon-edit"></el-step>
		</el-steps>
		<!-- 商品基本信息 -->
		<div v-show='active == 0 && cls_option' class="product-info form-container">
			<el-form label-width="180px" >
				<el-form-item label="商品名称">
					<el-input placeholder="请输入商品名称" v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="商品供应价格">
					<el-input placeholder="填写商品供应价格,该价格将用于货款结算" type="number" v-model='supply_price'></el-input>
				</el-form-item>
				<!-- <el-form-item label="建议零售价">
					<el-input placeholder="填写商品建议零售价" type="number" v-model="msrp"></el-input>
				</el-form-item> -->
				<el-form-item label="商品分类" v-if='cls_option'>
					<el-cascader
						:options="cls_option"
						v-model="t_id">
					</el-cascader>
				</el-form-item>
				<el-form-item label="商品计量单位">
					<el-input placeholder="填写商品计量单位,如:箱/件/瓶等" v-model="unit"></el-input>
				</el-form-item>
				<el-form-item label="商品SKU">
					<el-input placeholder="填写商品sku码" v-model="sku"></el-input>
				</el-form-item>
				<el-form-item label="商品库存">
					<el-input placeholder="填写商品库存" v-model="stock" type="number"></el-input>
				</el-form-item>
				<el-form-item label="商品虚拟销量">
					<el-input placeholder="填写商品销量,该销量将显示在用户端" v-model="fake_sale" type="number"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 商品详情 -->
		<div v-show='active == 1' class="product-info form-container">
			<el-form label-width="180px">
				<el-form-item label="提示">
					<p class="tips">请确保商品封面图、商品主图尺寸一致，且不超过600kb</p>
				</el-form-item>
				<el-form-item label="商品封面图">
					<up-load v-model='cover' :imageUrl='cover'></up-load>
				</el-form-item>
				<el-form-item label="商品主图">
					<pics-upload v-model='img'></pics-upload>
				</el-form-item>
				<el-form-item label="商品详情"  style='line-height: 30px;'>
					<editor v-model='content'></editor>
				</el-form-item>
			</el-form>
		</div>
		<!-- 其他设置 --><!-- @change='changeProperty' -->
		<div v-show='active == 2' class="product-info form-container">
			<el-form label-width="180px">
				<el-form-item label='提示'>
					<p class="tips">该步骤内容如不需要，不需要做任何操作，直接发布商品即可。如需要商品规格/属性设置，请选择好规格/属性后，再填写相关规格/属性对应信息。</p>
				</el-form-item>
				<!-- 选择商品属性、规格 -->
				<el-form-item label='选择商品属性/规格组'>
					<el-checkbox-group size='small' v-model='product_property_group'>
						<el-checkbox-button  v-for="(item,index) in attr_group" :label="item" :key='item.value' @change='changeCheckList(item,index,$event)'>{{item.label}}</el-checkbox-button>
					</el-checkbox-group>
					<div >
						<ul>
							<li v-for='item in product_property_group' class="f-s" :key='item.id'>
								<span>{{item.label}}：</span>
								<el-checkbox-group v-model='item.checkList' >
									<el-checkbox :label="attr" v-for='attr in item.children' :key='attr.id' @change='changeProperty'>{{attr.label}}</el-checkbox>
								</el-checkbox-group>
							</li>
						</ul>
					</div>
				</el-form-item>
				<!-- 填写商品属性规格相关信息 -->
				<el-form-item label='填写对应规格/属性信息' v-if='attr_table_data && attr_table_data.length'>
					<el-table
						:data='attr_table_data'
						:header-cell-style = "{backgroundColor: '#fafafa'}"
						stripe
						ref="multipleTable">
						<el-table-column prop='name' label='规格/属性名称'>
						</el-table-column>
						<el-table-column prop='supply_price' label='供应价'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.supply_price"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='img' label='产品图片'>
							<template slot-scope='scope'>
								<up-load v-model='scope.row.img'></up-load>
							</template>
						</el-table-column>
						<el-table-column prop='stock' label='库存'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.stock"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='sku' label='SKU'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.sku"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</div>
		<div class="text-center padding steps">
			<el-button type="danger" size="small" @click='preStep' v-if='active > 0 '>上一步</el-button>
			<el-button type="danger" size="small" @click='nextStep' v-if='active != 2' >下一步</el-button>
			<el-button type="primary" size="small" v-if='active == 2' @click='submitProduct'>发布商品</el-button>
		</div>
	</div>
</template>

<script>
	import editor from '@c/Editor'
	export default {
		components: {editor},
		data () {
			return {
				active : 0,//默认激活选项卡
				product_property_group : [],//已选规格属性组
				attr_table_data : [],//生成表单的数据
				cls : [],//商品分类
				cls_option : null,//商品分类选项数据
				attr_group :null,
				name : null,//商品名称
				t_id : [],//商品分类ID
				supply_price : null,//商品供应价
				msrp : null,//建议零售价
				unit : null,//计量单位
				sku : null,//SKU
				stock : null,//商品库存
				fake_sale : null,//虚拟销量
				cover : null,//封面图
				content : null,//商品详情
				img  : [],//商品主图集合
				attribute : null,//商品规格属性
			}
		},
		created () {
			this.initData();
			
		},
		mounted () {
			
		},
		methods : {
			initData(){
				//获取初始需要数据
				this.http.post('/v1/f_goods/goodsGetAdd',{
					
				}).then(res => {
					this.cls_option = res.data.type;
					this.attr_group = res.data.attribute;

				})
			},
			nextStep () {
				this.active ++;
			},
			preStep () {
				this.active --;
			},
			changeCheckList (item,index ,event) {
				//如果是非选中状态，则将checkList清空
				if (!event) {
					item.checkList = []
				}
			},
			//获取富文本的内容
			changeContent (content) {
				this.content = content;
			},
			/*
			 * 修改属性规格
			 */
			changeProperty () {
				this.utils.attr_result = [];
				//筛选出有checkList的数据
				let arr = this.product_property_group.filter( item => {
					return item.checkList && item.checkList.length
				}).map( item => item.checkList)
				if (arr.length) {
					this.attr_table_data = this.utils.data_for_attrArr(arr)
				} else {
					this.attr_table_data = null
				}
			},
			//发布商品函数
			submitProduct () {
				if (!this.name) {
					this.utils.msg('请填写商品名称');
					return;
				}
				if (!this.t_id || this.t_id.length == 0) {
					this.utils.msg('请选择商品分类');
					return;
				}
				if (!this.supply_price) {
					this.utils.msg('请填写商品供应价格');
					return;
				}
				if (!this.stock) {
					this.utils.msg('请填写商品库存');
					return;
				}
				if(!this.cover) {
					this.utils.msg('请上传商品封面图');
					return;
				}
				if (!this.img || this.img.length == 0) {
					this.utils.msg('请至少上传一张商品主图');
					return;
				}
				this.http.post('/v1/f_goods/goodsAdd',{
					name : this.name,
					t_id : this.t_id[this.t_id.length -1],
					tIdJson : JSON.stringify(this.t_id),
					supply_price : this.supply_price,
					msrp : this.msrp,
					unit : this.unit,
					sku : this.sku,
					stock : this.stock,
					fake_sale : this.fake_sale,
					cover : this.cover,
					content : this.content,
					img : this.img.length ? JSON.stringify(this.img) : null,
					attribute : JSON.stringify(this.attr_table_data),
					attributeCheck : JSON.stringify(this.attr_group)
				}).then(res => {
					this.$message({
						showIcon : true,
						type : 'success',
						message : '添加成功'
					})
					// setTimeout(() => {
					// 	location.reload()
					// },1500)
				})
			}
		},
	}
</script>
