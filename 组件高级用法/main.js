Vue.component('recursion-c', {
    name: 'recursion-c',
    props: {
        count: {
            type: Number,
            default: 1
        }
    },
    template: '\
        <div class="child">\
            recursion\
            <recursion-c :count="count+1" v-if="count<3"></recursion-c>\
        </div>'
});

var recursion = new Vue({
    el: '#recursion'
});

// 内联模板
Vue.component('inline-c', {
    data: function () {
        return {
            msg: '在子组件中的数据'
        }
    }
});

var inline = new Vue({
    el: '#inline',
    data: {
        message: '在父组件中的数据'
    }
});

// component组件
var componentc = new Vue({
    el: '#componentc',
    components: {
        comA: {
            template: '<div>组件A</div>'
        },
        comB: {
            template: '<div>组件B</div>'
        },
        comC: {
            template: '<div>组件C</div>'
        }
    },
    data: {
        currentView: 'comA'
    },
    methods: {
        handleChangeView: function (component) {
            this.currentView = 'com' + component;
        }
    }
});

// $nextTick
var nextTick = new Vue({
    el: '#nextTick',
    data: {
        showDiv: false
    },
    methods: {
        getText: function () {
            this.showDiv = true;
            this.$nextTick(function () {
                var text = document.getElementById('div').innerText;
                console.log(text);
            });
        }
    }
});

// x-template
Vue.component('template-x', {
    template: '#template-x'
});

var templatex = new Vue({
    el: '#xtemplate'
});

// 手动挂载实例
var MyComponent = Vue.extend({
    template: '<div>Hello: {{name}}</div>',
    data: function () {
        return {
            name: 'yj'
        }
    }
});
// new MyComponent().$mount('#mount-div');

// new MyComponent({
//     el: '#mount-div'
// })

var component = new MyComponent().$mount();
document.getElementById('mount-div').appendChild(component.$el);
