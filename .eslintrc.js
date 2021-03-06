// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/recommended', 'airbnb-base'],
    // required to lint *.vue files
    plugins: [
        'vue',
        // 'vuefix',
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never'
        }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: ['test/unit/index.js']
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // cutomize
        // 使用分号
        'semi': ['error', 'never'],
        // 函数括号空格
        'space-before-function-paren': ['error', 'always'],
        // log
        'no-console': ['error', { allow: ['log'] }],

        // pram
        'no-param-reassign': ['error', { 'props': false }],

        // 换行
        "linebreak-style": ['error', 'windows'],

        // 缩进
        'indent': 'off',
        'vue/script-indent': ['error', 4 ],
        'vue/html-indent': ['error', 4 ],
        'no-unused-vars':[0],
        'no-underscore-dangle':0
        // 'vuefix/vuefix': ['error', {'auto': true}]
    }
}
