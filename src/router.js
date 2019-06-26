import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    base : process.env.NODE_ENV == 'development' ? './' : '/factory/',
    mode : 'hash',
    routes : [
        {
            path : '/',
			component : () => import('./views/Login'),
        },{
            path : '/index',
            component : () => import('./views/Layout'),
            children : [
                {
                    path : '',
                    component : () => import('./views/Home')
                },{//配送员设置
					path : 'distributor-setting',
					component : () => import('./views/setting/DistributorSetting'),
				},{//发布商品
					path : 'product-submit',
					component : () => import('./views/product/ProductSubmit'),
				},{//已发布商品
					path : 'product-data',
					component : () => import('./views/product/ProductData'),
				},{//商品详情
					path : 'product-detail/:id',
					component : () => import('./views/product/ProductDetail'),
				},{//快递设置
					path : 'express-setting',
					component : () => import('./views/product/Express'),
				},{//商品规格属性管理
					path : 'product-attr-setting',
					component : () => import('./views/product/ProductAttrSetting'),
				},{//订单数据
					path : 'order',
					component : () => import('./views/order/Index'),
				},{//订单数据导出
					path : 'order-export',
					component : () => import('./views/order/OrderExport'),
				},{//订单详情
					path : 'order-detail/:id?',
					component : () => import('./views/order/Detail'),
				},{//交易流水
					path : 'trade-data',
					component : () => import('./views/finance/TradeData'),
				},{//运费流水
					path : 'express-data',
					component :  () => import('./views/finance/ExpressData'),
				},{//结算记录
					path : 'settlement-record',
					component : () => import('./views/finance/SettlementRecord'),
				},{//财务记录导出
					path : 'finance-data-export',
					component : () => import('./views/finance/FinanceDataExport'),
				},{//修改登录密码
					path : 'reset-pwd',
					component : () => import('./views/ResetPwd'),
				}
            ]
        },{
			path : '/404',
			component : () => import('./views/404'),
		},{
			path : '*',
			redirect : '/404'
		}
    ]
})


export default router;