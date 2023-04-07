<template>
  <div class="welcome">
    <h1 id="welcome-text">WELCOME</h1>
    <div>
      <el-input v-model="username" 
                size="large" 
                placeholder="Username" 
                :prefix-icon="User"
      >
        <template #append>
          <el-button :icon="ArrowRight" 
                      type="primary"
                      @click="connect()"
          ></el-button>
        </template>
      </el-input>
    </div>
    <el-button type="danger" @click="disconnect" style="margin-top:10px;">Disconnect</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket, state } from "@/socket";

export default defineComponent({
  name: 'WelcomePage',
  computed: {
    connected() {
      return state.connected
    }
  },
  methods: {
    connect() {
      console.info(`Logging in with username: ${this.username}`)
      socket.auth = {
        username: this.username
      }
      socket.connect()
    },
    disconnect() {
      socket.disconnect()
    }
  },
  data() {
    return {
      username: ''
    }
  },
  created() {
    const sessionID = sessionStorage.getItem("gameCenterSessionID")
    const sessionUsername = sessionStorage.getItem("gameCenterSessionUsername")
    if(sessionID && sessionUsername) {
      this.username = sessionUsername
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
