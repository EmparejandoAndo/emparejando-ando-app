import { useState, useRef } from "react";
import "./Login.css";

const Login = () => {
    const inputUsuarioRef = useRef(null);

    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Pingui" },
        { id: 2, nombre: "Usuario" }
    ]);

    const [chats, setChats] = useState([
        { id: 1, nombre: "Chat", tipo: "individual" }
    ]);

    const [usuariosChats, setUsuariosChats] = useState([
        { usuarioChatID: 1, userID: 1, chatID: 1, rol: "miembro" },
    ]);

    const [mensajes, setMensajes] = useState([
        {
            id: 1,
            chatID: 1,
            userID: 1,
            contenido: 'Bienvenido a Emparejando Ando.\n¿Listo para jugar?',
            fecha_envio: '2023-01-01 12:00:00',
        },
        {
            id: 2,
            chatID: 1,
            userID: 1,
            contenido: 'Reglas: No hay reglas',
            fecha_envio: '2023-01-02 15:30:00',
        },
        {
            id: 3,
            chatID: 1,
            userID: 2,
            contenido: 'Negan',
            fecha_envio: '2023-01-02 15:30:00',
        }
    ]);

    const Continuar = () => {
        const content = inputUsuarioRef.current.innerText;
        const fechaActual = new Date();
        const formattedDate = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')} ${String(fechaActual.getHours()).padStart(2, '0')}:${String(fechaActual.getMinutes()).padStart(2, '0')}:${String(fechaActual.getSeconds()).padStart(2, '0')}`;
        console.log(content);
        const nuevoMensaje = {
            id: mensajes.length + 1,
            chatID: 1,
            userID: 2,
            contenido: content,
            fecha_envio: formattedDate,
        }

        setMensajes(prevMensajes => [...prevMensajes, nuevoMensaje]);
    }

    const handlePaste = (event) => {
        event.preventDefault();
        const textoPlano = (event.clipboardData || window.clipboardData).getData(
            'text/plain'
        );
        document.execCommand('insertText', false, textoPlano);
    };

    return (
        <div className="login">
            <div className="image-login"></div>
            <div className="conversation-login">
                <div className="transparent-login"></div>

                <div className="conversation-header">
                    <img className="conversation-perfil" src="https://i.ibb.co/LPXpTwD/apps-38456-9007199267003607-4d66cde1-46fd-42b7-93c7-e05d782f5e5d.png" alt="" />

                    <div className="header-container">
                        <p className="username-perfil">Pingui</p>
                        <p className="last-time-online">En línea</p>
                    </div>
                </div>

                <div className="conversation-container">
                    {
                        mensajes.map((m, index) => {
                            const isFirstMessage = index === 0 || m.userID !== mensajes[index - 1].userID;

                            return (
                                <div key={index} className={m.userID === 1 ? 'cloud-container' : 'your-cloud-container'}>
                                    <div className={m.userID === 1 ? 'cloud' : 'your-cloud'}>
                                        {isFirstMessage && (
                                            <div className={m.userID === 1 ? 'tail' : 'your-tail'}></div>
                                        )}

                                        <div className={m.userID === 1 ? 'cloud-content' : 'your-cloud-content'}>
                                            <p className={isFirstMessage ? 'br' : 'br-tail'}>{m.contenido}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                <div onSubmit={(e) => Continuar()} className="contenedor-usuario">
                    <div className="contenedor-input">
                        <div className="icono-emoji">😃</div>

                        <div contentEditable="true" className="input-usuario" ref={inputUsuarioRef} suppressContentEditableWarning="true" placeholder="Introduzca su nombre de usuario" onPaste={(e) => handlePaste(e)}>
                            <p>Placeholder</p>
                        </div>
                    </div>

                    <div className="icono-microfono" style={{ display: "none" }}>🎙</div>
                    <div className="icono-enviar" onClick={() => Continuar()}>➤</div>
                </div>
            </div>
        </div>
    )
}

export default Login;