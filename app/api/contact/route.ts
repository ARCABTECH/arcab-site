import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    // Validação básica
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Aqui você pode integrar com um serviço de email (SendGrid, Resend, etc.)
    // Por enquanto, apenas retornamos sucesso
    // TODO: Implementar integração com serviço de email
    
    console.log('Form submission:', { name, email, service, message })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem recebida! Entraremos em contato em breve.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Erro ao processar formulário. Tente novamente.' },
      { status: 500 }
    )
  }
}
