import React, { useState } from 'react';
import './cadLivros.css';
import iconeLivro from '../../assets/icons/AddBook.svg'
import imagemDireita from '../../assets/imagens/cadLivros-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';

export default function CadLivros() {
    return (
        <>
            <section className='main-content'>
                <div className='info-conteiner'>
                    <div className='cad-content'>
                        <h1 className='cad-title'>Cadastro</h1>
                        <p className='p-title'>Insira as informações do livro.</p>

                        <form className='formLivros' action="">
                            <Input
                                placeholder="Nome do Livro"
                                type="text"
                            />
                            <Input
                                placeholder="Autor"
                                type="text"
                            />
                            <Input
                                placeholder="Gênero"
                                type="text"
                            />
                            <Input
                                placeholder="Data de Lançamento"
                                type="text"
                            />
                            <Input
                                placeholder="Quantidade de Cópias"
                                type="text"
                            />
                        </form>

                        <button className='addBook-btn'>
                            <img className='icon-book' src={iconeLivro} alt="" />
                            <h1 className='addBook-h1'>
                                Inserir imagem do livro
                            </h1>
                        </button>

                        <div className='buttons'>
                            <CadButton
                                legendaBotao="Inserir"
                                margem="0 0 0 0"
                            />
                            <CadButton
                                legendaBotao="Voltar"
                                cor="50%"
                                margem="0 0 0 5%"
                                rota="/"
                            />
                        </div>
                    </div>
                </div>

                <div className="img-cad">
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>

            </section>
        </>
    )
}