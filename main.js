// created和mounted
var data_cm = { name: '晏军' };
var cm = new Vue({
	el: '#cm',
	data: data_cm,
	created: function () {
		console.log('created ' + this.name);
	},
	mounted: function () {
		console.log('mounted el: ' + this.$el);
	}
});

// 计时例子
function padDate(value) {
	return value < 10 ? '0' + value : value;
}
var interval = new Vue({
	el: '#interval',
	data: {
		time: new Date()
	},
	mounted: function () {
		var _this = this;
		this.timer = setInterval(function () {
			_this.time = new Date();
		}, 1000);
	},
	filters: {
		formatTime: function (value) {
			var date = new Date(value);
			var year = date.getFullYear();
			var month = padDate(date.getMonth() + 1);
			var day = padDate(date.getDate());
			var hours = padDate(date.getHours());
			var minutes = padDate(date.getMinutes());
			var seconds = padDate(date.getSeconds());
			return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
		}
	},
	// 销毁之前
	beforeDestroy: function () {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}
});

// 元素复用
var re = new Vue({
	el: '#re',
	data: {
		type: 'name'
	},
	methods: {
		handleToggleClick: function () {
			this.type = this.type === 'name' ? 'mail' : 'name';
		}
	}
});

// for
var vfor = new Vue({
	el: '#vfor',
	data: {
		user: {
			name: 'yj',
			gender: 'male',
			age: 24
		}
	}
});

// filter
var filter = new Vue({
	el: '#filter',
	data: {
		books: [
			{ name: '《Vue.js 实战》' },
			{ name: '《Javascript 语言精粹》'},
			{ name: '《Javascript 高级程序设计》'}
		]
	},
	computed: {
		filterBooks: function () {
			return this.books.filter(function (book) {
				return book.name.match(/Javascript/);
			})
		}
	}
});

// event
var event = new Vue({
	el: '#event',
	methods: {
		handleClick: function (message, event) {
			event.preventDefault();
			window.alert(message);
		},
		onClick: function () {
			window.alert('prevent');
		},
		keyup: function (keyName) {
			window.alert(keyName);
		}
	}
});

// 局部组件
var localc = new Vue({
	el: '#localc',
	components: {
		'my-component': {
			template: '<h3>局部注册组件</h3>'
		}
	}
});

// 全局组件
Vue.component('my-count', {
	template: '<button @click="counter++">{{counter}}</button>',
	data: function () {
		return {counter: 0}
	}
});

var globalc = new Vue({
	el: '#globalc'
});

// 字符串数组props
Vue.component('my-strarrprops', {
	props: ['warningText', 'message'],		//驼峰式命名在DOM模板中使用时要改为短横分隔命名
	template: '<div><h3>{{warningText}}</h3><div>{{message}}</div></div>'
});

var strarrprops = new Vue({
	el: '#strarrprops',
	data: {
		parentMessage: ''
	}
});

//对象props
Vue.component('my-objprops', {
	props: {
		//必须是数字类型
		propnum: Number,
		// 必须是字符串或数字类型
		proparr: [String, Number],
		// 布尔值，如果没有定义则默认值为true
		propboolean: {
			type: Boolean,
			default: true
		},
		// 数字值，必须有值
		propnumr: {
			type: Number,
			required: true
		},
		// 数组或对象的默认值必须由一个函数来返回
		proparrd: {
			type: Array,
			default: function () {
				return [];
			}
		},
		// 一个验证函数
		propfunc: {
			validator: function (value) {
				return value > 10;
			}
		}
		// String Number Boolean Object Array Function
	},
	template: '<h3>{{propnumr}}</h3>'
});

var objprops = new Vue({
	el: '#objprops',
	data: {
		value: 10
	}
});

