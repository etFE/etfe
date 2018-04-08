<template>
    <Affix :offset-top="0">
        <div class="et-guidecatalogue-container">
            <h4>目录</h4>
            <ul>
                <li
                    v-for="item in catalogues"
                    :key="item.name"
                >
                    <a :href="`#${item.name}`">{{ item.title }}</a>
                    <ul v-if="item.second">
                        <li
                            v-for="secondItem in item.second"
                            :key="secondItem.name"
                        >
                            <a :href="`#${secondItem.name}`">{{ secondItem.title }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </Affix>
</template>

<script>
export default {
    name: 'GuideCatalogue',
    props: {
        catalogues: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="scss">
.et-guidecatalogue-container {
  border-left: 1px solid $borderColor;
  padding: 5px 10px;

  ul {
    list-style: none;

    li {
      margin: 3px 0;

      ul {
        margin-left: 6px;
      }
    }
  }

  a {
    color: $blackColor;
    opacity: 0.9;
  }
}
</style>
