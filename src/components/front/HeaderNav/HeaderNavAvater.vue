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
        <DropdownMenu slot="list">
            <div v-if="isLogin">
                <DropdownItem name="mine">我的</DropdownItem>
                <DropdownItem
                    v-if="isAdmin"
                    name="admin"
                >管理员系统</DropdownItem>
                <DropdownItem
                    name="logout"
                >退出</DropdownItem>
            </div>
            <div v-else>
                <DropdownItem name="login">登录</DropdownItem>
            </div>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    name: 'HeaderNavAvater',
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
