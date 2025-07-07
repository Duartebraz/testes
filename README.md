### 🧪 Testes Automatizados

Para garantir a qualidade e a estabilidade do back-end, especialmente do bot que é o núcleo do produto, o projeto conta com uma robusta suíte de testes automatizados.

**Estratégia de Testes:**
Nossa estratégia foi construir uma base sólida com **testes unitários**, garantindo o isolamento completo de cada componente. Utilizamos "mocking" estratégico para simular as respostas da API do WhatsApp e outras dependências externas, permitindo testar a lógica de processamento de mensagens e imagens de forma confiável e rápida.

**Como Executar os Testes:**
Para rodar a suíte de testes do back-end, execute o seguinte comando:
```bash
cd backend
npm test
```

**Cobertura e Resultados Atuais:**

> **Testes Abrangentes:** O bot possui uma suíte com **98 testes automatizados**, todos executados com sucesso, organizados em 4 grandes grupos de validação.
>
> **Alta Cobertura de Código:** Nossos testes validam aproximadamente **95% de todo o código-fonte** do bot, garantindo que a maior parte de suas funcionalidades foi verificada.
>
> **Validação Completa das Funções:** **100% das funções** implementadas no bot foram testadas, o que significa que não há nenhuma funcionalidade principal deixada de fora dos testes.
>
> **Confiabilidade da Lógica:** A cobertura de "branches" (lógica condicional `if/else`) está acima de **92%**, indicando que diferentes cenários e caminhos de execução foram testados com sucesso.
