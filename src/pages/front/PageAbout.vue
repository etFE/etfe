<template>
    <div class="et-about-container">
        <h1>关于ET组件文档，与技术分享</h1>
        <h2>公共仓库</h2>
        <p
            v-for="repository in repositories"
            :key="repository.name">
            {{ repository.name }}：
            <Icon
                size="20"
                type="social-github"/>
            <a
                :href="repository.github"
                target="_blank"
            >{{ repository.github }}</a>
        </p>
        <h2>团队成员</h2>
        <ul class="et-team-member-container">
            <li
                v-for="msg in teamMsg"
                :key="msg.name"
                class="et-team-member-list"
            >
                <div class="et-member-avatar">
                    <Avatar
                        :src="msg.avatar"
                        :icon="msg.avatar ? '' : 'person'"
                        :style="{width: '70px', height: '70px', borderRadius: '50%'}"
                        size="large"
                    />
                </div>
                <div class="et-member-profile">
                    <h3>{{ msg.name }}</h3>
                    <p>{{ msg.description }}</p>
                    <dl class="et-member-profile-dl">
                        <dt v-if="msg.location">
                            <Icon
                                style="{marginTop: '1px'}"
                                size="20"
                                type="location"
                            />
                        </dt>
                        <dd v-if="msg.location">{{ msg.location }}</dd>

                        <dt v-if="msg.stack">
                            <Icon
                                size="18"
                                type="pricetags"
                            />
                        </dt>
                        <dd v-if="msg.stack">{{ msg.stack }}</dd>

                        <dt v-if="msg.github">
                            <Icon
                                size="20"
                                type="social-github"/>
                        </dt>
                        <dd v-if="msg.github">
                            <a
                                :href="msg.github"
                                target="_blank"
                            >{{ msg.github }}</a>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import katteAvater from '../../assets/img/team-avaters/katte-avater.jpg'
import ClAvater from '../../assets/img/team-avaters/cl-avater.jpg'
import SimonAvater from '../../assets/img/team-avaters/simon-avater.jpg'

const repositories = [
    { name: '组件仓库', github: 'https://github.com/etFE/Plugins' },
    { name: 'etfe仓库', github: 'https://github.com/etFE/etfe' },
    { name: 'node接口管理仓库', github: 'https://github.com/etFE/fe-manage-api' },
]
const teamMsg = [
    {
        name: 'Katte',
        avatar: katteAvater,
        description: 'Restify for Restful Api, Front-End, mongodb',
        location: 'Harbin,China',
        stack: 'Node.js',
        github: 'https://github.com/17603606331',
    },
    {
        name: 'Cl',
        avatar: ClAvater,
        description: 'Vue for Admin website',
        location: 'Wuhan,China',
        stack: 'Vue',
        github: 'https://github.com/dumuchenglin123',
    },
    {
        name: 'Simon',
        avatar: SimonAvater,
        description: 'Vue for Front website',
        location: 'Zhejiang,China',
        stack: 'React',
        github: 'https://github.com/simonjayw',
    },
]

export default {
    name: 'PageAbout',
    data () {
        return {
            teamMsg,
            repositories,
        }
    },
}
</script>

<style lang="scss">
.et-about-container {
  color: $blackColor;
  padding: 20px 200px;
  box-sizing: border-box;

  h1 {
    font-size: 26px;
    font-weight: 400;
    margin: 12px 0;
    text-align: center;
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
    margin: 12px 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
  }

  & > p {
    font-size: 14px;
    padding-left: 10px;
  }

  a {
    color: $blackColor;

    &:hover {
      color: $themeColor;
    }
  }
}

.et-team-member-container {
  padding-left: 10px;
}
.et-team-member-list {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid $borderColor;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  .et-member-avatar {
    width: 100px;
    padding: 0 15px;
  }
  .et-member-profile {
    flex: 1;

    h3 {
      font-size: 18px;
    }

    p {
      margin-bottom: 5px;
    }

    dl {
      dt {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        text-align: center;
      }
      dd {
        display: inline;
        vertical-align: middle;

        &:after {
          content: "";
          display: block;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
