<template>
	<div class="order-list-page">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<el-date-picker
				  	v-model="serarch_form.time"
				  	type="datetimerange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始日期"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model='serarch_form.search_type'>
					<el-option label='订单ID' value='1'></el-option>
					<el-option label='订单编号' value='2'></el-option>
					<el-option label='买家ID' value='3' v-if='serarch_form.order_type > 0'></el-option>
					<el-option label='买家姓名' value='4' v-if='serarch_form.order_type > 0'></el-option>
					<el-option label='买家电话' value='5' v-if='serarch_form.order_type > 0'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="serarch_form.key_word"></el-input>
			</el-col>
			<el-col :span='4'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
				<el-button type='danger' size="small" @click='resetSearch'>重置</el-button>
			</el-col>
		</el-row>
		<!-- tab -->
		<el-row :gutter="10" style='margin-top: 15px;' class='fix-tab'>
			<el-col :span='2'>
				<el-button type="primary" size="small" @click='initData()'>全部订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="success" size="small"  @click='initData(1)'>待付款订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="warning" size="small" @click='initData(2)'>待发货订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="danger" size="small" @click='initData(3)'>待收货订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="info" size="small" @click='initData(4)'>已完成订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="default" size="small" @click='initData(5)'>已取消订单</el-button>
			</el-col>
			<el-col :span='12'>
				<div class="pagination s-b" style="padding: 0;">
					<span></span>
					<el-pagination
					  background
					  @current-change='currentChange'
					  layout="prev, pager, next"
					  :total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<!-- 订单数据表 -->
		<ul class="order-list" v-if='list'>
			<li v-for="item in list" :key='item.ind'>
				<!-- 订单头 -->
				<h1 class="s-b">
					<span>订单ID：{{item.id}}</span>
					<span>订单编号：{{item.ind}}</span>
					<span>买家姓名（电话）：{{item.userRealname}}</span>
					<span>下单时间：{{item.add_time}}</span>
				</h1>
				<!-- 订单内容 -->
				<dl class="s-b">
					<dt>
						<div class="f-s" v-for='product in item.goods' :key='item.name'>
							<img :src="product.attribute_img" width="60px">
							<div>
								<h2>{{product.name}}</h2>
								<p>购买数量：<span class="red">{{product.num}}</span></p>
							</div>
						</div>
					</dt>
					<dd>
						
					</dd>
					<dd>
						<p>买家留言：<span class="red">{{item.msg ? item.msg : '--'}}</span></p>
					</dd>
					<dd>
						订单状态：
						<span class="red" v-if='item.status ==0'>待付款</span>
						<span class="red" v-if='item.status ==1'>待发货</span>
						<span class="red" v-if='item.status ==2'>待收货</span>
						<span class="red" v-if='item.status ==3'>已完成</span>
						<span class="red" v-if='item.status ==4'>已取消</span>
					</dd>
					
					<dd>
						<el-button type="text" size="small" @click="$router.push('order-detail/'+item.id)">详情</el-button>
						<el-button type="text" size="small" @click='deliverGoods(item)'>订单发货</el-button>
					</dd>
				</dl>
				<!-- 订单尾 -->
				<h1 class="s-b">
					<span>收货人姓名：{{item.get_name}}</span>
					<span>收货人电话：{{item.get_tel}}</span>
					<span>收货地址：{{item.get_adr}}</span>
				</h1>
			</li>
		</ul>
		<!-- 无数据记录 -->
		<div class="none" v-else style="margin-top: 120px;">
			暂无相关数据
		</div>
		<!-- 订单发货dialog -->
		<el-dialog
			:visible.sync='show_dialog'
			title='订单发货'
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form label-width="140px" size="small">
				<el-form-item label="选择发货方式">
					<el-select v-model="delivery.deliveryType" @change="changeDeliveryType">
						<el-option label='快递发货' value='1'></el-option>
						<el-option label='供货商配送' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择快递" v-if='delivery.deliveryType == 1'>
					<el-select  v-model="delivery.expressId">
						<el-option v-for='item in express_option' :label='item.name' :value='item.id' :key='item.name'>{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="填写快递/物流单号" v-if='delivery.deliveryType == 1'>
					<el-input type="text" v-model="delivery.expressInd"></el-input>
				</el-form-item>
				<el-form-item label="选择配送员" v-if='delivery.deliveryType == 2'>
					<el-select  v-model="delivery.deliveryId">
						<el-option v-for='item in delivery_option' :label='item.name' :value='item.id' :key='item.name'>{{item.name}}</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button  size="small" @click='cancle'>取 消</el-button>
				<el-button type="primary"   size="small"  @click='confirm'>确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				serarch_form : {
					search_type : '1',
					time : null,
					order_type : '0',//订单归属类型
					key_word : null,
				},
				list : null,
				status : null,//订单状态，1-待付款，2-待发货，3-待收货，4-已完成，5-已取消
				page :1,
				limit : 10,
				total : 1,
				show_dialog : false,//是否显示发货dialog
				delivery :{//订单发货信息
					deliveryType : '1',//订单发货类型
					deliveryId : null,//配送员Id
					expressInd : null,//快递/物流单号
					expressId : null,//快递ID
				},
				express_option : null,
				delivery_option :null,
				order_item_tmp :null,//存储订单对象的中间变量
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData(status){
				console.log(status)
				//切换状态时，将状态存储起来
				if (status) {
					this.status = status;
					this.page = 1;
				} else {
					this.status = null;
				}
				this.http.post('/v1/f_order/getAll',{
					userId : this.serarch_form.search_type == '3' ? this.serarch_form.key_word : null,
					realname : this.serarch_form.search_type == '4' ? this.serarch_form.key_word : null,
					tel : this.serarch_form.search_type == '5' ? this.serarch_form.key_word : null,
					id : this.serarch_form.search_type == '1' ? this.serarch_form.key_word : null,
					ind : this.serarch_form.search_type == '2' ? this.serarch_form.key_word : null,
					status : this.status,
					startTime : this.serarch_form.time  ? this.serarch_form.time[0] : null,
					endTime : this.serarch_form.time  ? this.serarch_form.time[1] : null,
					page : this.page,
					limit : this.limit
				}).then(res => {
					
					this.list = res.data.data.length ? res.data.data : null;
					this.total = res.data.total;

				})
			},
			//搜索订单
			search () {
				this.page = 1;
				this.initData();
			},
			//重置搜索
			resetSearch () {
				this.page = 1;
				
				this.serarch_form = {
					search_type : '1',
					time : null,
					key_word : null,
				}
				this.$forceUpdate();
				this.initData();
			},
			//订单发货
			deliverGoods (item) {
				//缓存当前的订单对象
				this.order_item_tmp = item;
				//请求快递选项数据
				if (!this.express_option) {
					this.http.post('/v1/f_order/getDelivery',{
						
					}).then(res => {
						this.express_option = res.data.express;
						this.delivery_option = res.data.delivery;
						this.show_dialog = true;
					})
					
				} else {
					this.show_dialog = true;
				}
			},
			//修改订单发货方式
			changeDeliveryType (type) {
				switch (type){
					case '1':
						this.delivery.deliveryId = null;
						break;
					case '2':
						this.delivery.expressId = null;
						this.delivery.expressInd = null;
						break;
					default:
						break;
				}
			},
			//取消发货
			cancle  () {
				this.resetData();
			},
			//确认发货
			confirm () {
				this.http.post('/v1/f_order/delivery',{
					id : this.order_item_tmp.id,
					deliveryType : this.delivery.deliveryType,
					deliveryId : this.delivery.deliveryId,
					expressInd : this.delivery.expressInd,
					expressId : this.delivery.expressId
				}).then(res => {
					this.utils.msg(res.msg,() => {
						this.resetData();
						this.initData();
					})
				})
			},
			resetData () {
				this.delivery.deliveryId = null;
				this.delivery.expressInd = null;
				this.delivery.expressId = null;
				this.order_item_tmp = null;
				this.show_dialog = false;
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
<style lang='less'>
	.order-list-page {
		.search-header {
			position: fixed;
			top: 60px;
			width: 100%;
			padding-top: 15px;
			background: #fff;
			z-index: 1;
		}
		.fix-tab {
			position: fixed;
			top: 114px;
			width: ~"calc(100% - 220px)";
			padding: 10px 0;
			background: #fff;
			z-index: 1
		}
		.none {
			margin-top: 120px;
			padding: 15px 0;
			text-align: center;
			color: #ccc;
			font-size: 14px;
		}
	}
	.order-list {
		margin-top: 110px;
		li {
			margin-bottom: 8px;
			img {
				width: 70px;
				border-radius: 4px;
				margin-right: 10px;
			}
			dl {
				padding: 10px 15px;
				dt {
					div {
						margin-bottom: 10px;
						&:nth-last-child(1) {
							margin-bottom: 0
						}
						h2 {
							font-size: 13px;
							color: #666;
							width: 400px;
						}
					}
				}
			}
			h1 {
				padding: 10px;
				background: #f1f1f1;
				font-size: 13px;
				color: #666;
			}
			&:hover {
				background: #fafafa;
			}
		}
	}
</style>
