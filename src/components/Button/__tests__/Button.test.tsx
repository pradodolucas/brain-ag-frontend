import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '..'

describe('Button', () => {
  it('deve renderizar o botão com o texto correto', () => {
    const { getByText } = render(<Button>Texto do Botão</Button>)
    expect(getByText('Texto do Botão')).toBeInTheDocument()
  })

  it('deve chamar a função onClick quando clicado', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Clique</Button>)
    
    await user.click(getByText('Clique'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando a prop disabled for true', () => {
    const { getByText } = render(<Button disabled>Desabilitado</Button>)
    expect(getByText('Desabilitado')).toBeDisabled()
  })
})