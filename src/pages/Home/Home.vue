<template>
  <div>
		<Menu />
		<div class="mui-content" style="padding-bottom: 50px;overflow: auto">
			<header id="header" class="mui-bar mui-bar-transparent" :style="{'background-color': 'rgba(30, 153, 213, '+alpha+')'}">
				<h1 class="mui-title" :style="{'color': 'rgba(255, 255, 255, '+alpha+')'}">{{APP_NAME}}</h1>
			</header>
			<!--轮播图-->
			<swiper :options="swiperOption">
        <swiper-slide  v-for="(banner,idx) in banners" :key="banner">
					<a href="#" :index="idx">
						<img :src="banner" style="width: 100%">
					</a>
				</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
			<!--轮播图-->

			<!--公告区域-->
			<div class="news">
				<span class="newsfrom">
					<i class="iconfont icon-xiaoxi2" style="font-size: 0.325rem"></i> 公告
				</span>
				<marquee class="newslist" direction="up" scrollamount="1">
					<ul style="margin-top: -1px;">
						<li v-for="notice in notices">
							<a href="#">{{notice.title}}</a>
						</li>
					</ul>
				</marquee>
      	<div href="#" class="morenews">
					<p>更多</p>
				</div>
    </div>

			<!--公告区域-->
			

			<!--常见业务分类(仅显示7个)，多于7个隐藏起来-->
			<div id="qianggou" style="margin-top: 0px;">
				<ul class="mui-table-view mui-grid-view">
					<li v-for="cata in catas" class="mui-table-view-cell mui-col-xs-3 mui-col-sm-3 iconlist clip"
						@click="jmpToCatas(cata.cata_id)" style="font-size:0.21875rem;">
						<img :src="cata.logo" style="width: 40px;height:40px">
						<div style="margin-top: 10px;">{{cata.title}}</div>
					</li>
				</ul>
			</div>
			<!--广告活动-->
			<div class="adv">
				<a :href="adv.href" :target="adv.href !== '#' && '_blank'">
					<img :src="adv.pic" :title="adv.alt"/> 
				</a>
			</div>
			<!--广告区域-->

			<!--日销量最佳-->
			<div class="block" style="background:#fff">
				<div class="header" style="line-height:0.7rem">
					<span class="mui-icon iconfont icon-msnui-bar-chart" style="font-size:0.325rem"></span>
					<span class="mui-tab-label">热门推荐</span>
					<router-link to="/hotgoods" class="fright">更多>></router-link>
				</div>
			</div>

			<!--商品列表-->
			<div id="goodsList" class="mui-table-view mui-grid-view own-gray-color" style="background:#efeff4">
				<li v-for="item in top5Goods" @click="buyGoods(item.goods_id)" class="mui-table-view-cell mui-media mui-col-xs-6">
					<div class= "bgDiv">
						<img class="mui-media-object" :src="item.logo" onerror="//cdn.520cy.cn/images/pic-null.png"/>
						<div class="mui-media-body">
							<p class="mui-ellipsis-2">{{item.title}}</p>
							<div class="price">
								<!--<i class="mui-icon iconfont icon-msg6 rmb"> {{item.min_rmb}}</i>-->
								<i class="mui-icon iconfont icon-iconfont-copy points"> {{item.min_points}}</i>
							</div>
						</div>
					</div>
				</li>
			</div>

		</div>
  </div>
</template>

<script>
import $ from 'axios';
import {mapState, mapActions} from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import pic from '@/assets/logo.png';
import Menu from '@/pages/Index';

import {guest as GUEST_API} from '@/config/serverApi';

export default {
  name: 'hello',
	components: {
		Menu,
		swiper,
		swiperSlide
	},
  data () {
    return {
			alpha: 0,
			swiperOption: {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			},
			banners: [
				'//ugc.qpic.cn/gbar_pic/2wF3sr2LiaVtbNbyPvU0dibZMCupZT7yWF5ILxibBNTDrzWxtpI5qr3dg/',
				'//ugc.qpic.cn/gbar_pic/2wF3sr2LiaVtbNbyPvU0dibQ47hialzfrw124ZwZwzZnFZqcNCP2QhkibA/'
			]
    }
  },
	computed: {
		...mapState({
			catas: state => state.goods_cata,
			adv: state => state.adv,
			top5Goods: state => state.home_page_goods,
			notices: state => state.notices
		})
	},
	mounted() {
		const MAX_SCROLL_HEIGHT = 44;
		document.addEventListener("scroll", () => {
		let th = (document.body.scrollTop || window.scrollY) / 5;
			this.alpha = th / MAX_SCROLL_HEIGHT;
		});

		// 获取分类数据和首页其它数据
		this.getGoodsCata()
			.then(r => {
				console.log('获取分类成功！');
			})
			.catch(err => {
				this.$tip.show('获取分类数据失败！');
			});

		this.getHomePageData()
			.catch(err => {
				this.$tip.show('获取首页数据失败！');
			});
	},
	methods: {
		...mapActions(['getGoodsCata', 'getHomePageData']),
		jmpToCatas(id) {
			this.$router.push('/cata/' + id);
		},
		buyGoods(id) {
			this.$router.push('/goods/' + id);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('swiper/dist/css/swiper.min.css');
.mui-bar-transparent {
	padding: 0;
	margin: 0;
}

/*列表样式*/
.mui-table-view:after {
		height: 0px;
	}
	/*图片显示的时候设置为自动 因为 从服务器来的图片大小相同*/
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
		line-height: auto;
		max-width: auto;
		height: auto;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}
	
	.mui-table-view-cell {
		margin-bottom: 10px;
	}
	
	.bgDiv {
		// border: 1px solid rgba(204, 204, 204, 0.7);
		border-radius: 5px;
		padding-bottom: 5px;
		background-color: white;
		width: 100%;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		margin-top: 2px;
		margin-bottom: 5px;
		height: auto;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p {
		white-space: pre;
		color: black;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p.mui-ellipsis-2 {
		height: 30px;
		line-height: 30px;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body .price-one {
		margin-top: 12px;
		float: left;
		font-size: 1.1em;
		margin-left: 7%;
		color: red;
		margin-bottom: 10px;
	}
	
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body .price-two {
		margin-top: 12px;
		float: right;
		font-size: 1.1em;
		margin-right: 7%;
	}


/*去mui掉顶边和底部边框*/
.mui-table-view:after {
	height: 0px;
}
.mui-table-view:before {
	height: 0px;
} 

body {
	background-color: #EFEFF4;
}


.adv {
	padding: 10px 0;
}
.adv img{
	width: 100%;
	height: 100px;
}

.news {
    width: 95%;
    height: 0.825rem;
    border-radius: 0.625rem;
		margin: 0.15625rem auto;
		padding: 0px 0.1875rem;
    background: #fff;
		display: table;
}
.newsfrom {
	display: table-cell;
	vertical-align: middle;
  text-align: center;
	width: 1.5rem;
	color: #f00;
	font-size: 0.328125rem;
}
.newsdes {
    font-size: 0.328125rem;
    padding: 0 0.1875rem;
    color: #f47979;
}

.newslist {
    flex-grow: 1;
    overflow: auto;
    font-size: 0.28125rem;
    align-self: flex-start;
    height: 0.825rem;
}
.newslist marquee {
	overflow: hidden;
}

.newslist ul li {
    height: 20px;
    line-height: 20px;
		list-style: none;
}

.newslist ul li a {
    color: #656565;
}

.morenews {
	display: table-cell;
	font-size: 0.28125rem;
	color: #040404;
	width: 1rem;
	vertical-align: middle;
  text-align: center;
}

.block {
	font-size: 0.28rem;
}
.block .header {
	padding: 5px;
}
.block .content {
	width: 100%;
	background: #fff;
	min-height: 20px;
}

.goodlist>li {
	min-height: 60px;
	padding: 12px 6px;
	border-bottom: 1px solid #dbdbdb;
	position: relative;
	list-style: none;
}
.goodlist>li .list-item {
	display: -webkit-box;
}
.goodlist>li .p {
	  display: inline-block;
    text-align: center;
    overflow: hidden;
		width: 75px;
    height: 75px;
    margin-right: 10px;
    margin-left: 8px;
}
.goodlist>li .d {
	margin: 4px 15px 6px 0;
	-webkit-box-flex: 1;
}
.goodlist .d .d-title {
	  line-height: 22px;
    margin-bottom: 3px;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    color: #ea5959;
		font-size: 0.382rem;
}
.mui-card {
	margin: 0;
	padding: 5px;
}
.mui-card-content {
	padding: 5px;
	text-align: center;
}

.charm-ranklist img {
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
}
.mui-card-footer {
	font-size: 0.21875rem;
}

.goods-list .price {
	display: flex;
	justify-content: space-around;
}
.goods-list .price i {
	font-weight: 300;
  line-height: 0.7rem;
  font-size: 0.4rem;
}

</style>
