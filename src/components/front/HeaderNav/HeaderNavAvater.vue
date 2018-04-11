<template>
    <Dropdown
        class="et-header-avater"
        @on-click="handleClickItem"
    >
        <Badge>
            <Avatar
                icon="person"
                size="large"
            />
        </Badge>
        <DropdownMenu
            v-if="isLogin"
            slot="list"
        >
            <DropdownItem name="mine">我的</DropdownItem>
            <DropdownItem
                v-if="isAdmin"
                name="admin"
            >管理员系统</DropdownItem>
            <DropdownItem
                name="logout"
            >退出</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    name: 'NavAvater',
    data () {
        return {
            isLogin: false,
            isAdmin: false,
        }
    },
    methods: {
        handleClickItem (name) {
            if (name === 'login') {
                this.$router.push('/login')
            }
        },
    },
}
</script>

<style lang="scss">
.et-header-avater {
    cursor: pointer;
}
</style>
