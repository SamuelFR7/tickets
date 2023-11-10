<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import { authSchema, type AuthSchema } from '$lib/validations/auth'
  import type { SuperValidated } from 'sveltekit-superforms'
  import type { FormOptions } from 'formsnap'
  import { goto } from '$app/navigation'

  export let form: SuperValidated<AuthSchema>

  const options: FormOptions<AuthSchema> = {
    validators: authSchema,
    onUpdated: ({ form }) => {
      if (form.valid) {
        goto('/')
      }
    },
  }
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Form.Root {options} method="POST" {form} schema={authSchema} let:config>
    <Form.Field {config} name="username">
      <Form.Item>
        <Form.Label>Usuário</Form.Label>
        <Form.Input />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name="password">
      <Form.Item>
        <Form.Label>Senha</Form.Label>
        <Form.Input type="password" />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Button class="ml-auto flex" type="submit">Entrar</Form.Button>
  </Form.Root>
</div>
