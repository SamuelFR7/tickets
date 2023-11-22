<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'
  import { Toaster } from 'svelte-sonner'
  import { onNavigate } from '$app/navigation'

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<ModeWatcher />
<slot />
<Toaster />
