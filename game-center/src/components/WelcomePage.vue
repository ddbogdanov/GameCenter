<template>
  <div class="welcome">
    <h1 id="welcome-text">WELCOME</h1>

    <el-form ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            @submit.prevent
    >
      <el-form-item prop="username"
                    style="width: 380px;"
      >
        <el-input v-model="loginForm.username" 
                  size="large" 
                  placeholder="Username" 
                  :prefix-icon="User"
                  clearable
                  @keyup.enter="connect()"
        >
          <template #append>
            <el-button :icon="ArrowRight" 
                        type="primary"
                        @click="connect()"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket, state } from "@/socket";
import { FormInstance, FormRules } from 'element-plus';

export default defineComponent({
  name: 'WelcomePage',
  computed: {
    connected() {
      return state.connected
    }
  },
  methods: {
    connect() {
      (this.$refs.loginFormRef as FormInstance).validate((isValid) => {
        if(!isValid) {
          return false
        }

        console.info(`Logging in with username: ${this.loginForm.username}`)
        socket.auth = {
          username: this.loginForm.username
        }
        socket.connect()
      })
    },
  },
  data() {
    return {
      loginForm: {
        username: '',
      },
    }
  },
  created() {
    const sessionID = sessionStorage.getItem("gameCenterSessionID")
    const sessionUsername = sessionStorage.getItem("gameCenterSessionUsername")
    if(sessionID && sessionUsername) {
      this.loginForm.username = sessionUsername
      socket.auth = {
        sessionID: sessionID
      }
      socket.connect()
    }
  }
});
</script>

<script lang="ts" setup>
  import { User, ArrowRight } from '@element-plus/icons-vue'
  import { reactive } from 'vue';

  const loginFormRules: FormRules = {
    username: [{ 
      required: true, 
      message: 'Username is required',
      trigger: ['blur', 'change']
    }]
  }
</script>

<style scoped lang="scss">

.welcome {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: dosis;

  background-color: #f77f71;
}

#welcome-text {
  font-size: 6rem;
  color: #89ffc0
}

</style>
