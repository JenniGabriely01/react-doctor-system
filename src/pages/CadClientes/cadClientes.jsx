import React, { useState } from 'react';
import './cadClientes.css';
import imagemDireita from '../../assets/imagens/ImagemFundoCad.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';

export default function CadClientes() {
    return (
        <>
            <section className='main-content'>
                <div className='cliente-conteiner'>
                    <div className='cli-content'>
                        <h1 className='cli-title'>Cadastro</h1>
                        <p className='p-title'>Insira as informações do cliente.</p>
                        <Input
                            placeholder="Nome"
                            type="text"
                        />
                        <Input
                            placeholder="Sobrenome"
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
                    </div>
                </div>

                <div className="img-cli">
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>

            </section>
        </>
    )
}