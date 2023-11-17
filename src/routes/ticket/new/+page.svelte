<script lang="ts">
  import { ticketSchema, type TicketSchema } from '$lib/validations/ticket'
  import type { SuperValidated } from 'sveltekit-superforms'
  import * as Form from '$lib/components/ui/form'
  import { buttonVariants } from '$lib/components/ui/button'
  import type { FormOptions } from 'formsnap'
  import { goto } from '$app/navigation'

  export let form: SuperValidated<TicketSchema>

  const options: FormOptions<TicketSchema> = {
    validators: ticketSchema,
    onResult: async ({ result }) => {
      if (result.type === 'success') {
        await goto('/')
      }
    },
  }
</script>

<div class="max-w-4xl w-full mx-auto py-20">
  <Form.Root
    {form}
    method="POST"
    action="?/create"
    {options}
    schema={ticketSchema}
    let:config
    class="space-y-3"
  >
    <Form.Field {config} name="title">
      <Form.Item>
        <Form.Label>Título</Form.Label>
        <Form.Input />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="description">
      <Form.Item>
        <Form.Label>Descrição</Form.Label>
        <Form.Textarea class="resize-none h-[6rem]" />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <div class="flex items-center justify-end space-x-4">
      <a href="/" class={buttonVariants({ variant: 'secondary' })}>Voltar</a>
      <Form.Button type="submit">Abrir Chamado</Form.Button>
    </div>
  </Form.Root>
</div>
