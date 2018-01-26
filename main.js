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
})