<template>
    <Dropdown
        class="et-header-avater"
        @on-click="handleClickItem"
    >
        <Badge>
            <Avatar
                v-if="isLogin"
                :src="user.avatar || require('../../../assets/img/avater-male.jpg')"
                size="large"
            />
            <Avatar
                v-else
                icon="person"
                size="large"
            />
        </Badge>
        <DropdownMenu slot="list">
            <div v-if="isLogin">
                <DropdownItem name="nick" >{{ user.nick }}</DropdownItem>
                <DropdownItem
                    v-if="isAdmin"
                    name="admin"
                >管理员系统</DropdownItem>
                <DropdownItem name="logout">退出</DropdownItem>
            </div>
            <div v-else>
                <DropdownItem
                    name="login"
                >登录</DropdownItem>
            </div>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    name: 'NavAvater',
    data () {
        return {
            isAdmin: true,
        }
    },
    computed: {
        isLogin () {
            return this.$store.state.global.isLogin
        },
        user () {
            return this.$store.state.global.user
        },
    },
    methods: {
        handleClickItem (name) {
            switch (name) {
            case 'login':
                this.$store.commit('front/home/SHOW_LOGIN')
                break
            case 'logout':
                this.$store.commit('global/LOG_OUT')
                this.$store.commit('front/home/SHOW_LOGIN')
                break
            case 'admin':
                this.$router.replace('/admin')
                break
            default:
                break
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
