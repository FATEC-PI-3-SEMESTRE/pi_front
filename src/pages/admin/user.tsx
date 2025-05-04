import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Main } from "../../components/main_container";
import { AdminNavbar } from "../../components/navbar/admin_navbar";
import { api } from "../../services/api";
import { Container } from "../../components/container";
import { ModalUser } from "../../components/modal/modal_user";

export const AdminUser = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<any[]>([]); // Assumindo que você já tenha os usuários aqui
  const [selectedUser, setSelectedUser] = useState<any>(null); // Estado para o usuário selecionado
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar a visibilidade do modal

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Abre o modal com o usuário selecionado
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Reseta o usuário selecionado quando o modal é fechado
  };

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
        const response = await api.get("/user");  // Usa a instância do Axios
        setUsers(response.data);
    } catch (error) {
        console.error("Erro ao carregar os usuários:", error);
    } finally {
        setLoading(false);
    }
};

  // UseEffect para chamar a função fetchUsers quando o componente for montado
  useEffect(() => {
    if (token) {
      fetchUsers();
    } else {
      console.error("Token não encontrado");
    }
  }, [token]);

  return (
    <>
      <Main>
        <AdminNavbar />
        <Container>
        <Header title="Usuários" />
        <div className="flex justify-end mb-4">
            <button
                onClick={() => {
                setSelectedUser(null);      // Limpa qualquer usuário selecionado
                setIsModalOpen(true);       // Abre o modal
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            >
                Novo Usuário
            </button>
            </div>
            <div className="container mx-auto px-4 py-8">
            {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Criado</th>
                    <th className="py-2 px-4 border-b">Criado por</th>
                    <th className="py-2 px-4 border-b">Editado</th>
                    <th className="py-2 px-4 border-b">Editado por</th>
                    <th className="py-2 px-4 border-b">Removido</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                     <tr
                     key={user.id}
                     className="cursor-pointer hover:bg-gray-200"
                     onClick={() => handleRowClick(user)} // Abre o modal ao clicar na linha
                     >
                        <td className="py-2 px-4 border-b">{user.id}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.access ? "AMIN" : "USER"}</td>
                        <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleString('pt-BR')}</td>
                        <td className="py-2 px-4 border-b">{user.createdBy}</td>
                        <td className="py-2 px-4 border-b">{user.createdAt == user.updatedAt? '' : new Date(user.updatedAt).toLocaleString('pt-BR')}</td>
                        <td className="py-2 px-4 border-b">{user.updatedBy}</td>
                        <td className="py-2 px-4 border-b">{user.deleted ? 'Y' : 'N'}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </Container>
      </Main>
      <ModalUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        isEditMode={selectedUser === null ? false : true}
      />
    </>
  );
};
