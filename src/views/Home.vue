<template>
	<div class="home">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>财务统计(本月)</h1>
			</div>
			<ul class="finance-data s-b" v-if='account'>
				<li>
					<p>{{account.free}}</p>
					<h1>无偿供货额</h1>
				</li>
				<li>
					<p>{{account.expend}}</p>
					<h1>已结算货款</h1>
				</li>
				<li>
					<p>{{account.wait}}</p>
					<h1>未结算货款</h1>
				</li>
				<li>
					<p>{{account.all}}</p>
					<h1>总货款</h1>
				</li>
			</ul>
		</el-card>
		<!-- <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>待办事项</h1>
			</div>
			<ul class="wait-to-do">
				<li>订单号：<span class="red">151515151000</span>，下单时间：<span class="red">1988-02-02</span>，金额：<span class="red">￥100.00</span>还未发货。</li>
			</ul>
		</el-card>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>最近结算记录<span style="color: #ccc;font-size: 13px;">（仅显示最近30条记录，更多记录请前往财务管理->结算记录查看）</span></h1>
			</div>
			<ul class="wait-to-do">
				<li><span class="red">2018-05-08</span>，平台管理员：<span class="red">林杜森</span>与您进行货款结算，金额：<span class="red">￥100.00</span>，如有异议，请联系管理员核对。</li>
			</ul>
		</el-card> -->
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				account : null,
			}
		},
		created  () {
			this.http.post('/v1/f_index/getIndex',{
				
			}).then(res => {
				this.account = res.data.account;
			})
		},
		//mounted () {},
		methods : {
			
		}
	}
</script>