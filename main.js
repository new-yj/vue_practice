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

// 自定义事件
Vue.component('custom-event', {
	template: '\
		<div>\
			<button @click="handleIncrease">+1</button>\
			<button @click="handleReduce">-1</button>\
		</div>\
	',
	data: function () {
		return {
			counter: 0
		}
	},
	methods: {
		handleIncrease: function () {
			this.counter++;
			this.$emit('increase', this.counter);
		},
		handleReduce: function () {
			this.counter--;
			this.$emit('reduce', this.counter);
		}
	}
});

var custom_event = new Vue({
	el: '#custom_event',
	data: {
		total: 0
	},
	methods: {
		handleGetTotal: function (total) {
			this.total = total;
		}
	}
});

// 双向绑定的v-model组件
Vue.component('dbl-vmodel', {
	props: ['value'],
	template: '<input :value="value" @input="updateValue" type="number" />',
	methods: {
		updateValue: function (event) {
			this.$emit('input', event.target.value);
		}
	}
});

var dvmodel = new Vue({
	el: '#dvmodel',
	data: {
		total: 0
	},
	methods: {
		handleReduce: function () {
			this.total--;
		}
	}
});

// bus实现组件间通信
var bus = new Vue();
Vue.component('bus-connect', {
	template: '<button @click="handleEvent">传递事件</button>',
	methods: {
		handleEvent: function () {
			bus.$emit('on-message', '来自组件bus-connect的内容');
		}
	}
});

var busc = new Vue({
	el: '#busc',
	data: {
		message: ''
	},
	mounted: function () {
		var _this = this;
		bus.$on('on-message', function (msg) {
			_this.message = msg;
		});
	}
});

// $parent
Vue.component('parent-c',{
	template: '<button @click="handleEvent">通过父链直接修改数据</button>',
	methods: {
		handleEvent: function () {
			this.$parent.message = '来自组件parent-c的内容';
		}
	}
});

var parnet = new Vue({
	el: '#parent',
	data: {
		message: ''
	}
});

// $ref
Vue.component('ref-c', {
	template: '<div>子组件</div>',
	data: function () {
		return {
			message: '子组件内容'
		}
	}
});

var ref = new Vue({
	el: '#ref',
	methods: {
		handleRef: function () {
			// 通过$refs来访问指定的实例
			var msg = this.$refs.com.message;
			console.log(msg);
		}
	}
});

// slot
Vue.component('slot-c', {
	template: '\
		<div>\
			<slot>\
				<p>如果父组件没有插入内容，我便作为默认内容出现</p>\
			</slot>\
		</div>'
});

var slot = new Vue({
	el: '#slot'
})

// name slot
Vue.component('name-slot', {
	template: '\
		<div class="container">\
			<div class="header">\
				<slot name="header"></slot>\
			</div>\
			<div class="main">\
				<slot></slot>\
			</div>\
			<div class="footer">\
				<slot name="footer"></slot>\
			</div>\
		</div>',
	mounted: function () {
		var header = this.$slots.header;
		var main = this.$slots.default;
		var footer = this.$slots.footer;
		console.log('header ' + header);
		console.log('main ' + main);
		console.log('footer ' + footer);
		console.log(footer[0].elm.innerHTML);
	}
});

var nameSlot = new Vue({
	el: '#nameSlot'
});

// listSlot
Vue.component('list-slot', {
	props: {
		books: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	template: '\
		<ul>\
			<slot name="book" v-for="book in books"\
				:book-name="book.name">\
				// 这里可以写默认内容\
			</slot>\
		</ul>'
});

var listSlot = new Vue({
	el: '#listSlot',
	data: {
		books: [
			{ name: '《Vue.js 实战》' },
			{ name: '《Javascript 语言精粹》'},
			{ name: '《Javascript 高级程序设计》'}
		]
	}
});