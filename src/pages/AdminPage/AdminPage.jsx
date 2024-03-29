import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utilis';
import { UserOutlined, AppstoreOutlined, LogoutOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import AdminUser from '../../components/AdminComponent/AdminUser/AdminUser';
import AdminEvent from '../../components/AdminComponent/AdminEvent/AdminEvent';
import * as UserService from '../../services/UserService'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
const AdminPage = () => {
    const items = [
        getItem('Admin', 'grp', null, [getItem('Logout', 'logout', <LogoutOutlined />)], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Người dùng', 'user', <UserOutlined />), getItem('Sự Kiện', 'event', <AppstoreOutlined />)], 'group'),
    ];
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'event':
                return (
                    <AdminEvent />

                )
            case 'logout':
                return (
                    <div onClick={handleLogout}>logout</div>
                )
            default:
                return <></>
        }
    }
    const [keySelected, setKeySelected] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const navigate = useNavigate()
    const handleOnCLick = ({ key }) => {
        setKeySelected(key)
    }
    const handleLogout = async () => {
        await UserService.logoutUser()
        removeCookie('access_token')
        navigate('/')
    }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh',
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>

        </>
    )
}

export default AdminPage