<script lang="ts">
  import { writable } from 'svelte/store'
  import * as Table from '$lib/components/ui/table'
  import TableActions from './table-actions.svelte'
  import TablePagination from './table-pagination.svelte'
  import { page } from '$app/stores'

  export let data

  $: currentPage = $page.url.searchParams.get('page')
</script>

<div>
  <h1 class="text-3xl font-bold">Bem vindo ao app Tickets</h1>
  <h2 class="text-sm text-muted-foreground">Gerencie os chamados</h2>

  <div>
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Titulo</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Data de Criacao</Table.Head>
            <Table.Head>Acoes</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.tickets as ticket}
            <Table.Row>
              <Table.Cell>{ticket.title}</Table.Cell>
              <Table.Cell>{ticket.status}</Table.Cell>
              <Table.Cell>{ticket.createdAt}</Table.Cell>
              <Table.Cell><TableActions id={ticket.id} /></Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
    <TablePagination
      currentPage={typeof currentPage === 'string'
        ? parseInt(currentPage) > 0
          ? parseInt(currentPage)
          : 1
        : 1}
      totalCount={data.totalCount}
    />
  </div>
</div>
