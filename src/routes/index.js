import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import StudentPage from "../pages/StudentPage/StudentPage";
import PageDetail from "../pages/PageDetail/PageDetail";
import FacultyArticlePage from "../pages/FacultyArticlePage/FacultyArticlePage";
import CoordinatorPage from "../pages/CoordinatorPage/CoordinatorPage";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import CoordinatorContribution from "../components/CoordinatorComponent/CoordinatorContribution/CoordinatorContribution";
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        requiresAuth: false
    },
    {
        path: '/faculty/detail',
        page: PageDetail,
        isShowHeader: true
    },
    {
        path: '/faculty',
        page: FacultyArticlePage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false,
        requiresAuth: false
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        requiresAuth: true
    },
    {
        path: '/system/student',
        page: StudentPage,
        isShowHeader: false,
        requiresAuth: true
    },
    {
        path: '/system/coordinator',
        page: CoordinatorPage,
        isShowHeader: false,
        requiresAuth: true
    },
    {
        path: '/system/manager',
        page: ManagerPage,
        isShowHeader: false,
        requiresAuth: true
    },

    {
        path: '*',
        page: NotFoundPage
    },
]