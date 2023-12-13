<script lang="ts">
  import { Loader2, LogOut } from 'lucide-svelte'
  import ThemeToggle from './theme-toggle.svelte'
  import Button from './ui/button/button.svelte'
  import type { Session } from 'lucia'
  import { buttonVariants } from './ui/button'
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'

  export let session: Session | null

  let isLoading = false
</script>

<header
  class="w-full max-w-full flex items-center justify-between border-b p-6"
>
  <a href={session?.user.role === 'admin' ? '/admin' : '/'}>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Tickets
    </h1>
  </a>
  <div class="flex items-center gap-4">
    <ThemeToggle />
    {#if session}
      {#if session.user.role === 'admin'}
        <a class={buttonVariants()} href="/admin/new-user">Admin</a>
      {/if}
      <form
        method="POST"
        action="/api/logout"
        use:enhance={() => {
          isLoading = true
          return ({ result }) => {
            if (result) {
              isLoading = false
              session = null
              goto('/auth/sign-in')
            }
          }
        }}
      >
        <Button disabled={isLoading} type="submit">
          {#if isLoading}
            <Loader2 class="mr-2 w-4 h-4" />
          {:else}
            <LogOut class="mr-2 w-4 h-4" />{/if}Sair</Button
        >
      </form>
    {/if}
  </div>
</header>
