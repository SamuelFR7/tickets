<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button/index.js'

  export let data
</script>

<div class="max-w-6xl w-full mx-auto py-20">
  <h1>{data.ticket.title}</h1>
  <a
    class={buttonVariants({
      variant: 'secondary',
    })}
    href="/">Return</a
  >
</div>
