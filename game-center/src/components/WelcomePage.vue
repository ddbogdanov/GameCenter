<template>
  <div class="welcome">
    <h1 id="welcome-text">WELCOME</h1>

    <form @submit.prevent="connect()" class="login-form">

      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"/>
        </span>
        <p-input-text id="username"
                      type="text"
                      placeholder="Username"
                      v-model="username"
        ></p-input-text>
        <p-button icon="pi pi-arrow-right" 
                  severity="primary"
                  type="submit"
        ></p-button>
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socket } from "@/socket";

export default defineComponent({
  name: 'WelcomePage',
  computed: {

  },
  methods: {
    connect() {
      if(!this.username) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Username is required' })
        return
      }

      socket.auth = {
        username: this.username
      }
      socket.connect()
    },
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

  // background-color: #f77f71;
  background-color: #f57566;
  // background-color: var(--cyan-500);
}
.login-form {
  width: 350px;
}
#welcome-text {
  font-size: 6rem;
  //color: #6dfdb1
  color: #84ffbd;
  // color: var(--primary-300)
}

</style>
