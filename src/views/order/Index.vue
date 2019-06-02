<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
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
				<el-select v-model='search_type'>
					<el-option label='订单ID' value='1'></el-option>
					<el-option label='订单编号' value='2'></el-option>
					<el-option label='买家ID' value='3'></el-option>
					<el-option label='买家姓名' value='4'></el-option>
					<el-option label='买家电话' value='5'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!-- tab -->
		<el-row :gutter="10" style='margin-top: 15px;' >
			<el-col :span='2'>
				<el-button type="primary" size="small">全部订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="success" size="small">待付款订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="warning" size="small">待发货订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="danger" size="small">待收货订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="info" size="small">已完成订单</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="default" size="small">已取消订单</el-button>
			</el-col>
		</el-row>
		<!-- 订单数据表 -->
		<ul class="order-list">
			<li v-for="(item,index) in list" :key='index'>
				<!-- 订单头 -->
				<h1 class="s-b">
					<span>订单ID：{{item.id}}</span>
					<span>订单编号：{{item.ind}}</span>
					<span>买家姓名（ID）：{{item.real_name}}({{item.phone}})</span>
					<span>下单时间：{{item.time}}</span>
				</h1>
				<!-- 订单内容 -->
				<dl class="s-b">
					<dt>
						<div class="f-s">
							<img src="http://flag.xmwxxx.com/upload/images/product/slide/201904/20190401181853_291.jpg" alt="">
							<div>
								<h2>【拉开解放路卡商家付款拉了电风扇家乐卡扫福领就】</h2>
								
								<p>购买数量：<span class="red">10</span></p>
							</div>
						</div>
						<div class="f-s">
							<img src="http://flag.xmwxxx.com/upload/images/product/slide/201904/20190401181853_291.jpg" alt="">
							<div>
								<p>拉开解放路卡商家付款拉了电风扇家乐卡扫福领就</p>
								
								<p>购买数量：<span class="red">10</span></p>
							</div>
						</div>
					</dt>
					<dd>
						订单状态：<span class="red">已付款</span>
					</dd>
					<dd>
						<el-button type="text" size="small" @click="$router.push('order-detail')">详情</el-button>
						<el-button type="text" size="small">订单发货</el-button>
					</dd>
				</dl>
				<!-- 订单尾 -->
				<h1 class="s-b">
					<span>收货人姓名：林杜森</span>
					<span>收货人电话：15960209969</span>
					<span>收货地址：福建省厦门市思明区石材中心411</span>
				</h1>
			</li>
		</ul>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>
		<!-- 订单发货dialog -->
		<el-dialog 
			title='安全码验证'
			:visible.sync="show_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<div class="form-container">
				<el-form label-width="100px">
					<el-form-item label="选择发货方式">
						<el-select v-model="type" @change='changeType'>
							<el-option label="厂家自行配送" value='1'></el-option>
							<el-option label="快递配送" value='2'></el-option>
							<el-option label="物流配送" value='3'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-model="deliverier_phone" label='配送员电话' v-if='type == 1'>
						<el-input placeholder="请输入厂家配送员联系电话" type="number"></el-input>
					</el-form-item>
					<el-form-item v-model="express_number" label='填写快递单号' v-if='type == 2'>
						<el-input placeholder="请输入快递单号"></el-input>
					</el-form-item>
					<el-form-item v-model="logistics_number" label='填写物流单号' v-if='type == 3'>
						<el-input placeholder="请输入快递单号"></el-input>
					</el-form-item>
				</el-form>
				
			</div>
			<div slot='footer'>
				<el-button size='small' type="default" @click='cancle'>取 消</el-button>
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
				show_dialog :true,
				search_type : '1',
				time : null,
				list : [
					{
						id : 1,
						ind : 1515151515,
						real_name : '林杜森',
						phone : 15960209969,
						time : '2018-02-02'
					},{
						id : 1,
						ind : 1515151515,
						real_name : '林杜森',
						phone : 15960209969,
						time : '2018-02-02'
					}
				],
				type : '1',//发货方式
				deliverier_phone : null,//配送员电话
				express_number : null,//快递单号
				logistics_number : null,//物流单号
			}
		},
		created () {
			
		},
		
		methods : {
			handleClick () {},
			changeType(val){
				switch (val){
					case '1':
						this.express_number = null;
						this.logistics_number = null;
						break;
					case '2':
						this.logistics_number = null;
						this.deliverier_phone = null;
						break;
					case '3':
						this.express_number = null;
						this.deliverier_phone = null;
						break;
				}
			},
			cancle () {
				this.resetData();
			},
			curfirm () {
				
			},
			resetData () {
				this.express_number = null;
				this.logistics_number = null;
				this.deliverier_phone = null;
				this.show_dialog = false;
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
	.order-list {
		margin-top: 15px;
		li {
			margin-bottom: 8px;
			img {
				width: 120px;
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
