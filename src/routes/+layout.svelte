<script lang="ts">
  import { onNavigate } from '$app/navigation'
  import Header from '$lib/components/header.svelte'
  import '../app.postcss'
  import { ModeWatcher } from 'mode-watcher'

  export let data

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
<div class="relative flex min-h-screen flex-col">
  <Header session={data.session} />
  <main class="flex-1">
    <slot />
  </main>
</div>
