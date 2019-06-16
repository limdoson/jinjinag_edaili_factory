<template>
	<div class="not-found">
		<h1>404 NOT FOUND</h1>
		<p>抱歉，您访问的页面不存在。</p>
<!-- 		<up-load v-model="img"></up-load>
		<el-button @click='test'>测试</el-button> -->
		<p class="green" @click="$router.back()" style="cursor: pointer;font-weight: bold;font-size: 15px;">返回</p>
	</div>
</template>
<script>
	
	export default {
		components : {},
		data () {
			return {
				// img : 'https://cdn2.jianshu.io/assets/web/yuxi-ads-d73b364baf42dfeca32d518c819a0136.jpg'
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			test () {
				// this.img = 'hahah'
			}
		}
	}
</script>
<style lang="less">
	.not-found {
		padding : 50px 300px;
		h1 {
			margin-bottom: 20px;
			font-size: 40px;
			font-weight: bold;
		}
		p {
			margin-bottom: 20px;
			font-size: 14px;
		}
	}
</style>