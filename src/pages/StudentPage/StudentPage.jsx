import React, { useState } from 'react'
import { getItem } from '../../utilis';
import { UserOutlined, FormOutlined, LogoutOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import * as UserService from '../../services/UserService'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
import StudentPostBlog from '../../components/StudentComponent/StudentPostBlog/StudentPostBlog';
import StudentAccount from '../../components/StudentComponent/StudentAccount/StudentAccount';
const StudentPage = () => {
    const [cookiesAccessToken, setCookieAccessToken, removeCookie] = useCookies('')
    const items = [
        getItem('Student', 'grp', null, [getItem('Logout', 'logout', <LogoutOutlined />)], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Thông tin cá nhân', 'user', <UserOutlined />), getItem('Đăng bài', 'postBlog', <FormOutlined />)], 'group'),
    ];
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <StudentAccount />
                )
            case 'postBlog':
                return (
                    <StudentPostBlog />

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

    const handleOnCLick = ({ key }) => {
        setKeySelected(key)
    }
    const navigate = useNavigate()
    const handleLogout = async () => {
        // Xóa access token khỏi cookie
        removeCookie('access_token');
        // Gọi API đăng xuất từ UserService
        await UserService.logoutUser();
        // Chuyển hướng người dùng đến trang chủ
        navigate('/');
    };
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

export default StudentPage
