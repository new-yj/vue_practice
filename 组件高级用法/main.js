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