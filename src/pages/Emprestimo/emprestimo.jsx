import React, { useState } from 'react';
import './emprestimo.css'
import CadButton from '../../components/cadButtons/cadButtons';
import imagemDireita from '../../assets/imagens/Emprestimo-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux'

export default function Emprestimo() {
    return (
        <>
            <section className="Emprestimo">
                <div className="container-Emprestimo">
                    <div className="conteudo-Emprestimo">
                        <h1 className='emp-title'>Empréstimo</h1>
                        <p className='p-Title'>Insira as informações do cliente.</p>
                        <form className="form-emprestimo" action="">
                            <Input
                                placeholder="Cliente"
                                type="text"
                            />

                            <Input
                                placeholder="E-mail"
                                type="text"
                            />

                            <Input
                                placeholder="E-mail"
                                type="text"
                            />

                            <Input
                                placeholder="Telefone"
                                type="text"
                            />

                            <Input
                                placeholder="Nome do livro"
                                type="text"
                            />

                            <Input
                                placeholder="Data do Empréstimo"
                                type="text"
                            />

                            <div className='buttons'>
                                <CadButton
                                    legendaBotao="Inserir"
                                    margem="0 0 0 0"
                                />
                                <CadButton
                                    legendaBotao="Voltar"
                                    cor="50%"
                                    margem="0 0 0 5%"
                                    rota="/Clientes"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className='img-Emprestimo'>
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>

            </section>
        </>
    )
}