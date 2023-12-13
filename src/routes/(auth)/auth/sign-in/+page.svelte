<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import GoogleIcon from '$lib/components/icons/google.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Card.Root>
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl">Sign In</Card.Title>
      <Card.Description>Choose your favorite sign-in method</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <a href="/auth/sign-in/google">
        <Button class="w-full"
          ><GoogleIcon className="mr-2 h-4 w-4" />Sign in with Google</Button
        >
      </a>
    </Card.Content>
  </Card.Root>
</div>
