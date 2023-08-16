<template>
  <div class="welcome">
    <h1 id="welcome-text">WELCOME</h1>

    <form @submit.prevent="onConnect()" class="login-form">

      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"/>
        </span>
        <p-input-text id="username"
                      type="text"
                      placeholder="Username"
                      v-model="username"
        />
        <p-button icon="pi pi-chevron-right" 
                  severity="primary"
                  type="submit"
        />
      </div>

      <div class="loading" v-show="isLoading">
        <p-progress-bar mode="indeterminate" style="height: 6px"/>
        <p>Waiting for server to start... Try again if it doesn't work soon. It might take a while.</p>
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
    onConnect() {
      if(!this.username) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Username is required' })
        return
      }

      this.isLoading = true;

      socket.auth = {
        username: this.username
      }
      
      socket.connect()
      this.isLoading = false
    },
  },
  data() {
    return {
      username: '',
      isLoading: false,
    }
  },
  created() {
    const sessionID = sessionStorage.getItem("gameCenterSessionID")
    const sessionUsername = sessionStorage.getItem("gameCenterSessionUsername")
    if(sessionID && sessionUsername) {
      this.username = sessionUsername
      socket.auth = {
        username: this.username,
        sessionID: sessionID
      }
      socket.connect()
    }
  }
});
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
  background-color: #363636;
  // background-color: var(--cyan-500);
}
.login-form {
  width: 350px;
}

.loading {
  margin-top: 10px;

  p {
    margin: 5px 0px 5px 0px;
    color: #84ffbd;
    text-align: right;
  }
}

#welcome-text {
  font-size: 6rem;
  font-weight: 500;
  //color: #6dfdb1
  color: #84ffbd;
  // color: var(--primary-300)
}

</style>
