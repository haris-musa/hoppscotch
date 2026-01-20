import type { HoppModule } from "@hoppscotch/common/modules"
import { platform } from "@hoppscotch/common/platform"

const GUEST_ROUTES = ["login", "enter", "device-login"]

function isGuestRoute(routeName: unknown): boolean {
  return typeof routeName === "string" && GUEST_ROUTES.includes(routeName)
}

export const authGuardModule: HoppModule = {
  async onBeforeRouteChange(to, _from, router) {
    if (isGuestRoute(to.name)) {
      return
    }

    let currentUser = platform.auth.getCurrentUser()

    if (!currentUser) {
      const probableUser = platform.auth.getProbableUser()
      if (probableUser) {
        await platform.auth.waitProbableLoginToConfirm()
        currentUser = platform.auth.getCurrentUser()
      }
    }

    if (!currentUser) {
      router.replace({ name: "login" })
    }
  },
}
