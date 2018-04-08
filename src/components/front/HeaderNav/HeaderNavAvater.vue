<template>
    <Dropdown class="et-header-avater">
        <Badge>
            <Avatar
                :src="require('@/assets/img/avater-male.jpg')"
                size="large"
            />
        </Badge>
        <DropdownMenu slot="list">
            <DropdownItem>我的</DropdownItem>
            <DropdownItem>退出</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    name: 'HeaderNavAvater',
}
</script>

<style lang="scss">
.et-header-avater {
  color: $whiteColor;
  cursor: pointer;
}
</style>
