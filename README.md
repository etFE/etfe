# fe-website and fe-admin

> show demo and api of plugins, and something more, by et-fe-team

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 风格约定 ##

### 组件名**多个单词**组成 ###
### props的定义 ###

```javascript
props: {
  status: String
}

// 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### 组件样式设置**作用域** ###

### 组件文件名使用 **大驼峰** ###

### 基础组件名 使用特定前缀 **`Base` `App` `V`** ###

### 单例组件，一个页面只出现一次，应该 **`The`** 为前缀，来表示唯一性 ###

### 紧密耦合 父子组件名，子组件只在父组件下有意义时 ###

```javascript
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

### 在单文件组件中 组件标签应该使用**自闭合** ###

### 组件名 使用**完整单词** ###

### prop名 ，js中应该是camelCase ，html中 kabab-case ###

### 多特性元素 要换行 ###
