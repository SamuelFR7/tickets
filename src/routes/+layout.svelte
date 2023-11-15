<script lang="ts">
  import Header from '$lib/components/header.svelte'
  import '../app.postcss'
  import { ModeWatcher } from 'mode-watcher'

  export let data
</script>

<ModeWatcher />
<main>
  <Header session={data.session} />
  <div class="w-full max-w-4xl mx-auto py-6">
    <slot />
  </div>
</main>
