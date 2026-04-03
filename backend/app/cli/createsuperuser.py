import asyncio
import getpass

from app.core.database import async_session
from app.core.security import hash_password
from app.repositories import user_repo


async def main():
    print("=== Criar Superusuário ===")
    nome = input("Nome: ").strip()
    email = input("E-mail: ").strip()
    senha = getpass.getpass("Senha: ")
    senha2 = getpass.getpass("Confirmar senha: ")

    if senha != senha2:
        print("Erro: as senhas não coincidem.")
        return

    if not nome or not email or not senha:
        print("Erro: todos os campos são obrigatórios.")
        return

    async with async_session() as db:
        existente = await user_repo.get_by_email(db, email)
        if existente:
            print(f"Erro: já existe um usuário com o e-mail {email}")
            return

        senha_hash = hash_password(senha)
        user = await user_repo.create(db, nome=nome, email=email, senha_hash=senha_hash)
        await db.commit()
        print(f"Superusuário criado com sucesso! ID: {user.id}")


if __name__ == "__main__":
    asyncio.run(main())
