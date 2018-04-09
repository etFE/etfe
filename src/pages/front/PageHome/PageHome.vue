<template>
    <div class="et-home-container">
        <home-background />
        <h1>ETFE</h1>
        <div class="et-home-search">
            <Select
                :remote-method="remoteMethod"
                :loading="isLoading"
                filterable
                remote
                placeholder="搜索组件..."
                @on-change="onSearchChange"
            >
                <Option
                    v-for="(option, index) in options"
                    :value="option.value"
                    :key="index"
                >
                    {{ option.label }}
                </Option>
            </Select>
        </div>
    </div>
</template>

<script>
import HomeBackground from './HomeBackground'

export default {
    name: 'PageHome',
    components: {
        HomeBackground,
    },
    data () {
        return {
            isLoading: false,
            options: [],
            pluginsList: [],
        }
    },
    methods: {
        remoteMethod (query) {
            if (query) {
                if (this.pluginsList.length > 0) {
                    this.filterOptions(this.pluginsList, query)
                } else {
                    this.isLoading = true
                    this.$store.dispatch('front/plugins/GET_LIST').then(() => {
                        this.isLoading = false
                        this.pluginsList = this.$store.state.front.plugins.pluginsList
                        this.filterOptions(this.pluginsList, query)
                    })
                }
            } else {
                this.options = []
            }
        },
        filterOptions (data, query) {
            const options = data.map(item => ({
                value: item.id,
                label: item.text,
            }))

            this.options = options.filter(item => (
                item.label.toLowerCase().replace(/\s/g, '')
                .indexOf(query.toLowerCase().replace(/\s/g, '')) > -1
            ))
        },
        onSearchChange (value) {
            this.$router.push({ path: `/plugins/${value}` })
        },
    },
}
</script>

<style lang="scss">
.et-home-container {
    box-sizing: border-box;
    margin-top: 0;
    padding-top: 120px;

    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 60px;
    z-index: 0;
    overflow: hidden;
    background-color: rgb(135, 135, 135);

    h1 {
        position: relative;
        font-size: 70px;
        text-align: center;
        font-weight: 400;
        color: #fff;
        z-index: 10;
    }
    // &:before {
    //     content: "";
    //     position: absolute;
    //     top: 0;
    //     bottom: 0;
    //     left: 0;
    //     right: 0;
    //     // @include filterBlur;
    //     // opacity: 0.5;
    //     margin: -10px;
    //     background: inherit;
    //     z-index: -1;
    // }
}
.et-home-search {
    position: relative;
    z-index: 10;
    width: 300px;
    margin: 30px auto;
}
</style>
