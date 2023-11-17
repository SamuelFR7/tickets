<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import { newUserSchema, type NewUserSchema } from '$lib/validations/auth'
  import type { SuperValidated } from 'sveltekit-superforms'
  import type { FormOptions } from 'formsnap'
  import { toast } from 'svelte-sonner'

  export let form: SuperValidated<NewUserSchema>

  const options: FormOptions<NewUserSchema> = {
    validators: newUserSchema,
    onResult: (data) => {
      if (data.result.type === 'failure') {
        return toast.error('Usuário já existe')
      }

      toast.success('Usuário cadastrado com sucesso')
    },
  }
</script>

<div class="max-w-2xl w-full mx-auto mt-20">
  <Form.Root method="POST" {options} {form} schema={newUserSchema} let:config>
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
    <Form.Field {config} name="passwordConfirmation">
      <Form.Item>
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Input type="password" />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Button class="ml-auto flex" type="submit">Cadastrar</Form.Button>
  </Form.Root>
</div>
