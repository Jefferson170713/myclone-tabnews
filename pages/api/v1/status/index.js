function status(requerest, response) {
    response.status(200).json({"chave" : "Meu status está ok!"});
}

export default status;