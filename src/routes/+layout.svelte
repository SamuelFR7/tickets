<script lang="ts">
  import Header from '$lib/components/header.svelte'
  import '../app.postcss'
  import { ModeWatcher } from 'mode-watcher'
  import { onNavigate } from '$app/navigation'

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
<Header session={data.session} />
<main class="w-full max-w-4xl mx-auto py-6">
  <slot />
</main>
