class Transacao {
    static transferencia (contaOrigem, contaDestino, idTransacao, dataDeTransacao, valorDaTransferencia) {
        
        if (contaOrigem.saldo >= valorDaTransferencia) {
            contaOrigem.historico.push({
                idTransacao: idTransacao,
                dataDeTransacao: dataDeTransacao,
                valorDaTransferencia: valorDaTransferencia,
                tipo: "pagamento"
            })

            contaDestino.historico.push({
                idTransacao: idTransacao,
                dataDeTransacao: dataDeTransacao,
                valorDaTransferencia: valorDaTransferencia,
                tipo: "recebimento",
            })

            contaOrigem.saldo -= valorDaTransferencia
            contaDestino.saldo += valorDaTransferencia

            return {mensagem: "Transferência realizada com sucesso!"}
        } else {
            
            return {mensagem: "Saldo insuficiente para transferência!"}
        }

    }

    static deposito (contaDestino, idDeposito, dataDoDeposito, valorDoDeposito) {

        contaDestino.saldo += valorDoDeposito

        contaDestino.historico.push(
            {
            idDeposito: idDeposito,
            dataDoDeposito: dataDoDeposito,
            valorDoDeposito: valorDoDeposito,
            tipo: "recebimento",
            })

        
        return {mensagem: "Depósito realizado com sucesso!"}

    }

    static pagamentoSalario (contaOrigem, contaDestino, idPagamento, dataDoPagamento, valorDoSalario) {

        if(contaOrigem instanceof PessoaFisica && valorDoSalario >= 1000) {

            return {mensagem: "Seu limite máximo para este tipo de operação é de 1000. Entre em contato com o banco."}

        } else if (contaOrigem.saldo < valorDoSalario) {

            return {mensagem: "Saldo insuficiente para realizar o pagamento!"}

        } else {
            contaDestino.saldo += valorDoSalario
            contaOrigem.saldo -= valorDoSalario

            contaDestino.historico.push({
                idPagamento: idPagamento,
                dataDoPagamento: dataDoPagamento,
                valorDoSalario: valorDoSalario,
                tipo: "recebimento",
              })

              contaOrigem.historico.push({
                idPagamento: idPagamento,
                dataDoPagamento: dataDoPagamento,
                valorDoSalario: valorDoSalario,
                tipo: "pagamento"
              })

              return {mensagem: "Pagamento realizado com sucesso!"}
        }

    }
}