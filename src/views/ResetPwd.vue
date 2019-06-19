<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="原始登录密码">
					<el-input placeholder="请输入旧登录密码" v-model="oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="新登录密码">
					<el-input placeholder="请输入新登录密码" v-model="newPwd"></el-input>
				</el-form-item>
				<el-form-item label="确认登录密码">
					<el-input placeholder="请再次输入新登录密码" v-model="oncePwd"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click='confirm'>确认修改</el-button>
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
				oldPwd :null,
				newPwd : null,
				oncePwd :null
			}
		},
		created () {
			
		},
		
		methods : {
			confirm () {
				if (!this.oldPwd) {
					this.utils.msg("请输入原始密码")
					return;
				}
				if (!this.newPwd) {
					this.utils.msg("请输入新密码")
					return;
				}
				if (!this.oncePwd) {
					this.utils.msg("请再次输入新密码")
					return;
				}
				if (this.newPwd != this.oncePwd) {
					this.utils.msg("两次输入的密码不一致")
					return;
				}
				this.http.post('/v1/f_factory/updPwd',{
					oldPwd : this.oldPwd,
					newPwd : this.newPwd,
					oncePwd : this.oncePwd
				}).then( res => {
					this.$confirm('修改成功，请重新登录', '提示', {
						  confirmButtonText: '确定',
						  type: 'warning'
					}).then(() => {
						this.$router.replace('/')
					})
					
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
