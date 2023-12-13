<script lang="ts">
  import * as Table from '$lib/components/ui/table'
  import TableActions from './table-actions.svelte'
  import { page } from '$app/stores'
  import Input from '$lib/components/ui/input/input.svelte'
  import { goto } from '$app/navigation'
  import { formatDate, generateSearchParams, truncate } from '$lib/utils'
  import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte'
  import { buttonVariants } from '$lib/components/ui/button'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Select from '$lib/components/ui/select'

  export let data
  let search: string
  let timeout: ReturnType<typeof setTimeout>

  function searchByName() {
    const q = new URLSearchParams($page.url.searchParams.toString())
    q.set('page', '1')
    q.set('search', search)
    goto(`/admin?${q}`, {
      keepFocus: true,
    })
  }

  function handleSearchDebounced() {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(searchByName, 300)
  }
</script>

<div class="grid items-center gap-4 pb-8 pt-6 md:py-8 container">
  <div class="flex items-center space-x-4">
    <Input
      placeholder="Search by the title"
      class="max-w-[15rem] w-full"
      type="text"
      bind:value={search}
      on:input={handleSearchDebounced}
    />
    <Select.Root portal={null}>
      <Select.Trigger class="w-[180px]">
        <Select.Value placeholder="Filter by status" />
      </Select.Trigger>
      <Select.Content>
        <a
          href={`/admin${generateSearchParams(
            'status',
            'open',
            new URLSearchParams($page.url.searchParams.toString())
          )}`}><Select.Item value="open">Open</Select.Item></a
        >
        <a
          href={`/admin${generateSearchParams(
            'status',
            'closed',
            new URLSearchParams($page.url.searchParams.toString())
          )}`}
        >
          <Select.Item value="closed">Closed</Select.Item>
        </a>
      </Select.Content>
      <Select.Input name="favoriteFruit" />
    </Select.Root>
  </div>

  <div>
    <div class="rounded-md border">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <a
                href={`/admin${generateSearchParams(
                  'order_by',
                  `title.${
                    data.orderBy && data.orderBy === 'title.asc'
                      ? 'desc'
                      : 'asc'
                  }`,
                  new URLSearchParams($page.url.searchParams.toString())
                )}`}
                data-sveltekit-preload-data="hover"
                class={buttonVariants({ variant: 'ghost' })}
                ><span>Title</span>
                <ArrowUpDown class={'ml-2 h-4 w-4'} />
              </a>
            </Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>
              <a
                href={`/admin${generateSearchParams(
                  'order_by',
                  `createdAt.${
                    data.orderBy && data.orderBy === 'createdAt.asc'
                      ? 'desc'
                      : 'asc'
                  }`,
                  new URLSearchParams($page.url.searchParams.toString())
                )}`}
                data-sveltekit-preload-data="hover"
                class={buttonVariants({ variant: 'ghost' })}
              >
                <span>Opened at</span>
                <ArrowUpDown class={'ml-2 h-4 w-4'} />
              </a>
            </Table.Head>
            <Table.Head>Last update</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.tickets as ticket}
            <Table.Row>
              <Table.Cell>{truncate(ticket.title, 45)}</Table.Cell>
              <Table.Cell>{ticket.status.toUpperCase()}</Table.Cell>
              <Table.Cell>{formatDate(ticket.createdAt)}</Table.Cell>
              <Table.Cell>{formatDate(ticket.updatedAt)}</Table.Cell>
              <Table.Cell><TableActions id={ticket.id} /></Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
    <div class="flex items-center justify-between mt-2 px-2">
      <span class="text-sm"
        >Page {data.page} of {Math.ceil(data.totalCount / 10)}</span
      >
      <div>
        {#if data.page > 1}
          <a
            data-sveltekit-noscroll={true}
            data-sveltekit-preload-data="hover"
            href={`/admin${generateSearchParams(
              'page',
              String(data.page - 1),
              new URLSearchParams($page.url.searchParams.toString())
            )}`}
            class={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft />
          </a>
        {:else}
          <Button disabled variant="outline" size="icon"><ChevronLeft /></Button
          >
        {/if}
        {#if data.page < Math.ceil(data.totalCount / 10)}
          <a
            data-sveltekit-noscroll={true}
            data-sveltekit-preload-data="hover"
            href={`/admin${generateSearchParams(
              'page',
              String(data.page + 1),
              new URLSearchParams($page.url.searchParams.toString())
            )}`}
            class={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronRight />
          </a>
        {:else}
          <Button disabled variant="outline" size="icon"
            ><ChevronRight /></Button
          >
        {/if}
      </div>
    </div>
  </div>
</div>
