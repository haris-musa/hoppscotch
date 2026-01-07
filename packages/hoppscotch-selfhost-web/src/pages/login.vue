<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-primary"
  >
    <div class="flex flex-col items-center text-center px-4">
      <img src="/logo.svg" alt="hoppscotch-logo" class="w-16 mb-6" />
      <h1 class="text-xl font-semibold text-secondaryDark mb-2">
        Sign in to continue
      </h1>
      <p class="text-secondaryLight text-sm mb-6">
        Access is restricted to authorized users
      </p>
      <HoppButtonPrimary
        :label="t('auth.login')"
        @click="showLoginModal = true"
      />
    </div>

    <FirebaseLogin v-if="showLoginModal" @hide-modal="showLoginModal = false" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import FirebaseLogin from "@hoppscotch/common/components/firebase/Login.vue"
import { platform } from "@hoppscotch/common/platform"
import { useReadonlyStream } from "@hoppscotch/common/composables/stream"
import { useI18n } from "@hoppscotch/common/composables/i18n"
import { initializeApp } from "@hoppscotch/common/helpers/app"

const t = useI18n()
const router = useRouter()

const showLoginModal = ref(false)

const currentUser = useReadonlyStream(
  platform.auth.getCurrentUserStream(),
  platform.auth.getCurrentUser()
)

onBeforeMount(() => {
  initializeApp()
})

// Redirect to home when user logs in
watch(
  currentUser,
  (user) => {
    if (user) {
      router.replace("/")
    }
  },
  { immediate: true }
)
</script>

<route lang="yaml">
meta:
  layout: empty
</route>
