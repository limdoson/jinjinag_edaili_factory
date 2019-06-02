<template>
	<div class="home">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>财务统计</h1>
			</div>
			<ul class="finance-data s-b">
				<li>
					<p>50000</p>
					<h1>无偿供货额</h1>
				</li>
				<li>
					<p>1000</p>
					<h1>已结算货款(本月)</h1>
				</li>
				<li>
					<p>1000</p>
					<h1>未结算货款(本月)</h1>
				</li>
				<li>
					<p>1000</p>
					<h1>总货款(本月)</h1>
				</li>
			</ul>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>待办事项</h1>
			</div>
			<ul class="wait-to-do">
				<li>订单号：<span class="red">151515151000</span>，下单时间：<span class="red">1988-02-02</span>，金额：<span class="red">￥100.00</span>还未发货。</li>
			</ul>
		</el-card>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				
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
