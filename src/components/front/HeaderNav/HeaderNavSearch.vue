<template>
    <div class="et-headernav-search">
        <Select
            ref="searchSelect"
            :remote-method="remoteMethod"
            :loading="isLoading"
            filterable
            clearable
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
</template>

<script>
export default {
    name: 'NavSearch',
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
            if (value) {
                this.$router.push({ path: `/plugins/${value}` })
                this.$refs.searchSelect.clearSingleSelect()
                this.filterOptions(this.pluginsList, '')
            }
        },
    },
}
</script>

<style lang="scss">
.et-headernav-search {
    margin-left: 80px;

    .ivu-select-selection {
        border: 0;
    }
    .ivu-select-dropdown {
        z-index: 999;
    }
}
</style>
