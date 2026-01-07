import type { HoppModule } from "@hoppscotch/common/modules"
import { platform } from "@hoppscotch/common/platform"

// Routes that don't require authentication
const GUEST_ROUTES = ["login", "enter", "device-login"]

function isGuestRoute(routeName: unknown): boolean {
  return GUEST_ROUTES.includes(routeName as string)
}

export const authGuardModule: HoppModule = {
  async onBeforeRouteChange(to, _from, router) {
    // Allow guest routes to pass through
    if (isGuestRoute(to.name)) {
      return
    }

    // Check if user is authenticated
    const currentUser = platform.auth.getCurrentUser()

    if (!currentUser) {
      // User is not authenticated, redirect to login
      router.replace({ name: "login" })
    }
  },
}
