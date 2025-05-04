import { Header } from "../../components/header"
import { Main } from "../../components/main_container"
import { AdminNavbar } from "../../components/navbar/admin_navbar"

export const AdminHome = () => {
    return(
        <>
        <Main>
            <AdminNavbar/>
                <Header title="Home"/>
        </Main>
        </>
    )
}