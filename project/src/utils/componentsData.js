/*
 * 注：
 * 1.component属性：
 * 是组件文件的name的中间字母
 * 如dragBanner，component就是banner
 * 组件全局注册的时候直接使用组件的name属性进行注册
 * 组件使用的时候，动态组件的is属性会根据这个值动态拼接成drag-banner
 * 注意如果是多个单词，用“ - ”进行连接
 *
 * 2.options.data中每项的key：
 * 这个值很重要，是组件内v-for循环的key
 * 在编辑的地方用了draggable组件，使得data是可以随意排序的，因此不可使用下标作为key值
 * 目前使用的是当前时间的时间戳作为唯一值
 *
 */
export default [
  {
    name: 'banner',
    icon: 'el-icon-picture-outline',
    component: 'banner',
    type: 1,
    options: {
      title: '',
      verticalPadding: 0,
      horizontalPadding: 0,
      bgColor: '',
      data: [
        { url: '', link: '', key: `${new Date().getTime()}-1` },
        { url: '', link: '', key: `${new Date().getTime()}-2` }
      ]
    }
  },
  {
    name: '导航栏',
    icon: 'el-icon-menu',
    component: 'nav-bar',
    type: 2,
    options: {
      title: '',
      verticalPadding: 10,
      horizontalPadding: 0,
      borderRadius: 30,
      bgColor: '',
      data: [
        { url: '', link: '', name: '', key: `${new Date().getTime()}-1` },
        { url: '', link: '', name: '', key: `${new Date().getTime()}-2` },
        { url: '', link: '', name: '', key: `${new Date().getTime()}-3` }
      ],
      counts: 5
    }
  },
  {
    name: '服务页',
    icon: 'el-icon-service',
    type: 3,
    component: 'vip-service',
    options: {
      title: '',
      verticalPadding: 0,
      horizontalPadding: 0,
      bgColor: '',
      data: {
        noVipUrl: '',
        noVipLink: '',
        vipUrl: '',
        vipLink: ''
      }
    }
  },
  {
    name: '商品',
    icon: 'el-icon-goods',
    type: 4,
    component: 'goods-list',
    options: {
      title: '',
      verticalPadding: 10,
      horizontalPadding: 0,
      bgColor: '',
      // 1：列表平铺， 2：横向滚动
      showType: 1,
      // 每行数量，1,2,3
      rowCounts: 3,
      data: [
        { name: '', url: '', link: '', price: '', originalPrice: '', sellingPoint: '', moneyType: 1, key: `${new Date().getTime()}-1` },
        { name: '', url: '', link: '', price: '', originalPrice: '', sellingPoint: '', moneyType: 1, key: `${new Date().getTime()}-2` },
        { name: '', url: '', link: '', price: '', originalPrice: '', sellingPoint: '', moneyType: 1, key: `${new Date().getTime()}-3` }
      ]
    }
  },
  {
    name: '活动',
    icon: 'el-icon-date',
    type: 5,
    component: 'activity',
    options: {
      title: '',
      verticalPadding: 10,
      bgColor: '',
      // 排序（展示）方式：  1：自定义， 2：活动分类
      showType: 1,
      // 展示：true，隐藏：false
      showMyActivity: true,
      showCalendar: true,
      data: []
    }
  },
  {
    name: '浮窗',
    icon: 'el-icon-s-opportunity',
    type: 6,
    component: 'float',
    limit: 1,
    disabledDrag: true,
    options: {
      title: '',
      data: { url: '', link: '' }
    }
  },
  {
    name: '会员领取',
    icon: 'el-icon-user',
    type: 7,
    component: 'vip-card',
    options: {
      title: '',
      verticalPadding: 0,
      horizontalPadding: 0,
      bgColor: '',
      showCardNumber: true,
      data: {
        noVipUrl: '',
        noVipLink: '',
        vipUrl: '',
        vipLink: '',
        receiveTipsUrl: ''
      }
    }
  },
  {
    name: '图片',
    icon: 'el-icon-picture-outline-round',
    type: 8,
    component: 'image',
    options: {
      title: '',
      verticalPadding: 0,
      horizontalPadding: 0,
      bgColor: '',
      data: { url: '', link: '' }
    }
  }
]
