<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="原始登录密码">
					<el-input placeholder="请输入旧登录密码"></el-input>
				</el-form-item>
				<el-form-item label="新登录密码">
					<el-input placeholder="请输入新登录密码"></el-input>
				</el-form-item>
				<el-form-item label="确认登录密码">
					<el-input placeholder="请再次输入新登录密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small">保修修改</el-button>
				</el-form-item>
			</el-form>
		</div>
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
