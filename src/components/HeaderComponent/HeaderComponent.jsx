import React, { useEffect, useState } from 'react'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd';
import { WrapperText, WrapperIcon } from './style';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as FacultyService from '../../services/FacultyService'
const HeaderComponent = () => {
    //setup
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="/faculty/detail">
                    IT
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Design
                </a>
            ),
        }
    ]
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/signin');
        removeCookie('access_token');
        window.location.reload();
    };
    const handleFaculty = () => {
        navigate('/faculty');
        window.location.reload();
    }
    //Laays faculty hieenj cos
    const [itemsFaculty, setItemsFaculty] = useState([]);
    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const res = await FacultyService.getAllFaculty();
                // Chuyển đổi dữ liệu từ API thành định dạng mong muốn và cập nhật state
                const formattedData = res.data.map(faculty => ({
                    key: faculty._id, // Gán id vào key
                    label: (
                        <a href={`/faculty/?fac=${faculty.name}`}>
                            {faculty.name}
                        </a>
                    ), // Gán name vào name
                }));
                setItemsFaculty(formattedData);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
            }
        };
        fetchFacultyData();
    })
    return (
        <div>
            <Row style={{
                borderBottom: '1px solid rgba(160, 160, 160, 0.3)'
            }}>
                <Col span={4}
                    style={{
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: 'solid 1px rgba(160, 160, 160, 0.3)',
                        fontFamily: "'Raleway','Helvetica', 'sans-serif'",
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '13px',
                        textDecoration: 'none',
                        color: 'black',
                    }}
                > <a style={{ color: 'black' }} href='/'>Future Imperfect</a>
                </Col>
                <Col span={18} style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    fontSize: '20px',
                    gap: '20px',
                    paddingLeft: '30px',
                    alignItems: 'center',
                }}>
                    <WrapperText>
                        <Dropdown
                            menu={{
                                items: itemsFaculty,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{ color: 'black' }}>
                                    <a onClick={handleFaculty} style={{ color: 'black' }}>Faculty</a>
                                </Space>
                            </a>
                        </Dropdown>
                    </WrapperText>
                    <WrapperText>Contact</WrapperText>
                    <WrapperText>About me</WrapperText>
                </Col>
                <Col span={2} style={{
                    height: '56px',
                    display: 'flex',
                    borderLeft: 'solid 1px rgba(160, 160, 160, 0.3)',
                    fontSize: '20px',
                    color: 'black'
                }}> <WrapperIcon>
                        <SearchOutlined />
                    </WrapperIcon>
                    <WrapperIcon >
                        <UserOutlined onClick={handleSignIn} />
                    </WrapperIcon></Col>
            </Row>
        </div>
    )
}

export default HeaderComponent
