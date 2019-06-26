<template>
	<div class="editor">
		<quill-editor
			v-model="content"
			ref="myQuillEditor"
			:options="editorOption"
			@change='editorChange($event)'>
		</quill-editor>
		<el-upload
			class="avatar-uploader"
			:action="serverUrl"
			accept=".jpg,.png,.jpeg"
			name="img"
			:show-file-list="false"
			:on-success="uploadSuccess"
			:on-error="uploadError"
			:before-upload="beforeUpload">
		</el-upload>
		<!-- 隐藏的文件上传 -->
		<el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
			ref="upload" style="display:none">
			<el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
		</el-upload>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {quillEditor, Quill} from 'vue-quill-editor'
	export default {
		components: {quillEditor},
		props : ['value'],
		data () {
			return {
				content : this.value,
				serverUrl : this._config.img_upload_host,
				editorOption : {
					placeholder: '请输入内容',
				    theme: 'snow',  // or 'bubble'
				    modules: {
				        toolbar: {
				            container: [
								['bold', 'italic', 'underline', 'strike'],
								[{'indent': '-1'}, {'indent': '+1'}],
								[{'size': ['small', false, 'large', 'huge']}],
								[{'color': []}, {'background': []}],
								[{'align': []}],
								['video','image']
							],  // 工具栏
				            handlers: {
				                'image': function (value) {
				                    if (value) {
										document.querySelector('.avatar-uploader input').click()
				                    } else {
				                        this.quill.format('image', false);
				                    }
				                }
				            }
				        }
				    }
				},
				uploadType : '',//文件上传类型
			}
		},
		created () {
			
		},
		mounted () {
			this.$refs.myQuillEditor.$el.childNodes[2].style.height = '400px';
			//为视频点击绑定时间
			this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler) 
		},
		methods : {
			editorChange (e) {
				this.$emit('input',this.content);
			},
			beforeUpload (file) {
				//限制文件大小
				let size = (file.size / 1024 / 1024) < this._config.upload_img_size;
				if (!size) {
					this.$message.error('上传图片大小不能超过600KB');
				} else {
					//允许上传显示loading
					this.loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
				}
				return size;
				
			},
			uploadSuccess (res, file) {
				let quill = this.$refs.myQuillEditor.quill
				
			    // 如果上传成功
			    if (res.code == '200' ) {
			        // 获取光标所在位置
			        let length = quill.getSelection().index;
			        // 插入图片  res.info为服务器返回的图片地址
			        quill.insertEmbed(length, 'image', res.data)
			        // 调整光标到最后
			        quill.setSelection(length + 1)
			    } else {
			        this.$message.error('图片插入失败')
			    }
				this.loading.close()
				
			},
			uploadError (res, file) {
				if (this.loading) {
					this.loading.close()
				}
			    this.$message.error('图片插入失败')
			},
			//视频点击事件
			videoHandler(state) {
				this.addRange = this.$refs.myQuillEditor.quill.getSelection()
				if (state) {
				  let fileInput = document.getElementById('imgInput')
				  fileInput.click() // 加一个触发事件
				}
				this.uploadType = 'video'
			}
		},
		watch : {
			value (n) {
				this.content = n;
			}
		}
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
<style scoped>
	.ql-editor {
		height: 400px;
	}
</style>