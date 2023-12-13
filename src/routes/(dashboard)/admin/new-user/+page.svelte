<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import {
    inviteUserSchema,
    type InviteUserSchema,
  } from '$lib/validations/auth'
  import type { SuperValidated } from 'sveltekit-superforms'
  import type { FormOptions } from 'formsnap'
  import { toast } from 'svelte-sonner'
  import { goto } from '$app/navigation'

  export let form: SuperValidated<InviteUserSchema>

  const options: FormOptions<InviteUserSchema> = {
    validators: inviteUserSchema,
    onResult: async ({ result }) => {
      if (result.type === 'failure' && typeof result.data.error === 'string') {
        return toast.error(result.data.error)
      }

      if (result.type === 'success') {
        toast.success('User invited!')
        await goto('/admin')
      }
    },
  }
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Form.Root
    method="POST"
    {options}
    {form}
    schema={inviteUserSchema}
    let:config
  >
    <Form.Field {config} name="email">
      <Form.Item>
        <Form.Label>Email</Form.Label>
        <Form.Input />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Button class="ml-auto flex" type="submit">Create</Form.Button>
  </Form.Root>
</div>
