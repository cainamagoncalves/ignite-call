import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  async function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          13 de fevereiro de 2024
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
        <Text></Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>

        <TextInput
          {...register('name')}
          placeholder="Seu nome"
          crossOrigin=""
        />

        {errors?.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>

        <TextInput
          {...register('email')}
          type="email"
          placeholder="jhondoe@example.com"
          crossOrigin=""
        />

        {errors?.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>

        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
