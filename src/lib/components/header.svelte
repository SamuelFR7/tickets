<script lang="ts">
  import { LogOut } from 'lucide-svelte'
  import ThemeToggle from './theme-toggle.svelte'
  import Button from './ui/button/button.svelte'
  import type { Session } from 'lucia'

  export let session: Session | null
</script>

<header
  class="w-full max-w-full flex items-center justify-between border-b p-6"
>
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Tickets
  </h1>
  <div class="flex items-center gap-4">
    <ThemeToggle />
    {#if session}
      <form method="POST" action="/?/logout">
        <Button type="submit"><LogOut class="mr-2 w-4 h-4" />Sair</Button>
      </form>
    {/if}
  </div>
</header>
