<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'
  import { buttonVariants } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card'
  import { formatDate } from '$lib/utils.js'

  export let data
</script>

<main class="max-w-4xl mx-auto w-full py-20 space-y-6">
  {#if data.tickets.length > 0}
    <div class="flex w-full items-center justify-between">
      <div>
        <h1 class="text-xl font-bold">Meus chamados</h1>
        <p class="text-sm text-muted-foreground">
          Veja todos os seus chamados em aberto
        </p>
      </div>
      <a href="/tickets/new" class={buttonVariants()}>Abrir Chamado</a>
    </div>
    <div>
      {#each data.tickets as ticket}
        <Card.Root>
          <Card.Header>
            <Card.Title>{ticket.title}</Card.Title>
            <Card.Description
              >{ticket.description ?? 'Sem descrição'}</Card.Description
            >
          </Card.Header>
          <Card.Content>
            <div>
              <span class="font-medium">Status:</span>
              {ticket.status}
            </div>
            <div>
              <span class="font-medium">Aberto em:</span>
              {formatDate(ticket.createdAt)}
            </div>
            <div>
              <span class="font-medium">Ultima atualização:</span>
              {formatDate(ticket.updatedAt)}
            </div>
            <div class="justify-end flex space-x-4">
              <a href={`/ticket/${ticket.id}`} class={buttonVariants()}
                >Visualizar</a
              >
              <Button variant="destructive">Cancelar</Button>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>
  {:else}
    <div class="text-center">
      <h1 class="text-2xl font-bold">Nenhum chamado encontrado</h1>
      <p class="text-lg">Você ainda não tem nenhum chamado em aberto</p>
      <div class="mt-4">
        <a href="/tickets/new" class={buttonVariants()}>Abrir chamado</a>
      </div>
    </div>
  {/if}
</main>
